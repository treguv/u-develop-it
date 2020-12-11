const express = require("express");
const router = express.Router();
const db = require("../../db/database");

// Delete a candidate
router.delete("/party/:id", (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }

    res.json({ message: "successfully deleted", changes: this.changes });
  });
});
//Get route for the parties
router.get("/parties", (req, res) => {
  const sql = `SELECT * FROM parties`;
  const params = [];
  //query database
  db.all(sql, params, (err, rows) => {
    //if there is error
    if (err) {
      res.status(500).json({ error: err.message });
    }
    //if all good return  the data
    res.json({
      message: "succss",
      data: rows,
    });
  });
});

//Get route for the parties
router.get("/parties/:id", (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  //query database
  db.all(sql, params, (err, rows) => {
    //if there is error
    if (err) {
      res.status(500).json({ error: err.message });
    }
    //if all good return  the data
    res.json({
      message: "succss",
      data: rows,
    });
  });
});

module.exports = router;
