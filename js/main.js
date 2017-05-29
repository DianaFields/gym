/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: Barcelona*/
/* Version: 1.0 auto Release*/
/* Build Date: 29-06-2016*/
/* Author: Unbranded*/
/* Website: 
/* Copyright: (C) 2016 */
/*-------------------------------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: *//*

	01 - FUNCTION ON PAGE RESIZE
	02 - SWIPER SLIDERS
	03 - DROPDOWN
	04 - WINDOW SCROLL
	05 - BACKGROUND
	06 - MAGNIFIC POPUP
	07 - Ecommerce PAGE
	08 - CART
	09 - GOOGLE MAPS
	10 - ROUND TEXT
	11 - SKILLS
	12 - COUNTERS
	13 - COUNTDOWN
	14 - BLOCK SAME HEIGHT
	15 - ISOTOPE 
	16 - TABS
	17 - IS SAFARI
	18 - IS IE


 *//*--------------------------------------------------------*/
// @import 'init';

;(function($, window, document, undefined) {
    "use strict";

    /*============================*/
	/* 01 - VARIABLES */
	/*============================*/
	
	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);


	/*========================*/
	/* 02 - PAGE CALCULATIONS */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
	}
    

	/*=================================*/
	/* 03 - FUNCTION ON DOCUMENT READY */
	/*=================================*/
	pageCalculations();
	

	/*============================*/
	/* 04 - FUNCTION ON PAGE LOAD */
	/*============================*/
	
	$(window).on('load',function(){
		$(".wpc-preloader").fadeOut();		
	    initSwiper();
	    counters();
	    
	    
	    $(".wpc-cicrle").each(function(){
	   		if($(window).scrollTop() >= $(this).offset().top-$(window).height()*1 ){
   				$(this).addClass('animated').circleProgress({
			        startAngle: Math.PI / 4 * 2,
			        size: 140,
			        emptyFill: "rgba(0, 0, 0, 0)",
			        fill: {
			            gradient: ["#4b3045", "#f73365"]
			        }
			    });
	   		} 		
    	});


	    
	});


	/*==============================*/
	/* 01 - FUNCTION ON PAGE RESIZE */
	/*==============================*/	

	function resizeCall(){
		pageCalculations();

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
		if($('.custom_slider').length){
		 	reinitCustomSlider();
		}		
	}
		$(window).on("resize", function(){
			resizeCall();
			classesHeight();
			isotopeMasonry();
			mainMenu();
		});


	$(window).on("resize", function(){
		roundText();
	});

	/*=====================*/
	/* 02 - SWIPER SLIDERS */
	/*=====================*/
    
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);
            var mode = $t.attr('data-mode');
			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
            var centerVar = parseInt($t.attr('data-center'),10);
			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: true,
				roundLengths: true,
				centeredSlides: centerVar,
                mode: mode || 'horizontal',
				onInit: function(swiper){
				    $t.find('.swiper-slide').addClass('active');
				},
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
					var qVal = $t.find('.swiper-slide-active').attr('data-val');
					$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
				},
				onSlideChangeStart: function(swiper){
					$t.find('.swiper-slide.active').removeClass('active');
                    
				}
			});
			swipers['swiper-'+index].reInit();
				if($t.attr('data-slides-per-view')=='responsive'){
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
			initIterator++;
		});
		
	}

	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else if(winW<smPoint)return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}	


	//swiper arrows
	$('.swiper-arrow-left').on('click', function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').on('click', function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
	});
    
    $('.swiper-outer-left').on('click', function(){
		swipers['swiper-'+$(this).parent().find('.swiper-container').attr('id')].swipePrev();
	});

	$('.swiper-outer-right').on('click', function(){
		swipers['swiper-'+$(this).parent().find('.swiper-container').attr('id')].swipeNext();
	});

	$('.arrow-prev').on('click', function(){
		swipers['swiper-'+$(this).closest(".gym-round-slider, .gym-trainers-slider, .gym-trainers").find('.swiper-container').attr('id')].swipePrev();
	});

	$('.arrow-left').on('click', function(){
		swipers['swiper-'+$(this).closest(".gym-round-slider, .gym-trainers-slider, .gym-trainers").find('.swiper-container').attr('id')].swipeNext();
	});
	
    
	/*============================*/
	/* 03 - DROPDOWN */
	/*============================*/
	
	function mainMenu() {
		if($(window).width()<993) {
			$('.nav-menu-icon a').on('click', function() { 
			  if ($('.navigation nav').hasClass('slide-menu')){
				   $('.navigation nav').removeClass('slide-menu'); 
				   $('.wrap').removeClass('hold');
				   $('.center-menu').removeClass('act');
				   $('.left-slide').removeClass('slide-menu'); 
				   $(this).removeClass('active');
				   $('body').css({'overflow':'auto'});
			  }else {
				   $('.navigation nav').addClass('slide-menu');
				   $('.center-menu').addClass('act');
				   $('.left-slide').addClass('slide-menu');
				   $('.wrap').addClass('hold');
				   $(this).addClass('active');
				   $('body').css({'overflow':'hidden'});
			  }
				return false;
			 });
			
			
			$('nav > ul > li.menu-item-has-children > a').on('click', function(){
			  if ($(this).parent().find('.dropmenu').hasClass('act')){
			      $(this).parent().find('.dropmenu').removeClass('act');
			  }else{
				  $('.dropmenu').removeClass('act');
			      $(this).parent().find('> .dropmenu').addClass('act');
			  }
				return false;
			});
			
			$('.dropmenu > li.menu-item-has-children > a').on('click', function(){
			  if ($(this).parent().find('.dropmenu').hasClass('act')){
			      $(this).parent().find('.dropmenu').removeClass('act');
			  }else{
				  $('.dropmenu .dropmenu').removeClass('act');
			      $(this).parent().find('> .dropmenu').addClass('act');
			  }
				return false;
			});
			
			$('.close-menu').on('click', function(){
				$('.layer-black, .left-menu, .holder').removeClass('act');
				return false;
			});

		}
	}


	mainMenu();
	

	
	
	
	/***********************************/
	/* 04 - WINDOW SCROLL              */
	/**********************************/
	
    $(window).on('scroll',function() {
    	circleSkills();
    	counters();
	   if ($(this).scrollTop() >= 80) {
		   $('header').addClass('scrol');
		}else{
		   $('header').removeClass('scrol');
		}
	      
	});
	
    $('.up-button').on('click', function(){
		$('body, html').animate({'scrollTop':'0'});
		   return false;
	});	
	

	
    $('.serch-button').on('click', function(){
	   $('.search-popup').addClass('open');
		return false;
	});
	
	$('.search-form .close').on('click', function(){
	   $('.search-popup').removeClass('open');
		return false;
	});
	
	$('.input').on('focusin',function(){
	    $('.input-field').addClass('active');
	});
	$('.input').on('focusout',function(){
	    $('.input-field').removeClass('active');
	});

    $('.second-menu li').on('click', function(){
		$('.second-menu li').removeClass('act');
	    $(this).toggleClass('act');
		  return false;
	});
    

    
    
    /***********************************/
	/* 05 - BACKGROUND*/
	/**********************************/
    
    $('.s-back-switch').each(function(){
        var $imgSrc =  $(this).find('.s-img-switch').hide().attr('src');
        $(this).css('background-image' , 'url(' + $imgSrc + ')');
    });
    
     //setting background image
    $('.law-slider-one .swiper-slide, .law-benefits, .law-why, .law-customers-bg').each(function(){
        var $imgSrc =  $(this).find('.law-background-img').attr('src');
        $(this).css('background-image' , 'url(' + $imgSrc + ')');
    });
    
     $('.gym-slider-one .swiper-slide, .gym-for-him, .gym-for-her, .gym-back, .p-gym-classes').each(function(){
        var $imgSrc =  $(this).find('.gym-background-img').hide().attr('src');
        $(this).css('background-image' , 'url(' + $imgSrc + ')');
    });
    

    $('.swiper-outer-left').on('click',function(){
        $(this).parent().find('.swiper-arrow-left').trigger('click');
    });

    $('.swiper-outer-right').on('click',function(){
        $(this).parent().find('.swiper-arrow-right').trigger('click');
    });

    $('.swiper-container').on('click', '.phone-img-overlay', function(){
        $(this).parent().find('a').trigger('click');

    });

    
     lightbox.option({
      'showImageNumberLabel' : false,
        'disableScrolling' : true
    });
    
    
    /***********************************/
    /* 06 - MAGNIFIC POPUP */
    /**********************************/
    $('.p-resume-gal-wrap').magnificPopup({
        delegate: '.img-modal',
        type: 'image',
        gallery: {
          enabled:true
        },
        mainClass: 'mfp-fade'
    });
    

     
    
    
    /***********************************/
	/* 07 - Ecommerce PAGE */
	/**********************************/
   

    $('.mobile-menu').on('click',function(){
		$('body').toggleClass('open-menu');
	});

	$('.size li').on('click',function(){
		$('.size li').removeClass();
		$(this).addClass('active');
	});

	$('.color span').on('click',function(){
		$(this).siblings('.list').toggle();
		$(this).toggleClass('active');
	});

	$('.color .list li').on('click',function(){
		var tx = $(this).text();
		$(this).parents().siblings('span').text(tx);
		$(this).parents('.list').toggle();
		$(this).parents().siblings('span').toggleClass('active');
	});

	$('.quantity .up').on('click',function(){
		var i = $(this).siblings('.count').text();
		if (i >= 1) {
			i++;
			$(this).siblings('.count').text(i);
		} return false;
	});

	$('.quantity .down').on('click',function(){
		var i = $(this).siblings('.count').text();
		if (i > 1) {
			i--;
			$(this).siblings('.count').text(i);
		} return false;
	});

	$('.galery').owlCarousel({
		items:4,
		dots:false,
		loop:true
	});

	$(".p-commerce-more .main-visual figure").on("click", function() {
		$('.galery-info').each(function() {
			var $el = $('.galery figure').find('> img');
			if ($el.length > 0) {
				$(this).css('background', 'url(' + $el.attr('src') + ')');
			}
		});
	});

	$('.galery figure').on('click',function() {
		var $el = $(this).find('> img');
		if ($el.length > 0) {
			$('.galery-info').css('background', 'url(' + $el.attr('src') + ')');
		}
	});

	/***********************************/
	/*   08 - CART     */
	/**********************************/


	$(".close-row-table").on("click", function() {
		$(this).parent().parent().remove();
	});




	/***********************************/
	/*    09 - GOOGLE MAPS           */
	/**********************************/


	if( $('.wpc-map').length ) {
		$('.wpc-map').each(function() {
			initialize(this);
		});
	}

	function initialize(_this) {
		var stylesArray = {
			//style 1
			'style-1' : [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"},{"color":"#5b5b64"},{"invert_lightness":true},{"saturation":"3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
		};

		var styles ,map, marker, infowindow,
			lat = $(_this).attr("data-lat"),
	   		lng = $(_this).attr("data-lng"),
			contentString = $(_this).attr("data-string"),
			image = $(_this).attr("data-marker"),
			styles_attr = $(_this).attr("data-style"),
			zoomLevel = parseInt($(_this).attr("data-zoom"),10),
			myLatlng = new google.maps.LatLng(lat,lng);
			

		// style_1
		if (styles_attr == 'style-1') {
			styles = stylesArray[styles_attr];
		}
		// custom
		if (typeof hawa_style_map != 'undefined' && styles_attr == 'custom') {
			styles = hawa_style_map;
		}
		// or default style
		
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	    
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
	        scrollwheel: false,
			mapTypeControlOptions: {
	        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};
		
		map = new google.maps.Map(_this, mapOptions);

		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');

		infowindow = new google.maps.InfoWindow({
			content: contentString
		});
	  
	    
	    marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});

	}

	/***********************************/
	/*      10 - ROUND TEXT           */
	/**********************************/


	
	function roundText() {
		if($(".wpc-round-text").length) {
			var rText= $(".wpc-round-text");
			var rParent = rText.parent();
			rParent.attr('data-text', rText.text());
			rParent.attr('data-classes', rText.attr('class'));
			if($(window).width()<= 991) {
				var newElem = $('<div/>', {
				    class: rParent.attr('data-classes'),
				    text: rParent.attr('data-text')
				});
				rText.remove();	
				rParent.prepend(newElem); 

			}else if($(window).width()> 991) {
				
				rText.arctext({
					radius: 200
				});
			}		
		} 
	}
	roundText();



    /*-------------------------*/ 
    /*     11 - SKILLS         */ 
    /*-------------------------*/


    function circleSkills() {
    	if($(".wpc-cicrle").length) {
    		$('.wpc-cicrle').not('.animated').each(function(){
	            if($(window).scrollTop() >= $(this).offset().top-$(window).height()*0.7 )  {
	                $(this).addClass('animated').circleProgress({
				        startAngle: Math.PI / 4 * 2,
				        size: 140,
				        emptyFill: "rgba(0, 0, 0, 0)",
				        fill: {
				            gradient: ["#f73365", "#4b3045"]
				        }
				    });

	            }
	        });
    	}
    }

  
  	/*-------------------------*/ 
    /*     12 - COUNTERS       */ 
    /*-------------------------*/

    var counters = function() {
		$(".wpc-counter .counter").not('.animated').each(function(){
			if($(window).scrollTop() >= $(this).offset().top-$(window).height()*0.7 ) {
				$(this).addClass('animated').countTo();
			}
		});
	}


	/*-------------------------*/ 
    /*       13 - COUNTDOWN    */ 
    /*-------------------------*/

    if($('.wpc-clock').length) {
        $('.wpc-clock').countdown('2016/07/12', function(event) {
          $(this).html(event.strftime('<span class="time">%D <span class="text">Days</span></span> <span class="time">%H <span class="text">Hrs</span></span> <span class="time">%M <span class="text">Min</span></span> <span class="time">%S <span class="text">Sec</span></span>'));
         });
    }


    /*-------------------------*/ 
    /*  14 - BLOCK SAME HEIGHT */ 
    /*-------------------------*/

    function classesHeight() {
    	if($(window).width()>767) {
    		$(".gym-classes .bg-img").css("height", $(".gym-classes .gym-classes-info").outerHeight(true)+10);
			$(".gym-classes .bg-img.left").css("height", $(".gym-classes .gym-classes-info.right").outerHeight(true));
    	} else {
    		$(".gym-classes .bg-img").css("height", "auto");
			$(".gym-classes .bg-img.left").css("height", "auto");
    	}   	
    }

    classesHeight();

    /*-------------------------*/ 
    /*     15 - ISOTOPE        */ 
    /*-------------------------*/

	function isotopeMasonry() {
		if ($('.izotope-container').length) {

			var $container = $('.izotope-container');
		 	$container.isotope({
				itemSelector: '.item',
				masonry: {
			    // use outer width of grid-sizer for columnWidth
			    columnWidth: '.item'
			  }
		  	});
		}

		$('#filters').on('click', '.but', function() {
		  	$('.izotope-container').each(function(){
		     	$(this).find('.item').removeClass('animated');
			});
			
			$('#filters .but').removeClass('activbut');
		  	
		  	$(this).addClass('activbut');
			
			var filterValue = $(this).attr('data-filter');
			
			$container.isotope({filter: filterValue});
		});
	}

	$(".btn-gallery").on("click", function() {
		$(".gym-more-gallery").fadeIn(1000);
		$(this).fadeOut(1000);
		var $container = $('.izotope-container');
		 	$container.isotope({
				itemSelector: '.item',
				masonry: {
			    // use outer width of grid-sizer for columnWidth
			    columnWidth: '.item'
			  }
		  	});
	});

	isotopeMasonry();


	/*-------------------------*/ 
    /*       16 - TABS         */ 
    /*-------------------------*/



	$('.tabs-header').on('click', 'li:not(.active)', function() {

	    var index_el = $(this).index();

	    $(this).addClass('active').siblings().removeClass('active');
	    $(this).closest('.tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');

	});


	/*-------------------------*/ 
    /*     17 -  IS SAFARI     */ 
    /*-------------------------*/
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

	if (isSafari) {
		$("body").addClass("safari");
	}


	/*-------------------------*/ 
    /*      18 - IS IE         */ 
    /*-------------------------*/
	
	function getInternetExplorerVersion()
	{
	  var rv = -1;
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
	    var ua = navigator.userAgent;
	    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	    if (re.exec(ua) != null)
	      rv = parseFloat( RegExp.$1 );
	  }
	  else if (navigator.appName == 'Netscape')
	  {
	    var ua = navigator.userAgent;
	    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
	    if (re.exec(ua) != null)
	      rv = parseFloat( RegExp.$1 );
	  }
	  return rv;
	}

	if(getInternetExplorerVersion()>0) {
		$("body").addClass("explorer");
	}

    
    
    
})(jQuery, window, document);