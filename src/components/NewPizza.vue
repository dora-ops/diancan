<template>
  <form>
    <h3 class="text-muted my-5">添加新的商品</h3>
    <div class="form-group row">
      <label class="col-sm-1">种类</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.name">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">名称</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.sname">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">描述</label>
      <div class="col-sm-11">
        <textarea rows="5" class="form-control" v-model="newPizza.description"></textarea>
      </div>
    </div>
    <p><strong>选项1</strong></p>
    <div class="form-group row">
      <label class="col-sm-1">尺寸</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.size1">
      </div>
    </div>
     <div class="form-group row">
      <label class="col-sm-1">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.price1">
      </div>
    </div>

    <p><strong>选项2</strong></p>
    <div class="form-group row">
      <label class="col-sm-1">尺寸</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.size2">
      </div>
    </div>
     <div class="form-group row">
      <label class="col-sm-1">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.price2">
      </div>
    </div>
    <div class="form-group row">
      <button @click="addMenuItem" type="button" class="btn btn-success btn-block">添加</button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      newPizza: {}
    };
  },
  methods: {
    addMenuItem() {
      // console.log(this.newPizza)
      let data = {
        name: this.newPizza.name,
        sname: this.newPizza.sname,
        description: this.newPizza.description,
        uuid:this.uuid(),
        options: [
          {
            size: this.newPizza.size1,
            uuid:this.uuid(),
            price: this.newPizza.price1
          },
          {
            size: this.newPizza.size2,
            uuid:this.uuid(),
            price: this.newPizza.price2
          }
        ]
      };

      // axios vue-resource es6 fetch
      // fetch("https://wd6585637672byszoe.wilddogio.com/menu.json",{
      //   method:"POST",
      //   headers:{
      //     "Content-type":'application/json'
      //   },
      //   body:JSON.stringify(data)
      // })
      //   .then(res => res.json())
      //   .then(data => this.$router.push({name:"menuLink"}))
      //   .catch(err => console.log(err))
      // this.$store.commit('setMenuItems',data)
      this.http
        .post("menu.json", data)
        .then(res => this.$router.push({ name: "menuLink" }));
    },
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    }
  }
};
</script>
