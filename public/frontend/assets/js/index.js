$(document).ready(function() {
    $(".view_news").click(function() {
        window.location = "news.html?id=" + $(this).attr("news_id");
    })
    $("#jump_login").click(function() {
        window.location = "login_logout.html"
    })
})