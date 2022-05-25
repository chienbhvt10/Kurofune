const mix = require('laravel-mix');

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
mix.browserSync('127.0.0.1:8000');
mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.less$/,
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            modifyVars: {
                                "primary-color": "#62a19b",
                                "secondary-color": "#62a19b",
                                "heading-color": "#62a19b"
                            },
                            javascriptEnabled: true
                        }
                    }
                },
            ]
        }
    })
    .sourceMaps();