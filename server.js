const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const sqlite3 = require("sqlite3").verbose();
const inputCheck = require("./utils/inputCheck");
const db = require("./db/database");
const apiRoutes = require("./routes/apiRoutes"); //load the file
app.use("/api", apiRoutes); //set these routes for the
//add midleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
