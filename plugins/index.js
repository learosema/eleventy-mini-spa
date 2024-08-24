const esbuild = require('./esbuild');
const lightningCss = require('./lightning-css');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(esbuild);
  eleventyConfig.addPlugin(lightningCss);
};
