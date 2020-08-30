<!-- Bounty list -->
<template>
  <div id="bounty-list">
    <a-spin size="large" :spinning="loading">
      <div class="bounty-list flex-column">
        <bounty-card v-for="bounty in bounties" :key="bounty.id" :bounty="bounty"></bounty-card>
        <a-empty v-if="!loading && !bounties.length" />
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
import { getBounties } from '@/services';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    BountyCard
  },
  props: {
    startupId: {
      required: false,
      type: String
    },
    type: {
      required: false, // TODO 需要改成true
      type: String
    }
  },
  data() {
    // 这里存放数据
    return {
      // 加载中
      loading: false,
      search: {
        offset: 0,
        limit: 10
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
        const [data, total] = await getBounties(this.search, this.startupId, this.type);
        this.bounties = data;
        this.total = total;
      } catch (error) {
        console.log('%c  error: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', error);
      } finally {
        this.loading = false;
      }
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
</style>
