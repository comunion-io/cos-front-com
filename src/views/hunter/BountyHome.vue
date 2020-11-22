<template>
  <div class="bounty-home">
    <!-- hunter名称 -->
    <p class="hunter-name">{{ hunterName }}</p>

    <!-- hunter信息 -->
    <div class="info-table f-15 mb-32">
      <Descriptions :columns="fields" :dataSource="hunterInfo" />
    </div>

    <!-- bounty列表 -->
    <div class="flex ai-end mb-16">
      <img :src="icon" alt="icon" height="18" />
      <span class="ml-8 t-bold f-18 lh-1">Bounty</span>
    </div>
    <section>
      <bounty-list :fetchData="fetchData" :searchable="searchable"></bounty-list>
    </section>
  </div>
</template>

<script>
import services from '@/services';
import Descriptions from '@/components/display/Descriptions';
import BountyList from '@/components/bounty-list/BountyList';
// import services from '@/services';

export default {
  name: 'BountyHome',
  components: {
    BountyList,
    Descriptions
  },
  data() {
    return {
      searchable: false,
      hunterName: '',
      loading: false,
      icon: require('./images/money_pocket.png'),
      hunterInfo: null,
      fields: [
        {
          label: 'Wallet Address',
          value: 'walletAddress',
          copyable: true
        },
        {
          label: 'Become Time',
          value: 'becomeTime'
        },
        {
          label: 'Skill Tag',
          value: 'skillTag'
        },
        {
          label: 'About',
          value: 'about'
        },
        {
          label: 'Description',
          value: 'description',
          render: v => (
            <a href={v} target="_black">
              {v}
            </a>
          )
        }
      ],
      total: 0,
      bounties: [] // 列表
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 获取bounty列表
    async fetchData(query) {
      // const [data, total] = await getUserBounties(query, this.$route.params.userId);
      // return [data, total];
      const { error, data } = await services['cores@bounty-列表-用户'](
        { userId: this.$route.params.userId },
        query
      );
      this.total = data.total;
      return error ? [[], 0] : [data.result, data.total];
    },
    // 获取用户信息
    async getUserInfo() {
      const { error, data } = await services['account@用户-获取'](this.$route.params.userId);
      let hunterInfo = {};
      if (!error) {
        hunterInfo.walletAddress = data.publicKey;
        if (data.hunter) {
          this.hunterName = data.hunter.name;
          let date = new Date(data.hunter.createdAt);
          const year = date.getFullYear();
          const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
          const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
          const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
          const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
          hunterInfo.becomeTime = `${year}-${month}-${day} ${hour}:${minutes}`;
          hunterInfo.skillTag = data.hunter.skills.join(', ');
          hunterInfo.about = data.hunter.about;
          hunterInfo.description = data.hunter.descriptionAddr;
        }
      }
      this.hunterInfo = hunterInfo;
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables.less';
.bounty-home {
  width: calc(~'100% - 90px');
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(6, 0, 1, 0.04);
  border-radius: 2px;
  padding: 40px 145px;

  .hunter-name {
    text-align: center;
    font-size: 18px;
    line-height: 18px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 50px;
  }
}
.info-table {
  border: 1px solid @border-color-light;
  border-radius: 3px;
}
.info-tr {
  padding: 12px 12px 12px 0;
  & + .info-tr {
    border-top: 1px solid @border-color-light;
  }
  > label {
    padding-right: 32px;
    width: 244px;
    text-align: right;
  }
  > p {
    display: flex;
    word-break: break-all;
  }
}
</style>
