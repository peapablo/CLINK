import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      VUE_APP_AUTH_CLIENT_ID: process.env.VUE_APP_AUTH_CLIENT_ID,
      VUE_APP_AUTH_CLIENT_SECRET: process.env.VUE_APP_AUTH_CLIENT_SECRET,
      VUE_APP_STAT_APP_URL: process.env.VUE_APP_STAT_APP_URL,
    },
  },

  app: {
    head: {
      title: "C-LINK BY CLINAG",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "CLINAG" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "favicon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
        },
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
          integrity:
            "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  css: [
    "assets/css/nucleo/css/nucleo.css",
    "assets/css/font-awesome/css/font-awesome.css",
    "assets/sass/argon.scss",
    "assets/css/style.css",
  ],

  plugins: [
    "~/plugins/dashboard/dashboard-plugin",
    { src: "~/plugins/axios.client.ts", mode: "client" },
    { src: "~/plugins/dashboard/full-calendar.client.ts", mode: "client" },
    { src: "~/plugins/dashboard/world-map.client.ts", mode: "client" },
    { src: "~/plugins/vue-sweetalert2.client.ts", mode: "client" }, // เพิ่ม plugin สำหรับ vue-sweetalert2
  ],

  modules: [
    "@vite-pwa/nuxt", 
    "vue-sweetalert2/nuxt",  // เพิ่ม module สำหรับ sweetalert2
  ],

  pwa: {
    manifest: {
      name: "My Nuxt App",
      short_name: "NuxtApp",
      description: "My awesome Nuxt 3 app",
      theme_color: "#ffffff",
    },
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: "/index.html",
    }
  },

  build: {
    transpile: ["vee-validate/dist/rules"],
  }
});
