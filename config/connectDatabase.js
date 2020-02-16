var mongoose = require("mongoose");
var bluebird = require("bluebird");

let connectDatabase = () => {
  mongoose.Promise = bluebird;

  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  return mongoose.connect(URI, {
    useMongoClient: true
  })
}
module.exports = connectDatabase