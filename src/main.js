import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from './routes'
import axios from 'axios'
import $ from 'jquery'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// import HDialog from './components/core/master.vue'

// Vue.component(HDialog.name, HDialog)

import {store} from './store/store.js'


// Vue.component(HDialog.name, HDialog)
Vue.use(VueRouter)
Vue.use(Vuetify)
// Vue.use(HDialog)




// 配置默认根路径
axios.defaults.baseURL = "https://wd6585637672byszoe.wilddogio.com/"

// 配置Vue原型 (在任何组件中都可以正常使用axios)
Vue.prototype.http = axios

const router = new VueRouter({
  routes,
  mode:'history',
  scrollBehavior (to, from, savedPosition) {
    //return { x:0, y:100 }
    //return{ selector:'.btn'}

    if(savedPosition){
      return savedPosition
    }else{
      return { x:0, y:0 }
    }
  }
})

//全局守卫
//  router.beforeEach((to,from,next) =>{
//   //alert("还没有登录，请先登录!");
//   //next();
//   //console.log(to);

//   //判断store.gettes.isLogin === false
//   if(to.path == '/login' || to.path == '/register'){
//     next();
//   }else{
//     alert("还没有登录，请先登录!");
//     next('/login');
//   }
//  })


//后置钩子
// router.afterEach((to,from) =>{
//   alert("after each");
// })


new Vue({
  el: '#app',
  // template:'<div><App></App><HDialog ref="hDialog" ></HDialog></div>',
  router,
  store,
  render: h => h(App)
})
