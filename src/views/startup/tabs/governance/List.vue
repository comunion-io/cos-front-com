<template>
  <div>
    <div class="topbar">
      <div class="total-info">
        Propsals: <span>{{ total }}</span>
      </div>
      <a-button type="primary" class="ml-auto" @click="toCreate">
        + New Proposal
      </a-button>
    </div>
    <proposal-list :startupId="id" @update:total="onUpdateTotal"></proposal-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { canInitiateProposal } from '@/utils/proposal';
import ProposalList from '@/views/governance/components/ProposalList.vue';

export default {
  components: {
    ProposalList
  },
  props: {
    id: String,
    startup: Object
  },
  data() {
    return {
      total: 0
    };
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    toCreate() {
      // if (canInitiateProposal(this.startup, this.account)) {

      // }
      this.$router.push({ name: 'newProposal', params: { id: this.id } });
    },
    onUpdateTotal(val) {
      this.total = val || 0;
    }
  }
};
</script>

<style lang="less" scoped>
.topbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.total-info {
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #000000;
  line-height: 25px;
  margin-right: 4px;
  > span {
    color: #005afd;
  }
}
</style>
