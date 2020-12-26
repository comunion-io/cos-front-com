/* eslint-disable */
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH'

export interface ServiceRequestAndResponseMap {
  'account@login': {
    params: {}
    query: {}
    body: {}
    response: {
      id: string
      publicKey: string
      avatar: string
      hunter?: {
        name: string
        skills?: string[]
        about: string
        descriptionAddr: string
        email: string
      }
    }
  }
  'account@logout': {
    params: {}
    query: {}
    body: {}
    response: {}
  }
  'account@用户-hunter-更新': {
    params: {}
    query: {}
    body: {}
    response: {}
  }
  'account@用户-我的': {
    params: {}
    query: {}
    body: {}
    response: {
      id: string
      publicKey: string
      avatar: string
      hunter?: {
        name: string
        skills?: string[]
        about?: string
        descriptionAddr: string
        email: string
        createdAt: string
      }
    }
  }
  'account@用户-获取': {
    params: {
      userId: any;
    }
    query: {}
    body: {}
    response: {
      id: string
      publicKey: string
      avatar: string
      hunter?: {
        name: string
        skills?: string[]
        about?: string
        descriptionAddr: string
        email: string
        createdAt: string
      }
    }
  }
  'account@获取nonce': {
    params: {}
    query: {}
    body: {
      publicKey: string | number | boolean
    }
    response: {
      nonce: string
    }
  }
  'cores@startup-follow-创建': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@bounty-closed': {
    params: {
      bountyId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@exchange-获取': {
    params: {
      exchangeId: any;
    }
    query: {}
    body: {}
    response: {
      /**
       * @description exchange_id
       */
      id: string
      /**
       * @description transaction_id
       */
      txId: string
      startup: {
        id: string
        name: string
        logo: string
        tokenSymbol: string
        description: string
      }
      pairName: string
      pairAddress: string
      /**
       * @description 0 待确认，1 已完成，2 未完成
       */
      status: number
    }
  }
  'cores@exchange-列表': {
    params: {}
    query: {
      limit: any;
      offset: any;
    }
    body: {}
    response: {
      result?: {
        id: string
        txId: string
        startup: {
          id: string
          name: string
          logo: string
          tokenSymbol: string
        }
        price: number
        liquidities: number
        volumes24Hrs: string
        status: number
      }
      total: number
    }
  }
  'cores@exchange-startup-获取': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {
      /**
       * @description exchange_id
       */
      id: string
      /**
       * @description transaction_id
       */
      txId: string
      startup: {
        id: string
        name: string
        logo: string
        tokenSymbol: string
        description: string
      }
      pairName: string
      pairAddress: string
      /**
       * @description 0 待确认，1 已完成，2 未完成
       */
      status: number
    }
  }
  'cores@exchange-startup-创建': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@disco-获取': {
    params: {
      discoId: any;
    }
    query: {}
    body: {}
    response: {
      id: string
      startup: {
        id: string
        name: string
        logo: string
        tokenSymbol: string
      }
      walletAddr: string
      tokenContract: string
      description: string
      fundRaisingTime: string
      investmentReward: number
      'rewardDeclineRate ': number
      shareToken: number
      minFundRaising: number
      addLiquidityPool: number
      totalDepositToken: number
      txId: string
      state: string
    }
  }
  'cores@disco-列表': {
    params: {}
    query: {
      limit: any;
      offset: any;
      keyword: any;
      /**
       * @description createdAt、startup、investmentReward、liquidityPool
       */
      orderBy: any;
      /**
       * @description true、false 默认为false
       */
      isAsc: any;
    }
    body: {}
    response: {
      result?: {
        id: string
        startup: {
          id: string
          name: string
          logo: string
          tokenSymbol: string
        }
        walletAddr: string
        tokenContract: string
        description: string
        fundRaisingTime: string
        investmentReward: number
        rewardDeclineRate: number
        shareToken: number
        minFundRaising: number
        addLiquidityPool: number
        totalDepositToken: number
        /**
         * @description 交易id
         */
        txId: string
        status: number
      }
      total: number
    }
  }
  'cores@disco-startup-获取': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {
      id?: string
      startup?: {
        id?: string
        name?: string
        logo?: string
        tokenSymbol?: string
      }
      walletAddr?: string
      tokenContract?: string
      description?: string
      fundRaisingTime?: string
      investmentReward?: number
      rewardDeclineRate?: number
      shareToken?: number
      minFundRaising?: number
      addLiquidityPool?: number
      totalDepositToken?: number
      txId?: string
      state?: string
    }
  }
  'cores@disco-startup-创建': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@startups-我的-follow列表': {
    params: {}
    query: {
      limit: any;
      offset: any;
    }
    body: {}
    response: {
      result: {
        id: string
        name: string
        mission: string
        logo: string
        descriptionAddr: string
        category: {
          id?: string
          name?: string
        }
        /**
         * @description 0 无意义状态,1 待确认,2 上链成功,3 未确认到交易
         */
        state: number
        /**
         * @description 0 无意义状态,1 待确认,2 上链成功,3 未确认到交易
         */
        settingState: string
        isIRO: boolean
      }[]
      total: number
    }
  }
  'cores@startup-follow-取消': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@bounty-列表-用户': {
    params: {
      userId: any;
    }
    query: {
      limit: any;
      offset: any;
      keyword: any;
    }
    body: {}
    response: {
      total?: number
      result?: {
        id: string
        startup: {
          id: string
          name: string
        }
        userId: string
        /**
         * @description contest,cooperative
         */
        type: string
        keywords?: string[]
        intro: string
        contactEmail: string
        descriptionAddr?: string
        descriptionFileAddr?: string
        duration: number
        payments: {
          token: string
          value: number
        }[]
        hunters?: {
          hunterId: string
          userId: string
          name: string
          /**
           * @description 0 startwork,1 submitted,2 paid,3 quited
           */
          status: number
          startedAt: string
          submittedAt: string
          quitedAt: string
          paidAt: string
          payments: {
            token: string
            value: string
          }[]
        }[]
        /**
         * @description 0 open,1 proccess,2 closed
         */
        status?: number
        blockAddr?: string
        /**
         * @description 0 无意义状态,1 待确认,2 上链成功,3 未确认到交易
         */
        transactionState: number
      }[]
    }
  }
  'cores@startup-是否被follow': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {
      hasFollowed: boolean
    }
  }
  'cores@bounty-startwork': {
    params: {
      bountyId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@bounty-submitted': {
    params: {
      bountyId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@bounty-quited': {
    params: {
      bountyId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@bounty-paid': {
    params: {
      bountyId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@bounty-rejected': {
    params: {
      bountyId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@startup-获取支付Token列表': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@startup-bounty-列表': {
    params: {
      startupId: any;
    }
    query: {
      limit: any;
      offset: any;
      keyword: any;
    }
    body: {}
    response: {
      total?: number
      result?: {
        id: string
        startup: {
          id: string
          name: string
        }
        createdBy: {
          id: string
          name: string
          isHunter: boolean
        }
        type: string
        keywords?: string[]
        intro: string
        contactEmail: string
        descriptionAddr?: string
        descriptionFileAddr?: string
        duration: number
        payments: {
          token: string
          value: number
        }[]
        hunters?: {
          hunterId: string
          userId: string
          name: string
          status: number
          startedAt: string
          submittedAt: string
          quitedAt: string
          paidAt: string
          payments: {
            token: string
            value: string
          }[]
          transactionState: number
          rejectedAt: string
        }[]
        status?: number
        blockAddr?: string
        transactionState: number
        createdAt: string
        expiredAt: string
        serialNo: number
      }[]
    }
  }
  'cores@startup-bounty-列表-我的': {
    params: {
      startupId: any;
    }
    query: {
      limit: any;
      offset: any;
      keyword: any;
    }
    body: {}
    response: {
      total?: number
      result?: {
        id: string
        startup: {
          id: string
          name: string
        }
        userId: string
        /**
         * @description contest,cooperative
         */
        type: string
        keywords?: string[]
        intro: string
        contactEmail: string
        descriptionAddr?: string
        descriptionFileAddr?: string
        duration: number
        payments: {
          token: string
          value: number
        }[]
        hunters?: {
          hunterId: string
          userId: string
          name: string
          /**
           * @description 0 startwork,1 submitted,2 paid,3 quited
           */
          status: number
          startedAt: string
          submittedAt: string
          quitedAt: string
          paidAt: string
          payments: {
            token: string
            value: string
          }[]
        }[]
        /**
         * @description 0 open,1 proccess,2 closed
         */
        status?: number
        blockAddr?: string
        /**
         * @description 0 无意义状态,1 待确认,2 上链成功,3 未确认到交易
         */
        transactionState: number
        createdAt: string
        expiredAt: string
      }[]
    }
  }
  'cores@bounty-列表': {
    params: {}
    query: {
      limit: any;
      offset: any;
      keyword: any;
    }
    body: {}
    response: {
      total?: number
      result?: {
        id: string
        startup: {
          id: string
          name: string
          logo: string
        }
        createdBy: {
          id: string
          name: string
          isHunter: boolean
        }
        type: string
        keywords?: string[]
        intro: string
        contactEmail: string
        descriptionAddr?: string
        descriptionFileAddr?: string
        duration: number
        payments: {
          token: string
          value: number
        }[]
        hunters?: {
          hunterId: string
          userId: string
          name: string
          status: number
          startedAt: string
          submittedAt: string
          quitedAt: string
          paidAt: string
          payments: {
            token: string
            value: string
          }[]
        }[]
        status?: number
        blockAddr?: string
        transactionState: number
        createdAt: string
        expiredAt: string
      }[]
    }
  }
  'cores@bounty-列表-我的': {
    params: {}
    query: {
      limit: any;
      offset: any;
      keyword: any;
    }
    body: {}
    response: {
      total?: number
      result?: {
        id: string
        startup: {
          id: string
          name: string
        }
        userId: string
        /**
         * @description contest,cooperative
         */
        type: string
        keywords?: string[]
        intro: string
        contactEmail: string
        descriptionAddr?: string
        descriptionFileAddr?: string
        duration: number
        payments: {
          token: string
          value: number
        }[]
        hunters?: {
          hunterId: string
          userId: string
          name: string
          /**
           * @description 0 初始状态, 1 startwork,2 submitted,3 paid,4 quited
           */
          status: number
          startedAt: string
          submittedAt: string
          quitedAt: string
          paidAt: string
          payments: {
            token: string
            value: string
          }[]
        }[]
        /**
         * @description 0 open,1 proccess,2 closed
         */
        status?: number
        blockAddr?: string
        /**
         * @description 0 无意义状态,1 待确认,2 上链成功,3 未确认到交易
         */
        transactionState: number
        createdAt: string
        expiredAt: string
      }[]
    }
  }
  'cores@bounty-获取-我的': {
    params: {
      id: any;
    }
    query: {}
    body: {}
    response: {
      id: string
      startup: {
        id: string
        name: string
      }
      userId: string
      type: string
      keywords?: string[]
      intro: string
      contactEmail: string
      descriptionAddr?: string
      descriptionFileAddr: string
      duration: number
      payments: {
        token: string
        value: number
      }[]
      hunters?: {
        hunterId: string
        userId: string
        name: string
        /**
         * @description 0 初始状态, 1 startwork,2 submitted,3 paid,4 quited
         */
        status: number
        startedAt: string
        submittedAt: string
        quitedAt: string
        paidAt: string
        payments: {
          token: string
          value: string
        }[]
      }[]
      status: number
      blockAddr: string
      transactionState: number
      createdAt: string
      expiredAt: string
    }
  }
  'cores@bounty-获取': {
    params: {
      id: any;
    }
    query: {}
    body: {}
    response: {
      id: string
      startup: {
        id: string
        name: string
      }
      userId: string
      type: string
      keywords?: string[]
      intro: string
      contactEmail: string
      descriptionAddr?: string
      descriptionFileAddr: string
      duration: number
      payments: {
        token: string
        value: number
      }[]
      hunters?: {
        hunterId: string
        userId: string
        name: string
        status: number
        startedAt: string
        submittedAt: string
        quitedAt: string
        paidAt: string
        payments: {
          token: string
          value: string
        }[]
      }[]
      status: number
      blockAddr: string
      transactionState: number
      createdAt: string
      expiredAt: string
    }
  }
  'cores@bounty-创建': {
    params: {
      id: any;
    }
    query: {}
    body: {}
    response: {
      id: string
    }
  }
  'cores@startup-tags': {
    params: {}
    query: {
      /**
       * @description skills 技能
       */
      source: any;
    }
    body: {}
    response: string[]
  }
  'cores@startup-获取prepare id': {
    params: {}
    query: {}
    body: {}
    response: {
      id: string
    }
  }
  'cores@startup-我的-获取': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {
      id?: string
      name?: string
      mission?: string
      logo?: string
      descriptionAddr?: string
      category?: {
        id?: string
        name?: string
        code?: string
        source?: string
      }
      settings?: {
        tokenName?: string
        tokenSymbol?: string
        tokenAddr?: string
        walletAddrs?: {
          addr?: string
          name?: string
        }[]
        type?: string
        voteTokenLimit?: string
        voteAssignAddrs?: string[]
        voteSupportPercent?: number
        voteMinApprovalPercent?: number
        voteMinDurationHours?: string
        voteMaxDurationHours?: string
      }
      transaction?: {
        txId?: string
        blockAddr?: string
      }
    }
  }
  'cores@startup-创建': {
    params: {}
    query: {}
    body: {}
    response: {
      id: string
    }
  }
  'cores@startups-我的-列表': {
    params: {}
    query: {
      limit: any;
      offset: any;
      /**
       * @description true 上链成功的
false 上链失败或确认中的,
为空   全部
       */
      isInBlock: any;
    }
    body: {}
    response: {
      result: {
        id: string
        name: string
        mission: string
        logo: string
        descriptionAddr: string
        category: {
          id?: string
          name?: string
        }
        /**
         * @description 0 无意义状态,1 待确认,2 上链成功,3 未确认到交易
         */
        state: number
        /**
         * @description 0 无意义状态,1 待确认,2 上链成功,3 未确认到交易
         */
        settingState: string
        isIRO: boolean
      }[]
      total: number
    }
  }
  'cores@startup-更新': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {
      id: string
    }
  }
  'cores@startup-获取': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {
      id?: string
      name?: string
      mission?: string
      logo?: string
      descriptionAddr?: string
      category?: {
        id?: string
        name?: string
        code?: string
        source?: string
      }
      settings?: {
        tokenName?: string
        tokenSymbol?: string
        tokenAddr?: string
        walletAddrs?: {
          addr?: string
          name?: string
        }[]
        type?: string
        voteTokenLimit?: string
        voteAssignAddrs?: string[]
        voteSupportPercent?: number
        voteMinApprovalPercent?: number
        voteMinDurationHours?: string
        voteMaxDurationHours?: string
      }
      transaction?: {
        txId?: string
        blockAddr?: string
      }
    }
  }
  'cores@startup-回退': {
    params: {
      id: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@startups-列表': {
    params: {}
    query: {
      /**
       * @description 每页条数
       */
      limit: any;
      /**
       * @description 前置数据条数
       */
      offset: any;
    }
    body: {}
    response: {
      result: {
        id: string
        name: string
        mission: string
        logo: string
        descriptionAddr: string
        category: {
          id?: string
          name?: string
        }
        isIRO: boolean
        bountyCount: string
        followCount: string
      }[]
      total: number
    }
  }
  'cores@startup-settings-回退': {
    params: {
      id: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@startup-settings-更新': {
    params: {
      id: any;
    }
    query: {}
    body: {}
    response: {
      id: string
    }
  }
  'cores@文件上传': {
    params: {}
    query: {}
    body: {
      image: File
    }
    response: {
      downloadUrl: string
    }
  }
  'cores@分类-列表': {
    params: {}
    query: {
      limit: any;
      offset: any;
      /**
       * @description startup;
       */
      source: any;
    }
    body: {}
    response: {
      result: {
        id: string
        name: string
        code: string
        /**
         * @description startup;
         */
        srouce: string
      }
      total: string
    }
  }
  'cores@分类-获取': {
    params: {
      categoryId: any;
    }
    query: {}
    body: {}
    response: {
      id?: string
      name?: string
      code?: string
      srouce?: string
    }
  }
}

export type ServiceKeys = keyof ServiceRequestAndResponseMap

export type ServiceReturn = {
  [P in ServiceKeys]: (
    data?: ServiceRequestAndResponseMap[P]['body'] &
      ServiceRequestAndResponseMap[P]['params'] &
      ServiceRequestAndResponseMap[P]['query'],
    body?: ServiceRequestAndResponseMap[P]['body']
  ) => Promise<ServiceFunctionResponse<ServiceRequestAndResponseMap[P]['response']>>
}

export interface ApiDefine {
  u: string
  m: Method
  // params
  p?: (string | number)[]
  // query
  q?: string[]
  // done / undone
  d: 0 | 1
}

export type Apis = Record<ServiceKeys, ApiDefine>

export interface RequestQuery {
  [key: string]: string | number | RequestQuery
}

export interface RequestBody {
  [key: string]: any
}

export interface ServiceFunctionResponse<T = any> {
  error: boolean
  data: T | null | undefined
  message?: string
  stack?: string | object
}

export type RequestAdapter<T = unknown> = (
  url: string,
  method: Method,
  query: RequestQuery,
  body: RequestBody,
  extraParams: any,
  done: boolean
) => Promise<ServiceFunctionResponse<T>>
