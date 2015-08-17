// When you select files, auto upload

//$('body').on('change', 'form[method="post"] input[type="file"]', function(){ //
$('form[method="post"]:not(.no-auto) input[type="file"]').change(function(){
	form = $(this).closest('form').eq(0);

	//No inputs, excluding hiddens and self
	if( form.find('input:not([type="hidden"])').length === 1 )
		form.submit();
		//form.addClass('no-alert').submit();
});