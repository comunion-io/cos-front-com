<script>
import moment from 'moment';
import { proposalStatusTxtMap, proposalTypeTxtMap } from '@/constants';
import Loading from '../loading';
import services from '@/services';
import { getProposalLeftDays } from '@/utils';
import Descriptions from '@/components/display/Descriptions';
import Progress from './progress';
import Terms from './terms';
export default {
  props: {
    id: String
  },
  data() {
    return {
      fetched: false,
      proposal: {}
    };
  },
  computed: {
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
          render: (v, proposal) => (
            <div>
              <a-button type="primary" size="large" style="width:164px">
                <a-icon type="like" class="mr-4" />
                Vote YES
              </a-button>
              <a-button type="green" size="large" class="ml-16" style="width:164px">
                <a-icon type="dislike" class="mr-4" />
                Vote NO
              </a-button>
            </div>
          )
        }
      ];
    }
  },
  async mounted() {
    const { data } = await services['cores@proposal-获取']({ id: this.id });
    if (data) {
      this.proposal = data;
    }
    this.fetched = true;
  },
  render(h) {
    return (
      <div>
        {this.fetched ? (
          <div>
            <div class="proposal-header-cards flex">
              <div class="proposal-header-card flex-1 flex-column ai-center jc-center">
                <div class="f-24 t-primary">{proposalStatusTxtMap[this.proposal.status]}</div>
                <div class="mt-20 t-error f-14">
                  <a-icon type="clock-circle" class="mr-4" />
                  {getProposalLeftDays(this.proposal)}
                </div>
              </div>
              <div class="proposal-header-card flex-1 flex-column ai-center jc-center ml-16">
                <Progress percent={48} target={this.proposal.supportPercent} />
                <div class="mt-20 f-14 t-error">
                  48%
                  <span class="t-grey">({this.proposal.supportPercent}% support needed)</span>
                </div>
              </div>
              <div class="proposal-header-card flex-1 flex-column ai-center jc-center ml-16">
                <Progress percent={48} target={this.proposal.minApprovalPercent} />
                <div class="mt-20 f-14 t-error">
                  48%
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
