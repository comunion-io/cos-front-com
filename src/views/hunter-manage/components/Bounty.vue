<template>
  <!-- hunter bounty 列表页面 -->
  <div id="hunter-bounty">
    <section class="bounty-list">
      <bounty-list :fetchData="fetchData"></bounty-list>
    </section>
  </div>
</template>

<script>
import { getBountiesForHunter } from '@/services';
import BountyList from '@/components/bounty-list/BountyList';

export default {
  name: 'Bounty',
  components: {
    BountyList
  },
  data() {
    return {
      // TODO hunter id 需要路由的方式传递
      hunterId: 0
    };
  },
  methods: {
    async getBounties(query) {
      const [data, total] = await getBountiesForHunter(this.hunterId, query);
      return [data, total];
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
