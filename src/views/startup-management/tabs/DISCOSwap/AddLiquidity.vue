<template>
  <div class="add-liquidity">
    <p class="title">Add Liquidity</p>
    <div class="wrap">
      <div class="content">
        <div class="input-item">
          <div class="header">
            <span class="label">Input</span>
            <span class="balance">Balance 1000 ETH</span>
          </div>
          <div class="body">
            <div class="name">ETH</div>
            <div class="input-wrap">
              <input class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="symbol"></div>
        <div class="input-item">
          <div class="header">
            <span class="label">Input</span>
            <span class="balance">Balance 1000 ETH</span>
          </div>
          <div class="body">
            <div class="name">ETH</div>
            <div class="input-wrap">
              <input class="input" type="text" />
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <span style="font-weight: bold">Initial prices and pool share：</span>
        <span>1 (UVU per ETH)</span>
        <span>1 (ETH per UVU)</span>
        <span>100% (Share of Pool)</span>
      </div>
    </div>
    <p class="tip">
      When you add liquidity,you are given pool tokens representing your position.These tokens
      automatically earn fees proportional to your share of the pool, and can be redeemed at any
      time
    </p>
    <a-button type="primary" class="btn">
      Add - Liquidity
    </a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.add-liquidity {
  padding: 40px 30px;
  color: #000;
  .title {
    margin-bottom: 28px;
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
  }
  .wrap {
    padding: 30px;
    background-color: #f6f7fc;
    border-radius: 12px;
    .content {
      display: flex;
      .input-item {
        flex: 1;
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          .label {
            font-size: 16px;
            line-height: 20px;
          }
          .balance {
            color: #79828b;
            font-size: 12px;
          }
        }
        .body {
          background-color: #fff;
          display: flex;
          padding: 10px 12px;
          .name {
            font-size: 24px;
            font-weight: 500;
            line-height: 34px;
          }
          .input-wrap {
            flex: 1;
            .input {
              width: 100%;
              height: 100%;
              border: 0;
              outline: none;
              text-align: right;
              font-size: 24px;
              font-weight: 500;
            }
          }
        }
      }
      .symbol {
        flex: 0 0 80px;
        position: relative;
        &:before {
          content: '';
          display: block;
          width: 20px;
          height: 4px;
          border-radius: 2px;
          background-color: #000;
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
        }
        &:after {
          content: '';
          display: block;
          width: 4px;
          height: 20px;
          border-radius: 2px;
          background-color: #000;
          position: absolute;
          bottom: 17px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-top: 16px;
      color: #666;
    }
  }
  .tip {
    color: #bfbfbf;
    font-size: 14px;
    margin: 22px 0 26px;
  }
  .btn {
    width: 100%;
    height: 54px;
    font-size: 18px;
  }
}
</style>
