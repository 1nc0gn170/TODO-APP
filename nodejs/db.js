const mysql = require("mysql");

var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"Qwerty@123",
	database:"tmp"
});

connection.connect((e) => {
	if (e) {throw e;}
});

module.exports = connection;