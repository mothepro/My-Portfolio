// var $div = $('<div />').css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 }).prependTo('body').append('<div />').find('div').css({ width: '100%', height: 200 });
// var scrollbarWidth = 100 - $div.width();
// $div.parent().remove();

function scrollbarWidth() {
	var parent, child, width;

	if(width === undefined) {
		parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
		child=parent.children();
		width=child.innerWidth()-child.height(99).innerWidth();
		parent.remove();
	}

	return width;
};