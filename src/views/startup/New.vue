<template>
  <a-card id="new-start-up" :bordered="false" style="margin-bottom: 24px;">
    <h1 class="title">{{ isEdit ? 'Edit' : 'New' }} Start-Up</h1>
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
              <a-form-model-item label="Start-Up Name" prop="name">
                <a-input
                  size="large"
                  v-model="form.name"
                  placeholder="Start-Up Name"
                  :max-length="50"
                  :disabled="isEdit"
                />
              </a-form-model-item>
              <!--  type -->
              <a-form-model-item label="Type" prop="categoryId">
                <a-select
                  size="large"
                  v-model="form.categoryId"
                  placeholder="Please select the type"
                  :disabled="isEdit"
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
                <single-pic-upload
                  v-model="form.logo"
                  :disabled="isEdit"
                  style="height: 129px;width:129px;"
                />
              </a-form-model-item>
              <!--  mission-->
            </a-col>
          </a-row>
          <a-form-model-item label="Mission" prop="mission">
            <a-textarea
              size="large"
              v-model="form.mission"
              :auto-size="{ minRows: 3, maxRows: 6 }"
              :max-length="200"
              placeholder="Start-Up mission"
              :disabled="isEdit"
            />
          </a-form-model-item>
          <!--  description on bbs-->
          <bbs-input v-model="form.descriptionAddr" :disabled="isEdit" />
          <!-- <a-form-model-item label="Description on bbs"prop="descriptionAddr">
            <a-input size="large" v-model="form.descriptionAddr" placeholder="https://" />
            <div class="flex jc-end">
              No bbs description,<a href="https://bbs.comunion.io/">Go to Post</a>
            </div>
          </a-form-model-item> -->
          <!--  submit-->
          <a-form-model-item>
            <div class="flex">
              <a-button v-if="isEdit" class="flex-1 mr-20" size="large" @click="cancelStartup"
                >Cancel</a-button
              >
              <a-tooltip
                class="flex-2"
                placement="top"
                :visible="canNotTransaction"
                title="wallet balance isn't enough."
              >
                <a-button type="primary" size="large" block html-type="submit">
                  Submit
                </a-button>
              </a-tooltip>
            </div>
            <div>
              Balance:&nbsp;<span class="t-bold">{{ this.balance }} &nbsp;ETH</span>
            </div>
          </a-form-model-item>
          <p class="mt-32 t-grey">
            <!--When you have completed all the information,-->
            <!--<span class="t-bold">you will have a company on the blockchain</span>-->
            All the information what u had inputed that will be submited to the Ethereum Mainnet
            Blockchain. The whole process is similar to how you register a company with the Trade
            and Industry Bureau
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
// import { Transaction } from 'ethereumjs-tx';
// import { EthereumTx } from 'ethereumjs-tx/dist/fake';
import { web3 } from '@/libs/web3';
import { COMUNION_RECEIVER_STARTUP_ACCOUNT } from '@/configs/app';
import { urlValidator } from '@/utils/validators';
import { startupAbi } from '@/libs/abis/startup';
import {
  createStartup,
  updateStartup,
  restoreStartUp,
  getPrepareStartupId,
  getMyStartupDetail
} from '@/services';
import { merge } from '@/utils';
import BbsInput from '@/components/form/BbsInput';

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
        name: [{ required: true, message: 'Please input start-up name', trigger: 'blur' }],
        categoryId: [{ required: true, message: 'Please select type', trigger: 'change' }],
        mission: [{ required: true, message: 'Please input mission', trigger: 'blur' }],
        descriptionAddr: [
          {
            required: true,
            validator: urlValidator,
            message: 'Please input correct description url',
            trigger: 'blur'
          }
        ]
      },
      createState: 'beforeCreate',
      balance: 0.1
    };
  },
  computed: {
    ...mapGetters(['categories', 'account', 'netWorkName']),
    // 是否是编辑模式
    isEdit() {
      return !!this.$route.query.id;
    },
    // 余额过少，不能发起交易
    canNotTransaction() {
      return this.balance < 0.1;
    }
  },
  methods: {
    // 取消startup
    cancelStartup() {
      this.$confirm({
        title: 'Quit confirm',
        content: 'Do you want to keep the current content?',
        cancelText: 'Remove and quit',
        okText: 'Keep',
        onCancel: async () => {
          if (await restoreStartUp(this.$route.query.id)) {
            this.$router.go(-1);
          }
        },
        onOk: () => {
          this.$router.go(-1);
        }
      });
    },
    /**
     *@description 提交表单
     */
    onSubmit() {
      if (this.canNotTransaction) {
        return;
      }
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            this.createState = 'creating';
            const startupId = await getPrepareStartupId();
            if (startupId) {
              const id = startupId.id;
              this.ethSendTransaction(this.form, id);
            }
          } catch (e) {
            console.error(e);
          }
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
     * @description 发起交易
     * @param formData: startup表单数据
     * @param startupId： startup id
     * @returns {Promise<void>}
     */
    async ethSendTransaction(formData, startupId) {
      const contractStatpUp = await this.getContractInstance(formData, startupId);
      const codeData = await contractStatpUp.encodeABI();
      const countAll = await web3.eth.getTransactionCount(this.account, 'pending');
      const chainId = await web3.eth.getChainId();

      const tx = {
        from: this.account,
        to: COMUNION_RECEIVER_STARTUP_ACCOUNT,
        data: codeData,
        value: web3.utils.numberToHex(Math.pow(10, 17)),
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
          console.log(
            '%c 🌰 result: ',
            'font-size:20px;background-color: #6EC1C2;color:#fff;',
            result
          );
          const txid = result.result;
          this.createStartUp(formData, startupId, txid);
        }
      );
    },

    /**
     * @description 构建hex, 生成txid
     * @param formData
     * @param startupId
     * @param txid
     */
    async createStartUp(formData, startupId, txid) {
      try {
        if (this.isEdit) {
          // 更新
          const startUp = await updateStartup(this.$router.query.id, { ...formData, txid });
          if (startUp) {
            this.createState = 'successed';
          }
        } else {
          // 后端创建startup
          const startUp = await createStartup({ ...formData, txid, id: startupId });
          if (startUp) {
            this.createState = 'successed';
          }
        }
      } catch (e) {
        console.log('%c\n  e :::----->', 'font-size:30px;background: purple;', e);
      }
    },

    /**
     * @description 获取合约实例
     * @returns {Promise<*>}
     */
    async getContractInstance(formData, id) {
      const contract = new web3.eth.Contract(startupAbi, COMUNION_RECEIVER_STARTUP_ACCOUNT);
      const contractStatpUp = await contract.methods.newStartup(
        id,
        formData.name,
        formData.categoryId,
        formData.mission,
        formData.descriptionAddr
      );
      return contractStatpUp;
    }
  },
  async mounted() {
    this.getBalance();
    if (this.isEdit) {
      const startup = await getMyStartupDetail(this.$route.query.id);
      merge(this.form, startup);
      this.form.categoryId = startup.category.id;
    }
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
