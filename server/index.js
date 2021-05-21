const serverlessExpress = require('@vendia/serverless-express')
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const conn_string = process.env.MONGODB_PASSWORD || 'unset';
console.log(`Server is running on port: ${conn_string}`);
console.log(`API: v2`);
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

// app.listen(port, () => {
// // perform a database connection when server starts
// dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//     console.log(`Successfully connected to MongoDB.`);
// });
// console.log(`Server is running on port: ${port}`);
// });

console.log(`connectToServer call`, dbo);

var conn = dbo.connectToServer(function (err) {
    console.log(`connectToServer start.`);
    if (err) console.error(err);
    console.log(`Successfully connected to MongoDB.`);
    return err;
});



console.log(`Exporting...`, conn);
exports.handler = serverlessExpress({ app })
