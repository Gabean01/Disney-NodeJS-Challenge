module.exports = {
    USERNAME: "root",
    PASSWORD: "garybean",
    DB: "my_Disney_api",
    HOST: "localhost",
    DIALECT: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};