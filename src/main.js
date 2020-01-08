import Vue from "vue";
import 'element-ui/lib/theme-chalk/index.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
  error: "./static/error.png"
  // loading:'./static/loading.png'
});
// require('./mock/index')
import Element from "element-ui";
Vue.use(Element);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
