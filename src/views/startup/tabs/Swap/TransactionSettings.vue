<template>
  <div class="transaction-settings">
    <div class="icon-btn" @click="btnOnClick">
      <a-icon type="setting" />
    </div>

    <!-- 面板内容 -->
    <div v-if="panelVisible" class="panel">
      <div class="title">Transaction Settings</div>
      <div class="name">Slippage Tolerance</div>
      <div class="radios">
        <div
          class="radio-item"
          :class="{ active: slippageTolerance === item && !isSlippageToleranceCustom }"
          v-for="item in slippageToleranceList"
          :key="item"
          @click="selectSlippageTolerance(item)"
        >
          {{ item }}%
        </div>
        <div class="radio-input input-wrap" :class="{ active: isSlippageToleranceCustom }">
          <input
            class="input"
            ref="radioInput"
            type="number"
            @input="radioInputOnChange"
            @focus="radioInputOnFocus"
          />
          <span class="input-after">%</span>
        </div>
      </div>
      <div class="name">Transaction Deadline</div>
      <div class="input-wrap deadline">
        <input
          class="input"
          type="number"
          v-model="transactionDeadline"
          @input="saveSettings"
          @change="transactionDeadlineOnChange"
        />
        <span class="input-after">minutes</span>
      </div>
      <div class="name">Interface Settings</div>
      <div class="switch-item">
        <span class="switch-name">Toggle Expert Mode</span>
        <a-switch
          class="switch"
          checked-children="on"
          un-checked-children="off"
          v-model="toggleExpertMode"
          @change="saveSettings"
        />
      </div>
      <div class="switch-item">
        <span class="switch-name">Disable Multihops</span>
        <a-switch
          class="switch"
          checked-children="on"
          un-checked-children="off"
          v-model="disableMultihops"
          @change="saveSettings"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SWAP_TRANSACTION_SETTINGS } from '@/configs/storage';
const TRANSACTION_DEADLINE_DEFAULT = 20;

export default {
  data() {
    return {
      /** 面板是否显示 */
      panelVisible: false,
      /** 是否自定义滑点 */
      isSlippageToleranceCustom: false,
      /** 预设滑点列表 */
      slippageToleranceList: [0.1, 0.5, 1],
      /** 滑点值 */
      slippageTolerance: 0.1,
      /** 交易截止时间 单位:minutes */
      transactionDeadline: TRANSACTION_DEADLINE_DEFAULT,
      toggleExpertMode: false,
      disableMultihops: false
    };
  },
  watch: {
    panelVisible(value) {
      if (value) {
        let settingInfo = localStorage.getItem(SWAP_TRANSACTION_SETTINGS);
        if (settingInfo) {
          settingInfo = JSON.parse(settingInfo);
          this.toggleExpertMode = !!settingInfo.interfaceSettings?.toggleExpertMode;
          this.disableMultihops = !!settingInfo.interfaceSettings?.disableMultihops;
          this.transactionDeadline =
            settingInfo.transactionDeadline || TRANSACTION_DEADLINE_DEFAULT;
          if (settingInfo.slippageTolerance) {
            this.slippageTolerance = settingInfo.slippageTolerance;
            if (this.slippageToleranceList.indexOf(settingInfo.slippageTolerance) === -1) {
              this.isSlippageToleranceCustom = true;
              this.$nextTick(() => {
                this.$refs.radioInput.value = settingInfo.slippageTolerance;
              });
            } else {
              this.isSlippageToleranceCustom = false;
            }
          } else {
            this.slippageTolerance = this.slippageToleranceList[0];
          }
        }
      }
    }
  },
  methods: {
    // 设置按钮被点击
    btnOnClick() {
      this.panelVisible = !this.panelVisible;
    },
    // 选择滑点
    selectSlippageTolerance(value) {
      this.slippageTolerance = value;
      this.isSlippageToleranceCustom = false;
      this.saveSettings();
    },
    radioInputOnChange(e) {
      this.slippageTolerance = Number(e.target.value);
      this.saveSettings();
    },
    radioInputOnFocus() {
      this.isSlippageToleranceCustom = true;
      this.saveSettings();
    },
    transactionDeadlineOnChange(e) {
      if (!e.target.value) {
        this.transactionDeadline = TRANSACTION_DEADLINE_DEFAULT;
        this.saveSettings();
      }
    },
    // 保存设置参数
    saveSettings() {
      let settings = {
        slippageTolerance: this.slippageTolerance, // 滑点值
        transactionDeadline: Number(this.transactionDeadline),
        interfaceSettings: {
          toggleExpertMode: this.toggleExpertMode,
          disableMultihops: this.disableMultihops
        }
      };
      localStorage.setItem(SWAP_TRANSACTION_SETTINGS, JSON.stringify(settings));
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.transaction-settings {
  width: 30px;
  height: 30px;

  .icon-btn {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .panel {
    width: 300px;
    padding: 8px 16px;
    position: absolute;
    top: 0;
    right: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    background-color: #fff;
    z-index: 1;

    .title {
      font-size: 16px;
      color: #000;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .name {
      font-size: 14px;
      margin-bottom: 8px;
      color: #000;
    }

    .radios {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;

      .radio-item {
        flex: 0 0 40px;
        height: 22px;
        border-radius: 11px;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover,
        &.active {
          border-color: #6170ff;
        }
      }

      .radio-input {
        width: 100px;
        .input {
          width: 70px;
        }
        &:hover,
        &.active {
          border-color: #6170ff;
        }
      }
    }

    .input-wrap {
      height: 22px;
      display: flex;
      align-items: center;
      border-radius: 11px;
      border: 1px solid #ccc;
      overflow: hidden;
      padding: 0 8px;

      .input {
        flex: 1;
        border: 0;
        outline: none;
      }

      .input-after {
        line-height: 20px;
      }
    }

    .deadline {
      width: 150px;
      margin-bottom: 8px;
      .input {
        width: 75px;
      }
    }

    .switch-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .switch-name {
        color: #999;
      }
      .switch {
        height: 22px;
        width: 50px;
        min-width: 50px;
        line-height: 20px;
        &::after {
          width: 16px;
          height: 16px;
        }
      }
      @{deep} {
        .ant-switch-checked .ant-switch-inner {
          margin-left: 6px;
          margin-right: 24px;
        }
        .ant-switch-inner {
          margin-left: 24px;
        }
      }
    }
  }
}
</style>
