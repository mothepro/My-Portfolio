(function( $ ) {
	var viewport = {},
		bounds = {};

	function getBounds(obj) {
		viewport.top = $(window).scrollTop();
		viewport.bottom = viewport.top + $(window).height();

		bounds.top = obj.offset().top;
		bounds.bottom = bounds.top + obj.outerHeight();
	};

	/**
	 * Tests if an element is completly on screen
	 * @return {boolean}
	 */
	$.fn.isVisibleOnScreen = function() {
		getBounds(this);
		return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top)); // visible
	};

	/**
	 * Tests if an element is completly on screen
	 * @return {boolean}
	 */
	$.fn.isFullyOnScreen = function(){
		getBounds(this);
		return ((bounds.bottom <= viewport.bottom) && (bounds.top >= viewport.top));	// Fully on screen
	};
}( jQuery ));