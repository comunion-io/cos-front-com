<!-- 页面结构布局 -->
<template>
  <v-app id="benesApp">
    <div class="app-container">
      <transition name="fade" mode="out-in" appear>
        <!-- header 导航栏 -->
        <div class="header">
          <Header/>
        </div>
      </transition>
      <div class="app-main__outer">
        <div class="app-main__inner">
          <!-- 组件投影内容显示 -->
          <slot>
          </slot>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from "../Components/Header";

import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faCog,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCog,
);
export default {
  name: 'app',
  components: {
    Header,
  }
}
</script>
<style scoped lang="scss">
.app-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0;
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    align-content: center;
    z-index: 10;
    transition: all .2s;
    position: fixed;
    width: 100%;
  }

  .app-main__outer {
    flex: 1;
    flex-direction: column;
    display: flex;
    z-index: 8;
    padding: 60px 0 0 0;
    transition: all .2s;
    .app-main__inner {
      padding: 30px 180px 0 180px;
      flex: 1;
    }
  }
}
</style>
