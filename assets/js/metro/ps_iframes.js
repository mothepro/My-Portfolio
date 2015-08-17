setInterval(function(){
	$('.panel:not(.collapsed) iframe.fix').each(function() { // make sure no margin in html and body
		this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
	});
}, 100);