<!-- startup manage -> perference 子页面  -->
<template>
  <section class="startup-manage_perference">
    <div class="container">
      <div class="item">
        <div class="title">BlockChainAddress</div>
        <div class="value-wrap">
          <div class="value-text">{{ form.blockChainAddress }}</div>
          <a-tooltip>
            <template slot="title">
              <span>copy</span>
            </template>
            <div class="copy-btn" @click="copyBtnOnClick">
              <a-icon type="copy" />
            </div>
          </a-tooltip>
        </div>
      </div>
      <div class="item">
        <div class="title">Startup Name</div>
        <div class="value-wrap">
          <div class="value-text">{{ form.name }}</div>
        </div>
      </div>
      <div class="item">
        <div class="title">Type</div>
        <div class="value-wrap">
          <div class="value-text">{{ type }}</div>
        </div>
      </div>
      <div class="item">
        <div class="title required">Logo</div>
        <div class="value-wrap">
          <single-pic-upload
            v-model="form.logo"
            :disabled="!isEditing"
            style="height:108px;width:108px;margin-top:8px;"
          />
        </div>
      </div>
      <div class="item">
        <div class="title required">Mission</div>
        <div class="value-wrap">
          <a-textarea
            size="large"
            v-model="form.mission"
            :auto-size="{ minRows: 3, maxRows: 6 }"
            :max-length="200"
            placeholder="Startup mission"
            :disabled="!isEditing"
            style="margin-top: 8px;"
          />
        </div>
      </div>
      <div class="item">
        <div class="title required">Description</div>
        <div class="value-wrap">
          <a-input
            size="large"
            v-model="form.descriptionAddr"
            placeholder="https://"
            :disabled="!isEditing"
            style="margin-top: 8px;"
          />
          <div class="tip flex jc-end">
            No description,<a
              href="https://bbs.comunion.io/"
              target="_blank"
              style="margin-left: 4px;text-decoration: underline;"
              >Go to Post</a
            >
          </div>
        </div>
      </div>
      <div class="item">
        <div class="value-wrap">
          <p class="mt-20 t-grey f-14">
            Startup Name and Type can not be modified
          </p>
        </div>
      </div>
      <a-button
        class="mt-36 mb-36"
        :type="isEditing ? 'primary' : 'default'"
        size="large"
        disabled
        block
        @click="onHandle"
      >
        {{ isEditing ? 'Submit' : 'Edit' }}
      </a-button>
    </div>
  </section>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { mapGetters } from 'vuex';
import { getMyStartupDetail } from '@/services/startup.services';
import { merge } from '@/utils';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
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
      isEditing: false, // 是否正在编辑
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
    ...mapGetters(['categories', 'account', 'netWorkName']),
    // type
    type() {
      let type = this.categories.find(item => item.id === this.form.categoryId);
      return type ? type.name : '';
    }
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
    },
    // 复制按钮被点击
    copyBtnOnClick() {
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', this.form.blockChainAddress);
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length);
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      document.body.removeChild(input);
    },
    // 按钮被点击
    onHandle() {
      if (this.isEditing) {
        this.isEditing = false;
      } else {
        this.isEditing = true;
      }
    },
    // 提交
    onSubmit() {
      //
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
.container {
  width: 100%;
  max-width: 592px;
  margin: 0 auto;
  font-size: 16px;
  padding: 24px 0;

  .required {
    &:after {
      content: '*';
      color: red;
      margin-left: 6px;
    }
  }

  .item {
    margin-bottom: 8px;
  }

  .title {
    font-weight: bold;
    color: #000;
    line-height: 32px;
  }

  .value-wrap {
    position: relative;

    .value-text {
      line-height: 24px;
      min-height: 32px;
      padding: 4px 0 4px 16px;
      margin-right: 20px;
      color: #cdcdcd;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .copy-btn {
      font-size: 12px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #cdcdcd;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }

    .tip {
      font-size: 14px;
      line-height: 1;
      margin-top: 11px;
      color: #999999;
    }
  }
}
</style>
