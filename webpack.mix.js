let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.(jsx|js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      ]
    },
    resolve: {
      alias: {
        components: path.join(__dirname, 'resources', 'assets', 'js', 'components'),
      },
    },
  })
  .sass('resources/assets/sass/app.scss', 'public/css')
  .react('resources/assets/js/app.js', 'public/js');
