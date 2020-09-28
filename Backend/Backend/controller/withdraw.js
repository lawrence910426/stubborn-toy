module.exports = ((db) => {
    return async (req, res) => {
        /* ---------------------------------- */
        const input = {
            withdraw: req.body.withdraw == "true",
            bank_id: parseInt(req.body.bank_id),
            bank_account: parseInt(req.body.account)
        }
        /* ---------------------------------- */

        var clause = {}
        for (var key in input) if (input[key] !== undefined) clause[key] = input[key]
        console.log(JSON.stringify(clause))

        if (req.session.self == undefined) {
            res.send("Access denied")
        } else {
            await db.user.update(
                clause,
                { where: req.session.self.id }
            )
            res.send("OK")
        }
    }
});
