var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var fs = require('fs');


var famille1 = {
                id: 1,
                name: '',
                color: '',
                pichets: '',
                product: [],
               	libre: true
            };

var famille2 = {
                id: 2,
                name: '',
                color: '',
                pichets: '',
                product: [],
               	libre: true
            };
var famille3 = {
                id: 3,
                name: '',
                color: '',
                pichets: '',
                product: [],
               	libre: true
            };

var famille4 = {
                id: 4,
                name: '',
                color: '',
                pichets: '',
                product: [],
               	libre: true
            };
var famille5 = {
                id: 5,
                name: '',
                color: '',
                pichets: '',
                product: [],
               	libre: true
            };
var famille6 = {
                id: 6,
                name: '',
                color: '',
                pichets: '',
                product: [],
               	libre: true
            };
var famille7 = {
                id: 7,
                name: '',
                color: '',
                pichets: '',
                product: [],
               	libre: true
            };
var famille8 = {
                id: 8,
                name: '',
                color: '',
                pichets: '',
                product: [],
               	libre: true
            };



server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/client'));

// Chatroom


var savedataFile = 'savedata.json';
var savedata = JSON.parse(
        fs.readFileSync(savedataFile)
        );
for (var i = 0; i < savedata.famille1.product.length; i++) {
    console.log(savedata.famille1.product[i].nom + "Couleur : " + savedata.famille1.product[i].color);

}
for (var i = 0; i < savedata.famille2.product.length; i++) {
    console.log(savedata.famille2.product[i].nom + "Couleur : " + savedata.famille2.product[i].color);

}
for (var i = 0; i < savedata.famille3.product.length; i++) {
    console.log(savedata.famille3.product[i].nom + "Couleur : " + savedata.famille3.product[i].color);

}
for (var i = 0; i < savedata.famille4.product.length; i++) {
    console.log(savedata.famille4.product[i].nom + "Couleur : " + savedata.famille4.product[i].color);

}
for (var i = 0; i < savedata.famille5.product.length; i++) {
    console.log(savedata.famille5.product[i].nom + "Couleur : " + savedata.famille5.product[i].color);

}
for (var i = 0; i < savedata.famille6.product.length; i++) {
    console.log(savedata.famille6.product[i].nom + "Couleur : " + savedata.famille6.product[i].color);

}
for (var i = 0; i < savedata.famille7.product.length; i++) {
    console.log(savedata.famille7.product[i].nom + "Couleur : " + savedata.famille7.product[i].color);

}
for (var i = 0; i < savedata.famille8.product.length; i++) {
    console.log(savedata.famille8.product[i].nom + "Couleur : " + savedata.famille8.product[i].color);

}


    famille1 = savedata.famille1;
    famille2 = savedata.famille2;
    famille3 = savedata.famille3;
    famille4 = savedata.famille4;
    famille5 = savedata.famille5;
    famille6 = savedata.famille6;
    famille7 = savedata.famille7;
    famille8 = savedata.famille8;


function send(){
	var tab = {
        famille1: famille1,
        famille2: famille2,
        famille3: famille3,
        famille4: famille4,
        famille5: famille5,
        famille6: famille6,
        famille7: famille7,
        famille8: famille8
  };
  io.sockets.emit('receive', tab);
}
io.on('connection', function (socket) {
  console.log("Utilisateur connecté...");
  
  send();

  socket.on('ajoutarticle', function (famille,nom,color) {
  	console.log(famille,nom,color);
  	var art = {
        nom: nom,
        color: color
	};
  	switch (famille) {
    case 1:
        famille1.product.push(art);
        break;
    case 2:
        famille2.product.push(art);
        break;
    case 3:
        famille3.product.push(art);
        break;
    case 4:
        famille4.product.push(art);
        break;
    case 5:
        famille5.product.push(art);
        break;
    case 6:
        famille6.product.push(art);
        break;
    case 7:
        famille7.product.push(art);
        break;
    case 8:
        famille8.product.push(art);
        break;

	}

	var objWithSubObj = {
        famille1: famille1,
        famille2: famille2,
        famille3: famille3,
        famille4: famille4,
        famille5: famille5,
        famille6: famille6,
        famille7: famille7,
        famille8: famille8
    };


    var data = JSON.stringify(objWithSubObj);
    fs.writeFile('savedata.json', data, function (err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        }
        //console.log('Saved successfully.')
    });



	console.log("Article ajouté : " + famille1.product);
	for (var i =  0; i < famille1.product.length; i++) {
		console.log(famille1.product[i].nom + "Couleur : " + famille1.product[i].color);
	};

	send();

  });


  socket.on('ajoutfamille', function (famille) {

  });


  socket.on('supprimearticle', function (famille,position) {

  });

  socket.on('supprimerfamille', function (famille) {

  });

  socket.on('modifarticle', function (famille,nom) {

  });

  socket.on('send', function (data) {

  });

 
});

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


