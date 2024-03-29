// const workerpool = require('workerpool');
// const pool = workerpool.pool();
const gen_post = require('../view/generate_post.js');

module.exports = ((db, config) => {
	return async (req, res) => {
		/* ---------------------------------- */
		const input = { id: req.params.id }
		/* ---------------------------------- */
		var news = await db.news.findAll({
			where: { id: input.id },
			include: [{
				model: db.user,
				attributes: ['name'],
				as: "author"
			}]
		})
		if (news.length == 0) {
			res.send("id not found")
		} else {
			news = news[0]
			news.views += 1
			await news.save()
			gen_post({
				title: news.title,
				content: news.content,
				views: news.views,
				author: news.author.name,
				date: news.datetime,
				category: news.category
			}, config)
				.then(function (result) { res.send(result) })
				.catch(function (err) { console.error(err); })
		}
	}
});
