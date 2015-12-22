console.log("Initialisation thread...OK");
//while(true){sleep(5000);console.log("popo");}
var test = "Renvoi d'alerte";
thread.on('giveMeTheFibo', function onGiveMeTheFibo (data) {
    //console.log("Données reçu : " + data);
    sleep(10000); 
    this.emit('theFiboIs', test); //Emits 'theFiboIs' in the parent/main thread.
 });


function sleep(milliseconds) {
   //console.log("timer ok");
   var start = new Date().getTime();
   for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
