import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import config from './config'
import request from './utils/request'
import storage from './utils/storage'

console.log('环境变量=> ', import.meta.env)
// package.json中的scripts下dev值改成 vite --mode dev，就可以改成开发环境运行，改完需要重新编译
const app = createApp(App)
// mock数据请求
// axios.get(config.mockApi + '/login').then(res => {
// console.log(res)
// })

app.use(ElementPlus)
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.use(router).mount('#app')
