(function( $ ) {
	/**
	 * Go to an element smoothly
	 * @param  {DOM}
	 * @return {DOM}
	 */
	$.fn.scrollTo = function() {
		if( this.length )
			$('html,body').animate({
					scrollTop: this.offset().top
				}, 1000
			);
		return this;
	};
}( jQuery ));

// scroll to target onload
$(document).ready(function(){
	$(':target').scrollTo();
});

// local links
$('a[href^="#"]').click(function(){
	var str		= $(this).attr('href'),
		elem	= str.substr( str.indexOf('#') );

	$( elem ).scrollTo();
	return false;
});