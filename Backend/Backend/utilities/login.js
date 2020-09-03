module.exports = ((sequelize, db, https) => {
    function get_name(id, token) {
        return new Promise((resolve, reject) => {
            https.get('https://graph.facebook.com/${id}/?fields=name&access_token=${token}', (resp) => {
                let data = '';
                resp.on('data', (chunk) => { data += chunk; });
                resp.on('end', () => { resolve(data); });
            }).on("error", reject);
        })
    }

    return async (req, res) => {
        /* --------------------------- */
        var inputs = {
            facebook_id: req.body.facebook_id,
            access_token: req.body.access_token
        }
        /* --------------------------- */

        var user_name;
        try { user_name = await get_name(); }
        catch (ex) {
            console.log(ex)
            res.send("Invalid token");
            return;
        }

        const t = await sequelize.transaction();
        var self;
        try {
            self = db.user.findAll({ where: { facebook_id: inputs.facebook_id } })
            if (user.self == 0) {
                self = await db.user.create({
                    facebook_id: inputs.facebook_id,
                    name: user_name,
                    admin: false,
                    balance: 0,
                    withdraw: false,
                    bank_id: "",
                    bank_account: ""
                });
            } else {
                self = self[0];
                self.name = user_name;
                await self.save();
            }
            await t.commit();
        } catch (error) {
            await t.rollback();
            console.log(error)
            res.send("Database deadlock");
        }
        res.send(JSON.stringify(self))
        req.session.self = self
    }
});
