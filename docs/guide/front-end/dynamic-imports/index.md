---
title: Dynamic Imports
---

# {{ $frontmatter.title }}

Vite uses rollup under the hood which supports dynamic imports just like webpack and other bundlers but it has a small _flaw_. Well, not so much a flaw but rather a consideration that was never put to thought simply because of how AEM ClientLibs work.

The import rewriter takes the ES module import paths and converts them into AEM friendly paths automatically.

## Vite Plugin

AEM Vite provides a plugin that will rewrite dynamic import paths to your `/etc.clientlibs` proxy path.

::: code-group

```sh [npm]
npm install -D @aem-vite/import-rewriter
```

```sh [pnpm]
pnpm add -D @aem-vite/import-rewriter
```

```sh [yarn]
yarn add -D @aem-vite/import-rewriter
```

```sh [bun]
bun add -D @aem-vite/import-rewriter
```

:::

> [!TIP]
> This plugin is already included by default in `@aem-vite/vite-aem-plugin`. Refer to the below for further configuration options.

## Configuration

Getting this plugin configured is really simple, all it requires is your ClientLib public path.

<!-- prettier-ignore-start -->
```ts
import { bundlesImportRewriter } from '@aem-vite/import-rewriter'; // [!code focus]

export default defineConfig(() => ({
  plugins: [
    bundlesImportRewriter({ // [!code focus]
      publicPath: '/etc.clientlibs/<project>/clientlibs/clientlib-site', // [!code focus]
      resourcesPath: 'resources/js', // [!code focus]
    }), // [!code focus]
  ],
}));
```
<!-- prettier-ignore-end -->

### Plugin options

| Property Name                                                                             | Type     | Required |
| :---------------------------------------------------------------------------------------- | -------- | -------- |
| **caching**<br><small>Instruct import rewriter how to handle AEM caching.</small>         | `object` | No       |
| **publicPath**<br><small>The AEM proxy path to your ClientLib directory.</small>          | `string` | Yes      |
| **resourcesPath**<br><small>The folder where Vite generated JavaScript resources.</small> | `string` | Yes      |
| **minify**<br><small>Should `.min` be added to the import path?</small>                   | `boolean`| No      |

#### Caching options

| Property Name                                                                   | Type      | Required | Default    |
| :------------------------------------------------------------------------------ | --------- | -------- | ---------- |
| **enabled**<br><small>Should caching support be utilised during builds?</small> | `boolean` | Yes      | -          |
| **keyFormat**<br><small>Long term cache key format.</small>                     | `string`  | No       | `cloud`    |

**KeyFormat** should be one of `cloud` | `acs-modern` | `acs-classic`,

## How This Works?

Under the hood `es-module-lexer` is used to parse the rollup chunk source and identifies all of the `import` statements. Once identified, they are parsed and all instances that use path patterns such as `./` or `../` will get replaced with `publicPath` configured in your plugin configuration.

By rewriting the imports we solve another issue and that is we prevent Vite adding duplicate imports via its dynamic import polyfill transformer.

### Circular imports

In addition to handling import paths, the main entry path is also rewritten to the correct AEM ClientLib path to ensure ES module imports behave correctly in AEM.

## Caching and Minification

So your code doesn't use the wrong path when in a testing, staging or production environment, it is good practice to dynamically switch on minification for AEM Vite using an environment variable via your Maven `pom.xml` file.

The below showcases this using Adobe Cloud Manager as an example by looking for a `CM_BUILD` environment variable and setting a Maven property called `aem.caching`. This Maven property can then be passed onto `frontend-maven-plugin` which can subsequently be passed onto your Vite configuration.

::: info A note about the &lt;arguments> property
This property assumes you already have an npm script called `build` in your `package.json` file.
:::

```xml
<properties>
  <aem.caching>false</aem.caching>
</properties>

<build>
  <plugins>
    <plugin>
      <groupId>com.github.eirslett</groupId>
      <artifactId>frontend-maven-plugin</artifactId>

      <executions>
        <execution>
          <id>build-fed</id>
          <phase>initialize</phase>
          <goals>
            <goal>yarn</goal>
          </goals>
          <configuration>
            <arguments>build --config ./path/to/vite.config.js</arguments>
            <environmentVariables>
              <AEM_CACHING>${aem.caching}</AEM_CACHING>
            </environmentVariables>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>

<profiles>
  <profile>
    <id>cmBuild</id>
    <activation>
      <property>
        <name>env.CM_BUILD</name>
      </property>
    </activation>
    <properties>
      <aem.caching>true</aem.caching>
    </properties>
  </profile>
</profiles>
```

### Setting the Vite configuration

From there, you can update your Vite configuration to look for `AEM_CACHING` and then enable caching and minification. An assumption is made that caching and minification are both enabled, if you need separation, add another Maven profile to set another property/environment variable.

<!-- prettier-ignore-start -->
```ts
import { bundlesImportRewriter } from '@aem-vite/import-rewriter';

const needsCaching = process.env.AEM_CACHING === 'true'; // [!code focus]

export default defineConfig(({ command, mode }) => ({
  plugins: [
    // ... all other plugins before, 'bundlesImportRewriter' must be last
    bundlesImportRewriter({
      publicPath: '/etc.clientlibs/<project>/clientlibs/clientlib-site',
      resourcesPath: 'resources/js',

      minify: needsCaching, // [!code focus]
      caching: { // [!code focus]
        enabled: command === 'build' && mode === 'production' && needsCaching, // [!code focus]
      }, // [!code focus]
    }),
  ],
}));
```
<!-- prettier-ignore-end -->
