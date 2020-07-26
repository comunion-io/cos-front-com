<template>
  <a-card id="hunter-manage" :bordered="false" style="margin-bottom: 24px;">
    <h1 class="title">HunterManage</h1>
    <section class="content">
      <a-tabs>
        <a-tab-pane key="1" tab="Hunter">
          <Hunter />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Bounty">
          <Bounty />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Proposal" disabled>
          <!--  TODO-->
        </a-tab-pane>
      </a-tabs>
    </section>
  </a-card>
</template>

<script>
import Bounty from '@/views/hunter-manage/components/Bounty';
import Hunter from '@/views/hunter-manage/components/Hunter';
export default {
  name: 'hunter-manage',
  components: { Hunter, Bounty },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="less">
#hunter-manage {
  .title {
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 24px;
    text-align: center;
  }

  .content {
    margin: 0 auto;
    width: 60%;
    max-width: 640px;
    min-width: 240px;
  }
}
</style>
