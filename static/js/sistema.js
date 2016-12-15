var tiempo=15000;
$(document).ready(function() {
	perfil();
	
	
	$(document).on({
        click:function(){
			$.ajax({
				type: 'POST',
				url: '../login/sinsesion/',
				timeout:tiempo,
				success: function() {
					location.reload();
				},
				error: function (xhr/*, ajaxOptions, thrownError*/) {
					alert(xhr.responseText);
				}
			});
    	}
    },"#sistema_logout");
	
	var des=$("#sistema_contenido");
	$(document).on({
		click:function(){
			var este=$(this);
			if(este.data("pos")==0){
				este.html("&#xe82e;");
				este.data("pos",1);
				des.removeAttr("style");
				des.css({"width":"100%","transform":"none"});
			}else{
				este.html("&#xe82d;");
				este.data("pos",0);
				des.removeAttr("style");
			}
		}
	},"#sistema_menu_button");

	$(window).resize(function() {
		des.css({"transition":"none"});
	});
	
	
	$(document).on({
		click:function(){
			//alert();
			$(".sistema_sub_select").removeAttr("style");
			$(this).css({"border-bottom":"1px solid #16a085","color":"#16a085"});
			switch($(this).attr("id")){
				case "sistema_menu":
					$("#sistema_subnavegacion").css({"transform":"translate3d(0px,0px,0px)"});
				break;
				case "sistema_chat":
					$("#sistema_subnavegacion").css({"transform":"translate3d(-250px,0px,0px)"});
				break;
				case "sistema_notificaciones":
					$("#sistema_subnavegacion").css({"transform":"translate3d(-500px,0px,0px)"});
				break;
			}
		}
	},".sistema_sub_select");
	
	function perfil(){
		$.ajax({
			type: 'POST',
			url: '../sistema/perfil',
			dataType:"json",
			success: function(data) {
				if(data=="sesion"){
					location.reload();
				}else{
					$("#sistema_persona").text(data[0].nombre+" "+data[0].apellido);
					$("#sistema_nivel").text(data[0].nivel);
					$("#sistema_imagen_perfil").css({"background-image":"url(../static/imagenes/users/"+data[0].secreto+"/"+data[0].foto+")"});
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.responseText);
			}
		});
	}
	
	$.ajax({
		type: 'POST',
		url: '../sistema/menu',
		dataType:"json",
		success: function(data) {
			var contador=0;
			for(var i=0;data.length>i;i++){
				$("#sistema_nav_menu").append('<div class="main_menu">'+data[i].menu+'</div>');
				for(var j=0;data[i].submenu.length>j;j++){
					//carga los css
					$("#sistema_nav_menu").append('<div class="main_submenu" id="'+data[i].submenu[j].CLASE+'">'+data[i].submenu[j].SUB+'</div>');
					//Carga los js
					$("head").append('<link rel="stylesheet" href="../static/css/'+data[i].submenu[j].CLASE+'.css" type="text/css" media="all" >');
					$.getScript( '../static/js/'+data[i].submenu[j].CLASE+'.js' )
					  .done(function( /*script, textStatus*/ ) {
						//alert( textStatus+" - "+script );
						contador++;
						//alert(contador);
						if(contador>=24){
							cargarPrimerOpcion();
						}
					  })
					  .fail(function( /*jqxhr, settings, exception*/ ) {
						//alert( "Triggered ajaxError handler." );
						contador++;
					});

				}
			}
			
		},
		error: function (xhr/*, ajaxOptions, thrownError*/) {
				alert(xhr.responseText);
		}
	});
	
	function cargarPrimerOpcion(){
        var primera=$(".main_submenu:eq(0)").attr("id");
		$("#"+primera).click();
		setTimeout(function(){
			$("#sistema_precarga").fadeOut(250,function(){
				$(this).remove();
			});
		},1000);
	}
	
	$(document).on({
		click:function(){
			$(".main_submenu").removeAttr("style");
			$(this).css({"background-image":"url(../static/imagenes/submenus/"+$(this).attr("id")+"_white.png)",
					     "background-color":"#2d323d",
						 "color":"#ffffff"});
                                             //535979
		}
	},".main_submenu");
	
$.extend($.expr[":"], {"containsIN": function(elem, i, match, array) {
	return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
}
});

//Filtrar
/*
$(document).on({
	keyup:function(){
		$("#sistema_registros").removeAttr("style");
		
		$(".sistema_row_registro").hide();
		var data = this.value;
	
		$(".sistema_row_registro").filter(function (i, v) {
			var $t = $(this);
			if($t.is(":containsIN('" + data + "')")){
				$t.closest(".sistema_row_registro").show();
			}
		});
	}
},"#sistema_filter");
*/
$(document).on({
	click:function(){
		$("#sistema_ventanaModal").fadeOut(250);
		$("#sistema_popup").fadeOut(500);
	}
},"#sistema_modalCerrar");

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        // <DO YOUR WORK HERE>
		if($("#sistema_popup").is(":visible")){
			$("#sistema_modalCerrar").trigger("click");
		}
    }
});
	
});//fin document ready

//Funciones para mostrar/ocultar el simbolo de cargando
function sistema_loading_hide(){
	$("#sistema_loading_circle").fadeOut(100,function(){
		$("#sistema_label").fadeIn(100);
	});
}
function sistema_loading_show(){
	$("#sistema_label").fadeOut(100);
	$("#sistema_loading_circle").fadeIn(100);
}

//Convertir el boton agregar/guardar en boton de cargando
function btn_start_girar(arg){
    if(!$("#"+arg).hasClass("login_access_selected") && !$("#"+arg).hasClass("button_error") && !$("#"+arg).hasClass("button_success")){
        $("#"+arg).addClass("login_access_selected");
        $("#"+arg).text("");
        setTimeout(function(){
            $("#"+arg).css({"animation":"gira 1.2s linear infinite"});
        },280);
    }
}

function btn_stop_girar_good(arg){
    $("#"+arg).removeAttr("style");
    $("#"+arg).html('<span class="main_button_response">&#xe806;</span>');
    $("#"+arg).removeClass("login_access_selected").addClass("button_success");
    setTimeout(function(){
            $("#"+arg).removeClass("button_success");
            $("#"+arg).html($("#"+arg).data("nombre"));
    },2000);
}

function btn_stop_girar_bad(arg){
    $("#"+arg).removeAttr("style");
    $("#"+arg).html('<span class="main_button_response">&#xe807;</span>');
    $("#"+arg).removeClass("login_access_selected").addClass("button_error");
    setTimeout(function(){
            $("#"+arg).removeClass("button_error");
            $("#"+arg).html($("#"+arg).data("nombre"));
    },2000);
}