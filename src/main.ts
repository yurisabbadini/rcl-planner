import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import i18n from './i18n'

createApp(App).use(i18n).use(Quasar, quasarUserOptions).use(store).use(router).mount("#app");
