<template>
  <!-- hunter bounty 列表页面 -->
  <div id="hunter-bounty">
    <section class="bounty-list">
      <bounty-list :fetchData="fetchData"></bounty-list>
    </section>
  </div>
</template>

<script>
import { getStartupMeBounties } from '@/services';
import BountyList from '@/components/bounty-list/BountyList';

export default {
  name: 'Bounty',
  components: {
    BountyList
  },
  methods: {
    async fetchData(query) {
      const [data, total] = await getStartupMeBounties(query);
      return [data, total];
    }
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
