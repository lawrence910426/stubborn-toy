if($('#Nav-bar').html() == "") {
    $.get("Fragments/nav.html", function(data){
        data = data.replace(/^.*?<div id="nav">(.*?)<\/div>.*?$/s, "$1");
        $('#Nav-bar').html(data);
    });
}

if($('#Footer').html() == "") {
    $.get("Fragments/footer.html", function(data){
        data = data.replace(/^.*?<div><\/div>(.*?)<div><\/div>.*?$/s, "$1");
        $("#Footer").html(data);
    });
}