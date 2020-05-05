<template>
  <div>
    <ul class="header-megamenu nav">
      <li class="nav-item" v-for="(item, i) in menu" :key="i" @click="select(i)">
        <b-button variant="link" :class="{ active: i === index }">
          <span>
            <router-link :to="item.route">{{ item.name }}</router-link>
          </span>
        </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MegaMenu',
  data() {
    return {
      /** 菜单选项 */
      menu: [
        {
          name: 'Home',
          route: '/'
        },
        {
          name: 'Bounty',
          route: '/bounty'
        }
      ],
      index: 0
    };
  },
  methods: {
    /**
     * @description 当前选中的菜单
     */
    select(i) {
      this.index = i;
    }
  }
};
</script>

<style scoped lang="scss">
.header-megamenu {
  display: flex;
  flex-direction: row;
  align-items: center;

  .nav-item {
    width: 56px;
    height: 19px;
    background: rgba(255, 255, 255, 1);

    .btn-link {
      padding: 0 11px;
      font-size: 7px;

      span a {
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}

.active {
  background: rgba(240, 241, 255, 1);
}
</style>
