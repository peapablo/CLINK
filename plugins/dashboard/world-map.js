// We initialize map components here since they don't have SSR support.
// We will render them on the client only by making this plugin ssr:false
import WorldMap from '@/components/argon-core/WorldMap/WorldMap.vue';

export default defineNuxtPlugin({
  ssr: false, // ทำให้ทำงานเฉพาะในฝั่ง client
  setup(nuxtApp) {
    // ลงทะเบียน component 'world-map' ใน Nuxt 3
    nuxtApp.vueApp.component('world-map', WorldMap);
  }
});
