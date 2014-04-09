/* Oktell-panel.js 0.3.5 http://js.oktell.ru/webpanel */

/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.oktellPanelMousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
		oktellPanelMousewheel: function(fn) {
            return fn ? this.bind("oktellPanelMousewheel", fn) : this.trigger("oktellPanelMousewheel");
        },

		unOktellPanelMousewheel: function(fn) {
            return this.unbind("oktellPanelMousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = "oktellPanelMousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
        if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

        // New school wheel delta (wheel event)
        if ( orgEvent.deltaY ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( orgEvent.deltaX ) {
            deltaX = orgEvent.deltaX;
            delta  = deltaX * -1;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

        // Get a whole value for the deltas
        fn = delta > 0 ? 'floor' : 'ceil';
        delta  = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

}));

/**
 * @author trixta
 * @version 1.2
 */
(function($){

var mwheelI = {
			pos: [-260, -260]
		},
	minDif 	= 3,
	doc 	= document,
	root 	= doc.documentElement,
	body 	= doc.body,
	longDelay, shortDelay
;

function unsetPos(){
	if(this === mwheelI.elem){
		mwheelI.pos = [-260, -260];
		mwheelI.elem = false;
		minDif = 3;
	}
}

$.event.special.oktellPanelMwheelIntent = {
	setup: function(){
		var jElm = $(this).bind('oktellPanelMousewheel', $.event.special.oktellPanelMwheelIntent.handler);
		if( this !== doc && this !== root && this !== body ){
			jElm.bind('mouseleave', unsetPos);
		}
		jElm = null;
        return true;
    },
	teardown: function(){
        $(this)
			.unbind('oktellPanelMousewheel', $.event.special.oktellPanelMwheelIntent.handler)
			.unbind('mouseleave', unsetPos)
		;
        return true;
    },
    handler: function(e, d){
		var pos = [e.clientX, e.clientY];
		if( this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif ){
            mwheelI.elem = this;
			mwheelI.pos = pos;
			minDif = 250;
			
			clearTimeout(shortDelay);
			shortDelay = setTimeout(function(){
				minDif = 10;
			}, 200);
			clearTimeout(longDelay);
			longDelay = setTimeout(function(){
				minDif = 3;
			}, 1500);
			e = $.extend({}, e, {type: 'oktellPanelMwheelIntent'});
            return ($.event.dispatch || $.event.handle).apply(this, arguments);
		}
    }
};
$.fn.extend({
	oktellPanelMwheelIntent: function(fn) {
		return fn ? this.bind("oktellPanelMwheelIntent", fn) : this.trigger("oktellPanelMwheelIntent");
	},
	
	unOktellPanelMwheelIntent: function(fn) {
		return this.unbind("oktellPanelMwheelIntent", fn);
	}
});

$(function(){
	body = doc.body;
	//assume that document is always scrollable, doesn't hurt if not
	$(doc).bind('oktellPanelMwheelIntent.mwheelIntentDefault', $.noop);
});
})(jQuery);

/*!
 * jScrollPane - v2.0.14 - 2013-05-01
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */

// Script: jScrollPane - cross browser customisable scrollbars
//
// *Version: 2.0.14, Last updated: 2013-05-01*
//
// Project Home - http://jscrollpane.kelvinluck.com/
// GitHub       - http://github.com/vitch/jScrollPane
// Source       - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.js
// (Minified)   - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.min.js
//
// About: License
//
// Copyright (c) 2013 Kelvin Luck
// Dual licensed under the MIT or GPL Version 2 licenses.
// http://jscrollpane.kelvinluck.com/MIT-LICENSE.txt
// http://jscrollpane.kelvinluck.com/GPL-LICENSE.txt
//
// About: Examples
//
// All examples and demos are available through the jScrollPane example site at:
// http://jscrollpane.kelvinluck.com/
//
// About: Support and Testing
//
// This plugin is tested on the browsers below and has been found to work reliably on them. If you run
// into a problem on one of the supported browsers then please visit the support section on the jScrollPane
// website (http://jscrollpane.kelvinluck.com/) for more information on getting support. You are also
// welcome to fork the project on GitHub if you can contribute a fix for a given issue. 
//
// jQuery Versions - tested in 1.4.2+ - reported to work in 1.3.x
// Browsers Tested - Firefox 3.6.8, Safari 5, Opera 10.6, Chrome 5.0, IE 6, 7, 8
//
// About: Release History
//
// 2.0.14 - (2013-05-01) Updated to most recent mouse wheel plugin (see #106) and related changes for sensible scroll speed
// 2.0.13 - (2013-05-01) Switched to semver compatible version name
// 2.0.0beta12 - (2012-09-27) fix for jQuery 1.8+
// 2.0.0beta11 - (2012-05-14)
// 2.0.0beta10 - (2011-04-17) cleaner required size calculation, improved keyboard support, stickToBottom/Left, other small fixes
// 2.0.0beta9 - (2011-01-31) new API methods, bug fixes and correct keyboard support for FF/OSX
// 2.0.0beta8 - (2011-01-29) touchscreen support, improved keyboard support
// 2.0.0beta7 - (2011-01-23) scroll speed consistent (thanks Aivo Paas)
// 2.0.0beta6 - (2010-12-07) scrollToElement horizontal support
// 2.0.0beta5 - (2010-10-18) jQuery 1.4.3 support, various bug fixes
// 2.0.0beta4 - (2010-09-17) clickOnTrack support, bug fixes
// 2.0.0beta3 - (2010-08-27) Horizontal mousewheel, mwheelIntent, keyboard support, bug fixes
// 2.0.0beta2 - (2010-08-21) Bug fixes
// 2.0.0beta1 - (2010-08-17) Rewrite to follow modern best practices and enable horizontal scrolling, initially hidden
//							 elements and dynamically sized elements.
// 1.x - (2006-12-31 - 2010-07-31) Initial version, hosted at googlecode, deprecated

(function($,window,undefined){

	$.fn.oktellPanelJScrollPane = function(settings)
	{
		// JScrollPane "class" - public methods are available through $('selector').data('jsp')
		function JScrollPane(elem, s)
		{
			var settings, jsp = this, pane, paneWidth, paneHeight, container, contentWidth, contentHeight,
				percentInViewH, percentInViewV, isScrollableV, verticalDrag, verticalDragInner, dragMaxY,
				verticalDragPosition, dragMaxX,
				verticalBar, verticalTrack, scrollbarWidth, verticalTrackHeight, verticalDragHeight, arrowUp, arrowDown,
				arrowLeft, arrowRight,
				originalPadding, originalPaddingTotalWidth, previousContentWidth,
				wasAtTop = true, wasAtLeft = true, wasAtBottom = false, wasAtRight = false,
				originalElement = elem.clone(false, false).empty(),
				mwEvent = $.fn.oktellPanelMwheelIntent ? 'oktellPanelMwheelIntent.jsp' : 'oktellPanelMousewheel.jsp';

			originalPadding = elem.css('paddingTop') + ' ' +
								elem.css('paddingRight') + ' ' +
								elem.css('paddingBottom') + ' ' +
								elem.css('paddingLeft');
			originalPaddingTotalWidth = (parseInt(elem.css('paddingLeft'), 10) || 0) +
										(parseInt(elem.css('paddingRight'), 10) || 0);

			function initialise(s)
			{

				var /*firstChild, lastChild, */isMaintainingPositon, lastContentX, lastContentY,
						hasContainingSpaceChanged, originalScrollTop, originalScrollLeft,
						maintainAtBottom = false, maintainAtRight = false;

				settings = s;

				if (pane === undefined) {
					originalScrollTop = elem.scrollTop();
					originalScrollLeft = elem.scrollLeft();

					elem.css(
						{
							overflow: 'hidden',
							padding: 0
						}
					);
					// TODO: Deal with where width/ height is 0 as it probably means the element is hidden and we should
					// come back to it later and check once it is unhidden...
					paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
					paneHeight = elem.innerHeight();

					elem.width(paneWidth);
					
					pane = $('<div class="jspPane" />').css('padding', originalPadding).append(elem.children());
					container = $('<div class="jspContainer" />')
						.css({
							'width': paneWidth + 'px',
							'height': paneHeight + 'px'
						}
					).append(pane).appendTo(elem);

					/*
					// Move any margins from the first and last children up to the container so they can still
					// collapse with neighbouring elements as they would before jScrollPane 
					firstChild = pane.find(':first-child');
					lastChild = pane.find(':last-child');
					elem.css(
						{
							'margin-top': firstChild.css('margin-top'),
							'margin-bottom': lastChild.css('margin-bottom')
						}
					);
					firstChild.css('margin-top', 0);
					lastChild.css('margin-bottom', 0);
					*/
				} else {
					elem.css('width', '');

					maintainAtBottom = settings.stickToBottom && isCloseToBottom();
					maintainAtRight  = settings.stickToRight  && isCloseToRight();

					hasContainingSpaceChanged = elem.innerWidth() + originalPaddingTotalWidth != paneWidth || elem.outerHeight() != paneHeight;

					if (hasContainingSpaceChanged) {
						paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
						paneHeight = elem.innerHeight();
						container.css({
							width: paneWidth + 'px',
							height: paneHeight + 'px'
						});
					}

					// If nothing changed since last check...
					if (!hasContainingSpaceChanged && previousContentWidth == contentWidth && pane.outerHeight() == contentHeight) {
						elem.width(paneWidth);
						return;
					}
					previousContentWidth = contentWidth;
					
					pane.css('width', '');
					elem.width(paneWidth);

					container.find('>.jspVerticalBar').remove().end();
				}

				pane.css('overflow', 'auto');
				if (s.contentWidth) {
					contentWidth = s.contentWidth;
				} else {
					contentWidth = pane[0].scrollWidth;
				}
				contentHeight = pane[0].scrollHeight;
				pane.css('overflow', '');

				percentInViewH = contentWidth / paneWidth;
				percentInViewV = contentHeight / paneHeight;
				isScrollableV = percentInViewV > 1;

				//console.log(paneWidth, paneHeight, contentWidth, contentHeight, percentInViewH, percentInViewV, isScrollableH, isScrollableV);

				if (!isScrollableV) {
					elem.removeClass('jspScrollable');
					pane.css({
						top: 0,
						width: container.width() - originalPaddingTotalWidth
					});
					removeMousewheel();
					removeClickOnTrack();
				} else {
					elem.addClass('jspScrollable');

					isMaintainingPositon = settings.maintainPosition && verticalDragPosition;
					if (isMaintainingPositon) {
						lastContentY = contentPositionY();
					}

					initialiseVerticalScroll();
					resizeScrollbars();

					if (isMaintainingPositon) {
						scrollToY(maintainAtBottom ? (contentHeight - paneHeight) : lastContentY, false);
					}

					initMousewheel();
					initTouch();
					
					if (settings.clickOnTrack) {
						initClickOnTrack();
					}
				}

				originalScrollTop && elem.scrollTop(0) && scrollToY(originalScrollTop, false);

				elem.trigger('jsp-initialised', [isScrollableV]);
			}

			function initialiseVerticalScroll()
			{
				if (isScrollableV) {

					container.append(
						$('<div class="jspVerticalBar" />').append(
							$('<div class="jspCap jspCapTop" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragTop" />'),
									$('<div class="jspDragBottom" />'),
									$('<div class="jspDragInner" />')
								)
							),
							$('<div class="jspCap jspCapBottom" />')
						)
					);

					verticalBar = container.find('>.jspVerticalBar');
					verticalTrack = verticalBar.find('>.jspTrack');
					verticalDrag = verticalTrack.find('>.jspDrag');
					verticalDragInner = verticalDrag.find('>.jspDragInner');


					container.unbind('mouseenter.jspInner');
					container.unbind('mouseleave.jspInner');
					if ( settings.dragInnerAnimation ) {
						container.bind('mouseenter.jspInner', function(){
							verticalDragInner.stop(true,true);
							verticalDragInner.fadeIn(100);
							return true;
						});
						container.bind('mouseleave.jspInner', function(){
							verticalDragInner.stop(true,true);
							verticalDragInner.fadeOut(500);
						});
					}

					if (settings.showArrows) {
						arrowUp = $('<a class="jspArrow jspArrowUp" />').bind(
							'mousedown.jsp', getArrowScroll(0, -1)
						).bind('click.jsp', nil);
						arrowDown = $('<a class="jspArrow jspArrowDown" />').bind(
							'mousedown.jsp', getArrowScroll(0, 1)
						).bind('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowUp.bind('mouseover.jsp', getArrowScroll(0, -1, arrowUp));
							arrowDown.bind('mouseover.jsp', getArrowScroll(0, 1, arrowDown));
						}

						appendArrows(verticalTrack, settings.verticalArrowPositions, arrowUp, arrowDown);
					}



					verticalTrackHeight = paneHeight;
					container.find('>.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow').each(
						function()
						{
							verticalTrackHeight -= $(this).outerHeight();
						}
					);


					verticalDrag.hover(
						function()
						{
							verticalDrag.addClass('jspHover');
						},
						function()
						{
							verticalDrag.removeClass('jspHover');
						}
					).bind(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').bind('dragstart.jsp selectstart.jsp', nil);

							verticalDrag.addClass('jspActive');

							var startY = e.pageY - verticalDrag.position().top;

							$('html').bind(
								'mousemove.jsp',
								function(e)
								{
									positionDragY(e.pageY - startY, false);
								}
							).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						}
					);
					sizeVerticalScrollbar();
				}
			}

			function sizeVerticalScrollbar()
			{
				verticalTrack.height(verticalTrackHeight + 'px');
				verticalDragPosition = 0;
				scrollbarWidth = settings.verticalGutter + verticalTrack.outerWidth();

				// Make the pane thinner to allow for the vertical scrollbar
				pane.width(paneWidth - scrollbarWidth - originalPaddingTotalWidth);

				// Add margin to the left of the pane if scrollbars are on that side (to position
				// the scrollbar on the left or right set it's left or right property in CSS)
				try {
					if (verticalBar.position().left === 0) {
						pane.css('margin-left', scrollbarWidth + 'px');
					}
				} catch (err) {
				}
			}

			function resizeScrollbars()
			{
				// reflow content
				contentHeight = pane.outerHeight();
				percentInViewV = contentHeight / paneHeight;

				if (isScrollableV) {
					verticalDragHeight = Math.ceil(1 / percentInViewV * verticalTrackHeight);
					if (verticalDragHeight > settings.verticalDragMaxHeight) {
						verticalDragHeight = settings.verticalDragMaxHeight;
					} else if (verticalDragHeight < settings.verticalDragMinHeight) {
						verticalDragHeight = settings.verticalDragMinHeight;
					}
					verticalDrag.height(verticalDragHeight + 'px');
					dragMaxY = verticalTrackHeight - verticalDragHeight;
					_positionDragY(verticalDragPosition); // To update the state for the arrow buttons
				}
			}

			function initClickOnTrack()
			{
				removeClickOnTrack();
				if (isScrollableV) {
					verticalTrack.bind(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageY - offset.top - verticalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageY - offset.top - verticalDragHeight / 2,
											contentDragY = paneHeight * settings.scrollPagePercent,
											dragY = dragMaxY * contentDragY / (contentHeight - paneHeight);
										if (direction < 0) {
											if (verticalDragPosition - dragY > pos) {
												jsp.scrollByY(-contentDragY);
											} else {
												positionDragY(pos);
											}
										} else if (direction > 0) {
											if (verticalDragPosition + dragY < pos) {
												jsp.scrollByY(contentDragY);
											} else {
												positionDragY(pos);
											}
										} else {
											cancelClick();
											return;
										}
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									},
									cancelClick = function()
									{
										scrollTimeout && clearTimeout(scrollTimeout);
										scrollTimeout = null;
										$(document).unbind('mouseup.jsp', cancelClick);
									};
								doScroll();
								$(document).bind('mouseup.jsp', cancelClick);
								return false;
							}
						}
					);
				}
			}

			function removeClickOnTrack()
			{
				if (verticalTrack) {
					verticalTrack.unbind('mousedown.jsp');
				}
			}

			function cancelDrag()
			{
				$('html').unbind('dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp');

				if (verticalDrag) {
					verticalDrag.removeClass('jspActive');
				}
			}

			function positionDragY(destY, animate)
			{
				if (!isScrollableV) {
					return;
				}
				if (destY < 0) {
					destY = 0;
				} else if (destY > dragMaxY) {
					destY = dragMaxY;
				}

				// can't just check if(animate) because false is a valid value that could be passed in...
				if (animate === undefined) {
					animate = settings.animateScroll;
				}
				if (animate) {
					jsp.animate(verticalDrag, 'top', destY,	_positionDragY);
				} else {
					verticalDrag.css('top', destY);
					_positionDragY(destY);
				}

			}

			function _positionDragY(destY)
			{
				if (destY === undefined) {
					destY = verticalDrag.position().top;
				}

				container.scrollTop(0);
				verticalDragPosition = destY;

				var isAtTop = verticalDragPosition === 0,
					isAtBottom = verticalDragPosition == dragMaxY,
					percentScrolled = destY/ dragMaxY,
					destTop = -percentScrolled * (contentHeight - paneHeight);

				if (wasAtTop != isAtTop || wasAtBottom != isAtBottom) {
					wasAtTop = isAtTop;
					wasAtBottom = isAtBottom;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				}
				
				updateVerticalArrows(isAtTop, isAtBottom);
				pane.css('top', destTop);
				elem.trigger('jsp-scroll-y', [-destTop, isAtTop, isAtBottom]).trigger('scroll');
			}

			function updateVerticalArrows(isAtTop, isAtBottom)
			{
				if (settings.showArrows) {
					arrowUp[isAtTop ? 'addClass' : 'removeClass']('jspDisabled');
					arrowDown[isAtBottom ? 'addClass' : 'removeClass']('jspDisabled');
				}
			}

			function scrollToY(destY, animate)
			{
				var percentScrolled = destY / (contentHeight - paneHeight);
				positionDragY(percentScrolled * dragMaxY, animate);
			}

			function contentPositionY()
			{
				return -pane.position().top;
			}

			function isCloseToBottom()
			{
				var scrollableHeight = contentHeight - paneHeight;
				return (scrollableHeight > 20) && (scrollableHeight - contentPositionY() < 10);
			}

			function initMousewheel()
			{
				container.unbind(mwEvent).bind(
					mwEvent,
					function (event, delta, deltaX, deltaY) {
						var dY = verticalDragPosition;
						jsp.scrollByY(-deltaY * settings.mouseWheelSpeed, false);
						// return true if there was no movement so rest of screen can scroll
						if ( settings.onScroll ){
							settings.onScroll();
						}
						return false; //dY == verticalDragPosition;
					}
				);
			}

			function removeMousewheel()
			{
				container.unbind(mwEvent);
			}

			function nil()
			{
				return false;
			}

			// Init touch on iPad, iPhone, iPod, Android
			function initTouch()
			{
				var startY,
					touchStartY,
					moved,
					moving = false;
  
				container.unbind('touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick').bind(
					'touchstart.jsp',
					function(e)
					{
						var touch = e.originalEvent.touches[0];
						startY = contentPositionY();
						touchStartY = touch.pageY;
						moved = false;
						moving = true;
					}
				).bind(
					'touchmove.jsp',
					function(ev)
					{
						if(!moving) {
							return;
						}
						
						var touchPos = ev.originalEvent.touches[0],
							dY = verticalDragPosition;
						
						jsp.scrollToY(startY + touchStartY - touchPos.pageY);
						
						moved = moved || Math.abs(touchStartY - touchPos.pageY) > 5;

						if ( settings.onScroll ){
							settings.onScroll();
						}

						// return true if there was no movement so rest of screen can scroll
						return false; //dY == verticalDragPosition;
					}
				).bind(
					'touchend.jsp',
					function(e)
					{
						moving = false;
						/*if(moved) {
							return false;
						}*/
					}
				).bind(
					'click.jsp-touchclick',
					function(e)
					{
						if(moved) {
							moved = false;
							return false;
						}
					}
				);
			}
			
			function destroy(){
				var currentY = contentPositionY();
				elem.removeClass('jspScrollable').unbind('.jsp');
				elem.replaceWith(originalElement.append(pane.children()));
				originalElement.scrollTop(currentY);
			}

			// Public API
			$.extend(
				jsp,
				{
					// Reinitialises the scroll pane (if it's internal dimensions have changed since the last time it
					// was initialised). The settings object which is passed in will override any settings from the
					// previous time it was initialised - if you don't pass any settings then the ones from the previous
					// initialisation will be used.
					reinitialise: function(s)
					{
						s = $.extend({}, settings, s);
						initialise(s);
					},
					// Scrolls the pane so that the specified co-ordinate within the content is at the top of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToY: function(destY, animate)
					{
						scrollToY(destY, animate);
					},
					// Scrolls the pane to the specified percentage of its maximum vertical scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentY: function(destPercentY, animate)
					{
						scrollToY(destPercentY * (contentHeight - paneHeight), animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByY: function(deltaY, animate)
					{
						var destY = contentPositionY() + Math[deltaY<0 ? 'floor' : 'ceil'](deltaY),
							percentScrolled = destY / (contentHeight - paneHeight);
						positionDragY(percentScrolled * dragMaxY, animate);
					},
					// Positions the vertical drag at the specified y position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragY: function(y, animate)
					{
						positionDragY(y, animate);
					},
					// This method is called when jScrollPane is trying to animate to a new position. You can override
					// it if you want to provide advanced animation functionality. It is passed the following arguments:
					//  * ele          - the element whose position is being animated
					//  * prop         - the property that is being animated
					//  * value        - the value it's being animated to
					//  * stepCallback - a function that you must execute each time you update the value of the property
					// You can use the default implementation (below) as a starting point for your own implementation.
					animate: function(ele, prop, value, stepCallback)
					{
						var params = {};
						params[prop] = value;
						ele.animate(
							params,
							{
								'duration'	: settings.animateDuration,
								'easing'	: settings.animateEase,
								'queue'		: false,
								'step'		: stepCallback
							}
						);
					},
					// Returns the current y position of the viewport with regards to the content pane.
					getContentPositionY: function()
					{
						return contentPositionY();
					},
					// Returns the width of the content within the scroll pane.
					getContentWidth: function()
					{
						return contentWidth;
					},
					// Returns the height of the content within the scroll pane.
					getContentHeight: function()
					{
						return contentHeight;
					},
					// Returns the vertical position of the viewport within the pane content.
					getPercentScrolledY: function()
					{
						return contentPositionY() / (contentHeight - paneHeight);
					},
					// Returns whether or not this scrollpane has a vertical scrollbar.
					getIsScrollableV: function()
					{
						return isScrollableV;
					},
					// Gets a reference to the content pane. It is important that you use this method if you want to
					// edit the content of your jScrollPane as if you access the element directly then you may have some
					// problems (as your original element has had additional elements for the scrollbars etc added into
					// it).
					getContentPane: function()
					{
						return pane;
					},
					// Scrolls this jScrollPane down as far as it can currently scroll. If animate isn't passed then the
					// animateScroll value from settings is used instead.
					scrollToBottom: function(animate)
					{
						positionDragY(dragMaxY, animate);
					},
					// Removes the jScrollPane and returns the page to the state it was in before jScrollPane was
					// initialised.
					destroy: function()
					{
							destroy();
					}
				}
			);
			
			initialise(s);
		}

		// Pluginifying code...
		settings = $.extend({}, $.fn.oktellPanelJScrollPane.defaults, settings);
		
		// Apply default speed
		$.each(['arrowButtonSpeed', 'trackClickSpeed', 'keyboardSpeed'], function() {
			settings[this] = settings[this] || settings.speed;
		});

		return this.each(
			function()
			{
				var elem = $(this), jspApi = elem.data('jsp');
				if (jspApi) {
					jspApi.reinitialise(settings);
				} else {
					$("script",elem).filter('[type="text/javascript"],:not([type])').remove();
					jspApi = new JScrollPane(elem, settings);
					elem.data('jsp', jspApi);
				}
			}
		);
	};

	$.fn.oktellPanelJScrollPane.defaults = {
		showArrows					: false,
		maintainPosition			: true,
		stickToBottom				: false,
		stickToRight				: false,
		clickOnTrack				: true,
		autoReinitialise			: false,
		autoReinitialiseDelay		: 500,
		verticalDragMinHeight		: 0,
		verticalDragMaxHeight		: 99999,
		contentWidth				: undefined,
		animateScroll				: false,
		animateDuration				: 300,
		animateEase					: 'linear',
		hijackInternalLinks			: false,
		verticalGutter				: 4,
		mouseWheelSpeed				: 3,
		arrowButtonSpeed			: 0,
		arrowRepeatFreq				: 50,
		arrowScrollOnHover			: false,
		trackClickSpeed				: 0,
		trackClickRepeatFreq		: 70,
		verticalArrowPositions		: 'split',
		enableKeyboardNavigation	: true,
		hideFocus					: false,
		keyboardSpeed				: 0,
		initialDelay                : 300,        // Delay before starting repeating
		speed						: 30,		// Default speed when others falsey
		scrollPagePercent			: .8,		// Percent of visible area scrolled when pageUp/Down or track area pressed
		dragInnerAnimation			: true,		//
		onScroll					: null
	};

})(jQuery,this);


