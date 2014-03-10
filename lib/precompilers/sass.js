var fs = require('fs');
var sass = require('node-sass');
var sassCompile = module.exports = {};
var spawn = require('child_process').spawn;

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
  options = options ? options : {};
  if(options['include-paths']){
    if(!(options['include-paths'] instanceof Array)){
      options['include-paths'] = [options['include-paths']]
    }
    options.includePaths = options['include-paths']
  }

  options.success = function success(css){
    callback(null, css)
  };
  options.error = function error(err){
    callback(err)
  };
  options.file = file;

  if(options.preprocessor){
    var css = ''
    var pp = options.preprocessor
    if(options.includePaths){
      options.includePaths.forEach(function(path){
        pp += ' --load-path="' + path + '"';
      })
    }
    var error = '';
    pp += ' ' + options.file;

    pp = pp.split(' ');
    command = pp.shift()
    console.log("Command is: ")
    console.log(command)
    child = spawn(command, pp);
    child.stderr.setEncoding('utf8');
    child.stderr.on('err', function(data){
      error += data;
    })
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function(data){
      css += data;
    });
    child.on('close', function(){
      if(error){
        options.error(error);
      }else {
        options.success(css);
      }
    });
  } else {
    sass.render(options);
  }

};
