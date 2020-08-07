<!-- startup manage -> perference 子页面  -->
<template>
  <section class="startup-manage_perference">
    <section class="content">
      <div class="form">
        <a-form-model class="vertical-form" :model="form" :layout="'horizontal'">
          <a-row :gutter="20">
            <a-col :span="16">
              <!-- Blockchain -->
              <a-form-model-item label="BlockChainAddress" prop="blockChainAddress">
                <a-input
                  size="large"
                  v-model="form.blockChainAddress"
                  placeholder="blockChainAddress"
                  :max-length="50"
                  :disabled="isEdit"
                />
              </a-form-model-item>
              <!-- name -->
              <a-form-model-item label="Startup Name" prop="name">
                <a-input
                  size="large"
                  v-model="form.name"
                  placeholder="Startup Name"
                  :max-length="50"
                  :disabled="isEdit"
                />
              </a-form-model-item>
              <!--  type -->
              <a-form-model-item label="Type" prop="categoryId">
                <a-select
                  size="large"
                  v-model="form.categoryId"
                  placeholder="Please select the type"
                  :disabled="isEdit"
                >
                  <a-select-option v-for="item in categories" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="6" :offset="2">
              <!--  logo-->
              <a-form-model-item label="Logo" prop="logo">
                <single-pic-upload
                  v-model="form.logo"
                  :disabled="isEdit"
                  style="height: 129px;width:129px;"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <!--  mission-->
          <a-form-model-item label="Mission" prop="mission">
            <a-textarea
              size="large"
              v-model="form.mission"
              :auto-size="{ minRows: 3, maxRows: 6 }"
              :max-length="200"
              placeholder="Startup mission"
              :disabled="isEdit"
            />
          </a-form-model-item>
          <!--  description on bbs-->
          <bbs-input v-model="form.descriptionAddr" :disabled="isEdit" />
          <a-form-model-item>
            <div class="flex">
              <a-button type="primary" size="large" disabled block html-type="submit">
                Submit
              </a-button>
            </div>
          </a-form-model-item>
          <p class="mt-32 t-grey">
            Startup Name and Type can not be modified
          </p>
        </a-form-model>
      </div>
    </section>
  </section>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getMyStartupDetail } from '@/services/startup.services';
import { mapGetters } from 'vuex';
import BbsInput from '../../startup/components/BbsInput.vue';
import { merge } from '@/utils';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    BbsInput
  },
  props: {
    startupId: {
      type: String,
      required: true
    }
  },
  data() {
    // 这里存放数据
    return {
      startup: undefined,
      isEdit: true,
      form: {
        blockChainAddress: '',
        name: '',
        categoryId: '',
        logo: '',
        mission: '',
        descriptionAddr: ''
      }
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['categories', 'account', 'netWorkName'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getStartup() {
      try {
        this.startup = await getMyStartupDetail(this.startupId);
        // this.patchValue();
        merge(this.form, this.startup);
        this.form.categoryId = this.startup.category.id;
        this.form.blockChainAddress = this.startup.transaction.blockAddr;
      } catch (err) {
        console.error(err);
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getStartup();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
