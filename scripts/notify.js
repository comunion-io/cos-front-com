#!/usr/bin/env node
'use strict';

const http = require('http');
const { execSync } = require('child_process');
const channel = 'd255d62caef24a3bb66c3465dad70407';

const args = process.argv.slice(2);

function trim(str) {
  if (!str) return str;
  return str.toString().trim();
}

const branch = trim(execSync('git symbolic-ref --short -q HEAD'));

const author = trim(execSync(`git log -1 --pretty=format:'%ae'|xargs`));

const commitMessage = trim(execSync(`git show-branch --no-name HEAD`));

const commitTime = trim(execSync(`git log -1 --format="%ai"|xargs`));

const head = encodeURIComponent(args[0] === '1' ? `${branch}部署完成` : `${branch}部署失败`);
const body = encodeURIComponent(
  `${author} commit "${commitMessage}" on cos-front-com#${branch} branch at ${commitTime}`
);

http.get(`http://push.ijingniu.cn/send?key=${channel}&head=${head}&body=${body}`);
