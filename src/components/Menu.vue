<template>
  
  
  <div class="row">
    <!-- <transition name="el-fade-in-linear">
    <div draggable="true" @drag="mouseDrag" @dragend="mouseDragend" :style="dialogStyle" class="g-dialog-wrapper" v-show="myVisible">
      <div class="g-dialog-header">
        <div class="left">
          模态框
        </div>
        <div class="right">
          <i class="g-times-icon fa fa-times" @click="myVisible=false" aria-hidden="true"></i>
        </div>
      </div>
      <div class="g-dialog-container">

      </div>
    </div>
  </transition>
  <g-key-dialog :visible.sync="myVisible">123</g-key-dialog> -->
    <!-- <v-container class="personal-center">
    <v-row>
      <v-col xs3>
        <div v-for="button in buttonGroup">
          <a :href="'' + button.path">
            <v-btn block dark large class="teal" >{{button.name}}</v-btn>
          </a>
        </div>
      </v-col>
      <v-col xs9>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container> -->
  <!-- <v-dialog v-model='isVisibility'>
      <v-btn primary dark slot='activator'>添加收货地址</v-btn>
      <v-card>
        <v-card-row>
          <v-card-title>添加收货地址</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>
            <v-container fluid>
              <v-text-field label='收货地址' v-model="address" />
            </v-container>
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class='blue--text darken-1' flat @click.native='isVisibility = false'>取消</v-btn>
          <v-btn class='blue--text darken-1' flat @click.native='submit'>添加</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog> -->

        <!-- 按钮：用于打开模态框 -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
      打开模态框
    </button>
    
    <!-- 模态框 -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
    
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title">模态框头部</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
    
          <!-- 模态框主体 -->
          <div class="modal-body">
            模态框内容..
          </div>
    
          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
    
        </div>
      </div>
    </div>
   
     <!-- 分类 -->
    <div class="col-sm-12 col-md-12">
      <div class="col-sm-12 col-md-4">
      </div>
      
    </div>
    <!-- 菜单 -->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>名称</th>
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
         
          <tr>
            <td><strong>{{item.name}}</strong></td>
          </tr>
          <tr v-for="option in item.options" :key="option.size">
            <td>{{item.sname}}</td>
            <td>{{option.size}}</td>
            <td>{{option.price}}</td>
            <td>
              <button 
                @click="addToBasket(item,option)"
                class="btn btn-sm btn-outline-success">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 购物车 -->
    <div class="col-sm-12 col-md-4">
      <div v-if="baskets.length > 0">
          <table class="table">
              <thead class="thead-default">
                <tr>
                  <th>数量</th>
                  <th>种类</th>
                  <th>名称</th>
                  <th>价格</th>
                </tr>
              </thead>
              <tbody v-for="item in baskets" :key="item.name">
                <tr>
                  <td>
                    <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
                    <span>{{item.quantity}}</span>
                    <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
                  </td>
                  <td>{{item.name}}</td>
                  <td>{{item.sname}}-{{item.size}}</td>
                  <td>{{item.price * item.quantity}}</td>
                </tr>
              </tbody>
            </table>
            <p>总价: {{total + "RMB"}}</p>
            <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>
        {{basketText}}
      </div>
      
    </div>

    

  </div>
</template>
<script>

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

export default {
  name: "personal-center",
  data() {
    return {
      baskets: [],
      basketText: "购物车没有任何商品",
      myVisible: this.visible,
      isVisibility: false,
      showModal: false,
      buttonGroup: [
        {
          name: "我的订单",
          path: "my-order"
        },
        {
          name: "管理收货地址",
          path: "manage-receiving-address"
        },
        {
          name: "修改密码",
          path: "change-password"
        }
      ]
      //getMenuItems:{}
    };
  },
  // props: ['show'],
  computed: {
    getMenuItems() {
      // 在vuex中获取数据
      // return this.$store.state.menuItems
      // 通过getters获取数据
      return this.$store.getters.getMenuItems;
    },
    total() {
      let totalCost = 0;

      for (let index in this.baskets) {
        let individualItem = this.baskets[index];
        totalCost += individualItem.quantity * individualItem.price;
      }

      return totalCost;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // fetch("https://wd6585637672byszoe.wilddogio.com/menu.json")
      //   .then(res => {
      //     return res.json()
      //   })
      //   .then(data => {
      //     this.getMenuItems = data
      //   })

      // axios.get("menu.json")
      //      .then(res => this.getMenuItems = res.data)

      // this.http.get("menu.json")
      //          .then(res => this.getMenuItems = res.data)

      // 将请求下来的数据存储到vuex中
      this.http
        .get("menu.json")
        .then(res => this.$store.commit("setMenuItems", res.data));
    },
    addToBasket(item, option) {
      let basket = {
        name: item.name,
        sname: item.sname,
        size: option.size,
        price: option.price,
        quantity: 1
      };

      if (this.baskets.length > 0) {
        // 过滤
        let result = this.baskets.filter(basket => {
          return basket.name === item.name && basket.price === option.price;
        });

        if (result != null && result.length > 0) {
          result[0].quantity++;
        } else {
          this.baskets.push(basket);
        }
      } else {
        this.baskets.push(basket);
      }
    },
    decreaseQuantity(item) {
      item.quantity--;

      if (item.quantity <= 0) {
        this.removeFromBasket(item);
      }
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    removeFromBasket(item) {
      this.baskets.splice(this.baskets.indexOf(item), 1);
    },
    show() {
      this.showModal = true;
    }
    // close: function () { this.$emit('close'); }
  },
  watch: {
    myVisible: function(val) {
      this.$emit("update:visible", val);
    },
    visible: function(val) {
      this.myVisible = val;
    }
  }
};
</script>