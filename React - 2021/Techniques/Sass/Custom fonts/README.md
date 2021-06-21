<h2>Using custom fonts with Sass</h2>

1. Place the font files inside the src directory in some assets directory
Example: ./src/assets/fonts
**Example: `./src/assets/fonts`**

2. Use the Webpack 5 asset module (asset/resource) to use assets files (fonts, icons, etc.)
without configuring additional loaders.
Example: ./webpack.common.js
**Example: `./webpack.common.js`**

3. Define the new fonts with @font-face in Sass.
Example: ./src/sass/base/_base.scss
**Example: `./src/sass/base/_base.scss`**