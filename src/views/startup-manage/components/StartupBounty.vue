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
                    <template v-if="slotProps.bounty.status === 2">
                      <a slot="actions" style="color: #6170ff;">
                        <span @click="payBounty(slotProps.bounty.id)">
                          Pay
                        </span>
                      </a>
                      <a slot="actions" style="color: #d80000;">
                        <span @click="rejectBounty(slotProps.bounty.id)">
                          Reject
                        </span>
                      </a>
                    </template>
                    <template v-else-if="slotProps.bounty.status === 3">
                      <span slot="actions">
                        Paid
                      </span>
                    </template>
                    <template v-else-if="slotProps.bounty.status === 5">
                      Rejected
                    </template>
                    <template v-else-if="slotProps.bounty.status === 4">
                      Quited
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
                    <div>{{ getStatusInfo(item, slotProps.bounty.status) }}</div>
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
import { getStartUpBounties, paidBounty, rejectedBounty } from '@/services';
import moment from 'moment';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    BountyList
  },
  props: {
    startupId: {
      type: String,
      required: true
    }
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
        query: { startupId: this.startupId }
      });
    },

    /**
     * @description 获取数据
     * @param query
     * @returns {Promise<*>}
     */
    async fetchData(query) {
      const [data, total] = await getStartUpBounties(this.startupId, query);
      return [data, total];
    },

    /** 翻译bounty的状态信息  */
    getStatusInfo(hunterInfo, status) {
      let hunterStatusStr = '';

      if (hunterInfo) {
        if (hunterInfo.quitedAt && status === 4) {
          hunterStatusStr = `Quited (${moment(hunterInfo.quitedAt).format('YYYY-MM-DD')})`;
        } else if (hunterInfo.paidAt && status === 3) {
          hunterStatusStr = `Paid (${moment(hunterInfo.paiedAt).format('YYYY-MM-DD')})`;
        } else if (hunterInfo.startedAt && status === 1) {
          hunterStatusStr = `Start Work (${moment(hunterInfo.startedAt).format('YYYY-MM-DD')})`;
        } else if (hunterInfo.submittedAt && status === 2) {
          hunterStatusStr = `Submitted (${moment(hunterInfo.submittedAt).format('YYYY-MM-DD')})`;
        } else if (hunterInfo.rejectedAt && status === 5) {
          hunterStatusStr = `Submitted (${moment(hunterInfo.rejectedAt).format('YYYY-MM-DD')})`;
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
    async payBounty(bountyId) {
      try {
        const res = await paidBounty(bountyId);
        if (res) {
          this.fetchData();
        }
      } catch (error) {
        console.error(error);
      }
    },

    /* bounty创建者拒绝 hunter */
    async rejectBounty(bountyId) {
      try {
        const res = await rejectedBounty(bountyId);
        if (res) {
          this.fetchData();
        }
      } catch (error) {
        console.error(error);
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

      /deep/ .ant-list-item-meta {
        flex: unset;
        min-width: 20%;
      }
    }
  }
}
</style>
