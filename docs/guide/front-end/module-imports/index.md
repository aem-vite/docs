---
title: Module Imports
---

# {{ $frontmatter.title }}

An ES module import is an `import` statement that instructs your browser to automatically load a new file in context. This is an amazing feature in modern development as it avoids the need for polyfills and libraries.

## The problem

Due to the way Vite generates outputs, `import` statements will become relative which in the context of AEM won't work. Let's say that we have a ClientLib located at: **/etc.clientlibs/&lt;project>/clientlibs/clientlib-site.js**

Within `my-clientlib.js` let's assume that a module by the name of `modulea.js` needs to be imported but is being requested using: **../../resources/modulea.js**

What you will see in your browser is a 404 request error for `modulea.js` because the request URI will end up looking something like: **/etc.clientlibs/&lt;project>/clientlibs/clientlib-site/resources/modulea.js**

## Solving this problem

You might think this is a tough problem to resolve but AEM provides a nice simple solution which only requires us to nest our compiled files into a nested `resources` folder. For some background, AEM 6.4 and newer don't respond to requests via the `/etc.clientlibs` proxy unless the requested resource resides within a `resources` folder.

### Example Vite configuration

Here is an example of how to configure Vite to ensure all files are placed in the correct places.

<!-- prettier-ignore-start -->
```ts{5}
export default defineConfig(() => ({
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'clientlib-site/resources/chunks/[name].[hash].js', // [!code focus]
      },
    },
  },
}));
```
<!-- prettier-ignore-end -->
