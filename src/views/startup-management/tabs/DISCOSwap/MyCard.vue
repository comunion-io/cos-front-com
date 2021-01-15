<template>
  <div
    class="card"
    :class="{ disco: type === 'disco', exchange: type === 'exchange', disabled: disabled }"
  >
    <div class="content">
      <div class="icon-wrap">
        <FundraisingIcon v-if="type === 'disco'" class="icon" />
        <TradingIcon v-else-if="type === 'exchange'" class="icon" />
      </div>
      <div class="info">
        <p class="name">
          {{ this.title }}
          <span
            v-if="statusText"
            class="status-text"
            :class="{
              'status-text-blue': statusTextType === 'blue',
              'status-text-red': statusTextType === 'red'
            }"
            >{{ statusText }}</span
          >
        </p>
        <ul class="text-list">
          <li v-for="(item, index) in textList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="footer" v-if="resultVisible">
      <div class="icon-wrap">
        <a-icon class="icon" type="check-circle" theme="filled" />
      </div>
      <div class="result">
        {{ this.resultDesc }}
      </div>
    </div>
    <div class="btn" v-if="!disabled" @click="onClick">
      <a-icon class="icon-btn" type="double-right" />
    </div>
  </div>
</template>

<script>
import FundraisingIcon from './fundraising.svg';
import TradingIcon from './trading.svg';
// 状态的文字描述, key值为字段type + '_' + 字段status
const statusTextMap = new Map([
  // DISCO募资合约生成中
  ['disco_1', 'Creating'],
  // DISCO募资合约生成成功
  ['disco_2', 'Wait for enable'],
  // DISCO募资合约生成失败
  ['disco_3', 'Failed to create contract'],
  // DISCO提交后pending
  ['disco_4', 'Pending'],
  // DISCO提交后失败
  ['disco_5', 'Failed to enable DISCO'],
  // DISCO提交后成功，募资等待开始
  ['disco_6', 'Waitting to start'],
  // DISCO提交成功-募资成功
  ['disco_7', 'Succeed'],
  // DISCO提交成功-募资失败
  ['disco_8', 'Failed'],
  // DISCO提交成功，募资进行中
  ['disco_9', 'In progress'],
  // DISCO提交成功，募资结束等待结果
  ['disco_13', 'Waiting for result'],
  // Exchange注入中
  ['exchange_10', 'Inpouring'],
  // exchange注入失败
  ['exchange_12', 'Inpour failed']
]);
export default {
  props: {
    status: {
      type: String
    },
    type: {
      type: String,
      default: 'disco'
    }
  },
  data() {
    return {};
  },
  components: {
    FundraisingIcon,
    TradingIcon
  },
  computed: {
    title() {
      return this.type === 'disco' ? 'DISCO' : 'Create Exchange';
    },
    textList() {
      return this.type === 'disco'
        ? [
            'Help investors get well investment project',
            'Help developers to change token to ETH',
            'Help start-up to raise the funds needed for the development'
          ]
        : [
            'Liquidity providers earn a 0.3% fee on all trades proportional to',
            'their share of the pool. Fees are added to the pool, accrue in real',
            'time and can be claimed by withdrawing your liquidity.'
          ];
    },
    resultDesc() {
      let desc = '';
      if (
        // DISCO提交后成功，募资等待开始
        (this.status === '6' && this.type === 'disco') ||
        // DISCO提交成功，募资进行中
        (this.status === '9' && this.type === 'disco') ||
        // DISCO提交成功，募资结束等待结果
        (this.status === '13' && this.type === 'disco')
      ) {
        desc =
          'You have enabled DISCO,Exchange will be opened automatically after successful fund-raising！';
      } else if (this.status === '11' && this.type === 'exchange') {
        desc = 'You have successfully add liquidity！';
      }
      return desc;
    },
    resultVisible() {
      let visible = false;
      if (
        // DISCO提交后成功，募资等待开始
        (this.status === '6' && this.type === 'disco') ||
        // DISCO提交成功，募资进行中
        (this.status === '9' && this.type === 'disco') ||
        // DISCO提交成功，募资结束等待结果
        (this.status === '13' && this.type === 'disco') ||
        // exchange注入成功
        (this.status === '11' && this.type === 'exchange')
      ) {
        visible = true;
      }
      return visible;
    },
    disabled() {
      let disabled = false;
      if (
        // 当DISCO募资合约生成中时
        this.status === '1' ||
        // 当DISCO募资合约生成成功，不可手动开启交易
        (this.status === '2' && this.type === 'exchange') ||
        // DISCO提交后pending，不可操作
        this.status === '4' ||
        // DISCO提交后成功，募资等待开始, 不可手动开启交易
        (this.status === '6' && this.type === 'exchange') ||
        // DISCO提交成功，募资进行中，不可手动开启交易
        (this.status === '9' && this.type === 'exchange') ||
        // DISCO提交成功，募资结束等待结果，不可手动开启交易
        (this.status === '13' && this.type === 'exchange') ||
        // Exchange注入中
        this.status === '10' ||
        // exchange注入成功，不可再开启募资
        (this.status === '11' && this.type === 'disco')
      ) {
        disabled = true;
      }
      return disabled;
    },
    // 状态文字样式类型 red红色 blue蓝色 gray灰色
    statusTextType() {
      let type = 'blue';
      if (
        // DISCO募资合约生成中
        (this.status === '1' && this.type === 'disco') ||
        // DISCO提交后pending
        (this.status === '4' && this.type === 'disco') ||
        // Exchange注入中
        (this.status === '10' && this.type === 'exchange')
      ) {
        type = 'gray';
      } else if (
        // DISCO募资合约生成成功
        (this.status === '2' && this.type === 'disco') ||
        // DISCO提交后成功，募资等待开始
        (this.status === '6' && this.type === 'disco') ||
        // DISCO提交成功-募资成功
        (this.status === '7' && this.type === 'disco') ||
        // DISCO提交成功，募资进行中
        (this.status === '9' && this.type === 'disco') ||
        // DISCO提交成功，募资结束等待结果
        (this.status === '13' && this.type === 'disco')
      ) {
        type = 'blue';
      } else if (
        // DISCO募资合约生成失败
        (this.status === '3' && this.type === 'disco') ||
        // DISCO提交后失败
        (this.status === '5' && this.type === 'disco') ||
        // DISCO提交成功-募资失败
        (this.status === '8' && this.type === 'disco') ||
        // exchange注入失败
        (this.status === '12' && this.type === 'exchange')
      ) {
        type = 'red';
      }
      return type;
    },
    // 状态文字文字描述，为undefind则不显示
    statusText() {
      let key = `${this.type}_${this.status}`;
      return statusTextMap.get(key);
    }
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    }
  }
};
</script>

