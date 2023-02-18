/*
| ==========================================================
| Preloader
| ========================================================== */
jQuery(window).load(function() {
    $('#preloader').fadeOut('100');
});





/*
| ==========================================================
| Scroll To Top
| ========================================================== */

$(document).ready(function() {
    'use strict';
    // Scroll To Top
   // $('body').prepend('<div class="go-top"><span id="top"><img src="assets/img/scroll-to-top.svg" alt="top" /></span></div>');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 500) {
            $('.go-top').fadeIn(600);
        } else {
            $('.go-top').fadeOut(600);
        }
    });
    $('#top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInQuad');
        return false;
    });


});


/*
| ==========================================================
| Fixed Menu
| ========================================================== */

$(document).ready(function() {

    'use strict';

    var c, currentScrollTop = 0,
        navbar = $('nav');

    $(window).scroll(function() {
        var a = $(window).scrollTop();
        var b = navbar.height();

        currentScrollTop = a;

        if (c < currentScrollTop && a > b + b) {
            navbar.addClass("scrollUp");
        } else if (c > currentScrollTop && !(a <= b)) {
            navbar.removeClass("scrollUp");
        }
        c = currentScrollTop;
    });

});



/*
| ==========================================================
| Mobile Menu
| ========================================================== */

$(document).ready(function() {
    $('.nex-menu').nexmenu({
        nexBarPosition: "right", // left right 
        nexMenuBg: "black",
        brandLogo: "Brand", 
        nexBarColor: "white",
        nexMenuPosition: "",
        brandPosition: "left",
        nexScreenWidth: "767",
        nexShowChildren: true,
        nexExpandableChildren: true,
        nexExpand: "+",
        nexContract: "-", 
        nexRemoveAttrs: true,
        // onePage:true,
        removeElements: ".desk-nav"
    });

});





/*
| ==========================================================
| Onepage Nav
| ========================================================== */
$(document).scroll(function() {
    // $('#nav').onePageNav({
    //     currentClass: 'active',
    //     changeHash: true,
    //     scrollSpeed: 900,
    //     scrollOffset: 0,
    //     scrollThreshold: 0.3,
    //     filter: ':not(.no-scroll)'
    // });

});


