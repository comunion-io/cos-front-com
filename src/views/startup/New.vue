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
          <a-form-model-item label="Type" prop="type">
            <a-select v-model="form.type" placeholder="Please select the type">
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
          <a-form-model-item label="Description on bbs" prop="description">
            <a-input v-model="form.description" placeholder="https://" />
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
import Tx from 'ethereumjs-tx';

export default {
  name: 'NewStartup',
  computed: {
    ...mapGetters(['web3Info'])
  },
  data() {
    return {
      form: {
        name: '',
        type: '',
        logo: '',
        mission: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: 'Please input startup name', trigger: 'blur' }],
        type: [{ required: true, message: 'Please select type', trigger: 'change' }],
        logo: [{ required: true, message: 'Please upload logo' }],
        mission: [{ required: true, message: 'Please input mission', trigger: 'blur' }],
        description: [{ required: true, message: 'Please input description', trigger: 'blur' }]
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
          console.log(this.form);
          await this.$store.dispatch('getBlock');
          this.buildHex();
        }
      });
    },
    /**
     * @description 构建hex, 生成txid
     * @param commit
     */
    buildHex() {
      console.log(this.web3Info);
      const privateKey = Buffer.from(
        'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109',
        'hex'
      );
      var rawTx = {
        nonce: '0x00',
        gasPrice: '0x09184e72a000',
        gasLimit: '0x2710',
        to: '0x0000000000000000000000000000000000000000',
        value: '0x00',
        data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
      };
      const tx = new Tx(rawTx);
      tx.sign(privateKey);

      const serializedTx = tx.serialize();
      console.log(serializedTx);
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
