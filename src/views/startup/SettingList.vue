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
                <!-- plus -->
                <section @click="createStartUp">
                  <Card>
                    <img slot="image" src="@/assets/images/plus_icon@2x.png" alt="" />
                    <span slot="text">New Startup</span>
                    <span slot="description">Initial your dream, lunch your startup</span>
                  </Card>
                </section>

                <!-- comunion -->
                <section @click="handleComunion">
                  <Card
                    v-for="startup in startups"
                    :key="startup.id"
                    :state="startup.state | startupStateFilter"
                  >
                    <img slot="image" src="@/assets/images/file@2x.png" alt="" />
                    <span slot="text">{{ startup.name }}</span>
                    <span slot="state">{{ startup.state | startupStateFilter }}</span>
                    <span slot="description">{{ startup.mission }}</span>
                  </Card>
                </section>

                <!--&lt;!&ndash; comunion &ndash;&gt;-->
                <!--<section @click="handleComunion">-->
                <!--  <Card state="waiting">-->
                <!--    <img slot="image" src="@/assets/images/file@2x.png" alt="" />-->
                <!--    <span slot="text">Comunion1</span>-->
                <!--    <span slot="state">Wait Setting</span>-->
                <!--    <span slot="description"-->
                <!--      >Company profilel Company profilel Company profilel</span-->
                <!--    >-->
                <!--  </Card>-->
                <!--</section>-->

                <!--&lt;!&ndash; comunion &ndash;&gt;-->
                <!--<section @click="handleComunion">-->
                <!--  <Card state="done">-->
                <!--    <img slot="image" src="@/assets/images/file@2x.png" alt="" />-->
                <!--    <span slot="text">Comunion1</span>-->
                <!--    <span slot="state">Wait Setting</span>-->
                <!--    <span slot="description"-->
                <!--      >Company profilel Company profilel Company profilel</span-->
                <!--    >-->
                <!--  </Card>-->
                <!--</section>-->
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
import Card from './card/Card';
import HelpCenter from '@/components/help/HelpCenter';
import { getMyStartup } from '@/services';
import { startupStateFilter } from '@/filters';

export default {
  components: {
    Card,
    HelpCenter
  },
  data() {
    return {
      startups: []
    };
  },
  filters: {
    startupStateFilter
  },
  methods: {
    /**
     *@description 创建startup
     */
    createStartUp() {
      this.$router.push('/startup/new');
    },
    /**
     * @description 状态转换
     * @param i
     * @returns {string}
     */
    transferState(i) {
      switch (i) {
        // 创建中
        case 0:
          return 'creating';
        //  已创建
        case 1:
          return 'created';
        case 2:
          // 未确认到tx产生
          return 'waiting';
        case 3:
          // 上链失败
          return 'block failed';
        //  已设置
        case 4:
          return 'set';
        default:
          return '';
      }
    },

    /**
     *@description 操作comunion( waiting setting )
     */
    handleComunion() {
      this.$router.push({ name: 'startupSettingDetail', params: { id: '12' } });
    },
    /**
     * @description 获取 startup 列表
     * @param params
     */
    async getStartupList(params) {
      try {
        this.startups = await getMyStartup(params);
      } catch (e) {
        console.log(e);
      }
    }
  },
  async mounted() {
    const params = {
      limit: 3,
      offset: 0
    };
    this.getStartupList(params);
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
