
// ######################## EVENTS ########################

$(document).bind('mobileinit',function(){
	$.mobile.pushStateEnabled = false;
});

$(document).on("pageshow", "#functions", function() {
	$("div[data-role='collapsible']").collapsible( "collapse" );
} );

$( document ).ready(function() {
	//ferme les autres collapsible quand on clique sur 1 et focus dessus
	$("div[data-role='collapsible']").on( "collapsibleexpand", function( event, ui ) {
		$("div[data-role='collapsible']").not($(this)).collapsible( "collapse" );
		$('html, body').animate({ scrollTop: $($(this)).offset().top }, 'slow');
	} );
});

$(document).on( "pageremove", function( event ) {
	$('#articles').DataTable().destroy(false); 
});

$(document).ajaxComplete(function(){
	if($('#elementID').length != 0) {
		$('#elementID').css('position', 'absolute');
	}
});

// fix bug de la taille du header au chargement
$(window).on('load', function () {
	$(this).trigger('resize');
});

// ######################## FUNCTIONS ########################

function buildDashboard(data){
	
}

function showLoginError(){

	$('#login-input')
	.prop('type', 'text')
	.css( "color", "red" )
	.val('MOT DE PASSE NON VALIDE')
	.fadeOut(2000, function(){
		$(this)
		.prop('type', 'password')
		.val('')
		.removeAttr("style");
	});

	$("#1, #2, #3, #4, #5, #6, #7, #8, #9, #0").on("click", function(){
		$('#login-input').stop(true, true)
	});
}


