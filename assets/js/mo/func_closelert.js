function closelert() {
	$('html,.fixed').css('margin-right', 0);
	$('html').removeClass('mask stop');
	$('.modal').html('').trigger('close');

	/*
	if(outClick && history && history.pushState) {
		history.pushState(null, outTitle, outClick);
		if(outTitle) {
			$('title').text( outTitle );
			outClick = false;
			outTitle = false;
		}
	}
	*/
}


$('body').on('click', '.modal, .modal .close', function(e){
	if(e.target === this) {
		closelert();
	}
});