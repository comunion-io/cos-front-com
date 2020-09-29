<template>
  <!-- hunter bounty 列表页面 -->
  <div id="hunter-bounty">
    <section class="bounty-list">
      <bounty-list :fetchData="fetchData">
        <template v-slot:cardFooter="slotProps">
          <div class="footer">
            <div class="info">{{ getStartInfo(slotProps.bounty) }}</div>
            <div class="handle">
              <div class="btn submit-btn">Submit</div>
              <span class="separator"></span>
              <div class="btn quit-btn">Quit</div>
            </div>
          </div>
        </template>
      </bounty-list>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getStartupMeBounties } from '@/services';
import BountyList from '@/components/bounty-list/BountyList';

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
      const [data, total] = await getStartupMeBounties(query);
      return [data, total];
    },
    // 获取开始时间信息
    getStartInfo(bounty) {
      let hunter = bounty.hunters.find(h => this.user.id === h.userId);
      if (hunter) {
        let date = new Date(hunter.startedAt);
        let year = date.getFullYear();
        let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return `Start work at ${year}-${month}-${day}`;
      }
      return '';
    }
  }
};
</script>

<style scoped lang="less">
#hunter-bounty {
  margin: 0 100px;

  .bounty-list {
    margin-top: 40px;
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
    }
  }
}
</style>
