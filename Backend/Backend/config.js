module.exports = {
    development: {
        database: {
            db_name: 'stubborntoy',
            user_name: 'root',
            password: '2rjurrru'
        }, port: {
            http: 1337,
            https: 1337
        }
    }, production: {
        database: {
            db_name: 'stubborntoy',
            user_name: 'stubborntoy',
            password: '2rjurrru'
        }, port: {
            http: 80,
            https: 443
        }
    }
};