<template>
  <div class="setting-startup">
    <div class="title">Setting Startup</div>
    <div class="content">
      <!-- <div class="help-center"></div> -->
      <div class="actions">
        <a-tabs default-active-key="1" @change="changedTab($event)">
          <!-- plus -->
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

            <!-- comunion -->
            <section @click="handleComunion">
              <Card>
                <img slot="image" src="@/assets/images/file@2x.png" alt="" />
                <span slot="text">Comunion1</span>
                <span slot="state">creating</span>
                <span slot="description">Company profilel Company profilel Company profilel</span>
              </Card>
            </section>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Follow StartUp" disabled force-render>
            working
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './card/Card';
export default {
  components: {
    Card
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
      this.$router.replace('/startup/new');
    },
    /**
     *@description 操作comunion( waiting setting )
     */
    handleComunion() {
      console.log('handle comunion');
    }
  }
};
</script>

<style lang="less">
.setting-startup {
  display: flex;
  flex-direction: column;
  .title {
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 24px;
    text-align: center;
  }
  .content {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(6, 0, 1, 0.04);
    border-radius: 2px;
    min-height: 700px;
    .actions {
      margin-left: 60px;
      margin-right: 60px;

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
