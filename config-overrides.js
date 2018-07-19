const rewireMobX = require('react-app-rewire-mobx');
const {injectBabelPlugin} = require('react-app-rewired');
const rewireSass = require('react-app-rewire-scss');

/* config-overrides.js */
module.exports = function override(config, env) {
  // use the MobX rewire
  config = rewireMobX(config,env);
  config = rewireSass(config, env);
  return config;
}