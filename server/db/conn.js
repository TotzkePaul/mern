const { MongoClient } = require("mongodb");
const Db = process.env.MONGODB_PASSWORD;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    console.log(`conn.js - connent to client`, client);
    client.connect(function (err, db) {
      console.log('db', db, 'err', err);
      _db = db.db("myFirstDatabase");
      console.log("connectToServer", _db)
      return callback(err);
      console.log("Successfully connected to MongoDB.");    });
  },

  getDb: function () {
    console.log("getDb", _db);
    return _db;
  },
};