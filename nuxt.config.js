const parseArgs = require("minimist");
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
});

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000";
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost";
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
    apiUrl: process.env.API_URL || `http://${host}:3009`
  },
  head: {
    title: "XCO APP",
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "Content-Language", content: "en" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Front-end of the XCO Project"
      },
      { author: "XCO APP" },
      { name: "robots", content: "noindex, nofollow" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  /*
   * Customize the progress-bar color
   */
  loading: { color: "#3B8070" },
  /*
   * Add element-ui in our app, see plugins/element-ui.js file
   */
  plugins: ["@/plugins/element-ui"],
  /*
   * Build configuration
   */
  css: [
    "element-ui/lib/theme-chalk/reset.css",
    "element-ui/lib/theme-chalk/index.css",
    "~/assets/css/main.css"
  ],
  // build: {
  //   /*
  //    * Run ESLint on save
  //    */
  //   extend(config, { isDev, isClient }) {
  //     if (isDev && isClient) {
  //       config.module.rules.push({
  //         enforce: 'pre',
  //         test: /\.(js|vue)$/,
  //         loader: 'eslint-loader',
  //         exclude: /(node_modules)/
  //       })
  //     }
  //   }
  // }
  build: {},
  modules: ["@nuxtjs/axios", "~/modules/typescript.js"],
  axios: {},
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        // {
        //   name: "index",
        //   path: "/",
        //   component: resolve(__dirname, "pages/index.vue")
        // },
        {
          name: "summary",
          path: "/providers",
          component: resolve(__dirname, "pages/provider/summary.vue")
        }
      );
    }
  }
};
