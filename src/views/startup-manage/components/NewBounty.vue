<!-- startup manage 子页面 Bounty - new bounty -->
<template>
  <div>
    <a-card id="new-bounty" :bordered="false" style="margin-bottom: 24px;">
      <h1 class="title">New Bounty</h1>
      <section class="content">
        <div class="form">
          <a-form-model
            class="vertical-form"
            ref="ruleForm"
            :model="form"
            :rules="rules"
            layout="horizontal"
            @submit.prevent="onsubmit"
          >
            <!-- startup -->
            <a-form-model-item label="Startup name" prop="startupId" class="form-item">
              <a-select size="large" v-model="form.startupId" placeholder="Comunion">
                <a-select-option v-for="item in startups" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- title -->
            <a-form-model-item label="Title" prop="title" class="form-item">
              <a-input size="large" v-model="form.title" placeholder="Title" :max-length="50" />
            </a-form-model-item>
            <!-- type -->
            <a-form-model-item label="Type" prop="type" class="form-item">
              <a-select size="large" v-model="form.type" placeholder="Please choose bounty type">
                <a-select-option v-for="item in bountyTypes" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- key words -->
            <a-form-model-item label="KeyWords" prop="keywords" class="form-item">
              <a-select
                size="large"
                v-model="form.keywords"
                placeholder="Please select keywords"
                mode="multiple"
              >
                <a-select-option v-for="item in skills" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- email -->
            <a-form-model-item label="Contract Email" prop="contactEmail" class="form-item">
              <a-input size="large" v-model="form.contactEmail" placeholder="contact email" />
            </a-form-model-item>
            <!-- intro -->
            <a-form-model-item label="Intro" prop="intro" class="form-item">
              <a-input size="large" v-model="form.intro" placeholder="intro" type="textarea" />
            </a-form-model-item>
            <!-- Description -->
            <bbs-input v-model="form.descriptionAddr" />
            <!-- Duration -->
            <a-form-model-item label="Duration" prop="duration" class="form-item">
              <a-input size="large" v-model="form.duration" addon-after="Days" />
            </a-form-model-item>
            <!-- Payments -->
            <a-form-model-item
              label="Payments"
              prop="payments"
              required
              :autoLink="false"
              class="form-item"
            >
              <a-row :gutter="24" v-for="(item, index) in form.payments" :key="index">
                <a-col :span="20">
                  <a-form-model-item
                    :prop="`payments.${index}.value`"
                    :rules="{ required: true, message: '请输入', trigger: 'blur' }"
                  >
                    <a-input size="large" v-model="form.payments[index].value">
                      <a-select
                        slot="addonAfter"
                        default-value=""
                        v-model="form.payments[index].token"
                        style="width: 80px"
                      >
                        <a-select-option value="USDT">
                          USDT
                        </a-select-option>
                        <a-select-option value="BTC2">
                          BTC
                        </a-select-option>
                        <a-select-option value="ETH">
                          ETH
                        </a-select-option>
                      </a-select>
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="4">
                  <a-button block size="large" v-if="index === 0" @click="addCurrency"
                    >+Add</a-button
                  >
                  <a-button block size="large" v-else @click="removeCurrency(index)">
                    <a-icon type="delete" />
                  </a-button>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item>
              <a-row>
                <!-- <a-col :span="11">
                  <a-button block @click="cancel">Cancel</a-button>
                </a-col> -->
                <a-col :span="24">
                  <a-button type="primary" block html-type="submit">Submit</a-button>
                </a-col>
              </a-row>
              <div>
                Balance:&nbsp;<span class="t-bold">{{ balance }} &nbsp;ETH</span>
              </div>
            </a-form-model-item>
            <p class="mt-32 t-grey">
              We will store the content to and all the information what u had inputed, all that wil
              be submited to the We will store Ethereum
            </p>
            <p class="t-gray">
              Mainnet BlockChain
            </p>
          </a-form-model>
        </div>
      </section>
    </a-card>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { urlValidator } from '@/utils/validators';
