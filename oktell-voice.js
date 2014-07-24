// Generated by CoffeeScript 1.7.1
(function() {
  var __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  window.oktellVoice = (function() {
    var JsSIPAccount, debugMode, eventSplitter, events, extend, key, log, logErr, logStr, manager, okVoice, userMedia, _i, _len, _ref;
    debugMode = false;
    logStr = '';
    log = function() {
      var args, d, dd, e, fnName, i, t, val, _i, _len;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (!debugMode) {
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
      args.unshift('Oktell-Voice.js ' + t + ' |');
      try {
        return console[fnName].apply(console, args || []);
      } catch (_error) {
        e = _error;
      }
    };
    logErr = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return log.apply(this, ['error'].concat(args));
    };
    eventSplitter = /\s+/;
    events = {
      on: function(eventNames, callback, context) {
        var callbacks, event, eventCallbacks, _i, _len;
        if (!eventNames || typeof callback !== 'function') {
          return false;
        }
        eventNames = eventNames.split(eventSplitter);
        callbacks = this.__eventCallbacks || (this.__eventCallbacks = {});
        for (_i = 0, _len = eventNames.length; _i < _len; _i++) {
          event = eventNames[_i];
          eventCallbacks = callbacks[event] || (callbacks[event] = []);
          eventCallbacks.push({
            fn: callback,
            context: context
          });
        }
        return true;
      },
      off: function(eventNames, callback) {
        var callbacks, event, eventCallback, eventCallbacks, i, _i, _j, _k, _len, _len1, _len2;
        if (eventNames == null) {
          this.__eventCallbacks = {};
        } else {
          callbacks = this.__eventCallbacks || (this.__eventCallbacks = {});
          eventNames = eventNames.split(eventSplitter);
          if (callback == null) {
            for (_i = 0, _len = eventNames.length; _i < _len; _i++) {
              event = eventNames[_i];
              delete callbacks[event];
            }
          } else {
            for (_j = 0, _len1 = eventNames.length; _j < _len1; _j++) {
              event = eventNames[_j];
              eventCallbacks = callbacks[event] || (callbacks[event] = []);
              for (i = _k = 0, _len2 = eventCallbacks.length; _k < _len2; i = ++_k) {
                eventCallback = eventCallbacks[i];
                if (eventCallback.fn === callback) {
                  eventCallbacks[i] = false;
                }
              }
            }
          }
        }
        return true;
      },
      trigger: function() {
        var args, callbacks, event, eventCallbacks, eventInfo, eventNames, _i, _j, _len, _len1, _results;
        eventNames = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (!eventNames) {
          return false;
        }
        eventNames = eventNames.split(eventSplitter);
        callbacks = this.__eventCallbacks || (this.__eventCallbacks = {});
        _results = [];
        for (_i = 0, _len = eventNames.length; _i < _len; _i++) {
          event = eventNames[_i];
          eventCallbacks = callbacks[event] || (callbacks[event] = []);
          for (_j = 0, _len1 = eventCallbacks.length; _j < _len1; _j++) {
            eventInfo = eventCallbacks[_j];
            if (eventInfo.fn != null) {
              eventInfo.fn.apply(eventInfo.context || window, args);
            }
          }
          args.unshift(event);
          _results.push((function() {
            var _k, _len2, _ref, _results1;
            _ref = callbacks['all'] || [];
            _results1 = [];
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              eventInfo = _ref[_k];
              if (eventInfo.fn != null) {
                _results1.push(eventInfo.fn.apply(eventInfo.context || window, args));
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          })());
        }
        return _results;
      }
    };
    extend = function() {
      var args, i, key, target, val, _i, _ref, _ref1;
      target = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (i = _i = _ref = args.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
        if (typeof args[i] === 'object') {
          _ref1 = args[i];
          for (key in _ref1) {
            if (!__hasProp.call(_ref1, key)) continue;
            val = _ref1[key];
            target[key] = val;
          }
        }
      }
      return target;
    };
    userMedia = false;
    okVoice = {
      isOktellVoice: true,
      getUserMediaStream: function() {
        return userMedia;
      },
      isSupported: function() {
        var isChrome, isFirefox, isOpera, isYaBrowser, _ref, _ref1;
        isChrome = Boolean(navigator.userAgent.match(/Chrome\/[0-9\.]+? Safari\/[0-9\.]+$/));
        isYaBrowser = parseInt((_ref = navigator.userAgent.match(/Chrome\/[0-9\.]+? YaBrowser\/([0-9]+)/)) != null ? _ref[1] : void 0) >= 14;
        isOpera = parseInt((_ref1 = navigator.userAgent.match(/Chrome\/[0-9\.]+? Safari\/[0-9\.]+ OPR\/([0-9]+)/)) != null ? _ref1[1] : void 0) >= 20;
        isFirefox = Boolean(navigator.userAgent.match(/Firefox\/[0-9\.]+/));
        return isChrome || isYaBrowser || isOpera || isFirefox;
      }
    };
    extend(okVoice, events);
    JsSIPAccount = (function() {
      JsSIPAccount.prototype.sip = window.JsSIP;

      function JsSIPAccount(login, pass, server) {
        this.id = '';
        this.connected = false;
        this.login = login;
        this.pass = pass || '';
        this.server = server != null ? server.split(':')[0] : void 0;
        this.port = (server != null ? server.split(':')[1] : void 0) || '5060';
        this.name = 'JsSIP account';
        this.currentSession = false;
        this.connectedFired = false;
        if (this.sip && this.login && this.server && this.port) {
          this.constructed = true;
        }
        this.on('all', (function(_this) {
          return function() {
            var args, event;
            event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            return log('EVENT ' + event + ' on ' + _this.getName(), args);
          };
        })(this));
      }

      JsSIPAccount.prototype.getName = function() {
        return this.name + ' #' + this.id;
      };

      JsSIPAccount.prototype.isConnected = function() {
        return this.connected;
      };

      JsSIPAccount.prototype.createFantomAbonent = function(newSession) {
        var abonents, caller;
        caller = typeof newSession === 'string' || typeof newSession === 'number' ? newSession : newSession.getRemoteFriendlyName();
        abonents = [
          {
            phone: caller.toString(),
            name: caller.toString()
          }
        ];
        return abonents;
      };

      JsSIPAccount.prototype.createAudioElements = function() {
        this.elLocal = document.createElement('audio');
        this.elRemote = document.createElement('audio');
        this.elLocalId = 'oktellVoice_jssip_local_' + Date.now();
        this.elRemoteId = 'oktellVoice_jssip_remote_' + Date.now();
        this.elLocal.setAttribute('id', this.elLocalId);
        this.elRemote.setAttribute('id', this.elRemoteId);
        document.body.appendChild(this.elLocal);
        return document.body.appendChild(this.elRemote);
      };

      JsSIPAccount.prototype.connect = function() {
        var config;
        if (!this.constructed) {
          logErr('error while consctruct ' + this.getName());
          return false;
        }
        log(this.getName() + ' connect', arguments);
        if (!this.elLocal) {
          this.createAudioElements();
        }
        config = {
          ws_servers: 'ws://' + this.server + ':' + this.port,
          uri: 'sip:' + this.login + '@' + this.server,
          password: this.pass,
          trace_sip: debugMode,
          via_host: this.server
        };
        this.UA = new this.sip.UA(config);
        if (debugMode) {
          window.sipua = this.UA;
        }
        this.UA.on('connected', (function(_this) {
          return function(e) {
            log('connected', e);
            _this.connected = true;
            if (!_this.connectedFired) {
              _this.connectedFired = true;
              return _this.trigger('connect');
            }
          };
        })(this));
        this.UA.on('disconnected', (function(_this) {
          return function(e) {
            _this.connectedFired = false;
            return log('disconnected', e);
          };
        })(this));
        this.UA.on('registered', (function(_this) {
          return function(e) {
            log('registered', e);
            _this.connected = true;
            if (!_this.connectedFired) {
              _this.connectedFired = true;
              return _this.trigger('connect');
            }
          };
        })(this));
        this.UA.on('unregistered', (function(_this) {
          return function(e) {
            log('unregistered', e);
            _this.connected = false;
            return _this.trigger('disconnect');
          };
        })(this));
        this.UA.on('registrationFailed', (function(_this) {
          return function(e) {
            log('registration failed', e);
            _this.connected = false;
            return _this.trigger('disconnect');
          };
        })(this));
        this.UA.on('mediaPermissionsRequest', (function(_this) {
          return function(e) {
            log('media permissions request', e);
            return _this.trigger('mediaPermissionsRequest');
          };
        })(this));
        this.UA.on('mediaPermissionsAccept', (function(_this) {
          return function(e) {
            log('media permissions accept', e);
            return _this.trigger('mediaPermissionsAccept');
          };
        })(this));
        this.UA.on('mediaPermissionsRefuse', (function(_this) {
          return function(e) {
            log('media permissions refuse', e);
            return _this.trigger('mediaPermissionsRefuse');
          };
        })(this));
        this.UA.on('newRTCSession', (function(_this) {
          return function(e) {
            var onSessionStart;
            log('new RTC session', e);
            _this.currentSession = e.data.session;
            onSessionStart = function(e) {
              var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
              log('currentSession started', e);
              _this.trigger('RTCSessionStarted', (_ref = _this.currentSession.remote_identity) != null ? _ref.display_name : void 0);
              if (((_ref1 = _this.currentSession) != null ? _ref1.direction : void 0) === 'incoming') {
                _this.trigger('ringStart', (_ref2 = _this.currentSession) != null ? (_ref3 = _ref2.remote_identity) != null ? _ref3.display_name : void 0 : void 0, (_ref4 = _this.currentSession) != null ? (_ref5 = _ref4.remote_identity) != null ? typeof _ref5.toString === "function" ? _ref5.toString() : void 0 : void 0 : void 0);
              }
              if (_this.currentSession.getLocalStreams().length > 0) {
                log('currentSession local stream > 0', _this.currentSession.getRemoteStreams()[0].getAudioTracks());
                _this.elLocal.src = window.URL.createObjectURL(_this.currentSession.getLocalStreams()[0]);
              } else {
                log('currentSession local stream == 0');
              }
              if (_this.currentSession.getRemoteStreams().length > 0) {
                log('currentSession remote stream > 0', _this.currentSession.getRemoteStreams()[0].getAudioTracks());
                _this.elRemote.src = window.URL.createObjectURL(_this.currentSession.getRemoteStreams()[0]);
                return _this.elRemote.play();
              } else {
                return log('currentSession remote stream == 0');
              }
            };
            if (_this.currentSession.direction === 'incoming') {
              onSessionStart();
            } else {
              _this.currentSession.on('started', onSessionStart);
            }
            _this.currentSession.on('progress', function(e) {
              return log('currentSession progress', e);
            });
            _this.currentSession.on('failed', function(e) {
              var _ref;
              log('currentSession failed', e);
              return _this.trigger('RTCSessionFailed', (_ref = _this.currentSession.remote_identity) != null ? _ref.display_name : void 0);
            });
            return _this.currentSession.on('ended', function(e) {
              var _ref;
              log('currentSession ended');
              return _this.trigger('RTCSessionEnded', (_ref = _this.currentSession.remote_identity) != null ? _ref.display_name : void 0);
            });
          };
        })(this));
        return this.UA.start();
      };

      JsSIPAccount.prototype.call = function(number) {
        var options;
        if (!number || !this.connected) {
          return false;
        }
        log(this.getName() + ' call', arguments);
        number = number.toString();
        options = {
          mediaConstraints: {
            'audio': true,
            'video': false
          }
        };
        return this.UA.call(number, options);
      };

      JsSIPAccount.prototype.answer = function() {
        var _ref;
        return (_ref = this.currentSession) != null ? typeof _ref.answer === "function" ? _ref.answer({
          'audio': true,
          'video': false
        }) : void 0 : void 0;
      };

      JsSIPAccount.prototype.hangup = function() {
        var _ref;
        return (_ref = this.currentSession) != null ? typeof _ref.terminate === "function" ? _ref.terminate() : void 0 : void 0;
      };

      JsSIPAccount.prototype.reject = function() {
        var _ref;
        return (_ref = this.currentSession) != null ? typeof _ref.terminate === "function" ? _ref.terminate() : void 0 : void 0;
      };

      JsSIPAccount.prototype.hold = function() {
        var _ref;
        return (_ref = this.currentSession) != null ? typeof _ref.hold === "function" ? _ref.hold() : void 0 : void 0;
      };

      JsSIPAccount.prototype.isOnHold = function() {
        var _ref;
        return (_ref = this.currentSession) != null ? typeof _ref.isOnHold === "function" ? _ref.isOnHold() : void 0 : void 0;
      };

      JsSIPAccount.prototype.resume = function() {
        var _ref;
        return (_ref = this.currentSession) != null ? typeof _ref.unhold === "function" ? _ref.unhold() : void 0 : void 0;
      };

      JsSIPAccount.prototype.dtmf = function(digit) {
        var _ref;
        return (_ref = this.currentSession) != null ? typeof _ref.sendDTMF === "function" ? _ref.sendDTMF(digit) : void 0 : void 0;
      };

      JsSIPAccount.prototype.transfer = function(to) {
        var _ref;
        if (!to) {
          return false;
        }
        return (_ref = this.currentSession) != null ? typeof _ref.transfer === "function" ? _ref.transfer(to.toString()) : void 0 : void 0;
      };

      JsSIPAccount.prototype.disconnect = function() {
        return this.UA.stop();
      };

      return JsSIPAccount;

    })();
    extend(Account.prototype, events);
    okVoice.createUserMedia = (function(_this) {
      return function(onSuccess, onDeny, useVideo) {
        var getUserMedia, hasDecision, triggerDeny;
        if (userMedia) {
          return typeof onSuccess === "function" ? onSuccess(userMedia) : void 0;
        }
        hasDecision = false;
        triggerDeny = function(st) {
          hasDecision = true;
          okVoice.trigger('mediaPermissionsRefuse');
          return typeof onDeny === "function" ? onDeny(st) : void 0;
        };
        getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!okVoice.isSupported() || typeof getUserMedia !== 'function') {
          triggerDeny();
          return false;
        }
        setTimeout(function() {
          if (!hasDecision) {
            return okVoice.trigger('mediaPermissionsRequest');
          }
        }, 500);
        return getUserMedia.call(navigator, {
          audio: true,
          video: useVideo
        }, function(st) {
          hasDecision = true;
          userMedia = st;
          okVoice.trigger('mediaPermissionsAccept');
          return typeof onSuccess === "function" ? onSuccess(userMedia) : void 0;
        }, function(error) {
          return triggerDeny(error);
        });
      };
    })(this);
    manager = {
      accCount: 0,
      currentAcc: null,
      defaultOptions: {
        debugMode: false
      },
      exportFnNames: ['call', 'answer', 'hangup', 'transfer', 'hold', 'isOnHold', 'resume', 'dtmf', 'reject', 'isConnected'],
      createExportAccount: function(account) {
        var a, key, _i, _len, _ref;
        if (account == null) {
          return false;
        }
        a = {};
        _ref = this.exportFnNames;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          if (account[key] != null) {
            (function() {
              var val;
              val = account[key];
              return a[key] = function() {
                return val.apply(account, arguments);
              };
            })();
          }
        }
        extend(a, events);
        account.on('all', (function(_this) {
          return function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return a.trigger.apply(a, args);
          };
        })(this));
        return a;
      },
      createAccount: function(opts) {
        var acc;
        opts = extend({}, opts || {}, this.defaultOptions);
        debugMode = Boolean(opts.debugMode);
        acc = new JsSIPAccount(opts.login, opts.password, opts.server);
        acc.id = ++this.accCount;
        acc.connect();
        return acc;
      },
      disposeCurrentAcc: function() {
        var _ref, _ref1;
        if ((_ref = this.currentAcc) != null) {
          if (typeof _ref.disconnect === "function") {
            _ref.disconnect();
          }
        }
        if ((_ref1 = this.currentAcc) != null) {
          if (typeof _ref1.off === "function") {
            _ref1.off();
          }
        }
        return this.currentAcc = null;
      }
    };
    _ref = manager.exportFnNames;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      okVoice[key] = function() {
        return false;
      };
    }
    okVoice.disconnect = (function(_this) {
      return function() {
        return manager.disposeCurrentAcc();
      };
    })(this);
    okVoice.connect = function(options) {
      var exportAcc;
      manager.disposeCurrentAcc();
      manager.currentAcc = manager.createAccount(options);
      exportAcc = manager.createExportAccount(manager.currentAcc);
      extend(okVoice, exportAcc);
      exportAcc.on('all', (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return okVoice.trigger.apply(okVoice, args);
        };
      })(this));
      exportAcc.disconnect = function() {
        return okVoice.disconnect();
      };
      return exportAcc;
    };
    okVoice.version = '0.2.2';
    return okVoice;
  })();

}).call(this);
