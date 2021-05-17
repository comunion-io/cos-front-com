<template>
  <!-- hunter bounty 列表页面 -->
  <div id="hunter-bounty">
    <section class="bounty-list">
      <bounty-list :fetchData="fetchData" ref="bountyList">
        <template v-slot:cardFooter="slotProps">
          <div class="footer">
            <div class="info">{{ getStartInfo(slotProps.bounty) }}</div>
            <div class="handle" v-if="handleVisible(slotProps.bounty)">
              <a-popconfirm
                title="Are you sure to submit ?"
                ok-text="Submit"
                cancel-text="No"
                @confirm="onSubmit(slotProps)"
              >
                <div class="btn submit-btn">Submit</div>
              </a-popconfirm>
              <span class="separator"></span>
              <a-popconfirm
                title="Are you sure to quit ?"
                ok-text="Quit"
                cancel-text="No"
                okType="danger"
                @confirm="onQuit(slotProps)"
              >
                <a-icon slot="icon" type="question-circle-o" style="color: red" />
                <div class="btn quit-btn">Quit</div>
              </a-popconfirm>
            </div>
            <div class="status" v-else>{{ getStatusDesc(slotProps.bounty) }}</div>
          </div>
        </template>
      </bounty-list>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { getStartupMeBounties, quitedBounty, submittedBounty } from '@/services';
import BountyList from '@/components/bounty-list/BountyList';
import services from '@/services';

export default {
  name: 'Bounty',
  components: {
    BountyList
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async fetchData(query) {
      //  const [data, total] = await getStartupMeBounties(query);
      // return [data, total];
      const { error, data } = await services['cores@bounty-列表-我的'](query);
      const [bounties, total] = error ? [[], 0] : [data.result, data.total];
      return [bounties, total];
    },
    // 获取开始时间信息
    getStartInfo(bounty) {
      let hunter = bounty.hunters.find(h => this.user.id === h.userId);
      if (hunter) {
        if (!hunter.startedAt) return '-';
        let date = new Date(hunter.startedAt);
        let year = date.getFullYear();
        let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return `Start work at ${year}-${month}-${day}`;
      }
      return '';
    },
    // 提交
    async onSubmit(slotProps) {
      const { bounty, index } = slotProps;
      // const { error, data } = await submittedBounty(bounty.id);
      const { error, data } = await services['cores@bounty-submitted']({ bountyId: bounty.id });
      if (!error) {
        this.$message.success('Success');
        let bounties = this.$refs.bountyList.bounties;
        for (let i = 0; i < bounties[index].hunters.length; i++) {
          if (bounties[index].hunters[i].userId === this.user.id) {
            bounties[index].hunters[i].status = data.status;
            break;
          }
        }
        this.$refs.bountyList.setBounties(bounties);
      }
    },
    // quit
    async onQuit(slotProps) {
      const { bounty, index } = slotProps;
      // const { error, data } = await quitedBounty(bounty.id);
      const { error, data } = await services['cores@bounty-quited']({ bountyId: bounty.id });
      if (!error) {
        this.$message.success('Success');
        let bounties = this.$refs.bountyList.bounties;
        for (let i = 0; i < bounties[index].hunters.length; i++) {
          if (bounties[index].hunters[i].userId === this.user.id) {
            bounties[index].hunters[i].status = data.status;
            break;
          }
        }
        this.$refs.bountyList.setBounties(bounties);
      }
    },
    // 是否显示提交和退出的操作区域
    handleVisible(bounty) {
      let hunter = bounty.hunters.find(item => item.userId === this.user.id);
      return hunter && hunter.status === 1; // bounty下的hunter状态为开始工作
    },
    // 获取状态描述
    getStatusDesc(bounty) {
      let hunter = bounty.hunters.find(item => item.userId === this.user.id);
      let statusDesc = '';
      if (hunter) {
        switch (hunter.status) {
          case 0: // 空状态
            break;
          case 1: // 开始工作
            break;
          case 2: // 已提交
            statusDesc = 'Waiting for payment';
            break;
          case 3: // 已支付
            statusDesc = 'Paid';
            break;
          case 4: // 已退出
            statusDesc = 'Quited';
            break;
          case 5: // 已拒绝
            statusDesc = 'Rejected';
            break;
          default:
            break;
        }
      }

      return statusDesc;
    }
  }
};
</script>

<style scoped lang="less">
#hunter-bounty {
  .bounty-list {
    padding: 16px 5%;
    min-height: 500px;

    .footer {
      width: 100%;
      height: 54px;
      background-color: #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px 0 32px;
      font-size: 16px;

      .info {
        color: #666;
        flex: 1;
      }
      .handle {
        display: flex;
        .separator {
          display: block;
          height: 24px;
          border-left: 1px solid #bfbfbf;
          margin: 0 20px;
        }
        .btn {
          font-weight: bold;
          cursor: pointer;
        }
        .submit-btn {
          color: #6170ff;
        }
        .quit-btn {
          color: #d80000;
        }
      }
      .status {
        color: #999;
      }
    }
  }
}
</style>
