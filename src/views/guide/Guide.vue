<template>
  <div class="flex jc-between page-guide">
    <article class="left">
      <h3>
        Comunion - Decentralized Autonomous Organization (DAO) Collaboration Network<br />
        The Next Generation Organization Form and Startup Fraternal Assistance Network
      </h3>
      <p style="margin-top: 60px">
        The Comunion is a DAO collaboration network that reshapes traditional labors transactions
        and organizational forms through blockchain, creating a new business infrastructure and
        value transformation mechanism in the digital age, allowing labor values to circulate and
        trade freely like capital and accumulation.
      </p>
      <p style="margin-top: 28px;">
        In the Comunion, laborers directly exchange project capital gains through skills through the
        Comunion Bounty network; Startup Founders can use the Comunion to initialize the traditional
        startup structure to the corresponding the DAO structure, which is used to raise human
        resources, funds, and Marketing and other resources to help Startup and laborers realize
        free value transactions.
      </p>
      <a-button class="more-btn">
        <a href="https://wiki.comunion.io/" target="_blank">MORE</a>
      </a-button>
    </article>
    <article class="right">
      <div class="px-16">
        <p>To ensure that you can use Comunion<br /></p>
        <p>
          please use metamask wallet&nbsp;<img
            src="@/assets/images/guide/metamask.png"
            width="27"
            height="25"
          />&nbsp; to log in with Chrome browsert&nbsp;<img
            src="@/assets/images/guide/chrome.png"
            width="26"
            height="26"
          />
        </p>
      </div>
      <a-card class="feature-card">
        <div class="flex ai-center">
          <img src="@/assets/images/guide/logo.png" alt="" width="42" height="42" />
          <div class="ml-20">
            <h3 class="f-18 t-bold">Comunion</h3>
            <p class="mt-12 mb-0 t-grey">
              The Next Generation Organization Form and Startup Fraternal Assistance Network
            </p>
          </div>
        </div>
        <p class="f-15 t-bold" style="margin-top:48px;">Sign in Ethereum Mainnet</p>
        <a-card class="connect-card">
          <div class="flex ai-center">
            <img src="@/assets/images/guide/connect.png" alt="" width="24" height="28" />
            <div class="ml-20 t-grey" @click="connectMetaMask">Connect account by metamask</div>
          </div>
        </a-card>
        <div class="features flex flex-wrap">
          <div v-for="feature in features" :key="feature.title" class="flex feature">
            <div class="img-wrap"><img :src="feature.img" /></div>
            <div class="ml-12">
              <p class="f-15 t-bold">{{ feature.title }}</p>
              <p class="mt-16 f-13 t-grey">{{ feature.intro }}</p>
            </div>
          </div>
        </div>
      </a-card>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          img: require('@/assets/images/guide/startup.png'),
          title: 'New Startup',
          intro: 'Initial your dream, launch your startup'
        },
        {
          img: require('@/assets/images/guide/hunter.png'),
          title: 'Transform Hunter',
          intro: 'Hunt bounty with your skill, change the life'
        },
        {
          img: require('@/assets/images/guide/iro.png'),
          title: 'IRO & Exchange',
          intro: 'Initial Resource Offering support your product'
        },
        {
          img: require('@/assets/images/guide/governance.png'),
          title: 'Governance',
          intro: 'More open, more democratic'
        }
      ]
    };
  },
  methods: {
    async connectMetaMask() {
      if (!!window.ethereum && window.ethereum.isMetaMask) {
        await this.$store.dispatch('login');
        this.$router.push({ name: 'square' });
      } else {
        const url = 'https://metamask.io/';
        window.open(url);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-guide {
  font-size: 15px;
  line-height: 28px;
}
.left {
  margin-top: 164px;
  width: 420px;
  h3 {
    font-weight: bold;
    font-size: 18px;
    color: #fff;
  }
  .more-btn {
    width: 140px;
    height: 54px;
    line-height: 54px;
    border: 2px solid #fff;
    border-radius: 3px;
    color: #fff;
    background: none;
    font-size: 18px;
  }
}
.right {
  margin-top: 76px;
  width: 498px;
  .feature-card {
    border-radius: 5px;
    box-shadow: 0px 4px 16px 0px rgba(9, 17, 101, 0.29);
    /deep/ & > .ant-card-body {
      padding: 48px 34px;
    }
  }
  .connect-card {
    border-radius: 3px;
    border: none;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
    }
    /deep/ & > .ant-card-body {
      padding: 24px 34px;
    }
  }
  .features {
    margin: -16px -16px 0;
    .feature {
      margin-top: 60px;
      width: 50%;
      padding: 0 16px;
      img {
        max-width: 28px;
        max-height: 28px;
        transform: translateY(4px);
      }
      p {
        margin-bottom: 0;
      }
    }
  }
}
</style>
