<script>
export default {
  props: {
    id: String,
    startup: Object
  },
  components: {
    Governances: () => import('./governance/List')
  },
  render() {
    return this.$route.matched.length > 3 ? (
      <router-view id={this.id} startup={this.startup} />
    ) : (
      <governances id={this.id} />
    );
  }
};
</script>

<style></style>
