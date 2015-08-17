/**
 * jQuery Firefly v2
 *
 * Makes some light divs and throws them around an element
 *
 * @BasedOff https://github.com/motyar/firefly
 * @improvment No images
 */
(function($) {

	/* Plugin defaults */
	var defaults = {
		total : 10,
		padding : 50,
	};
	
	/**
	 * Random
	 * @param  {int} max
	 * @param  {int} min
	 * @return {int}
	 */
	function random(max, min) {
		min = typeof min !== 'undefined' ? min : 0;

		return Math.ceil(Math.random() * max) - 1 + min;
	}

	/**
	 * Pushes spark to a new place
	 * @param  {DOM} sp      
	 * @param  {int} padding 
	 * @param  {DOM} obj     caller
	 * @return {DOM}         spark
	 */
	function fling(sp, padding, obj) {
		return sp
			.animate({
				top:  obj.offset().top +  random( obj.innerHeight() - (2 * padding), padding ),
				left: obj.offset().left + random( obj.innerWidth()  - (2 * padding), padding )
			},
			random(10, 5) * 1000, // 5 or 10 seconds
			// 'linear',
			function(){ fling(sp, padding, obj) } // do it again!
		);
	}

	/**
	 * Makes a spark
	 * @param  {int} padding Dont let div get to close to edges
	 * @param  {DOM} obj Caller
	 * @return {DOM} spark
	 */
	function create(padding, obj){
		var wh = random(25, 2),
			spark = $('<div>')
				.addClass('spark')
				.width(wh)
				.height(wh)
				.css({
					// opacity: 	(10/wh)/20, 
					'background-color': 	'rgba(255,255,255,'+ ((10/wh)/20) +')',
					top: 		obj.offset().top +  random( obj.innerHeight() - (2 * padding), padding ),
					left: 		obj.offset().left + random( obj.innerWidth()  - (2 * padding), padding )
				})
				.appendTo(document.body);

		return fling(spark, padding, obj);
	}

	$.fn.firefly = function(settings) {
		var opts = $.extend({}, defaults, settings);

		return this.each(function() {
			for (var i = 0; i < opts.total; i++)
				create(
					opts.padding,
					$(this)
				);
		});
	}

})(jQuery);