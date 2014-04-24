// Generated by CoffeeScript 1.7.1
var nap, path;

nap = require('nap');

path = require('path');

module.exports = function(env, callback) {
  var assetsRx, createNapWrapper, ext, index, napCfg, preview, roots, section;
  preview = 'preview' === env.mode;
  roots = {
    contents: env.config.contents,
    output: env.config.output
  };
  napCfg = env.config.nap;
  for (ext in napCfg.assets) {
    for (section in napCfg.assets[ext]) {
      for (index in napCfg.assets[ext][section]) {
        napCfg.assets[ext][section][index] = roots.contents + napCfg.assets[ext][section][index];
      }
    }
  }
  napCfg.appDir = env.workDir;
  napCfg.mode = preview ? 'development' : 'production';
  napCfg.publicDir = preview ? roots.contents : roots.output;
  nap(napCfg);
  if (preview) {
    assetsRx = new RegExp(path.resolve('/assets/', roots.contents) + '/', 'g');
    createNapWrapper = function(ext) {
      return function(section) {
        return nap[ext](section).replace(assetsRx, '/');
      };
    };
    env.locals.nap = {};
    env.locals.nap.css = createNapWrapper('css');
    env.locals.nap.js = createNapWrapper('js');
    env.locals.nap.jst = createNapWrapper('jst');
    return callback();
  } else {
    env.locals.nap = nap;
    env.logger.info('nap.package()...');
    return nap["package"](callback);
  }
};