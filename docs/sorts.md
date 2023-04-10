---
title: Liste des sorts
---
<select class="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="selectedClassOption">
  <option selected value="">Voir les sorts d'une classe</option>
  <option>Barde</option>
  <option>Clerc</option>
  <option>Druide</option>
  <option>Ensorceleur</option>
  <option>Magicien</option>
  <option>Occultiste</option>
  <option>Paladin</option>
  <option>Rôdeur</option>
</select>

<table>
  <thead>
    <tr>
      <th class="cursor-pointer" @click="handleSortBy(ESortOption.Title)">
        Nom
        <span class="text-xs" :class="{ 'invisible': selectedSortOption !== ESortOption.Title }">
          <template v-if="isSortAsc">▼</template>
          <template v-else>▲</template>
        </span>
      </th>
      <th class="cursor-pointer" @click="handleSortBy(ESortOption.School)">
        École
        <span class="text-xs" :class="{ 'invisible': selectedSortOption !== ESortOption.School }">
          <template v-if="isSortAsc">▼</template>
          <template v-else>▲</template>
        </span>
      </th>
      <th class="cursor-pointer" @click="handleSortBy(ESortOption.Level)">
        Niveau
        <span class="text-xs" :class="{ 'invisible': selectedSortOption !== ESortOption.Level }">
          <template v-if="isSortAsc">▼</template>
          <template v-else>▲</template>
        </span>
      </th>
      <th class="cursor-pointer" @click="handleSortBy(ESortOption.Ritual)">
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
      <td class="text-center">{{ spell.frontmatter.level }}</td>
      <td class="text-center">
        <template v-if="spell.frontmatter.ritual">Oui</template>
      </td>
    </tr>
  </tbody>
</table>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { data } from './sorts.data.ts'

enum ESortOption {
  Title = 'title',
  School = 'school',
  Level = 'level',
  Ritual = 'ritual',
}

const selectedSortOption = ref<ESortOption>(ESortOption.Title)
const selectedClassOption = ref<string>('')
const isSortAsc = ref<boolean>(true)

const handleSortBy = (key: ESortOption): void => {
  isSortAsc.value = selectedSortOption.value === key ? !isSortAsc.value : true
  selectedSortOption.value = key
  
  sortBy()
}

const sortBy = (): void => {
  const key = selectedSortOption.value

  spells.value.sort((spellA, spellB) => {
    let comparison = 0
    const firstItem = isSortAsc.value ? spellA.frontmatter[key] : spellB.frontmatter[key]
    const secondItem = isSortAsc.value ? spellB.frontmatter[key] : spellA.frontmatter[key]

    switch (key) {
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

sortBy()

const filterSpells = (classOption: string): void => {
  if (classOption) {
    spells.value = data.filter((spell) => spell.frontmatter.linked_classes?.includes(classOption))
  } else {
    spells.value = data
  }

  sortBy()
}

watch(selectedClassOption, (value) => {
  filterSpells(value)
})
</script>
