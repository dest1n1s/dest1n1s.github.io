<template>
  <div>
    <div
      class="sticky top-0 z-40 flex-none w-full bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75 dark:border-slate-50/[0.06] backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10"
    >
      <div class="mx-auto max-w-7xl">
        <div
          class="py-4 mx-4 border-b border-slate-900/10 dark:border-slate-300/10 lg:px-8 lg:mx-0 lg:border-0"
        >
          <div class="flex relative items-center">
            <h1 class="text-2xl font-semibold font-mono">Dest1n1s.COM</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="pb-[20vh] mx-auto max-w-7xl">
      <div
        class="hidden overflow-y-auto fixed inset-0 top-[3.8125rem] right-auto left-[max(0px,calc(50%-40rem))] z-20 px-8 pb-10 w-[16rem] lg:block"
      >
        <nav
          id="nav"
          class="relative lg:text-sm lg:leading-6"
        >
          <div class="mt-4 text-lg font-normal leading-9 text-left font-mono">
            <ul>
              <li class="mt-12 font-serif lg:mt-8">
                <span class="font-bold">日志</span>
                <ul class="space-y-6 border-l border-slate-100 dark:border-slate-800 lg:space-y-2">
                  <li
                    v-for="blog in blogs"
                    :key="blog.id"
                    class="block pl-4 -ml-px font-roboto text-sm text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 border-l border-transparent hover:border-slate-400 dark:hover:border-slate-500"
                  >
                    {{ blog.timeCreated }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="lg:pt-4 lg:pl-[16rem]">
        <home-view></home-view>
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import HomeView from '@/views/HomeView.vue'
import { computed, onMounted } from 'vue'
import request from '@/utils/request'
import { arrayFactory } from '@/utils/reflect'
import { Blog } from '@/types/entities'
import { useDStore } from '@/store'

const store = useDStore()

onMounted(async () => {
  const response = await request.get('/articles')
  const articles = arrayFactory(Blog, response.data)
  store.commit('addBlogs', { blogs: articles })
})

const blogs = computed(() =>
  store.state.blogs.map((v) => ({ ...v, timeCreated: v.timeCreated.toLocaleDateString() }))
)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
