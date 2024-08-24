// kudos to https://github.com/madrilene/eleventy-excellent
// CSS and JavaScript as first-class citizens in Eleventy: https://pepelsbey.dev/articles/eleventy-css-js/

const esbuild = require('esbuild');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = (eleventyConfig) => {
  eleventyConfig.addTemplateFormats('ts');

  eleventyConfig.addExtension('ts', {
    outputFileExtension: 'js',
    compile: async (content, fullPath) => {
      const parsedPath = path.parse(fullPath);
      const basedir = path.basename(parsedPath.dir);

      if (path.basename(fullPath) !== `main.ts`) {
        return;
      }

      return async () => {
        let output = await esbuild.build({
          target: 'es2020',
          entryPoints: [fullPath],
          minify: isProduction,
          bundle: true,
          write: false,
          sourcemap: !isProduction,
        });

        return output.outputFiles[0].text;
      };
    },
  });
};
