$(window).scroll(function() {
	
	// has a load element
	if( $('#load').length ) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $('#load').offset().top;
		var elemBottom = elemTop + $('#load').height();

		// is the load in the view
		if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
			var url		= $('#load a').attr('href'),
				elem	= $('#load a').attr('data-replace');

			// change to laoding gif
			$('#load').html('<img src="<?php echo \URL\IMG; ?>sprite/ajax-loader.gif" class="load">');

			// move data in
			puturl(url, elem);

			closelert();
		}
	}
});