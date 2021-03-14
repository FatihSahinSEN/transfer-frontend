/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const fs = require('fs')
module.exports = function (  ctx  ) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: ["axios","mixins"],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ["app.sass"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      //"roboto-font", // optional, you are not bound to it
      "material-icons" // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      env: {
        TITLE: ctx.dev
            ? "Turizm Hosting - Transfer Yönetim Sistemi"
            : "vipvantransfer - Transfer Yönetimi",
        SHORT_NAME: ctx.dev
            ? "Turizm Hosting"
            : "vipvantransfer",
        DESCRIPTION: ctx.dev
            ? "Turizm Hosting - Transfer Yönetim Sistemi"
            : "vipvantransfer - Airport Shuttle & Transfer",
        DOMAIN: ctx.dev
              ? "https://fatih.dev"
              : "https://www.vipvantransfer.com",
        API: ctx.dev
          ? "https://fatih.dev/backend/v1/"
          : "https://www.vipvantransfer.com/api/v1/",

      },
      vueRouterMode: "history", // available values: 'hash', 'history'

      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      extendWebpack(cfg) {}
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      host:'fatih.dev',
      https: {
        key: fs.readFileSync('cert/server.key'),
        cert: fs.readFileSync('cert/server.crt'),
        ca: fs.readFileSync('cert/server.pem'),
      },
      port: 8001,
      open: true // opens browser window automatically,
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: "material-icons", // Quasar icon set
      lang: "en-us", // Quasar language pack
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: "auto",

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ["Dialog", "Loading", "BottomSheet", "Notify"]
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: true
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true
      }, // only for GenerateSW
      manifest: {
        name: `vipvantransfer - Yönetim Sistemi`,
        short_name: `vipvantransfer`,
        description: `Transfer Yönetim Sistemi`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#133d67",
        theme_color: "#133d67",
        icons: [{
            src: "icon/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icon/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icon/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icon/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "transfer-system"
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack( /* cfg */ ) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  };
};
