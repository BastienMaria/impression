var socket = io.connect();
var globalData;

// ######################## EVENTS ########################
$(document).bind('mobileinit', function() {
	$.mobile.pushStateEnabled = false;
});

// on functions menu load collapse all collapsible
$(document).on("pageshow", "#functions", function() {
	$("div[data-role='collapsible']").collapsible("collapse");
});

// on main page load refresh header + footer
$(document).on("pagebeforeshow", "#main-page", function() {
	$( "#head" ).toolbar( "refresh" );
	$( "#footer" ).toolbar( "refresh" );
});

//reset form
$(document).on("pagebeforeshow", "#add-product, #add-family", function() {
	$('#form-family, #form-product').trigger("reset");
	$("#form-product-submit").attr('disabled','disabled');
});



$(document).ready(function() {

	$( "#color-picker" ).enhanceWithin().popup();

	$(".color-btn").on("click", function() {
		//get current page "family" or "product"
		var pageId = $(':mobile-pagecontainer').pagecontainer( "getActivePage" )[0].id;
		$("#mycolor-" + pageId).css('background-color', this.value);
		$("#mycolor-" + pageId).attr("name", this.value);
		$("#color-picker").popup("close");
	});

	//ferme les autres collapsible quand on clique sur 1 et focus dessus
	$("div[data-role='collapsible']").on("collapsibleexpand", function(event, ui) {
		$("div[data-role='collapsible']").not($(this)).collapsible("collapse");
		$('html, body').animate({
			scrollTop: $($(this)).offset().top
		}, 'slow');
	});

	$( "#form-family" ).submit(function( event ) {
		var familyName = $( "#name" ).val();
		var pichet = $( "#pichet" ).val();
		var color = $( "#mycolor-add-family" ).attr("name");
		socket.emit('ajoutfamille', familyName, color, pichet);
		$('#main-nav').empty();
		$.mobile.changePage( "#main-page", { transition: "slidefade", changeHash: true });
		$("#mycolor-add-family").css('background-color', "white");
		$("#mycolor-add-family").attr("name", "white");
		event.preventDefault();
	});	

	$( "#form-product" ).submit(function( event ) {
		var familyId = parseInt($( "#family-choice" ).val(), 10);
		var productName = $( "#name-art" ).val();
		var color = $( "#mycolor-add-product" ).attr("name");
		socket.emit('ajoutarticle', familyId, productName, color);
		$('#main-nav').empty();
		$.mobile.changePage( "#main-page", { transition: "slidefade", changeHash: true });
		$("#mycolor-add-product").css('background-color', "white");
		$("#mycolor-add-product").attr("name", "white");
		event.preventDefault();
	});

	$("#add-product-menu, #set-product-menu").on("click", function(){
		$('#product-content').empty();
		socket.emit('envoifamille');
	});

	$("#btn-param-family").on("click", function(){
		socket.emit('invoquereceive');
	});

	$("#family-choice").change(function() {
		// enable submit btn
		$('#form-product-submit').removeAttr('disabled');
	});

	// listener on family select (product settings)
	$("#family-choice-product-setting").change(function() {
		// clean table
		$('#product-content').empty();
		// get id of selected option as global
		familyIdGlobal = $(this).val();
		familyIdGlobal = parseInt(familyIdGlobal, 10);
		socket.emit('getproductonid',familyIdGlobal);
	});

});

// receive products list on family id
socket.on('receiveproductbyfamilyid', function(product) {
	appendProductParamTab(product)
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
	$("#main-content").trigger('resize');
	$( "#footer" ).toolbar( "refresh" );
	$( "#head" ).toolbar( "refresh" );
});

socket.on('erreurajoutfamille', function(data) {
	
	$('#main-nav').empty();
	setTimeout(function(){ $('#error-add-family').popup( "open"); }, 500);
	setTimeout(function(){ $('#error-add-family').popup( "close"); }, 1300);

});

socket.on('receive', function(data) {
	if ($('#main-nav').length){
		$('#main-nav').remove();
	}
	// $('#main-nav').empty();
	globalData = data;

	htmlData = [];
	for (var i = 0; i < globalData.length; i++) {
		var obj = {
			"familyId": globalData[i].id,
			"name": globalData[i].name,
			"familyColor": globalData[i].color,
			"pichet": globalData[i].pichets,
			"empty": globalData[i].libre
		};
		htmlData.push(obj)
	}
	htmlData.sort(function (a, b) {
		if (a.empty)
			return 1;
		if (a.empty == false)
			return -1;
		return 0;
	});

	appendNavbar(htmlData);
	appendFamilyParamTab(htmlData)
});

socket.on('listefamille', function(data) {
	$("#family-choice, #family-choice-product-setting").empty();
	$("#family-choice, #family-choice-product-setting").append($('<option>'));

	for (var i = 0; i < data.length; i++) {
		if(!data[i].libre){
			$("#family-choice, #family-choice-product-setting").append($('<option>', {value:data[i].id, text:data[i].name}));
		}
	};
	$("#family-choice-product-setting").selectmenu().selectmenu("refresh", true);
	$("#family-choice, #family-choice-product-setting").selectmenu("refresh", true);
});

// ######################## FUNCTIONS ########################

