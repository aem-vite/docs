---
title: Vite Configuration
---

# {{ $frontmatter.title }}

Each and every project will be unique regarding structure, expected outputs and general development needs. The following is intended to provide coverage for general expectations using Adobe's AEM Archetype as a reference.

## Recommended configuration

What you can see is the same output structures being used align to the [structure](/guide/front-end/structure/) described previously. Some other things that are also going on:

- Sets the `base` path correctly for both `command` types
- Sets the `publicDir` path to `src/assets`. Change this to match your source structure
- Disables brotli compression calculations (saves 2-5 seconds per prod build)
- Disables the `manifest.json` file
- Disables minification when running in **development** mode
- Disables sourcemaps when not using the Vite DevServer
- Prefer `terser` over `esbuild` for minification
- Enfore the server origin for static assets via `server.origin`

<!-- prettier-ignore-start -->
::: code-group

```ts [vite.config.js]
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => ({
  base: command === 'build' ? '/etc.clientlibs/<project>/clientlibs/' : '/',
  publicDir: command === 'build' ? false : 'src/assets',

  build: {
    brotliSize: false,
    manifest: false,
    minify: mode === 'development' ? false : 'terser',
    outDir: 'dist',
    sourcemap: command === 'serve' ? 'inline' : false,

    rollupOptions: {
      output: {
        assetFileNames: 'clientlib-site/resources/[ext]/[name][extname]',
        chunkFileNames: 'clientlib-site/resources/chunks/[name].[hash].js',
        entryFileNames: 'clientlib-site/resources/js/[name].js',
      },
    },
  },

  plugins: [tsconfigPaths()],

  server: {
    origin: 'http://localhost:3000',
  },
}));
```

:::
<!-- prettier-ignore-end -->

> [!TIP]
> This configuration intentionally uses `vite-tsconfig-paths` as Adobe have adopted TypeScript in their archetype.

See [module imports](../module-imports/) which explains the reasoning behind the rollup `output` structure.

### Base path

A `base` path is required to support static assets and dynamic imports as it will ensure that certain files are loaded from the correct AEM path.

### Specific build modes

By default Vite runs its DevServer in **development** mode, but standard builds always run in **production** which is fine for non-AEM projects whereas AEM needs more control. The above configuration enables us to do things like the below.

::: code-group

```sh [development]
vite build --mode development
```

```sh [production]
vite build --mode production
```

:::

Now that you can build both development and production bundles, you can toggle between having features such as sourcemaps and console logging if you wish to test code outside of Vite's DevServer.

## Source structure

Where your inputs come from isn't important as Vite simply consumes anything you provide to it. It is, however, recommended that you consider your main website CSS and JavaScript separate entries.

The below example demonsrates this but you will need to keep in mind that the `input` keys should be unqiue otherwise rollup will automatically append an number to the end of the filename. See rollup's [input documentation](https://rollupjs.org/guide/en/#input) for more information.

<!-- prettier-ignore-start -->
```ts
export default defineConfig(() => ({
  build: {
    rollupOptions: { // [!code focus]
      input: { // [!code focus]
        bundle: 'src/main/webpack/js/app.ts', // [!code focus]
        styles: 'src/main/webpack/css/app.scss', // [!code focus]
      }, // [!code focus]
    }, // [!code focus]
  },
}));
```
<!-- prettier-ignore-end -->

### Making CSS its own entry

Due to how AEM handles CSS it is not recommended to import it directly in your JavaScript modules as this can result in undesired outputs. For consistency, you main CSS outputs should be declared explicitly in your Vite `rollupOptions.input` object. All other CSS specific to things such as React can be imported directly via JavaScript.

## Plugins

Please refer to Vite's [plugin documentation](https://vitejs.dev/guide/using-plugins.html) for instructions on using plugins in Vite.

## Code output

The process of how your bundled code gets handled shouldn't change if you won't need it to. The design of AEM Vite enables you to use any structure you wish but recommends ours for the best compatibility. Tools such as Adobe's `aem-clientlib-generator` will work perfectly fine with AEM Vite as it is executed after a build.

## DevServer

If you want to customise how the Vite DevServer behaves you can do so via Vite's `server` configuration. By default Vite will attempt to start the server on port `3000` but will automatically increment to the next available port if `3000` is already in use. To ensure this doesn't happen, it is recommended to set a more specific port that you don't expect to change.

Please refer to Vite's [server api documention](https://vitejs.dev/config/#server-options) for more information.

```ts
export default defineConfig(() => ({
  server: {
    port: 5000,
  },
}));
```

## Static assets

Vite supports static assets without any configuration which works for external projects, but not AEM. To ensure static assets are served correctly in AEM you can use a configuration like the below.

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

1. Sets the base url for assets to `clientlib-site/resources/static` when running `build`, not `serve`
2. Allow CSS and other assets to be separated which avoids everything been dumped into the `base` folder
