<template>
  <a-card id="new-start-up" :bordered="false" style="margin-bottom: 24px;">
    <h1 class="title">New Startup</h1>
    <section class="content">
      <div class="form" v-if="createState === 'beforeCreate'">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :layout="'horizontal'"
          @submit.prevent="onSubmit"
        >
          <!-- name -->
          <a-form-model-item label="Startup Name" prop="name">
            <a-input v-model="form.name" placeholder="Startup Name" />
          </a-form-model-item>
          <!--  type -->
          <a-form-model-item label="Type" prop="categoryId">
            <a-select v-model="form.categoryId" placeholder="Please select the type">
              <a-select-option value="shanghai">
                Zone one
              </a-select-option>
              <a-select-option value="beijing">
                Zone two
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <!--  logo-->
          <a-form-model-item label="logo" prop="logo">
            <single-pic-upload v-model="form.logo" />
          </a-form-model-item>
          <!--  mission-->
          <a-form-model-item label="Mission" prop="mission">
            <a-input
              v-model="form.mission"
              type="textarea"
              :auto-size="{ minRows: 3, maxRows: 6 }"
            />
          </a-form-model-item>
          <!--  description on bbs-->
          <a-form-model-item label="Description on bbs" prop="descriptionAddr">
            <a-input v-model="form.descriptionAddr" placeholder="https://" />
            <div class="flex jc-end">
              No bbs description,<a href="https://bbs.comunion.io/">Go to Post</a>
            </div>
          </a-form-model-item>
          <!--  submit-->
          <a-form-model-item>
            <a-button type="primary" size="large" block html-type="submit">
              Submit
            </a-button>
            <div>Balance:&nbsp;<span class="t-bold">0.01ETH</span></div>
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

export default {
  name: 'NewStartup',
  computed: {
    ...mapGetters(['web3Info', 'getToAccount'])
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
        logo: [{ required: false, message: 'Please upload logo' }],
        mission: [{ required: true, message: 'Please input mission', trigger: 'blur' }],
        descriptionAddr: [{ required: true, message: 'Please input description', trigger: 'blur' }]
      },
      createState: 'beforeCreate'
    };
  },
  methods: {
    /**
     *@description 提交表单
     */
    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.getTxid(this.form);
        }
      });
    },
    /**
     * @description 构建hex, 生成txid
     * @param commit
     */
    async getTxid(formData) {
      let txid = this.web3Info.web3Instance().utils.sha3(JSON.stringify(formData));
      const startup = await this.$store.dispatch('createStartup', { ...formData, txid });
      if (startup) {
        // 发起交易
        const options = {
          from: this.web3Info.coinbase,
          value: 20,
          to: this.getToAccount,
          data: JSON.stringify({ ...formData, txid }),
          nonce: 1,
          gas: 4465030,
          gasPrice: 5000000000
        };
        const transaction = this.$store.dispatch('sendTransaction', options);
        console.log(
          '%c 🥑 transaction: ',
          'font-size:20px;background-color: #42b983;color:#fff;',
          transaction
        );
      }
    }
  }
};
</script>

<style scoped lang="less">
#new-start-up {
  .title {
    margin-top: 32px;
    text-align: center;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #000;
  }

  .content {
    margin: 0 auto;
    width: 100%;
    max-width: 760px;
  }
}
</style>
