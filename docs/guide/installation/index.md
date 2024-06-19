---
title: Installation
---

# {{ $frontmatter.title }}

Installation is straightforward and easy. Please ensure you read the below carefully as some manual steps are needed to finish the installation.

## Vite Plugin

Installing the Vite plugin is as simple as using your favourite package manager. Navigate to your `ui.frontend` folder and run any of the following:

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

## Maven Dependency

Add the `aem-vite.all` package as a Maven dependency in your `pom.xml` file.

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

> [!TIP]
> These entries will typically be added to your **all** Maven module; or **ui.apps** if you don't have an **all** module. Remember to replace `{project}` with your project name.

### Dependencies

AEM Vite doesn't rely on any 3rd-party dependencies and only makes use of APIs available in the AEM Uber JAR and Cloud SDK.

## Next Steps

- [Configure AEM](../backend/clientlibs/) to enable the AEM Vite via ClientLibs.
- [Configure your front end](../front-end/) to make full use of Vite.
