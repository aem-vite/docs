---
title: Vite Configuration
---

# {{ $frontmatter.title }}

Each and every project will be unique regarding structure, outputs, and general development needs. The following is intended to provide coverage for general expectations using Adobe's AEM Archetype as a reference.

## Recommended configuration

What you can see is the same output structures being used align to the [structure](/guide/front-end/structure/) described previously. Some other things that are also going on:

- Sets the `base` path correctly for both `command` types
- Sets the `publicDir` path to `src/assets`. Change this to match your source structure
- Disables gzip compression calculations (saves 2-5 seconds per prod build)
- Disables the `manifest.json` file
- Disables minification when running in **development** mode
- Disables sourcemaps when not using the Vite DevServer
- Prefer `terser` over `esbuild` for minification
- Enforce the server origin for static assets via `server.origin`

<!-- prettier-ignore-start -->
::: code-group

```ts [vite.config.js]
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => ({
  base: command === 'build' ? '/etc.clientlibs/<project>/clientlibs/' : '/',
  publicDir: command === 'build' ? false : 'src/assets',

  build: {
    reportCompressedSize: false,
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

A `base` path is required to support static assets and dynamic imports as it will ensure that certain files are loaded from the correct AEM path. Refer to [static assets](../static-assets/) for further details.

### Specific build modes

By default, Vite runs its DevServer in **development** mode. Standard builds always run in **production** which is generally fine but you may want more granular control of this which can be achieved using the following.

::: code-group

```sh [development]
vite build --mode development
```

```sh [production]
vite build --mode production
```

:::

Now that you can build both development and production bundles you can switch between having features such as sourcemaps and console logging.

## Source structure

Where your inputs come from isn't important as Vite simply consumes anything you provide to it. However, we recommended that you consider your main website CSS and JavaScript separate entries.

The below example demonstrates this but you will need to keep in mind that the `input` keys should be unique otherwise rollup will automatically append an number to the end of the filename. See rollup's [input documentation](https://rollupjs.org/guide/en/#input) for more information.

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

### Explicit CSS entry

Due to how AEM handles CSS it is not recommended to import it directly in your JavaScript modules as this can result in undesired outputs. For consistency your main CSS outputs should be declared explicitly in your Vite `rollupOptions.input` object. All other CSS specific to things such as React can be imported directly via JavaScript.

## Plugins

Please refer to Vite's [plugin documentation](https://vitejs.dev/guide/using-plugins.html) for instructions on using plugins in Vite.

## Code output

The process of how your bundled code gets handled shouldn't change if you don't need it to. The design of AEM Vite enables you to use any structure you wish but recommends ours for the best compatibility. Tools such as Adobe's `aem-clientlib-generator` will work perfectly fine with AEM Vite as it is executed after a build.

## DevServer

If you want to customise how the Vite DevServer behaves you can do so via Vite's `server` configuration. By default Vite will attempt to start the server on port `3000` but will automatically increment to the next available port if `3000` is already in use. To ensure this doesn't happen, it is recommended to set a more specific port that you don't expect to change.

Please refer to Vite's [server api documentation](https://vitejs.dev/config/#server-options) for more information.

```ts
export default defineConfig(() => ({
  server: {
    port: 5000,
  },
}));
```

## Static assets

Refer to [static assets](../static-assets/) for further details.

## Next Steps

- [Configure plugin](../vite-plugin/) for Vite
- [Support module](../module-imports/) imports
- [Support dynamic](../dynamic-imports/) imports
