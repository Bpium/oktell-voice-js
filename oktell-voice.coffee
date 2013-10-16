oktellVoice = do ->

	debugMode = false
	logStr = ''
	log = (args...)->
		if not debugMode then return
		d = new Date()
		dd =  d.getFullYear() + '-' + (if d.getMonth()<10 then '0' else '') + d.getMonth() + '-' + (if d.getDate()<10 then '0' else '') + d.getDate();
		t = (if d.getHours()<10 then '0' else '') + d.getHours() + ':' + (if d.getMinutes()<10 then '0' else '')+d.getMinutes() + ':' +  (if d.getSeconds()<10 then '0' else '')+d.getSeconds() + ':' +	(d.getMilliseconds() + 1000).toString().substr(1)
		logStr += dd + ' ' + t + ' | '
		fnName = 'log'
		if args[0].toString().toLowerCase() is 'error'
			fnName = 'error'
		for val, i in args
			if typeof val == 'object'
				try
					logStr += JSON.stringify(val)
				catch e
					logStr += val.toString()
			else
				logStr += val
			logStr += ' | '
		logStr += "\n\n"
		args.unshift 'Oktell-Voice.js ' + t + ' |'
		try
			console[fnName].apply( console, args || [])
		catch e
	logErr = (args...)->
		log.apply this, ['error'].concat(args)

	eventSplitter = /\s+/
	events =
		on: (eventNames, callback, context) ->
			if not eventNames or typeof callback isnt 'function' then return false
			eventNames = eventNames.split eventSplitter
			callbacks = @__eventCallbacks or (@__eventCallbacks = {})
			for event in eventNames
				eventCallbacks = callbacks[event] or (callbacks[event] = [])
				eventCallbacks.push { fn: callback, context: context }
			true
		off: (eventNames, callback) ->
			if not eventNames?
				@__eventCallbacks = {}
			else
				callbacks = @__eventCallbacks or (@__eventCallbacks = {})
				eventNames = eventNames.split eventSplitter
				if not callback?
					for event in eventNames
						delete callbacks[event]
				else
					for event in eventNames
						eventCallbacks = callbacks[event] or (callbacks[event] = [])
						for eventCallback, i in eventCallbacks
							if eventCallback.fn is callback
								eventCallbacks[i] = false
			true
		trigger: (eventNames, args...)->
			#log 'triggger ' + eventNames
			if not eventNames
				return false
			eventNames = eventNames.split eventSplitter
			callbacks = @__eventCallbacks or (@__eventCallbacks = {})
			for event in eventNames
				eventCallbacks = callbacks[event] or (callbacks[event] = [])
				for eventInfo in eventCallbacks
					if eventInfo.fn?
						eventInfo.fn.apply eventInfo.context or window, args
				args.unshift event
				for eventInfo in (callbacks['all'] or [])
					if eventInfo.fn?
						eventInfo.fn.apply eventInfo.context or window, args
	extend = (target, args...) ->
		for i in [args.length-1..0]
			if typeof args[i] is 'object'
				for own key, val of args[i]
					target[key] = val
		target

	okVoice =
		isOktellVoice: true
	extend okVoice, events

	class Account
		id: ''
		connected: false
		constructor: (sipObject, login, pass, server)->
			@sip = sipObject
			@login = login
			@pass = pass or ''
			@server = server?.split(':')[0]
			@port = server?.split(':')[1] or '5060'
			if @sip and @login and @server and @port
				@constructed = true
			@name = 'Common account'
			@on 'all', (event, args...) =>
				log 'EVENT ' + event + ' on ' + @getName(), args
		getName: ->
			@name + ' #' + @.id
		connect: ->
			if not @constructed
				logErr 'error while consctruct ' + @getName()
				false
			else
				log @getName() + ' connect', arguments
				true
		call: (number) ->
			if not number
				return false
			log @getName() + ' call', arguments
			true
		answer: ->
			log @getName() + ' answer', arguments
		transfer: (to)->
			if not to then return false
			log @getName() + ' transfer', arguments
			true
		hangup: ->
			log @getName() + ' hangup', arguments
		dtmf: ->
			log @getName() + ' dtmf', arguments
		hold: ->
			log @getName() + ' hold', arguments
		resume: ->
			log @getName() + ' resume', arguments
		reject: ->
			log @getName() + ' reject', arguments
		disconnect: ->
			log @getName() + ' disconnect', arguments
		isConnected: ->
			@connected
	extend Account.prototype, events

	class SIPml5Account extends Account
		constructor: ->
			super
			@name = 'SIPml5 account'
		createFantomAbonent:  (newSession)->
			caller = if typeof newSession == 'string' or typeof newSession == 'number' then newSession else newSession.getRemoteFriendlyName()
			abonents = [{phone: caller.toString(), name: caller.toString()}]
			return abonents
		sipStack: false
		goLogin: ->
			@registerSession = @sipStack.newSession 'register',
				events_listener:
					events: '*',
					listener: (e)=>
						log 'registerSession event = ' + e.type
						if e.session is @registerSession
							if e.type is 'connected'
								@connected = true
								@trigger 'connect'
								#oktell.trigger 'phoneRegistered'
							else if e.type is 'terminated'
								@connected = false
								@trigger 'disconnect'


			@registerSession.register()
		createAudioElement: ->
			@el = document.createElement 'audio'
			@elId = 'oktellVoice_sipml5_' + Date.now()
			@el.setAttribute 'id', @elId
		connect: ->
			if not super then return false
			@createAudioElement() unless @el
			@sip.debugMode = debugMode
			@sip.init (e)=>
				@sipStack = new @sip.Stack
					realm: @server #mandatory: domain name
					impi: @login # mandatory: authorization name (IMS Private Identity)
					impu: 'sip:' + @login + '@' + @server # mandatory: valid SIP Uri (IMS Public Identity)
					password: @pass # optional
					display_name: @login # optional
					ice_servers: [{"url":"stun:stun.l.google.com:19302"}]
					websocket_proxy_url: 'ws://'+@server+':'+@port # optional
					outbound_proxy_url: 'udp://'+@server+':'+@port # optional
					enable_rtcweb_breaker: false # optional
					events_listener:
						events: '*'
						listener: (e)=>
							log 'sipStack event = ' + e.type
							switch e.type
								when 'started'
									@goLogin()
								when 'i_new_call'
