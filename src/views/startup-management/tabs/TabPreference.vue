<!-- startup manage -> preference 子页面  -->
<template>
  <section class="startup-manage_preference">
    <div class="container">
      <div class="item">
        <div class="title">BlockChainAddress</div>
        <div class="value-wrap">
          <CopyableAddress :address="form.blockChainAddress" />
        </div>
      </div>
      <div class="item">
        <div class="title">Start-Up Name</div>
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
            placeholder="Start-Up mission"
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
            Start-Up Name and Type can not be modified
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
import { mapGetters } from 'vuex';

export default {
  props: {
    startup: {
      type: Object,
      required: true
    }
  },
  data() {
    // 这里存放数据
    return {
      isEditing: false, // 是否正在编辑
      form: {
        blockChainAddress: this.startup.transaction.blockAddr,
        name: this.startup.name,
        categoryId: this.startup.category.id,
        logo: this.startup.logo,
        mission: this.startup.mission,
        descriptionAddr: this.startup.descriptionAddr
      }
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['categories']),
    // type
    type() {
      let type = this.categories.find(item => item.id === this.form.categoryId);
      return type ? type.name : '';
    }
  },
  // 方法集合
  methods: {
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
  }
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
