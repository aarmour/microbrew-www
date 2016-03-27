require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: require('../../webpack.config').cssModules.localIdentName
});
require('./server');
