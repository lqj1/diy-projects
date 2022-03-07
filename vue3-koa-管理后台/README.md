

[TOC]



### 1. 项目开发简介

#### 1.1 项目开发流程

- 需求 => 开发 => 测试 => 上线 => 回顾
  
  - 需求： 需求调研、需求设计、需求评审、用例评审
  - 开发： 接口设计、接口评审、前后端开发、CR (Code Review)、自测
  - 测试： Bug 修复、功能优化、需求调整、遗漏功能开发
  - 上线： 预发验证、灰度测试、checklist、权限配置、版本回退
  - 回顾： 事故复盘、问题总结、数据总览

#### 1.2 通用后台

- UI 框架
  
  - Element、AntD、Mint、Vant、WeUI

- 框架
  
  - Vue、React、Angular、Jquery

- 插件/包
  
  - cookie、swiper、lodash、Underscore

- 后台
  
  - Antd-Pro、Vue-Admin、Egg

#### 1.3 课程特点

- 全栈、Vue3 全家桶、ElementPlus、标准前后端、CRUD、JWT、RBAC 权限、审批流、动态菜单

#### 1.4 Vue3 介绍

##### Composition API，独立的模块中使用，一般还是使用 options api 较多

- 定义响应式：ref、reactive
- 入口函数：setup
- 钩子函数：computed、onMounted
- 上下文：getCurrentInstance、globalProperties

#### 1.5 vue3 和 vue2 的语法差异

a. 模板语法未变

- 文本渲染：{{msg}}

- HTML 渲染：{{html}}

- 事件绑定：v-on/ @

- 属性绑定：v-bind/ :
  
  - `< div v-bind:userId="userId"></div>`

- class 绑定
  
  - `<div :class="{active: isActive}"></div>`

- style 绑定
  
  - `<div :style="{color: activeColor, fontSize: fontSize + 'px'}"></div>`

- 条件渲染
  
  - v-if、v-else、v-else-if、v-show

- 循环
  
  - v-for
  
  ```html
  <ul>
    <li v-for="item in items">{{item.message}}</li>
  </ul>
  ```

- 事件修饰符
  
  - .stop、.prevent、.capture、.self、.once、.passive

- 按钮修饰符
  
  - enter、.tab、.delete ...

- 表单绑定
  
  - v-model

- 表单修饰符
  
  - .lazy、number、trim

#### 1.6 Composition API使用

##### a. 定义setup启动函数

```javascript
export default {
    name: 'app',
    setup() {
        // 启动函数
    }
}
```

##### b. 定义响应式变量

```javascript
setup(){
    // 普通类型
    let age = ref(30)
    // 对象类型
    let user = reactive({name: 'jack'})
    return {
        age, 
        user
    }
}
```

##### c. 初始化调用

```javascript
setup() {
    onMounted(()=>{
        // 初始化，一般用来调用初始化接口
        console.log('init...')
    })
}
```

##### d. 计算属性调用

```javascript
setup() {
    let age = ref(30)
    let newAge = computed(()=>{
        return age.value + 1;
    })
    return {
        age,newAge
    }
}
```

##### e. 全局对象挂载

```javascript
// main.js
import {createApp} from 'vue'
import App from './App.vue'
import api from './api'
// 对象挂载，这句很重要
app.config.globalProperties.$api = api


// app.vue
export default {
    name: 'app',
    setup() {
        const {ctx} = getCurrentInstance()
        const userList = ref([])
        // 获取用户列表
        const getUserList = async ()=> {
            let params = { id: 1 }
            try {
                // 通过ctx调用接口
                const {list,page} = await ctx.$api.getUserList(params)
                userList.value = list
            } catch (error) {
                
            }
        }
        return {
            getUserList
        }
    }
}
```

##### f. Provider/Inject

- 主要用于组件之间数据传递，如果数据复杂一般会使用Redux进行存储，如果业务简单，可以使用Provider/Inject来直接传递。Provider主要是提供数据，Inject主要用于接收数据。

虽然Composition API是Vue3新语法，但是不推荐所有页面都使用它来开发，官方介绍的是通过它可以防止方法来回横跳，所以如果是独立模块封装或者独立组件调用，我们可以基于Composition API来开发，但是常规页面，还是Options API方便，大家千万不要误导。

[summary](./images/summary.png)



### 2. 项目初始化

#### 2.1 初始化、目录规范

##### a. 全局安装vue脚手架

```javascript
npm install @vue/cli -g
// or
cnpm install @vue/cli -g
// or
yarn global add @vue/cli 
```

- vue --version 可以查看版本，4.x以上可以支持创建 vue3 项目

- 版本升级
  
  - npm update -g @vue/cli

##### b. 通过 vite 创建项目

创建项目

```javascript
npm init @vitejs/app
// or
cnpm init @vitejs/app
// or
yarn create @vitejs/app manager-fe
```

##### c. 安装项目所需插件

```
# 安装项目生产依赖
yarn add vue-router vuex element-plus axios -
# 安装项目开发依赖
yarn add sass -S 
```

#### 2.2 目录结构

```
manager-fe
    dist
    node_modules
    public
    src
        api
        assets
        components
        config
        router
        store
        utils
        views
        App.vue
        main.js
    .gitignore
    .env.dev
    .env.test
    .env.prod
    index.html
    package.json
    vite.config.js
    yarn.lock
```

#### 2.3 路由封装

- 在scr目录的router目录下创建index.js文件，写入下面内容

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './../components/Home.vue'
import Welcome from './../components/Welcome.vue'
import Login from './../components/Login.vue'
const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎页'
        },
        component: Welcome
      },
      {
        name: 'login',
        path: '/login',
        meta: {
          title: '登录页'
        },
        component: Login
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router

```

#### 2.4 环境配置

- 在src目录的config目录下创建index.js文件，写入下面内容

```javascript
/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '/',
    mockApi: '' // 开发环境需要访问mock，提测之后才会访问测试环境地址
  },
  test: {
    baseApi: '//test.futurefe.com/api',
    mockApi: ''
  },
  prod: {
    baseApi: 'futurefe.com/api',
    mockApi: ''
  }
}
export default {
  env: 'dev',
  mock: true, // 接口是否支持mock，整个项目使用mock方式
  // baseApi: 'www.baidu.com/api' // test-www
  ...EnvConfig[env]
}
```

#### 2.5 axios的二次封装

- 在src目录下的utils目录下创建request.js文件

- 实例化 axios 对象

- 创建请求响应的拦截器

- 导出模块 `export default request`

- 在 main.js 中引入并挂载到全局

```javascript
import request from './utils/request'
const app = createApp(App)
app.config.globalProperties.$request = request
```

#### 2.6 storage二次封装

localStorage可以存储基本数据类型，对于引用数据类型，如

`localStorage.setItem("user", [{name: 'jack'}])` 存进去之后识别就是 object object

**可以用 JSON.stringify来转换成字符串**

- 在utils目录下创建storage.js文件

```javascript
/**
 * Storage 二次封装
 * @author lqj
 */
import config from './../config'
export default {
  setItem(key, val) {
    let storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem(key) {
    return this.getStorage()[key] // 获取的是属性值
  },
  getStorage() {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  },
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]
    // 删除之后还需要重新写入
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll() {
    window.localStorage.clear()
  }
}
```

#### 3. 主页结构布局
