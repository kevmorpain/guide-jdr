---
title: Liste des sorts
---
<ul>
  <li v-for="spell of spells">
    <a :href="`.${spell.url}`">{{ spell.frontmatter.title }}</a>
    ({{ spell.frontmatter.school }} niveau {{ spell.frontmatter.level }})
    <template v-if="spell.frontmatter.ritual"> rituel</template>
  </li>
</ul>

<script setup>
import { data } from './sorts.data.ts'

const spells = data.sort((spellA, spellB) => spellA.frontmatter.level - spellB.frontmatter.level)
</script>
