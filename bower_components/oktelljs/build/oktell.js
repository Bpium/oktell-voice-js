/*
 * Oktell.js
 * version 1.7.1
 * http://js.oktell.ru/
 */

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> */
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

// Oktell
Oktell = (function(){

	var self = this;
	var JSON = {};
	(function () {
		function f(n) {
			return n < 10 ? '0' + n : n;
		}
		if (typeof Date.prototype.toOktellJSON !== 'function') {
			Date.prototype.toOktellJSON = function (key) {
				return isFinite(this.valueOf()) ?
					this.getUTCFullYear()   + '-' +
						f(this.getUTCMonth() + 1) + '-' +
						f(this.getUTCDate())      + 'T' +
						f(this.getUTCHours())     + ':' +
						f(this.getUTCMinutes())   + ':' +
						f(this.getUTCSeconds())   + 'Z' : null;
			};

			String.prototype.toOktellJSON =
				Number.prototype.toOktellJSON =
					Boolean.prototype.toOktellJSON = function (key) {
						return this.valueOf();
					};
		}

		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap,
			indent,
			meta = {    // table of character substitutions
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"' : '\\"',
				'\\': '\\\\'
			},
			rep;


		function quote(string) {

			escapable.lastIndex = 0;
			return escapable.test(string) ?
				'"' + string.replace(escapable, function (a) {
					var c = meta[a];
					return typeof c === 'string' ? c :
						'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' :
				'"' + string + '"';
		}


		function str(key, holder) {


			var i,          // The loop counter.
				k,          // The member key.
				v,          // The member value.
				length,
				mind = gap,
				partial,
				value = holder[key];


			if (value && typeof value === 'object' &&
				typeof value.toOktellJSON === 'function') {
				value = value.toOktellJSON(key);
			}

			if (typeof rep === 'function') {
				value = rep.call(holder, key, value);
			}


			switch (typeof value) {
				case 'string':
					return quote(value);

				case 'number':



					return isFinite(value) ? String(value) : 'null';

				case 'boolean':
				case 'null':

					return String(value);

				case 'object':

					if (!value) {
						return 'null';
					}


					gap += indent;
					partial = [];

					if (Object.prototype.toString.apply(value) === '[object Array]') {


						length = value.length;
						for (i = 0; i < length; i += 1) {
							partial[i] = str(i, value) || 'null';
						}

						v = partial.length === 0 ? '[]' :
							gap ? '[\n' + gap +
								partial.join(',\n' + gap) + '\n' +
								mind + ']' :
								'[' + partial.join(',') + ']';
						gap = mind;
						return v;
					}


					if (rep && typeof rep === 'object') {
						length = rep.length;
						for (i = 0; i < length; i += 1) {
							k = rep[i];
							if (typeof k === 'string') {
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ': ' : ':') + v);
								}
							}
						}
					} else {


						for (k in value) {
							if (Object.hasOwnProperty.call(value, k)) {
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ': ' : ':') + v);
								}
							}
						}
					}


					v = partial.length === 0 ? '{}' :
						gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
							mind + '}' : '{' + partial.join(',') + '}';
					gap = mind;
					return v;
			}
		}


		if (typeof JSON.stringify !== 'function') {
			JSON.stringify = function (value, replacer, space) {


				var i;
				gap = '';
				indent = '';

				if (typeof space === 'number') {
					for (i = 0; i < space; i += 1) {
						indent += ' ';
					}


				} else if (typeof space === 'string') {
					indent = space;
				}

				rep = replacer;
				if (replacer && typeof replacer !== 'function' &&
					(typeof replacer !== 'object' ||
						typeof replacer.length !== 'number')) {
					throw new Error('JSON.stringify');
				}


				return str('', {'': value});
			};
		}



		if (typeof JSON.parse !== 'function') {
			JSON.parse = function (text, reviver) {


				var j;

				function walk(holder, key) {

					var k, v, value = holder[key];
					if (value && typeof value === 'object') {
						for (k in value) {
							if (Object.hasOwnProperty.call(value, k)) {
								v = walk(value, k);
								if (v !== undefined) {
									value[k] = v;
								} else {
									delete value[k];
								}
							}
						}
					}
					return reviver.call(holder, key, value);
				}


				text = String(text);
				cx.lastIndex = 0;
				if (cx.test(text)) {
					text = text.replace(cx, function (a) {
						return '\\u' +
							('0000' + a.charCodeAt(0).toString(16)).slice(-4);
					});
				}


				if (/^[\],:{}\s]*$/.
					test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
						replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
						replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

					j = eval('(' + text + ')');


					return typeof reviver === 'function' ?
						walk({'': j}, '') : j;
				}

				throw new SyntaxError('JSON.parse');
			};
		}
	}());


	// Flash WebSocket
	// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
	// License: New BSD License
	// Reference: http://dev.w3.org/html5/websockets/
	// Reference: http://tools.ietf.org/html/rfc6455
	var initFlashWebSocket = function() {

		if (window.WEB_SOCKET_FORCE_FLASH) {
			// Keeps going.
		} else if (window.WebSocket) {
			return;
		} else if (window.MozWebSocket) {
			// Firefox.
			window.WebSocket = MozWebSocket;
			return;
		}

		//WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf";

		var logger;
		if (window.WEB_SOCKET_LOGGER) {
			logger = WEB_SOCKET_LOGGER;
		} else if (window.console && window.console.log && window.console.error) {
			// In some environment, console is defined but console.log or console.error is missing.
			logger = window.console;
		} else {
			logger = {log: function(){ }, error: function(){ }};
		}

		// swfobject.hasFlashPlayerVersion("10.0.0") doesn't work with Gnash.
		if (swfobject.getFlashPlayerVersion().major < 10) {
			logger.error("Flash Player >= 10.0.0 is required.");
			return;
		}
		if (location.protocol == "file:") {
			logger.error(
				"WARNING: web-socket-js doesn't work in file:///... URL " +
					"unless you set Flash Security Settings properly. " +
					"Open the page via Web server i.e. http://...");
		}

		/**
		 * Our own implementation of WebSocket class using Flash.
		 * @param {string} url
		 * @param {array or string} protocols
		 * @param {string} proxyHost
		 * @param {int} proxyPort
		 * @param {string} headers
		 */
		window.WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
			var self = this;
			self.__id = WebSocket.__nextId++;
			WebSocket.__instances[self.__id] = self;
			self.readyState = WebSocket.CONNECTING;
			self.bufferedAmount = 0;
			self.__events = {};
			if (!protocols) {
				protocols = [];
			} else if (typeof protocols == "string") {
				protocols = [protocols];
			}
			// Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
			// Otherwise, when onopen fires immediately, onopen is called before it is set.
			self.__createTask = setTimeout(function() {
				WebSocket.__addTask(function() {
					self.__createTask = null;
					WebSocket.__flash.create(
						self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
				});
			}, 0);
		};

		/**
		 * Send data to the web socket.
		 * @param {string} data  The data to send to the socket.
		 * @return {boolean}  True for success, false for failure.
		 */
		WebSocket.prototype.send = function(data) {
			if (this.readyState == WebSocket.CONNECTING) {
				throw "INVALID_STATE_ERR: Web Socket connection has not been established";
			}
			// We use encodeURIComponent() here, because FABridge doesn't work if
			// the argument includes some characters. We don't use escape() here
			// because of this:
			// https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
			// But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
			// preserve all Unicode characters either e.g. "\uffff" in Firefox.
			// Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
			// additional testing.
			var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
			if (result < 0) { // success
				return true;
			} else {
				this.bufferedAmount += result;
				return false;
			}
		};

		/**
		 * Close this web socket gracefully.
		 */
		WebSocket.prototype.close = function() {
			if (this.__createTask) {
				clearTimeout(this.__createTask);
				this.__createTask = null;
				this.readyState = WebSocket.CLOSED;
				return;
			}
			if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
				return;
			}
			this.readyState = WebSocket.CLOSING;
			WebSocket.__flash.close(this.__id);
		};

		/**
		 * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
		 *
		 * @param {string} type
		 * @param {function} listener
		 * @param {boolean} useCapture
		 * @return void
		 */
		WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
			if (!(type in this.__events)) {
				this.__events[type] = [];
			}
			this.__events[type].push(listener);
		};

		/**
		 * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
		 *
		 * @param {string} type
		 * @param {function} listener
		 * @param {boolean} useCapture
		 * @return void
		 */
		WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
			if (!(type in this.__events)) return;
			var events = this.__events[type];
			for (var i = events.length - 1; i >= 0; --i) {
				if (events[i] === listener) {
					events.splice(i, 1);
					break;
				}
			}
		};

		/**
		 * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
		 *
		 * @param {Event} event
		 * @return void
		 */
		WebSocket.prototype.dispatchEvent = function(event) {
			var events = this.__events[event.type] || [];
			for (var i = 0; i < events.length; ++i) {
				events[i](event);
			}
			var handler = this["on" + event.type];
			if (handler) handler.apply(this, [event]);
		};

		/**
		 * Handles an event from Flash.
		 * @param {Object} flashEvent
		 */
		WebSocket.prototype.__handleEvent = function(flashEvent) {

			if ("readyState" in flashEvent) {
				this.readyState = flashEvent.readyState;
			}
			if ("protocol" in flashEvent) {
				this.protocol = flashEvent.protocol;
			}

			var jsEvent;
			if (flashEvent.type == "open" || flashEvent.type == "error") {
				jsEvent = this.__createSimpleEvent(flashEvent.type);
			} else if (flashEvent.type == "close") {
				jsEvent = this.__createSimpleEvent("close");
				jsEvent.wasClean = flashEvent.wasClean ? true : false;
				jsEvent.code = flashEvent.code;
				jsEvent.reason = flashEvent.reason;
			} else if (flashEvent.type == "message") {
				var data = decodeURIComponent(flashEvent.message);
				jsEvent = this.__createMessageEvent("message", data);
			} else {
				throw "unknown event type: " + flashEvent.type;
			}

			this.dispatchEvent(jsEvent);

		};

		WebSocket.prototype.__createSimpleEvent = function(type) {
			if (document.createEvent && window.Event) {
				var event = document.createEvent("Event");
				event.initEvent(type, false, false);
				return event;
			} else {
				return {type: type, bubbles: false, cancelable: false};
			}
		};

		WebSocket.prototype.__createMessageEvent = function(type, data) {
			if (document.createEvent && window.MessageEvent && !window.opera) {
				var event = document.createEvent("MessageEvent");
				event.initMessageEvent("message", false, false, data, null, null, window, null);
				return event;
			} else {
				// IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
				return {type: type, data: data, bubbles: false, cancelable: false};
			}
		};

		/**
		 * Define the WebSocket readyState enumeration.
		 */
		WebSocket.CONNECTING = 0;
		WebSocket.OPEN = 1;
		WebSocket.CLOSING = 2;
		WebSocket.CLOSED = 3;

		WebSocket.__initialized = false;
		WebSocket.__flash = null;
		WebSocket.__instances = {};
		WebSocket.__tasks = [];
		WebSocket.__nextId = 0;

		/**
		 * Load a new flash security policy file.
		 * @param {string} url
		 */
		WebSocket.loadFlashPolicyFile = function(url){
			WebSocket.__addTask(function() {
				WebSocket.__flash.loadManualPolicyFile(url);
			});
		};

		/**
		 * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
		 */
		WebSocket.__initialize = function() {

			if (WebSocket.__initialized) return;
			WebSocket.__initialized = true;

			if (WebSocket.__swfLocation) {
				// For backword compatibility.
				window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
			}
			if (!window.WEB_SOCKET_SWF_LOCATION) {
				logger.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
				return;
			}
			if (!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR &&
				!WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/) &&
				WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)) {
				var swfHost = RegExp.$1;
				if (location.host != swfHost) {
					logger.error(
						"[WebSocket] You must host HTML and WebSocketMain.swf in the same host " +
							"('" + location.host + "' != '" + swfHost + "'). " +
							"See also 'How to host HTML file and SWF file in different domains' section " +
							"in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message " +
							"by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;");
				}
			}
			var container = document.createElement("div");
			container.id = "webSocketContainer";
			// Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
			// Flash from loading at least in IE. So we move it out of the screen at (-100, -100).
			// But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
			// Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
			// the best we can do as far as we know now.
			container.style.position = "absolute";
			if (WebSocket.__isFlashLite()) {
				container.style.left = "0px";
				container.style.top = "0px";
			} else {
				container.style.left = "-100px";
				container.style.top = "-100px";
			}
			var holder = document.createElement("div");
			holder.id = "webSocketFlash";
			container.appendChild(holder);
			document.body.appendChild(container);
			// See this article for hasPriority:
			// http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
			swfobject.embedSWF(
				WEB_SOCKET_SWF_LOCATION,
				"webSocketFlash",
				"1" /* width */,
				"1" /* height */,
				"10.0.0" /* SWF version */,
				null,
				null,
				{hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
				null,
				function(e) {
					if (!e.success) {
						logger.error("[WebSocket] swfobject.embedSWF failed");
					}
				}
			);

		};

		/**
		 * Called by Flash to notify JS that it's fully loaded and ready
		 * for communication.
		 */
		WebSocket.__onFlashInitialized = function() {
			// We need to set a timeout here to avoid round-trip calls
			// to flash during the initialization process.
			setTimeout(function() {
				WebSocket.__flash = document.getElementById("webSocketFlash");
				WebSocket.__flash.setCallerUrl(location.href);
				WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
				for (var i = 0; i < WebSocket.__tasks.length; ++i) {
					WebSocket.__tasks[i]();
				}
				WebSocket.__tasks = [];
			}, 0);
		};

		/**
		 * Called by Flash to notify WebSockets events are fired.
		 */
		WebSocket.__onFlashEvent = function() {
			setTimeout(function() {
				try {
					// Gets events using receiveEvents() instead of getting it from event object
					// of Flash event. This is to make sure to keep message order.
					// It seems sometimes Flash events don't arrive in the same order as they are sent.
					var events = WebSocket.__flash.receiveEvents();
					for (var i = 0; i < events.length; ++i) {
						WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
					}
				} catch (e) {
					logger.error(e);
				}
			}, 0);
			return true;
		};

		// Called by Flash.
		WebSocket.__log = function(message) {
			logger.log(decodeURIComponent(message));
		};

		// Called by Flash.
		WebSocket.__error = function(message) {
			logger.error(decodeURIComponent(message));
		};

		WebSocket.__addTask = function(task) {
			if (WebSocket.__flash) {
				task();
			} else {
				WebSocket.__tasks.push(task);
			}
		};

		/**
		 * Test if the browser is running flash lite.
		 * @return {boolean} True if flash lite is running, false otherwise.
		 */
		WebSocket.__isFlashLite = function() {
			if (!window.navigator || !window.navigator.mimeTypes) {
				return false;
			}
			var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
			if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
				return false;
			}
			return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
		};

		if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
			// NOTE:
			//   This fires immediately if web_socket.js is dynamically loaded after
			//   the document is loaded.
			swfobject.addDomLoadEvent(function() {
				WebSocket.__initialize();
			});
		}

	};

	var debugMode = false;
	var logStr = '';
	/**
	 * log to console if debugMode == true
	 */
	var log = function() {
		if ( debugMode ) {
			var d = new Date();
			var dd =  d.getFullYear() + '-' + (d.getMonth()<10?'0':'') + d.getMonth() + '-' + (d.getDate()<10?'0':'') + d.getDate();
			var t = (d.getHours()<10?'0':'') + d.getHours() + ':' + (d.getMinutes()<10?'0':'')+d.getMinutes() + ':' +  (d.getSeconds()<10?'0':'')+d.getSeconds() + ':' +
				(d.getMilliseconds() + 1000).toString().substr(1);
			logStr += dd +' '+ t + ' | ';
			args = ['Oktell.js ' + t + ' |']
			for ( var i = 0, j = arguments.length; i < j; i++ ) {
				logStr += (typeof arguments[i] == 'object' ? JSON.stringify(arguments[i]) : arguments[i]) + ' | ';
				args.push( arguments[i] );
			}
			logStr += "\n\n";
			try {
				console.log.apply( console, args || [] );
			} catch ( e ) {
				debugMode = false;
			}
		}
	};

	/**
	 * md5
	 * @param str target
	 * @return {String}
	 */
	var md5 = function (str) {
		var xl;

		var rotateLeft = function (lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		};

		var addUnsigned = function (lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		};

		var _F = function (x, y, z) {
			return (x & y) | ((~x) & z);
		};
		var _G = function (x, y, z) {
			return (x & z) | (y & (~z));
		};
		var _H = function (x, y, z) {
			return (x ^ y ^ z);
		};
		var _I = function (x, y, z) {
			return (y ^ (x | (~z)));
		};

		var _FF = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var _GG = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var _HH = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var _II = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var convertToWordArray = function (str) {
			var lWordCount;
			var lMessageLength = str.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = new Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};

		var wordToHex = function (lValue) {
			var wordToHexValue = "",
				wordToHexValue_temp = "",
				lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				wordToHexValue_temp = "0" + lByte.toString(16);
				wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
			}
			return wordToHexValue;
		};

		var x = [],
			k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
			S12 = 12,
			S13 = 17,
			S14 = 22,
			S21 = 5,
			S22 = 9,
			S23 = 14,
			S24 = 20,
			S31 = 4,
			S32 = 11,
			S33 = 16,
			S34 = 23,
			S41 = 6,
			S42 = 10,
			S43 = 15,
			S44 = 21;

		// str = this.utf8_encode(str);
		x = convertToWordArray(str);
		a = 0x67452301;
		b = 0xEFCDAB89;
		c = 0x98BADCFE;
		d = 0x10325476;

		xl = x.length;
		for (k = 0; k < xl; k += 16) {
			AA = a;
			BB = b;
			CC = c;
			DD = d;
			a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
			d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
			c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
			b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
			a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
			d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
			c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
			b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
			a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
			d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
			c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
			b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
			a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
			d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
			c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
			b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
			a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
			d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
			c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
			b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
			a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
			d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
			c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
			b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
			a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
			d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
			c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
			b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
			a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
			d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
			c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
			b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
			a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
			d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
			c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
			b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
			a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
			d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
			c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
			b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
			a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
			d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
			c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
			b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
			a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
			d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
			c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
			b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
			a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
			d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
			c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
			b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
			a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
			d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
			c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
			b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
			a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
			d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
			c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
			b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
			a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
			d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
			c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
			b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
			a = addUnsigned(a, AA);
			b = addUnsigned(b, BB);
			c = addUnsigned(c, CC);
			d = addUnsigned(d, DD);
		}

		var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

		return temp.toLowerCase();
	}

	var utf8Decode = function(str_data) {
		// http://kevin.vanzonneveld.net
		// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
		// +      input by: Aman Gupta
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: Norman "zEh" Fuchs
		// +   bugfixed by: hitwork
		// +   bugfixed by: Onno Marsman
		// +      input by: Brett Zamir (http://brett-zamir.me)
		// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// *     example 1: utf8_decode('Kevin van Zonneveld');
		// *     returns 1: 'Kevin van Zonneveld'
		var tmp_arr = [],
			i = 0,
			ac = 0,
			c1 = 0,
			c2 = 0,
			c3 = 0;

		str_data += '';

		while (i < str_data.length) {
			c1 = str_data.charCodeAt(i);
			if (c1 < 128) {
				tmp_arr[ac++] = String.fromCharCode(c1);
				i++;
			} else if (c1 > 191 && c1 < 224) {
				c2 = str_data.charCodeAt(i + 1);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = str_data.charCodeAt(i + 1);
				c3 = str_data.charCodeAt(i + 2);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}

		return tmp_arr.join('');
	}

	var utf8DecodePass = function(aa) {
		var bb = '', c = 0;
		for (var i = 0; i < aa.length; i++) {
			c = aa.charCodeAt(i);
			if (c > 127) {
				if (c > 1024) {
					if (c == 1025) {
						c = 1016;
					} else if (c == 1105) {
						c = 1032;
					}
					bb += String.fromCharCode(c - 848);
				}
			} else {
				bb += aa.charAt(i);
			}
		}
		return bb;
	}

	var base64_decode = function base64_decode (data) {
		// http://kevin.vanzonneveld.net
		// +   original by: Tyler Akins (http://rumkin.com)
		// +   improved by: Thunder.m
		// +      input by: Aman Gupta
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   bugfixed by: Onno Marsman
		// +   bugfixed by: Pellentesque Malesuada
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +      input by: Brett Zamir (http://brett-zamir.me)
		// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// -    depends on: utf8_decode
		// *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
		// *     returns 1: 'Kevin van Zonneveld'
		// mozilla has this native
		// - but breaks in 2.0.0.12!
		//if (typeof this.window['btoa'] == 'function') {
		//    return btoa(data);
		//}
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			dec = "",
			tmp_arr = [];

		if (!data) {
			return data;
		}

		data += '';

		do { // unpack four hexets into three octets using index points in b64
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));

			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;

			if (h3 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1);
			} else if (h4 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
				tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
		} while (i < data.length);

		dec = tmp_arr.join('');
		dec = utf8Decode(dec);

		return dec;
	}

	/**
	 * Extending object
	 * @param obj
	 * @return {*}
	 */
	var extend = function(obj) {
		var args = Array.prototype.slice.call(arguments, 1);
		each(args, function(arg,kk){
			each(arg, function(a,prop){
				if ( arg.hasOwnProperty(prop) ) {
					obj[prop] = a;
				}
			});
		});
		return obj;
	};

	/**
	 * Check if target is array
	 * @param obj target
	 * @return {Boolean}
	 */
	var isArray = function(obj) {
		if ( Array.isArray ) {
			return Array.isArray(obj);
		} else {
			return Object.prototype.toString.call(obj) == '[object Array]';
		}
	}

	/**
	 * Object cloning (don't work with functions) TODO: throw error if circular links
	 * @param obj
	 * @param useJSON
	 * @return {*}
	 */
	var cloneObject = function( obj, useJSON ) { // don't work with functions as properties
		if ( useJSON ) {
			return JSON.parse(JSON.stringify(obj));
		} else {
			var c = {};
			for ( var i in obj ){
				if ( obj.hasOwnProperty(i) ) {
					if ( typeof obj[i] == 'object' ) {
						c[i] = cloneObject(obj[i],false);
					} else {
						c[i] = obj[i];
					}
				}
			}
			return c;
		}
	};

	/**
	 * Array's or object's size
	 * @param obj
	 * @return {*}
	 */
	var size = function(obj) {
		obj = obj || [];
		if ( isArray(obj) ) {
			return obj.length;
		} else if ( obj === Object(obj) ) {
			if ( Object.keys ){
				return Object.keys(obj).length;
			} else {
				var keysCount = 0;
				for (var key in obj) if ( Object.prototype.hasOwnProperty.call(obj, key) ) { keysCount++; }
				return keysCount;
			}
		}
		return false;
	};

	var breaker = {};
	/**
	 * foreach with callback
	 * @param obj
	 * @param fn
	 * @param context
	 */
	var each = function(obj, fn, context) {
		if (obj == null) return;
		if ( Array.prototype.forEach && obj.forEach === Array.prototype.forEach ) {
			obj.forEach(fn, context);
		} else if ( obj.length === +obj.length ) {
			for (var i = 0, l = obj.length; i < l; i++) {
				if (i in obj && fn.call(context, obj[i], i, obj) === breaker) return;
			}
		} else {
			for (var key in obj) {
				if ( Object.prototype.hasOwnProperty.call(obj, key) ) {
					if (fn.call(context, obj[key], key, obj) === breaker) return;
				}
			}
		}
	}

	var trim = function(val) {
		return val.replace(/^\s+/, '').replace(/\s+$/, '');
	}

	/**
	 * Format phone number
	 * @param value
	 * @return {String}
	 */
	var formatPhone = function ( value ) {
		if ( ! value ) { return '';}

		value = value.toString().split(';').join(',');

		var phones = value.split(',');

		for( var i = 0; i < phones.length; i++ ) {
			phones[i] = trim( phones[i] );
			var phone
				, country = ""
				, city = ""
				, extra = "";

			if ( phones[i] == "" ) { continue; }

			if ( phones[i].indexOf( '(' ) != -1 ) {

				var tmp = phones[i].split('(');
				country = trim( tmp[0] );

				tmp = tmp[1].split(')');
				city = trim( tmp[0] );

				var phone = trim( tmp[1] );
				phone = phone.replace( /(.?[0-9]) ([0-9].?)/ig, "$1-$2" );
				phone = phone.replace( /(.?[0-9]) ([0-9].?)/ig, "$1-$2" );

				if ( phone.indexOf('-') == -1 ) {

					tmp = [ phone.split(' ')[0], phone.split(' ').slice(1).join(' ') ];
					phone = trim( tmp[0] );
					extra = trim( tmp[1] );

					if ( phone.length == 5 ) { phone = phone.substr( 0, 3 ) + "-" + phone.substr( 3, 2 ); }
					if ( phone.length == 6 ) { phone = phone.substr( 0, 2 ) + "-" + phone.substr( 2, 2 ) + "-" + phone.substr( 4, 2 ); }
					if ( phone.length == 7 ) { phone = phone.substr( 0, 3 ) + "-" + phone.substr( 3, 2 ) + "-" + phone.substr( 5, 2 ); }

					if ( extra != "" ) { phone += ' ' + extra; }
				}

			} else {

				phone = phones[i].split('+').join('');
				phone = phone.replace( /(.?[0-9]) ([0-9].?)/ig, "$1-$2" );
				phone = phone.replace( /(.?[0-9]) ([0-9].?)/ig, "$1-$2" );

				var tmp = [ phone.split(' ')[0], phone.split(' ').slice(1).join(' ') ];
				phone = trim( tmp[0] );
				phone = phone.split('-').join('');
				phone = phone.split('—').join('');
				extra = trim( tmp[1] );

				if ( phone.length == 5 ) { phone = phone.substr( 0, 3 ) + "-" + phone.substr( 3, 2 ); }
				else if ( phone.length == 6 ) { phone = phone.substr( 0, 2 ) + "-" + phone.substr( 2, 2 ) + "-" + phone.substr( 4, 2 ); }
				else if ( phone.length == 7 ) { phone = phone.substr( 0, 3 ) + "-" + phone.substr( 3, 2 ) + "-" + phone.substr( 5, 2 ); }
				else if ( phone.length == 9 ) { city = phone.substr( 0, 3 ); phone = phone.substr( 3, 2 ) + "-" + phone.substr( 5, 2 ) + "-" + phone.substr( 7, 2 ); }
				else if ( phone.length == 10 ) { city = phone.substr( 0, 3 ); phone = phone.substr( 3, 3 ) + "-" + phone.substr( 6, 2 ) + "-" + phone.substr( 8, 2 ); }
				else if ( phone.length == 11 ) { country = phone.substr( 0, 1 ); city = phone.substr( 1, 3 ); phone = phone.substr( 4, 3 ) + "-" + phone.substr( 7, 2 ) + "-" + phone.substr( 9, 2 ); }
				else if ( phone.length == 12 ) { country = phone.substr( 0, 2 ); city = phone.substr( 2, 3 ); phone = phone.substr( 5, 3 ) + "-" + phone.substr( 8, 2 ) + "-" + phone.substr( 10, 2 ); }
				else if ( phone.length == 13 ) { country = phone.substr( 0, 3 ); city = phone.substr( 3, 3 ); phone = phone.substr( 6, 3 ) + "-" + phone.substr( 9, 2 ) + "-" + phone.substr( 11, 2 ); }
				else if ( phone.length == 14 ) { country = phone.substr( 0, 4 ); city = phone.substr( 4, 3 ); phone = phone.substr( 7, 3 ) + "-" + phone.substr( 10, 2 ) + "-" + phone.substr( 12, 2 ); }

				if ( extra != "" ) { phone += ' ' + extra; }
			}

			if ( country == "8" ) { country = "+7"; }
			if ( country[0] != "+" && country != "" ) { country = "+" + country; }

			if ( true ) { // collect
				var full = [];
				if ( country != "" ) { full.push( country ); }
				if ( city != "" ) { 	full.push( "(" + city + ")" ); }
				if ( phone != "" ) { 	full.push( phone ); }

				phones[i] = full.join(' ');
			}
		}

		value = phones.join(', ');
		return value;
	};

	/**
	 * create new guid
	 * @return {String}
	 */
	var newGuid = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	};

	var buildParams = function(obj) {
		if ( typeof obj == 'object' ) {
			var str = '';
			each(obj, function(v,k){
				str += '&' + k + '=' + v.toString()
			});
			return str;
		}
		return false
	};

	/**
	 * target is guid or not
	 * @param str
	 * @return {Boolean}
	 */
	var isGuid = function (str) {
		if ( typeof str == 'string' && ( str.match(/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/)) || ( str.length == 32 && str.match(/[a-zA-Z0-9]{32}/)) ) {
			return true;
		}
		return false;
	};

	/**
	 * call target if it is function
	 * @param fn
	 */
	var callFunc = function(fn) {
		if ( typeof fn == 'function' ) fn.apply(undefined, Array.prototype.slice.call( arguments, 1 ));
	}

	var dateToIso = function(dt) {
		if ( dt instanceof Date ) {
			return dt.getFullYear() + '-' + ( dt.getMonth() < 10 ? '0' + dt.getMonth() : dt.getMonth() ) + '-' + ( dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate() );
		}
		return false;
	}

	var cookie = function (key, value, options) {

		// key and at least value given, set cookie...
		if (arguments.length > 1 && String(value) !== "[object Object]") {
			options = extend({}, options);

			if (value === null || value === undefined) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var seconds = options.expires, t = options.expires = new Date();
				t.setSeconds(t.getSeconds() + seconds);
			}

			value = String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=',
				options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}

		// key and possibly options given, get cookie...
		options = value || {};
		var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	};

	var eventSplitter = /\s+/;
	var normalizeEventNames = function(eventNames) {
		if ( typeof eventNames == 'string' ) {
			eventNames = eventNames.replace(/,/g, ' ').split(eventSplitter);
		} else if ( isArray(eventNames) && eventNames.length > 0 ) {
			var eventsArray = [];
			for (var i = 0; i < eventNames.length; i++) {
				var event = eventNames[i];
				if ( event && typeof event == 'string' ) {
					eventsArray.push(event);
				}
			}
			eventsNames = eventsArray;
		} else {
			return false;
		}
		return eventNames;
	}
	/**
	 * Events object. For extending other objects
	 * @type {Object}
	 */

	var Events = {
		/**
		 * Subscribe to events
		 * @param eventNames
		 * @param callback
		 * @param context
		 * @return {Boolean}
		 */
		on: function( eventNames, callback, context ) {
			eventNames = normalizeEventNames(eventNames);
			if ( ! eventNames || typeof callback != 'function' ) {
				return false;
			}

			var calls = this._callbacks || ( this._callbacks = {} );
			each( eventNames, function(event,key) {
				if ( typeof event != 'string' ) {
					return breaker;
				}
				var eventCalls = calls[ event ] || ( calls[ event ] = [] );
				eventCalls.push({
					callback: callback,
					context: context
				});
			});
			return true;
		},
		/**
		 * Unsubscribe
		 * @param eventNames to unsubscribe, if empty - unsubscribe from all events
		 * @param callback to unsubscribe, if empty - unsubscribe from all eventNames
		 * @return {Boolean}
		 */
		off: function( eventNames, callback ) {

			var calls = this._callbacks || ( this._callbacks = {} );

			if ( ! eventNames ) {
				calls = {};
			} else {
				eventNames = normalizeEventNames(eventNames);
				if ( ! eventNames ) {
					return false;
				}

				if ( typeof callback == 'function' ) {
					each(eventNames, function(event){
						if ( typeof event != 'string' ) { return; }
						each(calls[event], function(cl,i){
							if ( cl && cl.callback === callback ) {
								delete calls[ event ][i];
							}
						});
					});
				} else {
					each(eventNames, function(event){
						delete calls[ event ];
					});
				}
			}
			return true;
		},
		/**
		 * Trigger event with or without additional params
		 * @param eventNames
		 * @return {Boolean}
		 */
		trigger: function( eventNames ) {
			eventNames = normalizeEventNames(eventNames);
			var calls = this._callbacks || ( this._callbacks = {} );
			if ( ! eventNames ) {
				return false;
			}
			var args = Array.prototype.slice.call( arguments, 1 );
			var allEventCalls = calls['all'];
			each( eventNames, function(event){
				var eventCalls = calls[ event ];
				if ( eventCalls ) {
					each(eventCalls, function(eventCall){
						if ( eventCall && typeof eventCall.callback == 'function' ) {
							eventCall.callback.apply( eventCall.context || undefined, args );
						}
					});
				}
				if ( allEventCalls ) {
					var allEventArgs = [event].concat(args);
					each(allEventCalls, function(eventCall){
						if ( eventCall && typeof eventCall.callback == 'function' ) {
							eventCall.callback.apply( eventCall.context || undefined, allEventArgs );
						}
					});
				}
			});
			return true;
		}
	};

	/**
	 * class for connecting and working with browser's websocket API
	 * @param url адрес сервера
	 * @param openTimeout таймаут подключения
	 * @param onOpenCallback коллбэк
	 * @constructor
	 */
	var Server = function( url, openTimeout, delayMin, delayMax, onOpenCallback ) {
		var ws,
			wsArr = {},
			wsUrlRegexp = /^ws[s]{0,1}:\/\/\S+$/i,
			self = this,
			wsWasOpened = false,
			wsErrorConnection = false,
			callbacks = {},
			multiparts = {},
			oktellEventCallbacks = {},
			currentSessionSubscriptions = {},
			eventGroups = {
				'dynamic': ['executemethod', 'cancelmethod'],
				'dynamicwaitabort': ['executemethodwaitaborted'],
				'chat': ['chatmessageviewed', 'chatmessage', 'chatmemberremoved', 'chatmemberadded', 'chatnamechanged', 'chatcreated'],
				'dlgcard': ['dlgcard_showreserve', 'dlgcard_showconfirm', 'dlgcard_showformstop', 'dlgcard_showformdialog', 'dlgcard_closeall', 'dlgcard_closereserve', 'dlgcard_closeformreturnvalues', 'dlgcard_closeformreturncomment']
			};

		self.setQueryDelayMin(delayMin);
		self.setQueryDelayMax(delayMax);

		var parseUrls = function(urls){
			if ( ! isArray(urls) ) {
				return false;
			}
			var needSecure = location.protocol == 'https:' ? true : false,
				defaultPort = 80,
				result = [];

			for ( var i, l = urls.length; i < l; i++ ) {
				if ( typeof urls[i] != 'string' ) {
					return false;
				}
				if ( wsUrlRegexp.text(urls[i]) ) {
					result.push(urls[i]);
				} else {
					var uArr = urls[i].split(':'),
						host = uArr[0],
						port = uArr[1];
					if ( ! port ) {
						port = defaultPort;
						result.push( host + ':' + '4066' ); //
					}
					if ( port == '443' ) { needSecure = true; }
					result.push( host + ':' + port );
				}
			}

			var prefix = needSecure ? 'wss://' : 'ws//';
			for ( var i, l = result.length; i < l; i++ ) {
				if ( ! wsUrlRegexp.text(urls[i]) ) {
					result[i] = prefix + result[i];
				}
			}

		}
		var n_onClose = function(a,b,c){}
		var n_onError = function(a,b,c){}
		var n_onError = function(a,b,c){}
		var n_wasConnected = false;
		var n_onConnect = function(wsObj) {
			if ( ! n_wasConnected ) {
				n_wasConnected = true;
				ws = wsObj;
				// send ping, wait pong, redirect to secure if need
				var qid = Math.random().toString();
				ws.onmessage = function ( evt ) {

					var data = JSON.parse( evt.data );

					var afterSuccessConnect = function(finalWs) {
						self.ws = finalWs;
						finalWs.onmessage = onMessage;
						finalWs.onclose = n_onClose;
						finalWs.onerror = n_onError;
						onOpen()
					}

					if ( data[0] == 'websocketredirect' ) {
						var wss = new WebSocket( wsObj.url.replace('ws://', 'wss://').replace(':4066', ':443'), 'json');
						wss.onopen = function() {
							afterSuccessConnect(wss);
						}
					} else if ( data[1] && data[1].qid == qid ) {
						afterSuccessConnect(wsObj);
					}
				}
				ws.send( JSON.stringify(['ping',{qid:qid}]));
			} else {
				wsObj.close();
			}
		}

		self.n_connect = function() {
			var wsArr = [];
			var urls = parseUrls(url);
			for ( var i, l = urls.length; i < l; i++ ) {
				setTimeout(function(){
					var ws = new WebSocket(urls[i], 'json');
					ws.onopen = function() {
						n_onConnect(ws);
					}
					ws.onerror = function() {

					}
					ws.onclose = function() {

					}
				},1);
			}
		}

		self.url = url;

		var errorConnection = function() {
			if ( ! wsErrorConnection ) {
				wsErrorConnection = true;
				self.trigger('errorConnection');
			}
		};

		var onOpen = function() {
			wsWasOpened = true;
			if ( typeof onOpenCallback == 'function' ) {
				log('success connect to ' + ws.url)
				onOpenCallback(ws.url);
			}
		}

		var onMessage = function ( evt ) {

			var data = JSON.parse( evt.data );

			triggerOktellEvent(data);

			var isFullMultiPart = false;
			if ( data[0] == 'multipart' ) {
				var msg = multiparts[ data[1]['message-id'] ];
				if ( !msg ) {
					msg = {
						packetcount:data[1]['packetcount'],
						content:[],
						value:''
					};
					multiparts[ data[1]['message-id'] ] = msg;
				}
				msg.content[ parseInt( data[1]['packetnumber'] ) ] = data[1]['content'].toString();
				if ( msg.content.length == msg.packetcount ) {
					for ( var i = 0; i < msg.content.length; i++ ) {
						msg.value = '' + msg.value + base64_decode( msg.content[i] );
					}
					isFullMultiPart = true;
				}
			}

			if ( data[0] != 'multipart' || ( data[0] == 'multipart' && isFullMultiPart ) ) {
				if ( isFullMultiPart ) {
					data = JSON.parse( multiparts[ data[1]['message-id'] ].value );
				}

				if ( typeof callbacks[data[1].qid] == 'function' ) {
					//debug('callback');
					var c = callbacks[data[1].qid];
					delete callbacks[data[1].qid];
					var d = data[1];
					if (d.result === undefined) {d.result = 1;}
					c( data[1] );
				}
			}
		};

		var onClose = function() {
			if ( wsWasOpened ) {
				if ( ! wsErrorConnection ) {
					self.trigger('connectionClose');
				}
			} else {
				errorConnection();
			}
			currentSessionSubscriptions = {};
		};

		self.multiConnect = function() {

			if ( ! isArray(url) ) {
				url = [url];
			}

			log('Multi connect start', url);

			var connectErrorsCount = 0;

			url = url.slice(0,10);
			each(url, function( curl, i) {

				setTimeout(function(){
					try {
						wsArr[curl] = new WebSocket( curl , 'json');
						log('trying to connect ' + curl);

						wsArr[curl].onopen = function() {
							wsArr[curl].wasOpened = true
							var qid = Math.random().toString();
							wsArr[curl].send( JSON.stringify(['ping',{qid:qid}]));
							wsArr[curl].onmessage = function ( evt ) {
								if ( wsWasOpened ) {
									//log('onopen return false for ' + curl);
									return false;
								}
								var data = JSON.parse( evt.data );

								var afterSuccessConnect = function() {
									self.url = curl;
									self.wsUrl =
										ws = wsArr[curl];
									ws.onmessage = onMessage
									ws.onclose = onClose;
									onOpen()
								}

								if ( data[0] == 'websocketredirect' ) {
									//if ( data[0] == 'pong' ) {
									var wssUrl = curl.replace(/^ws:\/\//, 'wss://').replace(/:[0-9]{1,5}/, ':443');
									log('redirect to secure websocket, trying to connect ' + wssUrl);
									wsArr[curl].close();
									curl = wssUrl;
									var wss = new WebSocket( curl, 'json');
									wss.onopen = function() {
										if ( wsWasOpened ) {
											//log('onopen return false for ' + curl);
											return false;
										}
										afterSuccessConnect()
									}
									wsArr[curl] = wss

								} else if ( data[1] && data[1].qid == qid ) {
									afterSuccessConnect()
								}
							}
						}

						setTimeout(function(){
							//log('timeout for ' + curl + ' ' + self.getWebSocketState(wsArr[curl]));
							if ( ( self.getWebSocketState(wsArr[curl]) != 1 && ! wsArr[curl].wasOpened ) || self.url != curl ) {
								//log('timeout2 for ' + curl);
								self.disconnect(wsArr[curl]);
								connectErrorsCount++;

								if ( connectErrorsCount == url.length ) {
									//log('errorConnection() for ' + curl);
									connectErrorsCount = -999;
									errorConnection();
								}
							}
						}, openTimeout);

					} catch (e) {
						//log('exception for ' + curl);
						connectErrorsCount++;

						if ( connectErrorsCount == url.length ) {
							//log('trigger errorConnection for ' + curl);
							connectErrorsCount = -999;
							self.trigger('errorConnection', e);
						}

						return breaker;
					}

				},1);

			});

		};

		self.connect = function() {
			wsErrorConnection = false;
			try {
				log('trying to connect ' + url);
				ws = new WebSocket( 'ws://'+url, 'json');

				setTimeout(function(){
					if ( self.getWebSocketState() == 0 ) {
						self.disconnect();
						errorConnection();
					}
				}, openTimeout);

			} catch (e) {
				self.trigger('errorConnection', e);
				return false;
			}


			ws.onopen = onOpen;
			ws.onmessage = onMessage;
			ws.onclose = onClose;
		}


		self.send = function ( data, id, callback ) {
			var d = JSON.parse(data);
			if ( typeof callback == 'function' ) {
				callbacks[id] = callback;
			}
			if ( self.delayMin > 0 ) {
				var timeout = self.delayMin;
				if ( delayMax ) {
					timeout = Math.round( Math.random() * Math.abs(self.delayMax - self.delayMin) + self.delayMin );
				}
				setTimeout(function(){
					ws.send(data);
				}, timeout);
				return true
			} else {
				return ws.send( data );
			}
		}

		self.sendOktell = function ( method, body, callback ) {
			body = body || {};
			var msg = new Array();
			msg.push( method );
			body.qid = Math.random().toString();
			msg.push( body );
			if ( self.send( JSON.stringify( msg ), msg[1].qid, callback ) === false ) {
				callFunc(callback,{result:0,errormsg:'websocket send error'});
			}
		}

		self.execProc = function ( procName, paramsObj, callback ) {
			var msg = [
				'execpredefineddbstoredproc',
				extend({
					qid:Math.random().toString(),
					procedure:procName
				}, paramsObj)
			];
			self.send( JSON.stringify( msg ), msg[1].qid, function(data){
				var items = [];
				if ( data.result == 1 && data.errorcode == 0 ) {
					for( var i = 0; i < data.dataset.length; i ++ ) {
						var d = [];
						items.push(d);
						var keys = [];
						for ( var k = 0; k < data.dataset[i][0].length; k ++ ){
							keys.push( data.dataset[i][0][k] );
						}
						for ( var j = 1; j < data.dataset[i].length; j++ ) {
							var item = {};
							for ( var f = 0; f < keys.length; f++ ) {
								item[ keys[f] ] = data.dataset[i][j][f];
							}
							d.push( item );
						}
					}
				} else {
					items = false;
				}
				callFunc(callback,items, data.dataset);
			});
		};

		self.bindOktellEvent = function( eventNames, callback ){
			eventNames = normalizeEventNames(eventNames);
			if ( ! eventNames || typeof callback != 'function' ) {return false;}

			each(eventNames, function(event){
				if ( ! oktellEventCallbacks[event] ) {
					oktellEventCallbacks[event] = [];
				}
				oktellEventCallbacks[event].push( callback );
			});

			self.sendOktellEventSubscription(eventNames);

			return true;
		};

		var triggerOktellEvent = function(data) {
			if ( oktellEventCallbacks && oktellEventCallbacks[ data[0] ] ) {
				log('<<< EVENT ' + data[0], data[1]);
				each( oktellEventCallbacks[ data[0] ], function(callback){
					callFunc(callback,data[1]);
				});
			}
		}

		self.sendOktellEventSubscription = function(eventNames, dontSend) {
			var self = this;
			eventNames = normalizeEventNames(eventNames)
			if ( ! eventNames ) {
				return false;
			}

			var toSend = [];

			each( eventNames, function(event){
				if ( ! currentSessionSubscriptions[ event ] ) {
					toSend.push(event)
					if ( isArray(eventGroups[event]) ) {
						self.sendOktellEventSubscription(eventGroups[event], true);
					}
				}
				if ( dontSend ) {
					currentSessionSubscriptions[ event ] = true;
				}
			});

			if ( ! dontSend && toSend.length ) {
				log ('===> Event subscription', toSend);
				self.sendOktell('subscribeevent', {eventmethod: toSend}, function(data){
					log('<=== Event subscribtion result: ' + data.result, toSend)
					each( toSend, function(ev){
						currentSessionSubscriptions[ ev ] = true;
					});
				});
			}
		};

		/**
		 * Unsubscribe from native event of oktell server
		 * @param eventNames
		 * @param callback
		 * @return {Boolean}
		 */
		self.unbindOktellEvent = function( eventNames, callback ) {
			if ( ! eventNames ) {
				oktellEventCallbacks = {};
			} else {
				eventNames = normalizeEventNames(eventNames);
				if ( ! eventNames ) { return false; }
				callback = typeof callback == 'function' ? callback : false;

				for (var i = 0; i < eventNames.length; i++) {
					var event = eventNames[i];
					if ( callback ) {
						each( oktellEventCallbacks[event], function(cb,i) {
							if ( cb === callback ) {
								delete oktellEventCallbacks[event][i];
							}
						});
					} else {
						delete oktellEventCallbacks[event];
					}
				}
			}
			return true;
		};

		self.reSendOktellEventSubscribtions = function() {

			var events = [];
			each( currentSessionSubscriptions, function(v,ev){
				if ( v ) {
					events.push(ev);
				}
			});

			if ( events.length ) {
				self.sendOktell('subscribeevent', {eventmethod: events}, function(data){

				});
			}
		};

		self.disconnect = function( websocket ) {
			websocket = websocket || ws;
			websocket.close();
			var status = self.getWebSocketState(websocket);
			if ( status == 3 || status == 2 ) {
				return true;
			} else {
				return false;
			}
		};

		self.getWebSocketState = function( websocket ) {
			websocket = websocket || ws;
			return websocket ? websocket.readyState : undefined;
		}
	};
	Server.prototype.setQueryDelayMin = function(delay){
		delay = parseInt(delay);
		if ( delay ) {
			this.delayMin = delay;
		}
	};
	Server.prototype.setQueryDelayMax = function(delay){
		delay = parseInt(delay);
		if ( delay ) {
			this.delayMax = delay;
		}
	};
	extend( Server.prototype , Events );

	var Abonent = function() {

	};

	var Oktell = function( options ) {
		var self = this,
			server,
			_oktellConnected = false,
			nativeEventsForBindAfterConnect = [],
			currentUrlIndex = 0,
			pingTimer,
			queueTimer,
			oktellOptions = {
				openTimeout: 10000,
				queryTimeout: 20000,
				queueInterval: 5000,
				oktellVoice: false,
				webSocketSwfLocation: "WebSocketMain.swf"
			},
			oktellVoice,
			sipPhone,
			sipPnoneActive = false,
			oktellInfo = {
				redirectNumber: undefined,
				allowedProcedures: {}
			},
			methodVersions = {
				getmyuserinfo: {v:120327, critical: true},
				getversion: { v:120112, critical: true },
				pbxmakeflash: {v:120725},
				getextendedlineinfo: {v:120112, critical: true},
				getflashedabonentinfo: {v:120112, critical: true},
				saveredirectrules: {v:120725},
				deleteredirectrules: {v:120725},
				getredirectrules: {v:120725},
				pbxmaketransfer: {v:120725},
				triggercustomevent: {v:120725},
				getallusernumbers: {v:120920},
				cc_getlunchtypes: {v:130101},
				pbxanswercall: {v:131218}
			},
			httpQueryData = {},
			cookieSessionName = '___oktellsessionid',

			users = {},
			numbers = {},
			numbersById = {},
			connectionClosedByUser = false;

		var exportApi = function(name, fn, context) {
			if ( ! self[name] && typeof fn == 'function' ) {
				self[name] = function() {
					return fn.apply( context || self, arguments );
				}
			}
		}

		var oktellConnected = function(connected) {
			if ( connected !== undefined ) {
				if ( connected ) {
					_oktellConnected = true;
				} else {
					_oktellConnected = false;
				}
			}
			return _oktellConnected;
		}

		/**
		 * Events
		 * @type {*}
		 */
		var events = extend({}, Events);

		/**
		 * Return state of connection with websocket server
		 * @return {Boolean}
		 */
		var serverConnected = function() {
			if ( server && server.getWebSocketState() == 1 ) {
				return true;
			}
			return false;
		}

		/**
		 * Return name of state if state found, or false
		 * @param code of state
		 * @param states Object with states ( key is code, val is state name )
		 * @return {*}
		 */
		var getStateByCode = function( code, states ) {
			if ( code === undefined || ! size(states) ) {
				return false;
			}
			code = parseInt( code );
			var msg = '';
			each( states, function(scode, message){
				if ( scode == code ) {
					msg = message.toLowerCase();
				}
			});
			return msg;
		};

		/**
		 * Convert target to array of strings
		 * @param strings - string or array of string
		 * @return {*} array or false
		 */
		var toStringsArray = function(strings) {
			if ( ! strings || !(typeof strings == 'string' || typeof strings == 'number' || isArray(strings)) ) { return false; }
			if ( typeof strings == 'string' || typeof strings == 'number' ) {
				strings = [strings.toString()];
			}
			var result = true;
			each(strings, function(s){
				if( typeof s != 'string' ) { result = false; return breaker; }
			});
			if ( ! result ){ return false; } else { return strings }
		}

		/**
		 * Check oktell websocket method's version
		 * @param method name
		 * @return {Boolean} true if supported, false if not
		 */
		var isValidMethodVersion = function( method ) {
			if ( oktellInfo.oktellDated && methodVersions[method] && oktellInfo.oktellDated < methodVersions[method].v ) {
				return false;
			}
			return true;
		};

//		var connectErrors = {
//			10: 'error',
//			11: 'ws login method return error',
//			12: 'desktop client is connected now',
//			13: 'wrong login/pass combination',
//			14: 'session is not exist and no password param',
//			15: 'error loading phone state',
//			16: 'error loading user state',
//			17: 'error loading user info',
//			18: 'error loading version info',
//			19: 'bad url param'
//			20: 'max online users count reached'
//		}
//		var getConnectErrorObj = function(code, msg) {
//			return { errorCode: code, errorMessage: connectErrors[code] + ( msg ? ' ' + msg : '') }
//		}

		/**
		 * Possible disconnect reasons
		 * @type {Object}
		 */
		var disconnectReasons = {
			10: 'critical ws method not supported by this version of Oktell server',
			11: 'error loading version info',
			12: 'websocket connection closed',
			13: 'disconnected by user',
			14: "can't login using oktell.connect"
		};

		/**
		 * Return disconnect reason object
		 * @param code from disconnectReasons
		 * @param msg that will be concatenated to reason message
		 * @return {Object}
		 */
		var getDisconnectReasonObj = function(code,msg){
			return {
				code: code,
				message: ( disconnectReasons[code] + ' ' + (msg||'') ) || ''
			}
		};

		/**
		 * Possible errors
		 * @type {Object}
		 */
		var errorTypes = {
			// common
			1000: 'something goes wrong',
			// exec
			1101: 'method not supported by current Oktell version',
			1102: 'server didnt understand method or response timeout',
			1103: 'error execute method',
			1104: 'bad method for execute',
			1105: 'error execute stored procedure',
			1106: 'bad params',
			// connect
			1200: 'cant connect to server',
			1201: 'error websocket connection',
			1202: 'error login\pass',
			1203: 'oktell version too old',
			1204: 'using oktell desktop client',
			1205: 'error url',
			1206: 'error loading version info',
			1207: 'error loading phone state',
			1209: 'error loading user state',
			1210: 'error loading user info',
			1211: 'login failure',
			1212: 'error connect using session',
			1213: 'no password or session',
			1214: 'max online users count reached, license limitation',
			// call
			2001: 'user state - disconnected',
			2002: 'phone not connected',
			2101: 'user has hold call and is talking now',
			2102: 'user in conference now',
			2103: 'phone state not valid for call',
			2104: 'user state - busy',
			2105: 'calling number is talking with us',
			2106: 'bad number',
			2107: 'error autocall method call',
			2108: 'error user or phone state for call',
			// conference
			2201: 'no numbers to invite',
			2202: 'cant build conference from current call',
			2203: 'no number to create conference',
			2204: 'error conference method call',
			2205: 'bad user or phone state for creating conference',
			2206: 'cant invite hold abonent',
			2207: 'error inviting',
			2208: 'cant create conference while in callcenter in break',
			// transfer
			2301: 'error transfer method call',
			2302: 'bad user or phone state for transfer',
			2303: 'nothing to transfer',
			2304: 'bad number for transfer',
			// toggle
			2401: 'error toggle method executing',
			2402: 'nothing to toggle, no hold',
			// ghost modes
			2501: 'not in conference',
			2502: 'server retunred error while enabling ghost mode',
			2503: 'bad ghost mode',
			2504: 'bad userId or number',
			2505: 'error rigths',
			2506: 'user is not in ghost mode',
			2507: 'cant change ghost mode of this user',
			// flash
			2601: 'bad flash mode',
			2602: 'error while exec flash method',
			// queue
			2701: 'error while loading user queue',
			// change pass
			2801: 'wrong old password',
			2802: 'incorrect new password',
			2803: 'error while exec changepassword method on server',
			// answer
			2901: 'incorrect state',
			2902: 'phone probably does not support intercom calls',
			// uploadFile
			3001: 'error while getting temp pass',
			3002: 'aborted in beforeRequest callback function'

		};

		/**
		 * Return error object
		 * @param code from errorTypes
		 * @param msg that will be added to errorMessage
		 * @param obj that will extend return object
		 * @return {*} error object
		 */
		var getErrorObj = function( code , msg, obj ) {
			code = parseInt(code);

			var errorObj = extend( obj || {},{
				result: false,
				errorCode: code,
				errorMessage: (errorTypes[code] ? errorTypes[code] : '' ) + ( msg ? msg.toString() : '' )
			});
			log ('ERROR ' + code + ' ' + errorObj.errorMessage, errorObj );
			return errorObj;
		};

		/**
		 * Return success object
		 * @param obj that will extend return object
		 * @return {*}
		 */
		var getSuccessObj = function(obj) {
			var sObj = extend( obj || {}, {result:true});
			log('SUCCESS ', sObj)
			return sObj;
		};

		/**
		 * Return object, that explain result of operation, error object or succec object
		 * @param result - if true than return success object, else return error object
		 * @param obj that will extend return object
		 * @param errorCode error code from errorTypes
		 * @param msg that concatenated to returning message
		 * @return {*}
		 */
		var getReturnObj = function( result, obj, errorCode, msg ) {
			if ( result ) {
				return getSuccessObj(obj);
			} else {
				return getErrorObj(errorCode, msg, obj);
			}
		};

		var bindOktellEvent = function(eventNames, callback){
			eventNames = normalizeEventNames(eventNames);
			evObjs = [];
			for (var i = 0; i < eventNames.length; i++) {
				var event = eventNames[i];
				var alreadyExist = false;
				for (var j = 0; j < nativeEventsForBindAfterConnect.length; j++) {
					var obj = nativeEventsForBindAfterConnect[j];
					if ( obj && obj.eventName == event && obj.callback === callback ) {
						alreadyExist = true;
						break;
					}
				}
				if ( alreadyExist ) {
					eventNames[i] = undefined;
				} else {
					var evObj = {eventName:event, callback: callback};
					nativeEventsForBindAfterConnect.push(evObj);
					evObjs.push(evObj);
				}
			}
			if ( oktellConnected() ) {
				for (var i = 0; i < evObjs.length; i++) {
					evObjs[i].binded = true;
				}
				server.bindOktellEvent( eventNames, callback );
			}
		}

		var unbindOktellEvent = function(eventNames, callback) {
			if ( ! eventNames ) {
				nativeEventsForBindAfterConnect = [];
			} else {
				eventNames = normalizeEventNames(eventNames);
				if ( ! eventNames ) { return false; }
				callback = typeof callback == 'function' ? callback : false;

				for (var i = 0; i < eventNames.length; i++) {
					var event = eventNames[i];
					for (var j = 0; j < nativeEventsForBindAfterConnect.length; j++) {
						var evObj = nativeEventsForBindAfterConnect[j];
						if ( evObj && evObj.eventName == event && ( ( callback && evObj.callback === callback ) || ! callback ) ) {
							nativeEventsForBindAfterConnect[j] = undefined;
						}
					}
				}
			}
			if ( server ) {
				server.unbindOktellEvent(eventNames, callback);
			}
		}

		/**
		 * Wrapper for server.sendOktell with userlogin setting
		 * @param method name from Oktell Websocket API
		 * @param params for method
		 * @param callback on oktell server answer
		 */
		var sendOktell = function(method, params, callback) {
			var callbackFn = typeof params == 'function' ? params : callback
			if ( serverConnected() ) {
				if ( isValidMethodVersion(method) ) {
					params = size(params) ? params : {};
					var params = extend({ userlogin: oktellInfo.login }, params );
					var errorTimer;
					if ( typeof callbackFn == 'function' ) {
						var errorTimer = setTimeout(function(){
							log('error timer for method ' + method);
							callFunc(callbackFn,getErrorObj(1102, ': ' + method));
						}, oktellOptions.queryTimeout);
					}
					server.sendOktell(method, params, function(data){
						clearTimeout(errorTimer);
						log('<<<< ' + method, data);
						callFunc(callbackFn,data);
					});
					log('>>>> ' + method, params);

				} else {
					callFunc(callbackFn,getErrorObj(1101, ' ' +method));
					if ( methodVersions[method].critical ) {
						disconnect( getDisconnectReasonObj(10), method );
					}
				}
			} else {
				callFunc(callbackFn,getErrorObj(1201));
			}
		};

		/**
		 * Call oktell websocket API method, that not return anything. sendOktell wrapper
		 * @param method name
		 * @param params for method
		 */
		var sendOktellWithoutBackData = function( method, params ) {
			if ( ! serverConnected() ) {
				return getErrorObj(1201);
			} else if ( ! isValidMethodVersion(method) ) {
				return getErrorObj(1101, ' ' + method);
			} else {
				sendOktell(method, params, null, true);
				return getSuccessObj();
			}
		};

		/**
		 * execute websocket api method or permitted stored procedure on oktell server's db
		 * @param method or procedure name
		 * @param params
		 * @param callback
		 */
		var exec = function(method, params, callback ) {
			var callbackFn = typeof params == 'function' ? params : callback;
			if ( ! method ) {
				callFunc(callbackFn,getErrorObj(1104));
			} else {
				if ( oktellInfo.allowedProcedures[method.toLowerCase()] ) {
					var p = {
						userid: oktellInfo.userid,
						userlogin: oktellInfo.login,
						inputparams: params || {}
					};
					log('>>>> ' + method, p);
					server.execProc(method, p, function(items, datasetRaw){
						var resultdata = {
							result: false
						};
						if ( items ) {
							resultdata.result = true;
							resultdata.datasets = items;
							resultdata.datasetsRaw = datasetRaw;
						}
						log('<<<< ' + method, resultdata);
						callFunc(callbackFn, getReturnObj(resultdata.result, resultdata, 1105, ' ' + method));
					});
				} else {
					if ( ! callbackFn ) {
						sendOktell(method,params);
					} else {
						sendOktell(method,params,function(data){
							var r = data.errorCode ? getReturnObj(data.result,data, data.errorCode) : getReturnObj(data.result,data, 1103, ' ' + method);
							callFunc(callbackFn, r);
						});
					}
				}
			}
		};
		exportApi('exec', exec);

		/**
		 * Custom user events stuff
		 * @type {*}
		 */
		var customEvents = extend({
			/**
			 * Subscribe to all custom event on server
			 * @return {Boolean}
			 */
			sendCustomBinding: function() {
				if ( this._subscribed ) {
					return false;
				}
				this._subscribed = true;
				var that = this;
				server.bindOktellEvent('customevent', function(data){
					if ( data && data.eventname ) {
						that.trigger( data.eventname, data.eventparam );
					}
				});
			},
			/**
			 * Trigger custom event through oktell server
			 * @param eventName
			 * @param recipients userid's array
			 * @param data to send with event
			 * @param send back event or not, used only if recipients array defined
			 */
			triggerCustomEvent: function( eventName, recipientsArr, data, sendBack ) {
				sendOktell( 'triggercustomevent', {
					userid: oktellInfo.userid,
					userlogin: oktellInfo.login,
					eventname: eventName,
					eventparam: data,
					recipients: recipientsArr,
					sendback: sendBack ? 1 : "0"
				});
			}
		},Events);
		exportApi('triggerCustomEvent',customEvents.triggerCustomEvent, customEvents);
		exportApi('offCustomEvent',customEvents.off, customEvents);
		exportApi('onCustomEvent',customEvents.on, customEvents);

		/**
		 * Load users
		 * @param callback
		 */
		var loadUsers = function(callback){
			sendOktell('getallusernumbers', { fillsubordinates: true }, function(data){
				if ( data.result && data.users ) {
					each(data.users, function(u){
						users[ u.id ] = {
							id: u.id,
							name: u.name,
							number: u.main || undefined,
							numbers: u.nums || [],
							//controlMe: u.controlMe ? true : false,
							controlledByMe: u.sub ? true : false
						};
						users[ u.id ].numberObj = numbers[ users[ u.id ].number ] || undefined;
						if ( users[ u.id ].numberObj ) {
							users[ u.id ].numberObj.userid = u.id;
							users[ u.id ].numberObj.userObj = users[ u.id ];
						}
					});
					sendOktell("getalluserphotolink", {mode: "page"}, function(data){
						if ( data.result ) {
							var servPath = getWebServerLink();
							each(data.links, function(data){
								var user = data.id == oktellInfo.userid ? oktellInfo : users[data.id];
								if ( user ){
									user['avatarLink'] = data['link'] ? servPath + data['link32x32'] : oktellOptions.defaultAvatar || '';
									user['avatarLink32x32'] = data['link32x32'] ? servPath + data['link32x32'] : oktellOptions.defaultAvatar32x32 || '';
									user['avatarLink96x96'] = data['link96x96'] ? servPath + data['link96x96'] : oktellOptions.defaultAvatar64x64 || '';
								}
							});
						}

						callFunc(callback);
					});
				} else {
					callFunc(callback);
				}
			});
		};

		/**
		 * Is target user is controlled by me
		 * @param target
		 * @return {*}
		 */
		var userControlledByMe = function( target ) {
			if ( ! target ){
				return false;
			} else if ( (target = target.toString()) && users[target] && users[target].id ) {
				return users[target].controlledByMe;
			} else if  ( numbers[target] && numbers[target].userObj ) {
				return numbers[target].userObj.controlledByMe;
			} else {
				return false;
			}
		};

		/**
		 * Load number plan
		 * @param callback
		 */
		var loadPbxNumbers = function(callback) {
			sendOktell('getpbxnumbers', {mode:'full'}, function(data){
				if ( data.result && data.numbers ) {
					each(data.numbers, function(n){
						numbers[ n.number ] = n;
						numbersById[ n.id ] = numbers[ n.number ];
					});
				}
				callFunc(callback);
			});
		};

		/**
		 * Return url of oktell web server
		 * @return {*}
		 */
		var getWebServerLink = function() {
			if ( oktellInfo.currentUrl && oktellInfo.oktellWebServerPort ) {
				var protocol = oktellInfo.currentUrl.match(/^wss/) ? "https://" : "http://",
					host = oktellInfo.currentUrl.match(/wss?:\/\/([^\s\/:]+)/)[1];
					port = '';
				if ( ( protocol == 'https://' && self.getMyInfo().oktellWebServerPort != '443' ) || ( protocol == 'http://' && self.getMyInfo().oktellWebServerPort != '80' ) ) {
					port = ':' + self.getMyInfo().oktellWebServerPort;
				}
				return protocol + host + port;
			}
			return false;
		};

		/**
		 * Set callback for http query
		 * @param pass
		 * @param onResultsEvent
		 */
		var setHttpQueryCallback = function( pass, callback ) {
			var self = this;
			if ( pass ) {
				httpQueryData[pass] = {
					time: (new Date()).getTime(),
					callback: callback
				}
			}
		}
		//exportApi('setHttpQueryCallback',setHttpQueryCallback);

		/**
		 * Get password for http query
		 * @param callback
		 */
		var getHttpQueryPass = function( responsetowebsock, callback){
			sendOktell('gettemphttppass', {responsetowebsock: responsetowebsock ? true : false}, function(data){
				if ( data.result ) {
					callFunc(callback, getSuccessObj(data))
				} else {
					callFunc(callback, getErrorObj(1103, ' gettemphttppass', data))
				}
			});
		}
		//exportApi('getHttpQueryPass',getHttpQueryPass);

		/**
		 * Set up user avatar
		 * @param filepath
		 * @param callback
		 */
		var setUserAvatar = function( filepath, callback ) {
			if (! filepath) { return ;}

			var t = filepath.toString().split('.');
			if ( t.length < 2 || ['jpg','gif','png','jpeg'].indexOf(t[t.length-1]) == -1 ) {
				return;
			}

			sendOktell('setmyuserphoto', {filepath: filepath}, function(data){
				callFunc(callback, getReturnObj(data.result, {},1103,' setmyuserphoto'));
			});
		};
		exportApi('setUserAvatar', setUserAvatar);

		/**
		 * Load my avatar
		 * @param callback
		 */
		var loadUserAvatar = function(callback) {
			var self = this;
			sendOktell('getuserphoto', {mode: 'page'}, function(data){
				if ( data.result ) {
					var servPath = getWebServerLink();
					oktellInfo['avatarLink'] = data['link'] ? servPath + data['link32x32'] : oktellOptions.defaultAvatar || '';
					oktellInfo['avatarLink32x32'] = data['link32x32'] ? servPath + data['link32x32'] : oktellOptions.defaultAvatar32x32 || '';
					oktellInfo['avatarLink96x96'] = data['link96x96'] ? servPath + data['link96x96'] : oktellOptions.defaultAvatar64x64 || '';

					callFunc(callback, getSuccessObj({
						avatarLink: oktellInfo['avatarLink'], avatarLink32x32: oktellInfo['avatarLink32x32'], avatarLink96x96: oktellInfo['avatarLink96x96']
					}));
				} else {
					callFunc(callback, getErrorObj(1103, ' getuserphoto'));
				}
			});
		};
		exportApi('getUserAvatar',loadUserAvatar);

		/**
		 * Upload file to Oktell webserver. jQuery used if exist, else pure javascript version called
		 * @param storagemode - storage, temp, script or scriptplain
		 * @param pathmode - absolute or relative
		 * @param callback
		 * @return
		 */
		var uploadFile = function( options, callback, beforeRequest) {
			var $ = window.$ || window.jQuery || undefined;
			if ( ! $ ) {
				return uploadFilePure.apply(self, arguments);
			}

			var accept = options.accept;
			delete options.accept;
			if ( accept ) {
				if ( ! isArray(accept) ) {
					accept = [accept];
				}
				accept = 'accept="' + accept.join(',') + '"';
			} else {
				accept = '';
			}

			var rid = Math.random().toString().replace('.',''),
				frameId = '_oktelljs_user_avatar_frame_' + rid,
				formId = '_oktelljs_user_avatar_form_' + rid,
				inputId = '_oktelljs_user_profile_select_file_' + rid;

			$('body').append('<iframe width="0" height="0" id="'+frameId+'" name="'+frameId+'"></iframe>');
			$('body').append('<form enctype="multipart/form-data" target="'+frameId+'" id="'+formId+'" action="" method="post">' +
				'<input style="visibility: hidden;" type="file" ' + accept + ' name="file" id="'+inputId+'" /></form>');

			var callCallback = function(data) {
				$('#'+formId).remove();
				$('#'+frameId).remove();
				callFunc(callback, data);
			}

			$('#'+inputId).change(function(e){

				var file = $(e.currentTarget).val();

				if ( ! file ) {
					return;
				}

				var fileName = file.replace('/', '\\').split('\\');
				fileName = fileName[fileName.length-1];

				if ( typeof beforeRequest == 'function' && beforeRequest(getSuccessObj({fileName:fileName})) === false ) {
					callCallback(getErrorObj(3002));
					return;
				}

				getHttpQueryPass( true, function(data){

					if ( data.result ) {

						$("#"+formId).attr("action", getWebServerLink() + "/upload?temppass="+ data.password + buildParams(options) );

						setHttpQueryCallback( data.password, function(data){
							var r = /uploadfilesresult count="1"[\s\S]+?path="([\s\S]+?)"/,
								path = r.exec(data);

							if ( !path || ! path[1] ) {
								return false
							}

							path = path[1].replace( /\\/g , '/');

							callCallback(getSuccessObj({path:path}));
						});

						$('#'+formId).submit()
					} else {
						callCallback(getErrorObj(3001));
					}

				});
			});


			$('#'+inputId).click()


		};

		/**
		 * Upload file to Oktell webserver. Pure javascript version
		 * @param storagemode - storage, temp, script or scriptplain
		 * @param pathmode - absolute or relative
		 * @param callback
		 * @return
		 */
		var uploadFilePure = function( options, callback) {
			var rid = Math.random().toString().replace('.',''),
				frameId = '_oktelljs_user_avatar_frame_' + rid,
				formId = '_oktelljs_user_avatar_form_' + rid,
				inputId = '_oktelljs_user_profile_select_file_' + rid;

			var accept = options.accept;
			delete options.accept;
			if ( accept ) {
				if ( ! isArray(accept) ) {
					accept = [accept];
				}
				accept = 'accept="' + accept.join(',') + '"';
			} else {
				accept = '';
			}

			var iframe = document.createElement('iframe');
			iframe.id = frameId;
			iframe.name = frameId;
			iframe.width = 0;
			iframe.height = 0;
			document.body.appendChild(iframe);

			var form = document.createElement('form');
			form.id = formId;
			form.style.display = 'none';
			form.target = frameId;
			form.enctype = "multipart/form-data";
			form.action = '';
			form.method = 'post';
			document.body.appendChild(form);

			var input = document.createElement('input');
			input.style.visibility = 'hidden';
			input.type = 'file';
			input.id = inputId
			input.name = 'file';
			input.accept =  accept;
			form.appendChild(input);

			var callCallback = function(data) {
				var elem;
				(elem=document.getElementById(frameId)).parentNode.removeChild(elem);
				(elem=document.getElementById(formId)).parentNode.removeChild(elem);
				callFunc(callback, data);
			}


			input.onchange = function() {
				var file = input.value;

				if ( ! file ) {
					return;
				}

				var fileName = file.replace('\\', '/').split('/');
				fileName = fileName[fileName.length-1];

				if ( typeof beforeRequest == 'function' && beforeRequest(getSuccessObj({fileName:fileName})) === false ) {
					callCallback(getErrorObj(3002));
					return;
				}

				getHttpQueryPass( true, function(data){
					if ( data.result ) {
						form.action = getWebServerLink() + "/upload?temppass="+ data.password + '&' + buildParams(options);

						setHttpQueryCallback( data.password, function(data){
							var r = /uploadfilesresult count="1"[\s\S]+?path="([\s\S]+?)"/,
								path = r.exec(data);

							if ( !path || ! path[1] ) {
								return false
							}

							path = path[1].replace( /\\/g , '/');

							callCallback(getSuccessObj({path:path}));
						});

						form.submit();
					} else {
						callCallback(getErrorObj(3001));
					}
				});
			}

			input.click();

		};
		exportApi('uploadFile', uploadFile);

		var DynamicMethods = (function(){
			function DynamicMethods(oktell, server){
				var self = this;
				self.oktell = oktell;
				self.server = server;
				self.currentMethods = {};
				self.methodTimers = {};
				self.onExecuteMethod = function(data){
					if ( ! data.executionid ) {
						return false;
					}
					self.currentMethods[data.executionid] = true;
					oktell.trigger('')
				};
				self.onCancelMethod = function(data){
					if ( ! data.executionid ) {
						return false;
					}
					delete self.currentMethods[data.executionid];
				};
				self.onExecuteMethodWaitAborted = function(data){
					if ( ! data.executionid ) {
						return false;
					}
					self.currentMethods[data.executionid] = true;
					self.methodTimers[data.executionid] = setTimeout(function(){
						delete self.currentMethods[data.executionid];
					}, data.waitresponsems );
				};
			};
			DynamicMethods.prototype.init = function(server){
				var self = this;
				self.server.bindOktellEvent('dynamic', function(){});
				self.server.bindOktellEvent('dynamicwaitabort', function(){});
				self.server.bindOktellEvent('executemethod', self.onExecuteMethod, self);
				self.server.bindOktellEvent('cancelmethod', self.onCancelMethod, self);
				self.server.bindOktellEvent('executemethodwaitaborted', self.onExecuteMethodWaitAborted, self);
			}
			DynamicMethods.prototype.sendMethodResult = function(executionId, data){
				var self = this;
				if ( self.currentMethods[executionId] ) {
					delete self.currentMethods[executionId];
					sendOktell('methodresult', {executionid: executionId, outputparameters: data || {}});
				} else {
					return false;
				}
			}
			DynamicMethods.prototype.reset = function(){
				var self = this;
				self.currentMethods = {};
				for ( var id in self.methodTimers ) {
					if ( self.methodTimers.hasOwnProperty(id) ) {
						clearTimeout(self.methodTimers[id]);
					}
				}
				self.server.unbindOktellEvent('executemethod', self.onExecuteMethod);
				self.server.unbindOktellEvent('cancelmethod', self.onCancelMethod);
				self.server.unbindOktellEvent('executemethodwaitaborted', self.onExecuteMethodWaitAborted);

			}
			return DynamicMethods;
		})();
		extend(DynamicMethods.prototype, Events);
		// TODO bindOktell or self.server.bindOktellEvent ?
		var dynamicMethods = new DynamicMethods()



		/**
		 * USER STATES
		 * @type {Object}
		 */
		var userStates = extend({},Events,{
			_stateId: 0,
			states: {
				DISCONNECTED: 0,
				READY: 1,
				BREAK: 2,
				OFF: 3,
				BUSY: 5,
				RESERVED: 6,
				NOPHONE: 7
			},
			webStates: {
				READY: 1, //'Ready for calls',
				DND: 2, //'DND',
				REDIRECT: 3, //'Redirect', not in callcenter
				BREAK: 4 // break, only in callcenter
			},
			onCallCenter: 0,
			_onRedirect: false,
			_status: 0,
			_webStateId: 0,
			onBreak: 0,
			breakReasons: {},

			loadBreakReasons: function(callback) {
				var that = this;
				sendOktell('cc_getlunchtypes', {}, function(data){
					if ( data.result ) {
						each( data.items, function(r){
							that.breakReasons[r.id.toString()] = r;
						});

					}
					callFunc(callback, getReturnObj(data.result, data, 1103, ' cc_getlunchtypes') );
				});
			},

			/**
			 * String name for state
			 * @param code
			 * @return {*}
			 */
			getStateStr: function( code ) {
				return getStateByCode( code === undefined ? this._stateId : parseInt(code), this.states );
			},

			/**
			 * String name for web state
			 * @param code
			 * @return {*}
			 */
			getWebStateStr: function( code ) {
				return getStateByCode( code === undefined ? this._webStateId : parseInt(code), this.webStates );
			},

			/**
			 * Получение состояния и локальное сохранение нового состояния
			 * Get or set current state
			 * @param newStateId
			 * @return {Number} current stateId
			 */
			state: function( newStateId ){
				newStateId = parseInt(newStateId);
				if ( this.getStateStr(newStateId) && this._stateId !== newStateId ) {
					log('SET USER STATE ' + newStateId + ' ' + this.getStateStr(newStateId) );
					this._stateId = newStateId;
					this.trigger('userStateChange', this._stateId);
				}
				return this._stateId;
			},

			/**
			 * Change states through change stateid on server or enabling redirect on server. Also save local states
			 * @param newWebState
			 * @param silent - if true, then event statusChange API event
			 * @param message - lunch reason message in callcenter
			 * @return {Boolean}
			 */
			changeStates: function( newWebState, silent, message ) {
				newWebState = this.webStates[newWebState.toString().toUpperCase()] || parseInt(newWebState);

				if ( ! this.getWebStateStr(newWebState) ) { return false; }

				if ( ( newWebState == this._webStateId && ! this.setAfterBusy ) || ! serverConnected() ) { return false; }
				var userState = this.state();
//				// set state, that was set while user was busy
//				if ( userState == this.states.BUSY && this.setAfterBusy && this.setAfterBusy != newWebState ) {
//					newWebState = this.setAfterBusy;
//					this.setAfterBusy = false;
//				}

				switch(newWebState) {
					case 1:
						if ( userState == this.states.BUSY ) {
							this.setAfterBusy = this.webStates.READY;
						} else {
							sendOktell('setuserstate', {userstateid: 1});
						}
						break;
					case 2:
						if ( userState == this.states.BUSY ) {
							this.setAfterBusy = this.webStates.DND;
						} else {
							if ( userState == this.states.READY || userState == this.states.BREAK || userState == this.states.OFF ) {
								sendOktell('setuserstate', {userstateid: 3} );
							}
						}
						break;
					case 3:
						if ( this.getRedirectNumber() ) {
							this.enableUserRedirectState( true );
						} else {
							return false;
						}
						break;
					case 4:
						if ( this.onCallCenter ) { //&& ( userState == this.states.READY || userState == this.states.BREAK || userState == this.states.OFF ) ) {
							var sObj = {userstateid: 2}, msg = '';
							if ( message ) {
								if ( this.breakReasons[message] ) {
									sObj.lunchreasonid = message;
								} else {
									sObj.lunchreasonmsg = message;
								}
							}
							sendOktell('setuserstate', sObj );
						}
						break;
				}

				this.webState(newWebState, silent);
				return true;
			},

			/**
			 * Save stateId local
			 * @param newStateId
			 * @param newStateId
			 * @param silent silent - if true, then event statusChange API event
			 * @return {Number}
			 */
			webState: function( newStateId, silent ) {
				if ( newStateId !== undefined && this.getWebStateStr(newStateId) && this._webStateId != newStateId ) {
					log('SET WEB STATE ' + this.getWebStateStr(newStateId));
					var oldStatus = this.getWebStateStr(this._webStateId);
					this._webStateId = newStateId;
					if ( ! silent ) {
						self.trigger('statusChange', this.getWebStateStr(this._webStateId), oldStatus );
					}
				}
				return this._webStateId;
			},

			/**
			 * Get redirect state or save redirect state locally
			 * @param newState новое состояние переадресации
			 * @return {Boolean} текущее состояние переадресации
			 */
			onRedirect: function(newState) {
				if ( newState !== undefined ) {
					newState = newState ? true : false;
					if ( this._onRedirect !== newState) {
						this._onRedirect = newState;
						events.trigger('userOnRedirectChanged', this._onRedirect);
					}
				}
				return this._onRedirect;
			},

			/**
			 * Load all states from server
			 */
			loadState: function(callback) {
				var that = this;
				sendOktell('getuserstate', {}, function(data){
					if ( data.result ) {
						that.saveStatesFromServer(data);
					}
					callFunc(callback, getReturnObj(data.result,data,1103,' getuserstate'));
				});
			},

			callCenterState: function(newState) {
				if ( newState !== undefined ) {
					newState = newState ? true : false;
					if ( this.onCallCenter !== newState ) {
						this.onCallCenter = newState;
						self.trigger('callCenterStateChange', this.onCallCenter );
					}
				}
				return this.onCallCenter;
			},

			/**
			 * Save and set all states locally
			 * @param data loaded from server {oncallcenter, onlunch, onredirect, userstateid}
			 */
			saveStatesFromServer: function(data) {
				this.callCenterState( data.oncallcenter );
				this.onBreak = data.onlunch;
				this.onRedirect(data.onredirect);

				var currentWebState = this.webState();
				var currentState = this.state();
				this.state( data.userstateid );
				if ( currentWebState == this.webStates.DND && this.setAfterBusy == this.webStates.DND && currentState == 5 && data.userstateid == 1 ) {
					this.setAfterBusy = false;
					this.changeStates(this.webStates.DND, true);
					return;
				}

				this.setWebStateFromUserState();
			},

			setUserStateBusy: function() {
				this.state(5);
			},

			/**
			 * Get redirect rule id for redirect state
			 * @return {String}
			 */
			getUserRedirectId: function() {
				return md5( oktellInfo.userid.toLocaleLowerCase() + oktellInfo.userid.toLocaleLowerCase() ).toLowerCase();
			},

			/**
			 * Get current redirect number
			 * @return {*} number or undefined
			 */
			getRedirectNumber: function() {
				return oktellInfo.redirectNumber ? oktellInfo.redirectNumber : undefined;
			},

			/**
			 * Set redirect number locally
			 * @param number
			 * @return {*} object like {number:'564'} or undefined
			 */
			setRedirectNumber: function( number ) {
				oktellInfo.redirectNumber =  number ? number : undefined;
				return oktellInfo.redirectNumber;
			},

			/**
			 * Load redirect number from server and set it locally
			 * @param callback
			 */
			checkUserRedirect: function(callback){
				var that = this;
				sendOktell("getredirectrules",{}, function(data){
					if ( data.result ) {
						var rule;
						if ( data.redirectrules && data.redirectrules.length > 0 ) { // ищем наше правило
							each( data.redirectrules, function(rule) {
								if ( rule.id.replace(/-/g,'').toLowerCase() == that.getUserRedirectId() ) {
									that.setRedirectNumber(rule.destinationnumber);
								}
							});
						}
					}
					callFunc(callback,getReturnObj(data.result,data,1103,' getredirectrules'));
				});
			},

			/**
			 * Save redirect number
			 * @param number or empty if need to cancel redirect
			 * @param callback
			 */
			saveUserRedirect: function(number,callback) {
				var that = this;
				if ( ! number ) {
					sendOktell("deleteredirectrules",{ ids: [ this.getUserRedirectId() ] }, function(data){
						if ( data.result ) {
							that.setRedirectNumber(undefined);
							if ( that.webState() == that.webStates.REDIRECT ) {
								that.changeStates( that.webStates.READY );
							}
						}
						callFunc(callback,getReturnObj(data.result,data,1103,' deleteredirectrules'));
					});

				} else {
					sendOktell("saveredirectrules",{
						redirectrule: {
							id: that.getUserRedirectId(),
							caption: 'Переадресация сохраненная из веб-октела. Действует постоянно.',
							description: 'Переадресация сохраненная из веб-октела. Действует постоянно.',
							priority: 1,
							userid: oktellInfo.userid,
							isenabled: true,
							allowcascade: true,
							state: 2,
							destinationnumber: number,
							onlyforredirectstate: true,
							definesources: false
						}
					}, function(data){
						if ( data.result ) {
							that.setRedirectNumber(number);
						}
						callFunc(callback,getReturnObj(data.result,data,1103,' saveredirectrules'));
					});
				}
				return true;
			},

			/**
			 * enable or disable redirect on server
			 * @param enable
			 */
			enableUserRedirectState: function( enable ) {
				sendOktell('setuserstate', { onredirect: enable ? true : false });
			},

			/**
			 * Set web state by stateId
			 */
			setWebStateFromUserState: function() {
				if ( ! this.onRedirect() ) {
					switch ( this.state() ) {
						case 1:
							this.webState( this.webStates.READY );
							break;
						case 2:
							this.webState( this.webStates.BREAK );
							break;
						case 3:
							this.webState( this.webStates.DND);
							break;
						case 5:
							if ( this.onBreak && this.onCallCenter ) {
								this.webState( this.webStates.BREAK );
							} else {
								this.webState( this.webStates.READY );
							}
							break;
						case 7:
							this.webState( this.webStates.READY );
							break;
					}
				} else {
					this.webState( this.webStates.REDIRECT );
				}
			}

		});
		exportApi('setRedirectNumber', userStates.saveUserRedirect, userStates);
		exportApi('getStatus', userStates.getWebStateStr, userStates);
		exportApi('setStatus', userStates.changeStates, userStates);
		exportApi('setUserStateBusy', userStates.setUserStateBusy, userStates);

		/**
		 * PHONE
		 * @type {Object}
		 */
		var phone = {

			_conferenceInfo: {},
			_holdNumber: false,
			_conferenceId: false,
			abonentList: {},
			queueList: {},
			answerCheckTimeout: 3000,
			_talkLength: 0,
			_talkTimer: false,
			sip: false,
			sipActive: false,
			sipHasRTCSession: false,
			_notRoutingIvrState: false,
			currentSessionData: {},
			intercomSupport: null,
			states: {
				DISCONNECTED: -1,
				READY: 0,
				BACKCALL: 1,
				CALL: 2,
				RING: 3,
				BACKRING: 4,
				TALK: 5
				//CALLWEBPHONE: 6
			},


			setSipPhone: function(sip) {
				var that = this;
				that.sip = sip;
				that.sip.on('connect', function(){
					that.sipActive = true;
				});
				that.sip.on('disconnect', function(){
					that.sipHasRTCSession = false;
					that.sipActive = false;
				});
				that.sip.on('ringStart', function( name, remoteIdentity){
					self.trigger('webrtcRingStart', name, remoteIdentity);
				});
				that.sip.on('RTCSessionFailed', function(){

				});
				that.sip.on('RTCSessionStarted', function(){
					that.sipHasRTCSession = true;
					self.trigger('')
//					that.loadStates();
				});
				that.sip.on('RTCSessionEnded', function(){
					that.sipHasRTCSession = false;
					that.loadStates();
				});
				that.sip.on('sessionClose', function(){
					that.sipHasRTCSession = false;
					that.loadStates();
				});

			},

			notRoutingIvrState: function(state){
				if ( typeof state !== "undefined" && Boolean(state) !== this._notRoutingIvrState ){
					this._notRoutingIvrState = Boolean(state);
				}
				return this._notRoutingIvrState;
			},

			answer: function(callback) {
				var self = this,
					checkInterval,
					checkIntercomSupport,
					afterTimer,
					isAnswerSuccess;

				if ( self.sipActive ) {
					self.sip.answer();
					callFunc(callback, getSuccessObj()); // TODO check answer result for callback
				} else if ( self.intercomSupport === false ) {
					callFunc(callback, getErrorObj(2902));
				} else if ( self.state() == self.states.RING || self.state() == self.states.BACKRING ) {
					sendOktell('pbxanswercall');
					afterTimer = function(){
						clearInterval(checkInterval);
						clearTimeout(checkTimer);
						callFunc(callback, getReturnObj(self.intercomSupport, {}, 2902));
					}
					checkIntercomSupport = function(){
						return self.intercomSupport = ( self.state() == self.states.TALK || self.state() == self.states.CALL );
					}
					checkInterval = setInterval(function(){
						if ( checkIntercomSupport() ) {
							afterTimer();
						}
					}, 50);
					checkTimer = setTimeout(function(){
						afterTimer();
					}, self.answerCheckTimeout);
				} else {
					callFunc(callback, getErrorObj(2901));
				}
			},

			/**
			 * Set info about conference
			 * @param newInfoObj
			 */
			setConferenceInfo: function( newInfoObj ) {
				this._conferenceInfo = typeof newInfoObj == 'object' ? newInfoObj : {};
			},

			/**
			 * Get info about conference
			 * @return {*|Object}
			 */
			getConferenceInfo: function() {
				return this._conferenceInfo || {};
			},

			/**
			 * Clear hold info
			 * @return {Boolean}
			 */
			clearHold: function() {
				this.setHold(false);
				return true;
			},
			/**
			 * Set hold info
			 * @param info - phone number or conference id
			 * @return {Boolean} успех
			 */
			setHold: function( info ) {
				var oldHoldInfo = this.getHoldInfo();
				if ( info !== undefined && ( ( info.userid && info.userid != this._holdNumber ) || ( info.number && info.number != this._holdNumber ) || ( info.conferenceid && info.conferenceid != this._holdNumber ) ) ) {

					var oldHoldAbonent = this._holdAbonent;

					this._holdNumber = info.conferenceid ? info.conferenceid : ( info.userid ? info.userid : info.number );
					this._holdAbonent = info.conferenceid ? {
						isConference : true,
						conferenceId: info.conferenceid,
						conferenceName: info.conferencename,
						conferenceRoom: info.conferenceroom
					} : this.createAbonent(info);

					var holdAbonentChange = false;
					if ( oldHoldAbonent && ( oldHoldAbonent.key != this._holdAbonent.key ) || ( ! this._holdAbonent ) ) {
						holdAbonentChange = true;
						self.trigger('holdAbonentLeave', cloneObject(oldHoldAbonent) );
					}

					if ( !(oldHoldAbonent && this._holdAbonent && this._holdAbonent.key && oldHoldAbonent.key && this._holdAbonent.key == oldHoldAbonent.key ) ) {
						holdAbonentChange = true;
						self.trigger('holdAbonentEnter', cloneObject(this._holdAbonent));
					}
					var newHoldInfo = this.getHoldInfo();
					if ( oldHoldInfo.hasHold != newHoldInfo.hasHold || holdAbonentChange ) {
						self.trigger('holdStateChange', cloneObject(newHoldInfo));
					}
					return true;
				} else if ( info === false ) {
					if ( this._holdAbonent ) {
						self.trigger('holdAbonentLeave', cloneObject(this._holdAbonent));
					}
					this._holdAbonent = undefined;
					var oldHold = this._holdNumber;
					this._holdNumber = false;

					if ( oldHold !== this._holdNumber ) {
						self.trigger('holdStateChange', cloneObject(this.getHoldInfo()));
					}
				}
				return false;
			},
			/**
			 * Get hold info
			 * @return {Object}
			 */
			getHoldInfo: function() {
				var i = {
					hasHold: this._holdNumber ? true : false
				};
				if ( i.hasHold ) {
					if ( this._holdAbonent && this._holdAbonent.isConference ) {
						extend(i,cloneObject(this._holdAbonent));
					} else {
						i.isConference = false;
						i.abonent = cloneObject(this._holdAbonent);
					}
				}
				return i;
			},

			/**
			 * Set conference id
			 * @param newConferenceId
			 * @param notLoadConfAbonents boolean
			 * @return {Boolean}
			 */
			conferenceId: function( newConferenceId, notLoadConfAbonents ) {
				if ( newConferenceId !== undefined && newConferenceId != this._conferenceId ) {
					var oldConfId = this._conferenceId;
					this._conferenceId = newConferenceId;
					if ( oldConfId ) {
						sendOktell('confhandleevent', {
							conferenceid: oldConfId,
							eventtype: 'competitors',
							handle: false
						});
					}
					if ( this._conferenceId ) {

						sendOktell('confhandleevent', {
							conferenceid: this._conferenceId,
							eventtype: 'competitors',
							handle: true
						});

						if ( ! notLoadConfAbonents ) {
							this.loadConferenceInfo();
						}
					} else {
						this.setConferenceInfo(false);
					}
				}
				return this._conferenceId;
			},
			/**
			 * Set me as conference creator, or get
			 * @param newState
			 * @return {*}
			 */
			isConfCreator: function( newState ) {
				if ( newState !== undefined ) {
					this._isConfCreator = newState ? true : false;
				}
				return this._isConfCreator;
			},

			/**
			 * Return string description of phone state by state code
			 * @param code , if undefined, current code will be used
			 * @return {*}
			 */
			getStateStr: function( code ) {
				return getStateByCode( code === undefined ? this._stateId : parseInt(code), this.states );
			},

			/**
			 * Return string description of phone state for outside api calls. Replace BACKCALL to CALL
			 * @param code
			 * @return {*}
			 */
			apiGetStateStr: function(code) {
				var state = code === undefined ? this.state() : parseInt(code);
				if ( state == this.states.BACKCALL ) {
					state = this.states.CALL;
				}
				return this.getStateStr(state);
			},

			/**
			 * Set or get current state
			 * @param newStateId
			 * @return {*} current state id
			 */
			state: function( newStateId, oldAbonents, fireEventAnyway ) {
				newStateId = parseInt(newStateId);

				if ( this.getStateStr(newStateId) && ( fireEventAnyway || newStateId != this._stateId ) ) {

					var newState = this.apiGetStateStr(newStateId);
					var oldStateId = this._stateId;
					var oldState = this.apiGetStateStr(oldStateId);

					log('CHANGE STATE FROM ' + this.getStateStr(this._stateId) + ' TO ' + this.getStateStr(newStateId), this.getAbonents(true), oldAbonents);

					this._stateId = newStateId;

					if ( newStateId === this.states.READY || newStateId === this.states.DISCONNECTED ) {
						this.removeAbonents();
						this.conferenceId(false);
						this.isConfCreator(false);
						if ( newStateId === this.states.DISCONNECTED ) {
							this.clearHold();
						}
					}

					self.trigger('stateChange', newState, oldState );

					var abonents = this.getAbonents(true);
					if ( abonents.length == 0 ) {
						abonents = oldAbonents;
					}

//					var abonentsForTalkStop = newStateId == this.states.TALK && oldStateId == this.states.TALK ? oldAbonents : abonents;

					switch ( oldStateId ) {
						case this.states.READY: self.trigger('readyStop', oldAbonents); break;
						case this.states.RING: self.trigger('ringStop', oldAbonents); break;
						case this.states.BACKRING: self.trigger('backRingStop', oldAbonents); break;
						case this.states.CALL: self.trigger('callStop', oldAbonents); break;
						case this.states.BACKCALL: self.trigger('callStop', oldAbonents); break;
						case this.states.TALK: self.trigger('talkStop', oldAbonents); break;
					}

					switch ( this._stateId ) {
						case this.states.READY: self.trigger('readyStart', abonents); break;
						case this.states.RING: self.trigger('ringStart', abonents); break;
						case this.states.BACKRING: self.trigger('backRingStart', abonents); break;
						case this.states.CALL: self.trigger('callStart',abonents); break;
						case this.states.BACKCALL: self.trigger('callStart', abonents); break;
						case this.states.TALK: self.trigger('talkStart', abonents); break;
						//case this.states.CALLWEBPHONE: self.trigger('webphoneCallStart', abonents); break;
					}


				}

				return this._stateId;
			},

			/**
			 * Load hold state
			 * @param callback
			 */
			loadFlashInfo: function(callback) {
				var that = this;
				sendOktell('getflashedabonentinfo', {}, function(data){
					if ( data.result ) {
						if ( data.containsflashed && data.abonent ) {
							that.setHold( data.abonent );
						} else {
							that.clearHold();
						}
					}
					callFunc(callback,getReturnObj(data.result,data,1103,' getflashedabonentinfo'));
				});
			},

			/**
			 * Load phone state
			 * @param callback
			 * @params knownData some already known data (for example knownData.isAutoCall, knownData.sequence, etc)
			 * possible properties for knownData
			 * 		isAutoCall: boolean
			 */
			loadStates: function(callback, knownData) {
				var that = this;
				knownData = knownData || {};
				extend(that.currentSessionData, knownData);
				//that.loadFlashInfo(function(data){
				if ( ! serverConnected() ) {
					return false;
				}

				sendOktell('getextendedlineinfo', {}, function(data) {
					var callCallback = function(){
						callFunc(callback,getReturnObj(data.result,data,1103,' getextendedlineinfo'));
					}

					log('getextendedlineinfo result and that.currentSessionData', data, that.currentSessionData);

					if ( data.result ) {

						var oldState = that.state();
						var oldHoldInfo = that.getHoldInfo();
						var oldAbonents = that.getAbonents(true);
						var oldAb = oldAbonents && oldAbonents[0] || false;

						var setStateFromResultData = function() {
							log('setStateFromResultData');

							// check if toggle called
							var newHoldInfo = that.getHoldInfo();
							var newAbonents = that.getAbonents(true);
							var newAb = newAbonents && newAbonents[0] || false;

							/*if ( newAb && oldAb && oldHoldInfo.hasHold && newHoldInfo.hasHold &&
									( // curr ab is old hold
										( newAb.conferenceId && oldHoldInfo.conferenceId && newAb.conferenceId == oldHoldInfo.conferenceId ) || // curr ab is conf and it is old hold
										( ! newAb.conferenceId && oldHoldInfo.abonent && newAb.key == oldHoldInfo.abonent.key ) // or curr ab isnt conf and it is old hold
									)
									&&
									( // old ab is curr hold
										( oldAb.conferenceId && newHoldInfo.conferenceId && oldAb.conferenceId == newHoldInfo.conferenceId ) || // curr ab is conf and it is old hold
										( ! oldAb.conferenceId && newHoldInfo.abonent && oldAb.key == newHoldInfo.abonent.key ) // or curr ab isnt conf and it is old hold
									)
								) {

								log('toggle was called');

							} else*/ if ( that.currentSessionData.isAutoCall && ! data.abonent.isautocall && oldState == that.states.READY ) {
								that.state( that.states.BACKRING, oldAbonents );
							} else if ( data.abonent.isautocall ) {
								that.currentSessionData.isAutoCall = false;
								that.state( that.states.BACKCALL, oldAbonents );
							} else if ( data.abonent.isringing ) {
								if ( data.abonent.direction == 'acm_callback' || oldState == that.states.BACKRING ) {
									that.state( that.states.BACKRING, oldAbonents );
								} else {
									that.state( that.states.RING, oldAbonents );
								}
							} else if ( ( !( that.currentSessionData.isAutoCall ) && (
											data.abonent.iscommutated ||
											data.abonent.iswaitinginflash ||
											data.abonent.isconference ) ) ||
										( data.linestatestr == 'lsCommutated' && data.abonent.isivr && ! data.abonent.isroutingivr )
								) {  // || data.abonent.isivr) ) {
								that.startTalkTimer(parseInt(data.timertalklensec) || 0);
								var newTalkStarted = that.currentSessionData.commStopped;
								that.currentSessionData.commStopped = false;
								that.state( that.states.TALK, oldAbonents, newTalkStarted );
							} else if ( data.abonent.extline || data.abonent.number ) { //
								that.currentSessionData.isAutoCall = false;
								that.state( that.states.CALL, oldAbonents );
							} else if ( data.linestatestr == 'lsDisconnected' ) {
								that.state( that.states.DISCONNECTED );
							} else if ( oldState == that.states.TALK && that.sipHasRTCSession ) {

							} else if ( data.linestatestr != 'lsReserved' ) {
								that.currentSessionData = {};
								that.state( that.states.READY, oldAbonents );
//								if ( oldState !== that.state() && that.sipActive ) {
//									that.sip.hangup();
//								}
							}
						}

						if ( data.isflashing && data.flashed ) {
							that.setHold( data.flashed );
						} else {
							that.setHold(false);
						}

						if ( data.abonent ) {
							if ( ! data.abonent.conferenceid ) {
								data.abonent.chainId = data.chainid;
								that.setAbonent( data.abonent, ( oldState == that.states.TALK && that.sipHasRTCSession ) || data.abonent.isivr || that.currentSessionData.isAutoCall );
								that.conferenceId(false);
								setStateFromResultData();
								callCallback();
							} else {
								that.conferenceId(data.abonent.conferenceid, true);
								that.loadConferenceInfo(function(){
									setStateFromResultData();
									callCallback();
								});
							}
						} else {
							callCallback();
						}
					} else {
						callCallback();
					}

				});
				//});
			},

			/**
			 * Load current conference competitors
			 * @param callback
			 */
			loadConferenceInfo: function(callback) {
				var that = this;
				sendOktell('getconferenceinfo', { conferenceid: this.conferenceId() }, function(data){
					that.setConfAbonentList(data.competitors);
					that.setConferenceInfo( data.conference );
					callFunc(callback,getReturnObj(data.result,data,1103,' getconferencecompetitors'));
				});
			},

			/**
			 * Create abonent object from loaded data
			 * @param data
			 * @return {*}
			 */
			createAbonent: function(data) {
				var key = data.competitorid || data.number || data.userid || data.callerid || ( data.chainId != '00000000-0000-0000-0000-000000000000' && data.chainId );
				if ( ! key && data.isivr ) {
					key = newGuid();
				}
				if ( key ) {
					var abonent = new Abonent();
					extend(abonent, {
						key: key,
						guid: data.competitorid || data.userid,

						isIvr: data.isivr,
						ivrName: data.ivrname || undefined,

						isConferenceCompetitor: data.competitorid ? true : false,
						conferenceId : this.conferenceId(),
						isConferenceCreator: data.competitorid && data.iscreator ? true : undefined,
						isConferenceDirector: data.competitorid && data.isdirector ? true : undefined,
						isConferenceGhost: data.competitorid && data.isghost ? true : undefined,
						isConferenceGhostMajor: data.competitorid && data.isghostmajor ? true : undefined,
						isConferenceHidden: data.competitorid && data.ishidden ? true : undefined,
						isExternal: data.isextline ? true : false,

                        chainId: data.chainId,

						phone: data.number ? data.number.toString() : ( data.calledid ? data.callerid.toString() : undefined ),
						phoneFormatted: data.number ? formatPhone( data.number.toString() ) : undefined,

						name: data.simplename || data.username || data.name || data.caption || data.userlogin || data.number || data.ivrname,

						isUser: data.userid ? true : false,
						user : {
							id: data.userid || undefined,
							name : data.username || undefined,
							login: data.userlogin || undefined,
							comment: data.comment || undefined
						},

						isClient: undefined,
						client : {
							id: undefined,
							name: undefined
						},
						line: {
							id: undefined,
							number: undefined
						}
					});
					return abonent;
				}
				return false;
			},

			/**
			 * Set current abonent (for simple calls)
			 * @param data - loaded info about abonent
			 * @return {*}
			 */
			setAbonent: function(data, saveOldAbonentIfEmpty) {
				var oldKey;
				if ( size(this.abonentList) ) {
					each(this.abonentList, function(ab,key){
						oldKey = key;
					});
				}
				var oldAbonent = this.abonentList[oldKey];
				this.abonentList = {};
				var a = data ? this.createAbonent(data) : undefined;
				if ( a ) {
					this.abonentList[a.key] = a;
					if ( a.key != oldKey ) {
						self.trigger('abonentListChange', this.getAbonents() );
						self.trigger('abonentsChange', this.getAbonents(true) );
					}
				} else if ( oldAbonent && saveOldAbonentIfEmpty ) {
					this.abonentList[oldKey] = oldAbonent;
				} else if ( oldKey ) {
					self.trigger('abonentListChange', this.getAbonents() );
					self.trigger('abonentsChange', this.getAbonents(true) );
				}
				return this.abonentList;
			},

			/**
			 * Set abonents list from loaded conference's competitors list
			 * @param abonents
			 * @return {Boolean}
			 */
			setConfAbonentList: function( abonents ){
				var newList = {},
					that = this;
				if ( abonents && isArray(abonents) ) {
					each( abonents, function(ab) {
						if ( ! that.getConferenceInfo().isghost || ( that.getConferenceInfo().isghost && ( ab.isghost || ab.userid == oktellInfo.userid || ab.number == oktellInfo.number ) ) ) {
							newList[ ab.competitorid ] = true;
							if ( ! that.abonentList[ ab.competitorid ] ) {
								var a = that.createAbonent(ab);
								that.abonentList[a.key] = a;
								if ( that.conferenceId() && that.state() == that.states.TALK ) {
									self.trigger('conferenceAbonentEnter', that.abonentList[a.key] );
								}
							}
						}
					})
				}
				var localList = that.getAbonents();
				each( localList, function(ab,id){
					if ( ! newList[id] ) {
						that.removeAbonents(id);
					}
				});
				self.trigger('abonentListChange', that.getAbonents() );
				self.trigger('abonentsChange', that.getAbonents(true) );
				return true;
			},

			/**
			 * Get current abonents list
			 * @return {Object}
			 */
			getAbonents: function( asArray ) {
				var list = asArray ? [] : {};
				each( this.abonentList, function(ab,i){
					if ( asArray ) {
						list.push( cloneObject( ab ) );
					} else {
						list[i] = cloneObject( ab );
					}
				});
				return list;
			},

			/**
			 * Check, target is current abonent or not
			 * @param number
			 * @return {Boolean}
			 */
			isAbonent: function( data, abonents ) {
				if ( ! data ) {
					return false;
				}
				abonents = abonents || this.getAbonents();
				if ( size(abonents) ) {
					if ( abonents.key ) {
						abonents = [abonents];
					}
					var curAb = false;
					each( abonents, function(ab){
						if (  ( ab.guid && ab.guid == data ) ||
							( ab.user && ab.user.id && ab.user.id == data ) ||
							( ab.client && ab.client.id && ab.client.id == data ) ||
							( ab.phone && ab.phone == data ) ) {
							curAb = cloneObject(ab);
							return breaker;
						}
					});
					return curAb;
				}
				return false;
			},

			/**
			 * Clear conference's abonents list
			 */
			removeConfAbonents: function() {
				var that = this;
				each( that.abonentList, function(ab,i){
					if ( that.conferenceId() && that.state() == that.states.TALK && ab.isConferenceCompetitor ) {
						self.trigger('conferenceAbonentLeave', ab);
					}
					delete that.abonentList[i];
				});
			},

			/**
			 * Remove abonent by number or id
			 * @param number
			 * @return {Boolean}
			 */
			removeAbonents: function(number) {
				var that = this;
				if ( number && that.abonentList[number] ) {
					if ( that.conferenceId() && that.state() == that.states.TALK && that.abonentList[number].isConferenceCompetitor ) {
						self.trigger('conferenceAbonentLeave', that.abonentList[number]);
					}
					delete that.abonentList[number];
					self.trigger('abonentListChange', that.getAbonents() );
					self.trigger('abonentsChange', that.getAbonents(true) );
				} else if ( number === undefined && size(that.abonentList) ) {
					each( that.abonentList, function(ab,i){
						if ( that.conferenceId() && that.state() == that.states.TALK && ab.isConferenceCompetitor ) {
							self.trigger('conferenceAbonentLeave', ab);
						}
						delete that.abonentList[i];
					});
					that.abonentList = {};
				} else {
					return false;
				}
				self.trigger('abonentListChange', that.getAbonents() );
				self.trigger('abonentsChange', that.getAbonents(true) );
				return true;
			},

			/**
			 * Back ring
			 * @param number
			 * @param callback
			 * @return {Boolean}
			 */
			makeCall: function(number, intercom, sequence, callback ) {
				var that = this;
				var error, msg = '';
				if ( ! number )  {
					error = 2106;
				}
				if ( userStates.state() == userStates.states.DISCONNECTED ) {
					error = 2001;
				}
				if ( that.state() == that.states.DISCONNECTED ) {
					error = 2002;
				}
				if ( that.getHoldInfo().hasHold && that.state() == that.states.TALK ) {
					error = 2101;
				}
				if ( that.conferenceId() ) {
					error = 2102;
				}
				if ( [ that.states.BACKCALL, that.states.BACKRING, that.states.CALL, that.states.RING ].indexOf(that.state()) != -1 ) {
					error = 2103;
					msg = ' (' + that.getStateStr() + ')';
				}
				if ( that.state() == that.states.READY && userStates.state() == userStates.states.BUSY && ! that.getHoldInfo().hasHold ) {
					error = 2104;
				}

				if ( error ) {
					callFunc(callback, getErrorObj(error));
					return false;
				}

				if ( that.isAbonent(number) ) {
					callFunc(callback, getErrorObj(2105));
					return false;
				} else if ( ( that.state() == that.states.READY  ) && that.sipActive && ! intercom ) {
					if ( that.state() == that.states.TALK ) {
						that.sip.hold();
					}
					that.sip.call(number);

					// find user or number and set it as abonent
					var user = users[number];
					var numberObj = numbers[number] || numbersById[number];
//					if ( ! user && numberObj ) {
//						each(users, function(u){
//							if ( u.numberObj == numberObj || u.number == number ) {
//								user = u;
//								return breaker;
//							}
//						});
//					}

//					if ( user ) {
//						log('setAbonent with user');
//						that.setAbonent(user);
//					} else if ( numberObj ) {
//						log('setAbonent with numberObj');
//						that.setAbonent(numberObj);
//					} else {
//						log('setAbonent with number');
//						that.setAbonent({number:number});
//					}
					callFunc(callback, getSuccessObj());
				} else if ( that.state() == that.states.READY || that.state() == that.states.TALK ) {
					// обратный вызов
					// если TALK - текущий кладется в холд, и обратный вызов на number
					that.acmCall(number, intercom, sequence, function(data){
						callFunc(callback, getReturnObj(data.result,data,2107));
					});
				} else {
					// сюда никогда не придем (в теории)
					log('error call, unknown state');
					callFunc(callback, getErrorObj(2108));
					return false;
				}
			},

			/**
			 * Call server method for backcall
			 * @param number
			 * @param intercom - call in intercom mode
			 * @param callback
			 * @return {Boolean}
			 */
			acmCall: function( number, intercom, sequence, callback ) {
				var that = this;
				sequence = ['abonent', 'user'].indexOf(sequence) !== -1 ? sequence : 'user';
				if ( ! number ) {
					return false;
				}
				var params = {
					sequence: intercom ? 'user' : sequence,
					intercom: intercom ? true : undefined
				};
				params.number = number.toString();

				sendOktell( 'pbxautocallstart', params, function( data ) {
//					that.loadStates(function(){
						callFunc(callback,data);
//					});
				});
			},

			/**
			 * Switch current call and hold call
			 * @param callback
			 */
			toggleHold: function(callback) {
				var that = this;
				// TODO maybe it makes sense to load hold info from server before switch
				if ( that.getHoldInfo().hasHold ) {
					that.makeFlash('switch');
					callFunc(callback,getSuccessObj());
				} else {
					callFunc(callback,getErrorObj(2402));
				}
			},


			/**
			 * Call flash method
			 * @param mode тип
			 * @param callback
			 */
			makeFlash: function( mode ) {
				var that = this;
				var modeTypes = ['abort','switch','next'];
				sendOktell('pbxmakeflash',{ mode: modeTypes.indexOf(mode) != -1 ? mode : undefined });
			},

			/**
			 * Create conference or invite new competitor or make conference from current call
			 * @param numbers or number for inviting to conference
			 * @param callback
			 */
			conference: function( numbers, callback ) {
				var that = this;
				numbers = toStringsArray(numbers);

				if ( userStates.state() == userStates.states.BREAK ) {
					callFunc(callback,getErrorObj(2208));
				} else if ( that.state() == that.states.TALK ) {
					if ( that.conferenceId() && numbers ) {
						// invite
						that.inviteToConf(that.conferenceId(),numbers,callback);
					} else if ( ! that.conferenceId() ) {
						if ( ! numbers ) {
							that.callToConf(callback);
						} else {
							that.callToConf(function(data){
								if ( data.result ) {
									that.inviteToConf(that.conferenceId(),numbers,callback);
								} else {
									callFunc(callback, getErrorObj(2202));
								}
							});
						}
					}
				} else if ( that.state() == that.states.READY && ! that.conferenceId() && numbers ) {
					// new conf
					that.createConf( numbers, callback);
				} else {
					callFunc(callback,getErrorObj(2205))
				}
			},

			/**
			 * Call server method for creating conference from current call
			 * @param callback
			 */
			callToConf: function(callback) {
				var that = this;
				that.buildConfFromCommCallback = callback;
				that.buildConfFromCommTimer = setTimeout(function(){
					callFunc(that.buildConfFromCommCallback, getErrorObj(2202));
					that.buildConfFromCommCallback = undefined;
				},2000)
				sendOktell('buildconferencefromcommutation');
			},

			/**
			 * Call server method for creating conference
			 * @param numbers
			 * @param callback
			 */
			createConf: function( numbers, callback ) {
				var that = this;
				var confId = newGuid();
				var room = Math.round( Math.random() * 10000 );
				var numParam = [{ userlogin: oktellInfo.login }];
				numbers = toStringsArray(numbers);
				if ( isArray( numbers ) ) {
					each( numbers, function(n) {
						if ( isGuid(n) ) {
							numParam.push({ userid: n });
						} else {
							numParam.push({ intnumber: n });
						}
					});
				}

				if ( size(numParam) > 1 ) {
					sendOktell('createnewconference', {
						conference: {
							id: confId,
							room: room,
							name: "",
							description: "",
							accessmode: "free",
							isselector: false,
							record: true,
							recordrights: "selected",
							everyonecaninvite: true,
							canvieweachother: true
						},
						competitors: numParam
					} , function(data){
						if ( data.result == 1 ) {
							that.conferenceId(confId, true);
						} else {
							that.conferenceId(false);
						}
						callFunc(callback,getReturnObj(data.result, data, 2204));
					});
				} else {
					callFunc(callback, getErrorObj(2203));
				}
			},

			/**
			 * Call server method for inviting competitors to conference
			 * @param confId conference id
			 * @param numbers or number for invite
			 * @param callback
			 */
			inviteToConf: function( confId, numbers, callback ) {
				if ( ! confId ) {
					callFunc(callback,false);
				}
				var that = this;
				numbers = toStringsArray(numbers);
				var numParam = [];
				var fromHold;
				var holdAbonent = that.getHoldInfo().abonent || {};
				if ( isArray( numbers ) ) {
					each( numbers, function(n){
						if ( typeof n == 'string' && n !== '' ) {
							if ( that.isAbonent(n, holdAbonent) ) {
								fromHold = n;
							} else {
								if ( isGuid(n) ) {
									numParam.push({ userid: n });
								} else {
									numParam.push({ intnumber: n });
								}
							}
						}
					});
				}

				var sendInvites = function() {
					sendOktell('invitetoconference', { conferenceid: confId, competitors: numParam}, function(data){
						callFunc(callback, getReturnObj(data.result,data,2202));
					});
				}

				if ( size(numParam) == 0 && ! fromHold ) {
					callFunc(callback,getErrorObj(2201));
				} else if ( fromHold ) {
					if ( confId != that.conferenceId() ) {
						callFunc(callback, getErrorObj(2206));
						return;
					}
					sendOktell('checkcanconnecttogathertoconference', {}, function(data){
						if ( data.canconnecttogather ) {
							sendOktell('connecttogathertoconference');
							if ( size(numParam) != 0 ) {
								sendInvites();
							} else {
								callFunc(callback, getSuccessObj());
							}
						} else {
							callFunc(callback, getErrorObj(2206));
						}
					});
				} else if ( size(numParam) != 0 ) {
					sendInvites();
				} else {
					callFunc(callback, getErrorObj(2207));
				}
			},

			/**
			 * Stop call, dial, conference. Disconnection of conference competitor
			 * @param numbers or number for disconnect
			 */
			endCall: function( numbers ) {
				var that = this;
				numbers = toStringsArray(numbers);
				var isAbonent = false;
				var isMe = false;
				if ( numbers ) {
					each(numbers, function(n){
						if ( ! isAbonent && that.isAbonent(n) ) {
							isAbonent = true;
						}
						if ( ! isMe && ( n == oktellInfo.number || n == oktellInfo.userid ) ) {
							isMe = true;
						}
					});
				}

				if ( ! numbers ) {
					if ( that.state() == that.states.TALK || that.state() == that.states.CALL || that.getHoldInfo().hasHold ) {
						that.abortCall();
					} else if ( that.state() == that.states.BACKCALL ) {
						that.abortAcmCall();
					} else if ( that.state() == that.states.RING || that.state() == that.states.BACKRING ) {
						that.declineCall();
					}
				} else if ( that.getHoldInfo().hasHold && ( isMe || ( ! that.conferenceId() && isAbonent ) ) ) {
					that.makeFlash('abort');
				} else if ( isAbonent || isMe ) {
					if ( that.state() == that.states.TALK ) {
						if ( that.conferenceId() ) {
							that.kickConfAbonent( that.conferenceId(), numbers);
						} else {
							that.abortCall();
						}
					} else if ( that.state() == that.states.BACKCALL ) {
						that.abortAcmCall();
					} else if ( that.state() == that.states.CALL ) {
						that.abortCall();
					} else if ( that.state() == that.states.RING || that.state() == that.states.BACKRING ) {
						that.declineCall();
					}
				}
			},

			/**
			 * Call server method for disconnect current connection
			 */
			abortCall: function() {
				sendOktell('pbxabortcall');
			},

			/**
			 * Call server method for end commutation if exist, stop autocall if started
			 */
			declineCall: function() {
				sendOktell('pbxdeclinecall');
			},

			/**
			 * Call server method for disconnect conference competitor by number
			 * @param confId conference id
			 * @param numbers or number
			 */
			kickConfAbonent: function( confId, numbers ) {
				numbers = toStringsArray(numbers);
				var that = this;
				sendOktell('getconferencecompetitors', { conferenceid: confId }, function(data){
					var compsByNumber = {};
					var compsById = {};
					var iam = false;
					for ( var i = 0, l = data.competitorlist.length; i < l; i++ ) {
//						if ( data.competitorlist[i].number != oktellInfo.number ) {
//							compsByNumber[data.competitorlist[i].number] = data.competitorlist[i].competitorid;
//						} else {
//							iam = true;
//						}
//						if ( data.competitorlist[i].userid != oktellInfo.userid ) {
//							compsById[data.competitorlist[i].userid] = data.competitorlist[i].competitorid;
//						} else {
//							iam = true;
//						}
						compsByNumber[data.competitorlist[i].number] = data.competitorlist[i].competitorid;
						compsById[data.competitorlist[i].userid] = data.competitorlist[i].competitorid;
					}
					var n;
					each( numbers, function(num){
						if ( n = ( compsByNumber[num] || compsById[num] || '' ) ) {
							if ( num && ( num == oktellInfo.number || num == oktellInfo.userid ) ) {
								iam = true;
							} else {
								sendOktell('confdisconnectcompetitor', {conferenceid: confId, competitor: { competitorid: n } } );
							}
						}
					});
					if ( iam ) {
						that.exitConf(confId);
					}
				});
			},

			/**
			 * Call server method for stop back ring
			 * @param callback
			 */
			abortAcmCall: function(callback) {
				sendOktell('pbxautocallabort');
			},

			/**
			 * Call method for exit conference
			 * @param confId
			 */
			exitConf : function( confId ) {
				sendOktell('exitconference', {conferenceid:confId});
			},

			/**
			 * Call method for transfer call
			 * @param transferTo
			 * @param callback
			 */
			makeTransfer: function( transferTo, callback ) {
				sendOktell('pbxmaketransfer',{
					transferto: transferTo ? transferTo + '' : ""
				});
				callFunc(callback, getSuccessObj());
			},

			/**
			 * Transfer call
			 * @param number
			 * @param callback
			 */
			transfer: function( number, callback ) {
				var that = this;
				if ( ! number ) {
					callFunc(callback, getErrorObj(2304));
				}

				if ( that.state() == that.states.TALK ) {
					if ( that.getHoldInfo().hasHold ) {
						if ( ! number || that.isAbonent( number, that.getHoldInfo().abonent || {} ) ) {
							// connect B to A, we disconnect
							that.endCall(undefined);
							callFunc(callback,getSuccessObj());
						} else {
							// connect B to C, we connect to A
							that.makeTransfer(number, callback);
						}
					} else if ( number ) {
						// connect A to B, we disconnect
						that.makeTransfer( number, callback);
					} else {
						callFunc(callback, getErrorObj(2302));
					}
				} else {
					callFunc(callback, getErrorObj(2303));
				}
			},

			/**
			 * Connect for help or wiretapping, change connection type
			 * @param target
			 * @param mode
			 * @param callback
			 * @return {Boolean}
			 */
			ghost: function( target, mode, callback ) {
				var that = this;

				var fn = function(d) {
					that.loadConferenceInfo( callFunc(callback,d) );
				};

				target = ( users[target] && users[target].id ) || (numbers[target] && numbers[target].userid);
				if ( ! target ) {
					callFunc(fn, getErrorObj(2504));
					return false;
				}

				mode = mode || 'monitor';

				if ( ['monitor', 'conference', 'help'].indexOf(mode) == -1 ) {
					callFunc( fn, getErrorObj(2503));
					return false;
				}


				if ( that.state() == that.states.READY ) {

					sendOktell('attachasghost', { ghostedid: target }, function(data){
						if ( data.result ) {
							if ( mode && mode != 'monitor' ) {
								setTimeout(function(){
									if ( that.conferenceId() ) {
										that.changeGhostMode( mode, fn );
									}
								}, 500);
							} else {
								callFunc(fn, getSuccessObj());
							}
						} else {
							if ( data.error == 52710 ) {
								callFunc(fn, getErrorObj(2505));
							} else {
								callFunc(fn, getErrorObj(2502));
							}
						}
					});

				} else {

					var ab = that.isAbonent(oktellInfo.userid);
					var conferenceId = that.conferenceId();
					if ( ! ab || ! conferenceId || ! that.getConferenceInfo().isghost ) {
						callFunc( fn, getErrorObj(2506));
						return false;
					}

					var targetAbonent = that.isAbonent( target );
					if ( ! targetAbonent ) {
						callFunc( fn, getErrorObj(2507));
						return false;
					}

					if ( ! targetAbonent.isConferenceGhostMajor && ( mode == 'help' || mode == 'monitor' ) ) {

						sendOktell('confsetvoiceparams', {
							conferenceid: conferenceId,
							competitor: {
								competitorid: targetAbonent.guid,
								ghosthelp: mode == 'help' ? true : false
							}
						}, function(data){
							if ( data.result ) {

							}
							callFunc(fn,getReturnObj(data.result,{},2502));
						});

					} else {

						sendOktell('confsetghostmode', { conferenceid: conferenceId, ghostmode: mode }, function(data){
							if ( data.result ) {

							}
							callFunc(fn,getReturnObj(data.result,{},2502));
						});

					}
				}
			},

			/**
			 * Load waiting queue
			 * @param callback
			 */
			queue: function(callback) {
				var that = this;
				sendOktell('getcurrentqueue', {}, function(data){
					if ( data.result ) {
						var abonents = {},
							absArr = [],
							listChanged = false;
						if ( isArray( data.queue ) && size(data.queue) > 0 ) {
							each( data.queue, function(q) {
								ab = that.createAbonent(q)
								abonents[ab.key] = ab;
								absArr.push(ab);
								if ( ! that.queueList[ab.key] && ! that.isAbonent(ab.key) ) {
									that.queueList[ab.key] = ab;
									self.trigger('queueAbonentEnter', ab)
									listChanged = true;
								}
							});
						}
						each( that.queueList, function(ab, key){
							if ( ! abonents[key] ) {
								self.trigger('queueAbonentLeave', ab)
								delete that.queueList[key];
								listChanged = true;
							}
						});
						if ( listChanged ) {
							self.trigger('queueChange', absArr);
						}
						callFunc(callback, getSuccessObj({queue: absArr}));
					} else {
						callFunc(callback, getErrorObj(2701));
					}
				});
			},



			startTalkTimer: function(seconds) {
				var that = this;
				that.clearTalkTimer(true);
				that._talkLength = Date.now() - ( parseInt(seconds) || 0 ) * 1000;
				that.triggerTalkTimeEvent()
				that._talkTimer = setInterval(function(){
					that.triggerTalkTimeEvent()
				},1000);
			},

			triggerTalkTimeEvent: function() {
				var that = this;
				if ( that._talkLength !== false ) {
					var len = that.getCurrentTalkLength()
					self.trigger('talkTimer', len, that.formatTime(len) );
				} else {
					self.trigger('talkTimer', false );
				}
			},

			getCurrentTalkLength: function() {
				return Math.floor( (Date.now() - this._talkLength) / 1000 )
			},

			clearTalkTimer: function(silent) {
				clearInterval( this._talkTimer );
				this._talkLength = false
				if ( ! silent ) {
					this.triggerTalkTimeEvent()
				}
			},

			formatTime: function(sec) {
				var t = sec,
					h = Math.floor(t/3600),
					m = Math.floor(t/60) % 60,
					s = t%60;
				return ( h ? h + ':' : '' ) +
					( m < 10 ? '0' + m : m ) + ':' +
					( s < 10 ? '0' + s : s );
			},

			talkLength: function(format) {
				if ( this._talkLength === false ) {
					return '';
				}
				var sec = this.getCurrentTalkLength()
				if ( format ) {
					return this.formatTime(sec);
				} else {
					return sec;
				}
			},

			dtmf: function(code) {
				if ( ! this.sipActive || typeof code != 'string' || !code.match(/^[0-9\*#]{1}$/) ) {
					return false;
			}
				return this.sip.dtmf(code);
			},

			hold: function() {
				if ( this.sipActive ) {
					this.sip.hold();
				} else if ( this.state() == this.states.TALK || this.getHoldInfo().hasHold ) {
					this.makeFlash('switch');
				}
			},

			resume: function() {
				if ( this.getHoldInfo().hasHold && this.sipActive ) { this.sip.resume(); }
			}
		};
		extend( phone, Events );
		exportApi('isAbonent', phone.isAbonent, phone);
		exportApi('conferenceId', phone.conferenceId, phone);
		exportApi('getHoldInfo', phone.getHoldInfo, phone);
		exportApi('endCall', phone.endCall, phone);
		exportApi('conference', phone.conference, phone);
		exportApi('transfer', phone.transfer, phone);
		exportApi('toggle', phone.toggleHold, phone);
		exportApi('getState', phone.apiGetStateStr, phone);
		exportApi('getQueue', phone.queue, phone);
		exportApi('getTalkLength', phone.talkLength, phone);
		exportApi('answer', phone.answer, phone);
		exportApi('dtmf', phone.dtmf, phone);
		exportApi('hold', phone.hold, phone);
		exportApi('resume', phone.resume, phone);
//		exportApi('getPhoneState', phone.apiGetPhoneState, phone);


		/**
		 * Possible actions for phone states
		 * @type {Object}
		 */
		var pa = {};
		pa['-'] = {}
		pa[phone.states.DISCONNECTED] = {};
		pa[phone.states.BACKCALL] = { endCall: 1 };
		pa[phone.states.BACKRING] = { endCall: 1, answer: 1 };
		pa[phone.states.CALL] = { endCall: 1, conference: 1, call: 1, intercom: 1, transfer: 1 };
		pa[phone.states.READY] = { conference: 1, call: 1, intercom: 1, ghostListen: 1, ghostHelp: 1, ghostConference: 1, transfer: 1, toggle: 1, endCall: 1, resume: 1 };
		pa[phone.states.RING] = { endCall: 1, answer: 1 };
		pa[phone.states.TALK] = { endCall: 1, conference: 1, call: 1, resume: 1, hold: 0, intercom: 1, toggle: 1, transfer: 1, ghostListen: 1, ghostHelp: 1, ghostConference: 1 };
		//pa[phone.states.CALLWEBPHONE] = { };

		/**
		 * Possible actions for user states
		 * @type {Object}
		 */
		var pau = {};
		pau['-'] = {}
		pau[userStates.states.DISCONNECTED] = {};
		pau[userStates.states.READY] = {endCall: 1, conference: 1, call: 1, intercom: 1, toggle: 1, transfer: 1, resume: 1, ghostListen: 1, ghostHelp: 1, ghostConference: 1, resume:1};
		pau[userStates.states.BREAK] = {endCall: 1, call: 1, intercom: 1, toggle: 1, transfer: 1, ghostListen: 1, resume: 1, ghostHelp: 1, ghostConference: 1};
		pau[userStates.states.OFF] = {endCall: 1, conference: 1, call: 1, intercom: 1, toggle: 1, transfer: 1, resume: 1, ghostListen: 1, ghostHelp: 1, ghostConference: 1};
		pau[userStates.states.BUSY] = {answer: 1, endCall: 1, conference: 1, call: 1, intercom: 1, toggle: 1, transfer: 1, resume: 1, hold: 0, ghostListen: 1, ghostHelp: 1, ghostConference: 1};
		pau[userStates.states.RESERVED] = {};
		pau[userStates.states.NOPHONE] = {};



		/**
		 * Phone actions class
		 * @constructor
		 */
		var PhoneActions = function() {
			var a = [];
			var s = phone.state();
			s = typeof s == 'number' ? s : '-';
			var us = userStates.state() || '-';
			us = typeof us == 'number' ? us : '-';
			this.push = function() {
				each( arguments, function(arg){
					if ( pa[s][arg] && pau[us][arg] ) {
						a.push(arg);
					}
				})
			};
			this.getActions = function(){
				return a;
			}
		}

		/**
		 * Return possible actions by phone number or userid
		 * @param data
		 * @return {*}
		 */
		var getPhoneActions = function( data ) {
			var a = new PhoneActions;
			if ( ! data || ! serverConnected() ) {
				return a.getActions();
			}
			// if user has number, but number doesn't exist in numbers, use users's number as argument
			if ( users[data] && users[data].number && ! numbers[data] && ! numbersById[data] ) {
				data = users[data].number;
			}
			var isMe = oktellInfo.userid == data || oktellInfo.number == data;
			var hold = phone.isAbonent(data, phone.getHoldInfo().abonent || {} );
			var obj = users[data] || numbers[data] || numbersById[data];
			if ( obj && obj.numberObj ) {
				obj = obj.numberObj;
			}
			var abonent = phone.isAbonent(data) || ( obj && obj.number && phone.isAbonent(obj.number) );
			var isInQueue = phone.isAbonent(data, phone.queueList) || ( obj && obj.number && phone.isAbonent(obj.number, phone.queueList) );
			var hasHold = phone.getHoldInfo().hasHold;
			var isConf = phone.conferenceId() ? true : false;
			var isConfCreator = isConf && abonent && abonent.isConferenceCreator;
			var iAmAbonent = isConf && phone.isAbonent( oktellInfo.userid );
			var iAmCreator = isConf && iAmAbonent && iAmAbonent.isConferenceCreator;
			var phoneState = phone.state();
			var intercomSupport = phone.intercomSupport;

			if ( isInQueue ) {

			} else if ( isMe ) {
				if ( phoneState != phone.states.DISCONNECTED && phoneState != phone.states.READY ) {
					if ( ( phoneState == phone.states.RING || phoneState == phone.states.BACKRING ) && ( phone.sipActive || intercomSupport !== false ) ) {
						a.push('answer');
					}
					a.push('endCall');
				}
			} else if ( ! obj || ( obj && obj.state !== undefined && obj.state != 0 ) ) {
				if ( hold ) {
					if ( phone.sipActive && phone.sip && typeof phone.sip.isOnHold === "function" && phone.sip.isOnHold() ) {
						a.push('resume');
					} else {
						a.push('toggle', 'endCall'); // toogle and connect current with hold, and disconnect myself
					}
				} else if ( ! abonent ) {
					if ( isConf ) {
						if ( ! ( obj && obj.state == 2 ) ) {
							a.push('conference');
						}
						a.push('transfer');
					} else {
						if ( ( ! hasHold && phoneState == phone.states.TALK ) || phoneState == phone.states.READY ) {
							a.push('call');
							if ( phoneState == phone.states.TALK ) {
								a.push('transfer');
							}
							if ( ! ( obj && obj.state == 2 ) ) {
								a.push('conference');
							}
							a.push('intercom');
						} else if ( hasHold && phoneState == phone.states.TALK ) {
							a.push('transfer');
						}
					}
					//log(phone.state() + userControlledByMe(data));
					if ( obj && obj.state == 5 && phoneState == phone.states.READY && userControlledByMe(data) ) {
						a.push('ghostListen', 'ghostHelp', 'ghostConference');
					}
				} else if ( abonent ) {
					if ( ( phoneState == phone.states.RING || phoneState == phone.states.BACKRING ) && ( phone.sipActive || intercomSupport !== false ) ) {
						a.push('answer');
					}
					if ( isConf ) {
						if ( iAmCreator ) {
							a.push('endCall');
						}
					} else {
						a.push('endCall');
						if ( phone.sipActive && ! hasHold ) {
							a.push('hold');
						}
						if ( ! ( obj && obj.state == 2 ) ) {
							a.push('conference');
						}
//						if ( hasHold ) {
//							a.push('transfer');
//						}
					}
					if ( phone.getConferenceInfo().isghost && userControlledByMe(data) ) {
						a.push('ghostListen', 'ghostHelp', 'ghostConference');
					}
				}
			}
			//log('Phone action for ' + data + ' ' + a.getActions());
			return a.getActions();
		};
		exportApi('getPhoneActions',getPhoneActions);

		startQueueTimer = function(timeout) {
			clearInterval(queueTimer);
			queueTimer = setInterval(function(){
				if ( serverConnected() ) {
					phone.queue()
				}
			}, timeout);
		}

		/**
		 * connect with server
		 * @param options
		 * @param callback
		 * @return {Boolean}
		 */
		var connect = function( options, callback ) {

			self.trigger('connecting');

			if ( serverConnected() ) {
				return true;
			}

			options = options || {};
			var loginError = false;

			extend( oktellOptions, options );
			debugMode = oktellOptions.debugMode;
			oktellVoice = false
			if ( oktellOptions.oktellVoice ) {
				if ( oktellOptions.oktellVoice.isOktellVoice === true ) {
					oktellVoice = oktellOptions.oktellVoice
				} else if ( window.oktellVoice && window.oktellVoice.isOktellVoice === true ) {
					oktellVoice = window.oktellVoice
				}
			}

			var sessionId = cookie(cookieSessionName) || ( localStorage && localStorage[cookieSessionName] );

			if ( ! sessionId && options.password !== undefined && options.password !== null ) {
				oktellOptions.password = md5( utf8DecodePass( options.password.toString().toLowerCase() ) );
				oktellOptions.Password = md5( utf8DecodePass( options.password.toString() ) );
			} else {
				oktellOptions.password = undefined;
				oktellOptions.Password = undefined;
			}


			var wsProtocolUrlRegExp = /^w[s]{1,2}:\/\/\S+$/,
				portRegExp = /:[0-9]{1,5}$/;
			var prepareUrl = function(urlStr) {
				if ( wsProtocolUrlRegExp.test(urlStr) ){
					return urlStr;
				} else {
					var useWss = location.protocol == 'https:',
						port = useWss ? ':443' : ':80',
						protocol = useWss ? 'wss://' : 'ws://';
					if ( portRegExp.test(urlStr) ) {
						return protocol + urlStr;
					} else {
						return protocol + urlStr + port;
					}
				}
				return false;
			}

			if ( typeof oktellOptions.url == 'string' ) {
				oktellOptions.url = [oktellOptions.url];
			}

			if ( isArray(oktellOptions.url) ) {
				var links = []
				for ( var i = 0, j = oktellOptions.url.length; i < j; i++ ) {
					if ( typeof oktellOptions.url[i] !== 'string') {
						continue;
					}
					links.push( prepareUrl(oktellOptions.url[i]) );
				}
				oktellOptions.url = links;
			} else {
				callFunc( oktellOptions.callback, getErrorObj(1205) );
				self.trigger('connectError', getErrorObj(1205) );
				return false;
			}

			WEB_SOCKET_SWF_LOCATION = oktellOptions.webSocketSwfLocation;

			if ( ! window.flashWebSocketInitialized ) {
				window.flashWebSocketInitialized = true;
				initFlashWebSocket();
			}

			oktellInfo.url = oktellOptions.url;
			oktellInfo.login = oktellOptions.login;
			oktellInfo.defaultAvatar = oktellOptions.defaultAvatar;
			oktellInfo.defaultAvatar32x32 = oktellOptions.defaultAvatar32x32;
			oktellInfo.defaultAvatar64x64 = oktellOptions.defaultAvatar64x64;

			var currentUrlIndex = 0;

			if ( ! sessionId && ( oktellOptions.password === undefined || oktellOptions.password === null ) ) {
				callFunc( oktellOptions.callback, getErrorObj(1213) );
				self.trigger('connectError', getErrorObj(1213) );
				return false;
			}

			var createServer = function() {
				server = new Server( oktellOptions.url, oktellOptions.openTimeout, oktellOptions.queryDelayMin, oktellOptions.queryDelayMax, function(url){
					//alert(url);
					loginError = false;
					oktellInfo.currentUrl = server.url; //oktellOptions.url[currentUrlIndex];
					sendOktell('login', {
						Password: oktellOptions.Password,
						password: oktellOptions.password,
						sessionid: sessionId || undefined,
						showid: 1,
						usewebrtc: oktellVoice ? true : false,
						workplace: oktellOptions.workplace || undefined,
						expires: oktellOptions.expires || undefined
					}, function(data){
						loginError = true;
						var getLoginErrorObj = function(code) {
							return getErrorObj(errorCode, '', {
								serverErrorMessage: data.errormsg,
								serverErrorCode: data.error
							});
						}
						if ( data.error || data.errormsg ) {
							var errorCode = 1000;
							if ( data.error == 50093 ) {
								errorCode = 1204; // Пользователь уже зарегистрирован
							} else if ( data.error == 50025 ) {
								errorCode = 1214; // Количество пользователей, одновременно работающих с системой, ограничено лицензией
							} else if( data.errormsg == "Wrong login/pass combination" ) {
								cookie(cookieSessionName, null);
								localStorage && (delete localStorage[cookieSessionName]);
								errorCode = 1202;
							} else if ( data.errormsg == 'Bad request. Session does not exist' || data.errormsg == 'Bad request. Invalid session user' ) {
								cookie(cookieSessionName, null);
								localStorage && (delete localStorage[cookieSessionName]);
								errorCode = 1212;
							}
							callFunc( oktellOptions.callback, getLoginErrorObj(errorCode) );
							self.trigger('connectError', getLoginErrorObj(errorCode) );
							disconnect(14);
						} else if (data.result == 1) {
							clearInterval(pingTimer);
							pingTimer = setInterval(function(){
								if ( serverConnected() ) {
									server.sendOktell('ping');
								}
							},15000);
							startQueueTimer(oktellOptions.queueInterval);
							phone.queue();
							customEvents.sendCustomBinding();

							server.bindOktellEvent('userstatechanged', function(data){
								userStates.saveStatesFromServer(data);
							});

							if ( oktellVoice ) {
								setTimeout(function(){
									sipPhone = oktellVoice.connect({
										login: data.sipuser,
										password: data.sippass,
										server: url.replace(/w[s]{1,2}:\/\//, '').replace('/', '').split(':')[0] + ':' + data.sipport,
										debugMode: debugMode
									});
									if ( sipPhone ) {
										sipPhone.on('connect', function(){
											sipPnoneActive = true;
											self.trigger('webphoneConnect');
										});
										sipPhone.on('all', function(event){
											log('Oktell webphone event: ' + event, arguments);
										});
										sipPhone.on('disconnect', function(){
											sipPnoneActive = true;
											self.trigger('webphoneDisconnect');
										});
										phone.setSipPhone(sipPhone);
									}
								}, 200);
							}
							oktellInfo.userid = data.userid;
							oktellInfo.sessionId = data.sessionid;
							if (oktellInfo.sessionId) {
								cookie(cookieSessionName, oktellInfo.sessionId, { expires: oktellOptions.expires });
								localStorage && (localStorage[cookieSessionName] = oktellInfo.sessionId);
							}

							sendOktell('getversion', {showalloweddbstoredprocs:1}, function(data){

								if ( data.result ) {
									oktellInfo.oktellBuild = data.version.build;
									oktellInfo.oktellDated = data.version.dated;
									oktellInfo.allowedProcedures = data.alloweddbstoredprocs || {};
									oktellInfo.oktellWebServerPort = data.version.webserverport;
									oktellInfo.oktellWebServerLink = getWebServerLink();
									if ( ! isValidMethodVersion('pbxanswercall') ) {
										phone.intercomSupport = false;
									}
									sendOktell('getmyuserinfo', {}, function(data){
										if ( data.result ) {
											oktellInfo.number = data.mainpbxnumber;
											oktellInfo.username = data.username;
											oktellInfo.hasline = data.hasline;
											oktellInfo.lineid = data.lineid;
											oktellInfo.linenumber = data.linenumber;
											oktellInfo.isoperator = data.isoperator;
											userStates.loadBreakReasons(function(data){
												userStates.loadState(function(result){
													if ( result ) {
														userStates.checkUserRedirect(function(result){
															loadPbxNumbers(function(){

																server.bindOktellEvent( 'pbxnumberstatechanged', function( data ){
																	for( var i = 0; i < data.numbers.length; i++ ) {
																		var n = numbers[ data.numbers[i].num ];
																		if ( n ) {
																			n.state = data.numbers[i].numstateid;
																		}
																	}
																});

																loadUsers(function(){
																	phone.loadStates(function(result){
																		if ( result ) {
																			loginError = false;
																			events.trigger('login');
																			server.bindOktellEvent('httpresponsecopy',function(data){
																				var result = data.response;
																				if ( result == '200 OK') {
																					var pass = data.password;
																					var content = data.content;
																					if ( httpQueryData[pass] && typeof httpQueryData[pass].callback == 'function' ) {
																						httpQueryData[pass].callback(content);
																					}
																				}
																			});
																			callFunc( oktellOptions.callback, getSuccessObj() );
																			oktellConnected(true);

																			for (var i = 0; i < nativeEventsForBindAfterConnect.length; i++) {
																				var obj = nativeEventsForBindAfterConnect[i];
																				if ( obj && obj.eventName && obj.callback && ! obj.binded ) {
																					obj.binded = true;
																					server.bindOktellEvent(obj.eventName, obj.callback);
																				}
																			}

																			self.trigger('connect');
																		} else {
																			callFunc( oktellOptions.callback, getLoginErrorObj(1207) );
																			self.trigger('connectError', getLoginErrorObj(1207) );
																			disconnect(14);
																		}
																	});
																});
															});
														});
													} else {
														callFunc( oktellOptions.callback, getLoginErrorObj(1209) );
														self.trigger('connectError', getLoginErrorObj(1209) );
														disconnect(14);
													}
												});
											});
										} else {
											callFunc( oktellOptions.callback, getLoginErrorObj(1210) );
											self.trigger('connectError', getLoginErrorObj(1210) );
											disconnect(14);
										}
									});
								} else {
									callFunc( oktellOptions.callback, getLoginErrorObj(1206 ) );
									self.trigger('connectError', getLoginErrorObj(1206) );
									disconnect(11);
								}
							});


						} else {
							callFunc( oktellOptions.callback, getLoginErrorObj(1211) );
							self.trigger('connectError', getLoginErrorObj(1211) );
							disconnect(14);
						}
					});
				});
				server.on('errorConnection', function(data){
					self.trigger('connectError', getErrorObj(1200) );
					callFunc( oktellOptions.callback, getErrorObj(1200) );
				});
				server.on('connectionClose', function(){
					if ( connectionClosedByUser ) {
						connectionClosedByUser = false;
						disconnect(13);
					} else if ( ! loginError ) {
						disconnect(12);
					}
				});
				server.multiConnect();
				if ( debugMode ) {
					oktellInfo.server = server;
				}
			};

			createServer();
		};
		exportApi('connect', connect);

		/**
		 * disconnect from server
		 * @param reason code or reason object
		 * @param silent  - trigger outside 'disconnect' event or not
		 * @return {Boolean}
		 */
		var disconnect = function( reason, silent) {
			oktellConnected(false);
			for (var i = 0; i < nativeEventsForBindAfterConnect.length; i++) {
				var obj = nativeEventsForBindAfterConnect[i];
				obj.binded = false;
			}
			if ( sipPhone && sipPhone.disconnect ) {
				sipPhone.disconnect();
			}
			if ( ! serverConnected() ) {
				if ( typeof reason == 'number' ) {
					reason = getDisconnectReasonObj(reason);
				}
				if ( ! silent ) {
					self.trigger('disconnect', reason);
				}
			} else {
				cookie(cookieSessionName, null);
				localStorage && (delete localStorage[cookieSessionName]);
				connectionClosedByUser = true;
				userStates.state(0);
				phone.state( phone.states.DISCONNECTED );
				sendOktell('logout');
			}

			return true;
		};

		var removeUserSession = function() {
			cookie(cookieSessionName, null);
			return true;
		};
		exportApi('removeUserSession', removeUserSession);

		/**
		 * Chanhe number plan's states
		 */
		userStates.on('userStateChange', function(stateId){
			setTimeout(function(){ phone.loadStates(); }, 400);
			if ( stateId == 5 ) {

			} else if ( stateId == 7 ) {
				phone.state( phone.states.DISCONNECTED );
			} else {
				phone.loadStates();
//				phone.state( phone.states.READY );
			}
		});

		/**
		 * Subscribe to stuff on login
		 */
		events.on('login', function(){

			server.bindOktellEvent('linestatechanged', function(data){
				setTimeout(function(){
					phone.loadStates();
				}, 500);
			});

			server.bindOktellEvent('flashstatechanged', function(data){
				setTimeout(function(){
					phone.loadStates();
				}, 500);
			});

			server.bindOktellEvent('confcompositionchanged', function(data){
				if ( data.eventinfo.conferenceid == phone.conferenceId() ) {
					phone.setConfAbonentList(data.eventinfo.competitorlist);
					phone.loadStates();
				}
			});

			server.bindOktellEvent('phoneevent_acmcallstarted', function(data){
				phone.loadStates(null, {
//					sequence: phone.state() == phone.states.READY ? '': null,
					isAutoCall: true
				});
			});

			server.bindOktellEvent('phoneevent_acmcallstopped', function(data){
				setTimeout(function(){
					phone.loadStates();
				}, 700);
			});

			server.bindOktellEvent('phoneevent_ringstarted', function(data){
				phone.loadStates(function(result){
					if ( phone.conferenceId() ) {
						phone.loadConferenceInfo();
					}
				}, false);
			});

			server.bindOktellEvent('phoneevent_ringstopped', function(data){
				phone.loadStates();
			});

			server.bindOktellEvent('phoneevent_ivrstarted', function(data){
				if ( data.isroutingivr === false ) {
					phone.notRoutingIvrState(true);
				} else if ( data.isroutingivr === true && phone.state() == phone.states.READY ) {
					phone.loadStates();
				}
			});

			server.bindOktellEvent('phoneevent_commstarted', function(data){
				phone.startTalkTimer(0);
				phone.currentSessionData.commStarted = true;
				if ( data.isconference ) {
					if ( phone.buildConfFromCommCallback ) {
						phone.isConfCreator(true);
						clearTimeout(phone.buildConfFromCommTimer);
					}
					phone.conferenceId(data.confid);
					phone.loadConferenceInfo(function(){
						phone.loadStates(function(){
							if ( phone.buildConfFromCommCallback ) {
								callFunc(phone.buildConfFromCommCallback, getSuccessObj());
								phone.buildConfFromCommCallback = undefined;
							}
						});
					});
				} else {
					setTimeout(function(){
						phone.loadStates(function(){});
					}, 700);
				}
			});

			server.bindOktellEvent('phoneevent_commstopped', function(data){
				phone.clearTalkTimer();
				phone.currentSessionData.commStopped = true;
				setTimeout(function(){
					phone.loadStates(function(){});
				}, 700);
			});

			userStates.loadBreakReasons();
		});

		//
		// API
		//

		//self.loadPhoneStates = function(callback){ phone.loadStates(callback); };

		/**
		 * API disconnect from server
		 * @param silent - trigger or not 'disconnect' event
		 * @return {*}
		 */
		self.disconnect = function(silent) {
			return disconnect( 13, silent);
		};

		/**
		 * API get current abonents list
		 * @return {Object}
		 */
		self.getAbonents = function() {
			return phone.getAbonents(true);
		};

		/**
		 * Call
		 * @param number
		 * @param callback
		 */
		self.call = function( number, sequence, callback ) {
			phone.makeCall(number, false, typeof sequence == 'string' ? sequence : '', typeof sequence == 'function' ? sequence : callback);
		};

		/**
		 * API Subscribe to server events
		 * @param eventName
		 * @param callback
		 */
		self.onNativeEvent = function( eventNames, callback) {
			bindOktellEvent(eventNames, callback);
		};

		/**
		 * API Unsubscribe from server events
		 * @param eventName
		 * @param callback
		 */
		self.offNativeEvent = function( eventNames, callback) {
			unbindOktellEvent( eventNames, callback );
		};

		/**
		 * API Get information about current connection and user
		 * @return {*}
		 */
		self.getMyInfo = function() {
			return cloneObject(oktellInfo);
		}

		/**
		 * API Call in intercom mode
		 * @param number
		 * @param callback
		 */
		self.intercom = function( number, callback ) {
			phone.makeCall(number, true, '', callback);
		};

		/**
		 * API Connect for wiretapping, or change mode for existing connection to wiretapping
		 * @param target - phone number or userid
		 * @param callback
		 */
		self.ghostListen = function( target, callback) {
			phone.ghost(target, 'monitor', callback);
		};
		/**
		 * API Connect for help , or change mode for existing connection to help
		 * @param target
		 * @param callback
		 */
		self.ghostHelp = function( target, callback) {
			phone.ghost(target, 'help', callback);
		};
		/**
		 * API Connect in conference mode, or change mode for existing connection to conference
		 * @param target номер телефона или id пользователя
		 * @param callback
		 */
		self.ghostConference = function( target, callback) {
			phone.ghost(target, 'conference', callback);
		};

		/**
		 * API Get users
		 * @return {Object}
		 */
		self.getUsers = function(){
			var us = {}
			each(users, function(u){
				us[u.id] = u;
			})
			return us;
		};

		/**
		 * API Get numbers
		 * @return {Object}
		 */
		self.getNumbers = function(){
			var nums = {}
			each(numbers, function(u){
				nums[u.number] = u;
			});
			return nums;
		}

		/**
		 * API get lunch reasons
		 */
		self.getLunchReasons = self.getBreakReasons = function() {
			return cloneObject(userStates.breakReasons) || {}
		}

		self.getLog = function() {
			return logStr;
		}

		exportApi('formatPhone', formatPhone, undefined);

		self.inCallCenter = function() {
			return userStates.callCenterState();
		}

		self.webphoneIsActive = function() {
			return sipPnoneActive;
		}

		self.changePassword = function(newPass, oldPass, callback){
			if ( ! (typeof newPass == 'string' && newPass) ) {
				callFunc(callback, getErrorObj(2802));
			} else {
				newPass = md5(utf8DecodePass(newPass));
				oldPass = md5(utf8DecodePass(oldPass));
				self.exec('changepassword', { newpwdmd5: newPass, oldpwdmd5: oldPass }, function(data){
					if ( data.result ) {
						callFunc(callback, getSuccessObj({result: true}));
					} else if ( data.errormsg == 'old password is wrong' ) {
						callFunc(callback, getErrorObj(2801));
					} else {
						callFunc(callback, getErrorObj(2803));
					}
				});
			}
		}

		self.config = function(config) {
			if ( ! config ) { return false; }
			if ( config.debugMode !== undefined ) {
				debugMode = Boolean(config.debugMode);
			}
			if ( config.queryDelayMin !== undefined ) {
				if ( server ) {	server.setQueryDelayMin(config.queryDelayMin); } else { oktellOptions.queryDelayMin = config.queryDelayMin; }
			}
			if ( config.queryDelayMax !== undefined ) {
				if ( server ) {	server.setQueryDelayMax(config.queryDelayMax); } else { oktellOptions.queryDelayMax = config.queryDelayMax; }
			}
			if ( config.queueInterval !== undefined && parseInt(config.queueInterval) ) {
				startQueueTimer(parseInt(config.queueInterval));
			}
			if ( config.queryTimeout !== undefined && parseInt(config.queryTimeout)  ) {
				oktellOptions.queryTimeout = parseInt(config.queryTimeout);
			}

		}

		self.version = '1.7.1';

	};
	extend( Oktell.prototype , Events );

	return Oktell;
})();
window.oktell = new Oktell;