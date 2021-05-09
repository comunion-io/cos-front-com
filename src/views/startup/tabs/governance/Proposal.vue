<script>
import ProposalDetail from '@/components/proposal-detail';
export default {
  props: {
    startup: Object
  },
  render() {
    return <ProposalDetail id={this.$route.params.proposalId} startup={this.startup} />;
  }
};
</script>

<style></style>
