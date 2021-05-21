
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
console.log(`API: v1`);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./routes/record"));

app.get('/', (req, res) => {
  res.send({ application: 'sample-app', version: '1' });
});
app.get('/index.html', (req, res) => {
  res.send({ application: 'sample-app', version: '1' });
});
app.get('/api/info', (req, res) => {
  res.send({ application: 'sample-app', version: '1' });
});
app.post('/api/v1/getback', (req, res) => {
    res.send({ ...req.body });
});

// get driver connection
const dbo = require("./db/conn");

dbo.connectToServer(function (err) {
  if (err) console.error(err);
  console.log(`Successfully connected to MongoDB.`);
});

app.listen(port, () => {
  // perform a database connection when server starts

console.log(`Server is running on port: ${port}`);
});

exports.handler = app
