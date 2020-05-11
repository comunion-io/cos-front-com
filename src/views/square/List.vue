<template>
  <div id="home">
    <div class="total">
      <img src="@/assets/images/group@2x.png" alt="" />
      There are <span>{{ total }}</span> Startups In comunlon.
    </div>

    <!-- search -->
    <div class="search">
      <div class="select-box">
        <!-- <b-container fluid="false">
          <b-row :no-gutters="true">
            <b-col sm="3">
              <b-form-select v-model="selected" :options="options"></b-form-select>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="inputTxt" :type="'search'"></b-form-input>
            </b-col>
          </b-row>
        </b-container> -->
      </div>
    </div>

    <!-- 显示 comunion-->
    <div class="comunion-item"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      inputTxt: '',
      selected: -1,
      total: 434,
      options: [
        { value: '-1', text: 'all' },
        { value: '1', text: 'Non-profit Organization' },
        { value: '2', text: 'Business' },
        { value: '3', text: 'Education' }
      ]
    };
  }
};
</script>

<style scoped lang="less">
#home {
  background: rgba(242, 243, 244, 1);
  height: calc(100vh - 70px);
  padding: 40px 110px 0 110px;

  .total {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 12px;

    img {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }

    span {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      display: inline-block;
      margin: 0 5px;
    }
  }
}
</style>
