<!-- bounty -->
<template>
  <div class="startup-bounty">
    <!-- new bounty -->
    <a-row type="flex" justify="end">
      <a-col :span="5" style="text-align: right;">
        <a-button style="width: 145px; height: 42px;" type="primary" block @click="newBounty"
          >+ New Bounty</a-button
        >
      </a-col>
    </a-row>
    <section class="bounty-list">
      <bounty-list :fetchData="fetchData">
        <template v-slot:closeBtn="slotProps">
          <div class="ml-auto flex ai-center">
            <template
              v-if="slotProps.bounty.status !== 2 && slotProps.bounty.transactionState === 2"
            >
              <a-popconfirm
                title="Are you sure to close bounty？"
                ok-text="Yes"
                cancel-text="No"
                @confirm.stop="confirmCloseBounty(slotProps.bounty)"
              >
                <a>Close Bounty</a>
              </a-popconfirm>
            </template>
          </div>
        </template>

        <template v-slot:hunterInfo="slotProps">
          <div class="hunter-info" v-if="slotProps.bounty.hunters.length > 0">
            <a-collapse expand-icon-position="right">
              <a-collapse-panel key="1" :header="'Hunter' + ' ' + slotProps.bounty.hunters.length">
                <a-list
                  class="demo-loadmore-list"
                  item-layout="horizontal"
                  :data-source="slotProps.bounty.hunters"
                >
                  <a-list-item slot="renderItem" slot-scope="item">
                    <template v-if="item.status === 2">
                      <a slot="actions" style="color: #6170ff;">
                        <a-popconfirm
                          title="Are you sure to pay?"
                          ok-text="Submit"
                          cancel-text="No"
                          @confirm="payBounty(slotProps.bounty.id, item)"
                        >
                          <span>
                            Pay
                          </span>
                        </a-popconfirm>
                      </a>
                      <a slot="actions" style="color: #d80000;">
                        <a-popconfirm
                          title="Are you sure to reject?"
                          ok-text="Submit"
                          cancel-text="No"
                          @confirm="rejectBounty(slotProps.bounty.id, item)"
                        >
                          <span>
                            Reject
                          </span>
                        </a-popconfirm>
                      </a>
                    </template>
                    <template v-else-if="item.status === 3">
                      <span slot="actions">
                        Paid
                      </span>
                    </template>
                    <template v-else-if="item.status === 5">
                      <span slot="actions">
                        Rejected
                      </span>
                    </template>
                    <template v-else-if="item.status === 4">
                      <span slot="actions">
                        Quited
                      </span>
                    </template>
                    <template v-else>
                      <a slot="actions"> -- </a>
                    </template>

                    <a-list-item-meta>
                      <a slot="title">
                        <span @click="toMyInfo(item)">
                          {{ item.name }}
                        </span>
                      </a>
                    </a-list-item-meta>
                    <div>{{ getStatusInfo(item) }}</div>
                  </a-list-item>
                </a-list>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </template>
      </bounty-list>
    </section>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import BountyList from '@/components/bounty-list/BountyList';
// import { getStartUpBounties, paidBounty, rejectedBounty, closeBounty } from '@/services';
import moment from 'moment';
import services from '@/services';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    BountyList
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    newBounty() {
      this.$router.push({
        name: 'newBounty',
        query: { startupId: this.$route.params.id }
      });
    },

    /**
     * @description 获取数据
     * @param query
     * @returns {Promise<*>}
     */
    async fetchData(query) {
      const { error, data } = await services['cores@startup-bounty-列表'](
        { startupId: this.$route.params.id },
        query
      );
      return error ? [[], 0] : [data.result, data.total];
    },

    /** 翻译bounty的状态信息  */
    getStatusInfo(hunterInfo) {
      let hunterStatusStr = '';

      if (hunterInfo) {
        if (hunterInfo.quitedAt && hunterInfo.status === 4) {
          hunterStatusStr = `Quited (${moment(hunterInfo.quitedAt).format('YYYY-MM-DD')})`;
        } else if (hunterInfo.paidAt && hunterInfo.status === 3) {
          hunterStatusStr = `Paid (${moment(hunterInfo.paiedAt).format('YYYY-MM-DD')})`;
        } else if (hunterInfo.startedAt && hunterInfo.status === 1) {
          hunterStatusStr = `Start Work (${moment(hunterInfo.startedAt).format('YYYY-MM-DD')})`;
        } else if (hunterInfo.submittedAt && hunterInfo.status === 2) {
          hunterStatusStr = `Submitted (${moment(hunterInfo.submittedAt).format('YYYY-MM-DD')})`;
        } else if (hunterInfo.rejectedAt && hunterInfo.status === 5) {
          hunterStatusStr = `rejectedAt (${moment(hunterInfo.rejectedAt).format('YYYY-MM-DD')})`;
        } else {
          hunterStatusStr = '--';
        }
      }
      return hunterStatusStr;
    },

    /* 前往我的bounty 信息页面 */
    toMyInfo(hunterInfo) {
      this.$router.push({ name: 'bountyHome', params: { userId: hunterInfo.userId } });
    },

    /* 支付bounty */
    async payBounty(bountyId, hunter) {
      try {
        // const res = await paidBounty(bountyId, { userId: hunter.userId });

        const { error } = await services['cores@bounty-paid'](
          { bountyId },
          { userId: hunter.userId }
        );
        const res = !error;
        if (res) {
          hunter.status = res.status;
        }
      } catch (error) {
        console.error(error);
      }
    },

    /* bounty创建者拒绝 hunter */
    async rejectBounty(bountyId, hunter) {
      try {
        // const res = await rejectedBounty(bountyId, { userId: hunter.userId });

        const { error } = await services['cores@bounty-rejected'](
          { bountyId },
          { userId: hunter.userId }
        );
        const res = !error;
        if (res) {
          hunter.status = res.status;
        }
      } catch (error) {
        console.error(error);
      }
    },

    /** 确定关闭bounty */
    async confirmCloseBounty(bounty) {
      if (bounty) {
        const id = bounty.id;
        try {
          // const isClosed = await closeBounty(id);
          const { error } = await services['cores@bounty-closed']({ bountyId: id });
          const isClosed = !error;

          if (isClosed) {
            bounty.status = 2;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.startup-bounty {
  padding-top: 42px;
  padding-right: 100px;
  padding-left: 100px;
  .bounty-list {
    margin-top: 20px;
    min-height: 500px;
    .hunter-info {
      width: 100%;

      /deep/ .ant-collapse {
        border: none;
      }

      /deep/ .ant-collapse-header {
        height: 54px;
        padding: 0 30px 0 32px;
        font-size: 16px;
        justify-content: space-between;
        display: flex;
        align-items: center;
        background-color: #f3f3f3;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #6170ff;
      }

      /deep/ .ant-collapse-content {
        background-color: #f3f3f3;
        border-top: unset;
        padding: 0 20px;
      }

      // /deep/ .ant-list-item-meta {
      //   flex: unset;
      //   min-width: 20%;
      // }
    }
  }
}
</style>
