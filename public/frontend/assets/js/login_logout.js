$(document).ready(function() {
    function get_fields() {
        return Promise(function(result, reject) {
            FB.api('/me', function(response) {
                console.log(JSON.stringify(response));
                result(response);
            });
        })
    }
    function get_connected() {
        return Promise(function(result, reject) {
            FB.getLoginStatus(function(response) {
                result(response.status === 'connected')
            });  
        })
    }
    $("#login_btn").click(function() {
        async function junk() {
            if(await get_connected())
                console.log(await get_response());
        }
        FB.login(function() {
            junk();
        }, {scope: 'public_profile,email'});  
    })
})

