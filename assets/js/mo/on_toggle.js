//toggle stuff with full toggle attr
$('body').on('click', '[data-toggle]', function(e){
	$(this).siblings('[data-toggle]').removeClass('active');
	$(this).addClass('active');

	if( $(this).attr('data-toggle') )
		$( $(this).attr('data-toggle') ).toggleClass('hide');
	/*if( $( $(this).attr('data-toggle') ).length ) {
		$(this).parent().find('.toggle').addClass('hide');
		$(this).parent().find($(this).attr('data-toggle')).removeClass('hide');
	}*/

	if( $(this).attr('href') && !isMobile)
		return false;
});

// Toggle inputs changes state
$('body').on('change', 'label.but:not([data-toggle]) input:checkbox, label.but:not([data-toggle]) input:radio', function(){ // $('label.but input[type="checkbox"], label.but input[type="radio"]').change(function(){
	//turn off other radios
	if( $(this).attr('type') === 'radio' )
		$( 'input[name="' + $(this).attr('name') + '"]:radio' ).parent().removeClass('active');

	// toggle class if the checked doesnt equal class
	$(this).parent().toggleClass('active', $(this).is(':checked') !== $(this).parent().hasClass('active'));
});