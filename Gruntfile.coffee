module.exports = (grunt)->
	require('load-grunt-tasks')(grunt)
	require('time-grunt')(grunt)

	myConf =
		build: 'build'
		version: '0.1.0'

	grunt.initConfig
		myConf: myConf
		clean:
			build:
				files: [{
					src: ['<%= myConf.build %>/**/*']
				}]


		concat:
			build:
				options:
					banner: "/* Oktell-voice.js version <%= myConf.version %> http://js.oktell.ru/js/voice/ */\n\n"
				files: [
					{
						src: [
							'jssip-0.3.7.js',
							'oktell-voice.js'
						]
						dest: '<%= myConf.build %>/oktell-voice.js'
					}
				]
		uglify:
			build:
				files: {
					'<%= myConf.build %>/oktell-voice.min.js': [
						'<%= myConf.build %>/oktell-voice.js'
					]
				}



	grunt.registerTask 'build', [
#		'clean:build',
		'concat:build',
		'uglify:build'
	]

	grunt.registerTask 'default', [
		'build'
	]
