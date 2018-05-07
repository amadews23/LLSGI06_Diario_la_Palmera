var scrollBottom = $(window).scrollTop() + $(window).height();

//Como el scroll no responde igual en el movil y tablet que en ordenador usaremos estas variables para ayudarnos
var pantalla_ancho = $(window).width();
var pantalla_alto = $(window).height();
//esta variable nos ayudara a acabar de cargar las noticias en mOvil y tablet
var sumar_pantalla = 0;
//igual a 0 es un ordenador igual a 1 un tablet o movil
var movil_o_tablet = 0;

$(function(){
	
	if (pantalla_ancho < pantalla_alto) {	//si el ancho de pantalla es menor que el largo debe ser movil o tablet
			movil_o_tablet = 1;
			sumar_pantalla = 100;
	}
	//Al refrescar la pAgina que haga scroll arriba
	$('html, body').animate( { scrollTop : 0 }, 600 );
	//variable para guardar el numero de archivo json a cargar
	var n_json = 0;

	fecha_actual();


	$(window).scroll(function() {
		
		if ($(document).scrollTop() == 0)  {
			if ( movil_o_tablet == 1) {
				$('#publi_mobil').css('display','block');
			}
			escondermostrar_Seccion(0);
			subirbajar_Publi(20);
			menu_estado = 0;

		} else { 
			$('#publi_mobil').css('display','none');
			if (($(document).scrollTop() > 100 )&& (movil_o_tablet == 0)) {
				escondermostrar_Seccion(1);
				subirbajar_Publi(-30);
				menu_estado = 1;
 			} 
			if (($(document).scrollTop() > 200)  && (movil_o_tablet == 0)) {
				escondermostrar_Seccion(2);
				subirbajar_Publi(-75);
				menu_estado = 2;
			}

		}
		
		if($(document).scrollTop()+pantalla_alto+sumar_pantalla>=$(document).height() ) {

			$('#boton_mas1').fadeOut("slow");
			$('#boton_mas2').fadeOut("slow");
			if (n_json < 2) {
				n_json++;
				$.getJSON( "data/"+n_json+".json", function( jsonObject ) {
					cargar_Noticias( jsonObject );
					if (n_json==1) {
					$('#noticias_secundarias').append('<input type="button" id="boton_mas2" class="btn btn-info" value="Cargar más noticias" onclick="bajar()"/>');
					}
				});
			}
		}

	});

});
function bajar() {

		if (movil_o_tablet == 0) {
			$('html, body').animate( { scrollTop : $(document).height()-385 }, 600 );
		} else {
			window.scrollTo(10, $(document).height());
		}

}
function mostrar_secciones() {
	escondermostrar_Seccion(0);
	subirbajar_Publi(20);
}
function mostrar_secciones_mobil() {
		$('#boton_menu_mobil').css('display','none');
		$('#boton_cerrar_mobil').css('display','inline');
		$('#secciones').css('display','inline');
		$('#fecha').css('display','none');
		$('.noticias1').css('display','inline');
		$('.noticias2').css('display','inline');
		$('#s0').css('display','inline');
		$('#s4').css('display','inline');
		$('#s5').css('display','inline');
		$('#s12').css('display','inline');

}
function cerrar_secciones_mobil() {
		$('#boton_menu_mobil').css('display','inline');
		$('#boton_cerrar_mobil').css('display','none');
		$('#secciones').css('display','none');
		$('.noticias1').css('display','none');
		$('.noticias2').css('display','none');
		$('#s0').css('display','none');
		$('#s4').css('display','none');
		$('#s5').css('display','none');
		$('#s12').css('display','none');
}
function cargar_Noticias(json) {
	$.each( json, function(i,uno) {
         	$('#noticias_secundarias').append('<div class="jumbotron"><h2>'+uno.title+'</h2></div>'+'<div class="row"><div class="col-sm-6" style="background-color:lavender;">'+uno.description+uno.datetime+'</div>'+'<div class="col-sm-6" style="background-color:lavender;">'+'<img id="imghorizontal" src=img/'+uno.imgmid+' class="img-responsive center-block"></div></div><br>');
     });

}

function subirbajar_Publi(distancia) {
	$('#publi').css('margin-top', distancia+'px');

}

function escondermostrar_Seccion(orden) {
	if (orden == 0) {
		$('.noticias1').css('display','inline');
		$('.noticias2').css('display','inline');
		$('#s0').css('display','inline');
		$('#s4').css('display','inline');
		$('#s5').css('display','inline');
		$('#s12').css('display','inline');
		$('#boton_menu').css('visibility','hidden');
	}
	if (orden == 1) {
		$('.noticias1').css('display','inline');
		$('.noticias2').fadeOut("slow");

		$('#s12').css('display','none');
		$('#s0').css('display','inline');
		$('#s4').css('display','inline');
		$('#s5').css('display','inline');
		$('#boton_menu').css('visibility','visible');
	}
	if (orden == 2) {
		$('.noticias1').css('display','none');
		$('.noticias2').css('display','none');
		$('#s0').css('display','none');
		$('#s4').css('display','none');
		$('#s5').css('display','none');
	}
}

function fecha_actual() {
	var d = new Date();
	var nm = Array(12);
	nm[0] = 'Enero';
	nm[1] = 'Febrero';
	nm[2] = 'Marzo';
	nm[3] = 'Abril';
	nm[4] = 'Mayo';
	nm[5] = 'Junio';
	nm[6] = 'Julio';
	nm[7] = 'Mayo';
	nm[8] = 'Junio';
	nm[9] = 'Julio';
	nm[10] = 'Mayo';
	nm[11] = 'Junio';
	var nds = Array(7);
	nds[0] = 'Domingo';
	nds[1] = 'Lunes';
	nds[2] = 'Martes';
	nds[3] = 'Miercoles';
	nds[4] = 'Jueves';
	nds[5] = 'Viernes';
	nds[6] = 'Sábado';
	$('#fecha').html(''+nds[d.getDay()]+', '+d.getDate()+' de '+nm[d.getMonth()]+' de '+d.getFullYear());

}
