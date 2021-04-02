const connection = require('../config/connection');

exports.getAllNotes = (req, res) => {
    const sql = "SELECT * FROM viewNotas"

    connection.query(sql, async (err, results, fields) => {
        if (err) throw err;
        else {
            res.json({
                notas: results
            })
        }
    })
}

exports.getNote = (req, res) => {
    const { id_nota } = req.params;
    const sql = 'SELECT * FROM notes WHERE id_note = ?'

    connection.query(sql, [id_nota], async (err, results, fields) => {
        if (err) throw err;

        if (results.length > 0) {
            res.json({
                message: 'Success',
                nota: results[0],
            })
        }
        else {
            res.json({
                message: 'Nota no encontrada'
            })
        }
    })
}