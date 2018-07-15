const mysql = require('mysql');
const mysqlConfig = require('./config.js');



const connection = mysql.createConnection(mysqlConfig);
function handleDisconnect() {
  // the old one cannot be reused.

  connection.connect(function(err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function(err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();


const getAllFavorites = function(cb) {
  let qStr = `select * from favorites`;
  connection.query(qStr, function(error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log("We have the favorites boys,", results);
      cb(results);
    }
  });
};

//insert into CONTACTS (EMAIL, FIRSTNAME, LASTNAME, TELEPHONE) values (?, ?, ?, ?)

const saveFavorite = function(movie, cb) {
  let qStr = `insert into favorites (title, popularity, year, poster) values (?,?,?,?)`;
  let {title, popularity, release_date, poster_path} = movie;
  let options = [title, popularity, release_date, poster_path]
  console.log('our options are ', options)
  connection.query(qStr, options, function(error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log("all good sendind to favorites");
      cb(results);
    }
  });
};

const deleteFavorite = function(movie, cb) {
  let qStr = `delete from favorites where title = (?)`;
  let {title} = movie;
  console.log('our options are ', [title])
  connection.query(qStr, [title], function(error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log("all good deleting from favorites");
      cb(results);
    }
  });
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};