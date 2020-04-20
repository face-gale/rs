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
                    <el-col :span="6">
                        <div class="bg-col">
                            <a>门铃解决方案</a>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="bg-col">
                            <a>摄像头解决方案</a>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="bg-col">
                            <a>摄像头解决方案</a>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="bg-col">
                            <a>门锁头解决方案</a>
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
    import YShelf from "../../components/shelf";
    // import product from '../../components/product'
    import mallGoods from "../../components/mallGoods";
    import {productHome} from "../../api";
    // import { setStore, getStore } from '/utils/storage.js'
    export default {
        data() {
            return {
                choosePage: -1,
                picUrl: 'https://resource.smartisan.com/resource/47c62043cd795ca067db4d3d569a9a29.jpg',
                productMsg: '<h2>公租房门锁解决方案</h2>\n' +
                    '                    </div>\n' +
                    '                    <div class="right_body">\n' +
                    '                    \t <div class="ChannelContent"><br />\n' +
                    '公共租赁住房（简称&ldquo;公租房&rdquo;）作为一种新型保障性住房，近几年在全国各地得到了很大的发展。大部分公租房还是采用机械门锁，无法为住户带来方便，更由于没有规范的管理系统，无法统计租户信息，无法实时在线管理，造成人员混杂，浪费人力物力财力。如何杜绝&ldquo;开豪车住保障房&rdquo;，如何预防&ldquo;入住人员与实际申请人员不符&rdquo;，如何避免&ldquo;房租长期拖欠、租金无法收取&rdquo;，如何防止&ldquo;私配钥匙&rdquo;是目前公租房管理面临的较大挑战。<br />\n' +
                    '<br />\n' +
                    '中科易安公租房联网智能锁解决方案，将联网锁引入公租房管理工作中，为打造智慧公租房打下夯实的基础。平台系统采用B/S软件架构设计，利用分布式技术，支持多个公租区域无线智能门锁的大规模组网，保证系统运行稳定。<br />\n' +
                    '<br />\n' +
                    '系统由无线智能门锁、智能网关、物联网管理平台组成，通过与公租房管理系统无缝对接，对每把门锁进行实时状态监控，实现开门授权、安全防控、数据统计、巡更管理等功能，较大地减少公租房管理人员工作量，从而实现对公租房的有效监管。<br />\n' +
                    '<br />\n' +
                    '<br />\n' +
                    '<strong><span style="font-size:18px;">方案特点</span></strong><br />\n' +
                    '&nbsp;<br />\n' +
                    '　　<strong>智能管控</strong><br />\n' +
                    '　　通过平台实现密码、身份证、指纹授权的远程下发，集中有效管理入住人员。利用平台对联网智能锁有效管理，实现用户管理和收费的统一，对逾期未缴费的用户可远程限制智能锁的使用，从而确保费用收取。临时密码功能方便管理、方便住房。平台拥有强大的联网管理功能，能对分散在不同区域、不同位置的公租房智能锁进行集中管理。<br />\n' +
                    '&nbsp;<br />\n' +
                    '　　<strong>节省成本</strong><br />\n' +
                    '　　摒弃传统机械门锁、钥匙管理方式，避免了更换租客带来的钥匙收回、甚至须更换门锁的尴尬，较大了减少了成本，提高了效率，省时省力省钱。<br />\n' +
                    '&nbsp;<br />\n' +
                    '　　<strong>预警报警</strong><br />\n' +
                    '　　管理平台实时掌握设备运行状况，长期未使用的房屋，系统自动发出预警信号。通过智能锁的联动报警功能，为打造平安社区、平安公租房提供技防保障，给租户带来较好的安全感。<br />\n' +
                    '&nbsp;<br />\n' +
                    '　　<strong>形象提升</strong><br />\n' +
                    '　　指纹密联网智能锁引入公租房，实现智慧公租房管理，也是电子政务在民生领域的有力践行，不但便于管理，有效提升公租房的形象，也使租户通过智能锁的使用提前享受智慧家居生活。<br />\n' +
                    '<br />\n' +
                    '<br />',

                error: false,
                banner: [],
                mark: 0,
                home: [],
                loading: false,
            };
        },
        methods: {
            changePage(v) {
                this.choosePage = v;
            },

            change(i) {
                this.mark = i;
            },
        },
        mounted() {
            productHome().then(res => {
                if (res.success === false) {
                    this.error = true;
                    return;
                }
                let data = res.result;
                this.home = data;
                this.loading = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type === 0) {
                        this.banner = data[i].panelContents;
                    }
                }
            });
        },
        created() {
            this.play();
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
        background-color: #f9fafc;
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
                background-color: #f9fafc;
                .bg-col {
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
        height: 500px;
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
