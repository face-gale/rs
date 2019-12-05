import Vue from 'vue'
import Router from 'vue-router'
import ItemInfo from "../views/production/item-info/ItemInfo";
import ItemDetails from "../views/production/item-details/ItemDetails";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ItemInfo',
      component: ItemInfo
    },{
      path: '/details',
      name: 'ItemDetails',
      component: ItemDetails
    }

  ]
})
