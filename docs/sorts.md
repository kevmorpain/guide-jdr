---
title: Liste des sorts
---
<ul class="border-2 border-blue-700">
  <li v-for="spell of spells" clas="flex gap-x-8">
    <a :href="spell.url">{{ spell.frontmatter.title }}</a>
    ({{ spell.frontmatter.school }} niveau {{ spell.frontmatter.level }})
    <template v-if="spell.frontmatter.ritual"> rituel</template>
  </li>
</ul>

<script setup>
import { data } from './sorts.data.ts'

const spells = data.sort((spellA, spellB) => spellA.frontmatter.level - spellB.frontmatter.level)
</script>
