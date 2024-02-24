---
title: Structure
---

# {{ $frontmatter.title }}

Considerations about varying project structures have been taken into account as much as possible. Examples can only provide so much detail and as such the below is what is considered a best-case structure for AEM Vite.

## ClientLibs

The best-case structure recommended for ClientLibs when using AEM Vite is as below.

```
/apps/<project>/clientlibs/clientlib-site
/apps/<project>/clientlibs/clientlib-site/resources
/apps/<project>/clientlibs/clientlib-site/css.txt
/apps/<project>/clientlibs/clientlib-site/js.txt
```

### Working with the AEM Archetype

When creating a new project using the [AEM Archetype](https://github.com/adobe/aem-project-archetype) it will provide a `clientlib-site` folder already. You should only need to update `ui.frontend` to align with AEM Vite and not need to make any changes in `ui.apps`.

## Template policy(s)

Your template policy(s) will also need to be updated to support this structure. The below is an example of how to achieve this.

```xml
<page jcr:primaryType="nt:unstructured">
  <policy
    jcr:primaryType="nt:unstructured"
    sling:resourceType="wcm/core/components/policy/policy"
    clientlibs="[]"
    clientlibsJsHead="[clientlib-site]"/>
</page>
```

## Next Steps

- [Configure your project](../vite/) with Vite
