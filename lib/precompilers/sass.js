var fs = require('fs'),
    sass = require('node-sass'),
    sassCompile = module.exports = {};

// Name of the stylesheet language
sassCompile.name = 'sass';

// File extension for that language
sassCompile.extensions = ['sass', 'scss'];

/**
 * Compiles the passed file to css and passes
 * the resulting css to the given callback
 *
 * @param  {String}   file     The file to compile
 * @param  {Function} callback (err, css)
 * @param  {Objec}    options  Any additional options
 */
sassCompile.render = function (file, callback, options) {
  console.log('Compiling sass!');
  console.log(file);
  options = options ? options : {};
  options.file = file;
  options.success = function success(css){
    callback(null, css)
  };
  options.error = function error(err){
    console.log("Error");
    console.log(err)
    callback(err)
  };
  sass.render(options);
};
