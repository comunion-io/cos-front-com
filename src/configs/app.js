// 应用名称
export const APP_NAME = 'Comunion';

// 文件存储前缀
export const FILE_URL_PREFIX = 'https://file.comunion.io/';

// comunion new start up接收方钱包地址
export const COMUNION_RECEIVER_STARTUP_ACCOUNT = process.env.VUE_APP_STARTUP_RECEIVER;
// comunion setting 接收方钱包地址
export const COMMUNION_SETTING_RECEIVE_ACCOUNT = process.env.VUE_APP_SETTING_RECEIVER;
// comunion bounty 接收方钱包地址
export const COMUNION_BOUNTY_RECEIVE_ACCOUNT = process.env.VUE_APP_BOUNTY_RECEIVER;
// hunter 向 comunion 转账的地址
export const COMUNION_RECEIVE_HUNTER_TRANSFER = process.env.VUE_APP_HUNTER_FOR_COMUNION;
// DISCO 上链地址
export const COMUNION_RECEIVER_DOISCO_ACCOUNT = process.env.VUE_APP_DISCO_RECEIVER;
// IUniswapV2Factory的部署地址
export const COMUNION_VUE_APP_UNISWAPV2ROUTER01 = process.env.VUE_APP_UNISWAPV2ROUTER01;
// factory Address : 部署UniswapV2Router01前定义好的
export const COMUNION_VUE_APP_SWAPROUTER01_FACTORY = process.env.VUE_APP_SWAPROUTER01_FACTORY;
// _WETH: 部署UniswapV2Router01前定义好的
export const COMUNION_VUE_APP_SWAPROUTER01_WETH = process.env.VUE_APP_SWAPROUTER01_WETH;
// comunion proposal 地址
export const COMMUNION_PROPOSAL_ACCOUNT = process.env.VUE_APP_PROPOSAL;
// 当前环境是否是生产环境
export const IS_RELEASE_ENV = process.env.IS_RELEASE_ENV;
