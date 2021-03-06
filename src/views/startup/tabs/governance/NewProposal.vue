<!-- 新建proposal -->
<template>
  <div class="new-proposal">
    <a-form-model
      class="vertical-form"
      ref="ruleForm"
      :model="form"
      :rules="rules"
      layout="horizontal"
      @submit.prevent="onSubmit"
    >
      <!-- Proposal Title -->
      <a-form-model-item label="Proposal Title" prop="proposalTitle" class="form-item">
        <a-input
          size="large"
          v-model="form.proposalTitle"
          placeholder="Please enter proposal title"
        />
      </a-form-model-item>
      <!-- Proposal Type -->
      <a-form-model-item label="Proposal Type" prop="proposalType" class="form-item">
        <a-select
          size="large"
          v-model="form.proposalType"
          placeholder="Please choose proposal nature"
        >
          <a-select-option v-for="item in proposalTypes" :key="item.value">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <!-- Your Contact -->
      <a-form-model-item label="Your Contact" prop="contact" class="form-item">
        <a-input size="large" v-model="form.contact" placeholder="Please enter your email" />
      </a-form-model-item>
      <!-- Description -->
      <bbs-input v-model="form.descriptionAddr" prop="descriptionAddr" />
      <!-- Governance Voter -->
      <a-form-model-item label="Governance Voter" prop="governanceVoter" class="form-item">
        <span>{{ governanceVoterText }}</span>
      </a-form-model-item>
      <!-- Vote Setting -->
      <a-form-model-item label="Vote Setting" prop="voteSetting" class="form-item">
        <span>
          <span style="margin-right: 16px;">{{ form.proposalSupporters }} Support</span>
          <span>{{ form.minApprovalPercent }}% Approval</span>
        </span>
      </a-form-model-item>
      <!-- Vote Duration -->
      <a-form-model-item label="Vote Duration" prop="voteDuration" class="form-item">
        <a-slider
          v-model="form.voteDuration"
          class="slider-item"
          :min="form.voteDurationMin"
          :max="form.voteDurationMax"
        />
        <a-input-number
          size="large"
          v-model="form.voteDuration"
          style="width:12%"
          :min="form.voteDurationMin"
          :max="form.voteDurationMax"
        />
        <span class="ml-4">days</span>
      </a-form-model-item>
      <!-- Payment -->
      <a-form-model-item label="Payment" prop="payment" class="form-item">
        <a-switch v-model="form.payment" />
      </a-form-model-item>
      <template v-if="form.payment">
        <!-- Payment Address -->
        <a-form-model-item label="Payment Address" prop="paymentAddress" class="form-item">
          <a-input
            size="large"
            v-model="form.paymentAddress"
            placeholder="Please input receiving fund raising wallet address"
          />
        </a-form-model-item>
        <!-- Payments -->
        <a-form-model-item label="Payments" prop="payments" class="form-item">
          <a-select size="large" v-model="form.payments">
            <a-select-option v-for="item in paymentsList" :key="item.value">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- Total Months -->
        <a-form-model-item
          v-if="form.payments === 2"
          label="Total Months"
          prop="totalMonths"
          class="form-item"
        >
          <number-input
            size="large"
            v-model="form.totalMonths"
            :min="0"
            placeholder="Please enter total months"
            addon-after="Month"
            @change="totalMonthsOnChange"
          />
        </a-form-model-item>
        <!-- Payment Date -->
        <a-form-model-item label="Payment Date" prop="paymentDate" class="form-item">
          <a-input
            size="large"
            v-model="form.paymentDate"
            placeholder="Please enter payment date"
          />
        </a-form-model-item>
        <!-- Payment Amount -->
        <a-form-model-item label="Payment Amount" prop="paymentAmount" class="form-item">
          <number-input
            size="large"
            v-model="form.paymentAmount"
            placeholder="Please enter payment amount"
            :addon-after="form.tokenSymbol"
            :min="0"
            @change="paymentAmountOnChange"
          />
        </a-form-model-item>
        <!-- Payment Terms -->
        <a-form-model-item label="Payment Terms" prop="paymentTerms" class="form-item">
          <a-switch v-model="form.paymentTerms" />
          <paymentTerms
            v-if="form.paymentTerms"
            :tokenSymbol="form.tokenSymbol"
            @change="paymentTermsValueOnChange"
          />
        </a-form-model-item>
        <!-- Total Payment Amount -->
        <a-form-model-item label="Total Payment Amount" prop="totalPaymentAmount" class="form-item">
          <number-input
            size="large"
            v-model="form.totalPaymentAmount"
            placeholder="Please enter total payment amount"
            :addon-after="form.tokenSymbol"
            :min="0"
            @change="totalPaymentAmountOnChange"
          />
        </a-form-model-item>
      </template>
      <!-- Submit -->
      <a-form-model-item class="form-item">
        <a-button
          type="primary"
          :loading="loading"
          html-type="submit"
          style="width: 100%;"
          size="large"
        >
          Submit
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Slider } from 'ant-design-vue';
import BbsInput from '@/components/form/BbsInput';
import NumberInput from '@/components/form/NumberInput';
import { proposalTypeTxtMap } from '@/constants/proposal';
import { governanceTypesMap } from '@/constants/governance';
import paymentTerms from './PaymentTerms';
import proposalAbi from '@/libs/abis/proposal';
import { web3 } from '@/libs/web3';
import { COMMUNION_PROPOSAL_ACCOUNT } from '@/configs/app';
import services from '@/services';
import { emptyWalletAddress } from '@/constants';

