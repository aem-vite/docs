---
title: Overview
---

# {{ $frontmatter.title }}

## What is AEM Vite?

AEM Vite – also referred to as Vite for AEM – is a powerful plugin that enables a simple and modern development experience when working without needing to spend hours messing around in configuration files.

AEM Vite uses [Vite](https://vitejs.dev), if you didn't catch that already, which provides one of the fastest build experiences and will make your AEM development journey all the more easier.

## How does it work?

Through pure magic 🪄!

Seriously though, AEM Vite uses a Vite plugin that:

- Proxies your local AEM instance
- Automatically identifies if a request matches the [configuration](./front-end/vite-plugin/#configuration)
- Strips away your desired AEM ClientLibs
- Injects the Vite client scripts 💯

All of this happens in real-time and is 100% transparent. This means less time managing complex tooling and more time developing.

## AEM support

AEM 6.5+ and the AEM SDK (AEMaaCS) are fully supported.

## Front end framework support

AEM Vite supports all of the [currently available](https://vitejs.dev/guide/backend-integration.html) DevServer experiences.

For more information about HMR support for your framework, refer to Vite's [HMR](https://vitejs.dev/guide/features.html#hot-module-replacement) documentation.