var __slice = [].slice,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty;

(function($) {
  var CUser, Department, Error, List, Notify, PermissionsPopup, Popup, actionButtonContainerClass, actionButtonHtml, actionListEl, actionListHtml, addActionButtonToEl, afterOktellConnect, checkCssAnimationSupport, contEl, cookie, debounce, defaultOptions, departmentTemplateHtml, error, errorHtml, escapeHtml, getOptions, initActionButtons, initButtonOnElement, initPanel, isMobileDevice, langs, list, loadTemplate, log, logStr, newGuid, oktell, oktellConnected, options, panelEl, panelHtml, panelWasInitialized, permissionsPopup, permissionsPopupHtml, popup, popupHtml, templates, useNativeScroll, useSticky, userTemplateHtml, usersTableHtml,
    _this = this;

  if (!$) {
    throw new Error('Error init oktell panel, jQuery ( $ ) is not defined');
  }
  debounce = function(func, wait, immediate) {
    var timeout;

    timeout = '';
    return function() {
      var args, callNow, context, later, result;

      context = this;
      args = arguments;
      later = function() {
        var result;

        timeout = null;
        if (!immediate) {
          return result = func.apply(context, args);
        }
      };
      callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
      }
      return result;
    };
  };
  escapeHtml = function(string) {
    return ('' + string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
  };
  log = function() {
    var e;

    try {
      return console.log.apply(console, arguments);
    } catch (_error) {
      e = _error;
    }
  };
  cookie = function(key, value, options) {
    var decode, result, seconds, t;

    if (arguments.length > 1 && String(value) !== "[object Object]") {
      options = $.extend({}, options);
      if (value == null) {
        options.expires = -1;
      }
      if (typeof options.expires === 'number') {
        seconds = options.expires;
        t = options.expires = new Date();
        t.setSeconds(t.getSeconds() + seconds);
      }
      value = String(value);
      return document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
    }
    options = value || {};
    result = '';
    if (options.raw) {
      decode = function(s) {
        return s;
      };
    } else {
      decode = decodeURIComponent;
    }
    if ((result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie))) {
      return decode(result[1]);
    } else {
      return null;
    }
  };
  newGuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r, v;

      r = Math.random() * 16 | 0;
      v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };
  Notify = (function() {
    function Notify(title, autoHide, message, group, onClick) {
      var notify,
        _this = this;

      if (autoHide == null) {
        autoHide = 0;
      }
      if (!(typeof title === 'string' && title) || window.webkitNotifications.checkPermission() !== 0) {
        return;
      }
      if (typeof message === 'function') {
        onClick = message;
        message = '';
        group = null;
      } else if (typeof group === 'function') {
        onClick = group;
        group = null;
      }
      notify = window.webkitNotifications.createNotification('favicon.ico', title, message || '');
      if (group) {
        notify.tag = group;
      }
      notify.show();
      autoHide = parseInt(autoHide);
      if (autoHide) {
        setTimeout(function() {
          return notify.close();
        }, autoHide * 1000);
      }
      notify.onclick = function() {
        var args, e;

        e = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (typeof window.focus === "function") {
          window.focus();
        }
        notify.close();
        if (typeof onClick === 'function') {
          return onClick.apply(window, []);
        }
      };
      this.close = function() {
        return notify != null ? typeof notify.close === "function" ? notify.close() : void 0 : void 0;
      };
    }

    return Notify;

  })();
  Department = (function() {
    Department.prototype.logGroup = 'Department';

    function Department(id, name) {
      this.usersVisibilityCss = 'invisibleDep';
      this.lastFilteredUsers = [];
      this.isSorted = false;
      this.visible = true;
      this.users = [];
      this.id = id && id !== '00000000-0000-0000-0000-000000000000' ? id : this.withoutDepName;
      this.name = this.id === this.withoutDepName || !name ? this.langs.panel.withoutDepartment : name;
      this.isOpen = this.config().departmentVisibility[this.id] != null ? this.config().departmentVisibility[this.id] : true;
    }

    Department.prototype.getEl = function(usersVisible) {
      if (!this.el) {
        this.el = $(this.template.replace(/\{\{department}\}/g, escapeHtml(this.name)));
      }
      if (usersVisible) {
        this._oldIsOpen = this.isOpen;
        this.showUsers(true, true);
      } else {
        this.showUsers(this._oldIsOpen != null ? this._oldIsOpen : this.isOpen);
      }
      this.el.data('department', this);
      return this.el;
    };

    Department.prototype.getContainer = function() {
      return this.el.find('tbody');
    };

    Department.prototype.showUsers = function(val, notSave) {
      var c;

      if (typeof val === 'undefined') {
        val = !this.isOpen;
      }
      if (!this.hideEl) {
        this.hideEl = this.el.find('table');
      }
      this.hideEl.stop(true, true);
      if (!notSave) {
        this.isOpen = val;
        c = this.config();
        c.departmentVisibility[this.id] = this.isOpen;
        this.config(c);
      }
      if (val) {
        this.el.toggleClass(this.usersVisibilityCss, false);
        return this.hideEl.show();
      } else {
        this.el.toggleClass(this.usersVisibilityCss, true);
        return this.hideEl.hide();
      }
    };

    Department.prototype.getInfo = function() {
      return this.name + ' ' + this.id;
    };

    Department.prototype.clearUsers = function() {
      return this.users = [];
    };

    Department.prototype.show = function(withAnimation) {
      if (!this.el || this.visible) {
        return;
      }
      if (withAnimation) {
        this.el.slideDown(200);
      } else {
        this.el.show();
      }
      return this.visible = true;
    };

    Department.prototype.hide = function(withAnimation) {
      if (!this.el || !this.visible) {
        return;
      }
      if (withAnimation) {
        this.el.slideUp(200);
      } else {
        this.el.hide();
      }
      return this.visible = false;
    };

    Department.prototype.getUsers = function(filter, showOffline, filterLang) {
      var exactMatch, u, users, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;

      if (!this.isSorted) {
        this.sortUsers();
      }
      users = [];
      exactMatch = false;
      if (filter === '') {
        if (showOffline) {
          _ref = this.users;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            u = _ref[_i];
            u.setSelection();
            users.push(u);
          }
        } else {
          _ref1 = this.users;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            u = _ref1[_j];
            if (u.state !== 0) {
              u.setSelection();
              users.push(u);
            }
          }
        }
      } else {
        _ref2 = this.users;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          u = _ref2[_k];
          if (u.isFiltered(filter, showOffline, filterLang)) {
            users.push(u);
            if (u.number === filter && !exactMatch) {
              exactMatch = u;
            }
          }
        }
      }
      this.lastFilteredUsers = users;
      return [users, exactMatch];
    };

    Department.prototype.sortUsers = function() {
      return this.users.sort(this.sortFn);
    };

    Department.prototype.sortFn = function(a, b) {
      if (a.nameLower > b.nameLower) {
        return 1;
      } else if (a.nameLower < b.nameLower) {
        return -1;
      } else {
        if (a.number > b.number) {
          return 1;
        } else if (a.number < b.number) {
          return -1;
        } else {
          return 0;
        }
      }
    };

    Department.prototype.addUser = function(user) {
      if (user.number) {
        return this.users.push(user);
      }
    };

    return Department;

  })();
  CUser = (function() {
    CUser.prototype.logGroup = 'User';

    function CUser(data) {
      this.doAction = __bind(this.doAction, this);      this.state = false;
      this.additionalActions = {};
      this.hasHover = false;
      this.buttonLastAction = '';
      this.firstLiCssPrefix = 'm_button_action_';
      this.noneActionCss = '';
      this.els = $();
      this.buttonEls = $();
      this.init(data);
    }

    CUser.prototype.init = function(data) {
      var lastHtml, ns, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

      this.id = (_ref = data.id) != null ? _ref.toString().toLowerCase() : void 0;
      this.isFantom = data.isFantom || false;
      this.number = ((_ref1 = data.number) != null ? _ref1.toString() : void 0) || '';
      if (!this.number) {
        this.invisible = true;
      }
      this.numberFormatted = ((_ref2 = data.numberFormatted) != null ? _ref2.toString() : void 0) || this.number;
      this.numberHtml = escapeHtml(this.numberFormatted);
      this.name = ((_ref3 = data.name) != null ? _ref3.toString() : void 0) || '';
      this.nameLower = this.name.toLowerCase();
      this.letter = ((_ref4 = this.name[0]) != null ? _ref4.toUpperCase() : void 0) || ((_ref5 = this.number) != null ? _ref5[0].toString().toLowerCase() : void 0);
      this.nameHtml = data.name && data.name.toString() !== this.number ? escapeHtml(data.name) : this.numberHtml;
      if (this.numberHtml === this.nameHtml) {
        this.numberHtml = '';
      }
      this.isIvr = data.isIvr;
      this.ivrName = data.ivrName;
      ns = this.nameHtml.split(/\s+/);
      if (ns.length > 1 && data.name.toString() !== this.number) {
        this.nameHtml1 = ns[0];
        this.nameHtml2 = ' ' + ns.splice(1).join(' ');
      } else {
        this.nameHtml1 = this.nameHtml;
        this.nameHtml2 = '';
      }
      lastHtml = this.elNumberHtml;
      this.elNumberHtml = this.numberHtml !== this.nameHtml ? this.numberHtml : '';
      if (this.elNumberHtml !== lastHtml && (this.el != null)) {
        this.el.find('.o_number').text(this.elNumberHtml);
      }
      if ((_ref6 = this.el) != null) {
        _ref6.find('.b_contact_title wrapword a').text(this.nameHtml);
      }
      this.avatarLink32x32 = data.avatarLink32x32 || this.defaultAvatar32 || '';
      this.defaultAvatarCss = this.avatarLink32x32 ? '' : 'm_default';
      this.departmentId = (data != null ? (_ref7 = data.numberObj) != null ? _ref7.departmentid : void 0 : void 0) && (data != null ? data.numberObj.departmentid : void 0) !== '00000000-0000-0000-0000-000000000000' ? data != null ? data.numberObj.departmentid : void 0 : this.withoutDepName;
      this.department = this.departmentId === 'www_without' ? this.langs.panel.withoutDepartment : data != null ? (_ref8 = data.numberObj) != null ? _ref8.department : void 0 : void 0;
      if (((_ref9 = data.numberObj) != null ? _ref9.state : void 0) != null) {
        this.setState(data.numberObj.state);
      } else if (data.state != null) {
        this.setState(data.state);
      } else {
        this.setState(1);
      }
      return this.loadActions();
    };

    CUser.prototype.regexps = {
      name: /\{\{name\}\}/,
      name1: /\{\{name1\}\}/,
      name2: /\{\{name2\}\}/,
      number: /\{\{number\}\}/,
      dtmf: /\{\{dtmf\}\}/,
      avatarLink32x32: /\{\{avatarLink32x32\}\}/,
      css: /\{\{css\}\}/,
      letter: /\{\{letter\}\}/
    };

    CUser.prototype.setState = function(state) {
      var _this = this;

      state = parseInt(state);
      if (state === this.state) {
        return;
      }
      this.state = state;
      this.setStateCss();
      if (this.buttonEls.length) {
        this.loadActions();
        return setTimeout(function() {
          return _this.loadActions();
        }, 100);
      }
    };

    CUser.prototype.setStateCss = function() {
      if (this.els.length) {
        this.els.toggleClass('m_busy', this.state === 5);
        this.els.toggleClass('m_offline', this.state === 0);
        this.els.toggleClass('m_break', this.state === 2);
        return this.els.toggleClass('m_dnd', this.state === 3);
      }
    };

    CUser.prototype.getInfo = function() {
      return '"' + this.number + '" ' + this.state + ' ' + this.name;
    };

    CUser.prototype.isFiltered = function(filter, showOffline, lang) {
      var fl;

      if ((!filter || typeof filter !== 'string') && (showOffline || (!showOffline && this.state !== 0))) {
        this.setSelection();
        return true;
      }
      if (showOffline || (!showOffline && this.state !== 0)) {
        if ((this.number && this.number.indexOf(filter) !== -1) || (' ' + this.name).toLowerCase().indexOf(filter) !== -1) {
          this.setSelection(filter);
          return true;
        }
        if (lang === 'en' && (fl = this.toRu(filter)) && (' ' + this.name).toLowerCase().indexOf(fl) !== -1) {
          this.setSelection(fl);
          return true;
        }
        if (lang === 'ru' && (fl = this.toEn(filter)) && (' ' + this.name).toLowerCase().indexOf(fl) !== -1) {
          this.setSelection(fl);
          return true;
        }
        return false;
      }
      return false;
    };

    CUser.prototype.showLetter = function(show) {
      var _ref;

      return (_ref = this.el) != null ? _ref.find('.b_capital_letter span').text(show ? this.letter : '') : void 0;
    };

    CUser.prototype.getEl = function(createIndependent) {
      var $el, str;

      if (!this.el || createIndependent) {
        str = this.template.replace(this.regexps.name1, this.nameHtml1).replace(this.regexps.name2, this.nameHtml2).replace(this.regexps.name, this.name + (this.numberHtml ? ' (' + this.numberHtml + ')' : '')).replace(this.regexps.number, this.numberHtml).replace(this.regexps.dtmf, this.langs.panel.dtmf).replace(this.regexps.avatarLink32x32, this.avatarLink32x32).replace(this.regexps.css, this.defaultAvatarCss);
        $el = $(str);
        $el.data('user', this);
        this.initButtonEl($el.find('.oktell_button_action'));
        this.els = this.els.add($el);
        this.setStateCss();
        if (!this.el) {
          this.el = $el;
          this.elName = this.el.find('.b_contact_name b');
          this.elName2 = this.el.find('.b_contact_name span');
          this.elNumber = this.el.find('.o_number');
          this.elDtmf = this.el.find('.o_dtmf');
        }
      }
      $el = $el || this.el;
      return $el;
    };

    CUser.prototype.setSelection = function(str) {
      var rx;

      if (this.el != null) {
        if (!str) {
          if (this.elHasSelection) {
            this.elName.text(this.nameHtml1);
            this.elName2.text(this.nameHtml2);
            this.elNumber.text(this.numberHtml);
            return this.elHasSelection = false;
          }
        } else {
          rx = new RegExp('(' + str + ')', 'gi');
          this.elName.html(this.nameHtml1.replace(rx, '<span class="selected_text">$1</span>'));
          this.elName2.html(this.nameHtml2.replace(rx, '<span class="selected_text">$1</span>'));
          this.elNumber.html(this.numberHtml.replace(rx, '<span class="selected_text">$1</span>'));
          return this.elHasSelection = true;
        }
      }
    };

    CUser.prototype.initButtonEl = function($el) {
      var _this = this;

      this.buttonEls = this.buttonEls.add($el);
      $el.data('user', this);
      $el.children(':first').bind('click', function() {
        return _this.doAction(_this.buttonLastAction);
      });
      if (this.buttonLastAction) {
        return $el.removeClass(this.noneActionCss).addClass(this.firstLiCssPrefix + this.buttonLastAction.toLowerCase());
      } else {
        return $el.addClass(this.noneActionCss);
      }
    };

    CUser.prototype.getButtonEl = function() {
      var $el;

      $el = $(this.buttonTemplate);
      this.initButtonEl($el);
      return $el;
    };

    CUser.prototype.isHovered = function(isHovered) {
      if (this.hasHover === isHovered) {
        return;
      }
      this.hasHover = isHovered;
      if (this.hasHover) {
        return this.loadActions(true);
      }
    };

    CUser.prototype.loadOktellActions = function() {
      var action, actions, _ref;

      if (this.isIvr) {
        actions = ['endCall'];
      } else {
        actions = this.oktell.getPhoneActions(this.number || this.id);
      }
      _ref = this.additionalActions;
      for (action in _ref) {
        if (!__hasProp.call(_ref, action)) continue;
        actions.push(action);
      }
      return actions;
    };

    CUser.prototype.addAction = function(action, callback) {
      if (action && typeof action === 'string' && typeof callback === 'function') {
        return this.additionalActions[action] = callback;
      }
    };

    CUser.prototype.removeAction = function(action) {
      return action && delete this.additionalActions[action];
    };

    CUser.prototype.loadActions = function() {
      var action, actions, _ref;

      actions = this.loadOktellActions();
      _ref = this.additionalActions;
      for (action in _ref) {
        if (!__hasProp.call(_ref, action)) continue;
        actions.push(action);
      }
      action = (actions != null ? actions[0] : void 0) || '';
      if (this.buttonLastAction === action) {
        return actions;
      }
      if (this.buttonLastAction) {
        this.buttonEls.removeClass(this.firstLiCssPrefix + this.buttonLastAction.toLowerCase());
      }
      if (action) {
        this.buttonLastAction = action;
        this.buttonEls.removeClass(this.noneActionCss).addClass(this.firstLiCssPrefix + this.buttonLastAction.toLowerCase());
      } else {
        this.buttonLastAction = '';
        this.buttonEls.addClass(this.noneActionCss);
      }
      return actions;
    };

    CUser.prototype.doAction = function(action) {
      var target, _base, _base1, _base2, _base3;

      if (!action) {
        return;
      }
      target = this.number;
      if (typeof this.beforeAction === "function") {
        this.beforeAction(action);
      }
      switch (action) {
        case 'call':
          return this.oktell.call(target);
        case 'conference':
          return this.oktell.conference(target);
        case 'intercom':
          return this.oktell.intercom(target);
        case 'transfer':
          return this.oktell.transfer(target);
        case 'toggle':
          return this.oktell.toggle();
        case 'ghostListen':
          return this.oktell.ghostListen(target);
        case 'ghostHelp':
          return this.oktell.ghostHelp(target);
        case 'ghostConference':
          return this.oktell.ghostConference(target);
        case 'endCall':
          return this.oktell.endCall(target);
        case 'hold':
          return typeof (_base = this.oktell).hold === "function" ? _base.hold() : void 0;
        case 'resume':
          return typeof (_base1 = this.oktell).resume === "function" ? _base1.resume() : void 0;
        case 'answer':
          return typeof (_base2 = this.oktell).answer === "function" ? _base2.answer() : void 0;
        default:
          return typeof (_base3 = this.additionalActions)[action] === "function" ? _base3[action]() : void 0;
      }
    };

    CUser.prototype.doLastFirstAction = function() {
      if (this.buttonLastAction) {
        this.doAction(this.buttonLastAction);
        return true;
      } else {
        return false;
      }
    };

    CUser.prototype.letterVisibility = function(show) {
      if (this.el && this.el.length) {
        if (show) {
          return this.el.find('.b_capital_letter span').text(this.letter);
        } else {
          return this.el.find('.b_capital_letter span').text('');
        }
      }
    };

    CUser.prototype.replacerToRu = {
      "q": "й",
      "w": "ц",
      "e": "у",
      "r": "к",
      "t": "е",
      "y": "н",
      "u": "г",
      "i": "ш",
      "o": "щ",
      "p": "з",
      "[": "х",
      "]": "ъ",
      "a": "ф",
      "s": "ы",
      "d": "в",
      "f": "а",
      "g": "п",
      "h": "р",
      "j": "о",
      "k": "л",
      "l": "д",
      ";": "ж",
      "'": "э",
      "z": "я",
      "x": "ч",
      "c": "с",
      "v": "м",
      "b": "и",
      "n": "т",
      "m": "ь",
      ",": "б",
      ".": "ю",
      "/": "."
    };

    CUser.prototype.replacerToEn = {
      "й": "q",
      "ц": "w",
      "у": "e",
      "к": "r",
      "е": "t",
      "н": "y",
      "г": "u",
      "ш": "i",
      "щ": "o",
      "з": "p",
      "х": "[",
      "ъ": "]",
      "ф": "a",
      "ы": "s",
      "в": "d",
      "а": "f",
      "п": "g",
      "р": "h",
      "о": "j",
      "л": "k",
      "д": "l",
      "ж": ";",
      "э": "'",
      "я": "z",
      "ч": "x",
      "с": "c",
      "м": "v",
      "и": "b",
      "т": "n",
      "ь": "m",
      "б": ",",
      "ю": ".",
      ".": "/"
    };

    CUser.prototype.toRu = function(str) {
      var _this = this;

      return str.replace(/[A-z\/,.;\'\]\[]/g, function(x) {
        if (x === x.toLowerCase()) {
          return _this.replacerToRu[x];
        } else {
          return _this.replacerToRu[x.toLowerCase()].toUpperCase();
        }
      });
    };

    CUser.prototype.toEn = function(str) {
      var _this = this;

      return str.replace(/[А-яёЁ]/g, function(x) {
        if (x === x.toLowerCase()) {
          return _this.replacerToEn[x];
        } else {
          return _this.replacerToEn[x.toLowerCase()].toUpperCase();
        }
      });
    };

    return CUser;

  })();
  List = (function() {
    List.prototype.logGroup = 'List';

    function List(oktell, panelEl, dropdownEl, afterOktellConnect, options, contained, useSticky, useNativeScroll, debugMode) {
      this.onPbxNumberStateChange = __bind(this.onPbxNumberStateChange, this);
      var debouncedSetFilter, debouncedSetHeight, dropdownHideTimer, oktellConnected, ringNotify, self,
        _this = this;

      this.defaultConfig = {
        departmentVisibility: {},
        showDeps: true,
        showOffline: false
      };
      this.useNativeScroll = useNativeScroll;
      this.stickyHeaders = useSticky;
      this.jScrollPaneParams = {
        mouseWheelSpeed: 50,
        hideFocus: true,
        verticalGutter: -13
      };
      this.allActions = {
        answer: {
          icon: '/img/icons/action/call.png',
          iconWhite: '/img/icons/action/white/call.png',
          text: this.langs.actions.answer
        },
        call: {
          icon: '/img/icons/action/call.png',
          iconWhite: '/img/icons/action/white/call.png',
          text: this.langs.actions.call
        },
        conference: {
          icon: '/img/icons/action/confinvite.png',
          iconWhite: '/img/icons/action/white/confinvite.png',
          text: this.langs.actions.conference
        },
        transfer: {
          icon: '/img/icons/action/transfer.png',
          text: this.langs.actions.transfer
        },
        toggle: {
          icon: '/img/icons/action/toggle.png',
          text: this.langs.actions.toggle
        },
        intercom: {
          icon: '/img/icons/action/intercom.png',
          text: this.langs.actions.intercom
        },
        endCall: {
          icon: '/img/icons/action/endcall.png',
          iconWhite: '/img/icons/action/white/endcall.png',
          text: this.langs.actions.endCall
        },
        ghostListen: {
          icon: '/img/icons/action/ghost_monitor.png',
          text: this.langs.actions.ghostListen
        },
        ghostHelp: {
          icon: '/img/icons/action/ghost_help.png',
          text: this.langs.actions.ghostHelp
        },
        hold: {
          icon: '/img/icons/action/ghost_help.png',
          text: this.langs.actions.hold
        },
        resume: {
          icon: '/img/icons/action/ghost_help.png',
          text: this.langs.actions.resume
        },
        dtmf: {
          icon: '',
          text: this.langs.actions.dtmf
        }
      };
      this.actionCssPrefix = 'i_';
      this.lastDropdownUser = false;
      self = this;
      CUser.prototype.beforeAction = function(action) {
        return self.beforeUserAction(this, action);
      };
      this.departments = [];
      this.departmentsById = {};
      this.simpleListEl = $(this.usersTableTemplate);
      this.filterFantomUserNumber = false;
      this.userWithGeneratedButtons = {};
      this.debugMode = debugMode;
      this.dropdownPaddingBottomLeft = 3;
      this.dropdownOpenedOnPanel = false;
      this.regexps = {
        actionText: /\{\{actionText\}\}/,
        action: /\{\{action\}\}/,
        css: /\{\{css\}\}/,
        dep: /\{\{department}\}/g
      };
      oktellConnected = false;
      this.options = options;
      this.contained = contained;
      this.usersByNumber = {};
      this.me = false;
      this.oktell = oktell;
      this.panelUsers = [];
      this.panelUsersFiltered = [];
      this.abonents = {};
      this.hold = {};
      this.queue = {};
      this.oktell = oktell;
      CUser.prototype.oktell = oktell;
      this.filter = false;
      this.panelEl = panelEl;
      this.dtmfEl = this.panelEl.find('.i_extension');
      this.dropdownEl = dropdownEl;
      this.dropdownElLiTemplate = this.dropdownEl.html();
      this.dropdownEl.empty();
      this.keypadEl = this.panelEl.find('.j_phone_keypad');
      this.keypadIsVisible = false;
      this.usersListBlockEl = this.panelEl.find('.j_main_list');
      this.scrollContainer = '';
      this.scrollContent = '';
      this.usersListEl = this.simpleListEl.find('tbody');
      this.abonentsListBlock = this.panelEl.find('.j_abonents');
      this.abonentsListEl = this.abonentsListBlock.find('tbody');
      this.abonentsHeaderTextEl = this.abonentsListBlock.find('b_marks_label');
      this.talkTimeEl = this.abonentsListBlock.find('.b_marks_time');
      this.holdBlockEl = this.panelEl.find('.j_hold');
      this.holdListEl = this.holdBlockEl.find('tbody');
      this.queueBlockEl = this.panelEl.find('.j_queue');
      this.queueListEl = this.queueBlockEl.find('tbody');
      this.filterInput = this.panelEl.find('input');
      this.filterClearCross = this.panelEl.find('.jInputClear_close');
      debouncedSetFilter = false;
      this.buttonShowOffline = this.panelEl.find('.b_list_filter .i_online');
      this.buttonShowDeps = this.panelEl.find('.b_list_filter .i_group');
      this.buttonShowOffline.bind('click', function() {
        _this.config({
          showOffline: !_this.showOffline
        });
        return _this.setFilter(_this.filter, true);
      });
      this.buttonShowDeps.bind('click', function() {
        _this.config({
          showDeps: !_this.showDeps
        });
        return _this.setFilter(_this.filter, true);
      });
      this.dtmfEl.find('.o_close').bind('click', function() {
        return _this.hideDtmf();
      });
      this.dtmfEl.find('.btn-small').bind('click', function(e) {
        return _this.sendDtmf($(e.target).text());
      });
      this.usersWithBeforeConnectButtons = [];
      this.config();
      Department.prototype.config = function() {
        var args;

        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return _this.config.apply(_this, args);
      };
      this.allUserDep = new Department('all_user_dep', 'allUsers');
      this.allUserDep.template = this.usersTableTemplate;
      this.exactMatchUserDep = new Department('exact_match_user_dep', 'exactUser');
      this.exactMatchUserDep.template = this.usersTableTemplate;
      this.initJScrollPane = function() {
        if (_this.useNativeScroll) {
          _this.scrollContainer = _this.usersListBlockEl;
          _this.scrollContent = _this.usersListBlockEl;
          _this.usersListBlockEl.css('overflow-y', 'auto');
        } else {
          _this.usersListBlockEl.oktellPanelJScrollPane(_this.jScrollPaneParams);
          _this.jScrollPaneAPI = _this.usersListBlockEl.data('jsp');
          _this.scrollContainer = _this.usersListBlockEl.find('.jspContainer');
          _this.scrollContent = _this.usersListBlockEl.find('.jspPane');
        }
        if (_this.stickyHeaders) {
          return _this.usersListBlockEl.bind('scroll', function() {
            return _this.processStickyHeaders();
          });
        }
      };
      this.initJScrollPane();
      this.reinitScroll = function() {
        var _ref;

        if (!_this.useNativeScroll) {
          return (_ref = _this.jScrollPaneAPI) != null ? _ref.reinitialise() : void 0;
        }
      };
      this.resetDepsWidth = function() {
        var w, _ref;

        if (!_this.useNativeScroll && !_this.contained && _this.scrollContent) {
          w = parseInt(_this.scrollContent.css('width'));
          _this.scrollContent.find('.b_department').css('width', w + 'px');
          return (_ref = _this.currentTopHeaderClone) != null ? _ref.css({
            width: w + 'px'
          }) : void 0;
        }
      };
      this.userScrollerToTop = function() {
        if (!_this.useNativeScroll) {
          return _this.jScrollPaneAPI.scrollToY(0);
        } else {
          return _this.usersListBlockEl.scrollTop(0);
        }
      };
      this.filterClearCross.bind('click', function() {
        return _this.clearFilter();
      });
      this.filterInput.bind('keyup', function(e) {
        if (!_this.oktellConnected) {
          return true;
        }
        if (!debouncedSetFilter) {
          debouncedSetFilter = debounce(function() {
            return _this.setFilter(_this.filterInput.val().toString().toLowerCase());
          }, 100);
        }
        if (_this.filterInput.val()) {
          _this.filterClearCross.show();
        } else {
          _this.filterClearCross.hide();
        }
        if (e.keyCode === 13) {
          _this.filterInput.blur();
          setTimeout(function() {
            var _ref;

            if ((_ref = _this.scrollContent.find('tr:first').data('user')) != null) {
              _ref.doLastFirstAction();
            }
            return _this.clearFilter();
          }, 50);
        } else {
          debouncedSetFilter();
        }
        return true;
      });
      this.panelEl.bind('click', function(e) {
        var actionButton, buttonEl, dep, target, useDtmfAsAction, user;

        target = $(e.target);
        if (target.is('.b_department_header') || target.parents('.b_department_header').size() > 0) {
          dep = target.parents('.b_department').data('department');
          if ((dep != null ? dep.showUsers : void 0) != null) {
            dep.showUsers();
            _this.clearSelection();
            _this.reinitScroll();
          }
          _this.setUserListHeight();
          return false;
        }
        if (target.is('.o_dtmf')) {
          _this.showDtmf();
          return false;
        }
        if (target.is('.oktell_button_action .g_first')) {
          actionButton = target.parent();
        } else if (target.is('.oktell_button_action .g_first i')) {
          actionButton = target.parent().parent();
        } else if (target.is('.b_contact .drop_down')) {
          buttonEl = target.parent();
        } else if (target.is('.b_contact .drop_down i')) {
          buttonEl = target.parent().parent();
        }
        if (((actionButton == null) && (buttonEl == null)) || (actionButton && actionButton.size() === 0) || (buttonEl && buttonEl.size() === 0)) {
          return true;
        }
        if ((actionButton != null) && actionButton.size()) {
          return true;
        }
        if ((buttonEl != null) && buttonEl.size()) {
          user = buttonEl.data('user');
          useDtmfAsAction = buttonEl.parents('.j_abonents').size();
          if (user) {
            _this.showDropdown(user, buttonEl, user.loadOktellActions(), true, useDtmfAsAction);
          }
          return true;
        }
      });
      this.dropdownEl.bind('click', function(e) {
        var action, actionEl, target, user;

        target = $(e.target);
        if (target.is('[data-action]')) {
          actionEl = target;
        } else if (target.closest('[data-action]').size() !== 0) {
          actionEl = target.closest('[data-action]');
        } else {
          return true;
        }
        action = actionEl.data('action');
        if (!action) {
          return;
        }
        user = _this.dropdownEl.data('user');
        if (action && user) {
          if (action === 'dtmf') {
            _this.toggleDtmf();
          } else {
            user.doAction(action);
          }
        }
        return _this.dropdownEl.hide();
      });
      dropdownHideTimer = '';
      this.dropdownEl.hover(function() {
        return clearTimeout(dropdownHideTimer);
      }, function() {
        return dropdownHideTimer = setTimeout(function() {
          return _this.hideActionListDropdown();
        }, 500);
      });
      this.panelEl.find('.j_keypad_expand').bind('click', function() {
        _this.toggleKeypadVisibility();
        return _this.filterInput.focus();
      });
      this.keypadEl.find('li').bind('click', function(e) {
        _this.filterInput.focus();
        _this.filterInput.val(_this.filterInput.val() + $(e.currentTarget).find('button').data('num'));
        return _this.filterInput.keyup();
      });
      this.setUserListHeight = function() {
        var h;

        h = $(window).height() - _this.usersListBlockEl[0].offsetTop + 'px';
        _this.usersListBlockEl.css({
          height: h
        });
        _this.reinitScroll();
        return _this.resetDepsWidth();
      };
      this.setUserListHeight();
      debouncedSetHeight = debounce(function() {
        _this.userScrollerToTop();
        return _this.setUserListHeight();
      }, 150);
      $(window).bind('resize', function() {
        return debouncedSetHeight();
      });
      if (this.options.hideOnDisconnect) {
        this.hidePanel(true);
      }
      oktell.on('webphoneConnect', function() {
        return _this.panelEl.addClass('webphone');
      });
      oktell.on('webphoneDisconnect', function() {
        return _this.panelEl.removeClass('webphone');
      });
      oktell.on('disconnect', function() {
        var phone, user, _ref, _results;

        if (_this.options.hideOnDisconnect) {
          _this.hidePanel();
        }
        _this.resetStickyHeaders();
        _this.oktellConnected = false;
        _this.usersByNumber = {};
        _this.panelUsers = [];
        _this.setPanelUsersHtml([]);
        _this.setAbonents([]);
        _this.setHold({
          hasHold: false
        });
        _this.filterInput.val('');
        _this.setFilter('', true);
        _this.setQueue([]);
        _ref = _this.userWithGeneratedButtons;
        _results = [];
        for (phone in _ref) {
          user = _ref[phone];
          _results.push(user.loadActions());
        }
        return _results;
      });
      oktell.on('connect', function() {
        var createdDeps, dep, id, numObj, number, oId, oInfo, oNumbers, oUser, oUsers, otherDep, strNumber, user, _i, _len, _ref, _ref1, _ref2;

        _this.oktellConnected = true;
        oInfo = oktell.getMyInfo();
        oInfo.userid = oInfo.userid.toString().toLowerCase();
        _this.myNumber = (_ref = oInfo.number) != null ? _ref.toString() : void 0;
        CUser.prototype.defaultAvatar = oInfo.defaultAvatar;
        CUser.prototype.defaultAvatar32 = oInfo.defaultAvatar32x32;
        CUser.prototype.defaultAvatar64 = oInfo.defaultAvatar64x64;
        _this.departments = [];
        _this.departmentsById = {};
        createdDeps = {};
        otherDep = new Department();
        oUsers = oktell.getUsers();
        oNumbers = oktell.getNumbers();
        for (id in oUsers) {
          if (!__hasProp.call(oUsers, id)) continue;
          user = oUsers[id];
          delete oNumbers[user.number];
        }
        for (number in oNumbers) {
          if (!__hasProp.call(oNumbers, number)) continue;
          numObj = oNumbers[number];
          id = newGuid();
          oUsers[id] = {
            id: id,
            number: number,
            name: numObj.caption,
            numberObj: numObj
          };
        }
        for (oId in oUsers) {
          if (!__hasProp.call(oUsers, oId)) continue;
          oUser = oUsers[oId];
          strNumber = ((_ref1 = oUser.number) != null ? _ref1.toString() : void 0) || '';
          if (!strNumber) {
            continue;
          }
          if (_this.usersByNumber[strNumber]) {
            user = _this.usersByNumber[strNumber];
            oUser.isFantom = false;
            user.init(oUser);
          } else {
            user = new CUser(oUser);
            if (user.number) {
              _this.usersByNumber[user.number] = user;
            }
          }
          if (user.id !== oInfo.userid) {
            _this.panelUsers.push(user);
            if (user.departmentId && user.departmentId !== '00000000-0000-0000-0000-000000000000' && user.departmentId !== _this.withoutDepName) {
              if (createdDeps[user.departmentId]) {
                dep = createdDeps[user.departmentId];
              } else {
                dep = createdDeps[user.departmentId] = new Department(user.departmentId, user.department);
                _this.departments.push(dep);
                _this.departmentsById[user.departmentId] = dep;
              }
              dep.addUser(user);
            } else {
              otherDep.addUser(user);
            }
            _this.allUserDep.addUser(user);
          } else {
            _this.me = user;
          }
        }
        _this.departments.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          } else if (b.name > a.name) {
            return -1;
          } else {
            return 0;
          }
        });
        _this.departments.push(otherDep);
        _this.departmentsById[otherDep.id] = otherDep;
        oktell.offNativeEvent('pbxnumberstatechanged', _this.onPbxNumberStateChange);
        oktell.onNativeEvent('pbxnumberstatechanged', _this.onPbxNumberStateChange);
        setTimeout(function() {
          _this.setAbonents(oktell.getAbonents());
          return _this.setHold(oktell.getHoldInfo());
        }, 1000);
        _this.setFilter('', true);
        setTimeout(function() {
          return _this.setUserListHeight();
        }, 500);
        oktell.getQueue(function(data) {
          if (data.result) {
            return _this.setQueue(data.queue);
          }
        });
        _ref2 = _this.usersWithBeforeConnectButtons;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          user = _ref2[_i];
          user.loadActions();
        }
        if (_this.contained || _this.options.hideOnDisconnect) {
          _this.showPanel();
        } else {
          _this.panelEl.show();
        }
        _this.setTalking(oktell.getState() === 'talk');
        if (typeof afterOktellConnect === 'function') {
          return afterOktellConnect();
        }
      });
      oktell.on('abonentsChange', function(abonents) {
        if (_this.oktellConnected) {
          if (oktell.conferenceId()) {
            _this.panelEl.addClass('conference');
            _this.hideDtmf();
          } else {
            _this.panelEl.removeClass('conference');
          }
          _this.setAbonents(abonents);
          return _this.reloadActions();
        }
      });
      oktell.on('holdStateChange', function(holdInfo) {
        if (_this.oktellConnected) {
          _this.setHold(holdInfo);
          return _this.reloadActions();
        }
      });
      oktell.on('talkTimer', function(seconds, formattedTime) {
        if (_this.oktellConnected) {
          if (seconds === false) {
            return _this.talkTimeEl.text('');
          } else {
            return _this.talkTimeEl.text(formattedTime);
          }
        }
      });
      oktell.on('stateChange', function(newState, oldState) {
        if (_this.oktellConnected) {
          _this.reloadActions();
          return _this.setTalking(newState === 'talk');
        }
      });
      oktell.on('queueChange', function(queue) {
        if (_this.oktellConnected) {
          return _this.setQueue(queue);
        }
      });
      oktell.on('connectError', function() {
        if (!_this.options.hideOnDisconnect) {
          return _this.showPanel();
        }
      });
      ringNotify = null;
      oktell.on('ringStart', function(abonents) {
        if (_this.options.useNotifies) {
          return ringNotify = new Notify(_this.langs.callPopup.title);
        }
      });
      oktell.on('ringStop', function() {
        if (ringNotify != null) {
          if (typeof ringNotify.close === "function") {
            ringNotify.close();
          }
        }
        return ringNotify = null;
      });
    }

    List.prototype.clearSelection = function() {
      var sel;

      if (document.selection && document.selection.empty) {
        return document.selection.empty();
      } else if (window.getSelection) {
        sel = window.getSelection();
        return sel.removeAllRanges();
      }
    };

    List.prototype.initStickyHeaders = function() {
      var conTop, h, i, _i, _j, _len, _len1, _ref, _ref1,
        _this = this;

      if (!this.stickyHeaders) {
        return;
      }
      this.resetStickyHeaders();
      if (!this.oktellConnected) {
        return;
      }
      this.headerEls = this.usersListBlockEl.find('.b_department_header').toArray();
      if (this.headerEls.length === 0) {
        return;
      } else if ($(this.headerEls[0]).width() === 0) {
        setTimeout(function() {
          return _this.initStickyHeaders();
        }, 500);
        return;
      }
      this.headerFisrt = this.headerEls[0];
      this.headerLast = this.headerEls.length ? this.headerEls[this.headerEls.length - 1] : null;
      _ref = this.headerEls;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        h = _ref[i];
        this.headerEls[i] = $(h);
      }
      conTop = this.scrollContainer.offset().top;
      _ref1 = this.headerEls;
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        h = _ref1[i];
        if (h.offset().top > conTop || i === this.headerEls.length - 1) {
          this.processStickyHeaders(i - 1);
          break;
        }
      }
      return this.processStickyHeaders();
    };

    List.prototype.headerHeight = 24;

    List.prototype.cloneHeaderHeight = null;

    List.prototype.processStickyHeaders = function(elIndex) {
      var conTop, curTop, nexTop, _ref, _ref1,
        _this = this;

      if (((_ref = this.headerEls) != null ? _ref.length : void 0) > 0) {
        if (elIndex != null) {
          if (elIndex < 0) {
            elIndex = 0;
          }
          this.currentTopIndex = elIndex;
          if ((_ref1 = this.currentTopHeaderClone) != null) {
            _ref1.remove();
          }
          this.currentTopHeaderClone = this.headerEls[this.currentTopIndex].clone();
          this.cloneHeaderHeight = this.headerEls[this.currentTopIndex].height();
          this.currentTopHeaderClone.addClass('b_sticky_header');
          this.currentTopHeaderClone.bind('click', function() {
            _this.headerEls[_this.currentTopIndex].click();
            _this.initStickyHeaders();
            return _this.reinitScroll();
          });
          $('.b_sticky_header_container').empty().append(this.currentTopHeaderClone);
          this.currentTopHeaderClone.offset({
            top: this.scrollContainer.offset().top
          });
          return this.processStickyHeaders();
        } else if (this.currentTopIndex != null) {
          conTop = this.scrollContainer.offset().top;
          curTop = this.headerEls[this.currentTopIndex].offset().top;
          if (curTop > conTop) {
            if (this.currentTopIndex === 0) {
              if (!this.currentTopHeaderClone.data('hidden')) {
                this.currentTopHeaderClone.data('hidden', true);
                return this.currentTopHeaderClone.hide();
              }
            } else {
              return this.processStickyHeaders(this.currentTopIndex - 1);
            }
          } else {
            if (this.currentTopHeaderClone.data('hidden')) {
              this.currentTopHeaderClone.data('hidden', false);
              this.currentTopHeaderClone.show();
            }
            if (this.headerEls[this.currentTopIndex + 1]) {
              nexTop = this.headerEls[this.currentTopIndex + 1].offset().top;
              if (nexTop > conTop + (this.cloneHeaderHeight || this.headerHeight)) {
                return this.currentTopHeaderClone.offset({
                  top: conTop
                });
              } else if (nexTop > conTop) {
                return this.currentTopHeaderClone.offset({
                  top: nexTop - (this.cloneHeaderHeight || this.headerHeight)
                });
              } else if (nexTop < conTop) {
                return this.processStickyHeaders(this.currentTopIndex + 1);
              }
            }
          }
        }
      }
    };

    List.prototype.resetStickyHeaders = function() {
      var _ref;

      if ((_ref = this.currentTopHeaderClone) != null) {
        if (typeof _ref.remove === "function") {
          _ref.remove();
        }
      }
      this.currentTopHeaderClone = null;
      this.cloneHeaderHeight = null;
      this.currentTopIndex = null;
      return this.headerEls = null;
    };

    List.prototype.beforeShow = function() {};

    List.prototype.afterShow = function() {
      return this.initStickyHeaders();
    };

    List.prototype.beforeHide = function() {};

    List.prototype.afterHide = function() {
      return this.resetStickyHeaders();
    };

    List.prototype.setTalking = function(isTalking) {
      if (isTalking) {
        return this.panelEl.addClass('talking');
      } else {
        this.hideDtmf();
        return this.panelEl.removeClass('talking');
      }
    };

    List.prototype.sendDtmf = function(code) {
      return this.oktell.dtmf(code.toString().replace('∗', '*'));
    };

    List.prototype.toggleDtmf = function() {
      if (this.panelEl.hasClass('dtmf')) {
        return this.hideDtmf();
      } else {
        return this.showDtmf();
      }
    };

    List.prototype.showDtmf = function(dontAnimate) {
      var _this = this;

      if (this.oktell.getState() === 'talk' && this.panelEl.hasClass('webphone') && !this.panelEl.hasClass('dtmf')) {
        this.panelEl.addClass('dtmf');
        this.dtmfEl.stop(true, true);
        if (dontAnimate) {
          this.dtmfEl.show();
          return this.initStickyHeaders();
        } else {
          this.resetStickyHeaders();
          return this.dtmfEl.slideDown(200, function() {
            return _this.initStickyHeaders();
          });
        }
      }
    };

    List.prototype.hideDtmf = function(dontAnimate) {
      var _this = this;

      if (this.panelEl.hasClass('dtmf')) {
        this.panelEl.removeClass('dtmf');
        this.dtmfEl.stop(true, true);
        if (dontAnimate) {
          this.dtmfEl.hide();
          return this.initStickyHeaders();
        } else {
          this.resetStickyHeaders();
          return this.dtmfEl.slideUp(200, function() {
            return _this.initStickyHeaders();
          });
        }
      }
    };

    List.prototype.onPbxNumberStateChange = function(data) {
      var dep, index, n, numStr, user, userNowIsFiltered, wasFiltered, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _results;

      _ref = data.numbers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        numStr = n.num.toString();
        user = this.usersByNumber[numStr];
        if (user) {
          dep = null;
          if (this.showDeps) {
            dep = this.departmentsById[user.departmentId];
          } else {
            dep = this.allUserDep;
          }
          wasFiltered = user.isFiltered(this.filter, this.showOffline, this.filterLang);
          user.setState(n.numstateid);
          userNowIsFiltered = user.isFiltered(this.filter, this.showOffline, this.filterLang);
          if (!userNowIsFiltered) {
            if (dep.getContainer().children().length === 1) {
              _results.push(this.setFilter(this.filter, true, true));
            } else {
              _results.push((_ref1 = user.el) != null ? typeof _ref1.detach === "function" ? _ref1.detach() : void 0 : void 0);
            }
          } else if (!wasFiltered) {
            dep.getUsers(this.filter, this.showOffline, this.filterLang);
            index = dep.lastFilteredUsers.indexOf(user);
            if (index !== -1) {
              if (!dep.getContainer().is(':visible')) {
                _results.push(this.setFilter(this.filter, true, true));
              } else {
                if (index === 0) {
                  dep.getContainer().prepend(user.getEl());
                } else {
                  if ((_ref2 = dep.lastFilteredUsers[index - 1]) != null) {
                    if ((_ref3 = _ref2.el) != null) {
                      _ref3.after(user.getEl());
                    }
                  }
                }
                if (((_ref4 = dep.lastFilteredUsers[index - 1]) != null ? _ref4.letter : void 0) === user.letter) {
                  _results.push(user.letterVisibility(false));
                } else if (((_ref5 = dep.lastFilteredUsers[index + 1]) != null ? _ref5.letter : void 0) === user.letter) {
                  _results.push(dep.lastFilteredUsers[index + 1].letterVisibility(false));
                } else {
                  _results.push(void 0);
                }
              }
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    List.prototype.hideActionListDropdown = function() {
      var _this = this;

      return this.dropdownEl.fadeOut(150, function() {
        return _this.dropdownOpenedOnPanel = false;
      });
    };

    List.prototype.showPanel = function(notAnimate) {
      var w,
        _this = this;

      if (this.contained) {
        if (notAnimate) {
          return this.panelEl.show();
        } else {
          return this.panelEl.fadeIn(200);
        }
      } else {
        w = this.panelEl.data('width');
        if (w > 0 && this.panelEl.data('hided')) {
          this.panelEl.data('width', w);
          this.panelEl.data('hided', false);
          this.panelEl.css({
            display: ''
          });
          if (notAnimate) {
            return this.panelEl.css({
              overflow: '',
              width: w + 'px'
            });
          } else {
            return this.panelEl.animate({
              width: w + 'px'
            }, 200, function() {
              return _this.panelEl.css({
                overflow: ''
              });
            });
          }
        }
      }
    };

    List.prototype.hidePanel = function(notAnimate) {
      var w,
        _this = this;

      if (this.contained) {
        if (notAnimate) {
          return this.panelEl.hide();
        } else {
          return this.panelEl.fadeOut(200);
        }
      } else {
        w = this.panelEl.data('width') != null ? this.panelEl.data('width') : this.panelEl.width();
        if (w > 0 && !this.panelEl.data('hided')) {
          this.panelEl.data('width', w);
          this.panelEl.data('hided', true);
          if (notAnimate) {
            return this.panelEl.css({
              display: '',
              overflow: 'hidden',
              width: '0px'
            });
          } else {
            return this.panelEl.animate({
              width: '0px'
            }, 200, function() {
              return _this.panelEl.css({
                display: '',
                overflow: 'hidden'
              });
            });
          }
        }
      }
    };

    List.prototype.getUserButtonForPlugin = function(phone) {
      var button, user,
        _this = this;

      user = this.getUser(phone);
      if (!this.oktellConnected) {
        this.usersWithBeforeConnectButtons.push(user);
      }
      this.userWithGeneratedButtons[phone] = user;
      button = user.getButtonEl();
      button.find('.drop_down').bind('click', function() {
        var actions;

        actions = user.loadActions();
        return _this.showDropdown(user, button, actions);
      });
      return button;
    };

    List.prototype.clearFilter = function() {
      this.filterInput.val('');
      this.setFilter('');
      return this.filterInput.keyup();
    };

    List.prototype.toggleKeypadVisibility = function() {
      return this.setKeypadVisibility(!this.keypadIsVisible);
    };

    List.prototype.setKeypadVisibility = function(visible) {
      var _this = this;

      if ((visible != null) && Boolean(this.keypadIsVisible) !== Boolean(visible)) {
        this.keypadIsVisible = Boolean(visible);
        this.keypadEl.stop(true, true);
        this.resetStickyHeaders();
        if (this.keypadIsVisible) {
          return this.keypadEl.slideDown({
            duration: 200,
            easing: 'linear',
            done: function() {
              _this.setUserListHeight();
              return _this.initStickyHeaders();
            }
          });
        } else {
          return this.keypadEl.slideUp({
            duration: 200,
            easing: 'linear',
            done: function() {
              _this.setUserListHeight();
              return _this.initStickyHeaders();
            }
          });
        }
      }
    };

    List.prototype.addEventListenersForButton = function(user, button) {
      var _this = this;

      return button.bind('click', function() {
        user;        if (user) {
          return _this.showDropdown(user, $(_this));
        }
      });
    };

    List.prototype.showDropdown = function(user, buttonEl, actions, onPanel, useDtmfAsAction) {
      var a, aEls, t, _i, _len, _ref;

      t = this.dropdownElLiTemplate;
      this.dropdownEl.empty();
      if (useDtmfAsAction && !this.oktell.conferenceId()) {
        actions.push('dtmf');
      }
      if (actions != null ? actions.length : void 0) {
        aEls = [];
        for (_i = 0, _len = actions.length; _i < _len; _i++) {
          a = actions[_i];
          if (typeof a === 'string' && ((_ref = this.allActions[a]) != null ? _ref.text : void 0)) {
            aEls.push(t.replace(this.regexps.actionText, this.allActions[a].text).replace(this.regexps.action, a).replace(this.regexps.css, this.actionCssPrefix + a.toLowerCase()));
          }
        }
        if (aEls.length) {
          this.dropdownEl.append(aEls.join(''));
          this.dropdownEl.children('li:first').addClass('g_first');
          this.dropdownEl.children('li:last').addClass('g_last');
          this.dropdownEl.data('user', user);
          this.dropdownEl.css({
            'top': this.dropdownEl.height() + buttonEl.offset().top > $(window).height() ? $(window).height() - this.dropdownEl.height() - this.dropdownPaddingBottomLeft : buttonEl.offset().top,
            'left': Math.max(this.dropdownPaddingBottomLeft, buttonEl.offset().left - this.dropdownEl.width() + buttonEl.width()),
            'visibility': 'visible'
          });
          this.dropdownEl.fadeIn(100);
          if (onPanel) {
            return this.dropdownOpenedOnPanel = true;
          }
        } else {
          return this.dropdownEl.hide();
        }
      } else {
        return this.dropdownEl.hide();
      }
    };

    List.prototype.logUsers = function() {
      var k, u, _ref, _results;

      _ref = this.panelUsersFiltered;
      _results = [];
      for (k in _ref) {
        if (!__hasProp.call(_ref, k)) continue;
        u = _ref[k];
        _results.push(this.log(u.getInfo()));
      }
      return _results;
    };

    List.prototype.syncAbonentsAndUserlist = function(abonents, userlist) {
      var absByNumber, uNumber, user, _ref, _ref1, _results,
        _this = this;

      absByNumber = {};
      if ((abonents != null ? abonents.length : void 0) === 0 || (abonents.length === 1 && ((_ref = abonents[0]) != null ? _ref.isIvr : void 0) && !((_ref1 = abonents[0]) != null ? _ref1.phone : void 0))) {
        for (uNumber in userlist) {
          if (!__hasProp.call(userlist, uNumber)) continue;
          user = userlist[uNumber];
          delete userlist[uNumber];
        }
      }
      $.each(abonents, function(i, ab) {
        var number, u, _ref2;

        if (!ab) {
          return;
        }
        number = ((_ref2 = ab.phone) != null ? typeof _ref2.toString === "function" ? _ref2.toString() : void 0 : void 0) || ab.ivrName || '';
        if (!number) {
          return;
        }
        absByNumber[number] = ab;
        if (!userlist[number.toString()]) {
          u = _this.getUser({
            name: ab.name,
            number: ab.phone || '',
            id: ab.userid,
            state: ab.isIvr ? 5 : 1,
            isIvr: ab.isIvr,
            ivrName: ab.ivrName
          }, ab.isIvr && !ab.phone);
          return userlist[number.toString()] = u;
        }
      });
      _results = [];
      for (uNumber in userlist) {
        if (!__hasProp.call(userlist, uNumber)) continue;
        user = userlist[uNumber];
        if (!absByNumber[user.number]) {
          _results.push(delete userlist[user.number]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    List.prototype.setAbonents = function(abonents) {
      var abonent, number, _ref, _ref1,
        _this = this;

      this.log('setAbonents', abonents, this.abonents);
      _ref = this.abonents;
      for (number in _ref) {
        if (!__hasProp.call(_ref, number)) continue;
        abonent = _ref[number];
        abonent.removeAction('dtmf');
      }
      this.syncAbonentsAndUserlist(abonents, this.abonents);
      this.log('setAbonents synced', this.abonents);
      if (!this.oktell.conferenceId) {
        _ref1 = this.abonents;
        for (number in _ref1) {
          if (!__hasProp.call(_ref1, number)) continue;
          abonent = _ref1[number];
          abonent.addAction('dtmf', function() {
            return _this.toggleDtmf();
          });
        }
      }
      this.setAbonentsHtml();
      return setTimeout(function() {
        return _this.setUserListHeight();
      }, 200);
    };

    List.prototype.setQueue = function(queue) {
      var ab, key, user, _i, _len, _ref;

      if (this.oktell.getState() === 'ring') {
        for (key = _i = 0, _len = queue.length; _i < _len; key = ++_i) {
          ab = queue[key];
          if (this.abonents[ab.phone]) {
            delete queue[key];
          }
        }
      }
      this.syncAbonentsAndUserlist(queue, this.queue);
      _ref = this.queue;
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        user = _ref[key];
        user.loadActions();
      }
      return this.setQueueHtml();
    };

    List.prototype.setHold = function(holdInfo) {
      var abs;

      abs = [];
      if (holdInfo.hasHold) {
        if (holdInfo.conferenceid) {
          abs = [
            {
              number: holdInfo.conferenceRoom,
              id: holdInfo.conferenceid,
              name: holdInfo.conferenceName
            }
          ];
        } else {
          abs = [holdInfo.abonent];
        }
      }
      this.syncAbonentsAndUserlist(abs, this.hold);
      return this.setHoldHtml();
    };

    List.prototype.setPanelUsersHtml = function(usersArray) {
      this._setUsersHtml(usersArray, this.usersListEl);
      return this.userScrollerToTop();
    };

    List.prototype.setAbonentsHtml = function() {
      return this._setActivityPanelUserHtml(this.abonents, this.abonentsListEl, this.abonentsListBlock);
    };

    List.prototype.setHoldHtml = function() {
      return this._setActivityPanelUserHtml(this.hold, this.holdListEl, this.holdBlockEl);
    };

    List.prototype.setQueueHtml = function() {
      return this._setActivityPanelUserHtml(this.queue, this.queueListEl, this.queueBlockEl);
    };

    List.prototype._setActivityPanelUserHtml = function(users, listEl, blockEl) {
      var k, u, usersArray,
        _this = this;

      usersArray = [];
      for (k in users) {
        if (!__hasProp.call(users, k)) continue;
        u = users[k];
        usersArray.push(u);
      }
      this._setUsersHtml(usersArray, listEl, true);
      if (usersArray.length && blockEl.is(':not(:visible)')) {
        blockEl.stop(true, true);
        this.resetStickyHeaders();
        return blockEl.slideDown(50, function() {
          _this.setUserListHeight();
          return _this.initStickyHeaders();
        });
      } else if (usersArray.length === 0 && blockEl.is(':visible')) {
        blockEl.stop(true, true);
        this.resetStickyHeaders();
        return blockEl.slideUp(50, function() {
          _this.setUserListHeight();
          return _this.initStickyHeaders();
        });
      }
    };

    List.prototype._setUsersHtml = function(usersArray, $el, useIndependentCopies) {
      var html, lastDepId, prevLetter, u, userEl, _i, _len;

      html = [];
      lastDepId = null;
      prevLetter = '';
      for (_i = 0, _len = usersArray.length; _i < _len; _i++) {
        u = usersArray[_i];
        userEl = u.getEl(useIndependentCopies);
        if ((userEl != null ? userEl[0] : void 0) != null) {
          html.push(userEl[0]);
        }
        u.showLetter(prevLetter !== u.letter ? true : false);
        prevLetter = u.letter;
      }
      $el.children().detach();
      return $el.html(html);
    };

    List.prototype.setFilter = function(filter, reloadAnyway, notScrollTop) {
      var allDeps, dep, el, exactMatch, oldFilter, renderDep, _i, _len, _ref,
        _this = this;

      if (this.filter === filter && !reloadAnyway) {
        return false;
      }
      oldFilter = this.filter;
      this.filter = filter;
      this.filterLang = filter.match(/^[^А-яёЁ]+$/) ? 'en' : filter.match(/^[^A-z]+$/) ? 'ru' : '';
      exactMatch = false;
      this.timer();
      this.panelUsersFiltered = [];
      allDeps = [];
      renderDep = function(dep) {
        var depExactMatch, el, users, _ref;

        el = dep.getEl(filter !== '');
        if ((el != null ? el[0] : void 0) != null) {
          el = el[0];
        } else {
          return;
        }
        depExactMatch = false;
        _ref = dep.getUsers(filter, _this.showOffline, _this.filterLang), users = _ref[0], depExactMatch = _ref[1];
        _this.panelUsersFiltered = _this.panelUsersFiltered.concat(users);
        if (users.length !== 0) {
          if (!exactMatch) {
            exactMatch = depExactMatch;
          }
          _this._setUsersHtml(users, dep.getContainer());
          if (depExactMatch && exactMatch === depExactMatch) {
            return allDeps.unshift(el);
          } else {
            return allDeps.push(el);
          }
        }
      };
      if (this.showDeps) {
        _ref = this.departments;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          dep = _ref[_i];
          renderDep(dep);
        }
      } else {
        renderDep(this.allUserDep);
      }
      if (!exactMatch && filter.match(/[0-9\(\)\+\-]/)) {
        this.filterFantomUser = this.getUser({
          name: filter,
          number: filter
        }, true);
        this.exactMatchUserDep.clearUsers();
        this.exactMatchUserDep.addUser(this.filterFantomUser);
        el = this.exactMatchUserDep.getEl();
        this._setUsersHtml([this.filterFantomUser], this.exactMatchUserDep.getContainer());
        this.filterFantomUser.showLetter(false);
        if ((el != null ? el[0] : void 0) != null) {
          allDeps.unshift(el[0]);
        }
      } else {
        this.filterFantomUser = false;
      }
      this.scrollContent.children().detach();
      this.scrollContent.html(allDeps);
      if (allDeps.length > 0) {
        $(allDeps[allDeps.length - 1]).find('tr:last').addClass('g_last');
      }
      this.initStickyHeaders();
      if (!notScrollTop) {
        this.userScrollerToTop();
      }
      setTimeout(function() {
        return _this.setUserListHeight();
      }, 1);
      return this.timer(true);
    };

    List.prototype.getUser = function(data, dontRemember) {
      var fantom, numberFormatted, strNumber, _ref;

      this.log("getUser dontRemember=" + dontRemember, data);
      if (typeof data === 'string' || typeof data === 'number') {
        strNumber = data.toString();
        data = {
          number: strNumber
        };
      } else {
        strNumber = data.number.toString();
      }
      this.log("getUser strNumber=" + strNumber);
      numberFormatted = data.phoneFormatted || (typeof oktell.formatPhone === "function" ? oktell.formatPhone(strNumber) : void 0) || strNumber;
      if (!data.numberFormatted) {
        data.numberFormatted = numberFormatted;
      }
      if (!data.isIvr && !dontRemember && ((_ref = this.filterFantomUser) != null ? _ref.number : void 0) === strNumber) {
        this.usersByNumber[strNumber] = this.filterFantomUser;
        data.isFantom = true;
        this.filterFantomUser = false;
      }
      if (!(data.isIvr && !data.number) && this.usersByNumber[strNumber]) {
        if (this.usersByNumber[strNumber].isFantom) {
          this.usersByNumber[strNumber].init(data);
        }
        return this.usersByNumber[strNumber];
      }
      fantom = new CUser({
        number: strNumber,
        numberFormatted: numberFormatted,
        name: data.name,
        isFantom: true,
        state: ((data != null ? data.state : void 0) != null ? data.state : 1),
        isIvr: data != null ? data.isIvr : void 0,
        ivrName: data != null ? data.ivrName : void 0
      });
      if (!dontRemember) {
        this.usersByNumber[strNumber] = fantom;
      }
      return fantom;
    };

    List.prototype.reloadActions = function() {
      var _this = this;

      return setTimeout(function() {
        var actions, phone, user, _ref, _ref1, _ref2, _ref3, _results;

        _ref = _this.userWithGeneratedButtons;
        for (phone in _ref) {
          if (!__hasProp.call(_ref, phone)) continue;
          user = _ref[phone];
          actions = user.loadActions();
        }
        _ref1 = _this.abonents;
        for (phone in _ref1) {
          user = _ref1[phone];
          user.loadActions();
        }
        _ref2 = _this.queue;
        for (phone in _ref2) {
          user = _ref2[phone];
          user.loadActions();
        }
        _ref3 = _this.panelUsersFiltered;
        _results = [];
        for (phone in _ref3) {
          user = _ref3[phone];
          _results.push(user.loadActions());
        }
        return _results;
      }, 100);
    };

    List.prototype.timer = function(stop) {
      if (stop && this._time) {
        1;
      }
      if (!stop) {
        return this._time = Date.now();
      }
    };

    List.prototype.beforeUserAction = function(user, action) {
      if (this.filterFantomUser && user === this.filterFantomUser) {
        return this.clearFilter();
      }
    };

    List.prototype.config = function(data) {
      var e, k, v, _ref;

      if (!this._config) {
        if ((typeof localStorage !== "undefined" && localStorage !== null ? localStorage.oktellPanel : void 0) && (typeof JSON !== "undefined" && JSON !== null ? JSON.parse : void 0)) {
          try {
            this._config = JSON.parse(localStorage.oktellPanel);
          } catch (_error) {
            e = _error;
          }
          if ((this._config == null) || typeof this._config !== 'object') {
            this._config = {};
          }
        } else {
          this._config = {};
        }
        _ref = this.defaultConfig;
        for (k in _ref) {
          if (!__hasProp.call(_ref, k)) continue;
          v = _ref[k];
          if (this._config[k] == null) {
            this._config[k] = v;
          }
        }
      }
      if (data != null) {
        for (k in data) {
          if (!__hasProp.call(data, k)) continue;
          v = data[k];
          this._config[k] = v;
        }
        if (localStorage && (typeof JSON !== "undefined" && JSON !== null ? JSON.stringify : void 0)) {
          localStorage.setItem('oktellPanel', JSON.stringify(this._config));
        }
      }
      this.showDeps = this._config.showDeps;
      this.showOffline = this._config.showOffline;
      this.buttonShowOffline.toggleClass('g_active', !this.showOffline);
      this.buttonShowOffline.attr('title', this.showOffline ? this.langs.panel.showOnlineOnly : this.langs.panel.showOnlineOnlyCLicked);
      this.buttonShowDeps.toggleClass('g_active', this.showDeps);
      this.buttonShowDeps.attr('title', this.showDeps ? this.langs.panel.showDepartmentsClicked : this.langs.panel.showDepartments);
      return this._config;
    };

    return List;

  })();
  Popup = (function() {
    Popup.prototype.logGroup = 'Popup';

    function Popup(popupEl, oktell, ringtone) {
      var abonentsSet,
        _this = this;

      this.el = popupEl;
      this.ringtone = ringtone;
      this.absContainer = this.el.find('.b_content');
      this.abonentEl = this.absContainer.find('.b_abonent').remove();
      this.answerActive = false;
      this.answerButttonEl = this.el.find('.j_answer');
      this.puckupEl = this.el.find('.j_pickup');
      this.el.find('.j_abort_action').bind('click', function() {
        _this.hide();
        _this.playRingtone(false);
        return oktell.endCall();
      });
      this.el.find('.j_answer').bind('click', function() {
        _this.hide();
        _this.playRingtone(false);
        return oktell.answer();
      });
      this.el.find('.j_close_action').bind('click', function() {
        return _this.hide();
      });
      this.el.find('i.o_close').bind('click', function() {
        return _this.hide();
      });
      abonentsSet = false;
      oktell.on('connect', function() {
        return _this.users = oktell.getUsers();
      });
      oktell.on('webrtcRingStart', function(name, identity) {
        var _ref;

        _this.log('webrtcRingStart, ' + identity);
        _this.playRingtone(true);
        _this.answerButtonVisible(true);
        if (!abonentsSet) {
          _this.setAbonents([
            {
              name: name,
              phone: ((_ref = identity.match(/<sip:([\s\S]+?)@/)) != null ? _ref[1] : void 0) || ''
            }
          ]);
        }
        return _this.show();
      });
      oktell.on('ringStart backRingStart', function(abonents) {
        _this.log('ringStart', abonents);
        _this.setAbonents(abonents);
        setTimeout(function() {
          var _ref, _ref1;

          if ((abonents != null ? (_ref = abonents[0]) != null ? _ref.phone : void 0 : void 0) && ((_ref1 = oktell.getPhoneActions(abonents[0].phone)) != null ? typeof _ref1.indexOf === "function" ? _ref1.indexOf('answer') : void 0 : void 0) !== -1) {
            return _this.answerButtonVisible(true);
          }
        }, 10);
        abonentsSet = true;
        return _this.show();
      });
      oktell.on('ringStop', function() {
        _this.playRingtone(false);
        _this.hide();
        abonentsSet = false;
        return _this.setAbonents([]);
      });
      this.answerButtonVisible(false);
    }

    Popup.prototype.playRingtone = function(play) {
      if (this.ringtone) {
        if (play) {
          this.ringtone.currentTime = 0;
          return this.ringtone.play();
        } else {
          return this.ringtone.pause();
        }
      }
    };

    Popup.prototype.show = function(abonents) {
      this.log('Popup show! ', abonents);
      return this.el.fadeIn(200);
    };

    Popup.prototype.hide = function() {
      this.playRingtone(false);
      return this.el.fadeOut(200);
    };

    Popup.prototype.setAbonents = function(abonents) {
      var _this = this;

      this.absContainer.empty();
      return $.each(abonents, function(i, abonent) {
        var el, foundInUsers, name, phone, phoneFormatted, u, user, _ref, _ref1, _ref2;

        if (!abonent) {
          _this.log('setAbonent: bad abonent');
          return;
        }
        phoneFormatted = (_ref = abonent.phoneFormatted) != null ? typeof _ref.toString === "function" ? _ref.toString() : void 0 : void 0;
        phone = (_ref1 = abonent.phone) != null ? typeof _ref1.toString === "function" ? _ref1.toString() : void 0 : void 0;
        name = (_ref2 = abonent.name) != null ? typeof _ref2.toString === "function" ? _ref2.toString() : void 0 : void 0;
        if (name === phone) {
          foundInUsers = false;
          for (u in _this.users) {
            user = _this.users[u];
            if (user.number === phone) {
              name = user.name;
              foundInUsers = true;
              break;
            }
          }
          _this.log("Found " + phone + " in users = " + foundInUsers);
          if (!foundInUsers) {
            name = phoneFormatted || phone;
            phone = '';
          }
        } else {
          name = abonent.name.toString();
        }
        el = _this.abonentEl.clone();
        el.find('span:first').text(name);
        el.find('span:last').text(phone);
        return _this.absContainer.append(el);
      });
    };

    Popup.prototype.answerButtonVisible = function(val) {
      if (val) {
        this.answerActive = true;
        this.answerButttonEl.show();
        this.puckupEl.hide();
      } else {
        this.answerActive = false;
        this.answerButttonEl.hide();
        this.puckupEl.show();
      }
      return this.answerActive;
    };

    Popup.prototype.setCallbacks = function(onAnswer, onTerminate) {
      this.onAnswer = onAnswer;
      return this.onTerminate = onTerminate;
    };

    return Popup;

  })();
  PermissionsPopup = (function() {
    function PermissionsPopup(popupEl, oktellVoice) {
      var _this = this;

      this.el = popupEl;
      if (oktellVoice) {
        oktellVoice.on('mediaPermissionsRequest', function() {
          return _this.show();
        });
        oktellVoice.on('mediaPermissionsAccept', function() {
          return _this.hide();
        });
        oktellVoice.on('mediaPermissionsRefuse', function() {
          if (typeof oktell !== "undefined" && oktell !== null) {
            oktell.endCall();
          }
          return _this.hide();
        });
      }
    }

    PermissionsPopup.prototype.show = function() {
      this.log('Permissions Popup show!');
      return this.el.show();
    };

    PermissionsPopup.prototype.hide = function() {
      return this.el.fadeOut(200);
    };

    return PermissionsPopup;

  })();
  Error = (function() {
    Error.prototype.logGroup = 'Error';

    Error.prototype.errorTypes = {
      1: 'usingOktellClient',
      2: 'loginPass',
      3: 'unavailable'
    };

    function Error(errorEl, oktell) {
      var _this = this;

      this.el = errorEl;
      oktell.on('connecting', function() {
        return _this.hide();
      });
      oktell.on('disconnect', function(reason) {
        _this.log('disconnect with reason ' + reason.code + ' ' + reason.message);
        if (reason.code === 12) {
          return _this.show(3, oktell.getMyInfo().login);
        }
      });
      oktell.on('connectError', function(error) {
        _this.log('connect error ' + error.errorCode + ' ' + error.errorMessage);
        switch (error.errorCode) {
          case 12:
            return _this.show(1, oktell.getMyInfo().login);
          case 13:
            return _this.show(2, oktell.getMyInfo().login);
          case 1204:
            return _this.show(1, oktell.getMyInfo().login);
          case 1202:
            return _this.show(2, oktell.getMyInfo().login);
          default:
            return _this.show(3, oktell.getMyInfo().login);
        }
      });
    }

    Error.prototype.onShow = function() {};

    Error.prototype.show = function(errorType, username) {
      var type, _ref, _ref1;

      if (!this.errorTypes[errorType]) {
        return false;
      }
      this.log('show ' + errorType);
      type = this.errorTypes[errorType];
      this.el.find('p:eq(0)').text(this.langs[type].header.replace('%username%', username));
      this.el.find('p:eq(1)').text(((_ref = this.langs[type].message) != null ? _ref.replace('%username%', username) : void 0) || '');
      this.el.find('p:eq(3)').text(((_ref1 = this.langs[type].message2) != null ? _ref1.replace('%username%', username) : void 0) || '');
      if (typeof this.onShow === "function") {
        this.onShow();
      }
      return this.el.fadeIn(200);
    };

    Error.prototype.hide = function() {
      return this.el.fadeOut(200);
    };

    return Error;

  })();
  defaultOptions = {
    position: 'right',
    dynamic: false,
    oktell: window.oktell,
    oktellVoice: window.oktellVoice,
    ringtone: 'ringtone.mp3',
    debug: false,
    lang: 'ru',
    showAvatar: false,
    hideOnDisconnect: true,
    useNotifies: false,
    withoutPermissionsPopup: false,
    withoutCallPopup: false,
    withoutError: false
  };
  langs = {
    ru: {
      panel: {
        dtmf: 'донабор',
        dtmfPanelName: 'Донабор',
        inTalk: 'В разговоре',
        onHold: 'На удержании',
        queue: 'Очередь ожидания',
        inputPlaceholder: 'введите имя или номер',
        withoutDepartment: 'без отдела',
        showDepartments: 'Группировать по отделам',
        showDepartmentsClicked: 'Показать общим списком',
        showOnlineOnly: 'Показать только online',
        showOnlineOnlyCLicked: 'Показать всех'
      },
      actions: {
        answer: 'Ответить',
        call: 'Позвонить',
        conference: 'Конференция',
        transfer: 'Перевести',
        toggle: 'Переключиться',
        intercom: 'Интерком',
        endCall: 'Завершить',
        ghostListen: 'Прослушка',
        ghostHelp: 'Помощь',
        hold: 'Удержание',
        resume: 'Продолжить',
        dtmf: 'Донабор'
      },
      callPopup: {
        title: 'Входящий вызов',
        hide: 'Скрыть',
        answer: 'Ответить',
        reject: 'Отклонить',
        undefinedNumber: 'Номер не определен',
        goPickup: 'Поднимите трубку',
        answer: 'Ответить'
      },
      permissionsPopup: {
        header: 'Запрос на доступ к микрофону',
        text: 'Для использования веб-телефона необходимо разрешить браузеру доступ к микрофону.'
      },
      error: {
        title: 'Ошибка',
        usingOktellClient: {
          header: 'Пользователь «%username%» использует стандартный Oktell-клиент.',
          message: 'Одновременная работа двух типов клиентских приложений невозможна.',
          message2: 'Закройте стандартный Oktell-клиент и повторите попытку.'
        },
        loginPass: {
          header: 'Пароль для пользователя «%username%» не подходит.',
          message: 'Проверьте правильность имени пользователя и пароля.'
        },
        unavailable: {
          header: 'Сервер телефонии Oktell не доступен.',
          message: 'Убедитесь что сервер телефонии работает и проверьте настройки соединения.'
        }
      }
    },
    en: {
      panel: {
        dtmf: 'dtmf',
        dtmfPanelName: 'DTMF',
        inTalk: 'In conversation',
        onHold: 'On hold',
        queue: 'Wait queue',
        inputPlaceholder: 'Enter name or number',
        withoutDepartment: 'Without department',
        showDepartments: 'Show departments',
        showDepartmentsClicked: 'Hide departments',
        showOnlineOnly: 'Show online only',
        showOnlineOnlyCLicked: 'Show all'
      },
      actions: {
        answer: 'Answer',
        call: 'Dial',
        conference: 'Conference',
        transfer: 'Transfer',
        toggle: 'Switch',
        intercom: 'Intercom',
        endCall: 'End',
        ghostListen: 'Audition',
        ghostHelp: 'Help',
        hold: 'Hold',
        resume: 'Resume',
        dtmf: 'DTMF'
      },
      callPopup: {
        title: 'Incoming call',
        hide: 'Hide',
        answer: 'Answer',
        reject: 'Decline',
        undefinedNumber: 'Phone number is not defined',
        goPickup: 'Pick up the phone',
        answer: 'Answer'
      },
      permissionsPopup: {
        header: 'Request for access to the microphone',
        text: 'To use the web-phone you need to allow browser access to the microphone.'
      },
      error: {
        title: 'Error',
        usingOktellClient: {
          header: 'User «%username%» uses standard Oktell client application.',
          message: 'Simultaneous work of two types of client applications is not possible.',
          message2: 'Close standard Oktell client application and try again.'
        },
        loginPass: {
          header: 'Wrong password for user «%username%».',
          message: 'Make sure that the username and password are correct.'
        },
        unavailable: {
          header: 'Oktell server is not available.',
          message: 'Make sure that Oktell server is running and check your connection.'
        }
      }
    },
    cz: {
      panel: {
        dtmf: 'dtmf',
        dtmfPanelName: 'DTMF',
        inTalk: 'V rozhovoru',
        onHold: 'Na hold',
        queue: 'Fronta čekaní',
        inputPlaceholder: 'zadejte jméno nebo číslo',
        withoutDepartment: 'Bez oddělení',
        showDepartments: 'Zobrazit oddělení',
        showDepartmentsClicked: 'Skrýt oddělení',
        showOnlineOnly: 'Zobrazit pouze online',
        showOnlineOnlyCLicked: 'Zobrazit všechny'
      },
      actions: {
        answer: 'Odpověď',
        call: 'Zavolat',
        conference: 'Konference',
        transfer: 'Převést',
        toggle: 'Přepnout',
        intercom: 'Intercom',
        endCall: 'Ukončit',
        ghostListen: 'Odposlech',
        ghostHelp: 'Nápověda',
        hold: 'Udržet',
        resume: 'Pokračovat',
        dtmf: 'DTMF'
      },
      callPopup: {
        title: 'Příchozí hovor',
        hide: 'Schovat',
        answer: 'Odpovědět',
        reject: 'Odmítnout',
        undefinedNumber: '',
        goPickup: 'Zvedněte sluchátko',
        answer: 'Odpovědět'
      },
      permissionsPopup: {
        header: 'Žádost o přístup k mikrofonu',
        text: 'Abyste mohli používat telefon, musíte povolit prohlížeče přístup k mikrofonu.'
      },
      error: {
        title: 'Chyba',
        usingOktellClient: {
          header: 'Uživatel «%username%» používá standardní Oktell klientské aplikace.',
          message: 'Současnou práci dvou typů klientských aplikací není možné.',
          message2: 'Zavřít Oktell standardní klientskou aplikaci a zkuste to znovu.'
        },
        loginPass: {
          header: 'Chybné heslo uživatele «%username%».',
          message: 'Ujistěte se, že uživatelské jméno a heslo jsou správné.'
        },
        unavailable: {
          header: 'Oktell server není k dispozici.',
          message: 'Ujistěte se, že Oktell server běží a zkontrolujte připojení.'
        }
      }
    }
  };
  options = null;
  actionListEl = null;
  oktell = null;
  oktellConnected = false;
  afterOktellConnect = null;
  list = null;
  popup = null;
  permissionsPopup = null;
  error = null;
  panelEl = null;
  contEl = null;
  actionButtonContainerClass = 'oktellPanelActionButton';
  getOptions = function() {
    return options || defaultOptions;
  };
  isMobileDevice = navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i) ? true : false;
  useSticky = !isMobileDevice;
  useNativeScroll = isMobileDevice;
  checkCssAnimationSupport = function() {
    var div, divStyle, suffix, testProperties, v, _i, _len;

    div = document.createElement("div");
    divStyle = div.style;
    suffix = "Transform";
    testProperties = ["o" + suffix, "ms" + suffix, "webkit" + suffix, "Webkit" + suffix, "Moz" + suffix, 'transform'];
    for (_i = 0, _len = testProperties.length; _i < _len; _i++) {
      v = testProperties[_i];
      if (divStyle[v] != null) {
        return true;
      }
    }
    return divStyle;
    return false;
  };
  logStr = '';
  log = function() {
    var args, d, dd, e, fnName, i, t, val, _i, _len;

    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!getOptions().debug) {
      return;
    }
    d = new Date();
    dd = d.getFullYear() + '-' + (d.getMonth() < 10 ? '0' : '') + d.getMonth() + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate();
    t = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds() + ':' + (d.getMilliseconds() + 1000).toString().substr(1);
    logStr += dd + ' ' + t + ' | ';
    fnName = 'log';
    if (args[0].toString().toLowerCase() === 'error') {
      fnName = 'error';
    }
    for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
      val = args[i];
      if (typeof val === 'object') {
        try {
          logStr += JSON.stringify(val);
        } catch (_error) {
          e = _error;
          logStr += val.toString();
        }
      } else {
        logStr += val;
      }
      logStr += ' | ';
    }
    logStr += "\n\n";
    args.unshift('Oktell-Panel.js ' + t + ' |' + (typeof this.logGroup === 'string' ? ' ' + this.logGroup + ' |' : ''));
    try {
      return console[fnName].apply(console, args || []);
    } catch (_error) {
      e = _error;
    }
  };
  templates = {
    'templates/actionButton.html': '<ul class="oktell_button_action"><li class="g_first"><i></i></li><li class="g_last drop_down"><i></i></li></ul>',
    'templates/actionList.html': '<ul class="oktell_actions_group_list"><li class="{{css}}" data-action="{{action}}"><i></i><span>{{actionText}}</span></li></ul>',
    'templates/user.html': '<tr class="b_contact"><td class="b_capital_letter"><span></span></td><td class="b_contact_avatar {{css}}"><img src="{{avatarLink32x32}}"><i></i><div class="o_busy"></div></td><td class="b_contact_title"><div class="wrapword" title="{{name}}"><span class="b_contact_name"><b>{{name1}}</b><span>{{name2}}</span></span><span class="o_number">{{number}}</span><span class="o_dtmf">{{dtmf}}</span></div></td><td class="b_contact_status"><div class="o_dot_status"></div>{{button}}</td></tr>',
    'templates/department.html': '<tr class="b_contact"><td class="b_contact_department" colspan="3">{{department}}</td></tr>',
    'templates/dep.html': '<div class="b_department"><div class="b_department_header"><div class="h_shadow_top"><span>{{department}}</span></div></div><table class="b_main_list"><tbody></tbody></table></div>',
    'templates/usersTable.html': '<table class="b_main_list m_without_department"><tbody></tbody></table>',
    'templates/panel.html': '<div class="oktell_panel"><div class="i_panel_bookmark"><div class="i_panel_bookmark_bg"></div></div><div class="h_panel_bg"><div class="b_header"><ul class="b_list_filter"><li class="i_group"></li><li class="i_online"></li></ul></div><div class="h_padding"><div class="b_marks i_conference j_abonents"><div class="h_shadow_top"><div class="b_marks_noise"><p class="b_marks_header"><span class="b_marks_label">{{inTalk}}</span><span class="b_marks_time"></span></p><table><tbody></tbody></table></div></div></div><div class="b_marks i_extension" style="display: none"><div class="h_shadow_top"><div class="b_marks_noise"><p class="b_marks_header"><span class="b_marks_label">{{dtmfPanelName}}</span></p><div class="h_btn-group"><div class="btn-group"><button class="btn btn-small">1</button><button class="btn btn-small">2</button><button class="btn btn-small">3</button><button class="btn btn-small">4</button><button class="btn btn-small">5</button><button class="btn btn-small">6</button><button class="btn btn-small">7</button><button class="btn btn-small">8</button><button class="btn btn-small">9</button><button class="btn btn-small">0</button></div><div class="btn-group"><button class="btn btn-small">&lowast;</button><button class="btn btn-small">#</button></div></div></div></div><i class="o_close"></i></div><div class="b_marks i_flash j_hold"><div class="h_shadow_top"><div class="b_marks_noise"><p class="b_marks_header"><span class="b_marks_label">{{onHold}}</span></p><table class="j_table_favorite"><tbody></tbody></table></div></div></div><div class="b_marks i_flash j_queue"><div class="h_shadow_top"><div class="b_marks_noise"><p class="b_marks_header"><span class="b_marks_label">{{queue}}</span></p><table class="j_table_queue"><tbody></tbody></table></div></div></div><div class="b_inconversation j_phone_block"><table class="j_table_phone"><tbody></tbody></table></div><div class="b_marks i_phone"><div class="h_shadow_top"><div class="h_phone_number_input"><div class="i_phone_state_bg"></div><div class="h_input_padding"><div class="jInputClear_hover"><input class="b_phone_number_input" type="text" placeholder="{{inputPlaceholder}}"><span class="jInputClear_close">&times;</span></div></div></div></div></div><div class="b_sticky_header_container"></div><div class="h_main_list j_main_list"></div></div></div></div>',
    'templates/callPopup.html': '<div class="oktell_panel_popup" style="display: none"><div class="m_popup_staff"><div class="m_popup_data"><header><div class="h_header_bg"><i class="o_close"></i><h2>{{title}}</h2></div></header><div class="b_content"><div class="b_abonent"><span data-bind="text: name"></span>&nbsp;<span class="g_light" data-bind="textPhone: number"></span></div></div><div class="footer"><div class="b_take_phone j_pickup"><i></i>&nbsp;<span>{{goPickup}}</span></div><button class="oktell_panel_btn m_big m_button_green j_answer" style="margin-right: 20px; float: left"><i></i>{{answer}}</button><button class="oktell_panel_btn m_big j_close_action">{{hide}}</button><button class="oktell_panel_btn m_big m_button_red j_abort_action"><i></i>{{reject}}</button></div></div></div></div>',
    'templates/permissionsPopup.html': '<div class="oktell_panel_popup" style="display: none"><div class="m_popup_staff"><div class="m_popup_data"><header><div class="h_header_bg"><h2>{{header}}</h2></div></header><div class="b_content"><p>{{text}}</p></div></div></div></div>',
    'templates/error.html': '<div class="b_error m_form" style="display: none"><div class="h_padding"><h4>{{title}}</h4><p class="b_error_alert"></p><p class="g_light"></p><p class="g_light"></p></div></div>'
  };
  loadTemplate = function(path) {
    var html;

    if (path[0] === '/') {
      path = path.substr(1);
    }
    if (templates[path] != null) {
      return templates[path];
    }
    html = '';
    $.ajax({
      url: path,
      async: false,
      success: function(data) {
        return html = data;
      }
    });
    return html;
  };
  actionButtonHtml = loadTemplate('/templates/actionButton.html');
  actionListHtml = loadTemplate('/templates/actionList.html');
  userTemplateHtml = loadTemplate('/templates/user.html');
  departmentTemplateHtml = loadTemplate('/templates/department.html');
  departmentTemplateHtml = loadTemplate('/templates/dep.html');
  usersTableHtml = loadTemplate('/templates/usersTable.html');
  panelHtml = loadTemplate('/templates/panel.html');
  popupHtml = loadTemplate('/templates/callPopup.html');
  permissionsPopupHtml = loadTemplate('/templates/permissionsPopup.html');
  errorHtml = loadTemplate('/templates/error.html');
  List.prototype.usersTableTemplate = usersTableHtml;
  CUser.prototype.buttonTemplate = actionButtonHtml;
  CUser.prototype.log = log;
  List.prototype.log = log;
  Popup.prototype.log = log;
  PermissionsPopup.prototype.log = log;
  Department.prototype.log = log;
  Error.prototype.log = log;
  Department.prototype.template = departmentTemplateHtml;
  panelWasInitialized = false;
  initPanel = function(opts) {
    var animOptHide, animOptShow, bookmarkAnimOptHide, bookmarkAnimOptShow, bookmarkPos, contOpt, cssAnimNow, enableMoving, errorEl, hidePanel, hideTimer, killPanelHideTimer, maxPosClose, minPosOpen, mouseOnPanel, pageX, panelBookmarkEl, panelHideTimer, panelMinPos, panelPos, panelStatus, permissionsPopupEl, popupEl, ringtone, showPanel, showTimer, touchMoving, useContainer, useCssAnim, _panelStatus, _ref,
      _this = this;

    panelWasInitialized = true;
    options = $.extend({}, defaultOptions, opts || {});
    useContainer = false;
    contOpt = ((_ref = getOptions().container) != null ? _ref[0] : void 0) || getOptions().container;
    contEl = null;
    if (contOpt && (typeof HTMLElement === "object" && contOpt instanceof HTMLElement) || ((contOpt != null ? contOpt.nodeType : void 0) === 1 && typeof contOpt.nodeName === "string")) {
      contEl = $(contOpt);
      useContainer = true;
    } else {
      contEl = $('body');
    }
    if (useContainer) {
      useSticky = false;
      useNativeScroll = true;
    }
    if (options.oktellVoice) {
      if (options.oktellVoice.isOktellVoice === true) {
        options.oktellVoice = options.oktellVoice;
      } else if (window.oktellVoice(window.oktellVoice.isOktellVoice === true)) {
        options.oktellVoice = window.oktellVoice;
      }
    }
    if (getOptions().useNotifies && window.webkitNotifications && window.webkitNotifications.checkPermission() === 1) {
      webkitNotifications.requestPermission(function() {});
    }
    Department.prototype.withoutDepName = List.prototype.withoutDepName = CUser.prototype.withoutDepName = 'zzzzz_without';
    langs = langs[options.lang] || langs.ru;
    CUser.prototype.template = userTemplateHtml.replace('{{button}}', actionButtonHtml);
    panelHtml = panelHtml.replace('{{inTalk}}', langs.panel.inTalk).replace('{{dtmfPanelName}}', langs.panel.dtmfPanelName).replace('{{onHold}}', langs.panel.onHold).replace('{{queue}}', langs.panel.queue).replace('{{inputPlaceholder}}', langs.panel.inputPlaceholder);
    List.prototype.langs = langs;
    List.prototype.departmentTemplate = departmentTemplateHtml;
    Error.prototype.langs = langs.error;
    CUser.prototype.langs = langs;
    Department.prototype.langs = langs;
    panelEl = $(panelHtml);
    if (!getOptions().showAvatar) {
      panelEl.addClass('noavatar');
    }
    actionListEl = $(actionListHtml);
    $('body').append(actionListEl);
    oktell = getOptions().oktell;
    CUser.prototype.formatPhone = oktell.formatPhone;
    ringtone = null;
    if (getOptions().ringtone) {
      ringtone = $('<audio src="' + getOptions().ringtone + '" id="oktell_panel_ringtone" preload="auto"></audio>')[0];
      $("body").append(ringtone);
      ringtone.loop = true;
    }
    if (!getOptions().withoutCallPopup) {
      popupHtml = popupHtml.replace('{{title}}', langs.callPopup.title).replace('{{goPickup}}', langs.callPopup.goPickup).replace('{{answer}}', langs.callPopup.answer).replace('{{hide}}', langs.callPopup.hide).replace('{{reject}}', langs.callPopup.reject);
      popupEl = $(popupHtml);
      $('body').append(popupEl);
      popup = new Popup(popupEl, oktell, ringtone);
    }
    if (!getOptions().withoutPermissionsPopup) {
      permissionsPopupHtml = permissionsPopupHtml.replace('{{header}}', langs.permissionsPopup.header).replace('{{text}}', langs.permissionsPopup.text);
      permissionsPopupEl = $(permissionsPopupHtml);
      $('body').append(permissionsPopupEl);
      permissionsPopup = new PermissionsPopup(permissionsPopupEl, getOptions().oktellVoice);
    }
    if (!getOptions().withoutError) {
      errorHtml = errorHtml.replace('{{title}}', langs.error.title);
      errorEl = $(errorHtml);
      panelEl.find('.h_panel_bg:first').append(errorEl);
      error = new Error(errorEl, oktell);
    }
    panelPos = getOptions().position;
    animOptShow = {};
    animOptShow[panelPos] = '0px';
    animOptHide = {};
    animOptHide[panelPos] = '-281px';
    panelMinPos = -281;
    panelEl.hide();
    if (useContainer) {
      panelEl.addClass('contained');
    }
    contEl.append(panelEl);
    list = new List(oktell, panelEl, actionListEl, afterOktellConnect, getOptions(), useContainer, useSticky, useNativeScroll, getOptions().debug);
    if (getOptions().debug) {
      window.wList = list;
      window.wPopup = popup;
      window.wError = error;
    }
    if (panelPos === "right") {
      panelEl.addClass("right");
    } else if (panelPos === "left") {
      panelEl.addClass("left");
    }
    if (getOptions().dynamic) {
      panelEl.addClass("dynamic");
    }
    if (!useContainer) {
      panelBookmarkEl = panelEl.find('.i_panel_bookmark');
      bookmarkAnimOptShow = {};
      bookmarkPos = panelPos === 'left' ? 'right' : 'left';
      bookmarkAnimOptShow[bookmarkPos] = '0px';
      bookmarkAnimOptHide = {};
      bookmarkAnimOptHide[bookmarkPos] = '-40px';
      mouseOnPanel = false;
      panelHideTimer = false;
      _panelStatus = 'closed';
      panelStatus = function(st) {
        if (st && st !== _panelStatus) {
          _panelStatus = st;
        }
        return _panelStatus;
      };
      killPanelHideTimer = function() {
        clearTimeout(panelHideTimer);
        return panelHideTimer = false;
      };
      useCssAnim = checkCssAnimationSupport();
      showTimer = null;
      hideTimer = null;
      cssAnimNow = false;
      showPanel = function() {
        list.beforeShow();
        panelStatus('opening');
        panelBookmarkEl.css(bookmarkAnimOptShow);
        if (useCssAnim) {
          if (!cssAnimNow) {
            cssAnimNow = true;
            panelEl.css('right', '');
            clearTimeout(showTimer);
            panelEl.removeClass('hide_t_' + panelPos).addClass('show_t_' + panelPos);
            return showTimer = setTimeout(function() {
              panelEl.css('right', '0px');
              panelEl.removeClass('show_t_' + panelPos);
              list.afterShow();
              panelEl.addClass("g_hover");
              panelStatus('open');
              panelBookmarkEl.css(bookmarkAnimOptShow);
              return cssAnimNow = false;
            }, 200);
          }
        } else {
          panelEl.stop(true, true);
          return panelEl.animate(animOptShow, 100, "swing", function() {
            list.afterShow();
            panelEl.addClass("g_hover");
            panelStatus('open');
            return panelBookmarkEl.css(bookmarkAnimOptShow);
          });
        }
      };
      hidePanel = function() {
        var _this = this;

        if (useCssAnim) {
          if (!cssAnimNow) {
            panelStatus('closing');
            list.beforeHide();
            cssAnimNow = true;
            panelEl.css('right', '');
            clearTimeout(hideTimer);
            panelEl.removeClass('show_t_' + panelPos).addClass('hide_t_' + panelPos);
            return hideTimer = setTimeout(function() {
              panelEl.css('right', '-281px');
              panelEl.removeClass('hide_t_' + panelPos);
              list.afterHide();
              panelEl.removeClass("g_hover");
              panelBookmarkEl.css(bookmarkAnimOptHide);
              panelStatus('closed');
              return cssAnimNow = false;
            }, 400);
          }
        } else {
          panelStatus('closing');
          list.beforeHide();
          panelEl.stop(true, true);
          return panelEl.animate(animOptHide, 300, "swing", function() {
            panelEl.css({
              panelPos: 0
            });
            list.afterHide();
            panelEl.removeClass("g_hover");
            panelBookmarkEl.css(bookmarkAnimOptHide);
            return panelStatus('closed');
          });
        }
      };
      panelEl.bind("mouseenter", function() {
        mouseOnPanel = true;
        killPanelHideTimer();
        if (parseInt(panelEl.css(panelPos)) < 0 && (panelStatus() === 'closed' || panelStatus() === 'closing')) {
          showPanel();
        }
        return true;
      });
      pageX = false;
      minPosOpen = -250;
      maxPosClose = 30;
      touchMoving = false;
      enableMoving = false;
      panelBookmarkEl.bind('touchstart', function() {
        if (panelStatus() === 'closed') {
          panelStatus('touchopening');
        } else if (panelStatus() === 'open') {
          panelStatus('touchclosing');
        }
        return true;
      });
      panelBookmarkEl.bind('touchmove', function(e) {
        var pos, t, _ref1, _ref2;

        if (panelStatus() === 'touchopening' || panelStatus() === 'touchclosing') {
          touchMoving = true;
        }
        if (enableMoving && touchMoving) {
          t = e != null ? (_ref1 = e.originalEvent) != null ? (_ref2 = _ref1.touches) != null ? _ref2[0] : void 0 : void 0 : void 0;
          if (t) {
            if (pageX !== false) {
              pos = parseInt(panelEl.css(panelPos));
              panelEl.css(panelPos, Math.max(panelMinPos, Math.min(0, pos + pageX - t.pageX)) + 'px');
            }
            pageX = t.pageX;
          }
        }
        return true;
      });
      panelBookmarkEl.bind('touchend', function() {
        var pos;

        if (!touchMoving) {
          if (panelStatus() === 'touchopening') {
            showPanel();
          }
        } else {
          touchMoving = false;
          pos = parseInt(panelEl.css(panelPos));
          if (panelStatus() === 'touchopening') {
            if (pos > minPosOpen) {
              showPanel();
            } else {
              hidePanel();
            }
          } else if (panelStatus() === 'touchclosing') {
            if (pos < maxPosClose) {
              hidePanel();
            } else {
              openPanel();
            }
          }
        }
        return true;
      });
      panelBookmarkEl.bind('touchcancel', function() {
        return true;
      });
      $(window).bind('touchcancel', function(e) {
        return true;
      });
      $(window).bind('touchend', function(e) {
        var parents, parentsArr, target;

        target = $(e.target);
        parents = target.parents();
        parentsArr = parents.toArray();
        if (parentsArr.indexOf(panelEl[0]) === -1) {
          hidePanel();
        }
        return true;
      });
      panelEl.bind("mouseleave", function() {
        mouseOnPanel = false;
        return true;
      });
      $('html').bind('mouseleave', function(e) {
        killPanelHideTimer();
        return true;
      });
      $('html').bind('mousemove', function(e) {
        if (panelStatus() === 'open' && !mouseOnPanel && panelHideTimer === false && !list.dropdownOpenedOnPanel) {
          panelHideTimer = setTimeout(function() {
            return hidePanel();
          }, 100);
          1;
        }
        return true;
      });
    }
    $('.oktell_actions_group_list').on('touchstart', function(e) {
      e.stopPropagation();
      return true;
    });
    return $('body').on('touchstart', function(e) {
      return list != null ? typeof list.hideActionListDropdown === "function" ? list.hideActionListDropdown() : void 0 : void 0;
    });
  };
  afterOktellConnect = function() {
    return oktellConnected = true;
  };
  initButtonOnElement = function(el) {
    var button, phone;

    el.addClass(getOptions().buttonCss);
    phone = el.attr('data-phone');
    el.empty();
    if (phone) {
      button = list.getUserButtonForPlugin(phone);
      return el.html(button);
    }
  };
  addActionButtonToEl = function(el) {
    return initButtonOnElement(el);
  };
  initActionButtons = function(selector) {
    return $(selector + ":not(." + actionButtonContainerClass + ")").each(function() {
      return addActionButtonToEl($(this));
    });
  };
  $.oktellPanel = function(arg) {
    if (typeof arg === 'string') {
      if (panelWasInitialized) {
        return initActionButtons(arg);
      }
    } else if (!panelWasInitialized) {
      return initPanel(arg);
    }
  };
  $.fn.oktellButton = function() {
    return $(this).each(function() {
      return addActionButtonToEl($(this));
    });
  };
  $.fn.oktellPanel = function() {
    var args;

    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!panelWasInitialized) {
      args.container = $(this);
      return $.oktellPanel.apply(window, args);
    } else if ($(this)[0] === (panelEl != null ? panelEl[0] : void 0)) {
      return $.oktellPanel.apply(window, args);
    }
  };
  $.oktellPanel.show = function() {
    return list.showPanel();
  };
  return $.oktellPanel.hide = function() {
    return list.hidePanel();
  };
})($);
