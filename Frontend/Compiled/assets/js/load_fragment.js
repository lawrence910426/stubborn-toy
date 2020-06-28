$(document).ready(function() {
    $.get("Fragments/nav.html", function(data){
        var body = data.replace(/^.*?<body>(.*?)<\/body>.*?$/s,"$1");
        $("#Nav-bar").replaceWith(body);
    });
    $.get("Fragments/footer.html", function(data){
        var body = data.replace(/^.*?<body>(.*?)<\/body>.*?$/s,"$1");
        $("#Footer").replaceWith(body);
    });
})