<style lang="less" scoped>
@discoColor: #6170ff;
@exchangeColor: #f6af64;
@btnWidth: 58px;
.card {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
  padding-top: 30px;
  position: relative;
  &:last-of-type {
    margin-bottom: 0;
  }
  &.disco {
    background-color: lighten(@discoColor, 28%);
    .icon {
      color: @discoColor;
    }
    .result {
      color: @discoColor;
    }
    .btn {
      background-color: @discoColor;
    }
    .footer {
      background-color: lighten(@discoColor, 25%);
    }
  }
  &.exchange {
    background-color: lighten(@exchangeColor, 28%);
    .icon {
      color: @exchangeColor;
    }
    .result {
      color: @exchangeColor;
    }
    .btn {
      background-color: @exchangeColor;
    }
    .footer {
      background-color: lighten(@exchangeColor, 25%);
    }
  }
  &.disabled {
    background-color: #efefef;
    .icon {
      color: #fff;
    }
  }
  .content {
    display: flex;
    margin-bottom: 22px;
    .icon-wrap {
      flex: 0 0 170px;
      display: flex;
      justify-content: center;
      .icon {
        width: 72px;
        height: 72px;
        margin-top: 8px;
      }
    }
    .info {
      flex: 1;
      .name {
        height: 32px;
        line-height: 32px;
        color: #000;
        font-weight: bold;
        margin: 0 0 8px;
        font-size: 18px;
        .status-text {
          display: inline-block;
          height: 30px;
          padding: 0 16px;
          border-radius: 8px;
          background-color: #d7d7d7;
          line-height: 30px;
          font-size: 14px;
          font-weight: normal;
          margin-left: 20px;
          &.status-text-blue {
            background-color: lighten(@discoColor, 25%);
            color: @discoColor;
          }
          &.status-text-red {
            background-color: #ffeaea;
            color: #ff0000;
          }
        }
      }
      .text-list {
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          line-height: 30px;
          color: #666;
        }
      }
    }
  }
  .footer {
    display: flex;
    height: 56px;
    align-items: center;
    .icon-wrap {
      flex: 0 0 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 32px;
      .icon {
        font-size: 24px;
      }
    }
    .result {
      flex: 1;
      padding: 0 12px;
      font-weight: bold;
      line-height: 18px;
      margin-right: @btnWidth;
    }
  }
  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: @btnWidth;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    .icon-btn {
      font-size: 24px;
    }
  }
}
</style>
