/* eslint-disable */
import { Apis } from './yapi.api'

export const apis: Apis = {
  'account@login': {
    u: '/account/login',
    m: 'POST',
    d: 0
  },
  'account@用户-hunter-更新': {
    u: '/account/users/me/hunters',
    m: 'PUT',
    d: 1
  },
  'account@用户-我的': {
    u: '/users/me',
    m: 'GET',
    d: 0
  },
  'account@用户-获取': {
    u: '/users/{userId}',
    m: 'GET',
    p: ['userId'],
    d: 0
  },
  'account@获取nonce': {
    u: '/nonce',
    m: 'GET',
    d: 0
  },
  'cores@bounty-closed': {
    u: '/cores/bounties/{bountyId}:closed',
    m: 'PUT',
    p: ['bountyId'],
    d: 1
  },
  'cores@startup-follow-创建': {
    u: '/startups/{startupId}/follows',
    m: 'POST',
    p: ['startupId'],
    d: 1
  },
  'cores@startups-我的-follow列表': {
    u: '/startups/me/followed',
    m: 'GET',
    q: ['limit', 'offset'],
    d: 1
  },
  'cores@startup-follow-取消': {
    u: '/startups/{startupId}/follows',
    m: 'DELETE',
    p: ['startupId'],
    d: 1
  },
  'cores@bounty-列表-用户': {
    u: '/cores/bounties/users/{userId}',
    m: 'GET',
    p: ['userId'],
    q: ['limit', 'offset', 'keyword'],
    d: 1
  },
  'cores@startup-是否被follow': {
    u: '/startups/{startupId}/hasFollowed',
    m: 'GET',
    p: ['startupId'],
    d: 1
  },
  'cores@bounty-startwork': {
    u: 'cores/bounties/{bountyId}:startWork',
    m: 'POST',
    p: ['bountyId'],
    d: 1
  },
  'cores@bounty-submitted': {
    u: '/cores/bounties/{bountyId}:submitted',
    m: 'PUT',
    p: ['bountyId'],
    d: 1
  },
  'cores@bounty-quited': {
    u: '/cores/bounties/{bountyId}:quited',
    m: 'PUT',
    p: ['bountyId'],
    d: 1
  },
  'cores@bounty-paid': {
    u: '/cores/bounties/{bountyId}:paid',
    m: 'PUT',
    p: ['bountyId'],
    d: 1
  },
  'cores@bounty-rejected': {
    u: '/cores/bounties/{bountyId}:rejected',
    m: 'PUT',
    p: ['bountyId'],
    d: 1
  },
  'cores@startup-获取支付Token列表': {
    u: '/cores/startups/{startupId}/payTokens',
    m: 'GET',
    p: ['startupId'],
    d: 1
  },
  'cores@startup-bounty-列表': {
    u: '/cores/startups/{startupId}/bounties',
    m: 'GET',
    p: ['startupId'],
    q: ['limit', 'offset', 'keyword'],
    d: 1
  },
  'cores@startup-bounty-列表-我的': {
    u: '/cores/startups/{startupId}/bounties/me',
    m: 'GET',
    p: ['startupId'],
    q: ['limit', 'offset', 'keyword'],
    d: 1
  },
  'cores@bounty-列表': {
    u: '/cores/bounties',
    m: 'GET',
    q: ['limit', 'offset', 'keyword'],
    d: 1
  },
  'cores@bounty-列表-我的': {
    u: '/cores/bounties/me',
    m: 'GET',
    q: ['limit', 'offset', 'keyword'],
    d: 1
  },
  'cores@bounty-获取-我的': {
    u: '/bounties/:id/me',
    m: 'GET',
    p: ['id'],
    d: 0
  },
  'cores@bounty-获取': {
    u: '/cores/bounties/:id',
    m: 'GET',
    p: ['id'],
    d: 1
  },
  'cores@bounty-创建': {
    u: '/cores/startups/{id}/bounties',
    m: 'POST',
    p: ['id'],
    d: 0
  },
  'cores@tags': {
    u: '/cores/tags',
    m: 'GET',
    q: ['source'],
    d: 1
  },
  'cores@startup-获取prepare id': {
    u: '/cores/startups/prepareId',
    m: 'GET',
    d: 1
  },
  'cores@startup-我的-获取': {
    u: '/startups/me/{startupId}',
    m: 'GET',
    p: ['startupId'],
    d: 0
  },
  'cores@startup-创建': {
    u: '/startups',
    m: 'POST',
    d: 1
  },
  'cores@startups-我的-列表': {
    u: '/startups/me',
    m: 'GET',
    q: ['limit', 'offset', 'isInBlock'],
    d: 1
  },
  'cores@startup-更新': {
    u: '/startups/{startupId}',
    m: 'PUT',
    p: ['startupId'],
    d: 0
  },
  'cores@startup-获取': {
    u: '/startups/{startupId}',
    m: 'GET',
    p: ['startupId'],
    d: 0
  },
  'cores@startup-回退': {
    u: '/startups/{id}:restore',
    m: 'POST',
    p: ['id'],
    d: 0
  },
  'cores@startups-列表': {
    u: '/cores/startups',
    m: 'GET',
    q: ['limit', 'offset'],
    d: 1
  },
  'cores@startup-settings-回退': {
    u: '/startups/{id}/settings:restore',
    m: 'POST',
    p: ['id'],
    d: 0
  },
  'cores@startup-settings-更新': {
    u: '/cores/startups/{id}/settings',
    m: 'PUT',
    p: ['id'],
    d: 1
  },
  'cores@文件上传': {
    u: '/files',
    m: 'POST',
    d: 0
  },
  'cores@分类-列表': {
    u: '/categories',
    m: 'GET',
    q: ['limit', 'offset', 'source'],
    d: 1
  },
  'cores@分类-获取': {
    u: '/categories/{categoryId}',
    m: 'GET',
    p: ['categoryId'],
    d: 1
  }
};
