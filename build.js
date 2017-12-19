var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./dist','./system.config.js');

builder
    .buildStatic('main.js', './dist/js-image-marker.js',{ globalName: 'JSImageMarker' })
    .then(function() {
        console.log('Build complete');
    })
    .catch(function(err) {
        console.log('Build error');
        console.log(err);
    });