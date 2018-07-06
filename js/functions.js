/* Document Ready function
-------------------------------------------------------------------*/
jQuery(document).ready(function($) {
	"use strict";
    /* Window Height Resize
    -------------------------------------------------------------------*/
    var windowheight = jQuery(window).height();
    var sec = SecToCon();
    if(windowheight > 650)
    {
         $('.pattern').removeClass('height-resize');
    }
    /* Window Height Resize End
    -------------------------------------------------------------------*/

	/* Time Countdown 
	-------------------------------------------------------------------*/
	$('#time_countdown').countDown({
         targetOffset: {
            'day':      0,
            'month':    0,
            'year':     0,
            'hour':     0,
            'min':      0,
            'sec':      sec
		},
		omitWeeks: true

	    });


    /* Time Countdown End
	-------------------------------------------------------------------*/




	/* Next Section   
	-------------------------------------------------------------------*/
	$('.next-section .go-to-about').click(function() {
    	$('html,body').animate({scrollTop:$('#about').offset().top}, 1000);
  	});
  	$('.next-section .go-to-subscribe').click(function() {
    	$('html,body').animate({scrollTop:$('#subscribe').offset().top}, 1000);
  	});
  	$('.next-section .go-to-contact').click(function() {
    	$('html,body').animate({scrollTop:$('#contact').offset().top}, 1000);
  	});
  	$('.next-section .go-to-page-top').click(function() {
    	$('html,body').animate({scrollTop:$('#page-top').offset().top}, 1000);
  	});

  	/* Next Section End
	-------------------------------------------------------------------*/


});

/* Document Ready function End
-------------------------------------------------------------------*/