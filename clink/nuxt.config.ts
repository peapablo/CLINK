/*!

=========================================================
* Nuxt Argon Dashboard PRO - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nuxt-argon-dashboard-pro
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com and www.binarcode.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

const pkg = require("./package");
console.log("ENV", process.env.NODE_ENV);

module.exports = {
  target: "static",
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost, // 192.168.41.190
    timing: false,
  },
  router: {
    base: "/",
    linkExactActiveClass: "active",
  },
  env: {
    VUE_APP_AUTH_CLIENT_ID: process.env.VUE_APP_AUTH_CLIENT_ID,
    VUE_APP_AUTH_CLIENT_SECRET: process.env.VUE_APP_AUTH_CLIENT_SECRET,
    VUE_APP_STAT_APP_URL: process.env.VUE_APP_STAT_APP_URL,
  },
  /*
   ** Headers of the page
   */
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

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [
    "assets/css/nucleo/css/nucleo.css",
    "assets/css/font-awesome/css/font-awesome.css",
    "assets/sass/argon.scss",
    "assets/css/style.css",
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/dashboard/dashboard-plugin",
    { src: "~/plugins/axios", ssr: false },
    { src: "~/plugins/dashboard/full-calendar", ssr: false },
    { src: "~/plugins/dashboard/world-map", ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "vue-sweetalert2/nuxt",
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ["vee-validate/dist/rules"],
    /*
     ** You can extend webpack config here
     */
    extend(config: any, ctx: any) {},
    extractCSS: process.env.NODE_ENV === "production",
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
  },
};