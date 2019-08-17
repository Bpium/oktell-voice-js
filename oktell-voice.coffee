window.oktellVoice = do ->

	debugMode = false
	log = (args...)->
		if not debugMode then return
		args.unshift 'Oktell-Voice.js |'
		console.log.apply console, args

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


	#####################
	# oktellVoice object

	userMedia = false

	okVoice =
		isOktellVoice: true
		getUserMediaStream: ->
			userMedia
		isSupported: ->
			# Supported Chrome, Yandex browser >=14, Opera >=20, Firefox
			isChrome = Boolean navigator.userAgent.match(/Chrome\/[0-9\.]+? Safari\/[0-9\.]+$/)
			isYaBrowser = parseInt(navigator.userAgent.match(/Chrome\/[0-9\.]+? YaBrowser\/([0-9]+)/)?[1]) >= 14
			isOpera = parseInt(navigator.userAgent.match(/Chrome\/[0-9\.]+? Safari\/[0-9\.]+ OPR\/([0-9]+)/)?[1]) >= 20
			isFirefox = Boolean navigator.userAgent.match(/Firefox\/[0-9\.]+/)
			return isChrome or isYaBrowser or isOpera or isFirefox


	extend okVoice, events




	#####################
	# Account Class

	class JsSIPAccount
		sip: window.JsSIP
		constructor: (login, pass, server, useWSS)->
			@id             = ''
			@connected      = false
			@login          = login
			@pass           = pass or ''
			@server         = server?.split(':')[0]
			@port           = server?.split(':')[1] or '5060'
			@useWSS         = useWSS
			@name           = 'JsSIP account'
			@currentSession = false
			@connectedFired = false

			if @sip and @login and @server and @port
				@constructed = true

			@on 'all', (event, args...) =>
				log 'EVENT ' + event + ' on ' + @getName(), args

		getName: ->
			@name + ' #' + @.id
		isConnected: ->
			@connected

		createFantomAbonent:  (newSession)->
			caller = if typeof newSession == 'string' or typeof newSession == 'number' then newSession else newSession.getRemoteFriendlyName()
			abonents = [{phone: caller.toString(), name: caller.toString()}]
			return abonents

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
			if not @constructed
				log.error 'error while construct ' + @getName()
				return false
			log @getName() + ' connect', arguments
			@createAudioElements() unless @elLocal
			config =
				ws_servers: (if @useWSS then 'wss' else 'ws') + '://' + @server + ':' + @port
				uri: 'sip:' + @login + '@' + @server
				password: @pass
				via_host: @server

			if debugMode
				JsSIP.debug.enable('JsSIP:*')
			else
				JsSIP.debug.disable('JsSIP:*')

			@UA = new @sip.UA config
			if debugMode
				window.sipua = @UA



			@UA.on 'connected', (e)=>
				log 'connected', e
				@connected = true
				if not @connectedFired
					@connectedFired = true
					@trigger 'connect'
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
				@UA.stop()
				@trigger 'disconnect'
			@UA.on 'registrationFailed', (e)=>
				log 'registration failed', e
				@connected = false
				@UA.stop()
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

					# https://stackoverflow.com/questions/51101408/deprecation-of-createobjecturl-and-replace-with-the-new-htmlmediaelement-srcobje
					setStream = (audioElement, stream)=>
						try
							audioElement.srcObject = stream
						catch
							audioElement.src = window.URL.createObjectURL(stream)

					if @currentSession.getLocalStreams().length > 0
						log 'currentSession local stream > 0', @currentSession.getRemoteStreams()[0].getAudioTracks()
						setStream @elLocal, @currentSession.getLocalStreams()[0]
					else
						log 'currentSession local stream == 0'

					if @currentSession.getRemoteStreams().length > 0
						log 'currentSession remote stream > 0', @currentSession.getRemoteStreams()[0].getAudioTracks()
						setStream @elRemote, @currentSession.getRemoteStreams()[0]
						@elRemote.play()
					else
						log 'currentSession remote stream == 0'

				if @currentSession.direction is 'incoming'
					onSessionStart()
				else
					@currentSession.on 'confirmed', onSessionStart

				@currentSession.on 'progress', (e)=>
					log 'currentSession progress', e

				@currentSession.on 'failed', (e)=>
					log 'currentSession failed', e
					@trigger 'RTCSessionFailed', @currentSession.remote_identity?.display_name

				@currentSession.on 'ended', (e)=>
					log 'currentSession ended'
					@trigger 'RTCSessionEnded', @currentSession.remote_identity?.display_name

				@currentSession.on 'hold', (e)=>
					@holdedSession = @currentSession


				# incoming or outgoing session

			@UA.start()

		call: (number) ->
			if not number or not @connected
				return false
			log @getName() + ' call', arguments
			number = number.toString()
			options =
				#eventHandlers: eventHandlers
				#extraHeaders: [ 'X-Foo: foo', 'X-Bar: bar' ]
				mediaConstraints: {'audio': true, 'video': false}

			@UA.call number, options

		answer: ->
			@currentSession?.answer?({'audio':true,'video':false})

		hangup: ->
			@currentSession?.terminate?()

		reject: ->
			@currentSession?.terminate?()
		hold: ->
			@currentSession?.hold?()

		isOnHold: ->
			@holdedSession?.isOnHold?()

		resume: ->
			@holdedSession?.unhold?()

		dtmf: (digit) ->
			@currentSession?.sendDTMF?(digit)

		transfer: (to) ->
			if not to
				return false
			@currentSession?.transfer?(to.toString())

		disconnect: ->
			@UA.stop()

	extend JsSIPAccount.prototype, events




	##################
	# Media streams



	okVoice.createUserMedia = (onSuccess, onDeny, useVideo, audioOptions = {})=>
		if userMedia
			return onSuccess?(userMedia)
		hasDecision = false

		triggerDeny = (st)->
			hasDecision = true
			okVoice.trigger 'mediaPermissionsRefuse', st
			onDeny?(st)

		getUserMedia = navigator.getUserMedia or navigator.webkitGetUserMedia or navigator.mozGetUserMedia or navigator.msGetUserMedia

		defaultAudioOptions =
			mandatory:
				googAutoGainControl: false
			optional: []

		if not okVoice.isSupported() or typeof getUserMedia isnt 'function'
			triggerDeny()
			return false
		setTimeout =>
			if not hasDecision
				okVoice.trigger 'mediaPermissionsRequest'
		, 500
		getUserMedia.call navigator,
			audio: extend({}, defaultAudioOptions, audioOptions)
			video: useVideo
		, (st)=>
			hasDecision = true
			userMedia = st
			okVoice.trigger 'mediaPermissionsAccept'
			onSuccess?(userMedia)
		, (error)=>
			triggerDeny(error)




	#######################
	# Connecting and creating accounts

	manager =
		accCount: 0
		currentAcc: null
		defaultOptions:
			debugMode: false
		exportFnNames: [
			'call'
			'answer'
			'hangup'
			'transfer'
			'hold'
			'isOnHold'
			'resume'
			'dtmf'
			'reject'
			'isConnected'
		]
		createExportAccount: (account) ->
			if not account? then return false
			a = {}
			for key in @exportFnNames when account[key]?
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
			debugMode = Boolean opts.debugMode
			# temp
			#login  = location.href.match(/login=([^&]+)/)?[1]
			#pass   = location.href.match(/pass=([^&]+)/)?[1]
			#server = location.href.match(/server=([^&]+)/)?[1]
			#acc = new accClass sipObject, login or opts.login, pass or opts.password, server or opts.server
			acc = new JsSIPAccount opts.login, opts.password, opts.server, opts.useWSS
			acc.id = ++@accCount
			acc.connect()
			return acc
		disposeCurrentAcc: ->
			@currentAcc?.disconnect?()
			# @currentAcc?.off?()
			@currentAcc = null


	for key in manager.exportFnNames
		okVoice[key] = -> false

	okVoice.disconnect = =>
		manager.disposeCurrentAcc()

	okVoice.connect = (options)->
		manager.disposeCurrentAcc()
		manager.currentAcc = manager.createAccount options
		exportAcc = manager.createExportAccount manager.currentAcc
		extend okVoice, exportAcc
		exportAcc.on 'all', (args...)=>
			okVoice.trigger.apply okVoice, args
		#okVoice.on 'all', (eventname, args...)=>
		#	console.log 'oktellVoice!!!!!!!!!!!!!!!!!!!! EVENT ' + eventname, args
		exportAcc.disconnect = ->
			okVoice.disconnect()
		exportAcc


	okVoice.version = '0.2.6'

	return okVoice
