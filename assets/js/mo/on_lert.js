// add button info to form's data
$('body').on('click', '[type="submit"][name]', function(e){
	$('<input tmp/>')
		.attr('type', 'hidden')
		.attr('name', $(this).attr('name') )
		.attr('value', $(this).val() )
		.prependTo( $(this).closest('form') );
});

// Submit forms
$('body').on('submit', 'form:not(.no-alert)', function(e){

	var data, check,
		replace	= $(this).attr('data-replace'),
		prepend	= $(this).attr('data-prepend'),
		append	= $(this).attr('data-append'),
		html	= $(this).attr('data-html'),
		finish	= $(this).attr('data-finish'),
		
		nop		= $(this).is('[data-wait]'),

		url = $(this).attr('action');

	// add overlay
	$('.fixed,html').css('margin-right', scrollbarWidth());
	$('html').addClass('stop');
	
	// use current path as default	
	if(!url.length)
		url = window.location.pathname;

	// prepend root
	if(url.charAt(0) !== '/')
		url = '/' + url;

	// tell PHP made from JS
	$('<input tmp/>')
		.attr('type','hidden')
		.attr('name','__JavaScriptEnabled')
		.attr('value', 1)
		.appendTo(this);

	// send data
	$.post(
		url,
		$(this).serialize()
	).done(function(data, textStatus, jqXHR){
		var changeloc = jqXHR.getResponseHeader('js-goto'),
			noses = jqXHR.getResponseHeader('js-nosession'),
			willclose = (replace || append || html || isMobile);

		// do not let landing page show up in modal
		if(noses)
			self.location = noses;

		if(changeloc)
			self.location = changeloc;

		replace 	= jqXHR.getResponseHeader('js-replace') || replace;
		prepend 	= jqXHR.getResponseHeader('js-prepend') || prepend;
		append 		= jqXHR.getResponseHeader('js-append') || append;
		html 		= jqXHR.getResponseHeader('js-html') || html;


		// found some data images, load them
		// if( $(data).find('img').length )
			// $(data).find('img').load(function(){ img++; })
		
		// remove any button data
		$('[tmp]').remove();
		
		// what to do with form's data
		if(!nop) {
			if(replace)
				$(replace).replaceWith(data);
			else if(prepend)
				$(prepend).prepend(data);
			else if(append)
				$(append).append(data);
			else if(html)
				$(html).html(data);
			else {
				// show data as popup
				if(!isMobile)
					lert( data );

				// add data to mobile page
				else
					$('#rest').prepend( data );
			}
		}

		//run completion function
		if(finish)
			window[ finish ](); // (this, event);

		//remove loader if unused
		if(willclose)
			closelert();
	});

	return false;
});

// left click
$('body').on('click', '.alert', function(e){
	if( e.which == 1 ) {
		puturl(
			$(this).attr('href'),
			$(this).attr('data-replace'),
			$(this).attr('data-append'),
			$(this).attr('data-html'),
			$(this).attr('data-finish')
		);
		
		// $('.modal').css({ //fix rare glitch
		// 	'overflow-y': 'scroll',
		// 	'overflow-x': 'hidden'
		// });

		return false;
	}
});