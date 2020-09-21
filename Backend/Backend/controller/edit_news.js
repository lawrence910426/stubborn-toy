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
            is_shown: req.body.is_shown,
            is_advanced: req.body.is_advanced
        }
        /* ---------------------------------- */
        if (req.session.self === undefined) res.send("Access denied")
        else {
            const t = await sequelize.transaction();
            input.author = req.session.self.id
            await db.post.create(input, { transaction: t })
            await db.post.update(
                input,
                { where: { id: req.body.id } }
            )

            res.send("OK")
        }
    }
});
