module.exports = ((db) => {
    return async (req, res) => {
        /* ---------------------------------- */
        var input = {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            normal_image_link: req.body.normal_image_link,
            headline_image_link: req.body.headline_image_link,
            category: req.body.category,
            is_headline: req.body.is_headline,
            is_hot: req.body.is_hot,
            is_interview: req.body.is_interview,
            is_shown: req.body.is_shown
        }
        /* ---------------------------------- */
        if (req.session.self === undefined || !req.session.self.admin) res.send("Access denied")
        else {
            input.author = req.session.self.id
            await db.news.update(
                input,
                { where: { id: req.body.id } }
            )

            res.send("OK")
        }
    }
});
