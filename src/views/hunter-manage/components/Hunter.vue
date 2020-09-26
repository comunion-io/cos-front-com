<template>
  <div class="hunter">
    <a-form-model
      class="vertical-form"
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :layout="'horizontal'"
      @submit.prevent="onSubmit"
    >
      <!-- name -->
      <a-form-model-item label="Hunter Name" prop="name" class="form-item">
        <a-input
          size="large"
          v-model="form.hunterName"
          placeholder="hunter name"
          :max-length="50"
          :disabled="isEdit"
        />
      </a-form-model-item>

      <!-- skills-->
      <a-form-model-item label="Skill" prop="skills" class="form-item">
        <skills v-model="form.skills" :disabled="isEdit" />
      </a-form-model-item>

      <!-- about -->
      <a-form-model-item label="About" prop="about" class="form-item">
        <a-input
          size="large"
          v-model="form.about"
          placeholder="about"
          :disabled="isEdit"
          :max-length="50"
        />
      </a-form-model-item>
      <!-- description -->
      <bbs-input v-model="form.descriptionAddr" :disabled="isEdit" />

      <!-- email -->
      <a-form-model-item label="Email" prop="email" class="form-item">
        <a-input
          size="large"
          v-model="form.email"
          :disabled="isEdit"
          placeholder="hunter name"
          :max-length="50"
        />
      </a-form-model-item>

      <a-form-model-item>
        <div class="flex">
          <a-button v-if="isEdit" class="flex-1 mr-20" size="large" @click="editHunter()">
            Edit
          </a-button>
          <a-button v-else type="primary" size="large" block html-type="submit">
            Submit
          </a-button>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { urlValidator } from '@/utils/validators';
import BbsInput from '@/components/form/BbsInput';
import Skills from '@/components/form/Skills';
import { mapGetters } from 'vuex';

export default {
  name: 'Hunter',
  components: {
    BbsInput,
    Skills
  },
  computed: {
    ...mapGetters(['hunterInfo'])
  },
  data() {
    return {
      form: {
        hunterName: '',
        skill: [],
        about: '',
        descriptionAddr: '',
        email: ''
      },

      rules: {
        name: [{ required: true, message: 'Please input startup name', trigger: 'blur' }],
        skills: [{ required: true, message: 'Please input skills', trigger: 'change' }],
        about: [{ required: true, message: 'Please input about', trigger: 'blur' }],
        descriptionAddr: [
          {
            required: true,
            validator: urlValidator,
            message: 'Please input correct description url',
            trigger: 'blur'
          }
        ],
        email: [{ required: true, message: 'Please email', trigger: 'blue' }]
      },
      /** 标记当前表单是否是编辑状态 */
      isEdit: true
    };
  },
  methods: {
    /**
     * @description 提交表单
     */
    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          // TODO
          console.log('%c\n  this.form :::----->', 'font-size:20px;background: purple;', this.form);
        }
      });
    },

    /**
     * @description 编辑hunter
     */
    editHunter() {
      this.isEdit = false;
    },

    initForm() {
      if (this.hunterInfo) {
        this.form = {
          hunterName: this.hunterInfo.name,
          about: this.hunterInfo.about,
          skill: this.hunterInfo.skills,
          descriptionAddr: this.hunterInfo.descriptionAddr,
          email: this.hunterInfo.email
        };
      }
    }
  },

  mounted() {
    this.initForm();
  }
};
</script>

<style scoped></style>
