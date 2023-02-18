/*!
 * jQuery nexMenu v1.0
 * @Copyright (C) 2018-2019 Nazmul Hussain @ NexGenTeam (https://github.com/nazmulh/nexMenu)
 *
 */
(function($) {
    "use strict";
    $.fn.nexmenu = function(options) {
        var defaults = {
            nexMenuTarget: jQuery(this),
            nexMenuContainer: 'body', // Where nexmenu will be placed
            nexMenuPosition: "", // Fixed or static
            brandLogo: "Brand", // HTML or String
            nexBarPosition: "right", // Position of Menu bar | left right
            brandPosition: "left", // left right
            nexBarPositionX: "5px", // Disytance of the menu bar in X axis from left or from right
            nexMenuBg: "", // Menu background
            nexBarColor: "", // Bar color
            nexScreenWidth: "480", // Mobile Menu
            nexShowChildren: true, // true (show children in the menu) or false (to hide them)
            nexExpandableChildren: true, // true or false.  expand/collapse
            nexExpand: "+", // single character
            nexContract: "-", // single character
            nexRemoveAttrs: false, // true or false
            onePage: false, // set to true for one page sites
            nexDisplay: "block", // inline, block, table, table-cell etc
            removeElements: "" // set to hide page elements
        };
        options = $.extend(defaults, options);

        // get browser width
        var currentWidth = window.innerWidth || document.documentElement.clientWidth;

        return this.each(function() {
            var nexMenu = options.nexMenuTarget;
            var nexContainer = options.nexMenuContainer;
            var nexMenuPosition = options.nexMenuPosition;
            var nexBarPosition = options.nexBarPosition;
            var brandPosition = options.brandPosition;
            var brandLogo = options.brandLogo;
            var nexBarPositionX = options.nexBarPositionX;
            var nexMenuBg = options.nexMenuBg;
            var nexBarColor = options.nexBarColor;
            var nexScreenWidth = options.nexScreenWidth;
            var nexRevealClass = ".nexmenu-reveal";
            var nexShowChildren = options.nexShowChildren;
            var nexExpandableChildren = options.nexExpandableChildren;
            var nexExpand = options.nexExpand;
            var nexContract = options.nexContract;
            var nexRemoveAttrs = options.nexRemoveAttrs;
            var onePage = options.onePage;
            var nexDisplay = options.nexDisplay;
            var removeElements = options.removeElements;

            //detect known mobile/tablet usage
            var isMobile = false;
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i))) {
                isMobile = true;
            }

            if ((navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i))) {
                // add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
                jQuery('html').css("overflow-y", "scroll");
            }
            
            var nexRevealPos = "";
            var brandRevealPos = "";
            var menuOn = false;
            var nexMenuExist = false;

            if (nexBarPosition === "right") {
                nexRevealPos = "right:" + nexBarPositionX + ";left:auto;";
            }
            if (nexBarPosition === "left") {
                nexRevealPos = "left:" + nexBarPositionX + ";right:auto;";
            }
            if (brandPosition === "left") {
                brandRevealPos = "left:" + nexBarPositionX + ";right:auto;";
                // brandRevealPos = "text-align:left;";
            }
            if (brandPosition === "right") {
                brandRevealPos = "right:" + nexBarPositionX + ";left:auto;";
                // brandRevealPos = "text-align:right;";
            }



            // set all styles for nex-reveal
            var $navreveal = "";

            // re-instate original nav (and call this on window.width functions)
            var nexOriginal = function() {
                jQuery('.nex-bar,.nex-push').remove();
                jQuery(nexContainer).removeClass("nex-container");
                jQuery(nexMenu).css('display', nexDisplay);
                menuOn = false;
                nexMenuExist = false;
                jQuery(removeElements).removeClass('nex-remove');
            };

            // navigation reveal
            var shownexMenu = function() {
                
                var nexStyles = "background:" + nexMenuBg+";position:"+nexMenuPosition+";top:0;left:0";
                var nexBarStyles = "background:" + nexBarColor;
                var nexMenuOpen = '<span  style="'+nexBarStyles+'" ></span><span  style="'+nexBarStyles+'" ></span><span  style="'+nexBarStyles+'" ></span>';
                if (currentWidth <= nexScreenWidth) {
                    jQuery(removeElements).addClass('nex-remove');
                    nexMenuExist = true;
                    // add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.nex-container'
                    jQuery(nexContainer).addClass("nex-container");
                       jQuery('.nex-container').prepend('<div class="nex-bar"  style="'+nexStyles+'"><a href="#nav" class="nexmenu-reveal" style="'+nexRevealPos+'">Show Navigation</a><div class="brand-bar" style="display:block; position:absolute;'+brandRevealPos+'">'+brandLogo+'</div><nav class="nex-nav"></nav></div>');
                       // jQuery('#brand').replaceWith('<div class="brand-bar" style="display:block;'+brandRevealPos+'">'+brandLogo+'</div>');

                    //push nexMenu navigation into .nex-nav
                    var nexMenuContents = jQuery(nexMenu).html();
                    jQuery('.nex-nav').html(nexMenuContents);

                    // remove all classes from EVERYTHING inside nexmenu nav
                    if (nexRemoveAttrs) {
                        jQuery('nav.nex-nav ul, nav.nex-nav ul *').each(function() {
                            // First check if this has nex-remove class
                            if (jQuery(this).is('.nex-remove')) {
                                jQuery(this).attr('class', 'nex-remove');
                            } else {
                                jQuery(this).removeAttr("class");
                            }
                            jQuery(this).removeAttr("id");
                        });
                    }
                    // hide current navigation and reveal nex nav link
                    jQuery(nexMenu).hide();
                    jQuery(".nexmenu-reveal").show();

                     var nexInner = function() {
                                // get last class name
                                if (jQuery($navreveal).is(".nexmenu-reveal.nexclose")) {
                                        // $navreveal.html(nexMenuClose);
                                } else {
                                        $navreveal.html(nexMenuOpen);
                                }
                        };
                    // turn 'X' on or off
                    jQuery(nexRevealClass).html(nexMenuOpen);
                    $navreveal = jQuery(nexRevealClass);

                    //hide nex-nav ul
                    jQuery('.nex-nav ul').hide();

                    // hide sub nav
                    if (nexShowChildren) {
                        // allow expandable sub nav(s)
                        if (nexExpandableChildren) {
                            jQuery('.nex-nav ul ul').each(function() {
                                if (jQuery(this).children().length) {
                                    jQuery(this, 'li:first').parent().append('<a class="nex-expand" href="#">' + nexExpand + '</a>');
                                }
                            });
                            jQuery('.nex-expand').on("click", function(e) {
                                e.preventDefault();
                                if (jQuery(this).hasClass("nex-clicked")) {
                                    jQuery(this).text(nexExpand);
                                    jQuery(this).prev('ul').slideUp(300, function() {});
                                } else {
                                    jQuery(this).text(nexContract);
                                    jQuery(this).prev('ul').slideDown(300, function() {});
                                }
                                jQuery(this).toggleClass("nex-clicked");
                            });

                        } else {
                            jQuery('.nex-nav ul ul').show();
                        }
                    } else {
                        jQuery('.nex-nav ul ul').hide();
                    }

                    // add last class to tidy up borders
                    jQuery('.nex-nav ul li').last().addClass('nex-last');
                    $navreveal.removeClass("nexclose");
                    jQuery($navreveal).click(function(e) {
                        e.preventDefault();
                        if (menuOn === false) {
                            jQuery('.nex-nav ul:first').slideDown();
                            menuOn = true;
                        } else {
                            jQuery('.nex-nav ul:first').slideUp();
                            menuOn = false;
                        }
                        $navreveal.toggleClass("nexclose");
                        nexInner();
                        jQuery(removeElements).addClass('nex-remove');
                    });

                    // for one page websites, reset all variables...
                    if (onePage) {
                        jQuery('.nex-nav ul > li > a:first-child').on("click", function() {
                            jQuery('.nex-nav ul:first').slideUp();
                            menuOn = false;
                            jQuery($navreveal).toggleClass("nexclose").html(nexMenuOpen);
                        });
                    }
                } else {
                    nexOriginal();
                }
            };

            if (!isMobile) {
                // reset menu on resize above nexScreenWidth
                jQuery(window).resize(function() {
                    currentWidth = window.innerWidth || document.documentElement.clientWidth;
                    if (currentWidth > nexScreenWidth) {
                        nexOriginal();
                    } else {
                        nexOriginal();
                    }
                    if (currentWidth <= nexScreenWidth) {
                        shownexMenu();
                    } else {
                        nexOriginal();
                    }
                });
            }

            jQuery(window).resize(function() {
                // get browser width
                currentWidth = window.innerWidth || document.documentElement.clientWidth;

                if (!isMobile) {
                    nexOriginal();
                    if (currentWidth <= nexScreenWidth) {
                        shownexMenu();
                    }
                } else {
                    if (currentWidth <= nexScreenWidth) {
                        if (nexMenuExist === false) {
                            shownexMenu();
                        }
                    } else {
                        nexOriginal();
                    }
                }
            });

            // run main menuMenu function on load
            shownexMenu();
        });
    };
})(jQuery);