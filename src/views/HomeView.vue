<template>
  <div>
    <template
      v-for="blog in blogs"
      :key="blog.id"
    >
      <article
        class="mb-24 max-w-full text-left prose md-eloquent"
        v-html="blog.html"
      ></article>
    </template>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'
import '../utils/reflect'
import { useDStore } from '@/store'

const store = useDStore()

const blogs = computed(() => store.state.blogs)
</script>

<style lang="css"></style>
