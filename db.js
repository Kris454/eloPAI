var mysql = require('mysql');

const fs = require('fs');
var dbconf = JSON.parse(fs.readFileSync('config.json', 'UTF-8'));

console.log(dbconf.user);
var db = mysql.createConnection({
  host: dbconf.host,
  user: dbconf.user,
  password: dbconf.password,
  database: dbconf.database
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = fs.readFileSync('Baza.sql', 'UTF-8').toString().split(";");
  sql.forEach(function(query){
  	if(query.length > 1){
  		db.query(query,function(err,result){
  			if(err) throw err;
  	})
  	}
  })
  console.log("DB created");
}); 


