<template>
  <a-card id="new-start-up" :bordered="false" style="margin-bottom: 24px;">
    <h1 class="title">New Startup</h1>
    <section class="content">
      <div class="form" v-if="createState === 'beforeCreate'">
        <a-form-model
          class="vertical-form"
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :layout="'horizontal'"
          @submit.prevent="onSubmit"
        >
          <a-row :gutter="20">
            <a-col :span="16">
              <!-- name -->
              <a-form-model-item label="Startup Name" prop="name">
                <a-input size="large" v-model="form.name" placeholder="Startup Name" />
              </a-form-model-item>
              <!--  type -->
              <a-form-model-item label="Type" prop="categoryId">
                <a-select
                  size="large"
                  v-model="form.categoryId"
                  placeholder="Please select the type"
                >
                  <a-select-option v-for="item in categories" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="6" :offset="2">
              <!--  logo-->
              <a-form-model-item label="Logo" prop="logo">
                <single-pic-upload v-model="form.logo" style="height: 129px;width:129px;" />
              </a-form-model-item>
              <!--  mission-->
            </a-col>
          </a-row>
          <a-form-model-item label="Mission" prop="mission">
            <a-input
              size="large"
              v-model="form.mission"
              type="textarea"
              :auto-size="{ minRows: 3, maxRows: 6 }"
            />
          </a-form-model-item>
          <!--  description on bbs-->
          <bbs-input v-model="form.descriptionAddr" />
          <!-- <a-form-model-item label="Description on bbs" prop="descriptionAddr">
            <a-input size="large" v-model="form.descriptionAddr" placeholder="https://" />
            <div class="flex jc-end">
              No bbs description,<a href="https://bbs.comunion.io/">Go to Post</a>
            </div>
          </a-form-model-item> -->
          <!--  submit-->
          <a-form-model-item>
            <a-tooltip
              placement="top"
              :visible="canNotTransaction()"
              title="Your credit is running low"
            >
              <a-button type="primary" size="large" block html-type="submit">
                Submit
              </a-button>
            </a-tooltip>
            <div>
              Balance:&nbsp;<span class="t-bold">{{ this.balance }} &nbsp;ETH</span>
            </div>
          </a-form-model-item>
          <p class="mt-32 t-grey">
            When you have completed all the information,
            <span class="t-bold">you will have a company on the blockchain</span>
          </p>
          <p class="t-grey">
            the whole process is similar to how you register a company with the Trade and Industry
            Bureau
          </p>
          <p class="t-grey">
            All the information what u had inputed, all that wil be
            <span class="t-bold">submited to the Ethereum Mainnet Blockchain</span>
          </p>
        </a-form-model>
      </div>
      <div class="creating" v-else-if="createState === 'creating'">
        <Creating />
      </div>
      <div class="success" v-else-if="createState === 'successed'">
        <Success />
      </div>
    </section>
  </a-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { COMUNION_RECEIVER_ACCOUNT, web3 } from '@/libs/web3';
import { createStartup } from '@/services';
import { urlValidator } from '@/utils/validators';
import BbsInput from './components/BbsInput';

export default {
  name: 'NewStartup',
  components: {
    BbsInput
  },
  data() {
    return {
      form: {
        name: '',
        categoryId: '',
        logo: '',
        mission: '',
        descriptionAddr: ''
      },
      rules: {
        name: [{ required: true, message: 'Please input startup name', trigger: 'blur' }],
        categoryId: [{ required: true, message: 'Please select type', trigger: 'change' }],
        mission: [{ required: true, message: 'Please input mission', trigger: 'blur' }],
        descriptionAddr: [
          {
            required: true,
            validator: urlValidator,
            message: 'Please input correct bbs description url',
            trigger: 'blur'
          }
        ]
      },
      createState: 'beforeCreate',
      balance: 0.1
    };
  },
  computed: {
    ...mapGetters(['categories', 'account'])
  },
  methods: {
    /**
     *@description 提交表单
     */
    onSubmit() {
      if (this.canNotTransaction()) {
        return;
      }
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.getTxid({ ...this.form });
        }
      });
    },

    /**
     * @description 获取钱包余额
     * @returns {Promise<void>}
     */
    async getBalance() {
      const balance = await web3.eth.getBalance(this.account);
      this.balance = +(balance / Math.pow(10, 18)).toFixed(4);
    },

    /**
     * @description 余额是否足够发起交易
     * @returns {boolean}
     */
    canNotTransaction() {
      console.log('this.balance :::', this.balance);
      return this.balance < 0.1;
    },
    /**
     * @description 构建hex, 生成txid
     * @param formData
     */
    async getTxid(formData) {
      let txid = web3.utils.sha3(JSON.stringify(formData));
      // 后端创建startup
      const success = await createStartup({ ...formData, txid });
      if (success) {
        /** logo不上链 */
        delete formData.logo;
        // 发起交易
        this.sendTransaction(formData, txid);
      }
    },
    async sendTransaction(formData, txid) {
      const params = {
        from: this.account,
        value: Math.pow(10, 17).toString(),
        to: COMUNION_RECEIVER_ACCOUNT,
        data: web3.utils.toHex({ ...formData, txid })
      };
      try {
        await web3.eth.sendTransaction(params);
      } catch (e) {
        console.log(e);
      }
    }
  },
  async mounted() {
    this.getBalance();
  }
};
</script>

<style scoped lang="less">
#new-start-up {
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
}
</style>
