<script>
import { mapGetters } from 'vuex';
import { followStartup, cancelFollowStartup, getStartupIsFollowed } from '@/services';
export default {
  props: {
    id: String,
    startup: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      defaultLogo: require('@/assets/images/file@2x.png'),
      followCount: this.startup.followCount,
      followBtnLoading: false, // follow按钮loading状态
      isFollowed: false // 是否followed
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    // follow按钮文字
    btnText() {
      let text = this.isFollowed ? 'Followed' : 'Follow';
      if (this.followCount > 0) {
        text = `${this.followCount}+ ${text}`;
      }
      return text;
    }
  },
  watch: {
    isLoggedIn: {
      immediate: true,
      handler(v) {
        if (v) {
          // 获取startup是否被follow
          this.getStartupIsFollowed();
        }
      }
    },
    startup(v) {
      this.followCount = this.startup.followCount;
    }
  },
  methods: {
    // follow按钮被点击
    async followBtnOnClick() {
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'guide', params: { from: this.$route.fullPath } });
        return;
      }
      this.followBtnLoading = true;
      let requestSuccess;
      // 判断是否已经followed
      if (this.isFollowed) {
        requestSuccess = await cancelFollowStartup(this.id);
        if (requestSuccess) {
          requestSuccess && this.followCount--;
          this.isFollowed = false;
        }
      } else {
        requestSuccess = await followStartup(this.id);
        if (requestSuccess) {
          requestSuccess && this.followCount++;
          this.isFollowed = true;
        }
      }
      this.followBtnLoading = false;
    },
    // 获取startup是否被followed
    async getStartupIsFollowed() {
      this.isFollowed = await getStartupIsFollowed(this.id);
    }
  },
  render(h) {
    const { startup, defaultLogo } = this;
    return (
      <div class="flex" style="margin-bottom: 44px;">
        <a-avatar
          src={startup.logo || defaultLogo}
          alt="logo"
          width="46"
          height="46"
          class="no-shrink"
        />
        <div class="flex-1 mx-24">
          <h3 class="mb-0 lh-1 t-bold t-break t-trunc" title={startup.name}>
            {startup.name}
          </h3>
          <p class="mt-16 mb-0 t-break t-grey">{startup.mission}</p>
        </div>
        <a-button
          type="primary"
          class="ml-auto"
          style={{
            minWidth: '144px',
            height: '44px',
            backgroundColor: this.isFollowed ? 'gray' : ''
          }}
          onClick={this.followBtnOnClick}
          loading={this.followBtnLoading}
        >
          {this.btnText}
        </a-button>
      </div>
    );
  }
};
</script>

<style></style>
