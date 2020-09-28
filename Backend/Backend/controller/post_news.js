module.exports = ((sequelize, db) => {
    return async (req, res) => {
        /* ---------------------------------- */
        var input = {
            title: req.body.title,
            content: req.body.content,
            normal_image_link: req.body.normal_image_link,
            category: req.body.category,
            is_advanced: req.body.is_advanced,
            notify: req.body.notify,
            email: req.body.email
        }
        /* ---------------------------------- */

        if (req.session.self === undefined) res.send("Access denied")
        else {
            const t = await sequelize.transaction();
            input.author = req.session.self.id
            await db.news.create(input, { transaction: t })
            
            try {
                if (input.is_advanced) {
                    post_instance = await db.transfer.create({
                        user_id: input.author,
                        reason: "Advanced post",
                        amount: 20
                    }, { transaction: t })  

                    await db.user.increment(
                        'balance',
                        { by: 20, where: { id: req.session.self.id } }
                    );
                }
                await t.commit();
            } catch (error) {
                await t.rollback();
                console.error(error)
                res.send("Database deadlock");
            }
            
            res.send("OK")
        }
    }
});
