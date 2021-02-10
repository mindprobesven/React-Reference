# [React Animated Drag List](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)

React + TypeScript + SASS | < 15 KBs (minified) | Chrome (stable) - Safari (untested)

Responsive animated list component with the functionality to re-order items by dragging them vertically. Supports both touch and mouse events. Smooth animations using requestAnimationFrame, debouncing and no absolute positioning. Refactored and readable source code with static typing. Highly optimized using a single action listener and shouldComponentUpdate hook. Includes Jest / Enzyme unit test.

* * *

## Install

Clone the GitHub repository, then

```sh
npm install
```

Run with Webpack development server

```sh
npm start
```

Build minified production version with Webpack

```sh
npm run build
```

Start an Express web server locally to run the production version

```sh
npm run server
```

### [Live Demo >>](https://www.mindprobe.io/demo/react-animated-drag-list/)

* * *

## Unit testing

Jest / Enzyme unit testing

```sh
npm run test
```