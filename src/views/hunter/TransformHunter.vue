<template>
  <a-card
    title="Transform Hunter"
    :bordered="false"
    :headStyle="{ fontSize: '24px', textAlign: 'center', borderBottom: 'none' }"
  >
    <a-row v-if="!success">
      <a-col :offset="4" :span="16">
        <a-form-model class="vertical-form" :model="form" :rules="rules" ref="form">
          <a-form-model-item label="Hunter Name" prop="name">
            <a-input v-model="form.name" placeholder="Hunter Name" size="large" :max-length="50" />
          </a-form-model-item>
          <a-form-model-item label="Skill Tag" prop="skills">
            <skills v-model="form.skills" />
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
            <a-button type="primary" size="large" :loading="loading" @click="onSubmit" block>
              Submit
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
    <a-result
      v-else
      status="success"
      title="Congratulations"
      sub-title="You already have transformed a hunter"
    >
      <template #extra>
        <a-button key="console" type="link" @click="backtoHome">
          &lt;&lt;&nbsp;Back to home
        </a-button>
      </template>
    </a-result>
  </a-card>
</template>

<script>
import { Result } from 'ant-design-vue';
import { urlValidator, emailValidator } from '@/utils/validators';
import { transformToHunter } from '@/services';
import BbsInput from '@/components/form/BbsInput';
import Skills from '@/components/form/Skills';

export default {
  name: 'TransformHunter',
  components: { Skills, BbsInput, [Result.name]: Result },
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
      loading: false,
      // 是否成功
      success: false
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          if (await transformToHunter(this.form)) {
            // 成功后续操作
            this.success = true;
          }
          this.loading = false;
        }
      });
    },
    backtoHome() {
      this.$router.replace({ name: 'square' });
    }
  }
};
</script>
