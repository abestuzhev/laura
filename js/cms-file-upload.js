$(document).ready(function(){

	$('.upd-file').each(function() {
	
		var delBt = $('.uf-bt-del', this);
		var updBt = $('.uf-bt-upd', this);	
		var hidIp =  $('.uf-ip-hdn', this);

		
		if ( hidIp.val() ) {
			setTimeout(function(){
				delBt.show();
				updBt.hide();
			}, 1);
		} else {
			setTimeout(function(){
				delBt.hide();
				updBt.show();
			}, 1);
		}
		
		

		updBt.each(function() { // upload button

			$.ajax_upload(updBt, { // js/ajaxupload.js
				action : $(this).attr('href'),
				name : 'file',
				onError: function(file, response) {
					var r = $.parseJSON(response);
					hidIp.val(r.filename);
					updBt.hide();
					delBt.show();
				}
			});

		});



		delBt.click(function() { // delete button
			
			$.myPOST( 
				$(this).attr('href'), 
				{ file: hidIp.val() }, 
				function() {
					delBt.hide();
					updBt.show();
					hidIp.val('');
				}
			);

			return false;

		});

	});

});