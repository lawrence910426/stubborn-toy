/* The function is a CPU intensive task. */
/* The function SHOULD BE assinged to another process or core. */

/* news: { title, content, views, author, date, category } */
module.exports = async (news, config) => {
    const fs = require('fs');
    const showdown = require('showdown'), converter = new showdown.Converter();
    const HTMLParser = require('node-html-parser');
    const utf8 = require('utf8');
    const moment = require('moment');

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
        root.querySelector("#post_content").set_content(html)
        root.querySelector("#title").set_content('[' + news.category + ']' + news.title)
        root.querySelector("#views").set_content(utf8.decode('\xe7\x80\x8f\xe8\xa6\xbd\xe6\xac\xa1\xe6\x95\xb8\xef\xbc\x9a') + news.views + utf8.decode('\x20\xe6\xac\xa1'))
        root.querySelector("#author").set_content(utf8.decode('\xe4\xbd\x9c\xe8\x80\x85\xef\xbc\x9a') + news.author)
        root.querySelector("#date").set_content(utf8.decode('\xe6\x97\xa5\xe6\x9c\x9f\xef\xbc\x9a') + moment(news.date).format("YYYY-MM-DD"))
        root.querySelector("#category").set_content(utf8.decode('\xe9\xa1\x9e\xe5\x88\xa5\xef\xbc\x9a') + news.category)
        return root.toString();
    } catch (ex) {
        console.log(ex)
        return ex;
    }
}
