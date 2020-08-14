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
    var simplemde = new SimpleMDE({ element: $("#markdown")[0] })
    
    var converter = new showdown.Converter();
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
    
    var Img_DropZone = new Dropzone('#Upload_Box', {
        url: '/',
        accept: async function(file, done) {
            var content = await getBase64(file);
            content = content.split(",")[1];
            var link = await getImgurLink(content);
            $("#Image_Link").text(link);
            done();
        }
    });
    
    function init_cropper() {
        var $image = $('#Abstract_Preview_Small');
            $image.cropper({
              aspectRatio: 1 / 1,
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