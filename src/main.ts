import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { debounce } from './directives/debounce'
import VueSplide from '@splidejs/vue-splide' ;
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import "vue-progressive-image/dist/style.css";
import Notifications from '@kyvg/vue3-notification'


import TmdbGatewayHttp from './gateway/tmdb/TmdbGatewayHttp'
import AxiosAdapter from './gateway/http/AxiosAdapter'

const httpClient = new AxiosAdapter()
const TmdbGateway =  new TmdbGatewayHttp(httpClient, import.meta.env.VITE_BASE_URL_TMDB)

const app = createApp(App)
app.provide('tmdbGateway',TmdbGateway)
app.directive('debouce', debounce)
app.use(VueSplide)
app.use(Notifications)
app.use(createPinia())
app.use(router)

app.mount('#app')
