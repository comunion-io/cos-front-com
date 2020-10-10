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
        <bounty-card v-for="(bounty, index) in bounties" :key="bounty.id" :bounty="bounty">
          <template v-slot:cardFooter>
            <slot name="cardFooter" v-bind:bounty="bounty" v-bind:index="index"></slot>
          </template>
          <template v-slot:hunterInfo>
            <slot name="hunterInfo" v-bind:bounty="bounty"></slot>
          </template>
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
    // 方便父组件调用该方法设置bounties的值
    setBounties(bounties) {
      this.bounties = bounties;
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
}
.empty {
  margin-top: 20px;
}
</style>
