const connection = require("./db-config");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
const port = 5000;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

app.use(express.json());

app.get("/membres", (req, res) => {
  connection.query("SELECT * FROM membres", (error, result) => {
    if (error) {
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/membres", (req, res) => {
  const { pseudo } = req.body;
  connection.query(
    "INSERT INTO membres (pseudo) VALUES (?)",
    [pseudo],
    (err, result) => {
      if (err) {
        res.status(500).send("Error when adding the person");
      } else {
        res.status(201).send("Person successfully added");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