import BbsInput from '@/components/form/BbsInput';
import { getMyStartups, getTags, getPrepareBountyId, createBounty } from '@/services';
import { COMUNION_BOUNTY_RECEIVE_ACCOUNT, web3 } from '@/libs/web3';
import { bountyAbi } from '@/libs/abis/bounty';
import { mapGetters } from 'vuex';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    BbsInput
  },
  data() {
    return {
      /* 表单 */
      form: {
        startupId: '',
        title: '',
        type: '',
        keywords: [],
        contactEmail: '',
        intro: '',
        descriptionAddr: '',
        duration: '',
        payments: [{ token: 'BTC', value: '' }]
      },

      // 当前账户创建的startups
      startups: [],
      skills: [],
      /* bounty 下拉选项 */
      bountyTypes: ['contest', 'cooperative'],
      rules: {
        startupId: [{ required: true, message: 'Please select startup', trigger: 'change' }],
        title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
        type: [{ required: true, message: 'Please select Type', trigger: 'change' }],
        keywords: [{ required: true, message: 'Please input keywords', trigger: 'blur' }],
        contactEmail: [{ required: true, message: 'Please input contact Email', trigger: 'blur' }],
        intro: [{ required: true, message: 'Please input intro', trigger: 'blur' }],
        descriptionAddr: [
          {
            required: true,
            validator: urlValidator,
            message: 'Please input correct description url',
            trigger: 'blur'
          }
        ],
        duration: [{ required: true, message: 'Please input duration', trigger: 'blur' }]
      },
      balance: 32
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['account']),

    // 余额过少，不能发起交易
    canNotTransaction() {
      return this.balance < 0.1;
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    /**
     * @description '增加货币'
     */
    addCurrency() {
      this.form.payments.push({
        value: '',
        token: ''
      });
    },

    removeCurrency(index) {
      this.form.payments.splice(index, 1);
    },

    /**
     * @description 取消添加bounty
     */
    // cancel() {
    //   this.$confirm({
    //     title: 'Quit confirm',
    //     content: 'Do you want to keep the current content?',
    //     cancelText: 'Remove and quit',
    //     okText: 'Keep',
    //     onOk: () => {
    //       this.$router.push({ name: 'startupManage', query: { tab: 'bounty' } });
    //     }
    //   });
    // },
    /**
     * @description 提交表单， 上链
     */
    onsubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            const bountyId = await getPrepareBountyId();

            if (bountyId) {
              const id = bountyId;
              const txid = '0x12rgfebfgsdnre3425';
              this.createBounty(this.form, id, txid);
              // this.ethSendTranscation(this.form, id);
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    },

    /**
     * @description 发起交易上链
     */
    async ethSendTranscation(formData, bountyId) {
      const contractBounty = await this.getContractInstance(formData, bountyId);
      const codeData = await contractBounty.enCodeABI();
      const countAll = await web3.eth.getTranscationCount(this.account, 'pending');
      const chainId = await web3.eth.getChainId();

      const tx = {
        from: this.account,
        to: COMUNION_BOUNTY_RECEIVE_ACCOUNT,
        data: codeData,
        value: web3.utils.numberToHex(Math.pow(10, 16)),
        nonce: web3.utils.numberToHex(countAll),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 9)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: chainId
      };
      window.ethereum.sendAsync(
        {
          method: 'eth_sendTransaction',
          params: [tx],
          from: window.ethereum.selectedAddress
        },
        (err, result) => {
          if (err) {
            return console.error(err);
          }
          const txid = result.result;
          this.createBounty(formData, bountyId, txid);
        }
      );
    },

    /**
     * @description 创建bounty
     */
    async createBounty(formData, bountyId, txid) {
      try {
        // 创建 bounty
        const data = { ...formData, txid, ...bountyId, ...{ descriptionFileAddr: '-1' } }; // descriptionFileAddr等后端删除了， 前端也要删除
        data.duration = +data.duration;
        for (const payment of data.payments) {
          payment.value = +payment.value;
        }

        const startupId = this.$route.query.startupId;
        const bounty = await createBounty(startupId, data);

        if (bounty.id) {
          this.$router.push({
            name: 'startupManage',
            query: { tab: 'bounty', startupId: startupId }
          });
        }
      } catch (err) {
        console.err(err);
      }
    },

    /**
     * @description 获取bounty上链的合约实例
     */
    async getContractInstance(formData, bountyId) {
      const contract = new web3.eth.Contract(bountyAbi, COMUNION_BOUNTY_RECEIVE_ACCOUNT);
      const contractBounty = await contract.methods.newBounty(
        bountyId,
        formData.startupId,
        formData.title,
        formData.intro,
        formData.payments
      );
      return contractBounty;
    },

    async getMeStartups() {
      const [data] = await getMyStartups();
      this.startups = data;
    },

    async getTags() {
      const skills = await getTags({ source: 'skills' });
      if (skills.length > 0) {
        this.skills = skills;
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getMeStartups();
    this.getTags();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.title {
  margin-top: 32px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #000;
}

.content {
  margin: 0 auto;
  width: 60%;
  max-width: 640px;
  min-width: 240px;
}
</style>
