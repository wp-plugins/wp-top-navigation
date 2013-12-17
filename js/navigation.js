/**
 * navigation.js
 * Controller JS file.
**/

'use strict';

;(function(global, $, undefined){

	var wp_nav,
		hoverInterval,
		navAppended = false,
		navLeft     = $('<div class="wptn-slide wptn-dir-left shadow"></div>'),
		navRight    = $('<div class="wptn-slide wptn-dir-right shadow"></div>'),
		adminmenu   = $('#adminmenu');

	wp_nav = global.wp_nav || {};

	/**
	 * getWidth
	 * Returns the width of the window.
	**/
	wp_nav.getWidth = function(){
		return $(window).outerWidth();
	}

	/**
	 * calculateNavWidth
	 * Returns the total value of the width of all the top navigation items.
	**/
	wp_nav.calculateNavWidth = function(){
		var nav_width = [], total = 0;

		$('li', adminmenu).each(function(){
			nav_width.push($(this).width());
		});

		for(var i in nav_width){total += nav_width[i]}

		return total + 50;
	}

	/**
	 * getOffset
	 * Nulled.
	**/
	wp_nav.getOffset = function(){
		return wp_nav.calculateNavWidth() - wp_nav.getWidth();
	}

	/**
	 * checkSlide
	 * Check if we need to slide the navigation.
	**/
	wp_nav.checkSlide = function(){
		if(wp_nav.getWidth() > 900){

			if(!navAppended){
				wp_nav.appendNav();
			}

			if(wp_nav.calculateNavWidth() > wp_nav.getWidth()){
				$('body').addClass('wp-top-navigation-slider');
				adminmenu.width(wp_nav.calculateNavWidth());
			}
			else{
				wp_nav.resetScreen();
			}

		}
		else{
			wp_nav.resetScreen();
		}
	}

	/**
	 * resetScreen
	 * Resets the admin area.
	**/
	wp_nav.resetScreen = function(){
		$('body').removeClass('wp-top-navigation-slider');
		adminmenu.css({'width': 'auto'});
	}

	/**
	 * appendNav
	 * Append slider navigation.
	**/
	wp_nav.appendNav = function(){
		$('#adminmenuwrap').append(navLeft).prepend(navRight);

		navAppended = true;
	}

	/**
	 * slideNav
	 * Slide the navigation.
	**/
	wp_nav.slideNav = function(action){
		if(action === 'left' || action === 'right'){
			var distance = (action == 'left') ? 0 : - wp_nav.getOffset();
			adminmenu.animate({'left': distance  + 'px'}, 500);
		}
		else{
			adminmenu.stop(true, false);
		}
	}

	/**
	 * currentSlidePosition
	 * Positions the slider in the correct place for the navigation item.
	**/
	wp_nav.currentSlidePosition = function(){
		var el       = ($('> .current', adminmenu).length) ? $('> .current', adminmenu) : $('> .wp-has-current-submenu', adminmenu),
			pos_left = el.position().left + 100,
			distance = (pos_left + el.width()) - wp_nav.getWidth();

		if(pos_left > wp_nav.getWidth()){
			adminmenu.animate({'left': - distance  + 'px'}, 500);
		}
	}

	/**
	 * CSSChange
	 * Changes the CSS.
	**/
	wp_nav.CSSChange = function(el){
		var colors,
			wp_n_stylesheet      = $('#colors-css'),
			wp_n_user_id         = $('input#user_id').val(),
			wp_n_current_user_id = $('input[name="checkuser_id"]').val();

		el.siblings('.selected').removeClass('selected');
		el.addClass('selected').find('input[type="radio"]').prop('checked', true);

		// Set color scheme
		if(wp_n_user_id === wp_n_current_user_id){
			$('#wp-top-navigation-colors-css-css').attr('href', wp_top_navigation_vars.pluginurl + 'css/colors/admin-bar-' + el.children('.tog').val() + '.css');
		}
	}

	$(window).on({
		load: function(){
			wp_nav.checkSlide();
		},
		resize: function(){
			wp_nav.checkSlide();
		}
	});

	$(function(){
		// Right slide event
		navRight.on({
			mouseover: function(){
				wp_nav.slideNav('right');
			},
			mouseleave: function(){
				wp_nav.slideNav('stop');
			}
		});
		// Left slide event
		navLeft.on({
			mouseover: function(){
				wp_nav.slideNav('left');
			},
			mouseleave: function(){
				wp_nav.slideNav('stop');
			}
		});

		// User profile color change
		$('#color-picker').on('click.colorpicker', '.color-option', function(){
			wp_nav.CSSChange($(this));
		});

		// Set the current slider position
		wp_nav.currentSlidePosition();
	});

	// Export object for use.
	window.wp_nav = wp_nav;

})(window, jQuery);