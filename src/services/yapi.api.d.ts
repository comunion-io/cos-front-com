/* eslint-disable */
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH'

export interface ServiceRequestAndResponseMap {
  'account@login': {
    params: {}
    query: {}
    body: {
      walletAddr: string
    }
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
    body: {
      name: string
      skills: string[]
      about: string
      descriptionAddr: string
      email: string
    }
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
  'cores@proposal-获取': {
    params: {
      id: any;
    }
    query: {}
    body: {}
    response: {
      /**
       * @description ID
       */
      id: string
      /**
       * @description StartUp
       */
      startup: {
        id: string
        name: string
        logo: string
        tokenSymbol: string
      }
      /**
       * @description 用户
       */
      comer?: {
        /**
         * @description ID
         */
        id: string
        /**
         * @description Comer名称
         */
        name: string
      }
      /**
       * @description 钱包地址
       */
      walletAddr: string
      /**
       * @description 合约地址
       */
      contractAddr: string
      /**
       * @description 创建时间
       */
      createdAt: string
      /**
       * @description 更新时间
       */
      updatedAt: string
      /**
       * @description 状态 1.未开始 2.进行中 3.已结束 4.未成案 5.提案被拒绝 6.提案被通过
       */
      status: number
      /**
       * @description 标题
       */
      title: string
      /**
       * @description 提案类型 1.Finance 2.Governance 3.Strategy 4.Product 5.Media 6.Community 7.Node
       */
      type: number
      /**
       * @description 联系方式
       */
      contact: string
      /**
       * @description 描述
       */
      description: string
      /**
       * @description 提案投票者类型 1.ALL 2.FounderAssign 3.Pos
       */
      voterType: string
      /**
       * @description 最少成案比例
       */
      supportPercent: number
      /**
       * @description 最少通过比例
       */
      minApprovalPercent: number
      /**
       * @description 投票天数
       */
      duration: number
      /**
       * @description 是否有支付
       */
      hasPayment: boolean
      /**
       * @description 支付地址
       */
      paymentAddr?: string
      /**
       * @description 支付类型 1.一次性支付 2.按月支付
       */
      paymentType?: number
      /**
       * @description 支付月数
       */
      paymentMonthes?: number
      /**
       * @description 支付日期
       */
      paymentDate?: string
      /**
       * @description 单笔支付数量
       */
      paymentAmount?: number
      /**
       * @description 支付总数量
       */
      totalPaymentAmount?: number
      /**
       * @description 投票列表
       */
      votes: {
        /**
         * @description 票数
         */
        amount: number
        /**
         * @description 是否赞成
         */
        isApproved: boolean
        /**
         * @description 钱包地址
         */
        walletAddr: string
        /**
         * @description 创建时间
         */
        createdAt: string
      }[]
      /**
       * @description 协议
       */
      terms: {
        /**
         * @description 数量
         */
        amount: number
        /**
         * @description 内容
         */
        content: string
      }[]
    }
  }
  'cores@proposal-列表': {
    params: {}
    query: {
      /**
       * @description 最大数量
       * @example { limit: 10 }
       */
      limit: any;
      /**
       * @description 偏移量
       * @example { offset: 0 }
       */
      offset: any;
      /**
       * @description 关键词
       */
      keyword?: any;
      /**
       * @description 列表类型 all-全部 created-我创建的 voted-我投过的
       * @example { type: all }
       */
      type: any;
      /**
       * @description Startup的ID
       * @example { startupId: 1 }
       */
      startupId?: any;
      /**
       * @description 状态列表 1.未开始 2.进行中 3.已结束 4.未成案 5.提案被拒绝 6.提案被通过
       * @example { statuses[]: [1,2] }
       */
      statuses[]?: any;
    }
    body: {}
    response: {
      /**
       * @description 总数
       */
      total: number
      /**
       * @description 列表
       */
      result: {
        /**
         * @description Id
         */
        id: number
        /**
         * @description StartUp
         */
        startup: {
          /**
           * @description ID
           */
          id: number
          /**
           * @description 名称
           */
          name: string
          /**
           * @description Logo
           */
          logo: string
          /**
           * @description Token Symbol
           */
          tokenSymbol: string
        }
        /**
         * @description Comer
         */
        comer?: {
          /**
           * @description ID
           */
          id: string
          /**
           * @description Comer 名称
           */
          name: string
        }
        /**
         * @description 标题
         */
        title: string
        /**
         * @description 状态 1.未开始 2.进行中 3.已结束 4.未成案 5.提案被拒绝 6.提案被通过
         */
        status: number
        /**
         * @description 是否有支付
         */
        hasPayment: boolean
        /**
         * @description 支付总数量
         */
        totalPaymentAmount?: string
        /**
         * @description 创建时间
         */
        createdAt: string
        /**
         * @description 更新时间
         */
        updatedAt: string
        /**
         * @description 投票天数
         */
        duration: number
      }[]
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
    body: {
      timeFrom: string
      timeTo: string
    }
    response: {
      date: string
      count: number
    }[]
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
  'cores@disco-total统计': {
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
  'cores@startup-disco和swap状态': {
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
    body: {
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
      txId: string
      /**
       * @description 非必须， 由后端接收到创建disco成功后的事件时更新
       */
      fundRaisingAddr: string
    }
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
    body: {
      id: string
      ethCount: number
      txId: string
    }
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
    body: {
      id: string
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
    }
    response: {
      total?: number
      result?: {
        id?: string
        startup?: {
          /**
           * @description ID
           */
          id?: string
          /**
           * @description 名称
           */
          name?: string
          /**
           * @description Logo
           */
          logo?: string
          /**
           * @description Token Symbol
           */
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
    body: {
      id: string
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
    }
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
    body: {
      id: string
      ethCount: number
      txId: string
    }
    response: {}
  }
  'cores@exchange-startup-创建': {
    params: {
      startupId: any;
    }
    query: {}
    body: {
      txId: string
    }
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
    body: {
      id: string
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
    }
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
    body: {
      id: string
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
    }
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
    body: {
      id: string
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
    }
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
    body: {
      txId: string
      /**
       * @description 发送钱包地址
       */
      sender: string
      /**
       * @description 接收钱包地址，除增加流动性外必需
       */
      to?: string
      /**
       * @description 1：增加流动性，2：删除流动性，3：1兑换2，4：2兑换1
       */
      type: number
      /**
       * @description startup token数量
       */
      tokenAmount1: number
      /**
       * @description eth数量
       */
      tokenAmount2: number
    }
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
    body: {
      txId: string
      /**
       * @description 客户钱包地址
       */
      account: string
      /**
       * @description 1 增加流动性，2 删除流动性，3 兑换
       */
      type: number
    }
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
       * @description 发送钱包地址
       */
      sender: string
      /**
       * @description 接收钱包地址
       */
      to: string
      /**
       * @description 1：增加流动性，2：删除流动性，3：1兑换2，4：2兑换1
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
    body: {
      txId: string
      /**
       * @description 客户钱包地址
       */
      account: string
      /**
       * @description 1 增加流动性，2 删除流动性，3 兑换
       */
      type: number
    }
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
    body: {
      txId: string
      /**
       * @description 客户钱包地址
       */
      account: string
      /**
       * @description 1 增加流动性，2 删除流动性，3 兑换
       */
      type: number
    }
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
    body: {
      txId: string
      /**
       * @description 客户钱包地址
       */
      account: string
      /**
       * @description 1 增加流动性，2 删除流动性，3 兑换
       */
      type: number
    }
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
    body: {
      txId: string
      /**
       * @description 客户钱包地址
       */
      account: string
      /**
       * @description 1 增加流动性，2 删除流动性，3 兑换
       */
      type: number
    }
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
  'cores@swap-pairCreated交易对创建事件': {
    params: {}
    query: {}
    body: {
      txId: string
      /**
       * @description 交易对合约地址
       */
      pairAddress: string
      /**
       * @description startup token
       */
      token0: {
        name: string
        symbol: string
        decimals: number
        address: string
      }
      /**
       * @description eth
       */
      token1: {
        name: string
        symbol: string
        decimals: number
        address: string
      }
    }
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
  'cores@swap-mint增加流动性事件': {
    params: {}
    query: {}
    body: {
      txId: string
      /**
       * @description 交易对合约地址
       */
      pairAddress: string
      /**
       * @description 发送钱包地址
       */
      sender: string
      /**
       * @description token1数量
       */
      amount0: string
      /**
       * @description token2数量，通常是eth
       */
      amount1: string
      /**
       * @description 发生时间，yyyy-mm-dd hh24:mi:ss
       */
      occuredAt: string
    }
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
  'cores@swap-burn删除流动性事件': {
    params: {}
    query: {}
    body: {
      txId: string
      /**
       * @description 交易对合约地址
       */
      pairAddress: string
      /**
       * @description 发送钱包地址
       */
      sender: string
      /**
       * @description token1数量
       */
      amount0: string
      /**
       * @description token2数量，通常是eth
       */
      amount1: string
      /**
       * @description 接收钱包地址
       */
      to: string
      /**
       * @description 发生时间，yyyy-mm-dd hh24:mi:ss
       */
      occuredAt: string
    }
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
  'cores@swap-swap兑换事件': {
    params: {}
    query: {}
    body: {
      txId: string
      /**
       * @description 交易对合约地址
       */
      pairAddress: string
      /**
       * @description 发送钱包地址
       */
      sender: string
      /**
       * @description token1换入数量，"0"表示无
       */
      amount0In: string
      /**
       * @description token2换入数量，通常是eth，"0"表示无
       */
      amount1In: string
      /**
       * @description token1换出数量，"0"表示无
       */
      amount0Out: string
      /**
       * @description token2换出数量，通常是eth，"0"表示无
       */
      amount1Out: string
      /**
       * @description 接收钱包地址
       */
      to: string
      /**
       * @description 发生时间，yyyy-mm-dd hh24:mi:ss
       */
      occuredAt: string
    }
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
  'cores@swap-sync同步事件': {
    params: {}
    query: {}
    body: {
      /**
       * @description 交易对合约地址
       */
      pairAddress: string
      /**
       * @description token1余额数量
       */
      reserve0: string
      /**
       * @description token2余额数量，通常是eth
       */
      reserve1: string
      /**
       * @description 发生时间，yyyy-mm-dd hh24:mi:ss
       */
      occuredAt: string
    }
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
    body: {
      txId: string
    }
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
    body: {
      userId: string
    }
    response: {}
  }
  'cores@bounty-rejected': {
    params: {
      bountyId: any;
    }
    query: {}
    body: {
      userId: string
    }
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
      startupId: any;
    }
    query: {}
    body: {
      id: string
      title: string
      /**
       * @description contest,cooperative
       */
      type: string
      keywords?: string[]
      contactEmail: string
      intro: string
      descriptionAddr?: string
      descriptionFileAddr: string
      duration: number
      payments: {
        token: string
        value: number
      }[]
      txId: string
    }
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
  'cores@startup-获取prepareid': {
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
    body: {
      name: string
      categoryId: string
      logo: string
      mission: string
      decriptionAddr: string
      txId: string
    }
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
        /**
         * @description 提案发起者类型 1.ALL 2.FounderAssign 3.Pos
         */
        proposerType: number
        /**
         * @description Pos发起提案最低Token数量
         */
        proposerTokenLimit?: number
        /**
         * @description 指定提案发起者列表
         */
        assignedProposers?: string[]
        /**
         * @description 提案投票者类型 1.ALL 2.FounderAssign 3.Pos
         */
        voterType: number
        /**
         * @description Pos提案投票最低Token数量
         */
        voterTokenLimit?: number
        /**
         * @description 指定提案投票者列表
         */
        assignedVoters?: string[]
        /**
         * @description 提案最少成案比例
         */
        proposalSupportPercent: number
        /**
         * @description 提案最少通过比例
         */
        proposalMinApprovalPercent: number
        /**
         * @description 提案最少投票天数
         */
        proposalMinDuration: number
        /**
         * @description 提案最多投票天数
         */
        proposalMaxDuration: number
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
    body: {
      id: string
      name: string
      categoryId: string
      logo: string
      mission: string
      descriptionAddr: string
      txId: string
    }
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
    body: {
      name: string
      categoryId: string
      logo: string
      mission: string
      descriptionAddr: string
      txId: string
    }
    response: {
      id: string
    }
  }
  'cores@startup-获取': {
    params: {
      startupId: any;
    }
    query: {}
    body: {
      name: string
      categoryId: string
      logo: string
      mission: string
      decriptionAddr: string
      txId: string
    }
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
    body: {
      tokenName: string
      tokenSymbol: string
      tokenAddr: string
      walletAddrs: {
        name: string
        addr: string
      }[]
      txId: string
      /**
       * @description 提案发起者类型 1.ALL 2.FounderAssign 3.Pos
       */
      proposerType: number
      /**
       * @description Pos发起提案最低Token数量
       */
      proposerTokenLimit?: number
      /**
       * @description 指定提案发起者列表
       */
      assignedProposers?: string[]
      /**
       * @description 提案投票者类型 1.ALL 2.FounderAssign 3.Pos
       */
      voterType: number
      /**
       * @description Pos提案投票最低Token数量
       */
      voterTokenLimit?: number
      /**
       * @description 指定提案投票者列表
       */
      assignedVoters?: string[]
      /**
       * @description 提案最少成案比例
       */
      proposalSupportPercent: number
      /**
       * @description 提案最少通过比例
       */
      proposalMinApprovalPercent: number
      /**
       * @description 提案最少投票天数
       */
      proposalMinDuration: number
      /**
       * @description 提案最多投票天数
       */
      proposalMaxDuration: number
    }
    response: {
      id: string
    }
  }
  'cores@文件上传': {
    params: {}
    query: {}
    body: FormData
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
      ServiceRequestAndResponseMap[P]['query']
    ,
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
