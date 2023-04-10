import { defineConfig } from 'vitepress'
import sanitize from 'sanitize-filename'
import { scanDir } from './config/utils'

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
      { text: 'Historiques', link: '/creation-de-personnage/historiques/' },
      { text: 'Sorts', link: '/sorts' },
      { text: 'Équipement', link: '/guide/équipement/' },
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
          items: scanDir('creation-de-personnage/classes'),
        },
        {
          text: 'Historiques',
          link: '/creation-de-personnage/historiques/',
          collapsed: false,
          items: [
            { text: 'Acolyte', link: '/creation-de-personnage/historiques/Acolyte' },
            { text: 'Artisan de guilde', link: '/creation-de-personnage/historiques/Artisan-de-guilde' },
            { text: 'Artiste', link: '/creation-de-personnage/historiques/Artiste' },
            { text: 'Charlatan', link: '/creation-de-personnage/historiques/Charlatan' },
            { text: 'Chevalier', link: '/creation-de-personnage/historiques/Noble#variante-chevalier' },
            { text: 'Criminel', link: '/creation-de-personnage/historiques/Criminel' },
            { text: 'Ermite', link: '/creation-de-personnage/historiques/Ermite' },
            { text: 'Gladiateur', link: '/creation-de-personnage/historiques/Artiste#variante-gladiateur' },
            { text: 'Gosse des rues', link: '/creation-de-personnage/historiques/Gosse-des-rues' },
            { text: 'Héros du peuple', link: '/creation-de-personnage/historiques/Héros-du-peuple' },
            { text: 'Marchant de guilde', link: '/creation-de-personnage/historiques/Artisan-de-guilde#variante-marchand-de-guilde' },
            { text: 'Marin', link: '/creation-de-personnage/historiques/Marin' },
            { text: 'Noble', link: '/creation-de-personnage/historiques/Noble' },
            { text: 'Pirate', link: '/creation-de-personnage/historiques/Marin#variante-pirate' },
            { text: 'Sage', link: '/creation-de-personnage/historiques/Sage' },
            { text: 'Sauvageon', link: '/creation-de-personnage/historiques/Sauvageon' },
            { text: 'Soldat', link: '/creation-de-personnage/historiques/Soldat' },
          ]
        }
      ],
	    '/sorts/': scanDir('sorts'),
	    '/guide/équipement': [
        {
          text: 'Équipement',
          link: '/guide/équipement/',
          collapsed: false,
          items: scanDir('guide/équipement'),
        }
      ],
    },
    outline: [2, 4],
    outlineTitle: 'Sur cette page'
  },

  markdown: {
    config: (md) => {
      md
        .use(require('markdown-it-multimd-table'), {
          rowspan: true,
        })
        .use(require('markdown-it-wikilinks')({
          baseURL: baseUrl,
          postProcessPageName: customPostProcessPageName,
        }))
    }
  },
})

function customPostProcessPageName(pageName: string): string {
  pageName = pageName.trim()
  pageName = pageName.split('/').map(s => sanitize(s)).join('/')
  pageName = pageName.replaceAll(/\s/g, '-').replaceAll(/'/g, '')

  return pageName
}