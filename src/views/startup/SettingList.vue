<!-- comunion setting 列表页面 -->
<template>
  <div class="setting-startup">
    <div class="title">Setting Startup</div>
    <div class="content">
      <a-row :gutter="20">
        <a-col :span="8">
          <HelpCenter />
        </a-col>
        <a-col :span="16">
          <div class="actions">
            <a-tabs default-active-key="1" @change="changedTab($event)">
              <a-tab-pane key="1" tab="My Startup">
                <div class="flex-column ai-center" style="padding: 0 30px 30px">
                  <startup-item :startup="newStartupItem" @click.native="createStartUp" />
                  <a-spin class="w-100p" size="large" :spinning="loading">
                    <startup-item
                      v-for="startup in startups"
                      :key="startup.id"
                      :startup="startup"
                      @click.native="onClickStartup(startup)"
                    />
                    <com-pagination
                      class="mt-20"
                      :limit.sync="search.limit"
                      :offset.sync="search.offset"
                      :total="total"
                      @change="getMyStartups"
                    />
                  </a-spin>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Follow Startup" disabled force-render>
                working
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getMyStartups } from '@/services';
import { startupState } from '@/filters';
import HelpCenter from '@/components/help/HelpCenter';
import StartupItem from './components/StartupItem';

export default {
  components: {
    StartupItem,
    HelpCenter
  },
  data() {
    return {
      // 列表
      startups: [],
      // 新建
      newStartupItem: {
        logo: require('@/assets/images/plus_icon@2x.png'),
        name: 'New Startup',
        mission: 'Initial your dream, lunch your startup'
      },
      // 搜索条件
      search: {
        offset: 0,
        limit: 10
      },
      total: 0,
      // 加载中
      loading: false
    };
  },
  methods: {
    /**
     *@description 创建startup
     */
    createStartUp() {
      this.$router.push('/startup/new');
    },
    /**
     *@description 点击startup时
     */
    onClickStartup(startup) {
      const { state, settingState } = startup;
      const { label } = startupState(startup);
      // creating 不做任何操作
      if (state <= 1 || state === 3) {
        this.$message.info(label);
      } else {
        if (settingState !== 2) {
          // waiting for setting或block failed
          this.$router.push({ name: 'startupSettingDetail', params: { id: startup.id } });
        } else if (startup.state === 4) {
          // TODO: 设置完成，前往startup主页
        }
      }
    },
    /**
     * @description 获取 startup 列表
     * @param params
     */
    async getMyStartups() {
      this.loading = true;
      const [data, total] = await getMyStartups(this.search);
      this.loading = false;
      this.startups = data;
      this.total = total;
    }
  },
  async mounted() {
    this.getMyStartups();
  }
};
</script>

<style lang="less">
.setting-startup {
  padding: 0 108px;
  .title {
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 24px;
    text-align: center;
    margin-left: 25%;
  }
  .content {
    min-height: 700px;
    display: flex;
    flex-direction: row;
    .help-center {
      margin-left: 53px;
      width: 33%;
    }
    .actions {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(6, 0, 1, 0.04);
      border-radius: 2px;

      .ant-tabs-nav {
        padding: 0 36px;
        width: 100%;
      }
    }
  }
  // tab样式自定义
  .ant-tabs-bar {
    margin-bottom: 38px;
  }
  .ant-tabs-tab {
    margin: 0;
    padding: 0;
    width: calc(50% - 36px);
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    &:not(.ant-tabs-tab-disabled) {
      color: #000000;
    }
    &:nth-child(1) {
      margin-right: 36px;
    }
    &:nth-child(2) {
      margin-left: 36px;
    }
  }
  // tab下面的线 自定义
  .ant-tabs-ink-bar {
    bottom: 0;
    height: 4px;
  }
}
</style>