function appendNavbar(data) {
	$('#main-nav').empty();

	var nav = '<div data-role="navbar" id="main-nav"><ul id="first-ul">'
	for (var i = 0; i < 4; i++) {
		if(!data[i].empty){
			nav += '<li><a href="#" class="nav-link" id="' + data[i].familyId + '" style="background-color:'+ data[i].familyColor +';">' + data[i].name + '</a></li>'
		}
		else {
			nav += '<li><a class="ui-disabled" href="#" class="nav-link" id="' + data[i].familyId + '" style="background-color:'+ data[i].familyColor +';">&#8239;</a></li>'
		}
	}
	nav += '</ul><ul>'
	for (var i = 4; i < data.length; i++) {
		if(!data[i].empty){
			nav += '<li><a href="#" class="nav-link" id="' + data[i].familyId + '" style="background-color:'+ data[i].familyColor +';">' + data[i].name + '</a></li>'
		}
		else{
			nav += '<li><a class="ui-disabled" href="#" class="nav-link" id="' + data[i].familyId + '" style="background-color:'+ data[i].familyColor +';">&#8239;</a></li>'
		}
	}
	nav += '</ul></div>';
	$("#head").append(nav);
	$('#main-page').trigger('create');

	$(".nav-link").on("click", function() {
		appendDashboard(this.id);
	});

	$("#first-ul li:first-child a").click();
}

function appendFamilyParamTab(data){

	$("#family-content").empty();
	var tab = "";
	for (var i = 0; i < data.length; i++) {
		if(!data[i].empty){
			tab += '<tr> <td>' + data[i].familyId + '</td>' 
			tab += '<td>' + data[i].name + '</td>' 
			tab += '<td><span class="color-view" style="background-color:' + data[i].familyColor + '"></span></td>' 
			tab += '<td style="display:none;">'  + data[i].familyColor +  '</td>' 
			tab += '<td>' + data[i].pichet + '</td>' 
			tab += '<td><button class="table-btn ui-btn-inline edit-family" data-transition="flip"><i class="fa fa-pencil"></i></button></td>'
			tab += '<td><button class="table-btn ui-btn-inline delete-family"><i class="fa fa-trash-o"></i></button></td> </tr>'
		}
	}
	$("#family-content").append(tab);

	$(".delete-family").on("click", function(){
		var familyIdDel = $(this).closest('td').prev().prev().prev().prev().prev().prev().text();
		socket.emit('supprimerfamille', familyIdDel);
	})

	$(".edit-family").on("click", function(){
		familyId = $(this).closest('td').prev().prev().prev().prev().prev().text();
		var familyColor = $(this).closest('td').prev().prev().text();
		var familyName = $(this).closest('td').prev().prev().prev().prev().text();
		var familyPichet = $(this).closest('td').prev().text();

		// set input with family name
		$('#name-set-family').val(familyName);
		$('#pichet-set').val(familyPichet);
		// set color of color picker
		$("#mycolor-set-family").css('background-color', familyColor);
		$("#mycolor-set-family").attr("name", familyColor);
		// $.mobile.changePage( "#set-family", { transition: "slidefade", changeHash: true });
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#set-family");
	});

	// listener on family setting form
	$( "#form-family-set" ).submit(function( event ) {
		var newName = $('#name-set-family').val();
		var newColor = $( "#mycolor-set-family" ).attr("name");
		var newPichet = $( "#pichet-set" ).val();
		socket.emit('modifierfamille', familyId, newName, newColor, newPichet);
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#param-family");

		event.preventDefault();
	});
}

function appendProductParamTab(product){

	$('#product-content').empty();
	var tab = "";
	for(var i = 0 ; i < product.length ; i++){
		if(!product[i].empty){
			tab += '<tr><td>' + product[i].name + '</td>' 
			tab += '<td><span class="color-view" style="background-color:' + product[i].color + '"></span></td>'
			tab += '<td style="display:none;">'+ product[i].color +'</td>'  //hidden column
			tab += '<td style="display:none;">'+ product[i].id +'</td>'  //hidden column
			tab += '<td><button class="table-btn edit-product" data-transition="flip"><i class="fa fa-pencil"></i></button></td>'
			tab += '<td><button class="table-btn delete-product"><i class="fa fa-trash-o"></i></button></td> </tr>'
		}
	}
	$("#product-content").append(tab);
	// listener on delete product button
	$(".delete-product").on("click", function(){
		var productIdDel = $(this).closest('td').prev().prev().text();
		socket.emit('supprimearticle', familyIdGlobal, productIdDel);
		socket.emit('getproductonid',familyIdGlobal);
	});
	// listener on edit product button
	$(".edit-product").on("click", function(){
		productId = $(this).closest('td').prev().text();
		var productColor = $(this).closest('td').prev().prev().text();
		var productName = $(this).closest('td').prev().prev().prev().prev().text();
		// set input with product name
		$('#name-set-product').val(productName);
		// set color of color picker
		$("#mycolor-set-product").css('background-color', productColor);
		$("#mycolor-set-product").attr("name", productColor);
		$.mobile.changePage( "#set-product", { transition: "slidefade", changeHash: true });
	});

	// listener on product setting form
	$( "#form-product-set" ).submit(function( event ) {
		var newName = $('#name-set-product').val();
		var newColor = $( "#mycolor-set-product" ).attr("name");
		socket.emit('modifierarticle', familyIdGlobal, productId, newName, newColor);
		socket.emit('getproductonid',familyIdGlobal);
		$.mobile.changePage( "#param-product", { transition: "slidefade", changeHash: true });
		event.preventDefault();
	});
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
				dashboard += '<div class="ui-block-' + blockClassType[i] + '"><a href="#" id="' + products[i].id + '" class="pdt-btn ui-btn ui-shadow ui-corner-all custom" style="background-color:' + products[i].color + '">' + products[i].name + '</a></div>'
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