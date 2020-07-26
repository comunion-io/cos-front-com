<style scoped>
form label {
  font-size: 15px;
  font-weight: bold;
}
.text-counter {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
<template>
  <div>
    <a-card
      title="Transform Hunter"
      :bordered="false"
      :headStyle="{ fontSize: '24px', textAlign: 'center', borderBottom: 'none' }"
    >
      <a-form-model id="transform-hunter-form" class="vertical-form" :model="form" :rules="rules">
        <a-form-model-item label="Hunter Name" prop="name">
          <a-input v-model="form.name" placeholder="Hunter Name" size="large" :max-length="50" />
        </a-form-model-item>
        <a-form-model-item label="Skill Tag" prop="skills">
          <a-input
            v-model="form.skills"
            placeholder=""
            size="large"
            :max-length="50"
            @click="showSkillsModal"
          >
            <!-- <a-icon slot="prefix" type="user" /> -->
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="About" prop="about">
          <a-textarea
            v-model="form.about"
            placeholder=""
            :maxLength="200"
            @input="countWords"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
          <span class="text-counter">{{ wordsCount }}<span>/200</span></span>
        </a-form-model-item>
        <a-form-model-item label="Description" prop="descriptionAddr">
          <a-input
            v-model="form.descriptionAddr"
            placeholder="http://..."
            size="large"
            :max-length="200"
          />
          <span :style="{ float: 'right' }"
            >No description,<a href="//bbs.comunion.io/" target="new_blank">Go to Post</a></span
          >
        </a-form-model-item>
        <a-form-model-item label="Email" prop="email">
          <a-input v-model="form.email" placeholder="" size="large" :max-length="50" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" block>
            Submit
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <div>
      <a-modal
        v-model="visible"
        title="Add Skill Tags"
        @ok="clickOkInSkillsModal"
        @cancel="clickCancelInSkillsModal"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { urlValidator } from '@/utils/validators';
export default {
  name: 'TransformHunter',
  components: {},
  data() {
    return {
      form: {
        name: '',
        skills: '',
        about: '',
        descriptionAddr: '',
        email: ''
      },
      rules: {
        name: [{ required: true, message: 'Please input startup name', trigger: 'blur' }],
        skills: [{ required: true, message: 'Please select skills', trigger: 'blur' }],
        about: [{ required: true, message: 'Please input about', trigger: 'blur' }],
        descriptionAddr: [
          {
            required: true,
            validator: urlValidator,
            message: 'Please input correct description url',
            trigger: 'blur'
          }
        ],
        email: [{ required: true, message: 'Please input email', trigger: 'blur' }]
      },
      createState: 'beforeCreate',
      balance: 0.1,
      wordsCount: 0,
      visible: false
    };
  },
  computed: {},
  methods: {
    countWords() {
      var length = this.form.about.length;
      this.wordsCount = length;
    },
    showSkillsModal() {
      this.visible = true;
    },
    clickOkInSkillsModal(e) {
      console.log(e);
      this.visible = false;
    },
    clickCancelInSkillsModal(e) {
      console.log(e);
      this.visible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$store.commit('update', values);
        }
      });
    }
  }
};
</script>
