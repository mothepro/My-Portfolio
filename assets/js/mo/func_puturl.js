//opens an lert
function puturl(url, replace, append, html, run) {
	if(!url)
		return false;

	if(!isMobile && !(replace || append || html)) {
		$('.fixed,html').css('margin-right', scrollbarWidth());
		$('html').addClass('stop');
	}

	//get query string
	arg = url.indexOf('?');
	if(arg>0) { // remove it from url
		arg = url.substr(arg);
		url = url.replace(arg, '').replace(/\/$/, '');
	} else
		arg = '';

	fullurl = url + arg;

	//no mobile support, yet
	if(isMobile)
		self.location = fullurl;

	$.ajax({
		url: url + '/html' + arg,
		type: 'get',
		dataType: 'html',
		timeout: 15000,
		error: function(jqXHR, textStatus, errorThrown) {
			closelert();
			if(errorThrown == 'Not Found')
				self.location = fullurl;
		},
		success: function(data, textStatus, XMLHttpRequest) {
		//	var showscroll = ($('body').height() >= $(window).height());
			if( $(replace).length ) {
				$(replace).replaceWith(data);

				//run completion function
				if(run)
					window[ run ]();
			} else if( $(append).length ) {
				$(append).append(data);

				//run completion function
				if(run)
					window[ run ]();
			}  else if( $(html).length ) {
				$(html).html(data);

				//run completion function
				if(run)
					window[ run ]();
			} else {
				// if(!isMobile) {
					// tried to be fancy, but no element found
					if(replace || append || html)
						self.location = fullurl;
					else {
						lert( data );

						//run completion function
						if(run)
							window[ run ]();
					}
				// } else
					// self.location = fullurl; // $('#rest').prepend( data );
			}
		}
	});
}