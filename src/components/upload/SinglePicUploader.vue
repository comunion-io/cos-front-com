<script>
import { uploadFile } from '@/services';
import { sizeFormat } from '@/utils/size';
import { showPic } from '@/directives/imgPreview';

export default {
  props: {
    value: String,
    disabled: Boolean,
    // 图片大小限制
    maxSize: {
      type: Number,
      // 2M
      default: 2097152
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    setImage(v) {
      this.$emit('input', v);
      this.$emit('change', v);
    },
    customRequest(obj) {
      const { file, onError, onProgress, onSuccess } = obj;
      this.loading = true;
      uploadFile(file, {}, percent => {
        onProgress({ percent }, file);
      }).then(({ error, data }) => {
        if (error) {
          onError(error);
        } else {
          onSuccess(data, file);
          this.setImage(data);
          this.loading = false;
        }
      });
      return {
        abort() {
          // console.log('upload progress is aborted.')
        }
      };
    },
    beforeUpload(file) {
      if (file.size > this.maxSize) {
        this.$message.error(`Size limited: ${sizeFormat(this.maxSize)}.`);
        return false;
      }
      return true;
    },
    preview(e) {
      e.stopPropagation();
      showPic(this.value);
    },
    remove(e) {
      e.stopPropagation();
      this.setImage('');
    }
  },
  render() {
    return (
      <a-upload
        class="single-pic-uploader"
        showUploadList={false}
        accept="image/*"
        listType="picture-card"
        customRequest={this.customRequest}
        disabled={this.disabled}
        {...{ props: this.$attrs }}
        beforeUpload={this.beforeUpload}
        // onChange={this.onFileChange}
      >
        {this.loading ? (
          <a-icon type="loading" style={{ fontSize: '48px' }} />
        ) : this.value ? (
          <div class="thumbnail-wrapper flex ai-center jc-center">
            {this.disabled ? (
              <img src={this.value} class="thumbnail" vPreview />
            ) : (
              [
                <img src={this.value} class="thumbnail" />,
                <div class="thumbnail-mask flex ai-center jc-center">
                  <a-icon type="eye-o" src={this.value} onClick={this.preview} />
                  <a-icon class="ml-12" type="delete" onClick={this.remove} />
                </div>
              ]
            )}
          </div>
        ) : (
          <div class="ant-upload-text">Click to upload</div>
        )}
      </a-upload>
    );
  }
};
</script>

<style lang="less">
.single-pic-uploader {
  .ant-upload-select-picture-card {
    border-style: solid;
    width: 100%;
    height: 100%;
    min-width: 104px;
    min-height: 104px;
  }
  .thumbnail-wrapper {
    position: relative;
    height: 100%;
    &:hover {
      .thumbnail-mask {
        opacity: 1;
      }
    }
    .thumbnail {
      max-width: 100%;
      max-height: 100%;
    }
    .thumbnail-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      > .anticon {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>
