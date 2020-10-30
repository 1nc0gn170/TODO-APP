const mysql = require("mysql");

var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"XXXXXXXXXXX",
	database:"mydb"
});

connection.connect((e) => {
	if (e) {throw e;}
});

module.exports = connection;
