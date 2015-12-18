var mysql      = require('mysql');
var connection = mysql.createConnection({
	port	 : '3388',
	host     : 'localhost',
	user     : 'root',
	password : 'prout',
	database : 'impression'
});

// --- QUERY ---
// INSERT
var insertFamily = ''
var insertProduct = ''
// SELECT
var getAllProductsWithFamily = 'SELECT product_name, family_name, color FROM product INNER JOIN family ON product.id_family = family.id_family'




connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	connection.query(getAllProductsWithFamily, function (err, results, fields) {
		if (!err) {
			for (var i in results) {
				console.log(results[i]);
			}
		}
		else
			console.log('Error while performing Query.');
	});
	connection.end();
});

