/* The function is a CPU intensive task. */
/* The function SHOULD BE assinged to another process or core. */

/* news: { title, content, views, author, date, category } */

/*
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-7998707052960658"
     data-ad-slot="8968032604"></ins>
	<script>
	     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
*/

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

	function gen_AMP(news) {
		var img_links = [... news.content.matchAll(/!\[\]\([^\)]*\)/gm)]
		var links = []
		img_links.forEach(item => links.push(item[0].slice(4, -1)))
		var json = {	
			"headline": utf8.decode("\xe7\x8e\xa9\xe5\x85\xb7\xe6\x96\xb0\xe8\x81\x9e\xef\xbd\x9c\xe4\xb8\x80\xe7\x9b\xb4\xe9\xa0\x91\x53\x74\x75\x62\x62\x6f\x72\x6e\x20\x54\x6f\x79\x20\x4e\x65\x77\x73"),
			"image": links
		}
		return `<script type="application/ld+json">` + JSON.stringify(json) + `</script>`;
	}

	try {
		var html = converter.makeHtml(news.content);
		var template = await read_template();
		var root = HTMLParser.parse(template);			
		root.querySelector("#post_content").set_content(html)
		root.querySelector("#title").set_content(utf8.decode('\xe3\x80\x90') + news.category + utf8.encode('\xe3\x80\x91') + news.title)
		root.querySelector("#views").set_content(utf8.decode('\xe7\x80\x8f\xe8\xa6\xbd\xe6\xac\xa1\xe6\x95\xb8\xef\xbc\x9a') + news.views + utf8.decode('\x20\xe6\xac\xa1'))
		root.querySelector("#author").set_content(utf8.decode('\xe4\xbd\x9c\xe8\x80\x85\xef\xbc\x9a') + news.author)
		root.querySelector("#date").set_content(utf8.decode('\xe6\x97\xa5\xe6\x9c\x9f\xef\xbc\x9a') + moment(news.date).format("YYYY-MM-DD"))
		root.querySelector("#category").set_content(utf8.decode('\xe9\xa1\x9e\xe5\x88\xa5\xef\xbc\x9a') + news.category)
		var output = root.toString()
		output = output.replace(/<script type="application\/ld\+json">[^<]*<\/script>/gm, gen_AMP(news));
		return output;
	} catch (ex) {
		console.log(ex)
		return ex;
	}
}
