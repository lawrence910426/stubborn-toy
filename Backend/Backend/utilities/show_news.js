const JSSoup = require('jssoup').default;
const showdown = require('showdown'), converter = new showdown.Converter();
const workerpool = require('workerpool');
const pool = workerpool.pool();
const fs = require('fs');

module.exports = ((db, config) => {
    function read_file(name) {
        return Promise((resolve, reject) => {
            fs.readFile(config.news_template, 'utf8', function (err, data) {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    async function generate_page(news) {
        var html = converter.makeHtml(news.content);
        var soup = new JSSoup(await read_file(config.news_template));
        var post_content = soup.find('div', 'post_content')
        post_content.string.replaceWith(html);
        /* Views, author, date, category, title */
    }

    return async (req, res) => {
        /* ---------------------------------- */
        const input = { id: req.body.id }
        /* ---------------------------------- */
        const news = await db.news.find({ where: { id: input.id } })
        pool.exec(generate_page, [news])
            .then(function (result) { res.send(result); })
            .catch(function (err) { console.error(err); })
            .then(function () { pool.terminate(); });
    }
});
