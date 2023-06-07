---
title: Custom Namespaces
---

# {{ $frontmatter.title }}

Due to how an underpinning framework within AEM handles underscores in file paths, some Vite plugins that follow [Virtual Modules Convention](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention) cause namespace errors during package installs.

## Adding a custom namespace

Creating custom namespaces is not difficult and can be done so by creating a `nodetypes.cnd` file within your `ui.apps/src/main/content/META-INF/vault` folder. See the below example where `plugin-vue2` has been added as a custom namespace in addition to the standard namespaces and `sling:Folder` node type.

```plain{4}
<'cq'  = 'http://www.day.com/jcr/cq/1.0'>
<'sling' = 'http://sling.apache.org/jcr/sling/1.0'>
<'nt' = 'http://www.jcp.org/jcr/nt/1.0'>
<'plugin-vue2' = 'https://v2.vuejs.org'>

[sling:Folder] > nt:folder
  - * (undefined)
  - * (undefined) multiple
  + * (nt:base) = sling:Folder version
```

There are no strict rules applied to namespaces or the URI that you can apply to them. For instance, let's assume that your project needs to support both the Vue 2 & 3 Vite plugins, the following would suffice:

```plain{4,5}
<'cq'  = 'http://www.day.com/jcr/cq/1.0'>
<'sling' = 'http://sling.apache.org/jcr/sling/1.0'>
<'nt' = 'http://www.jcp.org/jcr/nt/1.0'>
<'plugin-vue' = 'https://vuejs.org'>
<'plugin-vue2' = 'https://v2.vuejs.org'>

[sling:Folder] > nt:folder
  - * (undefined)
  - * (undefined) multiple
  + * (nt:base) = sling:Folder version
```

::: info Please Note
This assumes you are using the Adobe AEM Archetype which `ui.frontend` builds into `ui.apps`. If your `ui.frontend` project builds and installs itself, this should live within `ui.frontend`.
:::

## Validating namespaces

If after configuring your project you're able to install the package without issue then no additional validation is required. If, however, you would like to confirm they were created correctly you can visit [CRX Explorer](http://localhost:4502/crx/explorer/browser/index.jsp) and navigate to `/jcr:system/rep:namespaces`.
