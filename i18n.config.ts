import en from './locales/en.json'
import ar from './locales/ar.json'

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'en',
    messages: {
      en,
      ar
    }
  }
})


// import { createResolver, defineNuxtModule } from '@nuxt/kit'

// export default defineNuxtModule({
//   async setup(options, nuxt) {
//     const { resolve } = createResolver(import.meta.url)
//     nuxt.hook('i18n:registerModule', register => {
//       register({
//         // langDir path needs to be resolved
//         langDir: resolve('./locales/'),
//         locales: [
//           {
//             code: 'en',
//             file: 'en.json',
//           },
//           {
//             code: 'ar',
//             file: 'ar.json',
//           },
//         ]
//       })
//     })
//   }
// })
