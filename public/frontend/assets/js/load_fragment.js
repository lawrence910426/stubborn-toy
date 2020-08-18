if($('#Nav-bar').html() == "") {
    const startkey = '<div id="nav">';
    const endkey = '<div id="nav_end"></div>';
    $.get("nav.html", function(data){
        var content = data.substring(
            data.lastIndexOf(startkey), 
            data.lastIndexOf(endkey)
        );
        $('#Nav-bar').html(content);
    });
}

if($('#Footer').html() == "") {
    $.get("footer.html", function(data){
        data = data.replace(/^.*?<div><\/div>(.*?)<div><\/div>.*?$/s, "$1");
        $("#Footer").html(data);
    });
}