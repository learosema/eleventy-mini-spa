const plugins = require('./plugins');

module.exports = (eleventyConfig) => {
  // custom watch targets
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./src/game');

  eleventyConfig.addPlugin(plugins);

  // short codes
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, stephanie eckles

  // passthrough copy

  eleventyConfig.addPassthroughCopy('src/gfx');

  // social icons to root directory
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/',
  });

  eleventyConfig.addPassthroughCopy({
    'src/assets/css/global.css': 'src/_includes/global.css',
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
