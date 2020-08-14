$(document).ready(function() {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(prompt());
    $("#post_content").empty().append(html);
})