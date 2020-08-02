<script>
import TabPerference from './details/Perference';
export default {
  components: {
    TabPerference,
    TabBounty: () => import('./details/Bounty'),
    TabExchange: () => import('./details/Exchange'),
    TabIRO: () => import('./details/IRO'),
    TabVote: () => import('./details/Vote'),
    TabProposals: () => import('./details/Proposals')
  },
  data() {
    return {
      selectedTab: 'Perference',
      tabs: ['Perference', 'Bounty', 'Exchange', 'IRO', 'Vote', 'Proposals']
    };
  },
  render(h) {
    return (
      <div class="flex">
        <a-card title="Menu">
          <a-tabs vModel={this.selectedTab} tab-position="left">
            {this.tabs.map(tab => {
              const Comp = `Tab${tab}`;
              return (
                <a-tab-pane key={tab} tab={tab}>
                  <Comp id={this.$route.params.id} />
                </a-tab-pane>
              );
            })}
          </a-tabs>
        </a-card>
      </div>
    );
  }
};
</script>

<style></style>
