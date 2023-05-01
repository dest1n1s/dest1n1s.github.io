import katex from 'katex'
import { marked } from 'marked'

const macros = {}

export const convertKatex = (str: string) => {
  return str
    .replace(/\$\$([^$]+)\$\$/g, (ignore, k) => {
      return katex.renderToString(k, {
        displayMode: true,
        macros
      })
    })
    .replace(/\$([^$]+)\$/g, (ignore, k) => {
      return katex.renderToString(k, {
        displayMode: false,
        macros
      })
    })
}

export const mark = (str: string) => {
  return marked(convertKatex(str))
}
