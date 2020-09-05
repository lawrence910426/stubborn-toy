module.exports = {
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
                port: 80,
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
                auto_redirect: true
            },
            https: {
                port: 443,
                key: "",
                cert: ""
            }
        }, news_template: "aaaaaa.html"
    }
};
