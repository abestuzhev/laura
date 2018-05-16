
$().ready(function() {
	CMS.init();
});

function open_cat(what){
	$(what).slideToggle(100)
}

$(document).ready(function(){
		
	$('.models_close').click(function(){
		$('.model_page').css({'display': 'none'});
	});
	
	$(document).on('click', '.ajax_href', function(e){
		var href = $(this).attr('href');
		var variable = $(this).attr('var');
		var val = $(this).attr('val');
		if (href != '#'){
			$('#ajax_load_content').slideUp();
			$('#ajax_load_loader').show();
			$('#ajax_load_page_content').slideDown();
			$('#ajax_load_content').load('' + href, {message : val}, function() {
				$('#ajax_load_loader').hide();
				$('#ajax_load_content').slideDown();
			});
		}
		e.preventDefault();
	});
	
	$('.panel').click(function(){
		var size = $(".panel").length;
		var this_elem = $(this).index() + 1;
		if ($(this).attr('class') == 'panel str panel_3'){
			this_elem = 3;
		}
	
		for (i = 1; i <= size; i++) {

			$('.panel').eq(i - 1).attr('class', $('.panel').eq(i - 1).attr('class').replace(/ active/g, ''));
		}
	
		$('.pole_1').attr('class', 'pole_1');
		$('.pole_2').attr('class', 'pole_2');
		$('.panel').eq(this_elem - 1).attr('class', $('.panel').eq(this_elem - 1).attr('class') + ' active');
		$('body,html').animate({scrollTop: 550}, 1);
	});
	
	$('.pole_1').click(function(){
		$('.panel').attr('class', 'panel');
		$('.pole_1').attr('class', 'pole_1');
		$('.pole_2').attr('class', 'pole_2');
		$(this).attr('class', 'pole_1 active');
		$('body,html').animate({scrollTop: 550}, 1);
	});
	
	$('.pole_2').click(function(){
		$('.panel').attr('class', 'panel');
		$('.pole_1').attr('class', 'pole_1');
		$('.pole_2').attr('class', 'pole_2');
		$(this).attr('class', 'pole_2 active');
		$('body,html').animate({scrollTop: 550}, 1);
	});
	
	$('.news_mini').hover(function(){
		$(this).find('.news-line').show();
	}, function(){
		$(this).find('.news-line').hide();
	});
	
	$('.pic_teaser').cycle({
		slides: '.item_teaser',
		fx: 'fade',
		speed: 1000,
		next: 	'> .right',
		prev: 	'> .left',
		manualTrump: false
	});
	
	$('.hc_special').fancybox({
		centerOnScroll: 'true',
		overlayColor:'#000',
		overlayOpacity:'0.8',
		type: 'ajax',
		afterShow : function() {
		$('.fancybox-close').css({
			background: 'url(../img/fancy-close.png)',
					top:'0px',
					right: '0px',
					width: '26px',
					height: '26px'
			})
		}
	});
});

function send_footer()
{
	$.get('<?=_SITEURL?>cms/forms-manage', {
		action: 'captcha'
	}, function(done) {
		
		error = false;
		var inp = $('#capt22');
		var inp_val = inp.val();
		$('.send_input').css('background', '#161616');
		$('.send_input').css('color', '#a6a6a6');
		if (done != inp_val){
			error=true;
			$("#capt22").css("background", "#f66");
			$("#capt22").css("color", "#333");
		};
		
		if ($('#name').val()=='' || $('#name').val()=='�.�.�.'){
			error=true;
			$('#name').css('background', '#f66');
			$('#name').css('color', '#333');
		}

		if ($('#mail').val()=='' || $('#mail').val()=='E-mail'){
			error=true;
			$('#mail').css('background', '#f66');
			$('#mail').css('color', '#333');
		}
		if (error==false){
			$('#form1').submit();
			//console.log("sucsess");
			$('#send .result').html('<span style="color:#fff; font-size: 12px;">� ��������� ����� � ���� �������� �������� ����� ��������.</span>');
			$("#send .captcha .im").click();
			document.getElementById('form1').reset();
		}
	});
}   