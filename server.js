var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var fs = require('fs');
var thread = require('webworker-threads').create();
thread.load(__dirname + '/thread.js');
var timet = 5000;
var configurationFile = './config.json';
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);
var idDay = configuration.idDay;
var nameetab = configuration.Nom;
var date1 = new Date(configuration.date);
var heure = configuration.heure;
var minute = configuration.minute;
console.log("heure" + heure);
console.log("minute" + minute);
console.log("Etablissement : " + nameetab);
console.log("ID du jour : " + idDay);
console.log("Date : " + date1);
console.log("Init Serial Port...");
var serialPort = require("serialport");
serialPort.list(function(err, ports) {
    ports.forEach(function(port) {
        console.log("Nom de port série : " + port.comName);
        console.log("ID : " + port.pnpId);
        console.log("Constructeur :" + port.manufacturer);
    });
});
thread.emit('giveMeTheFibo', timet);
//Listener for the 'theFiboIs' events emitted by the child/background thread. 
thread.on('theFiboIs', function cb(data) {
    //sleep(5000);
    console.log("thread");
    checkdate();
    console.log("j'ai passé");
    this.emit('giveMeTheFibo', "ok");
});

date1 = new Date(2015, 11, 22, 16, 00, 15, 0);

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
/*
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
*/


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
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
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
                famille1.product.push(art);
                break;
            case 2:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
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
                famille2.product.push(art);
                break;
            case 3:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
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
                famille3.product.push(art);
                break;
            case 4:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
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
                famille4.product.push(art);
                break;
            case 5:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
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
                famille5.product.push(art);
                break;
            case 6:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
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
                famille6.product.push(art);
                break;
            case 7:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
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
                famille7.product.push(art);
                break;
            case 8:
                var rand = Math.floor(Math.random() * 1000000) + 150;
                var check1 = false;
                while (check1 != true) {
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
                            rand = Math.floor(Math.random() * 1000000) + 150;
                        }
                    }
                    var check2 = false
                    for (var i = 0; i < famille1.product.length; i++) {
                        if (famille1.product[i].id == rand) {
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

    socket.on('supprimearticle', function(famille, id) {
        switch (famille) {
            case 1:
                for (var i = 0; i < famille1.product.length; i++) {
                    if (famille1.product[i].id == id) {
                        console.log("L'Article " + famille1.product[i].name + "va etre supprimer")
                        famille1.product.splice(i, 1);
                    }
                }
                break;
            case 2:
                for (var i = 0; i < famille2.product.length; i++) {
                    if (famille2.product[i].id == id) {
                        console.log("L'Article " + famille2.product[i].name + "va etre supprimer")
                        famille2.product.splice(i, 1);
                    }
                }
                break;
            case 3:
                for (var i = 0; i < famille3.product.length; i++) {
                    if (famille3.product[i].id == id) {
                        console.log("L'Article " + famille3.product[i].name + "va etre supprimer")
                        famille3.product.splice(i, 1);
                    }
                }
                break;
            case 4:
                for (var i = 0; i < famille4.product.length; i++) {
                    if (famille4.product[i].id == id) {
                        console.log("L'Article " + famille4.product[i].name + "va etre supprimer")
                        famille4.product.splice(i, 1);
                    }
                }
                break;
            case 5:
                for (var i = 0; i < famille5.product.length; i++) {
                    if (famille5.product[i].id == id) {
                        console.log("L'Article " + famille5.product[i].name + "va etre supprimer")
                        famille5.product.splice(i, 1);
                    }
                }
                break;
            case 6:
                for (var i = 0; i < famille6.product.length; i++) {
                    if (famille6.product[i].id == id) {
                        console.log("L'Article " + famille6.product[i].name + "va etre supprimer")
                        famille6.product.splice(i, 1);
                    }
                }
                break;
            case 7:
                for (var i = 0; i < famille7.product.length; i++) {
                    if (famille7.product[i].id == id) {
                        console.log("L'Article " + famille7.product[i].name + "va etre supprimer")
                        famille7.product.splice(i, 1);
                    }
                }
                break;
            case 8:
                for (var i = 0; i < famille8.product.length; i++) {
                    if (famille8.product[i].id == id) {
                        console.log("L'Article " + famille8.product[i].name + "va etre supprimer")
                        famille8.product.splice(i, 1);
                    }
                }
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
        send();

    });

    socket.on('modifierarticle', function(famille, id, nom, color) {
        switch (famille) {
            case 1:
                for (var i = 0; i < famille1.product.length; i++) {
                    if (famille1.product[i].id == id) {
                        console.log("L'Article " + famille1.product[i].name + "de couleur " + famille1.product[i].color + " va etre modifier");
                        famille1.product[i].name = nom;
                        famille1.product[i].color = color;
                        console.log("Article  modifier" + famille1.product[i].name + "de couleur " + famille1.product[i].color);
                    }
                }
                break;
            case 2:
                for (var i = 0; i < famille2.product.length; i++) {
                    if (famille2.product[i].id == id) {
                        console.log("L'Article " + famille2.product[i].name + "de couleur " + famille2.product[i].color + " va etre modifier");
                        famille2.product[i].name = nom;
                        famille2.product[i].color = color;
                        console.log("Article  modifier" + famille2.product[i].name + "de couleur " + famille2.product[i].color);
                    }
                }
                break;
            case 3:
                for (var i = 0; i < famille3.product.length; i++) {
                    if (famille3.product[i].id == id) {
                        console.log("L'Article " + famille3.product[i].name + "de couleur " + famille3.product[i].color + " va etre modifier");
                        famille3.product[i].name = nom;
                        famille3.product[i].color = color;
                        console.log("Article  modifier" + famille3.product[i].name + "de couleur " + famille3.product[i].color);
                    }
                }
                break;
            case 4:
                for (var i = 0; i < famille4.product.length; i++) {
                    if (famille4.product[i].id == id) {
                        console.log("L'Article " + famille4.product[i].name + "de couleur " + famille4.product[i].color + " va etre modifier");
                        famille4.product[i].name = nom;
                        famille4.product[i].color = color;
                        console.log("Article  modifier" + famille4.product[i].name + "de couleur " + famille4.product[i].color);
                    }
                }
                break;
            case 5:
                for (var i = 0; i < famille5.product.length; i++) {
                    if (famille5.product[i].id == id) {
                        console.log("L'Article " + famille5.product[i].name + "de couleur " + famille5.product[i].color + " va etre modifier");
                        famille6.product[i].name = nom;
                        famille6.product[i].color = color;
                        console.log("Article  modifier" + famille5.product[i].name + "de couleur " + famille5.product[i].color);
                    }
                }
                break;
            case 6:
                for (var i = 0; i < famille6.product.length; i++) {
                    if (famille6.product[i].id == id) {
                        console.log("L'Article " + famille6.product[i].name + "de couleur " + famille6.product[i].color + " va etre modifier");
                        famille6.product[i].name = nom;
                        famille6.product[i].color = color;
                        console.log("Article  modifier" + famille6.product[i].name + "de couleur " + famille6.product[i].color);
                    }
                }
                break;
            case 7:
                for (var i = 0; i < famille7.product.length; i++) {
                    if (famille7.product[i].id == id) {
                        console.log("L'Article " + famille7.product[i].name + "de couleur " + famille7.product[i].color + " va etre modifier");
                        famille7.product[i].name = nom;
                        famille7.product[i].color = color;
                        console.log("Article  modifier" + famille7.product[i].name + "de couleur " + famille7.product[i].color);
                    }
                }
                break;
            case 8:
                for (var i = 0; i < famille8.product.length; i++) {
                    if (famille8.product[i].id == id) {
                        console.log("L'Article " + famille8.product[i].name + "de couleur " + famille8.product[i].color + " va etre modifier");
                        famille8.product[i].name = nom;
                        famille8.product[i].color = color;
                        console.log("Article  modifier" + famille8.product[i].name + "de couleur " + famille8.product[i].color);
                    }
                }
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
        send();
    });

    socket.on('ajoutfamille', function(name, color, pichet) {
        var tab = [];
        tab.push(famille1);
        tab.push(famille2);
        tab.push(famille3);
        tab.push(famille4);
        tab.push(famille5);
        tab.push(famille6);
        tab.push(famille7);
        tab.push(famille8);
        var check = true;
        for (var i = 0; i < tab.length; i++) {
            console.log("Libre : " + tab[i].libre);
            if (check == true) {
                if (tab[i].libre == true) {
                    check = false;
                    tab[i].name = name;
                    tab[i].color = color;
                    tab[i].pichets = pichet;
                    tab[i].libre = false;
                }
            }
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
        send();
    });


    socket.on('envoifamille', function(name, color, pichet) {

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
        io.sockets.emit('listefamille', objWithSubObj);
    });

    socket.on('modifierfamille', function(famille, name, color, pichet) {
        var tab = [];
        tab.push(famille1);
        tab.push(famille2);
        tab.push(famille3);
        tab.push(famille4);
        tab.push(famille5);
        tab.push(famille6);
        tab.push(famille7);
        tab.push(famille8);
        var check = true;
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].id == famille) {
                tab[i].name = name;
                tab[i].color = color;
                tab[i].pichets = pichet;
            }
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
        send();
    });

    socket.on('supprimerfamille', function(famille) {
        var tab = [];
        tab.push(famille1);
        tab.push(famille2);
        tab.push(famille3);
        tab.push(famille4);
        tab.push(famille5);
        tab.push(famille6);
        tab.push(famille7);
        tab.push(famille8);
        var check = true;
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].id == famille) {
                tab[i].name = "...";
                tab[i].color = 0;
                tab[i].pichets = 0;
                tab[i].libre = true;
                console.log("Famille supprimer");
            }
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
        send();

    });

    socket.on('receiveclick', function(famille, id) {
        console.log("Click reçu :" + id + "de la famille : " + famille);
        switch (famille) {
            case 1:
                for (var i = 0; i < famille1.product.length; i++) {
                    if (famille1.product[i].id == id) {
                        print(famille1.product[i].name, famille1.pichets);

                    }
                }
                break;
            case 2:
                for (var i = 0; i < famille2.product.length; i++) {
                    if (famille2.product[i].id == id) {
                        print(famille2.product[i].name, famille2.pichets);
                    }
                }
                break;
            case 3:
                for (var i = 0; i < famille3.product.length; i++) {
                    if (famille3.product[i].id == id) {
                        print(famille3.product[i].name, famille3.pichets);
                    }
                }
                break;
            case 4:
                for (var i = 0; i < famille4.product.length; i++) {
                    if (famille4.product[i].id == id) {
                        print(famille4.product[i].name, famille4.pichets);
                    }
                }
                break;
            case 5:
                for (var i = 0; i < famille5.product.length; i++) {
                    if (famille5.product[i].id == id) {
                        print(famille5.product[i].name, famille5.pichets);
                    }
                }
                break;
            case 6:
                for (var i = 0; i < famille6.product.length; i++) {
                    if (famille6.product[i].id == id) {
                        print(famille6.product[i].name, famille6.pichets);
                    }
                }
                break;
            case 7:
                for (var i = 0; i < famille7.product.length; i++) {
                    if (famille7.product[i].id == id) {
                        print(famille7.product[i].name, famille7.pichets);
                    }
                }
                break;
            case 8:
                for (var i = 0; i < famille8.product.length; i++) {
                    if (famille8.product[i].id == id) {
                        print(famille8.product[i].name, famille8.pichets);
                    }
                }
                break;
        }
    });


    function print(nomproduit, nbpichet) {
        console.log("Impression : " + nomproduit + " Nombre pichet : " + nbpichet + " Nom d'établissement : " + nameetab);
    }

    socket.on('verifutilisateur', function(user, mdp) {

    });

    socket.on('ajoututilisateur', function(user, mdp) {

    });

    socket.on('supprimerutilisateur', function(user, mdp) {

    });

    socket.on('getetab', function() {
        socket.emit('getetab', nameetab);
    });

    socket.on('modifierparametre', function(name, hours, minutes) {
        nameetab = name;
        var datetemp = new Date();
        datetemp.setHours(hours);
        datetemp.setMinutes(minutes);
        date1 = datetemp;
        var myOptions = {
            Nom: name,
            idDay: idDay,
            date: date1,
            heure: hours,
            minute: minutes
        };
        var data = JSON.stringify(myOptions);
        fs.writeFile('./config.json', data, function(err) {
            if (err) {
                console.log('There has been an error saving your configuration data.');
                console.log(err.message);
                return;
            }
            console.log('Configuration saved successfully.')
        });
        console.log("Nouvelle date : " + date1);
    });


});

