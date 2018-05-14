<template>
  <div>
  <div class="text">订单详情</div>
  <div class="row">
    <!-- 商品详情 -->
    
    
    <div class="col-sm-12 col-md-12">
      <table class="table">
              <thead class="thead-default">
                <tr>
                  <th>数量</th>
                  <th>种类</th>
                  <th>名称-尺寸</th>
                  <th>价格</th>
                </tr>
              </thead>
              <tbody v-for="item in baskets" :key="item.name">
                <tr>
                  <td>
                    
                    <span>{{item.quantity}}</span>
                 
                  </td>
                  <td>{{item.name}}</td>
                  <td>{{item.sname}}-{{item.size}}</td>
                  <td>{{item.price * item.quantity}}</td>
                </tr>
              </tbody>
            </table>
            <p>总价: {{total + "RMB"}}</p>
    </div>
    <ul >
  <li v-for="pin in pinjia" :key="pin.id">评价{{pin.id}}:<span class="pin">{{pin.text}}</span></li>
</ul>
    <textarea
               
                class="form-control"
                v-model="text"
                >
                </textarea>
 <form @submit.prevent="onSubmit">
    
            <button type="submit" class="button btn btn-block btn-success">评价</button>
   </form>
  </div>
  </div>
</template>
<script>
export default {
  name: "personal-center",
  data() {
    return {
      baskets: [],
      pinjia: [],
      total:0,
      text:"",
      id:0
    };
  },
  // props: ['show'],
  computed: {
    getItem() {
      // 在vuex中获取数据
      // return this.$store.state.menuItems
      // 通过getters获取数据
      return this.$store.getters.getMenuItems;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
        let obj=this.$store.getters.getBasket;
        this.baskets=obj.baskets;
        this.total=obj.total;
    },
    getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
    } ,
     onSubmit(){
       let obj={};
       obj.text=this.text;
       var id=this.id;
       obj.id=id;
       id++;
       this.id=id;
       this.pinjia.push(obj)
     } 
  }
};
</script>

<style>
.text{
  text-align: center;
  margin-top: 22px;
  margin-bottom: 22px

}
.button{
 
  margin-top: 22px;


}
.pin{
 
  margin-left: 22px;


}
</style>
