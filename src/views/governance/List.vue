<template>
  <div>
    <div class="total-info">
      There are <span>{{ total }}</span> proposals in the Comunion
    </div>
    <div class="search-input">
      <a-input-search
        size="large"
        placeholder="Search by proposal title"
        @search="onKeywordSearch"
      />
    </div>
    <proposal-list :keyword="keyword" @update:total="onUpdateTotal"></proposal-list>
  </div>
</template>

<script>
import ProposalList from './components/ProposalList.vue';

export default {
  components: {
    ProposalList
  },
  data() {
    return {
      total: 0,
      keyword: ''
    };
  },
  methods: {
    onKeywordSearch(val) {
      this.keyword = val;
    },
    onUpdateTotal(val) {
      this.total = val || 0;
    }
  }
};
</script>

<style lang="less" scoped>
.total-info {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #999999;
  line-height: 20px;
  margin-bottom: 15px;
  > span {
    color: #3ac47d;
  }
}

.search-input {
  margin-bottom: 24px;
}
</style>
