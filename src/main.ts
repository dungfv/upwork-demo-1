import { createApp, defineAsyncComponent } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
  .component('Button', defineAsyncComponent(() => import('./components/elements/Button.vue')))
  .mount('#app')
