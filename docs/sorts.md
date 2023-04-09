---
title: Liste des sorts
---

<table>
  <thead>
    <tr>
      <th class="cursor-pointer" @click="sortBy(ESortOption.Title)">
        Nom
        <span class="text-xs" :class="{ 'invisible': selectedSortOption !== ESortOption.Title }">
          <template v-if="isSortAsc">▼</template>
          <template v-else>▲</template>
        </span>
      </th>
      <th class="cursor-pointer" @click="sortBy(ESortOption.School)">
        École
        <span class="text-xs" :class="{ 'invisible': selectedSortOption !== ESortOption.School }">
          <template v-if="isSortAsc">▼</template>
          <template v-else>▲</template>
        </span>
      </th>
      <th class="cursor-pointer" @click="sortBy(ESortOption.Level)">
        Niveau
        <span class="text-xs" :class="{ 'invisible': selectedSortOption !== ESortOption.Level }">
          <template v-if="isSortAsc">▼</template>
          <template v-else>▲</template>
        </span>
      </th>
      <th class="cursor-pointer" @click="sortBy(ESortOption.Ritual)">
        Rituel ?
        <span class="text-xs" :class="{ 'invisible': selectedSortOption !== ESortOption.Ritual }">
          <template v-if="isSortAsc">▼</template>
          <template v-else>▲</template>
        </span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="spell of spells">
      <td><a :href="`.${spell.url}`">{{ spell.frontmatter.title }}</a></td>
      <td class="capitalize">{{ spell.frontmatter.school }}</td>
      <td>Niveau {{ spell.frontmatter.level }}</td>
      <td><template v-if="spell.frontmatter.ritual">Oui</template></td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
import { ref } from 'vue'
import { data } from './sorts.data.ts'

enum ESortOption {
  Title = 'title',
  School = 'school',
  Level = 'level',
  Ritual = 'ritual',
}

const selectedSortOption = ref<ESortOption | null>(null)
const isSortAsc = ref<boolean>(true)

const sortBy = (key: ESortOption): void => {
  isSortAsc.value = selectedSortOption.value === key ? !isSortAsc.value : true

  selectedSortOption.value = key

  spells.value.sort((spellA, spellB) => {
    let comparison = 0
    const firstItem = isSortAsc.value ? spellA.frontmatter[key] : spellB.frontmatter[key]
    const secondItem = isSortAsc.value ? spellB.frontmatter[key] : spellA.frontmatter[key]

    switch(key) {
      case ESortOption.Title:
      case ESortOption.School:
        comparison = firstItem.localeCompare(secondItem)
        break
      case ESortOption.Level:
        comparison = firstItem - secondItem
        break;
      case ESortOption.Ritual:
        comparison = Number(secondItem) - Number(firstItem)
        break
    }

    return comparison
  })
}

const spells = ref<[]>(data)

sortBy(ESortOption.Title)
</script>
