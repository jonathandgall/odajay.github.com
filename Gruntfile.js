/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 *
 * Modified by Jonathan Gall
 **/
 
 var ngrok = require('ngrok');

module.exports = function (grunt) {
    'use strict';
    //Load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Grunt configuration

    grunt.initConfig({
        pagespeed: {
            options: {
                nokey: true,
                locale: 'en_GB',
                threshold: 40
            },
            local: {
                options: {
                    strategy: 'desktop'
                }
            },
            mobile: {
                options: {
                    strategy: 'mobile'
                }
            }
        }
    });

    // Register customer task for ngrok
    grunt.registerTask('udacity-ngrok', 'Run pagespeed with ngrok', function () {
        var done = this.async();
        var port = 8080;

        ngrok.connect(port, function (err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });


    // Register default tasks
    grunt.registerTask('default', [
        'udacity-ngrok'
    ]);
};