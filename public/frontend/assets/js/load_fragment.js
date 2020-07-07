if($('#Nav-bar').html() == "") {
    $.get("nav.html", function(data){
        data = data.replace(/^.*?<div id="nav">(.*?)<\/div>.*?$/s, "$1");
        $('#Nav-bar').html(data);
    });
}

if($('#Footer').html() == "") {
    $.get("footer.html", function(data){
        data = data.replace(/^.*?<div><\/div>(.*?)<div><\/div>.*?$/s, "$1");
        $("#Footer").html(data);
    });
}