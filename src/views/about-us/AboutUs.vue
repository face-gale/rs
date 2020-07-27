<template>
    <div class="home">
        <div v-loading="loading" element-loading-text="加载中..." style="min-height: 30vw;" v-if="!error">
            <div class="banner">
                <div class="bg">
                    <div style="position:absolute">
                        <img v-if="picUrl" class="img1" :src="picUrl" />
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-list">
            <div class="nav-row">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="6" class="bg-col" v-for="(item, i) in contentArray" :key="i" :class="{ change: i !==  contentArray.length-1 }">
                        <div class="col-content">
                            <!--<a>门铃解决方案</a>-->
                            <a @click="changeContent(i,item)" :class="{ active: i === choosePage }">{{ item.panelTitle }}</a>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="item-info">
            <div slot="content">
                <div class="img-item" v-if="productMsg">
                    <div v-html="productMsg">{{ productMsg }}</div>
                </div>
                <div class="no-info" v-else>
                    <img src="/static/images/no-data.png" />
                    <br />
                    该商品暂无内容数据
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {productHome} from "../../api";
    export default {
        data() {
            return {
                choosePage: -1,
                contentArray: [
                    {
                        panelTitle : '公司简介',
                        panelDesc : '1公司简介'
                    },
                    {
                        panelTitle : '企业文化',
                        panelDesc : '2企业文化'
                    },
                    {
                        panelTitle : '资质荣誉',
                        panelDesc : '3资质荣誉'
                    },
                    {
                        panelTitle : '商务合作',
                        panelDesc : '4商务合作'
                    },
                    {
                        panelTitle : '联系我们',
                        panelDesc : '4联系我们'
                    }
                ],
                productMsg: '',
                picUrl: 'https://resource.smartisan.com/resource/47c62043cd795ca067db4d3d569a9a29.jpg',
                error: false,
                loading: false,
            };
        },
        methods: {
            // 导航栏文字样式改变
            changePage(v) {
                this.choosePage = v;
            },
            changeContent(i,item){
                this.changePage(i)
                this.productMsg = item.panelDesc
            }

        },
        mounted() {
            // productHome().then(res => {
            //     if (res.success === false) {
            //         this.error = true;
            //         return;
            //     }
            //     let data = res.result;
            //     this.home = data;
            //     this.loading = false;
            //     for (let i = 0; i < data.length; i++) {
            //         if (data[i].type === 0) {
            //             this.banner = data[i].panelContents;
            //         }
            //     }
            // });
        },
        created() {
            this.changeContent(0,this.contentArray[0])
        },
        components: {

        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .home {
        display: flex;
        flex-direction: column;
    }
    .nav-list {
        background-color: #f6f6f6;
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
                padding: 10px 0;
                .bg-col {
                    width: 150px;
                    &.change {
                        background: url(../../assets/images/circle.png) no-repeat right center;
                    }
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


    .no-info {
        padding: 100px 0;
        text-align: center;
        font-size: 30px;
        display: flex;
        flex-direction: column;
        .no-data {
            align-self: center;
        }
    }

    .banner,
    .banner span,
    .banner div {
        font-family: "Microsoft YaHei";
        transition: all 0.3s;
        transition-timing-function: linear;
    }

    .banner {
        cursor: pointer;
        perspective: 3000px;
        position: relative;
        z-index: 19;
        margin: 0 auto;
        width: 100%;
    }

    .bg {
        position: relative;
        width: 100%;
        height: 420px;
        margin: 0 auto;
        background-size: 100% 100%;
        border-radius: 10px;
        transform-style: preserve-3d;
        transform-origin: 50% 50%;
        transform: rotateY(0deg) rotateX(0deg);
        & div {
            position: relative;
            height: 100%;
            width: 100%;
        }
    }

    .img1 {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        border-radius: 10px;
    }
</style>
