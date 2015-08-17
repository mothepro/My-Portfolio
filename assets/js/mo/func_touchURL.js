// Goes to URL descetley
function touchURL(location, para, complete) {
	par = [];
	for (var k in para)
		par.push(k + '=' + encodeURIComponent(para[k]));

	//push to url
	return $('<img>').load(
		'/' + location + '?' + par.join('&'),
		complete
	);
}