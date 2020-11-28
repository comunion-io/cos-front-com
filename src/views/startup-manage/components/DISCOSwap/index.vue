<template>
  <div class="disco-swap">
    <!-- 第一次进入 -->
    <MyCard status="0" type="disco" />
    <MyCard status="0" type="exchange" />
    <!-- DISCO募资合约生成中 -->
    <MyCard status="1" type="disco" />
    <MyCard status="1" type="exchange" />
    <!-- DISCO募资合约生成成功 -->
    <MyCard status="2" type="disco" />
    <MyCard status="2" type="exchange" />
    <!-- DISCO募资合约生成失败 -->
    <MyCard status="3" type="disco" />
    <MyCard status="3" type="exchange" />
    <!-- DISCO提交后pending -->
    <MyCard status="4" type="disco" />
    <MyCard status="4" type="exchange" />
    <!-- DISCO提交后失败 -->
    <MyCard status="5" type="disco" />
    <MyCard status="5" type="exchange" />
    <!-- DISCO提交后成功，募资等待开始 -->
    <MyCard status="6" type="disco" />
    <MyCard status="6" type="exchange" />
    <!-- DISCO提交成功-募资成功 -->
    <MyCard status="7" type="disco" />
    <MyCard status="7" type="exchange" />
    <!-- DISCO提交成功-募资失败 -->
    <MyCard status="8" type="disco" />
    <MyCard status="8" type="exchange" />
    <!-- DISCO提交成功，募资进行中 -->
    <MyCard status="9" type="disco" />
    <MyCard status="9" type="exchange" />
    <!-- Exchange注入中 -->
    <MyCard status="10" type="disco" />
    <MyCard status="10" type="exchange" />
    <!-- exchange注入成功 -->
    <MyCard status="11" type="disco" />
    <MyCard status="11" type="exchange" />
    <!-- exchange注入失败 -->
    <MyCard status="12" type="disco" />
    <MyCard status="12" type="exchange" />
  </div>
</template>

<script>
import MyCard from './MyCard';
export default {
  data() {
    return {};
  },
  components: {
    MyCard
  }
};
</script>

<style lang="less" scoped>
@discoColor: #6170ff;
@exchangeColor: #f6af64;

.disco-swap {
  padding: 30px;
}
</style>
