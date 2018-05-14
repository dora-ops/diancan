import Home from './components/Home'
import Menu from './components/Menu'
import Product from './components/Product'
import Order from './components/Order'
// import ManageReceivingAddress from './components/ManageReceivingAddress'
// import hello from './components/Hello'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'

//二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

//三级路由
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'

export const routes = [
  {
    path: '/', name: "homeLink", components: {
      default: Home,
      'orderingGuide': OrderingGuide,
      'delivery': Delivery,
      'history': History
    }
  },
  { path: '/menu', name: "menuLink", component: Menu },
  { path: '/pro', name: "proLink", component: Product },
  { path: '/order', name: "orderLink", component: Order },

  {
    path: '/admin', name: "adminLink", component: Admin,
    beforeEnter: (to, from, next) => {
      // 路由独享守卫
      // alert("非登陆状态,不能访问此页面!");
      // next(false);
      var currentUser = localStorage.getItem("user");
      if (currentUser) {
        currentUser = JSON.parse(currentUser);
        if (currentUser[0].email=='1@qq.com') {
          next();
        } else {
          alert("您不是管理员，无权限操作!");
          next('/');
        }
      } else {
        alert("您还未登陆!");
        next('/login');
      }
      // console.log(user)
      // 判断store.gettes.isLogin === false
     
    }
  },
  {
    path: '/about', name: "aboutLink", redirect: '/about/contact', component: About,
    children: [
      {
        path: '/about/contact', name: "contactLink", redirect: '/personname', component: Contact,
        children: [
          { path: '/phone', name: "phoneNumber", component: Phone },
          { path: '/personName', name: "personName", component: PersonName },
        ]
      },
      { path: '/history', name: "historyLink", component: History },
      { path: '/delivery', name: "deliveryLink", component: Delivery },
      { path: '/orderingGuide', name: "orderingGuideLink", component: OrderingGuide },
    ]
  },
  { path: '/login', name: "loginLink", component: Login },
  { path: '/register', name: "registerLink", component: Register },
  { path: '*', redirect: '/' }
]
