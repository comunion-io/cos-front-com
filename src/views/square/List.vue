<template>
  <div id="home">
    <div class="total">
      <img src="@/assets/images/group@2x.png" alt="" />
      There are <span>{{ total }}</span> Startups In comunlon.
    </div>

    <!-- search -->
    <div class="search">
      <div class="select-box">
        <a-input-group>
          <a-row>
            <a-col :span="4">
              <a-select default-value="Sign Up" style="width: 100%;" size="large">
                <a-select-option value="Sign Up">
                  Sign Up
                </a-select-option>
                <a-select-option value="Sign In">
                  Sign In
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="20">
              <a-input-search
                size="large"
                style="width: 100%;"
                placeholder="Input search comunion"
                @search="onSearch"
              />
            </a-col>
          </a-row>
        </a-input-group>
      </div>
    </div>

    <!-- 显示 comunion-->
    <div class="comunion-item">
      <card></card>
    </div>
  </div>
</template>

<script>
import Card from './card/Card';
export default {
  name: 'Home',
  components: {
    Card
  },
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
  },
  methods: {
    onSearch(searchTxt) {
      console.log(
        '%c 🍰 searchTxt: ',
        'font-size:20px;background-color: #E41A6A;color:#fff;',
        searchTxt
      );
    }
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
