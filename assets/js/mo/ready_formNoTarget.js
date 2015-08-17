// show loading bar if taking too long
$('form.no-alert').submit(function(){
	setTimeout(function(){
		$('html').addClass('stop');
		$('.fixed,html').css('margin-right', scrollbarWidth());
	}, 100);
});