(function( $ ) {
	/**
	 * Center's element to a div
	 * @param  {DOM} x element to center relative to, window by default
	 * @return {DOM}
	 */
	$.fn.center = function (x) {
		x = typeof x !== 'undefined' ? x : $(window);

		return this.css({
			position:	"absolute",
			top:		Math.max(0, ((x.height()	- this.outerHeight()) / 2)	+ x.scrollTop())	+ "px",
			left:		Math.max(0, ((x.width()		- this.outerWidth()) / 2)	+ x.scrollLeft())	+ "px"
		});
	};
}( jQuery ));