<template>
  <!-- bounty 的主页面 -->
  <div id="bounty">
    <div class="total">
      <div class="noti-icon flex-inline ai-center jc-center">
        <a-icon type="notification" />
      </div>
      <span class="num">{{ total }}&nbsp; Bounties</span>in the Comunion.
    </div>

    <!-- 显示 bounty-->
    <section class="bounties">
      <bounty-list :fetchData="fetchData" @goDetail="goDetail"></bounty-list>
    </section>
  </div>
</template>

<script>
import { getHomeBounties } from '@/services';
import BountyList from '@/components/bounty-list/BountyList';

export default {
  name: 'Bounty',
  components: {
    BountyList
  },
  data() {
    return {
      total: 0,
      // 搜索条件
      search: {
        offset: 0,
        limit: 10,
        keyword: ''
      }
    };
  },
  methods: {
    async fetchData() {
      const [data, total] = await getHomeBounties(this.search);
      this.total = total;
      return [data, total];
    },

    /**
     * @description 点击以后， 前往详情页面
     */
    goDetail(bounty) {
      // TODO 前往bounty 详情页
      console.log('bounty:::', bounty);
    }
  }
};
</script>

<style scoped lang="less">
#bounty {
  background: rgba(242, 243, 244, 1);
  min-height: calc(100vh - 70px);
  padding: 28px 220px 0 220px;
  .noti-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #dce0fe;
    .anticon {
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: @primary-color;
    }
  }
  .total {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;

    img {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }

    .num {
      margin: 0 0.5em 0 1em;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
  }
  .bounties {
    margin-top: 30px;
    min-height: 240px;
  }
}
</style>
