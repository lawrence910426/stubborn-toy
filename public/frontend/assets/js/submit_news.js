Dropzone.autoDiscover = false;
function getBase64(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () { resolve(reader.result); };
        reader.onerror = function (error) { reject(error) };  
    })
}
async function getImgurLink(content) {
    try {
        var resp = await $.ajax({
            type: 'POST',
            url: 'https://api.imgur.com/3/image',
            headers: {
                Authorization: 'Client-ID 513db35f7694f3f'
            },
            data: {
                type: "base64",
                image: content
            }
        }); 
        return resp.data.link;
    } catch(err) {
        return err
    }
}

var url = new URL(window.location.href)
if(url.searchParams.get("edit_id") == undefined) {
    $(document).ready(function() {
        var warnings = 3
        const greeting_template = `# 操作指引
- - -

三個減號可以做出分隔線，在上方上傳圖片後，即可得到圖片連結。

在編輯器中，使用兩個換行可以製造一個換行；在編輯器中，一個星號可以做出*斜體*，兩個星號可以做出**粗體**。
`;
        var simplemde = new SimpleMDE({ element: $("#markdown")[0] })
        simplemde.value(greeting_template);


        var converter = new showdown.Converter({ strikethrough: true });
        var prev_text = ""
        function update() {
            var text = simplemde.value();
            if(text == prev_text) return;
            var html = converter.makeHtml(text);
            $("#rendered").empty().append(html);
            prev_text = text
        }
        function loop() {
            update()
            setTimeout(loop, 1000)
        }
        loop()
        
        var imaged = false;
        var Abstract_DropZone = new Dropzone('#Abstract_Upload_Box', {
            url: '/',
            accept: async function(file, done) {
                $("#Abstract_Warning").css("display", "none");
                if(!imaged) {
                    imaged = true;
                    warnings -= 1;
                }
                var content = await getBase64(file);
                content = content.split(",")[1];
                var link = await getImgurLink(content);
                $("#Abstract_Preview_Small").attr("src", link);
                init_cropper('#Abstract_Preview_Small', 3 / 4);
                done();
            }
        });
        var Headline_DropZone = new Dropzone('#Headline_Upload_Box', {
            url: '/',
            accept: async function(file, done) {
                var content = await getBase64(file);
                content = content.split(",")[1];
                var link = await getImgurLink(content);
                $("#Headline_Preview_Small").attr("src", link);
                init_cropper('#Headline_Preview_Small', 16 / 9);
                done();
            }
        });    
        var Img_DropZone = new Dropzone('#Upload_Box', {
            url: '/',
            accept: async function(file, done) {
                var content = await getBase64(file);
                content = content.split(",")[1];
                var link = await getImgurLink(content);
                $("#Generated_Image_Link").text(link);
                $("#Generated_Image_Link").attr("href", link);
                const pos = simplemde.codemirror.getCursor();
                simplemde.codemirror.setSelection(pos, pos);
                simplemde.codemirror.replaceSelection("\n![](" + link + ")\n");
                done();
            }
        });

        function init_cropper(name, ratio) {
            $(name).cropper('destroy')
            var $image = $(name);
            $image.cropper({ aspectRatio: ratio });
        }

        $(window).bind('beforeunload', function(){
            return 'Leaving the website';
        });

        $(".edit_news").css("display", "none")

        $("#submit").click(async function() {
            if(warnings > 0) {
                $("#Anti_Idiot").modal('show');
            } else {
                var croppedimage = $('#Abstract_Preview_Small').data('cropper').getCroppedCanvas().toDataURL("image/png");
                croppedimage = croppedimage.split(",")[1];
                var normal_link = await getImgurLink(croppedimage)

                var advanced = url.searchParams.get("level") == "advanced"

                $.post(config.host + "post_news", 
                {
                    title: $("#post_title").val(),
                    content: simplemde.value(),
                    normal_image_link: normal_link,
                    category: $('input[name="theme"]:checked').val(),
                    is_advanced: advanced,
                    notify: $('input[name="Notify"]:checked').val() == "Yes" ? 1 : 0,
                    email: $("#Announce_Email_Address").val()
                }
                ).done(function(data) {
                    $(window).unbind('beforeunload');
                    window.location.href = "index.html"
                })
            }
        })

        var posted = false;
        $("#post_title").on('input', function(e){
            $("#post_title_warning").css('display', 'none')
            if(!posted) {
                warnings -= 1
                posted = true
            }
        });

        var themed = false;
        $('input[type=radio][name=theme]').change(function(){
            $("#theme_alert").css('display', 'none')
            if(!themed) {
                warnings -= 1
                themed = true
            }
        });

        var self = JSON.parse(window.localStorage.user)
        $("#user_name").text(`投稿人姓名：${self.name}`)

        var Announce_Email_Address_State = false;
        $("#Announce_Email_Address").css("display", "none")
        $("input[type=radio][name=Notify]").change(function() {
            if(Announce_Email_Address_State) {
                $("#Announce_Email_Address").css("display", "none")
            } else {
                $("#Announce_Email_Address").css("display", "block")
            }
            Announce_Email_Address_State = !Announce_Email_Address_State;
        })
    });    
} else {    
    $(document).ready(function() {
        var orignal_post;
        $(".post_news").css("display", "none")
        $("#post_title_warning").css("display", "none")
        $("#Abstract_Warning").css("display", "none")
        $("#theme_alert").css("display", "none")   
        
        var headline_modified = false
        var abstract_modified = false;
        var simplemde = new SimpleMDE({ element: $("#markdown")[0] })
        
        $.post(config.host + "get_news", 
           {"id": parseInt(url.searchParams.get("edit_id"))}
        ).done(function(data) {
            orignal_post = data = JSON.parse(data)[0]
            
            $("#post_title").val(data.title)
            $("#user_name").text(`投稿人姓名：${data.author.name}`)
            $("#Abstract_Preview_Small").attr("src", data.normal_image_link)
            $("#Headline_Preview_Small").attr("src", data.headline_image_link)
            if(data.notify) $("#Do_Notify").prop('checked', true);
            else $("#Do_Not_Notify").prop('checked', true);
            $("#Display_Email_Address").text(data.email)
            $("#Announce_Email_Address").css("display", "none")
            for(var i = 0;i < 7;i++) if($(".form-check-input")[i].value == data.category) $(`#${$(".form-check-input")[i].id}`).prop('checked', true);
            
            simplemde.value(data.content);
            
            var converter = new showdown.Converter({ strikethrough: true });
            var prev_text = ""
            function update() {
                var text = simplemde.value();
                if(text == prev_text) return;
                var html = converter.makeHtml(text);
                $("#rendered").empty().append(html);
                prev_text = text
            }
            function loop() {
                update()
                setTimeout(loop, 1000)
            }
            loop()
            
            var Abstract_DropZone = new Dropzone('#Abstract_Upload_Box', {
                url: '/',
                accept: async function(file, done) {
                    abstract_modified = true
                    $("#Abstract_Warning").css("display", "none");
                    var content = await getBase64(file);
                    content = content.split(",")[1];
                    var link = await getImgurLink(content);
                    $("#Abstract_Preview_Small").attr("src", link);
                    init_cropper('#Abstract_Preview_Small', 3 / 4);
                    done();
                }
            });
            
            var Headline_DropZone = new Dropzone('#Headline_Upload_Box', {
                url: '/',
                accept: async function(file, done) {
                    headline_modified = true
                    var content = await getBase64(file);
                    content = content.split(",")[1];
                    var link = await getImgurLink(content);
                    $("#Headline_Preview_Small").attr("src", link);
                    init_cropper('#Headline_Preview_Small', 16 / 9);
                    done();
                }
            });    
            var Img_DropZone = new Dropzone('#Upload_Box', {
                url: '/',
                accept: async function(file, done) {
                    var content = await getBase64(file);
                    content = content.split(",")[1];
                    var link = await getImgurLink(content);
                    $("#Generated_Image_Link").text(link);
                    $("#Generated_Image_Link").attr("href", link);
                    const pos = simplemde.codemirror.getCursor();
                    simplemde.codemirror.setSelection(pos, pos);
                    simplemde.codemirror.replaceSelection("\n![](" + link + ")\n");
                    done();
                }
            });

            function init_cropper(name, ratio) {
                $(name).cropper('destroy')
                var $image = $(name);
                $image.cropper({ aspectRatio: ratio });
            }

            $(window).bind('beforeunload', function(){
                return 'Leaving the website';
            });
        })
        
        
        $("#submit_check_verify").click(async function() {
            var normal_link = (abstract_modified ? await getImgurLink($('#Abstract_Preview_Small').data('cropper').getCroppedCanvas().toDataURL("image/png").split(",")[1]) : orignal_post.normal_image_link)
            var headline_link = (headline_modified ? await getImgurLink($('#Headline_Preview_Small').data('cropper').getCroppedCanvas().toDataURL("image/png").split(",")[1]) : orignal_post.headline_image_link)
            
            $.post(config.host + "edit_news", 
            {
                id: orignal_post.id,
                title: $("#post_title").val(),
                content: simplemde.value(),
                normal_image_link: normal_link,
                headline_image_link: headline_link,
                category: $('input[name="theme"]:checked').val(),
                is_headline: $('input[name="Headline"]:checked').val() == "Yes" ? 1 : 0,
                is_hot: $('input[name="Hot"]:checked').val() == "Yes" ? 1 : 0,
                is_interview: $('input[name="Interview"]:checked').val() == "Yes" ? 1 : 0,
                is_shown: $('input[name="Shown"]:checked').val() == "Yes" ? 1 : 0
            }
            ).done(function(data) {
                $(window).unbind('beforeunload');
                window.location.href = "index.html"
            })
        })
    });
}
