const Config = {
    server: {
        port: 1337,
        morgan: 'dev'
    },
    mongodb: {
        url: 'mongodb://localhost/database'
    },
    jwt: {
        secret: 'dirtylittlesecret;)',
        options: {
            expiresIn: '1337h'
        }
    }
};

export { Config }