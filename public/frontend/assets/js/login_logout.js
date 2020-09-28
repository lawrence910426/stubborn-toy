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
        return new Promise((res, rej) => {
            FB.login(function(resp) {
                Login.get_fields().then((fields) => {
                    $.post(config.host + "login", 
                       {"facebook_id": fields.id, "access_token": resp.authResponse.accessToken}
                    ).done(function(data) {
                        data = JSON.parse(data)
                        window.localStorage.admin = data.admin
                        res()
                    })
                })
            }, {scope: 'public_profile,email'});  
        });
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