// 正数验证器
function positiveNumberValidator(rule, value, callback) {
  if (isNaN(Number(value)) || value <= 0) {
    let err = new Error('');
    callback(err);
  }
  callback();
}

export default {
  data() {
    return {
      loading: false,
      proposalTypes: Object.entries(proposalTypeTxtMap).map(item => ({
        name: item[1],
        value: item[0]
      })),
      // 支付形式列表
      paymentsList: [
        { name: 'One Time Pay', value: 1 },
        { name: 'Monthly Pay', value: 2 }
      ],
      form: {
        proposalTitle: '',
        proposalType: undefined,
        contact: '',
        descriptionAddr: '',
        governanceVoter: 1,
        proposalSupporters: '--', // 提案最少成案人数
        minApprovalPercent: '--',
        voteDuration: 1,
        voteDurationMin: 1,
        voteDurationMax: 1,
        payment: false,
        paymentAddress: '',
        payments: 2, // 支付形式，1：One Time Pay，2：Monthly Pay 默认为2（按月支付）
        totalMonths: 0,
        paymentDate: '',
        tokenSymbol: '*TOKEN*',
        paymentAmount: null,
        paymentTerms: false,
        paymentTermsValue: [],
        totalPaymentAmount: null
      },
      rules: {
        proposalTitle: [
          { required: true, trigger: 'blur', validator: '', message: 'Please enter proposal title' }
        ],
        proposalType: [
          { required: true, message: 'Please choose proposal nature', trigger: 'change' }
        ],
        contact: [
          {
            required: true,
            pattern: /^[A-Za-z0-9-_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            trigger: 'blur',
            validator: '',
            message: 'Please enter the correct email address'
          }
        ],
        descriptionAddr: [
          { required: true, trigger: 'blur', message: 'Please input correct description url' }
        ],
        voteDuration: [{ required: true }],
        paymentAddress: [
          {
            required: true,
            pattern: /^0(X|x)[A-Za-z0-9]{40}$/,
            trigger: 'blur',
            message:
              'Please input the correct address(40 chareacters starting with 0X including letters and numbers)'
          }
        ],
        payments: [{ required: true }],
        totalMonths: [
          {
            required: true,
            pattern: /^[1-9][0-9]*$/,
            trigger: 'blur',
            message: 'Please enter total months(Integer greater than 0)'
          }
        ],
        paymentDate: [{ required: true, trigger: 'blur', message: 'Please enter payment date' }],
        paymentAmount: [
          {
            required: true,
            trigger: 'blur',
            validator: positiveNumberValidator,
            message: 'Please enter payment amount'
          }
        ],
        totalPaymentAmount: [
          {
            required: true,
            trigger: 'blur',
            validator: positiveNumberValidator,
            message: 'Please enter total payment amount'
          }
        ]
      }
    };
  },
  props: {
    id: String,
    startup: {
      type: Object
    }
  },
  computed: {
    governanceVoterText() {
      return governanceTypesMap[this.form.governanceVoter];
    },
    ...mapGetters(['account'])
  },
  components: {
    BbsInput,
    NumberInput,
    paymentTerms,
    [Slider.name]: Slider
  },
  mounted() {
    console.log(this.startup);
    this.form.tokenSymbol = this.startup?.settings?.tokenSymbol;
    this.form.governanceVoter = this.startup?.settings?.voterType;
    this.form.proposalSupporters = this.startup?.settings?.proposalSupporters;
    this.form.minApprovalPercent = this.startup?.settings?.proposalMinApprovalPercent;
    this.form.voteDuration = this.startup?.settings?.proposalMinDuration;
    this.form.voteDurationMin = this.startup?.settings?.proposalMinDuration;
    this.form.voteDurationMax = this.startup?.settings?.proposalMaxDuration;
  },
  methods: {
    totalMonthsOnChange(value) {
      this.$refs.ruleForm.validateField('totalMonths');
    },
    paymentAmountOnChange(value) {
      this.$refs.ruleForm.validateField('paymentAmount');
    },
    totalPaymentAmountOnChange(value) {
      this.$refs.ruleForm.validateField('totalPaymentAmount');
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            title: this.form.proposalTitle,
            type: this.form.proposalType,
            contact: this.form.contact,
            description: this.form.descriptionAddr,
            duration: this.form.voteDuration,
            hasPayment: this.form.payment
          };
          if (this.form.payment) {
            params.paymentAddr = this.form.paymentAddress;
            params.paymentType = this.form.payments;
            params.paymentDate = this.form.paymentDate;
            params.paymentAmount = this.form.paymentAmount;
            params.totalPaymentAmount = this.form.totalPaymentAmount;
            // 按月支付需要设置总月数
            if (this.form.payments === 2) {
              params.paymentMonthes = this.form.totalMonths;
            }
            if (this.form.paymentTerms) {
              params.terms = this.form.paymentTermsValue;
            }
          }
          this.ethSendTransaction(params);
        }
      });
    },
    paymentTermsValueOnChange(value) {
      this.form.paymentTermsValue = value;
    },

    /**
     * @description 发起交易
     * @param formData
     * @returns {Promise<void>}
     */
    async ethSendTransaction(formData) {
      console.log(formData);
      // this.loading = true;
      const contractStatpUp = await this.getContractInstance(formData);
      const codeData = await contractStatpUp.encodeABI();
      const countAll = await web3.eth.getTransactionCount(this.account, 'pending');
      const chainId = await web3.eth.getChainId();

      const tx = {
        from: this.account,
        to: COMMUNION_PROPOSAL_ACCOUNT,
        data: codeData,
        value: 0,
        nonce: web3.utils.numberToHex(countAll),
        gasPrice: web3.utils.numberToHex(Math.pow(10, 12)),
        gasLimit: web3.utils.numberToHex(183943),
        chainId: chainId
      };

      // contractStatpUp.send(tx);
      window.ethereum.sendAsync(
        {
          method: 'eth_sendTransaction',
          params: [tx],
          from: window.ethereum.selectedAddress
        },
        (err, result) => {
          this.loading = false;
          if (err) {
            return console.error(err);
          }
          // const txid = result.result;
          this.$message.success('Operation is successful');
          this.$router.push({
            name: 'startupDetailGovernance'
          });
        }
      );
    },

    /**
     * @description 获取合约实例
     * @returns {Promise<*>}
     */
    async getContractInstance(formData) {
      // const data = JSON.parse(JSON.stringify(formData));
      const contract = new web3.eth.Contract(proposalAbi, COMMUNION_PROPOSAL_ACCOUNT);
      // 取后端一个id
      const { error, data } = await services['cores@startup-获取prepareid']();
      if (error) {
        this.$message.error('Error when create proposal.');
        throw error;
      }
      const proposal = [
        // discoId
        // this.startup.settings.id,
        this.id,
        // serialId
        data.id,
        // title
        formData.title,
        // ProposalStatus Voting
        0,
        // ProposalMode
        +formData.type - 1,
        // contact
        formData.contact,
        // description
        formData.description,
        // Payment
        formData.hasPayment
          ? [
              // payer
              formData.paymentAddr,
              // mode
              2 - formData.paymentType,
              // totalMonths
              formData.paymentMonthes,
              // date
              formData.paymentDate,
              // paymentAmount
              formData.paymentAmount,
              // totalAmount
              formData.totalPaymentAmount,
              // token;
              emptyWalletAddress,
              // pool
              emptyWalletAddress
            ]
          : [emptyWalletAddress, 0, 0, '', 0, 0, emptyWalletAddress, emptyWalletAddress],
        // ProposerSetup
        [
          // driver
          this.startup.settings.proposerType
        ],
        // voteSetup
        [
          // voteMinSupporters
          this.startup.settings.proposalSupporters,
          // voteMinApprovalPercent
          `${this.startup.settings.proposalMinApprovalPercent / 100}`,
          // voteDurationHours
          formData.duration * 24,
          // voteEndTime
          0
        ],
        // blockTime
        0,
        // proposer
        this.account
      ];
      const paymentDetails =
        formData.terms?.map((item, index) => ({
          index,
          token: item.number,
          terms: item.text
        })) ?? [];
      console.log('proposal contract', proposal, paymentDetails, contract.methods);
      /** 发起合约 */
      const contractProposal = await contract.methods.fullSet(proposal, paymentDetails);
      return contractProposal;
    }
  }
};
</script>

<style lang="less" scoped>
.new-proposal {
  width: 100%;

  .vertical-form {
    max-width: 590px;
    margin: 0 auto;

    /deep/ .ant-switch-checked {
      background-color: #4dd865;
    }
  }

  .slider-item {
    display: inline-block;
    margin-right: 16px;
    width: 72%;
    vertical-align: middle;
  }
}
</style>
