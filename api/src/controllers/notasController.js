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

exports.getLastNote = (req, res) => {
    const { id_expedient } = req.params;
    const sql = 'SELECT * FROM notes WHERE id_expedient = ? ORDER BY register_date DESC LIMIT 1';

    connection.query(sql, [id_expedient], async (err, results, fields) => {
        if (err) throw err;

        if (results.length > 0) {
            res.json({
                message: 'Success',
                nota: results[0],
            })
        }
        else {
            res.json({
                message: 'No information',
                nota: null
            })
        }
    })
}

exports.createNote = (req, res) => {
    const sql = 'INSERT INTO notes SET ?';

    connection.query(sql, [req.body], async (err, results, fields) => {
        if (err) throw err;

        if (results) {
            res.json({
                message: "Success",
                result: results
            });
        } else {
            res.json({
                message: "Failure",
            });
        }
    })
}