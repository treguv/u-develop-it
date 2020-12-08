const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const sqlite3 = require("sqlite3").verbose();
//add midleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//connect to the database
const db = new sqlite3.Database("./db/election.db", (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("Connected to election database");
});
//catch all invalid requests not supported by the server
app.use((req, res) => {
  res.status(404).end();
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});
//start the server after db connection
db.on("open", () => {
  //start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
