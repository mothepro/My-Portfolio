//var tabactive = true;
//
///**
// * Sets the tab state
// */
//window.onfocus = function () { tabactive = true; };
//window.onblur = function () { tabactive = false; };
//
///**
// * Position scrolled down on page
// */
//function scrolledY() {
//	if ('pageYOffset' in window) {
//		// all browsers, except IE before version 9
//		return window.pageYOffset;
//	} else {
//		// Internet Explorer before version 9
//		return Math.round (document.documentElement.scrollTop / GetZoomFactor());
//	}
//}
//
///**
// * Gets zoom factor for IE < 9
// */
//function GetZoomFactor() {
//	var factor = 1;
//	if (document.body.getBoundingClientRect) {
//			// rect is only in physical pixel size in IE before version 8
//		var rect = document.body.getBoundingClientRect ();
//		var physicalW = rect.right - rect.left;
//		var logicalW = document.body.offsetWidth;
//
//			// the zoom level is always an integer percent value
//		factor = Math.round ((physicalW / logicalW) * 100) / 100;
//	}
//	return factor;
//}
//
///**
// * Polls server with useful client info
// * Wait 5 seconds for nothing to come back...
// * do it again
// */
//(function poll(){
//	$.ajax({
//		url: '/poll',
//		type: 'POST',
//		complete: poll,
//		timeout: 30000,
//		data: {
//			time: 	new Date().getTime(),
//			active: tabactive,
//			scroll: scrolledY(),
//		}
//	});
//})();
//
///**
// * tells server about screen stats and other browser stuff
// */
//if($('html').hasClass('is-firstvisit')) {
//	$('html').removeClass('is-firstvisit');
//	$.ajax({
//		url: '/poll_browser',
//		type: 'POST',
//		data: {
//			screenW:	screen.width,
//			screenH:	screen.height,
//			windowW:	$(window).width(),
//			windowH:	$(window).height(),
//			timezone: 	(new Date().getTimezoneOffset()) * -60,
//			// language
//			// modernizr: 	Modernizr,
//		}
//	});
//}