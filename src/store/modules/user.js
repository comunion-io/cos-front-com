import { message } from 'ant-design-vue';
import { USER_ACCOUNT_ADDRESS } from '@/configs/storage';
import { web3, initWeb3 } from '@/libs/web3';
import { getNonce, login, logout } from '@/services';

const ls = window.localStorage;

const state = {
  //  登录后的账号，目前只是钱包地址
  account: ls.getItem(USER_ACCOUNT_ADDRESS) || ''
};

const mutations = {
  // 更新账户信息
  UPDATE_ACCOUNT(state, account) {
    state.account = account;
    ls.setItem(USER_ACCOUNT_ADDRESS, account);
  },
  // 账号发生变更
  HANDLE_NEW_CHAIN(state, chainId) {
    console.log(chainId);
  },
  // network更换了
  HANDLE_NEW_NETWORK(state, networkId) {
    switch (networkId) {
      case '1':
        console.log('This is mainnet');
        break;
      case '2':
        console.log('This is the deprecated Morden test network.');
        break;
      case '3':
        console.log('This is the ropsten test network.');
        break;
      case '4':
        console.log('This is the Rinkeby test network.');
        break;
      case '42':
        console.log('This is the Kovan test network.');
        break;
      default:
        console.log('This is an unknown network.');
    }
  }
};

const actions = {
  // 初始化用户
  initUser() {},
  // 用户登录
  async login({ commit }) {
    // 检查用户是否安装了metamask
    if (!!window.ethereum && window.ethereum.isMetaMask) {
      try {
        // 调用metamask登录
        const accounts = await ethereum.enable();
        // 取第1个账号
        const account = accounts[0].toLowerCase();
        // 初始化web3
        initWeb3();
        // 获取nonce
        const nonce = await getNonce(account);
        if (nonce) {
          // 对nonce签名
          let signature = await web3.eth.personal.sign(nonce, account);
          // 登录
          const ret = await login({ publicKey: account, signature });
          if (!ret) {
            throw new Error('Error when login, please try agian');
          }
          // 注册metamask事件
          // FIXME: on之前需要先off
          ethereum.autoRefreshOnNetworkChange = true;
          ethereum.on('chainIdChanged', arg => commit('HANDLE_NEW_CHAIN', arg));
          ethereum.on('networkChanged', arg => commit('HANDLE_NEW_NETWORK', arg));
          ethereum.on('accountsChanged', accounts => commit('UPDATE_ACCOUNT', accounts[0]));
        } else {
          throw new Error('Error when get nonce, please try again.');
        }
        commit('UPDATE_ACCOUNT', account);
      } catch (error) {
        message.error(error?.message || 'Error occured.');
      }
    } else {
      // 打开metamask官网
      window.open('https://metamask.io/');
      message.warning('You have not installed metamask.');
    }
  },

  /**
   * @description 用户登出
   * @param commit
   * @returns {Promise<void>}
   */
  async logout({ commit }) {
    await logout();
    commit('UPDATE_ACCOUNT', '');
  }
};

const getters = {
  // 获取我的钱包地址
  account: state => state.account,
  // 是否连接了metamask
  isLoggedIn: state => !!state.account
};

export default {
  state,
  mutations,
  actions,
  getters
};
