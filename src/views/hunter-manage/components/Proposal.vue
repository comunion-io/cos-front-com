<template>
  <div>
    <div class="toolbar">
      <div class="tabs">
        <span class="tab-item" :class="createdByMeClass" @click.stop="() => onTabChange(tabKeys[0])"
          >Created by me({{ createdByMeTotal }})</span
        >
        <span class="tab-item" :class="votedClass" @click.stop="() => onTabChange(tabKeys[1])"
          >Voted({{ votedTotal }})</span
        >
      </div>
      <div class="search-input">
        <a-input-search placeholder="Search by proposal title" @search="onKeywordSearch" />
      </div>
    </div>
    <proposal-list
      :show-comer="false"
      :keyword="keyword"
      @update:total="onUpdateTotal"
    ></proposal-list>
  </div>
</template>

<script>
import ProposalList, { proposalTypeMap } from '@/views/governance/components/ProposalList.vue';
import services from '@/services';

export default {
  components: {
    ProposalList
  },
  data() {
    return {
      tabKeys: [proposalTypeMap.created, proposalTypeMap.voted],
      selectedTabKey: proposalTypeMap.created,
      keyword: '',
      createdByMeTotal: 0,
      votedTotal: 0
    };
  },
  mounted() {
    this.initLoadVotedProposals();
  },
  computed: {
    createdByMeClass() {
      return this.selectedTabKey === proposalTypeMap.created ? 'tab-item-selected' : '';
    },
    votedClass() {
      return this.selectedTabKey === proposalTypeMap.voted ? 'tab-item-selected' : '';
    }
  },
  methods: {
    onKeywordSearch(val) {
      this.keyword = val;
    },
    onTabChange(key) {
      this.selectedTabKey = key;
    },
    onUpdateTotal(val) {
      if (this.selectedTabKey === proposalTypeMap.voted) {
        this.votedTotal = val || 0;
        return;
      }

      this.createdByMeTotal = val || 0;
    },
    async initLoadVotedProposals() {
      const { error, data } = await services['cores@proposal-列表']({
        limit: 10,
        offset: 0,
        type: proposalTypeMap.voted
      });

      if (!error) {
        this.votedTotal = (data && data.total) || 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tab-item {
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  color: #000000;
  line-height: 25px;
  padding: 4px 8px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  &:first-child {
    margin-right: 16px;
  }
}

.tab-item-selected {
  color: #6170ff;
  border-bottom-color: #6170ff;
}

.search-input {
  width: 180px;
}
</style>
