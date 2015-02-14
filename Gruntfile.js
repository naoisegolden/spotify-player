'use strict';

module.exports = function (grunt) {
    // Configurable paths
    var config = {
        app: 'src',
        dist: 'build'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
      // Project settings
      config: config,

      sass: {
        dist: {
          files: {
            '<%= config.app %>/styles/style.css': '<%= config.app %>/styles/style.scss'
          }
        }
      },

      postcss: {
        options: {
          map: true,
          processors: [
            require('autoprefixer-core')({ browsers: 'last 2 versions' }).postcss
          ]
        },
        dist: {
          src: '<%= config.app %>/styles/style.css'
        }
      },

      watch: {
        files: ['Gruntfile.js', '<%= config.app %>/**/*.scss', '<%= config.app %>/**/*.html'],
        tasks: ['default'],
        options: {
          livereload: true,
        }
      }
    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    // Custom Tasks
    grunt.registerTask('default', ['sass', 'postcss']);
};
