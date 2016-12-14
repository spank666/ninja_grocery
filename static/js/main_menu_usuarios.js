$(document).on({
	click:function(){
		$("#sistema_contenido").html('<div id="sistema_nav">\
											<span id="sistema_loading_circle"></span>\
											<span id="sistema_label">'+$(this).text()+'</span>\
											<span id="sistema_triangulo"></span>\
											<div class="sistema_nav_button" id="usuarios_agregar">Agregar</div>\
									  </div>\
									  <div id="usuarios_fondo">\
											<div id="sistema_panel_filtro">\
												<input type="text" placeholder="Buscar" class="sistema_input_filter" id="sistema_filter">\
											</div>\
											<div id="sistema_tablaResponsiva">\
												<div id="sistema_table">\
													<div class="usuarios_row1">Nombre<span class="sistema_order" data-order="0">&#xe824;</span></div>\
													<div class="usuarios_row2">Apellido<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row3">Usuario<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row4">Nivel<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row5">Telefono<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row6">Correo<span class="sistema_order" data-order="0">&#xe824;</span>\</div>\
													<div class="usuarios_row7"></div>\
												</div>\
												<div id="sistema_order_by"></div>\
											</div>\
									  </div>');
		
		$.ajax({
			type: 'POST',
			url: '../usuarios/usuarios',
			dataType:"json",
			timeout:tiempo,
			success: function(data) {
				//alert(JSON.stringify(data))
				if(data=="sesion"){
					//location.reload();
				}else{
					var contenido='';
					for(var i=0;data.length>i;i++){
						contenido+='<div class="sistema_row_registro">\
										<div class="usuarios_reg_row1">'+data[i].nombre+'</div>\
										<div class="usuarios_reg_row2">'+data[i].apellido+'</div>\
										<div class="usuarios_reg_row3">'+data[i].usuario+'</div>\
										<div class="usuarios_reg_row4">'+data[i].nivel+'</div>\
										<div class="usuarios_reg_row5">'+data[i].telefono+'</div>\
										<div class="usuarios_reg_row6">'+data[i].correo+'</div>\
										<div class="usuarios_reg_row7">\
											<span class="usuario_eliminar">&#xe81a;</span>\
											<span class="usuario_editar">&#xe815;</span>\
											<span class="usuario_bloquear">&#xf13e;</span>\
										</div>\
									</div>';
					}
					$("#sistema_order_by").html(contenido);
					sistema_loading_hide();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(ajaxOptions);
			}
		});
	}
},"#main_menu_usuarios");

//Ordenar
$(document).on({
	click:function(){
		var columna=$(this).index();
		//Limpiar todos los campos por ordenar
		var este=$(this);
		//alert(este.text()+" - "+este.children(".sistema_order").data("order"))
		var direccion=este.children(".sistema_order").data("order");
		var otro=$(".sistema_order");
		otro.data("order",0);
		otro.html("&#xe824;");
		
		
		if(direccion==0){
			este.children(".sistema_order").data("order",1);
			este.children(".sistema_order").html("&#xf175;");
		}else{
			este.children(".sistema_order").data("order",0);
			este.children(".sistema_order").html("&#xf176;");
		}
		
		//$("#sistema_filter").val(.children(".sistema_order").data("order"))
		if(columna!=6){
			// doble flecha
			var $divs = $(".sistema_row_registro");
			var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
				if(direccion==0){
					return $(a).find("div:eq("+columna+")").text().toLowerCase().localeCompare($(b).find("div:eq("+columna+")").text().toLowerCase());
				}else{
					return $(b).find("div:eq("+columna+")").text().toLowerCase().localeCompare($(a).find("div:eq("+columna+")").text().toLowerCase());
				}
			});

			$("#sistema_order_by").html(alphabeticallyOrderedDivs);
		}
	}
},"#sistema_table > div");


$(document).on('touchstart', '.sistema_row_registro', function(event){

});

$(document).on({
	click:function(){
		/*
		sistema_loading_show();
		setTimeout(function(){
					sistema_loading_hide();
					},250);
		*/
        $("#sistema_ventanaModal").removeAttr("class").addClass("usuarios_responsiveModal").fadeIn(500);
		$("#sistema_popup").fadeIn(250);
                
        $("#sistema_modalTitulo").html('Agregar Usuario\
                    					<div id="sistema_modalCerrar">&#xe807;</div>');
		$("#sistema_modalContenido").html('<div id="usuario_panel_izquierdo">\
											   <div>Usuario <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form" style="border: 1px solid #d24d57;">\
											   <div class="usuarios_error_message">Debes ingresar un usuario valido, por favor.</div>\
											   <div class="usuarios_margenTitulo">Contraseña <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="password" class="usuario_input_form">\
											   <div class="usuarios_margenTitulo">Repetir Contraseña <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="password" class="usuario_input_form">\
											   <div class="usuarios_margenTitulo">Nombre <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form">\
											   <div class="usuarios_margenTitulo">Apellidos <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form">\
											   <div class="usuarios_margenTitulo">Nivel <span class="sistema_campo_obligatorio">*</span></div>\
												<label class="select">\
													<select class="usuario_select_form"><option>x</option></select>\
												</label>\
										   </div>\
										   <div id="usuario_panel_derecho">\
										   		<div>Sucursal <span class="sistema_campo_obligatorio">*</span></div>\
												<label class="select">\
												<select class="usuario_select_form"><option>x</option></select>\
												</label>\
												<div class="usuarios_margenTitulo">Telefono <span class="sistema_campo_obligatorio">*</span></div>\
												<input type="text" class="usuario_input_form">\
												<div class="usuarios_margenTitulo">Correo <span class="sistema_campo_obligatorio">*</span></div>\
												<input type="text" class="usuario_input_form">\
												<div class="usuarios_margenTitulo">Calle <span class="sistema_campo_obligatorio">*</span></div>\
												<input type="text" class="usuario_input_form">\
												<div class="usuarios_margenTitulo">Colonia <span class="sistema_campo_obligatorio">*</span></div>\
												<input type="text" class="usuario_input_form">\
												<div class="usuarios_margenTitulo">Estado <span class="sistema_campo_obligatorio">*</span></div>\
												<input type="text" class="usuario_input_form">\
										   </div>\
										   <div class="sistema_fixSpace"></div>\
										   <div id="usuario_add" class="sistema_button_round" data-nombre="Agregar">\
												Agregar\
										   </div>');
		/*
		var datos=new FormData();
		datos.append("usuario",'spank');
		datos.append("sucursal",JSON.stringify({"user":"hard","pass":"ass"}));
                    
		$.ajax({
			type: 'POST',
			data: datos,
			url: '../usuarios/testeo',
			cache: false,
			dataType: 'json',
			processData: false,
			contentType: false,
			success: function(data) {
				alert(data)
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(ajaxOptions);
			}
		});
		*/
	}
},"#usuarios_agregar");

$(document).on({
	click:function(){
		btn_start_girar($(this).attr("id"));
		setTimeout(function(){
			btn_stop_girar_good("usuario_add")
		},3000);
	}
},"#usuario_add");