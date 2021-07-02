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
            ref="radioInput"
            class="input"
            type="number"
            @input="radioInputOnChange"
            @focus="radioInputOnFocus"
          />
          <span class="input-after">%</span>
        </div>
      </div>
      <div class="name">Transaction Deadline</div>
      <div class="input-wrap deadline">
        <input class="input" type="number" v-model="transactionDeadline" />
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
        />
      </div>
      <div class="switch-item">
        <span class="switch-name">Disable Multihops</span>
        <a-switch
          class="switch"
          checked-children="on"
          un-checked-children="off"
          v-model="disableMultihops"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
      transactionDeadline: '',
      toggleExpertMode: false,
      disableMultihops: false
    };
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
    },
    radioInputOnChange(e) {
      this.slippageTolerance = e.target.value;
    },
    radioInputOnFocus() {
      this.isSlippageToleranceCustom = true;
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
        }
        .ant-switch-inner {
          margin-left: 24px;
        }
      }
    }
  }
}
</style>
