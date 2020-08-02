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
          <a-button type="primary" @click="onSubmit" block>
            Submit
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <div>
      <a-modal
        v-model="modalVisible"
        title="Add Skill Tags"
        @ok="clickOkInSkillsModal"
        @cancel="clickCancelInSkillsModal"
      >
        <p>
          <template v-for="tag in hunterSkills">
            <a-checkable-tag :key="tag" @change="handleSkillChange">
              {{ tag }}
            </a-checkable-tag>
          </template>
          <a-input
            v-if="inputSkillVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputSkillValue"
            @change="handleInputSkillChange"
            @blur="handleInputSkillConfirm"
            @keyup.enter="handleInputSkillConfirm"
          />
          <a-tag v-else style="background: #fff;" @click="showSkillInput">
            <a-icon type="plus" />
          </a-tag>
        </p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { urlValidator } from '@/utils/validators';
import { request } from '@/services/request';
// import { commonList } from '@/services/utils';

export async function getHunterSkills() {
  const { error, data } = await request('get', '/cores/tags', { source: 'skills' });
  return error ? {} : data;
}

export default {
  name: 'TransformHunter',
  components: {},
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
          { type: 'array', required: true, message: 'Please select skills', trigger: 'change' }
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
        email: [{ required: true, message: 'Please input email', trigger: 'blur' }]
      },
      createState: 'beforeCreate',
      balance: 0.1,
      wordsCount: 0,
      modalVisible: false,
      inputSkillVisible: false,
      inputSkillValue: '',
      hunterSkills: []
    };
  },
  async mounted() {
    const skills = await getHunterSkills();
    this.hunterSkills = skills;
    console.log(skills);
  },
  methods: {
    countWords() {
      const length = this.form.about.length;
      this.wordsCount = length;
    },
    showSkillsModal() {
      this.modalVisible = true;
    },
    clickOkInSkillsModal(e) {
      console.log(e);
      this.modalVisible = false;
    },
    clickCancelInSkillsModal(e) {
      console.log(e);
      this.modalVisible = false;
    },
    handleClose(removedTag) {
      const tags = this.hunterSkills.filter(tag => tag !== removedTag);
      console.log(tags);
      this.hunterSkills = tags;
    },
    handleSkillChange(checked) {
      console.log(checked);
    },
    showSkillInput() {
      this.inputSkillVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    handleInputSkillChange(e) {
      this.inputSkillValue = e.target.value;
    },
    handleInputSkillConfirm() {
      const inputSkillValue = this.inputSkillValue;
      let tags = this.hunterSkills;
      if (inputSkillValue && tags.indexOf(inputSkillValue) === -1) {
        tags = [...tags, inputSkillValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputSkillVisible: false,
        inputSkillValue: ''
      });
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
    // resetForm() {
    //   this.$refs.ruleForm.resetFields();
    // },
  }
};
</script>
