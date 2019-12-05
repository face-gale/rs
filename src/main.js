// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
Vue.config.productionTip = false
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error:'./static/error.png',
  loading:'./static/loading.png'
})
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
