<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="py-2" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round" class="d-block mx-auto"><circle cx="12" 
        cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" 
        y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69"
         y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62"
          y1="12" x2="10.88" y2="21.94"></line></svg>
      </a>
      <a href="/" class="navbar-brand">点餐系统</a>
      <ul class="navbar-nav">
        <!-- <li><router-link tag="div" to="/" class="nav-link">主页</router-link></li> -->
        <!-- <li><router-link :to="homeLink" class="nav-link">主页</router-link></li> -->
        <li><router-link :to="{name:'homeLink'}" class="nav-link">主页</router-link></li>
        <li><router-link :to="{name:'menuLink'}" class="nav-link">菜单</router-link></li>
        <li><router-link :to="{name:'adminLink'}" class="nav-link">管理</router-link></li>
        <li><router-link :to="{name:'aboutLink'}" class="nav-link">关于我们</router-link></li>
      </ul>

      <template v-if="!isLogin&&!isInLogin">
      <ul class="navbar-nav ml-auto">
        <li><router-link :to="{name:'loginLink'}" class="nav-link">登录</router-link></li>
        <li><router-link :to="{name:'registerLink'}" class="nav-link">注册</router-link></li>
      </ul>
      </template>
      <template v-else>
        <ul class="navbar-nav ml-auto">
        <li>邮箱:{{user.email}}</li>
        <li v-on:click="loginOut()"><font color="blue">退出</font></li>
        </ul>
      </template>
      
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      homeLink: "/",
      isLogin: false,
      user: { email: "123" }
    };
  },
  computed: {
    isInLogin() {
      var currentCity = localStorage.getItem("user");
      if (currentCity) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    var currentCity = localStorage.getItem("user");
    if (currentCity) {
      var user = JSON.parse(currentCity);
      this.isLogin = true;
      this.user = user[0];
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    loginOut() {
      this.isLogin = false;
      window.localStorage.removeItem("user");
      // this.$store.mutations.userStatus(null);
      this.$router.push({ name: "loginLink" });
    }
  }
};
</script>