function createRamdomID() {
    var pos = idDay.indexOf(":");
    var previousid = idDay.substring(pos + 1, idDay.length);
    console.log("ID de hier : " + previousid);
    var rand = Math.floor(Math.random() * 100) + 150;
    var d = new Date();
    idDay = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + ":" + rand;
    console.log("ID du jour : " + idDay);
    var check = false;
    while (check != true) {
        if (previousid == rand) {
            console.log("Id identique au jour d'avant... regeneration d'un code")
            rand = Math.floor(Math.random() * 100) + 150;
            idDay = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + ":" + rand
        } else {
            check = true;
        }
    }
    var myOptions = {
        Nom: nameetab,
        idDay: idDay,
        date: date1,
        heure: heure,
        minute: minute

    };
    var data = JSON.stringify(myOptions);
    fs.writeFile('./config.json', data, function(err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        }
        console.log('Configuration saved successfully.')
    });
}

function checkdate() {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    //var date1 = new Date(2015, 1, 1, 14, 00, 00, 0);
    console.log("etape 1");
    var date2 = new Date();

    // Convert both dates to milliseconds
    console.log("etape 1,5");
    var date1_ms = date1.getTime();
    console.log("etape 1,6");
    var date2_ms = date2.getTime();

    console.log("etape 2");
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    console.log("Diiférence : " + difference_ms / one_day);
    if (difference_ms / one_day >= 0) {
        console.log("Jour dépassé...");
        date1 = new Date();
        date1.setDate(date1.getDate() + 1);
        console.log("heure" + heure);
        console.log("minute" + minute);
        date1.setHours(heure);
        date1.setMinutes(minute);

        console.log("Nouvelle date : " + date1);
        createRamdomID();
    } else {
        console.log("Même jour...");
    }
}