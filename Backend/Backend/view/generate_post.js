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
        var html = converter.makeHtml(news.content);
        var root = HTMLParser.parse(await read_template());
        root.querySelector(".post_content").set_content(html)

        /* Views, author, date, category, title */
        return root.toString();
    } catch (ex) {
        console.log(ex)
        return ex;
    }
}
