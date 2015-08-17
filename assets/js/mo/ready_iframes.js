setInterval(function(){
	$('iframe.fix').each(function() { // make sure no margin in html and body
		this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
	});
}, 1000);