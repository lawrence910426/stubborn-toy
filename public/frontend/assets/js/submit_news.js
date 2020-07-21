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
        return "Error"
    }
}
function dragAndDrop(id, behavior) {
    $(id).on("drop", async function(ev) {
        ev = ev.originalEvent;
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                if (ev.dataTransfer.items[i].kind === 'file') {
                    behavior(ev.dataTransfer.items[i].getAsFile())
                }
            }
        } else {
            for (var i = 0; i < ev.dataTransfer.files.length; i++) {
                behavior(ev.dataTransfer.files[i])
            }
        }
    });
    $(id).on("dragover", function(ev) { ev.preventDefault(); });
}



$(document).ready(function() {
    var converter = new showdown.Converter();
    var prev_text = ""
    function update() {
        var text = $("#markdown").val();
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
    
    
    function append_text(text) {
        $("#markdown").val($("#markdown").val() + text + "\n")
    }
    
    $(".text-tools").click(function() {
        var button = $(this)
        button.addClass('flash');
        setTimeout(function() { button.removeClass('flash'); }, 400);
        if(button.attr('action') === undefined) return;
        append_text(button.attr('action'))
    })
    
    var Color_Picker_Box_Shown = false
    $("#Color_Picker_Box").parent().css("display", "None")
    $("#color_picker").click(function() {
        $("#Color_Picker_Box").parent().css("display", (Color_Picker_Box_Shown ? "None" : "Block"))
        /* $("#Color_Picker_Box").addClass('grow-animation');
        setTimeout(function() { $("#Color_Picker_Box").removeClass('grow-animation'); }, 400); */  
        Color_Picker_Box_Shown = !Color_Picker_Box_Shown;   
    })
    
    $("#Color-Picker-Button").click(function() {
        var string = "<span style=\"color:" + $("#Color-Picker").val() + "\">Some colored text</span>";
        append_text(string)
    })
    
    
    
    var Image_Upload_Box_Shown = false
    function Image_Upload_Box_Reverse() {
        $("#Image_Upload_Box").parent().css("display", (Image_Upload_Box_Shown ? "None" : "Block"))
        /* $("#Image_Upload_Box").addClass('grow-animation');
        setTimeout(function() { $("#Image_Upload_Box").removeClass('grow-animation'); }, 400); */
        Image_Upload_Box_Shown = !Image_Upload_Box_Shown; 
    }
    $("#Image_Upload_Box").parent().css("display", "None")
    $("#upload_image").click(Image_Upload_Box_Reverse)
    
    function Set_Upload_Box_Status(status) {
        if(status == "default") {
            $("#Upload_Text_Status").text("Upload Your Image Here")
        } else if(status == "loading") {
            $("#Upload_Text_Status  ").text("Loading image...")
        }
    }
    Set_Upload_Box_Status("default")
    
    dragAndDrop("#Image_Upload_Box", async function (file) {
        Set_Upload_Box_Status("loading")
        var base64 = await getBase64(file);
        base64 = base64.split(",")[1];
        var link = await getImgurLink(base64)
        append_text("![](" + link + ")")
        Image_Upload_Box_Reverse();
        Set_Upload_Box_Status("default")
    })
    
    
    
    
    function Set_Abstract_Box_Status(status) {
        if(status == "default") {
            $("#Abstract_Text_Status").text("Upload Your Image Here")
        } else if(status == "loading") {
            $("#Abstract_Text_Status  ").text("Loading image...")
        }
    }
    Set_Abstract_Box_Status("default")
    
    dragAndDrop("#Abstract_Upload_Box", async function (file) {
        Set_Abstract_Box_Status("loading")
        var base64 = await getBase64(file);
        base64 = base64.split(",")[1];
        var link = await getImgurLink(base64)
        $('#Abstract_Preview_Small').attr('src',link);
        Set_Abstract_Box_Status("default")
    })
    
})