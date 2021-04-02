const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nutritional_office_db'
// });

const connection = mysql.createConnection({
    host: 'freedb.tech',
    user: 'freedbtech_alanyoswa',
    password: 'contraseña',
    database: 'freedbtech_nutritionalOffice'
});

module.exports = connection

