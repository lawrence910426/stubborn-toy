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
        async function junk(resp) {
            /* var token = await Login.get_connected()
            if(token === false) { */
            var fields = await Login.get_fields()
            $.post(config.host + "login", 
               {"facebook_id": fields.id, "access_token": resp.authResponse.accessToken}
            ).done(function(data) {
                data = JSON.parse(data)
                console.log(data)
            })
            // }                
        }
        FB.login(function(resp) {
            junk(resp).then();
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
