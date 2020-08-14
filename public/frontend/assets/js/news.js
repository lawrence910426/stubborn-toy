$(document).ready(function() {
    var text = `
Mezco Toys MDS Mega Scale 15英吋「It」「潘尼懷斯」來了！You'll float too！ 

Mezco Toys是一間以製作恐怖可動人偶系列聞名的美系廠牌，Mezco Toys旗下MDS Mega Scale品牌人偶系列「潘尼懷斯」又開始預購了！

比爾因為弟弟的失蹤而有心理陰影，認識了其他朋友後，一起組成了「魯蛇俱樂部」，並打算解決鎮上小孩時常失蹤的原因「潘尼懷斯」，擊敗小丑潘尼懷斯後，眾人立下誓言若長大後小丑歸來，則會再回到鎮上消滅牠。

![](https://i.imgur.com/TLUopl8.jpg)

![](https://i.imgur.com/KLNsien.jpg)

![](https://i.imgur.com/kPJiLSZ.jpg)

雖然為15英寸的人偶，但臉部的妝容都有兼顧，額頭的地方甚至有些損傷，衣服都是使用布料材質，逼真度非常高，並且還能發出經典的電影台詞「You'll float too你也會漂浮」，外盒設計有良好的觀賞性可以完美的展示。

- 預購價格98美元 約2,881台幣
- 參考價格可能因匯率浮動都有可能影響
`
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    $("#post_content").empty().append(html);
})