import { defineConfig } from 'vitepress'

const baseUrl = '/guide-jdr/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: baseUrl,
  title: "Guide JDR",
  description: "Guide JDR en markdown",
  lang: 'fr-FR',
  cleanUrls: true,
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/x-icon',  href: `${baseUrl}favicon.ico` }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    outline: [2,3],
    outlineTitle: 'Sur cette page'
  },

  markdown: {
    config: (md) => {
      md.use(require('markdown-it-wikilinks')())
    }
  }
})
