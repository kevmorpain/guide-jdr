// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import './tailwind.postcss'
import Theme from 'vitepress/theme'
import CustomNotFound from './CustomNotFound.vue'
import CustomTitle from './CustomTitle.vue'
import './style.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(CustomTitle),
      'not-found': () => h(CustomNotFound),
    })
  }
}
