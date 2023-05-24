---
title: Installation
---

# {{ $frontmatter.title }}

Installation is straightforward and easy. Please ensure your read the below carefully as some manual steps are needed to finish the installation.

## Vite Plugin

Installing the Vite plugin is as simple as using your favourite package manager.

```bash
npm install --save-dev @aem-vite/vite-aem-plugin
# or; yarn
yarn add -D @aem-vite/vite-aem-plugin
# or; pnpm
pnpm add -D @aem-vite/vite-aem-plugin
```

The next step is to [configure your project](../front-end/) to make full use of Vite.

## Maven Dependency

Add the `aem-vite.all` package as a Maven dependency in your apps `pom.xml` file.

```xml
<dependency>
  <groupId>dev.aemvite</groupId>
  <artifactId>aem-vite.all</artifactId>
  <version>3.0.0</version>
</dependency>
```

Next, add the following to your [FileVault](https://jackrabbit.apache.org/filevault/overview.html) configuration; remembering to change the `<target>` path to suit your project structure.

```xml
<embedded>
  <groupId>dev.aemvite</groupId>
  <artifactId>aem-vite.all</artifactId>
  <type>zip</type>
  <target>/apps/{project}-vendor-packages/application/install</target>
</embedded>
```

::: info
This will typically be added to your **all** maven module or **ui.apps** if you don't have an **all** module. Remember to replace `{project}` with your project folder name.
:::

### Dependencies

AEM Vite doesn't rely on any 3rd-party dependencies and only makes use of API's available in the AEM Uber JAR and Cloud SDK.
