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
import { fmtProposalLeftDays, canVote } from '@/utils';
import Descriptions from '@/components/display/Descriptions';
import Progress from './progress';
import Terms from './terms';
import { mapGetters } from 'vuex';
import NumberInput from '../form/NumberInput.vue';
import { getTokenBalance } from '@/services/utils';

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
    async doVote() {
      // TODO 调投票合约
    }
  },
  async mounted() {
    const { data } = await services['cores@proposal-获取']({ id: this.id });
    if (data) {
      this.proposal = data;
    }
    this.fetched = true;
    this.canDoVote = await canVote(this.startup, this.account);
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
                <Progress percent={48} />
                <div class="mt-20 f-14">
                  <span style={{ color: isMathced(5, this.proposal.supportPercent) }}>5</span>
                  <span class="t-grey">({this.proposal.supportPercent} support needed)</span>
                </div>
              </div>
              <div class="proposal-header-card flex-1 flex-column ai-center jc-center ml-16">
                <Progress percent={48} target={this.proposal.minApprovalPercent} />
                <div class="mt-20 f-14 t-error">
                  <span style={{ color: isMathced(48, this.proposal.minApprovalPercent) }}>
                    48%
                  </span>
                  <span class="t-grey">({this.proposal.minApprovalPercent}% approval needed)</span>
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
              <NumberInput vModel={this.voteAmount} addonAfter={this.startup.setting.tokenSymbol} />
              <p class="mt-8">
                Balance：{this.tokenBalance} {this.startup.setting.tokenSymbol}
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