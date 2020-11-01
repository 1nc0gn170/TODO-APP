const mysql = require("mysql");

var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"XXXXXXXXXXXXXXXXXXXXXX",
	database:"XXXXXX"
});

connection.connect((e) => {
	if (e) {throw e;}
});

module.exports = connection;
