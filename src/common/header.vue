<template>
  <div class="header-box">
    <div>
      <!--<header class="w">
        <div class="w-box">
          <div class="nav-logo">
            <h1 @click="changePage(-1)">
              <router-link to="/" title="RS">RS</router-link>
            </h1>
          </div>
        </div>
      </header>-->
      <slot name="nav">
        <div class="nav-sub" :class="{ fixed: st }">
          <div class="nav-logo">
            <h1 @click="changePage(-1)">
              <router-link to="/" title="RS">RS</router-link>
            </h1>
          </div>
          <div class="nav-sub-bg"></div>
          <div class="nav-sub-wrapper" :class="{ fixed: st }">
            <div class="w">
              <ul class="nav-list2">
                <li>
                  <router-link to="/">
                      <a @click="changGoods(-1)" :class="{ active: choosePage === -1 }">首页</a>
                  </router-link
                  >
                </li>
                <li>
                  <a @click="changGoods(-2)" :class="{ active: choosePage === -2 }">全部</a>
                </li>
                <li v-for="(item, i) in navList" :key="i">
                  <a @click="changGoods(i, item)" :class="{ active: i === choosePage }">{{ item.picUrl }}</a>
                </li>
                <li>
                  <a @click="changGoods(-3)" :class="{ active: choosePage === -3 }">服务与支持</a>
                </li>
              </ul>
              <div></div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import YButton from "../components/YButton";
import {navList} from "../api";
export default {
  data() {
    return {
      user: {},
      // 查询数据库的商品
      st: false,
      // 头部购物车显示
      cartShow: false,
      positionL: 0,
      positionT: 0,
      timerCartShow: null, // 定时隐藏购物车
      input: "",
      choosePage: -1,
      searchResults: [],
      timeout: null,
      token: "",
      navList: []
    };
  },
  methods: {
    // 导航栏文字样式改变
    changePage(v) {
      this.choosePage = v;
    },
    changGoods(v, item) {
      this.changePage(v);
      if (v === -1) {
        this.$router.push({
          path: "/"
        });
      } else if (v === -2) {
        this.$router.push({
          path: "/item"
        });
      } else if (v === -3) {
        //使用document.querySelector实现锚点的效果
        document.querySelector('#footerA').scrollIntoView(true);
      } else {
        // 站内跳转
        if (item.type === 1) {
          window.location.href = item.fullUrl;
        } else {
          // 站外跳转
          window.open(item.fullUrl);
        }
      }
    },
    // 控制顶部
    navFixed() {
      if (
        this.$route.path === "/goods" ||
        this.$route.path === "/home" ||
        this.$route.path === "/goodsDetails" ||
        this.$route.path === "/thanks"
      ) {
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        st >= 100 ? (this.st = true) : (this.st = false);
        // 计算小圆当前位置
        // let num = document.querySelector(".num");
        // this.positionL = num.getBoundingClientRect().left;
        // this.positionT = num.getBoundingClientRect().top;
        // this.ADD_ANIMATION({
        //   cartPositionL: this.positionL,
        //   cartPositionT: this.positionT
        // });
      } else {
        return;
      }
    },
    // 通过路由改变导航文字样式
    getPage() {
      let path = this.$route.path;
      // let fullPath = this.$route.fullPath
      if (path === "/" || path === "/home") {
        this.changePage(-1);
      } else if (path === "/goods") {
        this.changePage(-2);
      } else {
        this.changePage(0);
      }
    },
    openProduct(productId) {
      this.$router.push({ path: "/details?productId=" + productId });
      // window.open(
      //   "//" + window.location.host + "/#/details?productId=" + productId
      // );
    },
    _getNavList() {
      navList().then(res => {
        this.navList = res.result;
      });
    }
  },
  mounted() {
    this._getNavList();
    /*this.token = getStore('token')
      if (this.login) {
        this._getCartList()
      } else {
        this.INIT_BUYCART()
      }*/
    this.navFixed();
    this.getPage();
    window.addEventListener("scroll", this.navFixed);
    window.addEventListener("resize", this.navFixed);
    if (typeof this.$route.query.key !== undefined) {
      this.input = this.$route.query.key;
    }
  },
  components: {
    YButton
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/theme";
@import "../assets/style/mixin";

.move_in_cart {
  animation: mymove 0.5s ease-in-out;
}

@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.header-box {
  background: $head-bgc;
  background-image: -webkit-linear-gradient(#000, #121212);
  background-image: linear-gradient(#000, #121212);
  width: 100%;
}

header {
  height: 100px;
  z-index: 30;
  position: relative;
}

.w-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  // position: relative;
  h1 {
    height: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    > a {
      background: url(../assets/images/rs-logo1.png) no-repeat 50%;
      background-size: cover;
      display: block;
      @include wh(100px, 80px);
      text-indent: -9999px;
      background-position: 0 0;
    }
  }
  .right-box {
    display: flex;
  }
  .nav-aside {
    display: flex;
    align-items: center;
  }
}

@media (max-height: 780px) {
  .nav-cart-items {
    max-height: 423px !important;
  }
}

@media (max-height: 900px) {
  .nav-cart-items {
    max-height: 544px !important;
  }
}

@media (max-height: 1080px) {
  .nav-cart-items {
    max-height: 620px !important;
  }
}

.nav-sub {
  .nav-logo {
    height: 90px;
    h1 {
      line-height: 90px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      > a {
        background: url(../assets/images/logo-2.png) no-repeat 50%;
        background-size: cover;
        display: block;
        @include wh(100px, 90px);
        text-indent: -9999px;
        background-position: 0 0;
      }
    }
  }
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  z-index: 20;
  height: 90px;
  background: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  &.fixed {
    position: fixed;
    z-index: 21;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #dadada;
    background-image: -webkit-linear-gradient(#fff, #f1f1f1);
    background-image: linear-gradient(#fff, #f1f1f1);
  }
  .nav-sub-wrapper {
    padding: 31px 0;
    height: 90px;
    position: relative;
    &.fixed {
      padding: 0;
      height: 100%;
      display: flex;
      align-items: center;
    }
    &:after {
      content: " ";
      position: absolute;
      top: 89px;
      left: 50%;
      margin-left: -610px;
      width: 1220px;
      background: #000;
      height: 1px;
      display: none;
      opacity: 0;
      -webkit-transition: opacity 0.3s ease-in;
      transition: opacity 0.3s ease-in;
    }
  }
  .w {
    display: flex;
    justify-content: space-between;
  }
  .nav-list2 {
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    height: 100%;
    li:first-child {
      padding-left: 0;
      a {
        padding-left: 10px;
      }
    }
    li {
      position: relative;
      float: left;
      padding-left: 2px;
      a {
        display: block;
        padding: 0 10px;
        color: #666;
        &.active {
          font-weight: bold;
        }
      }
      a:hover {
        color: #5683ea;
      }
    }
    li:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 13px;
      width: 2px;
      height: 2px;
      background: #bdbdbd;
    }
  }
}

@media (min-width: 1px) {
  .nav-sub .nav-sub-wrapper:after {
    display: block;
  }
}

</style>
