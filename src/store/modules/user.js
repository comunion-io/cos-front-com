import { message } from 'ant-design-vue';
import { LOGIN_TIME, NET_WORK_NAME, USER_INFO, USER_ACCOUNT_ADDRESS } from '@/configs/storage';
import { web3, initWeb3 } from '@/libs/web3';
import services, { getNonce, login, logout, getMe } from '@/services';
import router from '@/router';

const ls = window.localStorage;

let user;
try {
  user = JSON.parse(ls.getItem(USER_INFO));
} catch (error) {}

const state = {
  // 用户信息
  user: user || {},
  /** 登录后的账号，目前只是钱包地址 */
  account: ls.getItem(USER_ACCOUNT_ADDRESS) || '',
  /** metamask 网络名称 */
  netWorkName: ls.getItem(NET_WORK_NAME) || '',
  /** 登录时间 */
  logInTime: ls.getItem(LOGIN_TIME)
  // hunter信息
  // hunterInfo: null
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    if (user.id) {
      ls.setItem(USER_INFO, JSON.stringify(user));
    } else {
      ls.removeItem(USER_INFO);
    }
  },

  /**
   * @description metamask 切换账号， comunion需要退出重登
   *
   * @param state
   * @param [account='']
   */
  UPDATE_ACCOUNT(state, account = '') {
    state.account = account;
    ls.setItem(USER_ACCOUNT_ADDRESS, account);
  },

  /**
   * @description chain id 发生变更
   *
   * @param state
   * @param chainId
   */
  HANDLE_NEW_CHAIN(state, chainId) {
    console.log(chainId);
  },

  /**
   * @description 登陆时间
   * @param state
   * @param loginTime
   * @constructor
   */
  UPDATE_LOGIN_TIME(state, loginTime) {
    state.logInTime = loginTime;
    ls.setItem(LOGIN_TIME, loginTime);
  },

  // network更换了
  HANDLE_NEW_NETWORK(state, networkId) {
    switch (networkId) {
      case '1':
        console.log('This is mainnet');
        state.netWorkName = 'mainnet';
        ls.setItem(NET_WORK_NAME, 'mainnet');
        break;
      case '2':
        console.log('This is the deprecated Morden test network.');
        state.netWorkName = 'Morden';
        ls.setItem(NET_WORK_NAME, 'Morden');

        break;
      case '3':
        console.log('This is the ropsten test network.');
        state.netWorkName = 'ropsten';
        ls.setItem(NET_WORK_NAME, 'ropsten');

        break;
      case '4':
        console.log('This is the Rinkeby test network.');
        state.netWorkName = 'Rinkeby';
        ls.setItem(NET_WORK_NAME, 'Rinkeby');

        break;
      case '5':
        console.log('this is the Goerli test network');
        state.netWorkName = 'Goerli';
        ls.setItem(NET_WORK_NAME, 'Goerli');

        break;
      case '42':
        console.log('This is the Kovan test network.');
        state.netWorkName = 'Kovan';
        ls.setItem(NET_WORK_NAME, 'Kovan');

        break;
      default:
        console.log('This is an unknown network.');
        state.netWorkName = 'unknown';
        ls.setItem(NET_WORK_NAME, 'unknown');
    }
  }

  // 设置我的hunter信息
  // SET_MY_HUNTER_INFO(state, hunterInfo) {
  //   state.hunterInfo = hunterInfo;
  // }
};

const actions = {
  // 刷新我的个人信息
  async refreshMe({ commit }) {
    // 获取我的信息
    const myInfo = await getMe();
    if (myInfo) {
      commit('SET_USER', myInfo);
    }
  },
  // 初始化用户
  initUser({ getters, commit, dispatch }) {
    // 已登录
    if (getters.isLoggedIn) {
      initWeb3();
      if (ethereum && ethereum.isMetaMask) {
        ethereum.autoRefreshOnNetworkChange = true;
        ethereum.on('chainIdChanged', arg => commit('HANDLE_NEW_CHAIN', arg));
        ethereum.on('networkChanged', arg => commit('HANDLE_NEW_NETWORK', arg));
        ethereum.on('accountsChanged', accounts => commit('UPDATE_ACCOUNT', accounts[0]));
      } else {
        message.warning('You have not installed metamask.');
      }
      // 获取我的信息
      dispatch('refreshMe');
    }
  },
  /**
   * descriptions 用户登录
   * @param dispatch
   * @param commit
   * @returns {Promise<boolean>}
   */
  async login({ dispatch, commit }) {
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
        // 获取当前连接网络的ID
        const netWorkId = await web3.eth.net.getId();
        commit('HANDLE_NEW_NETWORK', netWorkId + '');

        if (nonce) {
          // 对nonce签名
          let signature = await web3.eth.personal.sign(nonce, account);
          // 登录
          const ret = await login({ publicKey: account, signature });
          if (!ret) {
            throw new Error('Error when login, please try again');
          }
          commit('SET_USER', ret);
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

        commit('UPDATE_LOGIN_TIME', new Date().getTime());

        /** 不刷新网页的情况下， 6个小时自动登出 */
        setTimeout(() => {
          dispatch('logout');
        }, 2 * 60 * 60 * 1000);
      } catch (error) {
        message.error(error?.message || 'Error occured.');
      }
      return true;
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
    commit('SET_USER', {});
    // 跳到首页
    if (router.currentRoute.name !== 'square') {
      router.push({ name: 'square', query: { from: router.currentRoute.fullPath } });
    }
  },

  // transform hunter
  async transformHunter({ dispatch }, data) {
    if (await services['account@用户-hunter-更新'](data)) {
      // 获取我的信息
      dispatch('refreshMe');
      return true;
    }
  }
};

const getters = {
  // 用户信息
  user: state => state.user,
  // 获取我的钱包地址
  account: state => state.account,
  // 是否连接了metamask
  isLoggedIn: state => !!state.account,
  /** 链接的主网络名称 */
  netWorkName: state => state.netWorkName,
  /** 登录时间 */
  logInTime: state => state.logInTime,
  // 是否是hunter
  isHunter: state => !!state.user.hunter,
  // 我的hunter信息
  hunterInfo: state => state.user.hunter ?? {}
};

export default {
  state,
  mutations,
  actions,
  getters
};
