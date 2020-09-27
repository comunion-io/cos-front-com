<template>
  <div class="bounty-home">
    <!-- hunter名称 -->
    <p class="hunter-name">{{ hunterName }}</p>

    <!-- hunter信息 -->
    <div class="info-table f-15 mb-32">
      <div class="info-tr flex ai-center" v-for="field in fields" :key="field.label">
        <label class="t-bold no-shrink">{{ field.label }}</label>
        <p v-if="field.type === 'link'" class="mb-0 t-grey">
          <a :href="field.value" target="_black">
            {{ field.value }}
          </a>
        </p>
        <p v-else class="mb-0 t-grey">{{ field.value }}</p>
      </div>
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
import { getUserBounties, getUserInfo } from '@/services';
import BountyList from '@/components/bounty-list/BountyList';

export default {
  name: 'BountyHome',
  components: {
    BountyList
  },
  data() {
    return {
      searchable: false,
      hunterName: '',
      loading: false,
      icon: require('./images/money_pocket.png'),
      fields: [
        {
          label: 'Wallet Address',
          value: '',
          copyable: true
        },
        {
          label: 'Become Time',
          value: ''
        },
        {
          label: 'Skill Tag',
          value: ''
        },
        {
          label: 'About',
          value: ''
        },
        {
          label: 'Description',
          value: '',
          type: 'link'
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
      const [data, total] = await getUserBounties(query, this.$route.params.userId);
      this.total = total;
      return [data, total];
    },
    // 获取用户信息
    async getUserInfo() {
      const data = await getUserInfo(this.$route.params.userId);
      if (data) {
        this.fields[0].value = data.publicKey;
        if (data.hunter) {
          this.hunterName = data.hunter.name;
          let date = new Date(data.hunter.createdAt);
          const year = date.getFullYear();
          const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
          const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
          const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
          const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
          this.fields[1].value = `${year}-${month}-${day} ${hour}:${minutes}`;
          this.fields[2].value = data.hunter.skills.join(', ');
          this.fields[3].value = data.hunter.about;
          this.fields[4].value = data.hunter.descriptionAddr;
        }
      }
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
