import { createApp , h} from 'vue'
import { provideApolloClient } from '@vue/apollo-composable'
import './style.css'
import App from './App.vue'
import 'flowbite';
import { router } from "./router/index.js"
import './index.css'
import {createI18n, useI18n} from "vue-i18n";
import {languages, defaultLocale} from "../src/i18n";
import { apolloClient } from '@/services/apollo'
import Notifications from '@kyvg/vue3-notification'
const localeStorageLang = localStorage.getItem('lang')
const messages = Object.assign(languages)

const i18n = createI18n({
    legacy: false,
    fallbackLocale: "en",
    locale: localeStorageLang || defaultLocale,
    messages
})
const app = createApp({
    setup() {

        const {t} = useI18n()
        return {t}
    },
    render: () => h(App),
})

provideApolloClient(apolloClient)

app.use(i18n)
app.use(router)
app.use(Notifications)
app.mount('#app')