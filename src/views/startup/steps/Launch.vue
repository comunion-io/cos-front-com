<template>
  <div class="launch-wrapper">
    <div class="flex ai-center jc-between">
      <article v-for="item in items" :key="item.name" class="intro-item flex-column ai-center">
        <div class="flex ai-center">
          <img :src="item.icon" alt="icon" width="38" height="38" />
          <span class="ml-12 f-20 t-bold" :style="{ color: item.color }">{{ item.name }}</span>
        </div>
        <h3 class="f-15">{{ item.title }}</h3>
        <p class="t-grey f-13 t-center">{{ item.desc }}</p>
      </article>
    </div>
    <p class="tip t-grey">
      When the start-up had been submited to blockchain，you can enjoy above functions.
    </p>
    <a-row :gutter="20">
      <a-col :span="6">
        <a-button block size="large" @click="cancel">Cancel</a-button>
      </a-col>
      <a-col :span="6">
        <a-button block size="large" @click="back">
          <a-icon type="arrow-left"></a-icon>
          Back
        </a-button>
      </a-col>
      <a-col :span="12">
        <a-button block size="large" type="primary" :loading="loading" @click="launch">
          Launch Start-Up
        </a-button>
        <div class="mt-8 t-grey">
          Balance: <span class="t-bold">{{ this.balance }} &nbsp;ETH</span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import mixin from './mixins';
import { mapGetters } from 'vuex';
import { getEtherBalance } from '@/services/utils';
export default {
  mixins: [mixin],
  data() {
    return {
      loading: false,
      items: [
        {
          name: 'IRO',
          icon: require('@/assets/images/iro.png'),
          title: 'Fundrasing IRO',
          color: '#3AC47D',
          desc: 'Initial register offering raise fund to build your dream'
        },
        {
          name: 'Bounty',
          icon: require('@/assets/images/bounty.png'),
          title: 'Create Bounty',
          color: '#FFAD4D',
          desc: 'Create new bounties,recruit hunters develop your starup'
        },
        {
          name: 'Team',
          icon: require('@/assets/images/team.png'),
          title: 'Build Team',
          color: '#6170FF',
          desc: 'List team members,improve transparency and public trust'
        }
      ],
      balance: undefined
    };
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    /**
     * @description setting提交创建，上链
     */
    launch() {
      this.loading = true;
      this.$emit('submit');
    }
  },
  async mounted() {
    this.balance = await getEtherBalance(this.account);
  }
};
</script>

<style lang="less" scoped>
.launch-wrapper {
  padding: 40px 48px 64px;
  background: #fff;
}
.intro-item {
  padding: 45px 18px 20px;
  width: 220px;
  box-shadow: 0px 0px 8px 4px rgba(6, 0, 1, 0.04);
  h3 {
    margin: 45px 0 20px;
    font-weight: normal;
    color: #000;
  }
}
.tip {
  margin-top: 60px;
  margin-bottom: 40px;
}
</style>
