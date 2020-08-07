<script>
import BountyList from '@/components/bounty-list/BountyList';
export default {
  render(h) {
    return (
      <a-card>
        <BountyList startupId={this.$route.params.id} />
      </a-card>
    );
  }
};
</script>

<style></style>
