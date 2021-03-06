import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./common/css/common.css"
import Vant from 'vant';
import 'vant/lib/index.css';
import './common/js/router'

createApp(App).use(store).use(router).use(Vant).mount('#app')
