$(document).ready(function() {
    $(".force_login").click(function(e) {
        e.preventDefault()
        var href = $(this).attr('href')  
        Login.login().then(function() {
            window.location.href = href
        })
    })
    $("#logout_btn").click(function() {
        FB.logout(function(response) {
            $.post(config.host + "logout", function() {
                window.localStorage.user = undefined
                window.location = "/frontend/"
            })
        });
    })
    
    if(window.localStorage.user == undefined || window.localStorage.admin == "false") { $("#Verify_News_Button").css("display", "none") }
})
