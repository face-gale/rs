<template>
    <div id="headerA" class="header-box">
        <div>
            <slot name="nav">
                <div class="nav-sub" :class="{ fixed: st }">
                    <div class="nav-logo">
                        <h1 @click="changePage(-1)">
                            <router-link to="/" title="睿思智能科技有限公司官方网">RS</router-link>
                        </h1>
                    </div>
                    <div class="nav-sub-wrapper" :class="{ fixed: st }">
                        <div class="nav-list1">
                            <div class="nav-row">
                                <el-row type="flex" class="row-bg" justify="end">
                                    <el-col :span="6" class="bg-col">
                                        <div class="col-content">
                                            <router-link to="/">
                                                <a @click="changGoods(-1)" :class="{ active: choosePage === -1 }">首页</a>
                                            </router-link>
                                        </div>
                                    </el-col>
                                    <el-col :span="6" class="bg-col" v-for="(item, i) in navList" :key="i">
                                        <div class="col-content">
                                            <a @click="changGoods(i, item)" :class="{ active: i === choosePage }">{{ item.picUrl }}</a>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
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
            // 控制顶部
            navFixed() {
                // if (
                //     this.$route.path === "/item" ||
                //     this.$route.path === "/home" ||
                //     this.$route.path === "/details" ||
                //     this.$route.path === "/"
                // ) {
                //     const st = document.documentElement.scrollTop || document.body.scrollTop;
                //     st >= 90 ? (this.st = true) : (this.st = false);
                // } else {
                //     return;
                // }
                const st = document.documentElement.scrollTop || document.body.scrollTop;
                st >= 90 ? (this.st = true) : (this.st = false);
            },
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
                    // document.querySelector('#headerA').scrollIntoView(true);
                } else if (v === -2) {
                    this.$router.push({
                        path: "/item"
                    });
                } else if (v === -3) {
                    //使用document.querySelector实现锚点的效果
                    // document.querySelector('#footerA').scrollIntoView(true);
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
            // 通过路由改变导航文字样式
            getPage() {
                let path = this.$route.path;
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
            },
            _getNavList() {
                navList().then(res => {
                    this.navList = res.result;
                });
            }
        },
        mounted() {
            this.navFixed();
            this._getNavList();
            this.getPage();
            if (typeof this.$route.query.key !== undefined) {
                this.input = this.$route.query.key;
            }
            window.addEventListener("scroll", this.navFixed);
            window.addEventListener("resize", this.navFixed);
        },
        components: {
            YButton
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/style/theme";
    @import "../assets/style/mixin";

    .header-box {
        background: $head-bgc;
        background-image: -webkit-linear-gradient(#000, #121212);
        background-image: linear-gradient(#000, #121212);
        width: 100%;
    }

    .nav-sub {
        .nav-logo {
            margin-left: 30px;
            height: 70px;
            h1 {
                line-height: 70px;
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                > a {
                    background: url(../assets/images/logo-2.png) no-repeat 50%;
                    background-size: cover;
                    display: block;
                    @include wh(80px, 70px);
                    text-indent: -9999px;
                    background-position: 0 0;
                }
            }
        }
        display: flex;
        position: relative;
        z-index: 20;
        height: 70px;
        background: #f7f7f7;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        &.fixed {
            position: fixed;
            z-index: 20;
            height: 70px;
            top: 0;
            left: 0;
            right: 0;
            border-bottom: 1px solid #dadada;
            background-image: -webkit-linear-gradient(#f7f7f7, #f7f7f7);
            background-image: linear-gradient(#f7f7f7, #f7f7f7);
        }
        .nav-sub-wrapper {
            padding: 18px 0;
            height: 70px;
            &.fixed {
                padding: 0;
                height: 100%;
                display: flex;
                align-items: center;
            }
        }
        .w {
            display: flex;
            justify-content: space-between;
        }

        .nav-list1 {
            justify-content: center;
            background-color: #f6f6f6;
            margin-right: 0;
            .nav-row {
                margin: 0 20px;
                .el-row {
                    margin-bottom: 20px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
                .el-col {
                    border-radius: 4px;
                }
                .bg-purple-dark {
                    background: #99a9bf;
                }
                .bg-purple {
                    background: #d3dce6;
                }
                .bg-purple-light {
                    background: #e5e9f2;
                }
                .grid-content {
                    border-radius: 4px;
                    min-height: 36px;
                }
                .row-bg {
                    padding: 0 0;
                    .bg-col {
                        width: 150px;
                    }
                    .col-content {
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 15px;
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
                }
            }
        }
    }

</style>
