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
                result(response.status === 'connected' ? response.authResponse.accessToken : false)
            });  
        })
    },
    login: function() {
        async function junk() {
            var token = await get_connected()
            if(!token) {
                var resp = await get_response()
                $.post(config.host + "login", 
                   {"facebook_id": resp.id, "access_token": token}
                ).done(function(data) {
                    data = JSON.parse(data)
                    console.log(data)
                })
            }                
        }
        FB.login(function() {
            junk();
            refresh();
        }, {scope: 'public_profile,email'});  
    },
    logout: function() {
        FB.logout(function() {
            $.post(config.host + "logout").done(function(data) {
                data = JSON.parse(data)
                console.log(data)
            })
        }, {scope: 'public_profile,email'});
     },
    force_login: async function() {
        if(await get_connected()) login();
    }
}
