<template>
  
  
  <div class="row">
   
  
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
    

             <!-- <button 
               @click="showModal()"
                class="btn btn-sm btn-outline-success">按钮</button> -->


 

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
 
     
      <div class="modal-header">
        <h4 class="modal-title">商品修改</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
   
      <div class="modal-body">
        <div class="form-group row">
          <label class="col-sm-1">种类</label>
          <div class="col-sm-11">
            <input type="text" class="form-control" v-model="pro.name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1">名称</label>
          <div class="col-sm-11">
            <input type="text" class="form-control" v-model="pro.sname">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1">描述</label>
          <div class="col-sm-11">
            <textarea rows="5" class="form-control" v-model="pro.description"></textarea>
          </div>
        </div>
        
        <div class="form-group row">
          <label class="col-sm-1">尺寸</label>
          <div class="col-sm-11">
            <input type="text" class="form-control" v-model="pro.size">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1">价格</label>
          <div class="col-sm-11">
            <input type="text" class="form-control" v-model="pro.price">
          </div>
    </div>

      </div>
 
    
      <div class="modal-footer">
       
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
         <button type="button" class="btn btn-primary" @click="updateItem()">
					提交
				</button>
      </div>
 
    </div>
  </div>
</div>
   
     <!-- 分类 -->
    <div class="col-sm-12 col-md-12">
      <div class="col-sm-12 col-md-4">
        <!-- 竖边导航栏 -->
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
            <th>操作</th>
            <th>加入</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.uuid">
         
          <tr>
            <td><strong>{{item.name}}</strong></td>
          </tr>
          <tr v-for="option in item.options" :key="option.uuid">
            <td><a v-bind:href="'/pro?sname='+item.sname+'&size='+option.size+'&price='+option.price+'&uuid='+option.uuid"><span>{{item.sname}}</span></a></td>
            <td>{{option.size}}</td>
            <td>{{option.price}}</td>
            <td><button 
               @click="showModal(option.uuid)"
                class="btn btn-sm btn-outline-success">修改</button>
                <button 
               @click="deleteItem(option.uuid)"
                class="btn btn-sm btn-outline-success">删除</button>
                </td>
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
                  <th>名称-尺寸</th>
                  <th>价格</th>
                </tr>
              </thead>
              <tbody v-for="item in baskets" :key="item.uuid">
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
            <button class="btn btn-success btn-block" @click="generateOrder()">提交</button>
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
// import $ from 'jquery'
//  import {$} from '../cookie.js'

export default {
  name: "personal-center",
  data() {
    return {
      baskets: [],
      basketText: "购物车没有任何商品",
      user: {},
      pro: {
        price: "",
        size: "",
        name: "",
        sname: "",
        description: "",
        uuid: ""
      },
      getMenuItems: {}
    };
  },
  // props: ['show'],
  computed: {
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
    //在computed之前
    this.fetchData();
  },
  methods: {
    fetchData() {
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      // 将请求下来的数据存储到vuex中
      this.http.get("menu.json").then(res => {
        this.getMenuItems = res.data;
      });
      const currentUser = this.$store.getters.currentUser;

      const basket = this.getCookie(this.user.mail) || [];
      var user = JSON.parse(basket);
      const total = this.getCookie(this.user.mail + "total");
      this.baskets = user;
      this.total = parseInt(total);
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
    generateOrder() {
      let baskets = this.baskets;
      let total = this.total;
      //生产订单，跳到详情页
      this.$store.commit("setBasket", { baskets: baskets, total: total });
      // this.$store.commit('setBasket',{baskets})
      // console.log(total)
      // window.location.reload()
      this.setCookie(this.user.mail, JSON.stringify(baskets));
      this.setCookie(this.user.mail + "total", total);
      this.$router.push({ name: "orderLink" });

      //评价生成，评价详情
    },
    //写cookies
    setCookie(name, value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    showModal(uuid) {
      var data = this.getMenuItems;
      for (const key in data) {
        const item = data[key];
        for (const element of item.options) {
          if (element.uuid == uuid) {
            let pro = {};
            pro.name = item.name;
            pro.sname = item.sname;
            pro.description = item.description;
            pro.size = element.size;
            pro.price = element.price;
            pro.uuid = element.uuid;
            console.log(pro);
            this.pro = pro;
          }
        }
      }
      $("#myModal").modal("show");
    },
    deleteItem(uuid) {
      var data = this.getMenuItems;
      for (const key in data) {
        const item = data[key];
        for (const element of item.options) {
          if (element.uuid == uuid) {
            item.options.remove(element);
          }
        }
        if (item.options.length == 0) {
          delete data[key];
        }
      }
    },
    updateItem() {
      var data = this.getMenuItems;
      var pro = this.pro;
      for (const key in data) {
        const item = data[key];
        for (const element of item.options) {
          if (element.uuid == pro.uuid) {
            // item.options.remove(element);
            element.price = pro.price;
            element.size = pro.size;
            item.name = pro.name;
            item.sname = pro.sname;
            item.description = pro.description;
            data[key] = item;
          }
        }
      }
      $("#myModal").modal("hide");
    }
  }
};
</script>