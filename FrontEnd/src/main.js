import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueCookies from 'vue3-cookies'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './app.css'

const app = createApp(App)

// app.use(VueCookies, {
//   expireTimes: "30d",
//   path: "/",
//   domain: "http://localhost:3000",
//   secure: false,
//   sameSite: false,
// });
app.use(router)

app.mount('#app')
