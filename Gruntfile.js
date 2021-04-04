module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jasmine:{
            src: [
                //This grabs all the component.ts files under a subfolder of the chess folder.
                'src/chess/*/*.component.ts'
            ],
            options: {
                specs: [
                    'spec/BaordComponent_spec.ts'
                ]
            }
        }
    });
}