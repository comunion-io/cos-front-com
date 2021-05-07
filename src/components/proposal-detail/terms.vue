<template>
  <a href @click.prevent="dialogVisible = true">
    View details &gt;&gt;
    <a-modal title="Payment Terms" :width="720" v-model="dialogVisible" :footer="null">
      <div class="mb-16 flex ai-center">
        <span
          >Terms: <span class="t-bold">{{ terms.length }}</span></span
        >
      </div>
      <a-table bordered :columns="columns" :data-source="dataSource" :pagination="false" />
    </a-modal>
  </a>
</template>

<script>
export default {
  props: {
    symbol: String,
    terms: Array
  },
  data() {
    return {
      dialogVisible: false,
      columns: Object.freeze([
        {
          title: 'Terms',
          dataIndex: 'content'
        },
        {
          title: 'Payment Amount',
          align: 'right',
          width: 200,
          dataIndex: 'amount'
        }
      ])
    };
  },
  computed: {
    dataSource() {
      return this.terms.map((item, index) => {
        return {
          key: index,
          content: item.content,
          amount: `${item.amount} ${this.symbol}`
        };
      });
    }
  }
};
</script>

<style></style>
