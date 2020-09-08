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
                key: "/etc/letsencrypt/keys/0004_key-certbot.pem",
                cert: "/etc/letsencrypt/csr/0004_csr-certbot.pem"
            }
        }, news_template: "aaaaaa.html"
    }
}

module.exports = ((process) => {
    if (process.platform == "linux") return config.production;
    else return config.development;
});
