<style lang="less">
@import '~@/assets/styles/variables.less';
@import '~@yaireo/tagify/dist/tagify.css';
form label {
  font-size: 15px;
  font-weight: bold;
}
.text-counter {
  position: absolute;
  bottom: 0;
  right: 0;
}
.ant-modal-body {
  padding-bottom: 0;
}
.ant-modal-footer {
  border-top: none;
  text-align: center;
}
.ant-tag-checkable {
  background-color: #f3f3f3ff;
  color: #6170ff;
}
.ant-tag-checkable-checked {
  background-color: #ffffff;
  border-color: #6170ff;
  color: #6170ff;
}
</style>
<template>
  <div>
    <a-card
      title="Transform Hunter"
      :bordered="false"
      :headStyle="{ fontSize: '24px', textAlign: 'center', borderBottom: 'none' }"
    >
      <a-form-model
        id="transform-hunter-form"
        class="vertical-form"
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
        <a-form-model-item label="Hunter Name" prop="name">
          <a-input v-model="form.name" placeholder="Hunter Name" size="large" :max-length="50" />
        </a-form-model-item>
        <a-form-model-item label="Skill Tag" prop="skills">
          <a-input
            ref="skills"
            id="skills"
            v-model="form.skills"
            type="text"
            placeholder=""
            size="large"
            :max-length="50"
            @focus="showSkillsModal"
          />
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
          <a-input v-model="form.email" type="email" placeholder="" size="large" :max-length="50" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit" block>
            Submit
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-modal v-model="modalVisible" title="Add Skill Tags">
      <div>
        <template v-for="tag in hunterSkills">
          <a-checkable-tag
            :key="tag"
            :checked="checkedHunterSkills.indexOf(tag) > -1"
            @change="checked => handleSkillChecked(tag, checked)"
          >
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
          @change="handleSkillInputChange"
          @blur="handleSkillInputConfirm"
          @keyup.enter="handleSkillInputConfirm"
        />
        <a-tag v-else style="background: #F3F3F3; color: #6170FF;" @click="showSkillInput">
          <a-icon type="plus" />
        </a-tag>
      </div>
      <p style="margin-top: 25px;">
        You can choose up to <span style="color: red;">3</span> Skill Tags<span style="color: red;"
          >*</span
        >
      </p>
      <template slot="footer">
        <a-button key="back" style="width: 45%;" @click="handleSkillsCheckedCancel">
          Cancel
        </a-button>
        <a-button
          key="submit"
          style="width: 45%;"
          type="primary"
          @click="handleSkillsCheckedConfirm"
        >
          Save
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { urlValidator } from '@/utils/validators';
import { request } from '@/services/request';
import Tagify from '@yaireo/tagify';
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
        skills: '',
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
      // createState: 'beforeCreate',
      // balance: 0.1,
      wordsCount: 0,
      modalVisible: false,
      inputSkillVisible: false,
      inputSkillValue: '',
      hunterSkills: [],
      checkedHunterSkills: [],
      tagify: null,
      tagifySettings: {}
    };
  },
  async mounted() {
    const skills = await getHunterSkills();
    this.hunterSkills = skills;
    console.log(skills);
    var skillsInput = document.querySelector('#skills');
    this.tagify = new Tagify(skillsInput, {
      whitelist: []
    });
    this.tagify.on('focus', function(e) {
      this.modalVisible = true;
    });
  },
  methods: {
    countWords() {
      const length = this.form.about.length;
      this.wordsCount = length;
    },
    showSkillsModal() {
      this.modalVisible = true;
      this.$refs.skills.blur();
    },
    handleSkillsCheckedConfirm(e) {
      const skills = this.checkedHunterSkills.join();
      console.log(skills);
      this.tagify.addTags(skills);
      this.modalVisible = false;
    },
    handleSkillsCheckedCancel(e) {
      this.modalVisible = false;
    },
    // handleClose(removedTag) {
    //   const tags = this.hunterSkills.filter(tag => tag !== removedTag);
    //   console.log(tags);
    //   this.hunterSkills = tags;
    // },
    handleSkillChecked(tag, checked) {
      if (!checked) {
        this.checkedHunterSkills = this.checkedHunterSkills.filter(t => t !== tag);
      } else if (this.checkedHunterSkills.length < 3) {
        this.checkedHunterSkills = [...this.checkedHunterSkills, tag];
      }
    },
    showSkillInput() {
      this.inputSkillVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    handleSkillInputChange(e) {
      this.inputSkillValue = e.target.value;
    },
    handleSkillInputConfirm() {
      const inputSkillValue = this.inputSkillValue;
      let tags = this.hunterSkills;
      if (inputSkillValue && tags.indexOf(inputSkillValue) === -1) {
        tags.push(inputSkillValue);
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputSkillVisible: false,
        inputSkillValue: ''
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      });
    },
    onSubmit() {
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     alert('not submit!');
      //   }
      // });
    }
    // resetForm() {
    //   this.$refs.ruleForm.resetFields();
    // },
  }
};
</script>
