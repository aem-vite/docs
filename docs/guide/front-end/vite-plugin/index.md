---
title: Vite Plugin
---

# {{ $frontmatter.title }}

Evolving AEM Vite has always and is a primary goal of the project. To ensure AEM Vite keeps up with ever-changing updates and feature inclusions within the Vite ecosystem we are providing a plugin that solves many challenges.

## Solving Challenges

In the past, AEM Vite relied heavily on Java to maintain the relationship between ClientLibs and the Vite DevServer. While this worked, it was simply a stop gap to solve the immediate issue of how do we get Vite working nicely in AEM. The `@aem-vite/vite-aem-plugin` package was born from this initial idea with the goal of eliminating some of the backend set up and introducing something more digestible for front end developers.

This Vite plugin reduces the complexity of the set up, but it couples more of the configuration to a central plugin. Providing a richer and simplified DX (Developer Experience) overall was always the goal, and by relying more on Vite as the underpinning driving force it enables more possibilities than the previous Java implementation could have hoped to achieve.

In addition to these points, this plugin also aims to bring some boilerplate along with it that continues to help simplify installation and set up.

## Installation

Getting started is quick and simple. Run the below command to install the Vite AEM plugin.

::: code-group

```sh [npm]
npm install -D @aem-vite/vite-aem-plugin
```

```sh [pnpm]
pnpm add -D @aem-vite/vite-aem-plugin
```

```sh [yarn]
yarn add -D @aem-vite/vite-aem-plugin
```

```sh [bun]
bun add -D @aem-vite/vite-aem-plugin
```

:::

## Configuration

<!-- prettier-ignore-start -->
```ts
import { viteForAem } from '@aem-vite/vite-aem-plugin'; // [!code focus]

export default defineConfig(() => ({
  plugins: [
    viteForAem({ // [!code focus]
      contentPaths: ['<content path(s)>'], // [!code focus]
      publicPath: '/etc.clientlibs/<project>/clientlibs/clientlib-site', // [!code focus]
    }), // [!code focus]
  ],
}));
```
<!-- prettier-ignore-end -->

> [!TIP]
> Refer to the [vite configuration](/guide/front-end/vite/) and [dynamic imports](/guide/front-end/dynamic-imports/) documentation for more information about the `publicPath` option.

### Plugin options

| Property Name                                                                                                          | Type     | Required |
| :--------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| **aem**<br><small>Set the hostname and port of your AEM instance.</small>                                              | `object` | No       |
| **contentPaths**<br><small>A list of content paths (excluding `/content/`) to match ClientLib paths in.</small>        | `array`  | Yes      |
| **keyFormatExpressions**<br><small>A list of key format expressions to use when matching ClientLibs on a page.</small> | `array`  | No       |
| **publicPath**<br><small>The AEM proxy path to your ClientLib directory.</small>                                       | `string` | Yes      |
| **rewriterOptions**<br><small>Enables the `@aem-vite/import-rewriter` plugin</small>                                   | `object` | No       |

> [!NOTE]
> The `publicPath` option is automatically forwarded onto the `@aem-vite/import-rewriter` from `@aem-vite/vite-aem-plugin`.

## Usage

This step couldn't be more simple. Run either the `serve` or `build` command for Vite and everything will work like magic.

::: code-group

```sh [serve]
vite serve
```

```sh [build]
vite build
```

:::

By default, `@aem-vite/vite-aem-plugin` enforces strict port mode when using the Vite DevServer. This will automatically jump to the next available port if `3000` is unavailable.

### Content path examples

The following are example paths in AEM:

- `/content/<project_one>/en/au`
- `/content/<project_one>/en/us`
- `/content/<project_one>/en/es`
- `/content/<project_two>/en/us/support`

There are two ways that path matching is applied:

1. Partially using the root content node name
2. Partially using a path segment below the root node

To match only the **US** path in project one and everything in **Project Two** we can use the following list.

```ts
{
  contentPaths: [
    '<project_one>/en/us',
    '<project_two>',
  ],
}
```

> [!WARNING]
> Adding slashes to the start or end of these paths will cause the proxy matcher to fail and respond with 404 page served by Vite.

## React Support

Whenever the `@vitejs/plugin-react` plugin is detected, the AEM Vite plugin will automatically inject the React fast refresh script.
