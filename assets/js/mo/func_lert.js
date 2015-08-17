function lert(data) {
	if(!data) {
		closelert();
		return false;
	}

	var ml = $('.modal .lert');

	// stop
	$('.fixed,html').css('margin-right', scrollbarWidth());
	$('html').addClass('stop');

	//there can be only one
	if( !ml.length )
		$('.modal').html( $('<div>').addClass('lert') );

	ml = $('.modal .lert');

	//hide, but size is good
	ml.css({
		'opacity': 0,
		'position': 'absolute'
	}).html( data );

	//add box if not an article
	if(	!$('.modal .lert article').length
	&&	!$('.modal .lert img').length
	&&	!$('.modal .lert .only').length)
		ml.addClass('box');
	
	// show it now; IDK why i need to hide then show
	// ml.hide(0).show(0);

	var finish = function() {
		$('html')
			.addClass('mask')		// show modal overlay
			.removeClass('stop');	// remove loading

		var ml = $('.modal .lert'), tmp;

		// add close button
		ml.find('.only:not(.no-close), img:not(.no-close), article:not(.no-close)').prepend( '<div onclick class="close col-red">&times;</div>' );
			// $('<a>')
				// .addClass('close col-red')
				// .html('&times;')

		// center if can fit fully
		if( ml.height() < $('.modal').height() ) {
			/*if(!showscroll) {
				$('.modal').css('overflow', 'hidden');
				$('html, #head').css('margin-right', 0);
			}*/
			ml.center('.modal');
			
			// slide from top
			tmp = ml.position().top;
			
			// move to top and make visible
			ml.css({
				'top':		-ml.height() - 10,

				'opacity':	1,
				'display':	'inline-block',
				'overflow':	'visible'
			});
			
			//slide to original pos
			ml.animate({
				'top': tmp
			}, 'fast');

		} else {
			ml.css('position', 'relative');
		
			// fade in
			ml.hide(0).fadeIn(250, function() {
					$(this).css({
						'opacity': 1,
						'display': 	'inline-block',
						'overflow': 'visible'
					});
				});
		
		}
	}

	//image? center when loaded
	if(ml.find('img').length)
		ml.find('img').load(finish); //function(){finish(showscroll);});
	else
		finish(); //showscroll
}