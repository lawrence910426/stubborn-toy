if($('#Footer').html() == "") {
    $.get("footer.html", function(data){
        data = data.replace(/^.*?<div><\/div>(.*?)<div><\/div>.*?$/s, "$1");
        $("#Footer").html(data);
    });
}