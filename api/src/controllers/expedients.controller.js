const connection = require("../config/connection");

exports.postExpedient = (req, res) => {
  const sql = "INSERT INTO expedients SET ?";

  const response = connection.query(sql, [req.body], async (err, results, fields) => {
    if (err) throw err;

    if (results) {
      res.json({
        message: "Success",
      });
    } else {
      res.json({
        message: "Failure",
      });
    }
  });
};

exports.getExpedients = (req, res) => {
  const sql = "SELECT * FROM expedients";

  connection.query(sql, async (err, results, fields) => {
    if (err) throw err;

    if (results.length > 0) {
      res.json({
        message: "Success",
        expedients: results,
      });
    } else {
      res.json({
        message: "Failure",
      });
    }
  });
};

exports.getExpedient = (req, res) => {
  const sql = "SELECT * FROM expedients WHERE id_expedient = ?";

  connection.query(sql, [req.params.id], async (err, results, fields) => {
    if (err) throw err;

    if (results.length > 0) {
      res.json({
        message: "Success",
        expedient: results[0],
      });
    } else {
      res.json({
        message: "Failure",
      });
    }
  });
};

exports.putExpedient = (req, res) => {
  const sql = "UPDATE expedients SET ? WHERE id_expedient = ?";

  delete req.body.id_expedient;
  delete req.body.register_date;

  const response = connection.query(
    sql,
    [{...req.body}, req.params.id],
    async (err, results, fields) => {
      if (err) throw err;
      console.log(err, results, fields);

      if (results) {
        res.json({
          message: "Success",
        });
      } else {
        res.json({
          message: "Failure",
        });
      }
    }
  );
};

exports.deleteExpedient = (req, res) => {
  const sql = "DELETE FROM expedients WHERE id_expedient = ?";

  connection.query(sql, [req.params.id], async (err, results, fields) => {
    if (err) throw err;

    if (results) {
      res.json({
        message: "Success",
      });
    } else {
      res.json({
        message: "Failure",
      });
    }
  });
};
