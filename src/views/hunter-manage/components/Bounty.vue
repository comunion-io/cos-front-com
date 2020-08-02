<template>
  <div id="hunter-bounty">
    <!-- 搜索框 -->
    <div class="search">
      <a-input-search
        v-model="search.keyword"
        size="large"
        class="flex-1"
        placeholder="Search..."
        @search="getBounties"
      />
    </div>
    <section class="bounty-list">
      <bounty-list></bounty-list>
    </section>
  </div>
</template>

<script>
import { getBounties } from '@/services';
import BountyList from '../../startup-manage/components/BountyList.vue';

export default {
  name: 'Bounty',
  components: {
    BountyList
  },
  data() {
    return {
      // 搜索条件
      search: {
        offset: 0,
        limit: 10,
        keyword: ''
      },
      bounties: []
    };
  },
  methods: {
    async getBounties() {
      // TODO: 接口还没有提供我接收到的bounty
      this.bounties = await getBounties();
    }
  },
  mounted() {
    this.getBounties();
  }
};
</script>

<style scoped lang="less">
#hunter-bounty {
  .bounty-list {
    margin-top: 40px;
    min-height: 500px;
  }
}
</style>
