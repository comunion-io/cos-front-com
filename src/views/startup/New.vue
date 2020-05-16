<template>
  <div id="new-start-up">
    <div class="title">
      <p>New Startup</p>
    </div>
    <section class="content">
      <div class="form" v-if="createState === 'beforeCreate'">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :layout="'horizontal'"
          @submit.prevent="onSubmit"
        >
          <!-- name -->
          <a-form-model-item label="Startup Name" prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <!--  type -->
          <a-form-model-item label="Type" prop="type">
            <a-select v-model="form.type" placeholder="please select type">
              <a-select-option value="shanghai">
                Zone one
              </a-select-option>
              <a-select-option value="beijing">
                Zone two
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <!--  logo-->
          <a-form-model-item label="logo" prop="logo">
            <a-upload
              listType="picture-card"
              :show-upload-list="false"
              :customRequest="customRequest"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="logo" />
              <div v-else>
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
          </a-form-model-item>
          <!--  mission-->
          <a-form-model-item label="Mission" prop="mission">
            <a-input v-model="form.mission" type="textarea" />
          </a-form-model-item>
          <!--  description on bbs-->
          <a-form-model-item label="Description on bbs" prop="description">
            <a-input v-model="form.description" />
          </a-form-model-item>
          <!--  submit-->
          <a-form-model-item>
            <a-button type="primary" html-type="submit">
              Submit
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="creating" v-else-if="createState === 'creating'">
        <Creating />
      </div>
      <div class="success" v-else-if="createState === 'successed'">
        <Success />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NewStartup',
  data() {
    return {
      imageUrl: '',
      form: {
        name: '',
        type: '',
        logo: '',
        mission: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: 'Please input startup name', trigger: 'blur' }],
        type: [{ required: true, message: 'Please select type', trigger: 'change' }],
        logo: [{ required: true, message: 'Please upload logo' }],
        mission: [{ required: true, message: 'Please input mission', trigger: 'blur' }],
        description: [{ required: true, message: 'Please input description', trigger: 'blur' }]
      },
      createState: 'beforeCreate'
    };
  },
  methods: {
    /**
     * @description 自定义上传
     * @param data
     */
    customRequest(data) {
      const formData = new FormData();
      formData.append('file', data.file);
      this.form.logo = formData;
      this.getBase64(data.file);
    },

    /**
     * @description 图片转base64
     * @param img
     * @param callback
     */
    getBase64(img) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(img);
    },

    /**
     *@description 提交表单
     */
    async onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.form);
          this.$store.dispatch('sendTransaction', this.form);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
#new-start-up {
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  height: 80vh;

  .title {
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-top: 40px;
  }

  .content {
    margin-left: 110px;
    margin-right: 110px;

    .form {
      img {
        width: 103px;
        height: 103px;
      }

      .submit {
        width: 100%;
      }
    }
  }
}
</style>
