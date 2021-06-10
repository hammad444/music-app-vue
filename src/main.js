import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from './directives/icon'
import VeeValidatePlugin from './includes/validation'
import {Auth} from './includes/firebase'
import Progressbar from './includes/progress-bar';
import './assets/tailwind.css'
import './assets/main.css'
import 'nprogress/nprogress.css'

Progressbar(router)
let app;
Auth.onAuthStateChanged(()=>{
if(!app){
    app = createApp(App)
    app.directive('icon',Icon)
    app.use(store)
    app.use(router)
    app.use(VeeValidatePlugin)

    app.mount('#app')
}
})

