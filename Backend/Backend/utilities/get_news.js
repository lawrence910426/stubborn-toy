module.exports = ((db, Op) => {
    /* ---------------------------------- */
    const example_input = {
        shown: false,
        headline: false,
        interview: false,
        hot: false,
        paging: {
            limit: 10,
            offset: 20
        }
    }
    /* ---------------------------------- */

    return async (req, res) => {
        var inputs = {
            is_shown: (req.session.self === undefined ? true : req.body.shown),
            is_headline: req.body.headline,
            is_interview: req.body.interview,
            is_hot: req.body.hot
        }
        var clause = []
        for (var key in inputs) if (inputs[key] === null) clause.push({ key: inputs[key] })

        var criteria = {
            attributes: {
                exclude: (req.session.self || req.session.self.admin ? ['user_to_news'] : ['user_to_news', 'user_id', 'notify', 'email']),
            },
            include: [{
                model: db.user,
                attributes: ['name'],
                as: "author"
            }],
            where: { [Op.and]: clause },
            order: [['id', 'DESC']],
        }
        if (req.body.hasOwnProperty("paging") && req.body.paging.hasOwnProperty("limit") && req.body.paging.hasOwnProperty("offset")) {
            criteria.limit = req.body.paging.limit;
            criteria.offset = req.body.paging.offset;
        }

        res.send(JSON.stringify(await db.news.findAll(criteria)))
    }
});
