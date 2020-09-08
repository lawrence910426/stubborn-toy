const config = {
    development: {
        database: {
            db_name: 'stubborntoy',
            user_name: 'root',
            password: '2rjurrru',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }, connection: {
            http: {
                port: 1337,
                auto_redirect: false
            }
        }, news_template: "aaaaaa.html"
    },
    production: {
        database: {
            db_name: 'stubborntoy',
            user_name: 'stubborntoy',
            password: '2rjurrru',
            pool: {
                max: 100,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }, connection: {
            http: {
                port: 80,
                auto_redirect: false,
            },
            https: {
                port: 443,
                key: "/etc/letsencrypt/live/stubbornnews.com/cert.pem",
                cert: "/etc/letsencrypt/live/stubbornnews.com/privkey.pem",
                ca: "/etc/letsencrypt/live/stubbornnews.com/chain.pem"
            }
        }, news_template: "aaaaaa.html"
    }
}

module.exports = ((process) => {
    if (process.platform == "linux") return config.production;
    else return config.development;
});
