const express = require('express')
const config = require('./config.js').development
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path')
const https = require('https');

const { Sequelize, Model, DataTypes } = require('sequelize');
const db_model = require('./db_model.js');
const db = db_model(Sequelize, Model, DataTypes, sequelize, { force: false });

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/get_news', (req, res) => {
    /* Nothing = Unlimtied. Something = limited with AND logic. */
    var id = req.body.id; /* search max_id - id.lower_bound to max_id - id.upper_bound  */
    var shown = req.body.shown; /* if not logged in then always true req.session.logged_in */
    var headline = req.body.headline;
    var interview = req.body.interview;
    var hot = req.body.hot;
    res.send('Hello World!')
})

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

app.post('/delete_news', (req, res) => {
    /* Access will be denied if user haven't logged in */
    var format = {
        id: req.body.id
    }
})

app.get('/show_news/{$id}', (req, res) => {
    /* showdown.render */
    /* news += 1 */
})

app.post('/login', (req, res) => {
    var facebook_id = req.body.facebook_id;
    var name = req.body.facebook_name;
    req.session.logged_in = true;
})

app.post('/logout', (req, res) => {
    /* Access will be denied if user haven't logged in */
    var facebook_id = req.body.facebook_id;
    req.session.logged_in = null;
})

if (config.network.https.enable) {
    https.createServer({
        key: fs.readFileSync(config.network.https.key, 'utf8'),
        cert: fs.readFileSync(config.network.https.cert, 'utf8')
    }, app).listen(config.port.https, function () { log('Backend has started with https mode!'); });
} else {
    app.listen(config.port.http, function () { log('Backend has started with http mode!'); });
}