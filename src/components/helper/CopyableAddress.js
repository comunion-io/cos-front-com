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
    if (!address) return null;
    return (
      <div class="flex-inline ai-center" style="max-width:100%">
        <a class="t-trunc" href={`https://cn.etherscan.com/tx/${address}`} target="_etherscan">
          {address}
        </a>
        <a-icon
          type="copy"
          style="margin-left:32px;font-size:12px"
          onClick={() => {
            copy(address);
            message.success('Copied!');
          }}
        />
      </div>
    );
  }
};
