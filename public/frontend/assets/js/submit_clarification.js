$(document).ready(function() {
    $("#Consent_Advanced").click(function() {
        window.location = "edit_news.html?level=advanced"
    })
    
    $("#Consent_Normal").click(function() {
        window.location = "edit_news.html?level=normal"
    })
})