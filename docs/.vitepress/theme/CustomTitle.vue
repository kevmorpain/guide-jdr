<template>
  <div class="vp-doc">
    <h1>{{ frontmatter.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>
