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


$(document).ready(function() {
    const greeting_template = `# 操作指引
- - -

三個減號可以做出分隔線，在上方上傳圖片後，即可得到圖片連結。

在編輯器中，使用兩個換行可以製造一個換行；在編輯器中，一個星號可以做出*斜體*，兩個星號可以做出**粗體**。
`;
    var simplemde = new SimpleMDE({ element: $("#markdown")[0] })
    simplemde.value(greeting_template);

    
    var converter = new showdown.Converter({
        strikethrough: true
    });
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
    
    
    if(window.localStorage.admin === undefined || window.localStorage.admin === false) $(".admin_only").css("display", "none")
    
    $("#submit").click(async function() {
        var croppedimage = $('#Abstract_Preview_Small').data('cropper').getCroppedCanvas().toDataURL("image/png");
        croppedimage = croppedimage.split(",")[1];
        var normal_link = await getImgurLink(croppedimage)
        
        var url = new URL(window.location.href)
        var advanced = url.searchParams.get("level") == "advanced"
        
        $.post(config.host + "post_news", 
        {
            title: $("#post_title").val(),
            content: $("#markdown").val(),
            normal_image_link: normal_link,
            category: $('input[name="theme"]:checked').val(),
            is_advanced: advanced,
            notify: $('input[name="theme"]:checked').val() == "Yes",
            email: $("#Announce_Email_Address").val()
        }
        ).done(function(data) {
            window.href.location = "../index.html"
        })
    })
});