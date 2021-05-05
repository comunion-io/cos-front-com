<script>
import moment from 'moment';
import { proposalStatusTxtMap, proposalTypeTxtMap } from '@/constants';
import Loading from '../loading';
import services from '@/services';
import { getProposalLeftDays } from '@/utils';
import Descriptions from '@/components/display/Descriptions';
import Progress from './progress';
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
              <span class="t-primary"> {v}</span>
            </span>
          )
        },
        {
          label: 'Proposer Contact',
          value: 'contract',
          render: v => (
            <span>
              <a-icon type="mail" />` `
              <a href={`mailto:${v}`} />
            </span>
          )
        },
        {
          label: 'Description',
          value: 'description',
          render: v => <a href={v} target="_blank" />
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
          value: 'paymentAddr'
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
          render: (v, proposal) => `${v} ${proposal.tokenSymbol}`
        },
        {
          label: 'Payment Terms',
          value: 'terms'
        },
        {
          label: 'Total Amount',
          value: 'totalPaymentAmount',
          render: (v, proposal) => `${v} ${proposal.tokenSymbol}`
        },
        {
          label: 'Vote',
          render: (v, proposal) => (
            <div>
              <a-button type="primary">
                <a-icon type="like" />
                Vote YES
              </a-button>
              <a-button class="ml-16">
                <a-icon type="dislike" />
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
            <div class="header-cards">
              <div class="header-card">
                <div class="status">{proposalStatusTxtMap[this.proposal.status]}</div>
                <div className="desc">
                  <a-icon type="clock-circle" />
                  {getProposalLeftDays(this.proposal)}
                </div>
              </div>
              <div class="header-card">
                <Progress progress={48} target={this.proposal.supportPercent} />
                <div className="desc">
                  48%
                  <span class="text-gray">({this.proposal.supportPercent}% support needed)</span>
                </div>
              </div>
              <div class="header-card">
                <Progress progress={48} target={this.proposal.minApprovalPercent} />
                <div className="desc">
                  48%
                  <span class="text-gray">
                    ({this.proposal.minApprovalPercent}% approval needed)
                  </span>
                </div>
              </div>
            </div>
            <Descriptions columns={this.detailFields} labelWidth={276} dataSource={this.proposal} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
};
</script>

<style></style>
