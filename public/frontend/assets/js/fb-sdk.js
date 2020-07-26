window.fbAsyncInit = function() {
    FB.init({
      appId      : '1201823270181889',
      cookie     : true,
      xfbml      : true,
      version    : 'v7.0'
    });
    FB.AppEvents.logPageView(); 
    $(document).ready(function() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response); 
        }); 
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));