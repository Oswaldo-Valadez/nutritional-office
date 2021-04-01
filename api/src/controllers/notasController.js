const connection = require('../configs/connection')

exports.getAllNotes = (req, res) => {
    const sql = "SELECT * FROM notes"

    connection.query(sql, async(err, results, fields) => {
        if (err) throw err;
        else {
            res.json({
                notas: results
            })
        }
    })
}