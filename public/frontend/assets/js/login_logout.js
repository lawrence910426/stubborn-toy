// Called with the results from FB.getLoginStatus().
function statusChangeCallback(response) {  
    // The current login status of the person.
    console.log('statusChangeCallback');
    console.log(response);                 
    // Logged into your webpage and Facebook.
    if (response.status === 'connected') {   
      testAPI();  
    } else {                                 
        // Not logged into your webpage or we are unable to tell.
        console.log("Not logged in")
    }
}

// Called when a person is finished with the Login Button.
function checkLoginState() {               
    // See the onlogin handler
    FB.getLoginStatus(function(response) {   
      statusChangeCallback(response);
    });
}


window.fbAsyncInit = function() {
    FB.init({
      appId      : '{app-id}',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : '{api-version}'           // Use this Graph API version for this call.
    });
    // Called after the JS SDK has been initialized.
};

// Testing Graph API after login.  See statusChangeCallback() for when this call is made.
function testAPI() {                      
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
}