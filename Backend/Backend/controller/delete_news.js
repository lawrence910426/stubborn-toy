module.exports = ((db) => {
    return async (req, res) => {
        /* ---------------------------------- */
        var input = { id: req.body.id }
        /* ---------------------------------- */
        if (req.session.self === undefined || !req.session.self.admin) res.send("Access denied")
        else {
            db.post.destroy({ where: input })
            res.send("OK")
        }
    }
});
