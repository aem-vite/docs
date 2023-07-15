import { createWriteStream, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SitemapStream } from 'sitemap';
import { defineConfigWithTheme, DefaultTheme } from 'vitepress';

interface Link {
  lastmod?: number;
  url: string;
}

const title = 'AEM Vite';
const description =
  'AEM Vite brings the amazing Vite ecosystem to AEM in a transparent and friendly way.';

function getGuideSidebar() {
  return [
    {
      text: 'Guide',
      items: [
        {
          text: 'Overview',
          link: '/guide/',
        },
      ],
    },
    {
      text: 'Getting Started',
      items: [
        {
          text: 'Installation',
          link: '/guide/installation/',
        },
      ],
    },
    {
      text: 'Backend (AEM)',
      items: [
        {
          text: 'ClientLibs',
          link: '/guide/backend/clientlibs/',
        },
        {
          text: 'Permissions',
          link: '/guide/backend/permissions/',
        },
        {
          text: 'Custom Namespaces',
          link: '/guide/backend/custom-namespaces/',
        },
      ],
    },
    {
      text: 'Front End',
      items: [
        { text: 'Preparing your project', link: '/guide/front-end/' },
        { text: 'Structure', link: '/guide/front-end/structure/' },
        { text: 'Vite configuration', link: '/guide/front-end/vite/' },
        { text: 'Vite plugin', link: '/guide/front-end/vite-plugin/' },
        { text: 'Module imports', link: '/guide/front-end/module-imports/' },
        { text: 'Dynamic imports', link: '/guide/front-end/dynamic-imports/' },
        { text: 'Static assets', link: '/guide/front-end/static-assets/' },
      ],
    },
    // {
    //   text: 'Extending AEM Vite',
    //   items: [
    //     { text: 'Why extend AEM Vite?', link: '/guide/extending/why/' },
    //     { text: 'Super-powered ClientLibs', link: '/guide/extending/clientlibs/' },
    //   ],
    // },
    {
      text: 'Support',
      items: [
        {
          text: 'FAQs',
          link: '/guide/faqs/',
        },
        {
          text: 'Migrate to v2.x',
          link: '/guide/migrate-to-v2/',
        },
      ],
    },
  ];
}

const links: Link[] = [];

export default defineConfigWithTheme<DefaultTheme.Config>({
  base: '/',
  title,
  titleTemplate: 'AEM Vite',
  description,
  lastUpdated: true,

  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      links.push({
        lastmod: pageData.lastUpdated,
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
      });
    }
  },

  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'https://www.aemvite.dev/' });
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'));

    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();

    await new Promise((r) => writeStream.on('finish', r));
  },

  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/static/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/static/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/static/favicon-16x16.png',
      },
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/static/site.webmanifest',
      },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/static/safari-pinned-tab.svg',
        color: '#c34c5c',
      },
    ],
    [
      'link',
      {
        rel: 'shortcut icon',
        href: '/static/favicon.ico',
      },
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-title',
        content: 'AEM Vite',
      },
    ],
    [
      'meta',
      {
        name: 'application-name',
        content: 'AEM Vite',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileColor',
        content: '#c34c5c',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: title,
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: '/static/social/og-primary.jpg',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:title',
        content: title,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:site',
        content: '@cshawaus',
      },
    ],
    [
      'script',
      {},
      readFileSync(resolve(__dirname, './inlined-scripts/fathom.js'), 'utf-8'),
    ],
    [
      'script',
      {
        type: 'module',
      },
      readFileSync(resolve(__dirname, './inlined-scripts/sentry.js'), 'utf-8'),
    ],
  ],

  themeConfig: {
    logo: 'static/logo.png',

    algolia: {
      appId: '5NUB4KA4TT',
      apiKey: 'c591e327c4f90a50c6bbb922bb0a1830',
      indexName: 'aemvite',
    },

    editLink: {
      pattern: 'https://github.com/aem-vite/docs/edit/main/docs/:path',
    },

    nav: [
      {
        text: 'Installation',
        link: '/guide/backend/installation/',
      },
      {
        text: 'Front End',
        link: '/guide/front-end/',
      },
      {
        text: 'FAQs',
        link: '/guide/faqs/',
      },
      {
        text: 'Changelogs',
        items: [
          {
            text: 'Vite for AEM',
            link: 'https://github.com/aem-vite/aem-vite/blob/main/CHANGELOG.md',
          },
          {
            text: 'Vite AEM Plugin',
            link: 'https://github.com/aem-vite/vite-aem-plugin/blob/main/CHANGELOG.md',
          },
          {
            text: 'Vite Import Rewriter',
            link: 'https://github.com/aem-vite/import-rewriter/blob/main/CHANGELOG.md',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aem-vite' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/groups/14049527/' },
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/': getGuideSidebar(),
    },

    footer: {
      copyright: `Copyright © 2021-${new Date().getFullYear()} Chris Shaw`,
      message:
        'Apache 2.0 Licensed. Vite wording and logos are property of Evan You. Adobe and AEM wording and logos are property of Adobe Inc.',
    },
  },
});
