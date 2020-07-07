$(document).ready(function() {
    console.log("QQ")
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
    
    $(".text-tools").click(function() {
        var button = $(this)
        button.addClass('flash');
        setTimeout(function() { button.removeClass('flash'); }, 400);
        if(button.attr('action') === undefined) return;
        $("#markdown").text($("#markdown").text() + button.attr('action') + "\n")
    })
    
    var Image_Upload_Box_Shown = false
    $("#Image_Upload_Box").parent().css("display", "None")
    $("#upload_image").click(function() {
        $("#Image_Upload_Box").parent().css("display", (Image_Upload_Box_Shown ? "None" : "Block"))
        /* $("#Image_Upload_Box").addClass('grow-animation');
        setTimeout(function() { $("#Image_Upload_Box").removeClass('grow-animation'); }, 400); */
        Image_Upload_Box_Shown = !Image_Upload_Box_Shown; 
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
        $("#markdown").text($("#markdown").text() + string + "\n")
    })
})