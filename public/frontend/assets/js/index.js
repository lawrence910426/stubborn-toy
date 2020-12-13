$(document).ready(function() {
    function gen_headline(news, active) {
        return `<div news_id="${news.id}" class="${active} carousel-item view_news" style="background-color: rgb(255,255,255);">
            <a href="${news.id}"><div class="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-start align-items-xl-center"
                style="width: 100%;">
                <h1 class="text-truncate text-left" style="font-size: 32px;width: 100%;color: #000855;margin: 0px 12px;"><strong>${news.title}</strong></h1>
            </div>
            <div class="d-sm-flex d-xl-flex justify-content-sm-center align-items-sm-center justify-content-xl-center align-items-xl-center"><img class="flex-grow-0 flex-shrink-0" src="${news.headline_image_link}" alt="Slide Image" style="width: 100%;" /></div>
        </a></div>`
    }
    
    function gen_news(news) {
        return `<div class="view_news col-6 col-md-4" news_id="${news.id}"><a href="${news.id}">
    <div style="width: 100%;height: 100%;"><img src="${news.normal_image_link}" style="width: 100%;" /><label class="text-left" style="width: 100%; overflow: hidden; color: black;">${news.title}</label></div></a>
</div>`;
    }
    
    function gen_interview(news) {
        return `<div class="view_news" news_id="${news.id}" style="width: 100%;"><a href="${news.id}"><label class="text-left d-xl-flex justify-content-xl-start" style="color:black; width: 100%;">${news.title}</label>
    <div class="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center" style="margin-bottom: 12px;"><img src="${news.normal_image_link}" /></div></a>
</div>`
    }
    
    function gen_hot(news) {
        return `<div><a href=${news.id}>
    <hr />
    <div class="row">
        <div news_id="${news.id}" class="view_news col-4 col-xl-3"><img style="width: 100%;" src="${news.normal_image_link}" /></div>
        <div class="col" style="padding-left: 0px;">
            <div class="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-start" style="  width: 100%;
  height: 100%;
"><label class="text-left" style="color: black;width: 100%;
">${news.title}</label></div>
        </div>
    </div>
</a></div>`
    }
    
    function change_page(page) {
        window.location.href = url.pathname + "?page=" + page
    }
    
    var url = new URL(window.location.href)
    var page = parseInt(url.searchParams.get("page"))
    if(isNaN(page)) page = 1
    var begin = Math.max(0, page - 3)
    
    for(var i = 1;i <= 5;i++) {
        const clone = i + begin
        $(`#${i} a`).text((i + begin).toString()).click(function() {
            change_page(clone)
        })
        
        if(page == i + begin) $(`#${i} a`).addClass("font-weight-bold").addClass("font-italic").css("color", "red")
    }
    
    $(`#pagination_right`).click(function() { change_page(page + 1) })
    $(`#pagination_left`).click(function() { change_page(page - 1) })
    
    Promise.all([
        new Promise((res, rej) => {
            $.post(config.host + "get_news", 
               {"shown": 1, "headline": 1, "paging": { "offset": 0, "limit": 5 }}
            ).done(function(data) {
                data = JSON.parse(data)
                data.forEach((element, i) => {
                    $("#headline_carousel").append(gen_headline(element, i == 0 ? "active" : "")) 
                    $("#headline_indicator").append(`<li data-target="#carousel-1" data-slide-to="${i}" class=""></li>`)
                });
                res()
            })
        }),
        new Promise((res, rej) => {
            $.post(config.host + "get_news", 
                   {"shown": 1, "hot": 1, "paging": { "offset": 0, "limit": 5 }}
            ).done(function(data) {
                data = JSON.parse(data)
                data.forEach((element, i) => {
                    $("#hot_news").append(gen_hot(element))
                });
                res()
            })
        }),
        new Promise((res, rej) => {
            $.post(config.host + "get_news", 
                   {"shown": 1, "interview": 1, "paging": { "offset": 0, "limit": 5 }}
            ).done(function(data) {
                data = JSON.parse(data)
                data.forEach((element, i) => {
                    $("#interview_news").append(gen_interview(element))
                });
                res()
            })
        }),
        new Promise((res, rej) => {
            $.post(config.host + "get_news", 
                   {"shown": 1, "paging": { "offset": page * 18 - 18, "limit": 18 }}
            ).done(function(data) {
                data = JSON.parse(data)
                data.forEach((element, i) => {
                    $("#normal_news").append(gen_news(element))
                });
                res()
            }) 
        })
    ]).then(function() {
        $(".view_news").click(function(e) {
            e.preventDefault();
            window.open("/frontend/" + $(this).attr("news_id"), "_blank");
        })  
    })
    
    $(".search_key").click(function() {
        var key = $(this).text()
        window.location.href = `/frontend/search_result.html?q=${key}`
    })
    

})