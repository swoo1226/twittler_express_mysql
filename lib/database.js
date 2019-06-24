var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'k6720106',
    database:'myproject'
});
db.connect();
module.exports = db;