<!-- 页面结构布局 -->
<template>
  <v-app id="benesApp">
    <div class="app-container app-theme-white">
      <transition name="fade" mode="out-in" appear>
        <!-- header 导航栏 -->
        <Header :headerbg="headercolor"/>
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
  },
  methods: {
  },

  data() {
    return {
      isConfigOpen: false,

      colors: [
        'bg-primary text-lighter',
        'bg-secondary text-lighter',
        'bg-success text-lighter',
        'bg-info text-lighter',
        'bg-warning text-darker',
        'bg-danger text-lighter',
        'bg-light text-darker',
        'bg-dark text-lighter',
        'bg-focus text-lighter',
        'bg-alternate text-lighter',

        'bg-vicious-stance text-lighter',
        'bg-midnight-bloom text-lighter',
        'bg-night-sky text-lighter',
        'bg-slick-carbon text-lighter',
        'bg-asteroid text-lighter',
        'bg-royal text-lighter',
        'bg-warm-flame text-darker',
        'bg-night-fade text-darker',
        'bg-sunny-morning text-darker',
        'bg-tempting-azure text-darker',
        'bg-amy-crisp text-darker',
        'bg-heavy-rain text-darker',
        'bg-mean-fruit text-darker',
        'bg-malibu-beach text-darker',
        'bg-deep-blue text-darker',
        'bg-ripe-malin text-lighter',
        'bg-arielle-smile text-lighter',
        'bg-plum-plate text-lighter',
        'bg-happy-fisher text-darker',
        'bg-happy-itmeo text-darker',
        'bg-mixed-hopes text-lighter',
        'bg-strong-bliss text-lighter',
        'bg-grow-early text-lighter',
        'bg-love-kiss text-lighter',
        'bg-premium-dark text-lighter',
        'bg-happy-green text-lighter',
      ],
    }
  },
}
</script>
