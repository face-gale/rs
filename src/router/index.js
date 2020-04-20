import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index";
import Home from "../views/home/Home";
import ItemDetails from "../views/item-details/ItemDetails";
import ItemInfo from "../views/item-info/ItemInfo";
import DemonsCenter from "../views/demons-center/DemonsCenter";
import PlanCenter from "../views/plan-center/PlanCenter";
import AboutUs from "../views/about-us/AboutUs";

Vue.use(VueRouter);

const routes = [
  /*{
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import(/!* webpackChunkName: "about" *!/ "../views/About.vue")
  }*/
  {
    path: "/",
    component: Index,
    name: "index",
    redirect: "/home",
    children: [
      { path: "home", component: Home },
      { path: "item", component: ItemInfo },
      { path: "details", name: "ItemDetails", component: ItemDetails },
      { path: "demons", name: "DemonsCenter", component: DemonsCenter },
      { path: "plan", name: "PlanCenter", component: PlanCenter },
      { path: "about", name: "AboutUs", component: AboutUs },
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