#									if @currentSession
#										e.newSession.hangup()
#										return

									abonents = @createFantomAbonent e.newSession
									#oktell.trigger 'phoneRingStart', abonents
									#oktell.trigger 'abonentsChange', abonents
									@currentSession = e.newSession
									session = @currentSession
									session.setConfiguration
										audio_remote: @el
										events_listener:
											events: '*',
											listener: (e) =>
												log 'INCOMING session event!!! ' + e.type
												if e.type is 'connected'
													abonents = @createFantomAbonent session
													#oktell.trigger 'phoneTalkStart'
													session.eventTalkStart = true
													@trigger 'talkStart', session.getRemoteFriendlyName()
												else if e.type is 'terminated'
													#oktell.trigger 'phoneSessionStop'
													if session.eventRingStart and not session.eventRingStop
														session.eventRingStop = true
														@trigger 'ringStop', session.getRemoteFriendlyName()
													if session.eventTalkStart
														session.eventTalkStop = true
														@trigger 'talkStop', session.getRemoteFriendlyName()
													@currentSession = false
													@trigger 'sessionClose'
									session.eventRingStart = true
									@trigger 'ringStart', session.getRemoteFriendlyName()
								when 'm_permission_requested'
									if not okVoice.getUserMediaStream()
										okVoice.trigger 'mediaPermissionsRequest'
								when 'm_permission_accepted'
									if not okVoice.getUserMediaStream()
										okVoice.trigger 'mediaPermissionsAccept'
								when 'm_permission_refused'
									if not okVoice.getUserMediaStream()
										okVoice.trigger 'mediaPermissionsRefuse'

					sip_headers: [ # optional
						{ name: 'User-Agent', value: 'Oktell WebRTC' }
						{ name: 'Organization', value: 'Oktell' }
					]
				@sipStack.start()
			, (e)=>
				logErr('Failed to initialize the engine: ' + e.message)

		call: (number) ->
			if not super then return false
			number = number.toString()
			session = @sipStack.newSession 'call-audio',
				audio_remote: @el
				events_listener:
					events: '*'
					listener: (e)=>
						if @currentSession is e.session
							log '!! callSession event = ' + e.type
							if e.type is 'terminated'
								#oktell.trigger 'phoneSessionStop'
								if session.eventTalkStart
									session.eventTalkStop = true
									@trigger 'talkStop', session.getRemoteFriendlyName()
								@currentSession = false
								@trigger 'sessionClose'
							else if e.type is 'connected'
								abonents = @createFantomAbonent e.session
								#oktell.trigger 'phoneTalkStart'
								if session.eventCallStart and not session.eventCallStop
									session.eventCallStop = true
									@trigger 'callStop', session.getRemoteFriendlyName()
								session.eventTalkStart = true
								@trigger 'talkStart', session.getRemoteFriendlyName()

			@currentSession = session
			abonents = @createFantomAbonent number
			#oktell.trigger 'phoneCallStart', abonents
			#oktell.startCallWebRTC number
			session.eventCallStart = true
			@trigger 'callStart', number
			@currentSession.call number

		answer: ->
			super
			@currentSession?.accept?()

		hangup: ->
			super
			@currentSession?.hangup?()

		reject: ->
			super
			@currentSession?.reject?()
		hold: ->
			super
			#@holdedSession = @currentSession
			@currentSession?.hold?()

		resume: ->
			super
			@currentSession?.resume?()
			#@holdedSession?.resume?()

		dtmf: (digit) ->
			super
			@currentSession?.dtmf?(digit)

		transfer: (to) ->
			if not super then return false
			@currentSession?.transfer?(to.toString())

		disconnect: ->
			@sipStack.stop()
			setTimeout ->
				location.reload()
			, 500


	class JsSIPAccount extends Account
		constructor: ->
			super
			@name = 'JsSIP account'
		createFantomAbonent:  (newSession)->
			caller = if typeof newSession == 'string' or typeof newSession == 'number' then newSession else newSession.getRemoteFriendlyName()
			abonents = [{phone: caller.toString(), name: caller.toString()}]
			return abonents
		currentSession: false
		connectedFired: false
		createAudioElements: ->
			@elLocal = document.createElement 'audio'
			@elRemote = document.createElement 'audio'
			@elLocalId = 'oktellVoice_jssip_local_' + Date.now()
			@elRemoteId = 'oktellVoice_jssip_remote_' + Date.now()
			@elLocal.setAttribute 'id', @elLocalId
			@elRemote.setAttribute 'id', @elRemoteId
			document.body.appendChild @elLocal
			document.body.appendChild @elRemote
		connect: ->
			if not super then return false
			@createAudioElements() unless @elLocal
			config =
				ws_servers: 'ws://' + @server + ':' + @port
				uri: 'sip:' + @login + '@' + @server
				password: @pass
				trace_sip: debugMode
				via_host: @server

			@UA = new @sip.UA config
			window.sipua = @UA



			@UA.on 'connected', (e)=>
				log 'connected', e
				#@trigger 'connect'
			@UA.on 'disconnected', (e)=>
				@connectedFired = false
				log 'disconnected', e
				#@trigger 'disconnect'
			@UA.on 'registered', (e)=>
				log 'registered', e
				@connected = true
				if not @connectedFired
					@connectedFired = true
					@trigger 'connect'
			@UA.on 'unregistered', (e)=>
				log 'unregistered', e
				@connected = false
				@trigger 'disconnect'
			@UA.on 'registrationFailed', (e)=>
				log 'registration failed', e
				@connected = false
				@trigger 'disconnect'
			@UA.on 'mediaPermissionsRequest', (e)=>
				log 'media permissions request', e
				@trigger 'mediaPermissionsRequest'
			@UA.on 'mediaPermissionsAccept', (e)=>
				log 'media permissions accept', e
				@trigger 'mediaPermissionsAccept'
			@UA.on 'mediaPermissionsRefuse', (e)=>
				log 'media permissions refuse', e
				@trigger 'mediaPermissionsRefuse'

			@UA.on 'newRTCSession', (e)=>
				log 'new RTC session', e
				@currentSession = e.data.session

				onSessionStart = (e)=>
					log 'currentSession started', e
					@trigger 'RTCSessionStarted', @currentSession.remote_identity?.display_name
					if @currentSession?.direction is 'incoming'
						@trigger 'ringStart', @currentSession?.remote_identity?.display_name, @currentSession?.remote_identity?.toString?()

					if @currentSession.getLocalStreams().length > 0
						log 'currentSession local stream > 0', @currentSession.getRemoteStreams()[0].getAudioTracks()
						@elLocal.src = window.URL.createObjectURL @currentSession.getLocalStreams()[0]
					else
						log 'currentSession local stream == 0'

					if @currentSession.getRemoteStreams().length > 0
						log 'currentSession remote stream > 0', @currentSession.getRemoteStreams()[0].getAudioTracks()
						@elRemote.src = window.URL.createObjectURL @currentSession.getRemoteStreams()[0]
						@elRemote.play()
					else
						log 'currentSession remote stream == 0'

				if @currentSession.direction is 'incoming'
					onSessionStart()
				else
					@currentSession.on 'started', onSessionStart

				@currentSession.on 'progress', (e)=>
					log 'currentSession progress', e

				@currentSession.on 'failed', (e)=>
					log 'currentSession failed', e
					@trigger 'RTCSessionFailed', @currentSession.remote_identity?.display_name

				@currentSession.on 'ended', (e)=>
					log 'currentSession ended'
					@trigger 'RTCSessionEnded', @currentSession.remote_identity?.display_name


				# incoming or outgoing session

			@UA.start()

		call: (number) ->
			if not super then return false
			if not @connected then return false
			number = number.toString()
			options =
				#eventHandlers: eventHandlers
				#extraHeaders: [ 'X-Foo: foo', 'X-Bar: bar' ]
				mediaConstraints: {'audio': true, 'video': false}

			@UA.call number, options

		answer: ->
			super
			@currentSession?.answer?({'audio':true,'video':false})

		hangup: ->
			super
			@currentSession?.terminate?()

		reject: ->
			super
			@currentSession?.terminate?()
		hold: ->
			super
			#@holdedSession = @currentSession
			@currentSession?.hold?()

		resume: ->
			super
			@currentSession?.resume?()
		#@holdedSession?.resume?()

		dtmf: (digit) ->
			super
			@currentSession?.sendDTMF?(digit)

		transfer: (to) ->
			if not super then return false
			@currentSession?.transfer?(to.toString())

		disconnect: ->
			@UA.stop()
