/**
 *
 * WP Top Navigation
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
**/

;(function(Module, $, window, undefined){
	'use strict';

	var hoverInterval,
		nav_appended = false,
		nav_left     = $('<div class="wptn-slide wptn-dir-left shadow"></div>'),
		nav_right    = $('<div class="wptn-slide wptn-dir-right shadow"></div>'),
		admin_menu   = $('#adminmenu');

	/**
	 * Module.init
	 * NULLED.
	**/
	Module.init = function(){
		// Do binds.
		Module.binds();
		// Set the current slider position
		Module.current_slide_position();
	}

	/**
	 * Module.binds
	 * NULLED.
	**/
	Module.binds = function(){
		$(window).on({
			load: function(){
				Module.check_slide();
			},
			resize: function(){
				Module.check_slide();
			}
		});

		// Right slide event
		nav_right.on({
			mouseover: function(){
				Module.slide_nav('right');
			},
			mouseleave: function(){
				Module.slide_nav('stop');
			}
		});
		// Left slide event
		nav_left.on({
			mouseover: function(){
				Module.slide_nav('left');
			},
			mouseleave: function(){
				Module.slide_nav('stop');
			}
		});

		// User profile color change
		$('#color-picker').on('click.colorpicker', '.color-option', function(){
			Module.css_change($(this));
		});
	}

	/**
	 * Module.calculate_nav_width
	 * Returns the total value of the width of all the top navigation items.
	**/
	Module.calculate_nav_width = function(){
		var nav_width = [], total = 0;

		$('li', admin_menu).each(function(){
			nav_width.push($(this).width());
		});

		for(var i in nav_width){
			total += nav_width[i]
		}

		return total + 50;
	}

	/**
	 * Module.get_offset
	 * NULLED.
	**/
	Module.get_offset = function(){
		return Module.calculate_nav_width() - $(window).outerWidth();
	}

	/**
	 * Module.check_slide
	 * Check if we need to slide the navigation.
	**/
	Module.check_slide = function(){
		if($(window).outerWidth() > 900){

			if(!nav_appended){
				Module.append_nav();
			}

			if(Module.calculate_nav_width() > $(window).outerWidth()){
				$('body').addClass('wp-top-navigation-slider');
				admin_menu.width(Module.calculate_nav_width());
			}
			else{
				Module.reset_screen();
			}

		}
		else{
			Module.reset_screen();
		}
	}

	/**
	 * Module.reset_screen
	 * Resets the admin area.
	**/
	Module.reset_screen = function(){
		$('body').removeClass('wp-top-navigation-slider');
		admin_menu.css({'width': 'auto'});
	}

	/**
	 * Module.append_nav
	 * Append slider navigation.
	**/
	Module.append_nav = function(){
		$('#admin_menuwrap').append(nav_left).prepend(nav_right);

		nav_appended = true;
	}

	/**
	 * Module.slide_nav
	 * Slide the navigation.
	**/
	Module.slide_nav = function(action){
		if(action === 'left' || action === 'right'){
			var distance = (action == 'left') ? 0 : - Module.get_offset();
			admin_menu.animate({'left': distance  + 'px'}, 500);
		}
		else{
			admin_menu.stop(true, false);
		}
	}

	/**
	 * Module.current_slide_position
	 * Positions the slider in the correct place for the navigation item.
	**/
	Module.current_slide_position = function(){
		var el       = ($('> .current', admin_menu).length) ? $('> .current', admin_menu) : $('> .wp-has-current-submenu', admin_menu),
			pos_left = el.position().left + 100,
			distance = (pos_left + el.width()) - $(window).outerWidth();

		if(pos_left > $(window).outerWidth()){
			admin_menu.animate({'left': - distance  + 'px'}, 500);
		}
	}

	/**
	 * Module.css_change
	 * Changes the CSS.
	**/
	Module.css_change = function(el){
		var colors,
			wp_n_stylesheet      = $('#colors-css'),
			wp_n_user_id         = $('input#user_id').val(),
			wp_n_current_user_id = $('input[name="checkuser_id"]').val();

		el.siblings('.selected').removeClass('selected');
		el.addClass('selected').find('input[type="radio"]').prop('checked', true);

		// Set color scheme
		if(wp_n_user_id === wp_n_current_user_id){
			$('#wp-top-navigation-colors-css-css').attr('href', wp_top_navigation_vars.Moduleurl + 'css/colors/admin-bar-' + el.children('.tog').val() + '.css');
		}
	}

	// Go
	Module.init();

}(window.wpTopNav = window.wpTopNav || {}, jQuery, window));