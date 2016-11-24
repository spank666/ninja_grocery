$(document).ready(function() {
	$("#login_user").focus();
	$(document).on({
		click:function(){
			if($("#login_user").val().length!=0 && $("#login_pass").val().length!=0){
				login();
			}
		}
	},"#login_access");
	
	$(document).on({
        keypress:function(e){
			if(e.which == 13) {
				$("#login_pass").focus();
			}
    	}
    },"#login_user");
	
	$(document).on({
        keypress:function(e){
			if(e.which == 13) {
				$("#login_access").trigger("click");
			}
    	}
    },"#login_pass");
	
	function login(){
		if(!$("#login_access").hasClass("login_access_selected") && !$("#login_access").hasClass("login_access_error") && !$("#login_access").hasClass("login_access_success")){
			btn_start_girar("login_access");
			setTimeout(function(){
				$.ajax({
					type: 'POST',
					data: $("#login_form").serialize(),
					url: 'index.php/login/logeo',
					dataType:"json",
					success: function(data) {
						if(data=="true"){
							btn_stop_girar_good("login_access");
							setTimeout(function(){
								location.reload();
							},1000);
						}else{
							btn_stop_girar_bad("login_access");
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.responseText);
						btn_stop_girar_bad("login_access");
					}
				});
			},280);
		}
	}

		
	function btn_start_girar(arg){
		if(!$("#"+arg).hasClass("login_access_selected") && !$("#"+arg).hasClass("button_error") && !$("#"+arg).hasClass("button_success")){
			$("#"+arg).addClass("login_access_selected");
			$("#"+arg).text("");
			setTimeout(function(){
				$("#"+arg).css({"animation":"gira 1.4s linear infinite"});
			},280);
		}
	}
	function btn_stop_girar_good(arg){
		$("#"+arg).removeAttr("style");
		$("#"+arg).html('<img src="static/imagenes/good_wrong/good.png" class="main_button_response">');
		$("#"+arg).removeClass("login_access_selected").addClass("login_access_success");
		/*setTimeout(function(){
				$("#"+arg).removeClass("button_success");
				$("#"+arg).html($("#"+arg).data("nombre"));
		},2000);*/
	}
	
	function btn_stop_girar_bad(arg){
		$("#"+arg).removeAttr("style");
		$("#"+arg).html('<img src="static/imagenes/good_wrong/wrong.png" class="main_button_response">');
		$("#"+arg).removeClass("login_access_selected").addClass("login_access_error");
		//},3000);
		setTimeout(function(){
				$("#"+arg).removeClass("login_access_error");
				$("#"+arg).html($("#"+arg).data("nombre"));
		},2000);
	}
});