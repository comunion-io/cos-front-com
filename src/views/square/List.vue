<template>
  <div id="home">
    <div class="total">
      <!-- <img src="@/assets/images/group@2x.png" alt="" width="38" height="38" /> -->
      <div class="noti-icon flex-inline ai-center jc-center">
        <!-- <a-icon type="notification" /> -->
        <img src="@/assets/images/startup-icon.png" />
      </div>
      <span class="num">{{ total }}&nbsp;Start-Ups</span>in the Comunion.
    </div>

    <!-- search -->
    <a-input-group :compact="true" style="display:flex">
      <a-select
        v-model="search.categoryId"
        style="width: 132px"
        size="large"
        placeholder="All"
        @change="getStartups"
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
        @search="getStartups"
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
            @change="getStartups"
          />
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import services from '@/services';
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
    async getStartups() {
      this.loading = true;
      const { error, data } = await services['cores@startups-列表'](this.search);
      // const [data, total] = await getStartups(this.search);
      this.loading = false;
      this.startups = error ? [] : data.result;
      this.total = error ? 0 : data.total;
    }
  },
  mounted() {
    this.getStartups();
  }
};
</script>

<style scoped lang="less">
@import '~@/assets/styles/variables.less';
#home {
  background: rgba(242, 243, 244, 1);
  min-height: calc(100vh - 70px);
  padding: 28px 150px 0 150px;
  // .noti-icon {
  //   width: 38px;
  //   height: 38px;
  //   border-radius: 50%;
  //   background-color: #dce0fe;
  //   .anticon {
  //     width: 20px;
  //     height: 20px;
  //     font-size: 20px;
  //     color: @primary-color;
  //   }
  // }
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
      margin: 0 0.5em 0 1em;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
  }
}
.startups {
  margin-top: 30px;
  min-height: 240px;
}
</style>
