<template>
  <a-card
    title="Transform Hunter"
    :bordered="false"
    :headStyle="{ fontSize: '24px', textAlign: 'center', borderBottom: 'none' }"
  >
    <a-row>
      <a-col :offset="4" :span="16">
        <a-form-model id="transform-hunter-form" class="vertical-form" :model="form" :rules="rules">
          <a-form-model-item label="Hunter Name" prop="name">
            <a-input v-model="form.name" placeholder="Hunter Name" size="large" :max-length="50" />
          </a-form-model-item>
          <a-form-model-item label="Skill Tag" prop="skills">
            <a-input
              :value="form.skills"
              placeholder="Please select skills that required for the bounty"
              readonly
              @click="showSkillsModal"
            />
          </a-form-model-item>
          <a-form-model-item label="About" prop="about">
            <a-textarea
              v-model="form.about"
              placeholder="Please input something about bounty"
              :maxLength="200"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-model-item>
          <bbs-input v-model="form.descriptionAddr" prop="descriptionAddr" />
          <a-form-model-item label="Email" prop="email">
            <a-input
              v-model="form.email"
              placeholder="Please input contact's email"
              size="large"
              :max-length="50"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" size="large" @click="onSubmit" block>
              Submit
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
    <skill-modal v-if="skillVisible" v-model="skillVisible" @ok="saveSkills" />
  </a-card>
</template>

<script>
import { urlValidator, emailValidator } from '@/utils/validators';
import SkillModal from '@/components/modal/SkillModal';
import BbsInput from '@/components/form/BbsInput';

export default {
  name: 'TransformHunter',
  components: { SkillModal, BbsInput },
  data() {
    return {
      form: {
        name: '',
        skills: [],
        about: '',
        descriptionAddr: '',
        email: ''
      },
      rules: {
        name: [{ required: true, message: 'Please input startup name', trigger: 'blur' }],
        skills: [
          {
            type: 'array',
            required: true,
            min: 1,
            message: 'Please select skills',
            trigger: 'change'
          }
        ],
        about: [{ required: true, message: 'Please input about', trigger: 'blur' }],
        descriptionAddr: [
          {
            required: true,
            validator: urlValidator,
            message: 'Please input correct description url',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            validator: emailValidator,
            message: 'Please input correct email',
            trigger: 'blur'
          }
        ]
      },
      createState: 'beforeCreate',
      // balance: 0.1,
      skillVisible: false
    };
  },
  computed: {},
  methods: {
    showSkillsModal() {
      this.skillVisible = true;
    },
    saveSkills(v) {
      this.form.skills = v;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>
