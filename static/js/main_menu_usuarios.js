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
												<div id="sistema_order_mascara">\
													<div id="sistema_order_by"></div>\
												</div>\
											</div>\
											<div style="height:8px;"></div>\
											<div id="access_pagination" data-actual="0">\
												<button class="arrow_left arrow_disabled" id="access_prev_p">\
													<i></i>\
													<i></i>\
												</button>\
												<span id="pagination_position"></span>\
												<button class="arrow_right" id="access_next_p">\
													<i></i>\
													<i></i>\
												</button>\
												<div style="height:15px;"></div>\
											</div>\
									  </div>\
									  <div id="sistema_fixBottom"></div>');
		
		$.ajax({
			type: 'POST',
			url: '../usuarios/usuarios',
			dataType:"json",
			timeout:tiempo,
			success: function(data) {
				//alert(JSON.stringify(data));
				if(data=="permiso"){}
				if(data=="sesion"){
					location.reload();
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
											<!--<span class="usuario_eliminar">&#xe81a;</span>-->\
											<span class="usuario_editar">&#xe815;</span>\
											<span class="usuario_bloquear">&#xf13e;</span>\
										</div>\
									</div>';
					}
					$("#sistema_order_by").html(contenido);
					sistema_loading_hide();
					calcular_paginacion_access();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(ajaxOptions);
			}
		});
		
		/*
		$.ajax({
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						//Do something with upload progress here
						console.log(percentComplete)
					}
			   }, false);
		
			   xhr.addEventListener("progress", function(evt) {
				   var percentComplete;
				   if (evt.lengthComputable) {
					   percentComplete = evt.loaded / evt.total;
					   //Do something with download progress
					   //console.log("Descargado"+percentComplete)
				   }else{
					   
					   percentComplete = evt.loaded / evt.target.getResponseHeader('X-Content-Length');
					   //console.log(evt.loaded +"/"+ evt.target.getResponseHeader('X-Content-Length'))
					   //console.log("Descargado Falso:"+percentComplete)
				   }
				   console.log("Descargado"+percentComplete)
				   console.log(evt)
			   }, false);
		
			   return xhr;
			},
			type: 'POST',
			url: '../usuarios/usuarios',
			data: {},
			success: function(data){
				//Do something on success
				//alert(data)
			}
		});
		*/
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
		$("#sistema_modalContenido").html('<div id="usuarios_photo_profile_add"></div>\
										   <input type="file" name="foto" id="usuarios_subir_imagen" accept="image/*">\
										   <div id="usuario_panel_izquierdo">\
											   <div>Usuario <span class="sistema_campo_obligatorio">*</span></div>\
											   <input type="text" class="usuario_input_form" >\
											   <div class="usuarios_error_message" style="display:none;">Debes ingresar un usuario valido, por favor.</div>\
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
												<div class="usuarios_margenTitulo">Telefono</div>\
												<input type="text" class="usuario_input_form">\
												<div class="usuarios_margenTitulo">Correo</div>\
												<input type="text" class="usuario_input_form">\
												<div class="usuarios_margenTitulo">Calle</div>\
												<input type="text" class="usuario_input_form">\
												<div class="usuarios_margenTitulo">Colonia</div>\
												<input type="text" class="usuario_input_form">\
												<div class="usuarios_margenTitulo">Estado</div>\
												<input type="text" class="usuario_input_form">\
										   </div>\
										   <div class="sistema_fixSpace"></div>\
										   <div id="usuario_add" class="sistema_button_round" data-nombre="Agregar">\
												Agregar\
										   </div>');
		/*<!--style="border: 1px solid #d24d57;"-->
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

$(document).on({
    click:function(){
        if(parseInt($("#access_pagination").data("actual"))>0){
			$("#sistema_order_mascara").removeAttr("style");
            var movimiento=740;
            var pagina=parseInt($("#access_pagination").data("actual"))-1;
            $("#access_pagination").data("actual",pagina)
            $("#sistema_order_by").css({'transform':'translate3d(0px,-'+movimiento*pagina+'px,0px)'});
            $("#pagination_position").html((pagina+1)+" / "+$("#access_pagination").data("total"));
            pagination_hd_access();
        }
    }
},"#access_prev_p");

$(document).on({
    click:function(){
        //alert(parseInt($("#access_pagination").data("actual"))+" - "+parseInt($("#access_pagination").data("total")))
        if(parseInt($("#access_pagination").data("actual"))<(parseInt($("#access_pagination").data("total")))-1){
            
            var movimiento=740;
            var pagina=parseInt($("#access_pagination").data("actual"))+1;
            //alert($("#access_pagination").data("total"))
            $("#access_pagination").data("actual",pagina)
            
            $("#sistema_order_by").css({'transform':'translate3d(0px,-'+movimiento*pagina+'px,0px)'});
            $("#pagination_position").html((pagina+1)+" / "+$("#access_pagination").data("total"));
            pagination_hd_access();
        }
    }
},"#access_next_p");

function pagination_hd_access(){
    if(parseInt($("#access_pagination").data("actual"))==0){
        $("#access_prev_p").addClass("arrow_disabled");
    }else{
        $("#access_prev_p").removeClass("arrow_disabled");
    }
    if(parseInt($("#access_pagination").data("actual"))==(parseInt($("#access_pagination").data("total"))-1)){
        $("#access_next_p").addClass("arrow_disabled");
		var contar_filas=$(".sistema_row_registro:visible").length;
		
		var c_pag=0;
		if(contar_filas % 20 === 0){
			c_pag=contar_filas/20;
		}else{
			c_pag=parseInt(contar_filas/20);
		}
		var nuevo_t=contar_filas-(c_pag*20);
		$("#sistema_order_mascara").css({"height":(nuevo_t*37)+"px"});
		
    }else{
        $("#access_next_p").removeClass("arrow_disabled");
    }
}

function calcular_paginacion_access(){
    var contar_filas=0;
    $(".sistema_row_registro").each(function(){
        if($(this).is(":visible")){
            contar_filas++;
        }
    });
    if(contar_filas>20){
        $("#access_pagination").css({"display":"block"});
    }else{
        $("#access_pagination").removeAttr("style");
    }
    
    var c_pag=0;
    if(contar_filas % 20 === 0){
        c_pag=contar_filas/20;
    }else{
        c_pag=parseInt(contar_filas/20);
        c_pag+=1;
    }

    $("#access_pagination").data("total",c_pag);
    $("#pagination_position").html("1 / "+parseInt(c_pag));
}

$(document).on({
	keyup:function(){
		$("#sistema_order_mascara").removeAttr("style");
		$("#sistema_order_by").removeAttr("style");
		
		$(".sistema_row_registro").hide();
		var data = this.value;
	
		$(".sistema_row_registro").filter(function (i, v) {
			var $t = $(this);
			if($t.is(":containsIN('" + data + "')")){
				$t.closest(".sistema_row_registro").show();
			}
		});
		$("#access_pagination").data("actual",0);
        //pagination_hd_access()
		$("#access_prev_p").addClass("arrow_disabled");
		$("#access_next_p").removeClass("arrow_disabled")
        calcular_paginacion_access();
	}
},"#sistema_filter");

$(document).on({
	click:function(){
		$("#usuarios_subir_imagen").trigger("click");
	}
},"#usuarios_photo_profile_add");

$(document).on({
	change:function(){
		var src = createObjectURL( $(this)[0].files[0] );
		var extension=$(this).val().split(".");
		
		if(extension[extension.length-1]=="jpg" || extension[extension.length-1]=="jpeg" || extension[extension.length-1]=="png"){
			$("#usuarios_photo_profile_add").css({'background-image':"url("+src+")"});
		}else{
			$(this).val('');
			$("#usuarios_photo_profile_add").removeAttr("style");
			$("#usuarios_photo_profile_add").css({"background-image":"url("+$("#perfil_photo_profile").data("imagen")+")"});
			alert("El formato de esa imagen no es valido.");
		}
	}
},"#usuarios_subir_imagen");
/*
$(document).on({
	click:function(){
		$("#sistema_ventanaModal").removeAttr("class").addClass("usuarios_eliminarModal").fadeIn(500);
		$("#sistema_popup").fadeIn(250);
                
        $("#sistema_modalTitulo").html('Eliminar Usuario\
                    					<div id="sistema_modalCerrar">&#xe807;</div>');
		var este=$(this).closest(".sistema_row_registro");
		$("#sistema_modalContenido").html('¿Estas seguro que deseas eliminar a "'+este.children(".usuarios_reg_row1").text()+" "+este.children(".usuarios_reg_row2").text()+'"?\
											<br><br>\
											<div id="usuario_add" class="sistema_button_round" data-nombre="Si">\
												Si\
										   </div>')
	}
},".usuario_eliminar");
*/

$(document).on({
	click:function(){
		$("#sistema_ventanaModal").removeAttr("class").addClass("usuarios_bloquearModal").fadeIn(500);
		$("#sistema_popup").fadeIn(250);
                
        $("#sistema_modalTitulo").html('Eliminar Usuario\
                    					<div id="sistema_modalCerrar">&#xe807;</div>');
		var este=$(this).closest(".sistema_row_registro");
		$("#sistema_modalContenido").html('¿Estas seguro que deseas bloquear a "'+este.children(".usuarios_reg_row1").text()+" "+este.children(".usuarios_reg_row2").text()+'"?\
											<br><br>\
											<div id="usuario_add" class="sistema_button_round" data-nombre="Si">\
												Si\
										   </div>')
	}
},".usuario_bloquear");