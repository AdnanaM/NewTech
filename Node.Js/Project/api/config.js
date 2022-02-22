var config = {
    configValues : {
        "uname": "ioana",
        "pwd": "ioana123"
    },
    EMAIL_USERNAME : "5d6db60342836d",
    EMAIL_PASSWORD : "1e1d9b986e5719",
    EMAIL_HOST : "smtp.mailtrap.io",
    EMAIL_PORT : 2525,
    
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    
    expireTime: 60 * 60 * 1000,
    getDbConnectionString: function() {
        return '';
    },
    secrets: {
        jwt: process.env.JWT || "mysecret"
    },
};
module.exports = config;
