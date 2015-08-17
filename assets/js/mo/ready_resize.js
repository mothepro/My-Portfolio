if(!isMobile) {
$(window).resize(function(){
	if($('.modal .lert').length) {
		if( $('.modal .lert').height() < $('.modal').height() )
			$('.modal .lert').center('.modal');
		else
			$('.modal .lert').css({
				'position': 'relative',
				'left': 'auto',
				'top': 'auto' 
			});
	}
});
}