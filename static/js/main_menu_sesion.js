$(document).on({
	click:function(){
		$.ajax({
			type: 'POST',
			url: '../login/sinsesion',
			success: function() {
				location.reload();
			},
			error: function (xhr, ajaxOptions, thrownError) {
			}
		});
		
	}
},"#main_menu_sesion");