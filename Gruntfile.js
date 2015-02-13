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
        config: config
    });

    grunt.registerTask('default', []);
};
