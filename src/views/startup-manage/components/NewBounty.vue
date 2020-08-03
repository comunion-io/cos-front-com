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
              <a-select
                size="large"
                v-model="form.startupId"
                placeholder="Comunion"
                :disabled="isEdit"
              >
                <a-select-option v-for="item in startups" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- title -->
            <a-form-model-item label="Title" prop="title" class="form-item">
              <a-input
                size="large"
                v-model="form.title"
                placeholder="Title"
                :max-length="50"
                :disabled="isEdit"
              />
            </a-form-model-item>
            <!-- type -->
            <a-form-model-item label="Type" prop="type" class="form-item">
              <a-select
                size="large"
                v-model="form.type"
                placeholder="Please choose bounty type"
                :disabled="isEdit"
              >
                <a-select-option v-for="item in bountyTypes" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- key words -->
            <a-form-model-item label="KeyWords" prop="keywords" class="form-item">
              <a-input
                size="large"
                v-model="form.keywords"
                placeholder="Please select keywords"
                :disabled="isEdit"
              />
            </a-form-model-item>
            <!-- email -->
            <a-form-model-item label="Contract Email" prop="email" class="form-item">
              <a-input size="large" v-model="form.email" placeholder="email" :disabled="isEdit" />
            </a-form-model-item>
            <!-- intro -->
            <a-form-model-item label="Intro" prop="intro" class="form-item">
              <a-input
                size="large"
                v-model="form.intro"
                placeholder="intro"
                type="textarea"
                :disabled="isEdit"
              />
            </a-form-model-item>
            <!-- Description -->
            <bbs-input v-model="form.descriptionAddr" :disabled="isEdit" />
            <!-- Duration -->
            <a-form-model-item label="Duration" prop="duration" class="form-item">
              <a-input size="large" v-model="form.duration" :disabled="isEdit" addon-after="Days" />
            </a-form-model-item>
            <!-- Payment -->
            <a-form-model-item label="Payment" prop="payment" class="form-item">
              <a-row :gutter="24">
                <a-col :span="20">
                  <a-input size="large" v-model="form.payment" :disabled="isEdit">
                    <a-select
                      slot="addonAfter"
                      default-value=""
                      v-model="form.currency"
                      style="width: 80px"
                    >
                      <a-select-option value="1">
                        USDT
                      </a-select-option>
                      <a-select-option value="2">
                        BTC
                      </a-select-option>
                      <a-select-option value="3">
                        ETH
                      </a-select-option>
                    </a-select>
                  </a-input>
                </a-col>
                <a-col :span="4">
                  <a-button block size="large" @click="addCurrency">+Add</a-button>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item>
              <a-row>
                <a-col :span="11">
                  <a-button block @click="cancel">Cancel</a-button>
                </a-col>
                <a-col :span="11" :offset="2">
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
import BbsInput from '../../startup/components/BbsInput';
import { getPrepareBountyId, createBounty } from '@/services/bounty.service';
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
        keywords: '',
        email: '',
        intro: '',
        descriptionAddr: '',
        duration: '',
        payment: '',
        currency: ''
      },

      // 当前账户创建的startups
      startups: [],
      /* bounty 下拉选项 */
      bountyTypes: [],
      rules: {
        startupId: [{ required: true, message: 'Please select startup', trigger: 'change' }],
        title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
        type: [{ required: true, message: 'Please select Type', trigger: 'change' }],
        keywords: [{ required: true, message: 'Please input keywords', trigger: 'blur' }],
        email: [{ required: true, message: 'Please input email', trigger: 'blur' }],
        intro: [{ required: true, message: 'Please input intro', trigger: 'blur' }],
        descriptionAddr: [
          {
            required: true,
            validator: urlValidator,
            message: 'Please input correct description url',
            trigger: 'blur'
          }
        ],
        duration: [{ required: true, message: 'Please input duration', trigger: 'blur' }],
        payment: [{ required: true, message: 'Please input payment', trigger: 'blur' }],
        currency: [{ required: true, message: 'Please input currency', trigger: 'blur' }]
      },
      balance: 32
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['account']),

    // 是否是编辑模式
    isEdit() {
      return !!this.$route.query.id;
    },

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
    addCurrency() {},

    /**
     * @description 取消添加bounty
     */
    cancel() {
      this.$confirm({
        title: 'Quit confirm',
        content: 'Do you want to keep the current content?',
        cancelText: 'Remove and quit',
        okText: 'Keep',
        onOk: () => {
          this.$router.push({ name: 'startupManage', query: { tab: 'bounty' } });
        }
      });
    },
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
              this.ethSendTranscation(this.form, id);
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
        if (this.isEdit) {
          // 更新
          // const bounty = await updateBounty()
        } else {
          // 创建 bounty
          const bounty = await createBounty({ ...formData, txid, id: bountyId });
          if (bounty) {
            this.$router.push({ name: 'startupManage', query: { tab: 'bounty' } });
          }
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
        formData.intro,
        formData.payment
      );
      return contractBounty;
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
