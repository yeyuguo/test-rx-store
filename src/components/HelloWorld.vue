<template>
  <div class="hello">
    <button ref="btn" @click="handleClick({status:1})">触发 true</button>
    <button ref="btn" @click="handleClick({status:0})">触发 false</button>
    <div ref="otherUI" class="otherUI"></div>
  </div>
</template>

<script>
import { btnObs$, handle_btnObs$, store$, newUIObs$ } from "./my-rx";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  methods: {
    handleClick: function(data) {
      btnObs$.next(data);
    }
  },
  mounted() {
    handle_btnObs$.subscribe(data => {
      if (data.status) {
        this.$refs["btn"].style.background = data;
      }
    });

    newUIObs$.subscribe(data => {
      this.$refs["otherUI"].style.background = data;
    });

    store$.subscribe(data => {
      document.body.style.background = data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.otherUI {
  width: 50px;
  height: 50px;
  background: #42b983;
  border: 1px solid #fff;
}
</style>
