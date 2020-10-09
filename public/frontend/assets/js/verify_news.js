$(document).ready(function() {
    function gen_abstract(news) {
        return `<div class="card" style="margin-bottom: 30px;">
    <div class="card-body">
        <h4 class="card-title">${news.title}</h4>
        <div class="d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center" src="${news.normal_image_link}" style="margin-top: 20px;margin-bottom: 20px;"><img /></div><p class="card-text"> #${news.category} ${news.datetime} ${news.is_headline ? " #頭條 " : ""} ${news.is_hot ? " #熱門 " : ""} ${news.is_interview ? " #專訪 " : ""} </br> </br> ${news.content.slice(0, 100)} </p><a class="card-link" href="edit_news.html?edit_id=${news.id}">查看${news.is_advanced == "1" ? "即時" : "普通"}投稿</a></div>
</div>`;
    }
    
    var url = new URL(window.location.href)
    var page = {
        shown: parseInt(url.searchParams.get("shown_page")),
        unshown: parseInt(url.searchParams.get("unshown_page"))
    }
    function pagination_hooks(type) {
        function change_page(temp) {
            window.location.href = url.pathname + `?shown_page=` + temp.shown + "&unshown_page=" + temp.unshown
        }
        if(isNaN(page[type])) page[type] = 1
        var begin = Math.max(0, page[type] - 3)

        for(var i = 1;i <= 5;i++) {
            const clone = i + begin
            $(`#${type}_${i} a`).text((i + begin).toString()).click(function() {
                var temp = JSON.parse(JSON.stringify(page))
                temp[type] = clone
                change_page(temp)
            })
            
            if(page[type] == i + begin) $(`#${type}_${i} a`).addClass("font-weight-bold").addClass("font-italic")
        }

        $(`#${type}_pagination_right`).click(function() { 
            var temp = JSON.parse(JSON.stringify(page))
            temp[type] += 1
            change_page(temp)
        })
        $(`#${type}_pagination_left`).click(function() { 
            var temp = JSON.parse(JSON.stringify(page))
            temp[type] -= 1
            change_page(temp)
        })
    }
    pagination_hooks("shown")
    pagination_hooks("unshown")
    
    
    function refresh() {
        var A = ["shown", "not_shown"] 
        var B = ["advanced", "normal"] 
        
        A.forEach(function(a) {
            B.forEach(function(b) {
                $(`.${a}.${b}`).empty()   
            })
        })
        
        A.forEach(function(a) {
            B.forEach(function(b) {
                var criteria = {
                    "advanced": b == "advanced" ? 1 : 0, 
                    "shown": a == "shown" ? 1 : 0, 
                    "paging": { 
                        "offset": (a == "shown" ? page.shown : page.unshown) * 20 - 20, 
                        "limit": 20 
                    }
                }
                if($("#activate_headline").is(":checked")) criteria.headline = $('#headline').is(":checked") ? 1 : 0;
                if($("#activate_interview").is(":checked")) criteria.interview = $('#interview').is(":checked") ? 1 : 0;
                if($("#activate_hot").is(":checked")) criteria.hot = $('#hot').is(":checked") ? 1 : 0
                
                $.post(
                    config.host + "get_news", 
                    criteria
                ).done(function(data) {
                    data = JSON.parse(data)
                    data.forEach((element) => {
                        $(`.${a}.${b}`).append(gen_abstract(element))
                    });
                })      
            })
        })
    }
    
    refresh();
    
    $("#hot").change(refresh)
    $("#headline").change(refresh)
    $("#interview").change(refresh)
    $("#activate_hot").change(refresh)
    $("#activate_headline").change(refresh)
    $("#activate_interview").change(refresh)
})