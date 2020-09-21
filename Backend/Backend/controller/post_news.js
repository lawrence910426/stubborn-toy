module.exports = ((db) => {
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
            await db.post.create(input, { transaction: t })
            var post_instance;
            try {
                if (input.is_advanced) {
                    post_instance = await db.transfer.create({
                        user_id: input.author,
                        reason: "Advanced post",
                        amount: 20
                    }, { transaction: t })  

                    req.session.self.balance += 20
                    await req.session.self.save({ transaction: t })
                }
                await t.commit();
            } catch (error) {
                await t.rollback();
                console.log(error)
                res.send("Database deadlock");
            }
            
            res.send("OK")
        }
    }
});
