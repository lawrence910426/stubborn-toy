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
    const greeting_template = `
# 操作指引
- - -

三個減號可以做出分隔線，在上方上傳圖片後，即可得到圖片連結。

在編輯器中，使用兩個換行可以製造一個換行；在編輯器中，一個星號可以做出*斜體*，兩個星號可以做出**粗體**，~~真是太好用了吧~~。
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
        maxFiles: 1,
        accept: async function(file, done) {
            var content = await getBase64(file);
            content = content.split(",")[1];
            var link = await getImgurLink(content);
            $("#Abstract_Preview_Small").attr("src", link);
            init_cropper();
            done();
        }
    });
    var Headline_DropZone = new Dropzone('#Headline_Upload_Box', {
        url: '/',
        maxFiles: 1,
        accept: async function(file, done) {
            var content = await getBase64(file);
            content = content.split(",")[1];
            var link = await getImgurLink(content);
            $("#Headline_Preview_Small").attr("src", link);
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
    
    function init_cropper() {
        var $image = $('#Abstract_Preview_Small');
            $image.cropper({
              aspectRatio: 4 / 3,
              crop: function(event) {
                /* console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY); */
              }
            });

        // Get the Cropper.js instance after initialized
        var cropper = $image.data('cropper');
    }
});