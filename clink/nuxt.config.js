import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true, // เปิดใช้งาน SSR

  target: "static", // คล้ายกับ Nuxt 2

  devServer: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // ใช้ได้เหมือน Nuxt 2
  },

  router: {
    options: {
      base: "/",
    },
    linkExactActiveClass: "active",
  },

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

  loading: {
    color: "#fff",
  },

  css: [
    "@/assets/css/nucleo/css/nucleo.css",
    "@/assets/css/font-awesome/css/font-awesome.css",
    "@/assets/sass/argon.scss",
    "@/assets/css/style.css",
  ],

  plugins: [
    { src: "@/plugins/dashboard/dashboard-plugin", mode: "client" },
    { src: "@/plugins/axios", mode: "client" },
    { src: "@/plugins/dashboard/full-calendar", mode: "client" },
    { src: "@/plugins/dashboard/world-map", mode: "client" },
  ],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "vue-sweetalert2/nuxt",
  ],

  axios: {
    baseURL: process.env.API_BASE_URL || "https://api.example.com",
  },

  build: {
    transpile: ["vee-validate/dist/rules"],
    extractCSS: process.env.NODE_ENV === "production",
  },

  vite: {
    build: {
      cssCodeSplit: true,
    },
  },

  nitro: {
    preset: "node-server",
  },
});
