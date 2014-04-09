// Generated by CoffeeScript 1.7.1
module.exports = function(grunt) {
  var myConf;
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  myConf = {
    build: 'build',
    version: '0.2.0'
  };
  grunt.initConfig({
    myConf: myConf,
    coffee: {
      options: {
        bare: true
      },
      build: {
        files: [
          {
            expand: true,
            src: 'oktell-voice.coffee',
            dest: '<%= myConf.build %>',
            ext: '.js'
          }
        ]
      }
    },
    concat: {
      build: {
        options: {
          banner: "/*\n * Oktell-voice.js\n * version <%= myConf.version %>\n * http://js.oktell.ru/js/voice/\n */\n\n"
        },
        files: [
          {
            src: ['jssip-0.4.0-devel.js', '<%= myConf.build %>/oktell-voice.js'],
            dest: '<%= myConf.build %>/oktell-voice.js'
          }
        ]
      }
    },
    uglify: {
      build: {
        files: {
          '<%= myConf.build %>/oktell-voice.min.js': ['<%= myConf.build %>/oktell-voice.js']
        }
      }
    },
    replace: {
      build: {
        src: ['oktell-voice.*'],
        overwrite: true,
        replacements: [
          {
            from: /okVoice.version = '[0-9\.]+'/g,
            to: "okVoice.version = '<%= myConf.version %>'"
          }
        ]
      },
      bower: {
        src: ['bower.json'],
        overwrite: true,
        replacements: [
          {
            from: /"version": "[0-9\.]+",/,
            to: '"version": "<%= myConf.version %>",'
          }
        ]
      }
    }
  });
  grunt.registerTask('build', ['replace', 'coffee:build', 'concat:build', 'uglify:build']);
  return grunt.registerTask('default', ['build']);
};
