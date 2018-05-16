var CMS = {

	init : function() {

		var working = false;

		//$('.vertical-dropdown-menu').superfish({
		//	animation : {height : 'show'},
		//	delay : 600,
		//	hoverClass : 'active'
		//});

		$('.double-rounded-border').each(function() {
			$(this).wrap(function(){
				return '<div class="rounded-block"><div class="rounded-block-box"></div></div>';
			});
		});

		$('.ajax').each(function() {
			var modal_url = $(this).attr('href');
			modal_url = modal_url + (modal_url.indexOf('?') != -1 ? '&ajax=true' : '?ajax=true');
			$(this).attr('href', modal_url);
		});
		
		$('.ajax').click(function(e){
            var href=$(this).attr('href');
            if(href!='#'){	
                $('#ajax_load_content').slideUp();
                $('#ajax_load_loader').show();
                $('#ajax_load_page_content').slideDown();

                $('#ajax_load_content').load(''+href, function() {
                    $('#ajax_load_loader').hide();
                    $('#ajax_load_content').slideDown();
					
                });
            }
            e.preventDefault();
        });

		$('.modal').each(function() {
			var modal_url = $(this).attr('href');
			modal_url = modal_url + (modal_url.indexOf('?') != -1 ? '&modal=true' : '?modal=true');
			$(this).attr('href', modal_url);
		});

		$('.modal').fancybox({
			type : 'ajax',
			openEffect : 'elastic',
			// transitionIn	: 'elastic',
			openSpeed : 150,
			closeEffect : 'elastic',
			closeSpeed : 150,
			padding : 15,
			autoSize : true,
			fitToView : false,
			autoResize : false,
			closeClick : false,
			wrapCSS : 'modal-window',
			helpers: {
				overlay : {
					closeClick : true
				}
			},
			afterShow : function() {
				$('.cansel').click(function() {
					$.fancybox.close();
					return false;
				});
				
			},
			onUpdate : function() {
				$('.fancybox-inner').css({
						'-webkit-transition': 'all 4s ease-in-out',
						'-moz-transition': 'all 4s ease-in-out',
						'-ms-transition': 'all 4s ease-in-out',
						'-o-transition': 'all 4s ease-in-out',
						'transition': 'all 4s ease-in-out'
					});
			}

		});

		$('.page-form form').live('submit', function() {

			if (working) return false;
			working = true;

			form = $(this);
			var button_send = $(this).find('.button.send');

			var button_val = button_send.val();

			button_send.val('Подождите...');

			var form_action = $(this).attr('action');
			if (!form_action) {form_action = $(location).attr('href');}
			form_action = form_action + (form_action.indexOf('?') != -1 ? '&ajax=true' : '?ajax=true');

			$.myPOST(form_action, $(this).serialize(), function(r) {

				button_send.val(button_val);

				if (r.error) {
					CMS.displayError(r.error);
				}
				else if (r.success) {
					CMS.displaySuccess(r.success, form);
				}
				else if (r.redirect) {
					$(location).attr('href', r.redirect);
				}
				else if (r.refresh) {
					location.reload();
				}
			});

			working = false;
			return false;

		});

	},

	displaySuccess : function(msg, frm) {
		var elem = $('<div>', {
			'class'	: "successmessage",
			'html'	: msg,
		});
		frm.slideUp(500);
		var frm_par = frm.parent('.page-form');
		elem.appendTo(frm_par).hide().slideDown(500);
	},

	displayError : function(msg) {
		var elem = $('<div>', {
			'class'	: 'errormessage',
			'html'	: msg
		});

		elem.click(function() {
			$(this).fadeOut(function() {
				$(this).remove();
			});
		});

		setTimeout(function() {
			elem.click();
		},5000);

		elem.hide().appendTo('body').slideDown();
	}

};

$.myPOST = function(action, data, callback) {
	$.post(action, data, callback, 'json');
}

$.myGET = function(action, data, callback) {
	$.get(action, data, callback, 'json');
}

$(document).ready(function(){
  $('.left-menu ul > li ul')
    .click(function(event){
      event.stopPropagation();
    })
    .filter(':not(.active)')
    .hide();
    
  $('.left-menu ul > li').click(function(){
    var selfClick = $(this).find('ul:first').is(':visible');
    if(!selfClick) {
      $(this)
        .parent()
        .find('> li ul:visible')
        .slideToggle();
    }
    
    $(this)
      .find('ul:first')
      .stop(true, true)
      .slideToggle();
  });



    $("#single_1").fancybox({
        helpers: {
            title : {
                type : 'float'
            }
        }
    });
    $("#single_2").fancybox({
        helpers: {
            title : {
                type : 'float'
            }
        }
    });
    $("#single_3").fancybox({
        helpers: {
            title : {
                type : 'float'
            }
        }
    });

    $(".fancybox").fancybox({
        openEffect	: 'none',
        closeEffect	: 'none'
    });
});




