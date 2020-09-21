$(document).ready(function() {
    function gen_headline(news, active) {
        return `<div class="${active} carousel-item" style="background-color: rgb(255,255,255);">
            <div class="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-start align-items-xl-center"
                style="width: 100%;">
                <h1 class="text-left" style="font-size: 32px;width: 100%;color: #000855;margin: 0px 12px;"><strong>${news.title}</strong></h1>
            </div>
            <div class="d-sm-flex d-xl-flex justify-content-sm-center align-items-sm-center justify-content-xl-center align-items-xl-center"><img class="flex-grow-0 flex-shrink-0" src="${news.headline_image_link}" alt="Slide Image" style="width: 100%;" /></div>
        </div>`
    }
    $.post(config.host + "get_news", 
           {"paging": { "offset": 0, "limit": 3 }}
    ).done(function(data) {
        data = JSON.parse(data)
        data.forEach((element, i) => {
            console.log(element)
            $("#headline_carousel").append(gen_headline(element, i == 0 ? "active" : "")) 
            $("#headline_indicator").append(`<li data-target="#carousel-1" data-slide-to="${i}" class=""></li>`)
        });
    })
    $(".view_news").click(function() {
        window.location = "frontend/news/" + $(this).attr("news_id");
    })
})