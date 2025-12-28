// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');
const lightCodeTheme = require('@docusaurus/theme-classic').themes.prism.light;
const darkCodeTheme = require('@docusaurus/theme-classic').themes.prism.dark;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Kubernetes for Absolute Beginners: Developing Cloud Applications',
  tagline: 'A fast, free, AI-native textbook for cloud-native beginners',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://safdaralishah.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/k8s-beginners-book/',

  // GitHub pages deployment config.
  organizationName: 'safdaralishah', // Usually your GitHub org/user name.
  projectName: 'k8s-beginners-book', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/safdaralishah/k8s-beginners-book/tree/main/',
        },
        blog: {
          path: 'blog',
          routeBasePath: 'blog', // URL Route.
          include: ['**/*.{md,mdx}'], // Extensions to include.
          exclude: [], // Files to exclude.
          postsPerPage: 5, // How many posts per page.
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/safdaralishah/k8s-beginners-book/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'K8s for Beginners',
        logo: {
          alt: 'Kubernetes Logo',
          src: '/img/kubernetes-logo.svg',
          href: 'https://kubernetes.io',
          target: '_self',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Textbook',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/contact', label: 'Contact', position: 'left' },
          {
            href: 'https://github.com/safdaralishah/k8s-beginners-book',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: '',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  themes: [
    // Add Mermaid support
    [
      '@docusaurus/theme-mermaid',
      {
        options: {
          maxZoom: 1.5,
          theme: { light: 'default', dark: 'dark' },
        },
      },
    ],
  ],
  plugins: [
    // Add client redirects plugin if needed
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/intro',
            from: '/docs',
          },
        ],
      },
    ],
  ],
};

module.exports = config;