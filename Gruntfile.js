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

      cssmin: {
        options: {
          rebase: false
        },
        dist: {
          files: {
            '<%= config.dist %>/styles/style.min.css': '<%= config.app %>/styles/style.css'
          }
        }
      },

      uglify: {
        options: {
          mangle: false
        },
        dist: {
          files: {
            '<%= config.dist %>/javascript/application.min.js': ['<%= config.app %>/javascript/application.js']
          }
        }
      },

      imagemin: {
        dist: {
          files: [
            {
              expand: true,
              cwd: '<%= config.app %>',
              src: ['images/*.{png,jpg,gif}'],
              dest: '<%= config.dist %>'
            }
          ]
        }
      },

      copy: {
        main: {
          expand: true,
          cwd: '<%= config.app %>',
          src: 'favicon.ico',
          dest: '<%= config.dist %>/',
        }
      },

      processhtml: {
        dist: {
          files: {
            '<%= config.dist %>/index.html': '<%= config.app %>/index.html'
          }
        }
      },

      watch: {
        files: ['Gruntfile.js', '<%= config.app %>/**/*.scss', '<%= config.app %>/**/*.html'],
        tasks: ['default'],
        options: {
          livereload: true,
        }
      },

      'gh-pages': {
        options: {
          base: '<%= config.dist %>'
        },
        src: ['**']
      }
    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-gh-pages');

    // Custom Tasks
    grunt.registerTask('default', ['sass', 'postcss']);
    grunt.registerTask('build', ['default', 'uglify', 'cssmin', 'imagemin', 'copy', 'processhtml']);
    grunt.registerTask('deploy', ['build', 'gh-pages']);
};
