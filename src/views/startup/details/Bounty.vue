<script>
import BountyList from '@/components/bounty-list/BountyList';

export default {
  props: {
    // startup id
    id: String
  },
  render(h) {
    return (
      <a-card>
        <BountyList startupId={this.id} />
      </a-card>
    );
  }
};
</script>

<style></style>
