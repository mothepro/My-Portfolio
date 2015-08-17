function madeNewData() {
	// waypoints
	if(!isMobile) {
		$('.waypoint').slideDown(1000);

		setTimeout(function() {
			$('.waypoint').slideUp(1000, function(){
				$(this).remove();
			});
		}, 5000);
	}
}