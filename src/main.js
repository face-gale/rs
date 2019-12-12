import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
  error: "./static/error.png"
  // loading:'./static/loading.png'
});
import Element from "element-ui";
Vue.use(Element);
// 向main.js中添加如下代码
process.env.Mock && require('./mock.js')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
