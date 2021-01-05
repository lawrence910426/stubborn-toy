$(document).ready(function() {
    $(".force_login").click(function(e) {
        e.preventDefault()
        var href = $(this).attr('href')  
        Login.login().then(function() {
            window.location.href = href
        })
    })
    $("#logout_btn").click(function() {
        Login.logout().then(function() {
            window.location.href = "/frontend"
        })
    })
    
    if(window.localStorage.user == undefined) {
        $("#Verify_News_Button").css("display", "none") 
        $("#logout_btn").css("display", "none")
    }
})
