module.exports = ((db) => {
    return async (req, res) => {
        /* ---------------------------------- */
        const input = {
            withdraw: req.body.withdraw,
            bank_id: req.body.bank_id,
            bank_account: req.body.account
        }
        /* ---------------------------------- */

        var clause = {}
        for (var key in input) if (input[key] !== undefined) {
            if (key == "withdraw") clause[key] = input[key] == "true"
            else clause[key] = parseInt(input[key])
        }
        console.log(JSON.stringify(clause))

        if (req.session.self == undefined) {
            res.send("Access denied")
        } else {
            await db.user.update(
                clause,
                { where: { id: req.session.self.id } }
            )
            res.send("OK")
        }
    }
});
