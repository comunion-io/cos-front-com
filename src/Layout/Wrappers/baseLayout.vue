<!-- 页面结构布局 -->
<template>
  <v-app id="benesApp">
    <div class="app-container">
      <transition name="fade" mode="out-in" appear>
        <!-- header 导航栏 -->
        <Header/>
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

</style>
