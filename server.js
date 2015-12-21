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



server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/client'));

var savedataFile = 'savedata.json';
var savedata = JSON.parse(
    fs.readFileSync(savedataFile)
);
for (var i = 0; i < savedata.famille1.product.length; i++) {
    console.log(savedata.famille1.product[i].name + "Couleur : " + savedata.famille1.product[i].color);

}
for (var i = 0; i < savedata.famille2.product.length; i++) {
    console.log(savedata.famille2.product[i].name + "Couleur : " + savedata.famille2.product[i].color);

}
for (var i = 0; i < savedata.famille3.product.length; i++) {
    console.log(savedata.famille3.product[i].name + "Couleur : " + savedata.famille3.product[i].color);

}
for (var i = 0; i < savedata.famille4.product.length; i++) {
    console.log(savedata.famille4.product[i].name + "Couleur : " + savedata.famille4.product[i].color);

}
for (var i = 0; i < savedata.famille5.product.length; i++) {
    console.log(savedata.famille5.product[i].name + "Couleur : " + savedata.famille5.product[i].color);

}
for (var i = 0; i < savedata.famille6.product.length; i++) {
    console.log(savedata.famille6.product[i].name + "Couleur : " + savedata.famille6.product[i].color);

}
for (var i = 0; i < savedata.famille7.product.length; i++) {
    console.log(savedata.famille7.product[i].name + "Couleur : " + savedata.famille7.product[i].color);

}
for (var i = 0; i < savedata.famille8.product.length; i++) {
    console.log(savedata.famille8.product[i].name + "Couleur : " + savedata.famille8.product[i].color);

}


famille1 = savedata.famille1;
famille2 = savedata.famille2;
famille3 = savedata.famille3;
famille4 = savedata.famille4;
famille5 = savedata.famille5;
famille6 = savedata.famille6;
famille7 = savedata.famille7;
famille8 = savedata.famille8;


function send() {
    var tab = [];
    tab.push(famille1);
    tab.push(famille2);
    tab.push(famille3);
    tab.push(famille4);
    tab.push(famille5);
    tab.push(famille6);
    tab.push(famille7);
    tab.push(famille8);
    io.sockets.emit('receive', tab);
}
io.on('connection', function(socket) {
    console.log("Utilisateur connecté...");

    send();

    socket.on('ajoutarticle', function(famille, nom, color) {
        console.log(famille, nom, color);

        switch (famille) {
            case 1:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            //rand = Math.floor(Math.random() * 1000000) + 150; 
                            check2 = true;
                        }
                    }

                    if (check2 == false) {
                        check1 = true;
                    }
                }
                var art = {
                    id: rand,
                    name: nom,
                    color: color
                };
                console.log("Nombre aléatoire trouvé : " + rand);
                famille1.product.push(art);
                break;
            case 2:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            //rand = Math.floor(Math.random() * 1000000) + 150; 
                            check2 = true;
                        }
                    }

                    if (check2 == false) {
                        check1 = true;
                    }
                }
                var art = {
                    id: rand,
                    name: nom,
                    color: color
                };
                console.log("Nombre aléatoire trouvé : " + rand);
                famille2.product.push(art);
                break;
            case 3:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            //rand = Math.floor(Math.random() * 1000000) + 150; 
                            check2 = true;
                        }
                    }

                    if (check2 == false) {
                        check1 = true;
                    }
                }
                var art = {
                    id: rand,
                    name: nom,
                    color: color
                };
                console.log("Nombre aléatoire trouvé : " + rand);
                famille3.product.push(art);
                break;
            case 4:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            //rand = Math.floor(Math.random() * 1000000) + 150; 
                            check2 = true;
                        }
                    }

                    if (check2 == false) {
                        check1 = true;
                    }
                }
                var art = {
                    id: rand,
                    name: nom,
                    color: color
                };
                console.log("Nombre aléatoire trouvé : " + rand);
                famille4.product.push(art);
                break;
            case 5:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            //rand = Math.floor(Math.random() * 1000000) + 150; 
                            check2 = true;
                        }
                    }

                    if (check2 == false) {
                        check1 = true;
                    }
                }
                var art = {
                    id: rand,
                    name: nom,
                    color: color
                };
                console.log("Nombre aléatoire trouvé : " + rand);
                famille5.product.push(art);
                break;
            case 6:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            //rand = Math.floor(Math.random() * 1000000) + 150; 
                            check2 = true;
                        }
                    }

                    if (check2 == false) {
                        check1 = true;
                    }
                }
                var art = {
                    id: rand,
                    name: nom,
                    color: color
                };
                console.log("Nombre aléatoire trouvé : " + rand);
                famille6.product.push(art);
                break;
            case 7:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            //rand = Math.floor(Math.random() * 1000000) + 150; 
                            check2 = true;
                        }
                    }

                    if (check2 == false) {
                        check1 = true;
                    }
                }
                var art = {
                    id: rand,
                    name: nom,
                    color: color
                };
                console.log("Nombre aléatoire trouvé : " + rand);
                famille7.product.push(art);
                break;
            case 8:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            console.log("cherche un nombre aléatoire...");
                            //rand = Math.floor(Math.random() * 1000000) + 150; 
                            check2 = true;
                        }
                    }

                    if (check2 == false) {
                        check1 = true;
                    }
                }
                var art = {
                    id: rand,
                    name: nom,
                    color: color
                };
                console.log("Nombre aléatoire trouvé : " + rand);
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
        fs.writeFile('savedata.json', data, function(err) {
            if (err) {
                console.log('There has been an error saving your configuration data.');
                console.log(err.message);
                return;
            }
            //console.log('Saved successfully.')
        });



        console.log("Article ajouté : " + famille1.product);
        for (var i = 0; i < famille1.product.length; i++) {
            console.log(famille1.product[i].name + "Couleur : " + famille1.product[i].color);
        };

        send();

    });


    socket.on('ajoutfamille', function(famille) {

    });


    socket.on('supprimearticle', function(famille, position) {

    });

    socket.on('supprimerfamille', function(famille) {

    });

    socket.on('modifarticle', function(famille, nom) {

    });

    socket.on('send', function(data) {

    });


});