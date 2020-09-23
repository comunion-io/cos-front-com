module.exports = {
  hooks: {
    'prepare-commit-msg': 'devmoji -e --lint',
    'commit-msg': 'commitlint -x @commitlint/config-conventional -E HUSKY_GIT_PARAMS'
  }
};
