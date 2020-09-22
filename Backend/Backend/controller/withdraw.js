module.exports = (() => {
    return async (req, res) => {
        /* ---------------------------------- */
        const input = { withdraw: req.body.stat }
        /* ---------------------------------- */
        if (req.session.self == undefined) {
            res.send("Access denied")
        } else {
            req.session.self.withdraw = input.withdraw
            await req.session.self.save()
            res.send("OK")
        }
    }
});
