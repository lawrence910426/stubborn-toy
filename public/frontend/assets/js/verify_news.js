$(document).ready(function() {
    function gen_abstract(news) {
        return `<div class="card" style="margin-bottom: 30px;">
    <div class="card-body">
        <h4 class="card-title">${news.title}</h4>
        <div class="d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center" src="${news.normal_image_link}" style="margin-top: 20px;margin-bottom: 20px;"><img /></div><p class="card-text"> ${news.category} ${news.datetime} ${news.is_headline ? " #頭條 " : ""} ${news.is_hot ? " #熱門 " : ""} ${news.is_interview ? " #專訪 " : ""} </br> </br> ${news.content.slice(0, 100)} </p><a class="card-link" href="#">查看${news.is_advanced == "1" ? "即時" : "普通"}投稿</a></div>
</div>`;
    }
    
    var A = ["shown", "not_shown"] 
    var B = ["advanced", "normal"] 
    
    A.forEach(function(a) {
        B.forEach(function(b) {
            var criteria = {
                "advanced": b == "advanced" ? 1 : 0, 
                "shown": a == "shown" ? 1 : 0, 
                "paging": { 
                    "offset": 0 * 18, 
                    "limit": 18 
                }
            }
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
})