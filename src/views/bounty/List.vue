<template>
  <!-- bounty 的主页面 -->
  <div id="bounty">
    <div class="total flex ai-center">
      <div class="noti-icon flex-inline ai-center jc-center">
        <!-- <a-icon type="notification" /> -->
        <img src="@/assets/images/money_pocket@2x.png" />
      </div>
      <span class="ml-16 mr-8 t-bold" style="color:#000">{{ total }}&nbsp; Bounties</span>in the
      Comunion.
    </div>

    <!-- 显示 bounty-->
    <section class="bounties">
      <bounty-list :fetchData="fetchData"></bounty-list>
    </section>
  </div>
</template>

<script>
// import { getHomeBounties } from '@/services';
import BountyList from '@/components/bounty-list/BountyList';
import services from '@/services';

export default {
  name: 'Bounty',
  components: {
    BountyList
  },
  data() {
    return {
      total: 0
    };
  },
  methods: {
    async fetchData(query) {
      // const [data, total] = await getHomeBounties(query);
      const { error, data } = await services['cores@bounty-列表'](query);
      this.total = error ? 0 : data.total;
      return error ? [[], 0] : [data.result, data.total];
    }
  }
};
</script>

<style scoped lang="less">
#bounty {
  background: rgba(242, 243, 244, 1);
  min-height: calc(100vh - 70px);
  padding: 28px 150px 0 150px;
  .noti-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #ffd7c8;
    img {
      width: 20px;
      height: 20px;
    }
  }
  // .total {
  //   display: flex;
  //   flex-direction: row;
  //   align-items: center;
  //   justify-content: flex-start;
  //   margin-bottom: 20px;

  //   img {
  //     width: 38px;
  //     height: 38px;
  //     margin-right: 10px;
  //   }

  //   .num {
  //     margin: 0 0.5em 0 1em;
  //     font-size: 14px;
  //     font-family: Microsoft YaHei;
  //     font-weight: bold;
  //     color: rgba(0, 0, 0, 1);
  //   }
  // }
  .bounties {
    margin-top: 30px;
    min-height: 240px;
  }
}
</style>
