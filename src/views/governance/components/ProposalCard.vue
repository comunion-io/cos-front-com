<template>
  <div class="container">
    <div class="row-middle">
      <div class="icon" :style="`background-image: url(${startupLogo});`" />
      <div class="name">
        {{ startupName }}
      </div>
      <div v-show="hasPayment" class="amount">{{ totalPaymentAmount }} {{ tokenSymbol }}</div>
    </div>
    <router-link
      class="title"
      :title="title"
      :to="{
        name: 'proposalDetail',
        params: {
          id: record && record.startup && record.startup.id,
          proposalId: record && record.id
        }
      }"
      >{{ title }}</router-link
    >
    <div class="row-middle footer-info">
      <span :class="status.color">Status: {{ status.text }}</span>
      <span v-if="showDuration">{{ duration }}</span>
      <span v-if="showComer">{{ comerName }}</span>
    </div>
  </div>
</template>

<script>
import { fmtNumber } from '@/utils/fmt';
import { fmtProposalLeftDays } from '@/utils';
import { proposalStatusMap, proposalStatusTxtMap } from '@/constants';
import logo from '@/assets/images/file@2x.png';

export default {
  props: {
    record: Object,
    showComer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    startupLogo() {
      return this.record?.startup?.logo || logo;
    },
    startupName() {
      return this.record?.startup?.name;
    },
    hasPayment() {
      return this.record?.hasPayment;
    },
    totalPaymentAmount() {
      return fmtNumber(this.record?.totalPaymentAmount);
    },
    tokenSymbol() {
      return this.record?.startup?.tokenSymbol;
    },
    title() {
      return this.record?.title;
    },
    comerName() {
      return this.record?.comer?.name;
    },
    showDuration() {
      return !!this.record?.duration;
    },
    duration() {
      const d = this.record?.duration;
      return fmtProposalLeftDays(d);
    },
    status() {
      return {
        text: proposalStatusTxtMap[this.record?.status],
        color: [proposalStatusMap.voting, proposalStatusMap.passed].includes(this.record?.status)
          ? 'status'
          : ''
      };
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px 32px;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0px 4px 4px 0px rgba(212, 212, 212, 0.5);
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}

.row-middle {
  display: flex;
  align-items: center;
}

.name {
  flex: 1;
  margin: 0 12px;
  font-size: 14px;
  font-family: Helvetica;
  color: #000000;
  line-height: 17px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.amount {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  font-family: Helvetica;
  color: #6271d2;
  line-height: 24px;
  background: #eff0fa;
  border-radius: 16px;
}

.title {
  display: block;
  max-width: 590px;
  height: 64px;
  width: 100%;
  font-size: 18px;
  font-family: Helvetica;
  text-align: left;
  color: #000000;
  line-height: 32px;
  margin: 12px 0 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-display: -webkit-box;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.footer-info {
  font-size: 14px;
  font-family: Helvetica;
  color: #999999;
  line-height: 17px;
  letter-spacing: 0px;
  & > span:not(:last-child):after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 3px;
    height: 3px;
    margin: 0 12px;
    border-radius: 50%;
    background-color: #999;
  }
}

.status {
  color: #00c73c;
}
</style>
