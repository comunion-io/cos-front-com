<template>
  <div class="welcome-container">
    <a-row class="row">
      <a-col class="left" :span="7" style="background: red;">
        <h4>Comunion -去中心化组织（DAO）协作网络 下一代组织形式与创业互助网络</h4>
        <p>
          Comunion 是一个去中心化组织（DAO）协作网络，通过区块链重塑传统的人才交易和组织形式
          ，创建数字时代的全新商业基础设施和价值转化机制，让劳动价值像资本一样自由流通、交易和积累。
        </p>
        <p>
          在Comunion中，劳动者通过Comunion
          Bounty网络，通过技能直接交换项目的资本收益；创业者通过Comunion DAO
          网络，将创业计划初始化为对应的DAO组织，用于筹集项目启动所需的人力资源、资金、媒体等等资源、帮助创业者和劳动者实现自由的价值交易。
        </p>
        <a-button :size="'middle'" ghost>
          MORE
        </a-button>
      </a-col>
      <a-col class="middle" :span="7"></a-col>
      <a-col class="right" :span="10" style="background: red;">
        <p>To ensure that you can use Comunion</p>
        <p>please use metamask wallet to log in with Chrome browser</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.welcome-container {
  height: calc(100vh - 120px);
  .row {
    height: 100%;
    .left,
    .right,
    .middle {
      height: 100%;
    }
  }
}
</style>
