<template>
  <div>
    <a-spin :spinning="spinning" class="spin">
      <div v-show="enableAlert" class="alert-container">
        <span class="alert-content">
          <a-icon class="alert-icon" type="exclamation-circle" theme="filled" />
          <span>There is no proposal yet</span>
        </span>
      </div>
      <proposal-card
        :show-comer="showComer"
        v-for="item in proposalItems"
        v-bind:record="item"
        :key="item.id"
      />
    </a-spin>
    <div v-show="showPagination" class="pagination">
      <pagination v-bind="pagination" @update:offset="handlePaginationChange" />
    </div>
  </div>
</template>

<script>
import ProposalCard from './ProposalCard.vue';
import Pagination from '@/components/list/Pagination.vue';
import services from '@/services';

const pageSize = 10;

export const proposalTypeMap = {
  all: 'all',
  created: 'created',
  voted: 'voted'
};

export const proposalTypeOptions = [
  {
    label: 'All',
    value: proposalTypeMap.all
  },
  {
    label: 'Create by me',
    value: proposalTypeMap.created
  },
  {
    label: 'Voted',
    value: proposalTypeMap.voted
  }
];

export default {
  components: {
    ProposalCard,
    Pagination
  },
  props: {
    keyword: String,
    type: String,
    startupId: String,
    status: [Number, String],
    showComer: {
      type: Boolean,
      default: true
    },
    withMe: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      requestState: 'pending',
      offset: 0,
      proposalItems: [],
      showAlert: false,
      pagination: {
        limit: pageSize,
        total: 0
      }
    };
  },
  created() {
    this.watchFilterParams();
  },
  mounted() {
    this.loadProposals({
      keyword: this.keyword,
      type: this.type,
      startupId: this.startupId,
      status: this.status,
      offset: 0
    });
  },
  watch: {
    offset(next) {
      this.loadProposals({
        keyword: this.keyword,
        type: this.type,
        startupId: this.startupId,
        status: this.status,
        offset: next || 0
      });
    },
    withMe(next) {
      this.loadProposals({
        keyword: this.keyword,
        type: this.type,
        startupId: this.startupId,
        status: this.status,
        offset: 0
      });
    }
  },
  computed: {
    showPagination() {
      return (this.pagination?.total || 0) > (this.pagination?.limit || 0);
    },
    spinning() {
      return this.requestState === 'processing';
    },
    enableAlert() {
      return this.requestState === 'succeeded' && !this.proposalItems?.length;
    }
  },
  methods: {
    handlePaginationChange(offset) {
      this.offset = offset;
    },
    async loadProposals(params) {
      this.requestState = 'processing';

      const { offset = 0, keyword, type = proposalTypeMap.all, startupId, status, withMe } =
        params || {};

      let getProposals = services['cores@proposal-列表'];
      if (withMe) {
        getProposals = services['cores@proposal-me-列表'];
      }

      const { error, data } = await getProposals({
        limit: pageSize,
        offset,
        keyword,
        type,
        startupId,
        statuses: status ? [status] : []
      });

      if (!error) {
        const { result, ...p } = data || {};
        this.requestState = 'succeeded';
        this.proposalItems = result || [];
        this.pagination = { ...p, limit: pageSize };
        const total = p.total || 0;
        this.showAlert = total === 0;
        this.$emit('update:total', total);
      } else {
        this.requestState = 'failed';
      }
    },
    watchFilterParams() {
      if (this.unwatchFilterParams != null) {
        this.unwatchFilterParams();
      }

      this.unwatchFilterParams = this.$watch(
        function() {
          return {
            startupId: this.startupId,
            keyword: this.keyword,
            type: this.type,
            status: this.status
          };
        },
        async function(next, prev) {
          this.loadProposals({
            ...next,
            offset: 0
          });
        }
      );
    }
  },
  destroyed() {
    if (this.unwatchFilterParams != null) {
      this.unwatchFilterParams();
    }
  }
};
</script>

<style lang="less" scoped>
.spin {
  width: 100%;
  min-height: 177px;
}

.alert-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  background-color: #fffbe6;
  border-radius: 16px;

  .alert-icon {
    color: #faad14;
    margin-right: 16px;
    font-size: 24px;
  }

  .alert-content {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 8px 0;
  margin-top: 16px;
}
</style>