#			setTimeout ->
#				location.reload()
#			, 500


	userMedia = false

	okVoice.createUserMedia = (onSuccess, onDeny, useVideo)=>
		if userMedia
			return onSuccess?(userMedia)
		getUserMedia = navigator.getUserMedia or navigator.webkitGetUserMedia or navigator.mozGetUserMedia or navigator.msGetUserMedia
		if typeof getUserMedia isnt 'function'
			return false
		hasDecision = false
		setTimeout =>
			if not hasDecision
				okVoice.trigger 'mediaPermissionsRequest'
		, 500
		getUserMedia.call navigator,
			audio: true
			video: useVideo
		, (st)=>
			hasDecision = true
			userMedia = st
			okVoice.trigger 'mediaPermissionsAccept'
			onSuccess?(userMedia)
		, (st)=>
			hasDecision = true
			okVoice.trigger 'mediaPermissionsRefuse'
			onDeny?(st)

	okVoice.getUserMediaStream = ->
		userMedia

	manager =
		accounts: []
		defaultAcc: null
		defaultOptions:
			typeName: 'jssip' #'sipml5'
			debugMode: false

		getSipObject: (typeName) ->
			switch typeName
				when 'sipml5' then window.SIPmlCreate()
				when 'jssip' then window.JsSIP
		getClassByTypeName: (name)->
			switch name
				when 'sipml5' then SIPml5Account
				when 'jssip' then JsSIPAccount
		exportKeys: ['call', 'answer', 'hangup', 'transfer', 'hold', 'resume', 'dtmf', 'reject', 'disconnect', 'isConnected']
		createExportAccount: (account) ->
			if not account? then return false
			a = {}
			for key in @exportKeys when account[key]?
				do ->
					val = account[key]
					a[key] = ->
						val.apply account, arguments
			extend a, events
			account.on 'all', (args...)=>
				a.trigger.apply a, args
			return a
		createAccount: (opts) ->
			opts = extend {}, opts or {}, @defaultOptions
			sipObject = opts.type or @getSipObject opts.typeName
			accClass = @getClassByTypeName opts.typeName
			if not sipObject or not accClass then return false
			debugMode = Boolean opts.debugMode
			acc = new accClass sipObject, opts.login, opts.password, opts.server
			@defaultAcc ?= acc
			acc.id = @accounts.length + 1
			@accounts.push acc
			acc.connect()
			return acc

	for key in manager.exportKeys
		okVoice[key] = -> false

	currentAcc = null
	okVoice.connect = ->
		# use one account only
		if currentAcc
			if not currentAcc?.isConnected?()
				currentAcc.connect()
			return currentAcc
		else
			acc = manager.createAccount.apply manager, arguments
			currentAcc = manager.createExportAccount acc
			if acc is manager.defaultAcc
				extend okVoice, currentAcc
				currentAcc.on 'all', (args...)=>
					okVoice.trigger.apply okVoice, args
				okVoice.on 'all', (eventname, args...)=>
					#console.log 'oktellVoice!!!!!!!!!!!!!!!!!!!! EVENT ' + eventname, args
			currentAcc

	okVoice.disconnect = =>

	okVoice.version = '0.1.1'

	return okVoice