import copy from 'copy-to-clipboard';
import { message } from 'ant-design-vue';

// 可复制的合约地址组件
export default {
  name: 'CopyableAddress',
  functional: true,
  props: {
    // 合约地址
    address: {
      type: String,
      required: true
    }
  },
  methods: {
    doCopy() {
      copy('Text');
    }
  },
  render(h, context) {
    const { address } = context.props;
    return (
      <div
        class="flex-inline ai-center"
        onClick={() => {
          copy(address);
          message.success('Copied!');
        }}
      >
        <a>{address}</a>
        <a-icon type="copy" style="margin-left:50px;font-size:12px" />
      </div>
    );
  }
};
