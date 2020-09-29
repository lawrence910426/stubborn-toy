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
        },
        advanced: true,
        id: 1
    }
    /* ---------------------------------- */

    return async (req, res) => {
        var inputs = {
            is_shown: (req.session.self === undefined || !req.session.self.admin ? true : req.body.shown == "1"),
            is_headline: req.body.headline,
            is_interview: req.body.interview,
            is_hot: req.body.hot,
            is_advanced: req.body.advanced,
            id: req.body.id
        }
        var clause = []
        for (var key in inputs) if (inputs[key] !== undefined) {
            var temp = {};
            temp[key] = inputs[key];
            clause.push(temp)
        }

        var criteria = {
            attributes: {
                exclude: (req.session.self && req.session.self.admin ? ['user_to_news'] : ['user_to_news', 'user_id', 'notify', 'email']),
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
            criteria.limit = parseInt(req.body.paging.limit);
            criteria.offset = parseInt(req.body.paging.offset);
        }

        const ret = await db.news.findAll(criteria)
        res.send(JSON.stringify(ret.map(x => x.toJSON())))
    }
});
