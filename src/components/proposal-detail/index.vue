<script>
import moment from 'moment';
import {
  proposalStatusTxtMap,
  proposalStatusMap,
  proposalStatusColorMap,
  proposalTypeTxtMap
} from '@/constants';
import Loading from '../loading';
import services from '@/services';
// import { fmtProposalLeftDays, canVote } from '@/utils';
import { fmtProposalLeftDays } from '@/utils';
import Descriptions from '@/components/display/Descriptions';
import Progress from './progress';
import Terms from './terms';
import { mapGetters } from 'vuex';
import NumberInput from '../form/NumberInput.vue';
import { getTokenBalance } from '@/services/utils';
import proposalAbi from '@/libs/abis/proposal';
import { web3 } from '@/libs/web3';
import { COMMUNION_PROPOSAL_ACCOUNT } from '@/configs/app';

/**
 * 投票是否满足条件了，返回文字颜色
 */
function isMathced(current, target) {
  return current >= target ? '#52c41a' : '#f5222d';
}

export default {
  props: {
    id: String,
    startup: Object
  },
  data() {
    return {
      fetched: false,
      proposal: {},
      canDoVote: false,
      voteDialogVisible: false,
      voteYes: true,
      voteAmount: undefined,
      tokenBalance: undefined
    };
  },
  computed: {
    ...mapGetters(['account']),
    // 投赞成的百分比
    yesPercent() {
      return this.proposal.votes.length
        ? Math.round(
            (this.proposal.votes.filter(vote => vote.isApproved).length * 100) /
              this.proposal.votes.length
          ) / 100
        : 0;
    },
    detailFields() {
      return [
        {
          label: 'Proposal Title',
          value: 'title'
        },
        {
          label: 'Proposal Type',
          value: 'type',
          render: v => proposalTypeTxtMap[v]
        },
        {
          label: 'Created by',
          value: 'comer.name',
          render: v => (
            <span>
              <a-icon type="user" />
              <span class="t-primary ml-4">{v}</span>
            </span>
          )
        },
        {
          label: 'Proposer Contact',
          value: 'contact',
          render: v => (
            <span>
              <a-icon type="mail" />
              <a class="ml-4" href={`mailto:${v}`}>
                {v}
              </a>
            </span>
          )
        },
        {
          label: 'Description',
          value: 'description',
          render: v => (
            <a href={v} target="_blank">
              {v}
            </a>
          )
        },
        {
          label: 'Vote Duration',
          value: 'duration',
          render: (v, proposal) =>
            `${v} Days (${moment(proposal.createdAt).format('YYYY-MM-DD')}~${moment(
              proposal.createdAt
            )
              .add(v, 'days')
              .format('YYYY-MM-DD')})`
        },
        {
          label: 'Payment Address',
          value: 'paymentAddr',
          copyable: true
        },
        {
          label: 'Payments',
          value: 'paymentType',
          render: v => {
            // 支付类型 1.一次性支付 2.按月支付
            return { 1: 'One Time Pay', 2: 'Monthly Pay' }[v];
          }
        },
        {
          label: 'Total Months',
          value: 'paymentMonthes',
          render: v => `${v} month${v > 1 ? 's' : ''}`
        },
        {
          label: 'Payment Date',
          value: 'paymentDate'
        },
        {
          label: 'Payment Amount',
          value: 'paymentAmount',
          render: (v, proposal) => `${v} ${proposal.startup.tokenSymbol}`
        },
        {
          label: 'Payment Terms',
          value: 'terms',
          render: (v, proposal) => <Terms symbol={proposal.startup.tokenSymbol} terms={v} />
        },
        {
          label: 'Total Amount',
          value: 'totalPaymentAmount',
          render: (v, proposal) => `${v} ${proposal.startup.tokenSymbol}`
        },
        {
          label: 'Vote',
          render: (v, proposal) => {
            const voted = proposal.votes.find(vote => vote.walletAddr === this.account);
            if (voted) {
              return (
                <a-button type="primary" size="large" style="width:320px">
                  <a-icon type={voted.isApproved ? 'like' : 'dislike'} class="mr-4" />
                  <span class="mx-4">Vote {voted.isApproved ? 'YES' : 'NO'}</span>
                  <span>+{voted.amount}</span>
                </a-button>
              );
            }
            // voting
            if (proposal.status === proposalStatusMap.voting) {
              const yesBtn = (
                <a-button
                  type="primary"
                  size="large"
                  disabled={!this.canDoVote}
                  style="width:164px"
                  onClick={() => this.startVote(true)}
                >
                  <a-icon type="like" class="mr-4" />
                  Vote YES
                </a-button>
              );
              const noBtn = (
                <a-button
                  type="green"
                  size="large"
                  disabled={!this.canDoVote}
                  class="ml-16"
                  style="width:164px"
                  onClick={() => this.startVote(false)}
                >
                  <a-icon type="dislike" class="mr-4" />
                  Vote NO
                </a-button>
              );
              if (this.canDoVote) {
                return (
                  <div>
                    {yesBtn}
                    {noBtn}
                  </div>
                );
              } else {
                return (
                  <div>
                    <a-tooltip title="You have no privilege to vote.">{yesBtn}</a-tooltip>
                    <a-tooltip title="You have no privilege to vote.">{noBtn}</a-tooltip>
                  </div>
                );
              }
            }
            return proposalStatusTxtMap[proposal.status];
          }
        }
      ];
    }
  },
  methods: {
    async startVote(yes) {
      this.voteDialogVisible = true;
      this.voteYes = yes;
      this.tokenBalance = await getTokenBalance(this.startup.settings.tokenAddr, this.account);
    },
    async fetchData() {
      const { data } = await services['cores@proposal-获取']({ id: this.id });
      if (data) {
        this.proposal = data;
      }
    },
    async doVote() {
      // 调投票合约
      if (this.canDoVote) {
        const contract = new web3.eth.Contract(proposalAbi, COMMUNION_PROPOSAL_ACCOUNT);
        // 取后端一个id
        const { error, data } = await services['cores@startup-获取prepareid']();
        if (error) {
          this.$message.error('Error when vote.');
          throw error;
        }
        const args = [
          // string discoId;
          this.startup.id,
          // string serialId;
          data.id,
          // address voter;
          this.account,
          // uint256 pos;
          this.voteYes ? this.voteAmount : 0,
          // uint256 neg;
          this.voteYes ? 0 : this.voteAmount,
          // uint256 voteBt;
          0
        ];
        console.log('vote data', args);
        const voteContract = await contract.methods.doVote(args);
        const codeData = await voteContract.encodeABI();
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
            this.$message.success('Voting');
            this.fetchData();
          }
        );
      }
    }
  },
  async mounted() {
    await this.fetchData();
    this.fetched = true;
    // this.canDoVote = await canVote(this.startup, this.account);
    this.canDoVote = true;
  },
  render(h) {
    return (
      <div>
        {this.fetched ? (
          <div>
            <div class="proposal-header-cards flex">
              <div class="proposal-header-card flex-1 flex-column ai-center jc-center">
                <div
                  class="f-24 t-primary"
                  style={{ color: proposalStatusColorMap[this.proposal.status] }}
                >
                  {proposalStatusTxtMap[this.proposal.status]}
                </div>
                <div class="mt-20 t-error f-14">
                  <a-icon type="clock-circle" class="mr-4" />
                  {fmtProposalLeftDays(this.proposal?.duration)}
                </div>
              </div>
              <div class="proposal-header-card flex-1 flex-column ai-center jc-center ml-16">
                <Progress percent={this.proposal.votes.length} />
                <div class="mt-20 f-14">
                  <span
                    style={{
                      color: isMathced(
                        this.proposal.votes.length,
                        this.startup.settings.proposalSupporters
                      )
                    }}
                  >
                    {this.proposal.votes.length}
                  </span>
                  <span class="t-grey">
                    ({this.startup.settings.proposalSupporters} support
                    {this.startup.settings.proposalSupporters > 0 ? 's' : ''} needed)
                  </span>
                </div>
              </div>
              <div class="proposal-header-card flex-1 flex-column ai-center jc-center ml-16">
                <Progress
                  percent={this.yesPercent}
                  target={this.startup.settings.proposalMinApprovalPercent}
                />
                <div class="mt-20 f-14 t-error">
                  <span
                    style={{
                      color: isMathced(
                        this.yesPercent,
                        this.startup.settings.proposalMinApprovalPercent
                      )
                    }}
                  >
                    {this.yesPercent}%
                  </span>
                  <span class="t-grey">
                    ({this.startup.settings.proposalMinApprovalPercent}% approval needed)
                  </span>
                </div>
              </div>
            </div>
            <Descriptions
              class="mt-36"
              columns={this.detailFields}
              labelWidth={276}
              dataSource={this.proposal}
            />
            <a-modal
              title={`Vote ${this.voteYes ? 'YES' : 'NO'} Confirm`}
              okText="Submit"
              onOk={this.doVote}
            >
              <p class="mb-8">
                Please input the number of your votes. Each vote is 1 token. Your token will be
                locked during the voting period and released after the voting.
              </p>
              <NumberInput
                vModel={this.voteAmount}
                addonAfter={this.startup.settings.tokenSymbol}
              />
              <p class="mt-8">
                Balance：{this.tokenBalance} {this.startup.settings.tokenSymbol}
              </p>
            </a-modal>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
};
</script>

<style lang="less">
.proposal-header-card {
  height: 144px;
  background: #fff;
  box-shadow: 0px 4px 60px 0px rgba(208, 208, 208, 0.5);
}
</style>
