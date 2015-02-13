'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        files: {
          'build/application.min.js': ['src/javascript/*.js']
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/application.min.css': ['src/styles/*.css']
        }
      }
    },
    // sass: {
    //   dist: {
    //     files: {
    //      'build/application.min.css':'src/styles/*.scss'
    //     }
    //   }
    // },
    processhtml: {
      dist: {
        options: {
          process: true,
          data: {
            title: 'Spotify Player',
            message: 'This is production distribution'
          }
        },
        files: {
          'build/index.html': ['index.html']
        }
      }
    },
    copy: {
      bootstrap_css: {
        src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
        dest: 'build/bootstrap.min.css',
      },
      bootstrap_js: {
        src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
        dest: 'build/bootstrap.min.js',
      },
      jquery: {
        src: 'bower_components/jquery/dist/jquery.min.js',
        dest: 'build/jquery.min.js',
      },
      images: {
        src: 'images/default.jpg',
        dest: 'build/images/default.jpg',
      }
    },
    'gh-pages': {
        options: {
          base: 'build',
          repo: 'https://github.com/mtbtiago/spotify-player.git'
        },
        src: ['**']
    }
  });

  // Load the plugin tasks
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Custom tasks
  grunt.registerTask('deploy', ['gh-pages']);
  grunt.registerTask('default', ['uglify', 'cssmin', /* 'sass', */ 'copy', 'processhtml']);
};