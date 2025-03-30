(function($){
	"use strict";
    var Sarahlist = {
        init: function() {
            this.$this = this;
            this.nav_menu();
            this.search_form_popup();
            $('select').select2({
                theme: 'classic'
            });
        },

        // Nagivation Menu
        nav_menu: function() {
            $('.primary-menu li').each( function() {
                if ( $(this).find('ul').length ) {
                    $(this).find('>a').html( $(this).find('>a').html() + '<i class="toggle fa fa-angle-down"></i>' );
                }
            });

            $('body').on( 'click', '.primary-menu li .toggle', function(e) {
                e.preventDefault();
            });

            $('body').on( 'click', '.site-navigation .toggle-menu', function() {
                $(this).toggleClass('on');
                $('.site-navigation .primary-menu').toggleClass('on');
                $('.site-navigation .primary-menu ul').slideUp(360, function() {
                    $(this).removeAttr('style');
                });
                $('.site-navigation .primary-menu li .toggle').removeClass('on');
            });

            $('body').on('focusin', '.primary-menu li', function() {
                $(this).slideDown();
            });

            $(document).mouseup( function(e) {
                var $menu = $('.site-navigation .primary-menu');
                var $toggleMenu = $('.site-navigation .toggle-menu');
                if ( ( ! $menu.is( e.target ) && $menu.has( e.target ).length === 0 ) && ( ! $toggleMenu.is( e.target ) && $toggleMenu.has( e.target ).length === 0 ) ) {
                    Sarahlist.reset_menu();
                }
            });

            $('.primary-menu').children().last().focusout( function() {
                Sarahlist.reset_menu();
            } );
        },

        reset_menu: function() {
            $('.primary-menu').removeClass('on');
            $('.toggle-menu').removeClass('on');
            $('.primary-menu ul').slideUp(360, function() {
                $(this).removeAttr('style');
            });
        },

        // Search Form Popup
        search_form_popup: function() {
            $( '.search-popup' ).on( 'click', function() {
                if ( $( '.search-form-modal' ).length ) {
                    $( '.search-form-modal' ).addClass('on');
                    setTimeout( function() {
                        $( '.search-form-modal .searchform input' ).focus();
                        Sarahlist.disableScroll();
                    }, 500 );
                }
            } );

            $('.search-form-modal .close-form').on( 'click', function() {
                $( '.search-form-modal' ).removeClass('on');
                Sarahlist.enableScroll();
            } );

            $('.search-form-modal .close-form').focusout( function() {
                $( '.search-form-modal' ).removeClass('on');
            } );
        },

        // Disable Scroll
        disableScroll: function () {
            // Get the current page scroll position
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
                // if any scroll is attempted,
                // set this to the previous value
                window.onscroll = function() {
                    window.scrollTo(scrollLeft, scrollTop);
                };
        },

        // Enable Scroll
        enableScroll: function () {
            window.onscroll = function() {};
        }
    };
    
    Sarahlist.init();
})(jQuery);
