var socket = io.connect();
var globalData;
/*
socket.emit('ajoutarticle', 1, "Chateau margaux", "1");
socket.emit('ajoutarticle', 2, "Vins arbois", "2");
socket.emit('ajoutarticle', 3, "Muscaret", "3");
socket.emit('ajoutarticle', 4, "Magnum", "4");
socket.emit('ajoutarticle', 5, "Edenvine", "5");
socket.emit('ajoutarticle', 6, "Vodka absolute", "6");
socket.emit('ajoutarticle', 7, "Limeone", "7");
socket.emit('ajoutarticle', 8, "Chateau de Pampelone", "8");
socket.emit('ajoututilisateur', "titi", "prout");
socket.emit('ajoututilisateur', "Justin", "test");
socket.emit('supprimerutilisateur', "toto");
socket.emit('modifierutilisateur', "Justin", "nouveaumdp", "Justino");
socket.emit('verifutilisateur', "Justin", "nouveaumdp");
socket.emit('supprimerfamille', 8);
*/

socket.emit('ajoutfamille', "rosé", 2, 2);

// ######################## EVENTS ########################
$(document).bind('mobileinit', function() {
	$.mobile.pushStateEnabled = false;
});

$(document).on("pageshow", "#functions", function() {
	$("div[data-role='collapsible']").collapsible("collapse");
});


$(document).ready(function() {
	$("#mycolor").colorpicker({
		strings: "Couleurs de themes,Couleurs de base,Plus de couleurs,Moins de couleurs,Palette,Historique,Pas encore d'historique."
	});


	//ferme les autres collapsible quand on clique sur 1 et focus dessus
	$("div[data-role='collapsible']").on("collapsibleexpand", function(event, ui) {
		$("div[data-role='collapsible']").not($(this)).collapsible("collapse");
		$('html, body').animate({
			scrollTop: $($(this)).offset().top
		}, 'slow');
	});

});

$(document).on("pageremove", function(event) {
	$('#articles').DataTable().destroy(false);
});

$(document).ajaxComplete(function() {
	if ($('#elementID').length != 0) {
		$('#elementID').css('position', 'absolute');
	}
});

// fix bug de la taille du header au chargement
$(window).on('load', function() {
	$(this).trigger('resize');
});

socket.on('receive', function(data) {
	globalData = data;
	var navbar = [];
	for (var i = 0; i < data.length; i++) {
		var obj = {
			"familyId": data[i].id,
			"name": data[i].name
		};
		navbar.push(obj)
	}
	appendNavbar(navbar);
});


// ######################## FUNCTIONS ########################

function appendNavbar(data) {
	$('#main-nav').empty();

	var nav = '<div data-role="navbar" id="main-nav"><ul id="first-ul">'
	for (var i = 0; i < 4; i++) {
		nav += '<li><a href="#" class="nav-link" id="' + data[i].familyId + '">' + data[i].name + '</a></li>'
	}
	nav += '</ul><ul>'
	for (var i = 4; i < data.length; i++) {
		nav += '<li><a href="#" class="nav-link" id="' + data[i].familyId + '">' + data[i].name + '</a></li>'
	}
	nav += '</ul></div>';
	$("#head").append(nav);
	$('#main-page').trigger('create');

	$(".nav-link").on("click", function() {
		appendDashboard(this.id);
	});

	$("#first-ul li:first-child a").click();
}



round_up = function(x, factor) {
	return x - (x % factor) + (x % factor > 0 && factor);
}

function appendDashboard(familyId) {
	$('#main-content').empty();

	var products = globalData[familyId - 1].product;

	if (products.length != 0) {
		// arrondi tableau au multiple de 3 superieur
		roundNumber = round_up(products.length, 3);
		elementsToAdd = roundNumber - products.length
		if (roundNumber) {
			for (var i = 1; i <= elementsToAdd; i++) {
				products.push({
					"name": "fake"
				});
			}
		}
		//à changer
		var blockClassType = ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'];
		var dashboard = ''

		dashboard += '<div class="ui-grid-b ui-responsive">'
		for (var i = 0; i < products.length; i++) {
			if (i != 0 && i % 3 == 0) {
				dashboard += ' </div><div class="ui-grid-b ui-responsive">';
			}
			if (products[i].name == 'fake') {
				dashboard += '<div style="visibility:hidden" class="ui-block-' + blockClassType[i] + '"><a href="#" class="ui-btn ui-shadow ui-corner-all custom"></a></div>'
			} else {
				dashboard += '<div class="ui-block-' + blockClassType[i] + '"><a href="#" id="' + products[i].id + '" class="pdt-btn ui-btn ui-shadow ui-corner-all custom">' + products[i].name + '</a></div>'
			}
		}
		dashboard += ' </div>';
		$("#main-content").append(dashboard);

		$(".pdt-btn").on("click", function() {
			printEtiquette(familyId, this.id);
		});
	}
}

function printEtiquette(familyNumber, productId) {
	console.log(familyNumber)
	console.log(productId)
}

function showLoginError() {

	$('#login-input')
		.prop('type', 'text')
		.css("color", "red")
		.val('MOT DE PASSE NON VALIDE')
		.fadeOut(2000, function() {
			$(this)
				.prop('type', 'password')
				.val('')
				.removeAttr("style");
		});

	$("#1, #2, #3, #4, #5, #6, #7, #8, #9, #0").on("click", function() {
		$('#login-input').stop(true, true)
	});
}