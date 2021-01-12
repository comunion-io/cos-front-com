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
  'cores@disco-增长eth数量统计': {
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
      date: string
      count: number
    }[]
  }
  'cores@startup-disco和swap 状态': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {
      /**
       * @description -1 未开启，0 创建中，1 等待开启（创建成功），2 创建失败，3 开启中，4 等待募资开始（数据库为4，时间未开始），5 募资成功，6 募资失败，7 募资中（数据库为4，时间进行中），8 募资结束（数据库为4，时间已结束）
       */
      discoState?: number
      /**
       * @description -1 未开启，0 待确认，1 已完成，2 未完成
       */
      swapState?: number
    }
  }
  'cores@disco-total 统计': {
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
      count: number
      rate: string
    }
  }
  'cores@disco-募集的eth总数统计': {
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
      count: number
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
  'cores@disco-startup-创建': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@disco-startup-investor-列表': {
    params: {
      startupId: any;
    }
    query: {
      limit: any;
      offset: any;
    }
    body: {}
    response: {
      total?: number
      result?: {
        id: string
        discoId: string
        uid: string
        walletAddr: string
        ethCount: number
        createdAt: string
      }[]
      totalEth?: number
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
      total?: number
      result?: {
        id?: string
        startup?: {
          id?: string
          name?: string
          logo?: string
          tokenSymbol?: string
        }
        investmentReward?: number
        rewardDeclineRate?: number
        shareToken?: number
        minFundRaising?: number
        addLiquidityPool?: number
        /**
         * @description 0 默认状态，1 等待开始，2 进行中，3 失败，4 成功
         */
        state?: number
      }[]
    }
  }
  'cores@disco-startup-获取': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {
      id: string
      walletAddr: string
      tokenAddr: string
      description: string
      fundRaisingStartedAt: string
      fundRaisingEndedAt: string
      investmentReward: number
      rewardDeclineRate: number
      shareToken: number
      minFundRaising: number
      addLiquidityPool: number
      totalDepositToken: number
      /**
       * @description 0 默认状态，1 等待开始，2 进行中，3 失败，4 成功
       */
      state: number
      txId: string
      fundRaisingAddr: string
      /**
       * @description 0 无意义状态,1 待确认,2 上链成功,3 未确认到交易
       */
      transactionState: number
    }
  }
  'cores@disco-startup-investor-创建': {
    params: {
      startupId: any;
    }
    query: {}
    body: {}
    response: {}
  }
  'cores@exchange-startup-创建': {
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
       * @description 0 待确认，1 已完成，2 未完成
       */
      status: number
    }
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
        tokenName: string
        tokenSymbol: string
        mission: string
      }
      pairName: string
      pairAddress: string
      /**
       * @description 0 待确认，1 已完成，2 未完成
       */
      status: number
      followCount: number
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
        tokenName: string
        tokenSymbol: string
        mission: string
      }
      pairName: string
      pairAddress: string
      /**
       * @description 0 待确认，1 已完成，2 未完成
       */
      status: number
      followCount: number
    }
  }
  'cores@exchanges-列表': {
    params: {}
    query: {
      limit: any;
      offset: any;
      keyword: any;
      /**
       * @description createdAt、startup、liquidities、volumes24Hrs
       */
      orderBy: any;
      /**
       * @description true、false 默认为false
       */
      isDesc: any;
    }
    body: {}
    response: {
      result?: {
        /**
         * @description exchange_id
         */
        id: string
        /**
         * @description ethereum_transaction_id
         */
        txId: string
        startup: {
          id: string
          name: string
          logo: string
          tokenSymbol: string
        }
        price: number
        liquidities: number
        volumes24Hrs: number
        priceChanges: {
          occuredDay: string
          endPrice: number
        }
        status: number
      }
      total: number
    }
  }
  'cores@exchange_transaction-创建': {
    params: {
      exchangeId: any;
    }
    query: {}
    body: {}
    response: {
      /**
       * @description exchange_transaction_id
       */
      id: string
      /**
       * @description 0 待确认，1 已完成，2 未完成
       */
      status: number
    }
  }
  'cores@exchange_transaction-获取': {
    params: {
      transactionId: any;
    }
    query: {}
    body: {}
    response: {
      /**
       * @description exchange_transaction_id
       */
      id: string
      /**
       * @description ethereum_transaction_id
       */
      txId: string
      /**
       * @description exchange_id
       */
      exchangeId: string
      /**
       * @description 客户钱包地址
       */
      account: string
      /**
       * @description 1 增加流动性，2 删除流动性，3 兑换
       */
      type: number
      name: string
      /**
       * @description 美元总价值
       */
      totalValue: number
      tokenAmount1: number
      tokenAmount2: number
      fee: number
      pricePerToken1: number
      pricePerToken2: number
      /**
       * @description 0 待确认，1 已完成，2 未完成
       */
      status: number
      occuredAt: string
    }
  }
  'cores@exchange_transaction-列表': {
    params: {
      exchangeId: any;
    }
    query: {
      /**
       * @description 0 全部，1 增加流动性，2 删除流动性，3 兑换
       */
      type: any;
      limit: any;
      offset: any;
    }
    body: {}
    response: {
      result: {
        /**
         * @description exchange_transaction_id
         */
        id: string
        /**
         * @description ethereum_transaction_id
         */
        txId: string
        /**
         * @description exchange_id
         */
        exchangeId: string
        /**
         * @description 客户钱包地址
         */
        account: string
        /**
         * @description 1 增加流动性，2 删除流动性，3 兑换
         */
        type: number
        name: string
        /**
         * @description 美元总价值
         */
        totalValue: string
        tokenAmount1: number
        tokenAmount2: number
        fee: number
        /**
         * @description 0 待确认，1 已完成，2 未完成
         */
        status: number
        occuredAt: string
      }
      total: number
    }
  }
  'cores@exchanges-统计合计': {
    params: {}
    query: {}
    body: {}
    response: {
      volumes24Hrs: number
      volumes24HrsRate: number
      liquidities: number
      liquiditiesRate: number
    }
  }
  'cores@exchange-汇总': {
    params: {
      exchangeId: any;
    }
    query: {}
    body: {}
    response: {
      volumes24Hrs: number
      volumes24HrsRate: number
      liquidities: number
      liquiditiesRate: number
      transactions24Hrs: number
      transactions24HrsRate: number
    }
  }
  'cores@exchange-价格变化': {
    params: {
      exchangeId: any;
    }
    query: {}
    body: {}
    response: {
      tokenSymbol1: string
      tokenSymbol2: string
      pricePerToken1: number
      pricePerToken2: number
      priceChangeRate: number
      priceChanges: {
        occuredDay: string
        endPrice: number
      }
    }
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
