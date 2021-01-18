<template>
  <div class="disco-swap">
    <router-view v-if="$route.matched.length > 3" :startup="startup" />

    <template v-else>
      <MyCard :status="status" type="disco" @onClick="discoOnClick" />
      <MyCard :status="status" type="exchange" @onClick="exchangeOnClick" />
    </template>
    <!-- 第一次进入 -->
    <!-- <MyCard status="0" type="disco" />
    <MyCard status="0" type="exchange" /> -->
    <!-- DISCO募资合约生成中 -->
    <!-- <MyCard status="1" type="disco" />
    <MyCard status="1" type="exchange" /> -->
    <!-- DISCO募资合约生成成功 -->
    <!-- <MyCard status="2" type="disco" />
    <MyCard status="2" type="exchange" /> -->
    <!-- DISCO募资合约生成失败 -->
    <!-- <MyCard status="3" type="disco" />
    <MyCard status="3" type="exchange" /> -->
    <!-- DISCO提交后pending -->
    <!-- <MyCard status="4" type="disco" />
    <MyCard status="4" type="exchange" /> -->
    <!-- DISCO提交后失败 -->
    <!-- <MyCard status="5" type="disco" />
    <MyCard status="5" type="exchange" /> -->
    <!-- DISCO提交后成功，募资等待开始 -->
    <!-- <MyCard status="6" type="disco" />
    <MyCard status="6" type="exchange" /> -->
    <!-- DISCO提交成功-募资成功 -->
    <!-- <MyCard status="7" type="disco" />
    <MyCard status="7" type="exchange" /> -->
    <!-- DISCO提交成功-募资失败 -->
    <!-- <MyCard status="8" type="disco" />
    <MyCard status="8" type="exchange" /> -->
    <!-- DISCO提交成功，募资进行中 -->
    <!-- <MyCard status="9" type="disco" />
    <MyCard status="9" type="exchange" /> -->
    <!-- Exchange注入中 -->
    <!-- <MyCard status="10" type="disco" />
    <MyCard status="10" type="exchange" /> -->
    <!-- exchange注入成功 -->
    <!-- <MyCard status="11" type="disco" />
    <MyCard status="11" type="exchange" /> -->
    <!-- exchange注入失败 -->
    <!-- <MyCard status="12" type="disco" />
    <MyCard status="12" type="exchange" /> -->
    <!-- DISCO提交成功-募资结束等待结果 -->
    <!-- <MyCard status="13" type="disco" />
    <MyCard status="13" type="exchange" /> -->
  </div>
</template>

<script>
import services from '@/services';
import MyCard from './DISCOSwap/MyCard';
export default {
  data() {
    return {
      // 自定义的DISCO&Swap的状态指
      status: '0'
    };
  },
  props: {
    startup: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    MyCard
  },
  mounted() {
    // 获取DISCO&Swap状态
    this.getDiscoSwapState();
  },
  methods: {
    // 获取disco swap状态
    async getDiscoSwapState() {
      let { error, data } = await services['cores@startup-disco和swap状态']({
        startupId: this.startup.id
      });
      if (!error) {
        const { discoState, swapState } = data;
        this.updateStatus(discoState, swapState);
      }
    },
    // 更新status的值
    updateStatus(discoState, swapState) {
      // let status = '0';
      if (discoState === -1 && swapState === -1) {
        // 第一次进入
        this.status = '0';
      } else if (swapState === 0) {
        // Exchange注入中
        this.status = '10';
      } else if (swapState === 1) {
        // exchange注入成功
        this.status = '11';
      } else if (swapState === 2) {
        // exchange注入失败
        this.status = '12';
      } else if (discoState === 0) {
        // DISCO募资合约生成中
        this.status = '1';
      } else if (discoState === 1) {
        // DISCO募资合约生成成功，等待开启
        this.status = '2';
      } else if (discoState === 2) {
        // DISCO募资合约生成失败
        this.status = '3';
      } else if (discoState === 3) {
        // DISCO提交后，开启募资中
        this.status = '4';
      } else if (discoState === 4) {
        // DISCO提交后成功，募资等待开始
        this.status = '6';
      } else if (discoState === 5) {
        // DISCO提交成功-募资成功
        this.status = '7';
      } else if (discoState === 6) {
        // DISCO提交成功-募资失败
        this.status = '8';
      } else if (discoState === 7) {
        // DISCO提交成功，募资进行中
        this.status = '9';
      } else if (discoState === 8) {
        // DISCO提交成功-募资结束等待结果
        this.status = '13';
      }
    },
    discoOnClick() {
      console.log(this.status);
      if (
        this.status === '0' ||
        this.status === '3' ||
        this.status === '12' ||
        this.status === '2'
      ) {
        // 当第一次进入 或者 创建募资合约失败 或者 exchange注入失败 或者 创建合约成功，等待开启时
        // 显示合约表单页面
        this.$router.push({
          name: 'startupManagementDiscoForm',
          params: { status: this.status }
        });
      } else if (
        this.status === '6' ||
        this.status === '7' ||
        this.status === '8' ||
        this.status === '9' ||
        this.status === '13'
      ) {
        // 当状态为等待募资开始 或者 募资成功 或者 募资失败 或者 募资进行中时
        // 显示disco详情页面
        this.$router.push({ name: 'startupManagementDiscoDetail' });
      }
    },
    exchangeOnClick() {
      if (
        this.status === '0' ||
        this.status === '3' ||
        this.status === '8' ||
        this.status === '12'
      ) {
        // 当第一次进入 或者 创建募资合约失败 或者 募资失败 或者 exchange注入失败时
        // 显示增加流动性页面
        this.createExchangeOnClick();
      } else if (this.status === '7' || this.status === '11') {
        // 当募资成功 或者 exchange注入成功时
        // 跳转到对应startup的swap页面
        this.gotoStartupSwapView();
      }
    },
    // 跳转到对应startup的swap页面
    gotoStartupSwapView() {
      // TODO...
    },
    // 创建exchange按钮被点击
    createExchangeOnClick() {
      this.$confirm({
        title: 'Tips',
        okText: 'Confirm',
        content: h => (
          <div>
            If you actively open exchange, you can not to enable DISCO,Sure to create exchange?
          </div>
        ),
        onOk: () => {
          this.$router.push({ name: 'startupManagementCreateExchange' });
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@discoColor: #6170ff;
@exchangeColor: #f6af64;
.disco-swap {
  // padding: 30px;
  position: relative;
}
</style>
