<template>
  <a href @click.prevent="openDialog">
    {{ total }} &gt;&gt;
    <a-modal title="Investors List" :width="720" v-model="dialogVisible" :footer="null">
      <div class="mb-16 flex ai-center">
        <span
          >Investors: <span class="t-bold">{{ total }}</span></span
        >
        <span class="ml-24"
          >Raised Until Now: <span class="t-bold">{{ totalEth }} ETH</span></span
        >
      </div>
      <a-table
        row-key="id"
        bordered
        :loading="loading"
        :show-header="false"
        :columns="columns"
        :data-source="result"
        :total="total"
        :pagination="{ total }"
        @change="onChange"
      />
    </a-modal>
  </a>
</template>

<script>
import moment from 'moment';
import services from '@/services';
import CopyableAddress from '../helper/CopyableAddress';

const pageSize = 20;

export default {
  props: {
    id: String
  },
  data() {
    return {
      dialogVisible: false,
      total: null,
      totalEth: null,
      result: [],
      page: 1,
      loading: false,
      columns: Object.freeze([
        {
          dataIndex: 'walletAddr',
          width: 444,
          customRender: v => <CopyableAddress address={v} />
        },
        {
          dataIndex: 'ethCount',
          customRender: v => `${v / 10 ** 18} ETH`
        },
        {
          dataIndex: 'createdAt',
          customRender: v => moment(v).format('YYYY-MM-DD')
        }
      ])
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    async fetch() {
      this.loading = true;
      const { error, data } = await services['cores@disco-startup-investor-列表']({
        startupId: this.id,
        offset: pageSize * (this.page - 1),
        limit: pageSize
      });
      this.loading = false;
      if (!error) {
        Object.assign(this, data);
      }
    },
    onChange(e) {
      this.page = e.current;
      this.fetch();
    }
  },
  async mounted() {
    await this.fetch();
    this.$emit('data', this.totalEth);
  }
};
</script>

<style></style>
