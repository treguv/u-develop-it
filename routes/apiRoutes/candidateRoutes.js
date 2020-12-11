const express = require("express");
const router = express.Router();
const db = require("../../db/database");
const inputCheck = require("../../utils/inputCheck");

//Routes that will now use router
//get all candidates
router.get("/candidates", (req, res) => {
  console.log("Request recieved!");
  const sql = `SELECT candidates.*, parties.name 
    AS party_name 
    FROM candidates 
    LEFT JOIN parties 
    ON candidates.party_id = parties.id`;
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});

//get single candidate
router.get("/candidates/:id", (req, res) => {
  const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id
    WHERE candidates.id = ?`;
  const params = [req.params.id];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});

// // Delete a candidate
// router.delete("/candidate/:id", (req, res) => {
//   const sql = `DELETE FROM candidates WHERE id = ?`;
//   const params = [req.params.id];
//   db.run(sql, params, function (err, result) {
//     if (err) {
//       res.status(400).json({ error: res.message });
//       return;
//     }

//     res.json({
//       message: "successfully deleted",
//       changes: this.changes,
//     });
//   });
// });

router.put("/candidate/:id", (req, res) => {
  const errors = inputCheck(req.body, "party_id");
  if (errors) {
    res.status(400).json({ errors: errors });
    return;
  }
  const sql = `UPDATE candidates SET party_id = ?
                WHERE id =?`;
  const params = [req.body.party_id, req.params.id];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: req.body,
      changes: this.changes,
    });
  });
});

// //post route to add into db
// router.post("/candidate", ({ body }, res) => {
//   const errors = inputCheck(
//     body,
//     "first_name",
//     "last_name",
//     "industry_connected"
//   );
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }
//   //if we are don here that means the data is valid

//   const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
//       VALUES (?,?,?)`;
//   const params = [body.first_name, body.last_name, body.industry_connected];
//   db.run(sql, params, function (err, result) {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//       id: this.lastID,
//     });
//   });
// });
console.log("well we are here");
module.exports = router;
