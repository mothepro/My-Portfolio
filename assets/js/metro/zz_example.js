$(function(){
	$("#scrollbox1").scrollbar({
		height: 355,
		axis: 'y'
	});
	$("#scrollbox2").scrollbar({
		axis: 'x',
		height: 355
	});
	$("#scrollbox3").scrollbar({
		height: 355
	});
});


$(function(){
	$("#carousel1").carousel({
		height: 200
	});
})

$(function(){
	$("#carousel2").carousel({
		height: 200,
		effect: 'fade',
		markers: {
			show: true,
			type: 'square',
			position: 'bottom-right'
		}
	});
})