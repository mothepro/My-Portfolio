// if(!isMobile && $('[data-view-in],[data-view-out],[data-view-in-once],[data-view-out-once]').length)

var __workers = 	$('[data-view-in],[data-view-out]'),
	__workers2 = 	$('[data-view-in-once],[data-view-out-once]');

$(window).scroll(function() {
	if(__workers.length)
		__workers.each(function(){
			var $this = $(this);

			if( $this.isFullyOnScreen() ) {
				// remove out classes
				if( $this.is('[data-view-out]') )
					$this.removeClass( $this.attr('data-view-out') );

				// add in classes
				if( $this.is('[data-view-in]') )
					$this.addClass( $this.attr('data-view-in') );
			} else {
				// remove in classes
				if( $this.is('[data-view-in]') )
					$this.removeClass( $this.attr('data-view-in') );

				// add out classes
				if( $this.is('[data-view-out]') )
					$this.addClass( $this.attr('data-view-out') );
			}
		});

	if(__workers2.length)
		__workers2.each(function(){
			var $this = $(this);

			if( $this.isVisibleOnScreen() ) {
				// add in classes one time
				if( $this.is('[data-view-in-once]') ) {
					$this.addClass( $this.attr('data-view-in-once') );
					$this.attr('data-view-in-once', null);
				}
			} else {
				// add out classes
				if( $this.is('[data-view-out-once]') ) {
					$this.addClass( $this.attr('data-view-out-once') );
					$this.attr('data-view-out-once', null);
				}
			}

			// update list
			__workers2 = $('[data-view-in-once],[data-view-out-once]');
		});
});