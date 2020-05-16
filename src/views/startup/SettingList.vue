// comunion setting 列表页面
<template>
  <div class="setting-startup">
    <div class="title">Setting Startup</div>
    <div class="content">
      <a-row :gutter="38">
        <a-col :span="7">
          <HelpCenter />
        </a-col>
        <a-col :span="17">
          <div class="actions">
            <a-tabs default-active-key="1" @change="changedTab($event)">
              <a-tab-pane key="1" tab="My Startup">
                <!-- plus -->
                <section @click="createStartUp">
                  <Card>
                    <img slot="image" src="@/assets/images/plus_icon@2x.png" alt="" />
                    <span slot="text">Comunion1</span>
                    <span slot="state"></span>
                    <span slot="description">Initial your dream,lunch your startup</span>
                  </Card>
                </section>

                <!-- creating comunion -->
                <section>
                  <Card>
                    <img slot="image" src="@/assets/images/file@2x.png" alt="" />
                    <span slot="text">Comunion1</span>
                    <span slot="state">creating</span>
                    <span slot="description"
                      >Company profilel Company profilel Company profilel</span
                    >
                  </Card>
                </section>

                <!-- comunion -->
                <section @click="handleComunion">
                  <Card>
                    <img slot="image" src="@/assets/images/file@2x.png" alt="" />
                    <span slot="text">Comunion1</span>
                    <span slot="state">Wait Setting</span>
                    <span slot="description"
                      >Company profilel Company profilel Company profilel</span
                    >
                  </Card>
                </section>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Follow StartUp" disabled force-render>
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
import HelpCenter from '../../components/help/HelpCenter';
export default {
  components: {
    Card,
    HelpCenter
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    /**
     * @description tab切换
     */
    changedTab(key) {
      console.log(key);
    },
    /**
     *@description 创建startup
     */
    createStartUp() {
      this.$router.push('/startup/new');
    },
    /**
     *@description 操作comunion( waiting setting )
     */
    handleComunion() {
      this.$router.push({ name: 'startupSettingDetail', params: { id: '12' } });
    }
  }
};
</script>

<style lang="less">
.setting-startup {
  display: flex;
  flex-direction: column;
  background: rgba(242, 243, 244, 1);
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

      .ant-tabs-nav.ant-tabs-nav-animated {
        width: 100%;
      }
    }
  }

  /deep/ .ant-tabs-tab {
    width: 50%;
    text-align: center;
  }
}
</style>
