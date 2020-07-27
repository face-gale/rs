<template>
  <div class="goods">
        <div class="nav">
          <div class="w">
            <tree-select
                    :props="props"
                    :options="optionData"
                    :value="valueId"
                    :clearable="isClearable"
                    :accordion="isAccordion"
                    @getValue="getValue($event)"
            />
            ID为：{{valueId}}
<!--            <a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>-->
<!--            <a href="javascript:;" @click="sortByPrice(1)" :class="{active:sortType===2}">价格从低到高</a>-->
<!--            <a href="javascript:;" @click="sortByPrice(-1)" :class="{active:sortType===3}">价格从高到低</a>-->
<!--            <div class="price-interval">-->
<!--              <input type="number" class="input" placeholder="价格" v-model="min">-->
<!--              <span style="margin: 0 5px"> - </span>-->
<!--              <input type="number" placeholder="价格" v-model="max">-->
<!--              <y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>-->
<!--            </div>-->
          </div>
        </div>

    <div
      v-loading="loading"
      element-loading-text="加载中..."
      style="min-height: 35vw;"
    >
      <div class="img-item" v-if="!noResult">
        <!--商品-->
        <div class="goods-box w">
          <mall-goods
            v-for="(item, i) in goods"
            :key="i"
            :msg="item"
          ></mall-goods>
        </div>
        <!--<el-pagination
                v-if="!noResult&&!error"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[8, 20, 40, 80]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>-->
      </div>
      <div class="no-info" v-if="noResult">
        <div class="no-data">
          <img src="/static/images/no-search.png" />
          <br />
          抱歉！暂时还没有商品
        </div>
        <section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods
                :msg="item"
                v-for="(item, i) in recommendPanel.panelContents"
                :key="i"
              ></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
      <div class="no-info" v-if="error">
        <div class="no-data">
          <img src="/static/images/error.png" />
          <br />
          抱歉！出错了...
        </div>
        <section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods
                :msg="item"
                v-for="(item, i) in recommendPanel.panelContents"
                :key="i"
              ></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { recommend } from "../../api";
// import YButton from "../../components/YButton";
import YShelf from "../../components/shelf";
import TreeSelect from "../../components/tree-select";
import mallGoods from "../../components/mallGoods";
import {getAllGoods} from "../../api/goods";

export default {
  components: {
    mallGoods,
    // YButton,
    TreeSelect,
    YShelf
  },
  data() {
    return {
      goods: {},
      noResult: false,
      error: false,
      min: "",
      max: "",
      loading: false,
      timer: null,
      sortType: 1,
      windowHeight: null,
      windowWidth: null,
      recommendPanel: [],
      sort: "",
      currentPage: 1,
      total: 0,
      pageSize: 20,
      ////////////
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: 1, // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children"
        // disabled:true
      },
      // 选项列表（必选）
      list: [
        { id: 1, parentId: 0, name: "一级菜单A", rank: 1 },
        { id: 2, parentId: 0, name: "一级菜单B", rank: 1 },
        { id: 3, parentId: 0, name: "一级菜单C", rank: 1 },
        { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2 },
        { id: 5, parentId: 1, name: "二级菜单A-B", rank: 2 },
        { id: 6, parentId: 2, name: "二级菜单B-A", rank: 2 },
        { id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3 },
        { id: 8, parentId: 7, name: "四级菜单A-A-A-A", rank: 4 },
        { id: 9, parentId: 0, name: "一级菜单C", rank: 1 },
        { id: 10, parentId: 0, name: "一级菜单end", rank: 1 }
      ],
    };
  },
  methods: {
    // _getAllGoods () {
    //   let params = {
    //     params: {
    //       // page: this.currentPage,
    //       // size: this.pageSize,
    //       // sort: this.sort,
    //       // priceGt: this.min,
    //       // priceLte: this.max,
    //       // cid: cid
    //     }
    //   }
    //   getAllGoods(params).then(res => {
    //     if (res.success === true) {
    //       this.total = res.result.total
    //       this.goods = res.result.data
    //       this.noResult = false
    //       if (this.total === 0) {
    //         this.noResult = true
    //       }
    //       this.error = false
    //     } else {
    //       this.error = true
    //     }
    //     this.loading = false
    //   })
    // },

    handleSizeChange(val) {
      this.pageSize = val;
      this._getAllGoods();
      this.loading = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this._getAllGoods();
      this.loading = true;
    },
    _getAllGoods () {
      let cid = this.$route.query.cid
      if (this.min !== '') {
        this.min = Math.floor(this.min)
      }
      if (this.max !== '') {
        this.max = Math.floor(this.max)
      }
      let params = {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          sort: this.sort,
          priceGt: this.min,
          priceLte: this.max,
          cid: cid
        }
      }
      getAllGoods(params).then(res => {
        if (res.success === true) {
          this.total = res.result.total
          this.goods = res.result.data
          this.noResult = false
          if (this.total === 0) {
            this.noResult = true
          }
          this.error = false
        } else {
          this.error = true
        }
        this.loading = false
      })
    },
    // 默认排序
    reset() {
      this.sortType = 1;
      this.sort = "";
      this.currentPage = 1;
      this.loading = true;
      this._getAllGoods();
    },
    // 价格排序
    sortByPrice(v) {
      v === 1 ? (this.sortType = 2) : (this.sortType = 3);
      this.sort = v;
      this.currentPage = 1;
      this.loading = true;
      this._getAllGoods();
    },
    // 取值
    getValue(value) {
      this.valueId = value;
      console.log(this.valueId);
    }
  },
  watch: {
    $route(to, from) {
      if (to.fullPath.indexOf("/goods?cid=") >= 0) {
        this.cId = to.query.cid;
        this._getAllGoods();
      }
    }
  },
  created() {
    // this._getAllGoods();
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this._getAllGoods()
    // recommend().then(res => {
    //   let data = res.result.data;
    //   this.recommendPanel = data[0];
    // });
  },
  computed: {
    /* 转树形数据 */
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    }
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";

.goods {
  display: flex;
  flex-direction: column;
}
.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 15px;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type=number] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  > div {
    float: left;
    border: 1px solid #efefef;
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

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
</style>
