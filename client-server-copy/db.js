const mysql = require('mysql2')
const config = require('./config')

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    port: config.port,
    password: config.password,
})

module.exports = {
    pool,
}