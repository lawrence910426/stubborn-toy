$(document).ready(function() {
    function get_fields() {
        return new Promise(function(result, reject) {
            FB.api('/me', function(response) {
                console.log(JSON.stringify(response));
                result(response);
            });
        })
    }
    function get_connected() {
        return new Promise(function(result, reject) {
            FB.getLoginStatus(function(response) {
                result(response.status === 'connected')
            });  
        })
    }
    $("#login_btn").click(function() {
        async function junk() {
            if(await get_connected()) {
                console.log(await get_response());
                // call server for update/register and fetch futher information.
            }                
        }
        FB.login(function() {
            junk();
            refresh();
        }, {scope: 'public_profile,email'});  
    })
    $("#logout_btn").click(function() {
        FB.logout(function() {
            // call server for deleting session.
            refresh();
        }, {scope: 'public_profile,email'});
     }
    
    function refresh() {
        get_connected().then(function(ans) {
            if(ans) {
                $("#login_btn").css("display", "none");
                $("#logout_btn").css("display", "block");
            } else {
                $("#login_btn").css("display", "block");
                $("#logout_btn").css("display", "none");
            }
        })   
    }
})

