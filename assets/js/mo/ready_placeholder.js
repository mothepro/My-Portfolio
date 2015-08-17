var placeholder	= 'label > textarea, label > input:not([type]),label > input[type="color"],label > input[type="date"],label > input[type="datetime"],label > input[type="datetime-local"],label > input[type="email"],label > input[type="month"],label > input[type="number"],label > input[type="password"],label > input[type="search"],label > input[type="tel"],label > input[type="text"],label > input[type="time"],label > input[type="url"],label > input[type="week"]';

if(!isMobile) {
	$('body').on('focus load', placeholder, function() { //placeholder
		$(this).parents('label').addClass('on');
	}).on('blur', placeholder, function() {
		$(this).parents('label').removeClass('on');
	}).on('keypress keyup change', placeholder, function(e) {
		if( $(this).val().length )	$(this).parents('label').addClass('has');
		else						$(this).parents('label').removeClass('has');
	});
} else {
	$(placeholder).each(function(){ //$('body').on('ready', 'label > input, label > textarea', function() {
		$(this).attr('placeholder', $(this).parent().text().trim());
		$(this).parent().html( this );
	});
}