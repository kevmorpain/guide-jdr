import { defineConfig } from 'vitepress'
import sanitize from 'sanitize-filename'

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
    nav: [
      { text: 'Races', link: '/creation-de-personnage/races/' },
      { text: 'Classes', link: '/creation-de-personnage/classes/' },
      { text: 'Sorts', link: '/sorts/' },
    ],

    sidebar: {
      '/creation-de-personnage/': [
        {
          text: 'Races',
          link: '/creation-de-personnage/races/',
          collapsed: false,
          items: [
            { text: 'Demi-Elfe', link: '/creation-de-personnage/races/Demi-Elfe' },
            { text: 'Elfe', link: '/creation-de-personnage/races/Elfe' },
            { text: 'Halfelin', link: '/creation-de-personnage/races/Halfelin' },
            { text: 'Humain', link: '/creation-de-personnage/races/Humain' },
            { text: 'Nain', link: '/creation-de-personnage/races/Nain' },
            { text: 'Tieffelin', link: '/creation-de-personnage/races/Tieffelin' },
          ]
        },
        {
          text: 'Classes',
          link: '/creation-de-personnage/classes/',
          collapsed: false,
          items: [
            { text: 'Barde', link: '/creation-de-personnage/classes/Barde' },
            { text: 'Clerc', link: '/creation-de-personnage/classes/Clerc' },
            { text: 'Guerrier', link: '/creation-de-personnage/classes/Guerrier' },
            { text: 'Magicien', link: '/creation-de-personnage/classes/Magicien' },
            { text: 'Paladin', link: '/creation-de-personnage/classes/Paladin' },
            { text: 'Roublard', link: '/creation-de-personnage/classes/Roublard' },
          ]
        },
        {
          text: 'Historiques',
          link: '/creation-de-personnage/historiques/',
          collapsed: false,
          items: [
            { text: 'Acolyte', link: '/creation-de-personnage/historiques/Acolyte' },
            { text: 'Artiste', link: '/creation-de-personnage/historiques/Artiste' },
            { text: 'Criminel', link: '/creation-de-personnage/historiques/Criminel' },
            { text: 'Noble', link: '/creation-de-personnage/historiques/Noble' },
            { text: 'Sage', link: '/creation-de-personnage/historiques/Sage' },
            { text: 'Soldat', link: '/creation-de-personnage/historiques/Soldat' },
          ]
        }
      ],
    },
    outline: [2,3],
    outlineTitle: 'Sur cette page'
  },

  markdown: {
    config: (md) => {
      md
        .use(require('markdown-it-multimd-table'), {
          rowspan: true,
        })
        .use(require('markdown-it-wikilinks')({
          baseUrl,
          postProcessPageName: customPostProcessPageName,
        }))
    }
  }
})

function customPostProcessPageName(pageName: string): string {
  pageName = pageName.trim()
  pageName = pageName.split('/').map(s => sanitize(s)).join('/')
  pageName = pageName.replaceAll(/\s+/g, '-')

  return pageName
}