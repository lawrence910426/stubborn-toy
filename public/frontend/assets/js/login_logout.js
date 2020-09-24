var Login = {
    get_fields: function() {
        return new Promise(function(result, reject) {
            FB.api('/me', function(response) {
                console.log(JSON.stringify(response));
                result(response);
            });
        })
    },
    get_connected: function() {
        return new Promise(function(result, reject) {
            FB.getLoginStatus(function(response) {
                console.log(response)
                result(response.status === 'connected' ? response.authResponse.accessToken : false)
            });  
        })
    },
    login: function() {
        async function junk() {
            /* var token = await Login.get_connected()
            if(token === false) { */
            var resp = await Login.get_fields()
            $.post(config.host + "login", 
               {"facebook_id": resp.id, "access_token": token}
            ).done(function(data) {
                data = JSON.parse(data)
                console.log(data)
            })
            // }                
        }
        FB.login(function(resp) {
            console.log(resp)
            junk().then();
        }, {scope: 'public_profile,email'});  
    },
    logout: function() {
        FB.logout(function() {
            $.post(config.host + "logout").done(function(data) {
                data = JSON.parse(data)
                console.log(data)
            })
        }, {scope: 'public_profile,email'});
     }
}
