if($('#Nav-bar').html() == "") {
    const nav_content = `<div id="nav">
        <nav class="navbar navbar-light navbar-expand-md navigation-clean-button">
            <div class="container"><a class="navbar-brand border rounded-0 border-white" href="index.html"><img class="img-thumbnail border rounded-0 border-white" style="width: 100px;height: 100px;border: 0 none;box-shadow: none;margin: 0px;" src="/logo_temp.jpg" width="100px" height="100px"></a>
                <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navcol-1">
                        <div class="row" style="width: 100%;margin: 0px;">
                            <div class="col-md-11 col-lg-8 col-xl-7" style="padding: 0px;">
                                <ul class="nav navbar-nav">
                                    <li class="nav-item hover_darken" role="presentation" style="margin-top: 12px;"><a class="nav-link d-flex justify-content-center align-items-center" href="submit_clarification.html">投稿</a></li>
                                    <li class="nav-item" role="presentation" style="width: 30px;"></li>
                                    <li class="nav-item hover_darken" role="presentation" style="margin-top: 12px;"><a class="nav-link d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" href="personal_info.html">查看帳戶</a></li>
                                    <li class="nav-item" role="presentation" style="width: 30px;"></li>
                                    <li class="nav-item hover_darken" role="presentation" style="margin-top: 12px;"><a class="nav-link d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" href="verify_news.html">審核文章</a></li>
                                    <li class="nav-item" role="presentation" style="width: 30px;"></li>
                                    <li class="nav-item hover_darken" role="presentation" style="margin-top: 12px;"><a class="nav-link d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" href="https://docs.google.com/forms/d/e/1FAIpQLScSGyOaDoGNYv_ngf0CcLSWDBp9j2Jdq8T_ckSEdNzka5Z0DA/viewform?vc=0&c=0&w=1&flr=0">意見回復</a></li>
                                </ul>
                            </div>
                            <div class="col-md-4 col-lg-3 col-xl-2 offset-md-8 offset-lg-1 offset-xl-3" style="padding: 0px;">
                                <ul class="nav navbar-nav d-md-flex d-lg-flex d-xl-flex mr-auto justify-content-md-end justify-content-lg-end justify-content-xl-end">
                                    <li class="nav-item d-flex justify-content-center align-items-center" role="presentation" style="margin-top: 12px;"><a class="nav-link bg-light border rounded-circle d-flex justify-content-center align-items-center" href="verify_news.html" style="padding: 0px;padding-top: 0px;padding-bottom: 0px;padding-right: 0px;padding-left: 0px;width: 100%;height: 100%;min-width: 40px;max-width: 40px;min-height: 40px;max-height: 40px;"><i class="fa fa-facebook d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" style="width: 100%;height: 100%;font-size: 21px;"></i></a></li>
                                    <li class="nav-item" role="presentation" style="width: 30px;"></li>
                                        <li class="nav-item d-flex justify-content-center align-items-center" role="presentation" style="margin-top: 12px;"><a class="nav-link bg-light border rounded-circle d-flex justify-content-center align-items-center" href="verify_news.html" style="padding: 0px;padding-top: 0px;padding-bottom: 0px;padding-right: 0px;padding-left: 0px;width: 100%;height: 100%;min-width: 40px;max-width: 40px;min-height: 40px;max-height: 40px;"><i class="fa fa-instagram d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" style="width: 100%;height: 100%;font-size: 21px;"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
        </nav>
    </div>`;
    $('#Nav-bar').html(nav_content);
}

if($('#Footer').html() == "") {
    $.get("footer.html", function(data){
        data = data.replace(/^.*?<div><\/div>(.*?)<div><\/div>.*?$/s, "$1");
        $("#Footer").html(data);
    });
}