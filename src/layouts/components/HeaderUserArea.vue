<template>
  <div class="user-area">
    <a-popover trigger="click" placement="bottom">
      <template slot="content">
        <p>Content</p>
        <p>Content</p>
      </template>
      <div class="user-info">
        <img src="" alt="" />
        <div>
          <span>name</span>
          <span>Connected to Mainnet</span>
        </div>
      </div>
    </a-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderUserArea',
  components: {},
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['isMetaMaskConnected'])
  },

  methods: {
    /**
     * @description 断开钱包链接
     */
    disConnectWallet() {
      console.log('断开钱包链接');
    },

    /**
     * @description 发布hunter
     */
    transformHunter() {
      console.log('发布hunter');
    }
  }
};
</script>

<style scoped lang="less">
.user-area {
  margin-left: 10px;
  cursor: pointer;
  .user-info {
    display: flex;
    flex-direction: row;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
