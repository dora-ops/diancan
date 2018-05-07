<template>
  
  
  <div class="row">
    <!-- 商品详情 -->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>种类</th>
            <th>名称</th>
            <th>尺寸</th>
            <th>价格</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
         
          
          <tr>
            <td>{{getItem.name}}</td>
            <td>{{getItem.sname}}</td>
            <td>{{getItem.size}}</td>
            <td>{{getItem.price}}</td>
            <td>{{getItem.description}}</td>
            
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
export default {
  name: "personal-center",
  data() {
    return {
      baskets: []
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
      // debugger;
      let htp = this.http;
      this.http.get("menu.json").then(res => {
        const data=res.data;
        const value=this.getQueryString('sname');
        const size=this.getQueryString('size');
        const price=this.getQueryString('price');
        for (const key in data) {
         
            const element = data[key];
            if (element.sname==value) {
               element.size=size;
               element.price=price;
               this.$store.commit("setMenuItems", element);
            }
          
        }
       
      });
    },
    getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
    }  
  }
};
</script>