<!-- Bounty list -->
<template>
  <div id="bounty-list">
    <!-- search -->
    <a-input-search
      v-if="searchable"
      v-model="search.keyword"
      size="large"
      class="flex-1"
      placeholder="Search by bounty title"
      @search="getBounties"
    />

    <a-spin size="large" :spinning="loading">
      <div class="bounty-list flex-column">
        <bounty-card v-for="bounty in bounties" :key="bounty.id" @click.native="goToDetail(bounty)">
          <div class="bounty-info" slot="bounty-info">
            <div class="flex">
              <div class="title">
                {{ bounty.title }}
              </div>

              <a-button
                class="currency-btn"
                v-for="payment of bounty.payments"
                :key="payment.token"
              >
                {{ payment.value }} {{ payment.token }}
              </a-button>
            </div>
            <div class="flex" style="margin-top: 44px">
              <a-button-group class="flex">
                <a-button>
                  Comunion
                </a-button>
              </a-button-group>
              <ul class="state-info">
                <li class="state">Status: {{ getBountyStatus(bounty.status) }}</li>
                <!-- <li class="hours">11 Hours left</li> -->
                <li class="hunters">{{ bounty.hunters.length }} Hunters</li>
                <!-- <li class="paied">1 Paied</li> -->
              </ul>
              <!-- <div class="ml-auto flex ai-center">Closed Bounty</div> -->
            </div>
          </div>

          <!-- <div class="hunter-info" slot="hunter-info">
            <div>
              <a-collapse expand-icon-position="right" :bordered="false">
                <a-collapse-panel key="1" header="Hunter: 5">
                  <p>hello panel</p>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </div> -->
        </bounty-card>
        <div class="empty">
          <a-empty v-if="!loading && !bounties.length" />
        </div>

        <div class="flex jc-center mt-20">
          <com-pagination
            :limit.sync="search.limit"
            :offset.sync="search.offset"
            :total="total"
            @change="getBounties"
          />
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import BountyCard from './BountyCard';
import { bountyStatus } from '@/filters/bounty';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    BountyCard
  },
  props: {
    fetchData: {
      type: Function,
      required: true
    },
    // 是否显示搜索框
    searchable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    // 这里存放数据
    return {
      // 加载中
      loading: false,
      search: {
        offset: 0,
        limit: 10,
        keyword: ''
      },
      total: 0,
      bounties: []
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getBounties() {
      this.loading = true;
      try {
        const [data, total] = await this.fetchData(this.search); //  await getBounties(this.search, this.startupId, this.type);
        this.bounties = data;
        console.log('%c\n  this.bounties :::->', 'background: pink;', this.bounties);
        this.total = total;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    goToDetail(bounty) {
      this.$router.push({ name: 'bountyDetail', params: { id: bounty.id } });
    },

    getBountyStatus(status) {
      return bountyStatus(status);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getBounties();
  },
  // 生命周期 - 创建之前
  beforeCreate() {},
  // 生命周期 - 挂载之前
  beforeMount() {},
  // 生命周期 - 更新之前
  beforeUpdate() {},
  // 生命周期 - 更新之后
  updated() {},
  // 生命周期 - 销毁之前
  beforeDestroy() {},
  // 生命周期 - 销毁完成
  destroyed() {},
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.bounty-list {
  margin-top: 20px;

  .bounty-info {
    cursor: pointer;
    .title {
      width: 594px;
      line-height: 20px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }

    .currency-btn {
      border: none;
      line-height: 12px;
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #6170ff;
      &:last-child {
        color: #ffad4d;
      }
      &:first-child {
        margin-left: auto;
        color: #6170ff;
      }
    }
  }
}
.empty {
  margin-top: 20px;
}
</style>
