const connection = require('../config/connection');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?'

    connection.query(sql, [email, password], async (err, results, fields) => {
        if (err) throw err;
        
        if (results.length > 0) {
            res.json({
                message: 'Success',
                user: results[0]
            })
        }
        else {
            res.json({
                message: 'Incorrect credentials'
            })
        }
    })
}
