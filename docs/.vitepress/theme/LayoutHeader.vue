<template>
  <h1>{{ frontmatter.title }}</h1>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
const { page, frontmatter } = useData()
</script>