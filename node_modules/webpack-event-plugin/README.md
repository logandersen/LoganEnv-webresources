# webpack-event-plugin
Inspired by [on-build-webpack](https://github.com/kossnocorp/on-build-webpack) but allows for adding a callback after user specified webpack event hooks.

|NPM|
|---|
|[![npm](https://img.shields.io/npm/v/webpack-event-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-event-plugin)|

## Installation
```
npm install --save-dev webpack-event-plugin
```

## Usage
``` javascript
const WebpackEventPlugin = require('webpack-event-plugin');

// ...  
plugins: [
  new WebpackEventPlugin([
    {
      hook: 'afterEmit',
      callback: (compilation) => {
        console.log('Files emitted!');
      }
    }
  ])
]
// ...
```

## Available event hooks
https://webpack.js.org/api/compiler-hooks/
