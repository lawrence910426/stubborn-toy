const process = require('process');
const express = require('express')
const config = require('./config.js')(process);
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path')
const https = require('https');
const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize(config.database.db_name, config.database.user_name, config.database.password, {
    host: 'localhost', dialect: 'mysql',
    define: { charset: 'utf8', dialectOptions: { collate: 'utf8_unicode_ci' }, timestamps: false },
    pool: config.database.pool
});
const fs = require('fs')
const db_model = require('./db_model.js');
const db = db_model(Sequelize, Model, DataTypes, sequelize, { force: false });
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, '../../public')));

if (config.connection.hasOwnProperty("https")) {
    https.createServer({
        key: fs.readFileSync(config.connection.https.key, 'utf8'),
        cert: fs.readFileSync(config.connection.https.cert, 'utf8'),
        ca: [fs.readFileSync(config.connection.https.ca, 'utf8')]
    }, app).listen(config.connection.https.port, function () { console.log('Backend has started with [HTTPS] mode!'); });
}
if (config.connection.hasOwnProperty("http")) { app.listen(config.connection.http.port, function () { console.log('Backend has started with [HTTP] mode!'); }); }

db.sync.then(() => {
    app.use(function (req, res, next) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var log = { url: req.originalUrl, header: req.headers, host: req.hostname, body: req.body }
        fs.appendFile('log.txt', `${ip},${new Date().toISOString()},${JSON.stringify(log)}\n`, function (err) { if (err) console.log(err); });
        if (!config.connection.http.auto_redirect || req.secure) next();
        else res.redirect('https://' + req.headers.host + req.url);
    })

    app.post('/get_news', require('./controller/get_news.js')(db, Op))

    app.post('/post_news', (req, res) => {
        /* Access will be denied if user haven't logged in */
        var format = {
            additional: req.body.additional,
            id: req.body.id,
            title: req.body.additional,
            content: req.body.additional,
            normal_image_link: req.body.additional,
            headline_image_link: req.body.additional,
            category: req.body.additional, /* base64 obfucated */
            is_headline: true,
            is_hot: true,
            is_interview: true,
            is_shown: true,
            email: true,
            views: true,
        }
    })

    app.post('/edit_news', (req, res) => {
        /* Access will be denied if user haven't logged in and the user must have granted admin permission */
        var format = {
            additional: req.body.additional,
            id: req.body.id,
            title: req.body.additional,
            content: req.body.additional,
            normal_image_link: req.body.additional,
            headline_image_link: req.body.additional,
            category: req.body.additional, /* base64 obfucated */
            is_headline: true,
            is_hot: true,
            is_interview: true,
            is_shown: true,
            email: true,
            views: true,
        }
    })

    app.post('/delete_news', (req, res) => {
        /* Access will be denied if user haven't logged in */
        var format = {
            id: req.body.id
        }
    })

    app.get(`/frontend/:id`, require('./controller/show_news.js')(db, config))

    app.post('/login', require('./controller/login.js')(sequelize, db, https))

    app.post('/logout', (req, res) => {
        if (req.session.self === undefined) res.send("Access denied")
        req.session.self = undefined
    })
})
