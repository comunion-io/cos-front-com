<template>
  <div id="home">
    <div class="total">
      <img src="@/assets/images/group@2x.png" alt="" width="38" height="38" />
      There are <span class="num">{{ total }}</span> Startups in comunion.
    </div>

    <!-- search -->
    <a-input-group :compact="true" style="display:flex">
      <a-select
        v-model="search.categoryId"
        style="width: 132px"
        size="large"
        placeholder="All"
        @change="doSearch"
      >
        <a-select-option value="">All</a-select-option>
        <a-select-option v-for="item in categories" :key="item.id" :value="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>

      <a-input-search
        v-model="search.keyword"
        size="large"
        class="flex-1"
        placeholder="Input search comunion"
        @search="doSearch"
      />
    </a-input-group>

    <!-- 显示 comunion-->
    <a-spin size="large" :spinning="loading">
      <div class="startups flex-column">
        <card v-for="startup in startups" :key="startup.id" :startup="startup" />
        <a-empty v-if="!loading && !startups.length" />
        <div class="flex jc-center mt-20">
          <com-pagination
            :limit.sync="search.limit"
            :offset.sync="search.offset"
            :total="total"
            @change="doSearch"
          />
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getStartups } from '@/services';
import Card from './card/Card';

export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      // 搜索条件
      search: {
        offset: 0,
        limit: 10,
        categoryId: '',
        keyword: '',
        isIRO: ''
      },
      // 数据
      startups: [],
      total: 0,
      // 加载中
      loading: false
    };
  },
  computed: {
    ...mapGetters(['categories'])
  },
  methods: {
    async doSearch() {
      this.loading = true;
      const [data, total] = await getStartups(this.search);
      this.loading = false;
      this.startups = data;
      this.total = total;
    }
  },
  mounted() {
    this.doSearch();
  }
};
</script>

<style scoped lang="less">
#home {
  background: rgba(242, 243, 244, 1);
  min-height: calc(100vh - 70px);
  padding: 40px 110px 0 110px;

  .total {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;

    img {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }

    .num {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      margin: 0 10px;
    }
  }
}
.startups {
  margin-top: 30px;
  min-height: 240px;
}
</style>
