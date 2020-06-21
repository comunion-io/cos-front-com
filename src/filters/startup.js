/**
 * startup状态
 */
export function startupState(startup) {
  const { state, settingState } = startup;
  // return (
  //   ['creating', 'waiting for setting', 'waiting for blockchain', 'block failed', 'done'][state] ||
  //   ''
  // );
  // 未完成创建
  if (state <= 1) {
    return {
      state: 'creating',
      label: 'Wait for creating'
    };
  } else if (state === 3) {
    // 创建失败
    return {
      state: 'failed',
      label: 'Creating failed'
    };
  } else if (settingState <= 1) {
    // 创建成功等待setting
    return {
      state: 'waiting',
      label: 'Wait for setting'
    };
  } else if (settingState === 3) {
    // 设置失败
    return {
      state: 'failed',
      label: 'Setting failed'
    };
  }
  // 成功
  return {
    state: 'done',
    label: ''
  };
}
