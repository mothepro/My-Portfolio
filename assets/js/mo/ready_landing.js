/* // Mac Slideshow
times = 0;
setInterval(function(){
	// restart to avoid overlapping
	if(times % 3 === 0)
		$('.landing .pics').css('background-position-y', 0);

	times++;

	$('.landing .pics').animate({
		// scroll to next bg
		'background-position-y': '-=240px'
	}, 1000, 'linear', function(){
		// move order instruction
		$('.landing .order li').first().appendTo('.landing .order');
	});
}, 5000);

*/

// Bouncing arrow
var arrow = $('.learn-more .arrow');
len = arrow.length;

(function moveArrow(){
	arrow.animate({
		'top': '-5px'
	}, {
		// duration: 1000,
		easing: 'linear',
		complete: function(){
			if(--len === 0)
				arrow.animate({
					'top': '5px'
				}, {
					duration: 1000,
					easing: 'linear',
					complete: function(){
						if(++len === arrow.length)
							moveArrow();
					}
				});
		}
	});
})();