/* The function is a CPU intensive task. */
/* The function SHOULD BE assinged to another process or core. */

/* news: { title, content, views, author, date, category } */
module.exports = async (news, config) => {
    const fs = require('fs');
    const showdown = require('showdown'), converter = new showdown.Converter();
    var HTMLParser = require('node-html-parser');

    function read_template() {
        return new Promise((resolve, reject) => {
            fs.readFile(config.news_template, 'utf8', function (err, data) {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    try {
        console.log(news)
        var html = converter.makeHtml(news.content);
        var root = HTMLParser.parse(await read_template());
        root.querySelector("#post_content").set_content(html)
        root.querySelector("#title").set_content('[' + news.category + ']' + news.title)
        /* root.querySelector("#views").set_content(```瀏覽次數：${news.views} 次```)
        root.querySelector("#author").set_content(```作者：${news.author}```)
        root.querySelector("#date").set_content(```投稿日期：${news.date}```)
        root.querySelector("#category").set_content(```${news.category}```) */
        return root.toString();
    } catch (ex) {
        console.log(ex)
        return ex;
    }
}
