<template>
  <div>
    <div class="toolbar">
      <a-select
        class="toolbar-select"
        v-model="status"
        @change="onStatusChange"
        placeholder="Please select type"
      >
        <a-select-option v-for="option in typeOptions" :key="option.value">
          {{ option.label }}
        </a-select-option>
      </a-select>
      <span class="toolbar-text"
        >There are <span>{{ total }}</span> proposals in total</span
      >
    </div>
    <proposal-list :startupId="id" :status="status" @update:total="onUpdateTotal" />
  </div>
</template>

<script>
import ProposalList from '@/views/governance/components/ProposalList.vue';
import { proposalStatusMap, proposalStatusTxtMap } from '@/constants';

const typeOptions = [
  {
    label: 'All',
    value: ''
  },
  {
    label: proposalStatusTxtMap[proposalStatusMap.notStarted],
    value: proposalStatusMap.notStarted
  },
  {
    label: proposalStatusTxtMap[proposalStatusMap.voting],
    value: proposalStatusMap.voting
  },
  {
    label: proposalStatusTxtMap[proposalStatusMap.passed],
    value: proposalStatusMap.passed
  },
  {
    label: proposalStatusTxtMap[proposalStatusMap.finished],
    value: proposalStatusMap.finished
  },
  {
    label: proposalStatusTxtMap[proposalStatusMap.rejected],
    value: proposalStatusMap.rejected
  },
  {
    label: proposalStatusTxtMap[proposalStatusMap.noEnoughVote],
    value: proposalStatusMap.noEnoughVote
  }
];

export default {
  components: {
    ProposalList
  },
  props: {
    id: String
  },
  data() {
    return {
      status: '',
      total: 0,
      typeOptions: typeOptions
    };
  },
  methods: {
    onStatusChange(val) {
      this.status = val;
    },
    onUpdateTotal(val) {
      this.total = val || 0;
    }
  }
};
</script>

<style lang="less" scoped>
.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  /deep/ .toolbar-select {
    width: 160px;
    margin-right: 8px;
  }
}

.toolbar-text {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #999999;
  line-height: 20px;

  > span {
    color: #3ac47d;
  }
}
</style>
