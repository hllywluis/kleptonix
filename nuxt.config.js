import { config } from './firebaseConfig'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Kleptonix',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Kleptonix, the only place where communities shine together.'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    script: [
      {
        crossOrigin: 'anonymous',
        integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
        src: 'https://code.jquery.com/jquery-3.5.1.min.js'
      },
      {
        crossOrigin: 'anonymous',
        integrity: 'sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV',
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/firestorePlugin',
    '~/plugins/kleptonixRouterPlugin'
  ],

  // Set src directory
  srcDir: 'src',

  // Set build directory
  buildDir: 'functions/.nuxt',

  // Custom routing
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'Feed',
        path: '/',
        component: resolve(__dirname, 'src/pages/feed.vue')
      })
      routes.push({
        name: 'Browse',
        path: '/kleptons',
        component: resolve(__dirname, 'src/pages/kleptons.vue')
      })
      routes.push({
        name: 'SignIn',
        path: '/sign_in',
        component: resolve(__dirname, 'src/pages/signin.vue'),
        meta: {
          noAuth: true
        }
      })
      routes.push({
        name: 'SignUp',
        path: '/sign_up',
        component: resolve(__dirname, 'src/pages/signup.vue'),
        meta: {
          noAuth: true
        }
      })
      routes.push({
        name: 'Profile',
        path: '/profile',
        component: resolve(__dirname, 'src/pages/profile.vue'),
        meta: {
          requiresAuth: true
        }
      })
      routes.push({
        name: 'Klepton',
        path: '/k/:klepton',
        props: true,
        component: resolve(__dirname, 'src/pages/kview.vue')
      })
      routes.push({
        name: 'NewPost',
        path: '/k/:klepton/new',
        props: true,
        component: resolve(__dirname, 'src/pages/newpost.vue'),
        meta: {
          requiresAuth: true
        }
      })
      routes.push({
        name: 'Post',
        path: '/k/:klepton/p/:post_id',
        props: true,
        component: resolve(__dirname, 'src/pages/postview.vue')
      })
    }
  },

  // Progressive Web App custom configuration
  pwa: {
    meta: false,
    icon: false,
    workbox: {
      importScripts: [
        '/firebase-auth-sw.js'
      ],
      dev: process.env.NODE_ENV !== 'production'
    }
  },

  // Firebase configuration and services.
  firebase: {
    config: {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'onAuthStateChangedAction'
        },
        ssr: true
      },
      firestore: {
        memoryOnly: false,
        static: false,
        preload: false,
        chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]',
        enablePersistence: true
      },
      analytics: {
        collectionEnabled: true
      }
    }
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/firebase',
    '@nuxtjs/pwa'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true
  }
}
