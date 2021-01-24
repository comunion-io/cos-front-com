<script>
import DiscoDetail from '@/components/disco-detail';
export default {
  props: {
    id: String,
    startup: Object
  },
  render(h) {
    return (
      <DiscoDetail id={this.id} tokenSymbol={this.startup?.settings?.tokenSymbol ?? ''} no-btn />
    );
  }
};
</script>

<style></style>
