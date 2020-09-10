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
        },
        news_template: "../../public/frontend/news.html",
        public: "../../public"
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
                key: "/certs/private.key",
                cert: "/certs/certificate.crt",
                ca: "/certs/ca_bundle.crt"
            }
        },
        news_template: "aaaaaa.html",
        public: "../../public"
    }
}

module.exports = ((process) => {
    if (process.platform == "linux") return config.production;
    else return config.development;
});
