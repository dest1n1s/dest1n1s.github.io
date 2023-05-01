import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Blog } from '@/types/entities'
import { InjectionKey } from 'vue'

type DState = {
  blogs: Blog[]
}

export const store = createStore<DState>({
  state: {
    blogs: []
  } as DState,
  mutations: {
    addBlogs(state, payload: { blogs: Blog[] }) {
      state.blogs.push(...payload.blogs)
    }
  }
})

export const key: InjectionKey<Store<DState>> = Symbol()

export const useDStore = () => {
  return baseUseStore(key)
}
