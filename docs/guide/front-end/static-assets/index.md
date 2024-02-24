---
title: Static Assets
---

# {{ $frontmatter.title }}

Vite supports static assets without any configuration which works for external projects, but not AEM. To ensure static assets are served correctly in AEM you can use a configuration like the below.

Prior to Vite `2.6` there was no way to resolve static assets in JavaScript and CSS without some clunky workarounds. However, as of `2.6` and greater this is fixed.

## Configuration

Update your Vite configuration to resemble the following:

<!-- prettier-ignore-start -->
```ts
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/etc.clientlibs/<project>/clientlibs/' : '/',

  build: {
    assetsDir: 'clientlib-site/resources/static', // [!code focus]

    rollupOptions: {
      assetFileNames(chunk) { // [!code focus]
        return chunk.name?.endsWith('.css') // [!code focus]
          ? 'clientlib-site/resources/css/[name][extname]' // [!code focus]
          : 'clientlib-site/resources/static/[name].[hash][extname]'; // [!code focus]
      }, // [!code focus]
    }
  },
}));
```
<!-- prettier-ignore-end -->

What this does is:

1. Sets the base url for assets to `clientlib-site/resources/static` when running `build`
2. Allow CSS and other assets to be separated which avoids everything being output to the `base` folder

## Importing Static Assets

Based on where you set your `publicDir` will depend on the base path, but for this we will assume it is `src/assets`.

To include an asset in both JavaScript and CSS we can do the following:

```scss
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: local(''),
    url('/src/assets/fonts/open-sans/open-sans-v27-latin-300.woff2') format('woff2'),
    url('/src/assets/fonts/open-sans/open-sans-v27-latin-300.woff') format('woff');
}
```

## Usage with React

When using assets such as SVG's with React the path will become relative to the assets directory. The reason for this is how Vite's React plugin handles static assets by converting them into components as required. For instance, if we have an asset called `vue-logo.svg` we would import it using the below.

```ts
import React from 'react';

import VueLogo from '../../../assets/vue-logo.svg';
```

The above example assumes where your React component lives so please update it to reflect your project structure.

## Known Issues

The only current issue known to us is a warning that appears in the terminal output for Vite asset transformations. This occurs because we're including `/src` in the path which when using Vite standalone isn't required. Prepending `/src` is required for AEM projects as it enforces the correct processing of such assets during `build` tasks.
