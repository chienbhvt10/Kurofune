const mix = require("laravel-mix");

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
mix.browserSync("127.0.0.1:8000");
mix
  .js("resources/js/app.js", "public/js")
  .react()
  .sass("resources/sass/app.scss", "public/css")
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: "less-loader",
          options: {
            lessOptions: {
              modifyVars: {
                "primary-color": "#62a19b",
                "secondary-color": "#62a19b",
                "heading-color": "#62a19b",
                "btn-border-radius-base": "5px",
                "table-bg": "#F5F5F5",
                "table-header-bg": "#62a19b",
                "table-header-color": "#FFF",
                "table-border-color": "#DCDCDC",
                "label-color": "#62a19b",
                "form-item-label-font-size": "11px",
                "form-item-label-colon-margin-right": "8px",
                "form-item-label-colon-margin-left": "2px",
                "form-item-margin-bottom": "10px",
                "btn-height-base": "42px",
                "card-radius": "8px",
              },
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
  })
  .sourceMaps();
