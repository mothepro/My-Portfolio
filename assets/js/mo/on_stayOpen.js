$('html').on('click', 'body', function(e){ //$('body').click(function(){
	var tar = $(e.target), tarl;
	tarl = tar.parents().length;

	$('.dropdown .menu.active').each(function(){
		if( $(this).parents().length > tarl )
			$(this).closest('.dropdown').add(this).removeClass('active');
	});
});

$('body').on('click', '.dropdown .menu, dropdown-hover .menu', function(){ //$('.dropdown .menu').click(function(){
	$(this).closest('.dropdown').add(this).addClass('active');
});