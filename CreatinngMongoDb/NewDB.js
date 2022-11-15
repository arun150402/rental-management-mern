const MongoClient=require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/client";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("client");
    dbo.createCollection("ownersData", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });