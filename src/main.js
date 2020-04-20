import Vue from "vue";
import 'element-ui/lib/theme-chalk/index.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 视频播放器
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

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
