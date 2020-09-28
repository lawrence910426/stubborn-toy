module.exports = ((db) => {
    return async (req, res) => {
        /* ---------------------------------- */
        const input = {
            withdraw: req.body.withdraw,
            bank_id: req.body.bank_id,
            bank_account: req.body.account
        }
        /* ---------------------------------- */

        var clause = []
        for (var key in input) if (input[key] !== undefined) clause.push(input[key])
        

        if (req.session.self == undefined) {
            res.send("Access denied")
        } else {
            await db.user.update(
                { clause },
                { where: req.session.self.id }
            )
            res.send("OK")
        }
    }
});
