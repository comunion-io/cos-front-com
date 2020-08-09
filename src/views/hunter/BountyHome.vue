<template>
  <div class="bounty-home">
    <!-- hunter名称 -->
    <p class="hunter-name">Utaka</p>

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
    <a-spin size="large" :spinning="loading">
      <div class="flex-colimn">
        <bounty-card v-for="bounty in bounties" :key="bounty.id" :bounty="bounty"></bounty-card>
        <a-empty v-if="!bounties.length" />
        <div class="flex jc-center mt-20">
          <com-pagination
            :limit.sync="search.limit"
            :offset.sync="search.offset"
            :total="total"
            @change="getBounties"
          />
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import BountyCard from '@/components/bounty-list/BountyCard';

export default {
  name: 'BountyHome',
  components: {
    BountyCard
  },
  data() {
    return {
      // 搜索条件
      search: {
        offset: 0,
        limit: 10
      },
      loading: false,
      icon: require('./images/money_pocket.png'),
      fields: [
        {
          label: 'Wallet Address',
          value: '0x8BaE00A7dd89B1749E7b7aD54ffCbe20Ea5CB3cB'
        },
        {
          label: 'Become Time',
          value: '2020-04-16 18:20'
        },
        {
          label: 'Skill Tag',
          value: 'UI Design Copywriting Planning Interactive Design'
        },
        {
          label: 'About',
          value: 'The next generation org and startup network'
        },
        {
          label: 'Description',
          value: 'https://bbs.comunion.io/id=134',
          type: 'link'
        }
      ],
      total: 0,
      bounties: [] // 列表
    };
  },
  methods: {
    // 获取bounty列表
    getBounties() {
      //
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
