declare namespace API {
  type adminGetInfoParams = {
    id: number
  }

  type AppAddRequest = {
    initPrompt?: string
  }

  type AppAdminUpdateRequest = {
    id?: number
    appName?: string
    priority?: number
    cover?: string
  }

  type AppDeployRequest = {
    appId?: number
  }

  type AppQueryRequest = {
    pageNum?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    id?: number
    appName?: string
    cover?: string
    initPrompt?: string
    codeGenType?: string
    deployKey?: string
    priority?: number
    userId?: number
  }

  type AppUpdateRequest = {
    id?: number
    appName?: string
  }

  type AppVO = {
    id?: number
    appName?: string
    cover?: string
    codeGenType?: string
    deployKey?: string
    deployedTime?: string
    priority?: number
    userId?: number
    createTime?: string
    updateTime?: string
    user?: UserVO
  }

  type ChatHistory = {
    id?: number
    message?: string
    messageType?: string
    appId?: number
    userId?: number
    createTime?: string
    updateTime?: string
    isDelete?: number
  }

  type ChatHistoryQueryRequest = {
    pageNum?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    id?: number
    appId?: number
    messageType?: string
    message?: string
    userId?: number
    lastCreateTime?: string
  }

  type chatToCodeParams = {
    appId: number
    message: string
  }

  type DeleteRequest = {
    id?: number
  }

  type getInfo1Params = {
    id: number
  }

  type getUserByIdParams = {
    id: number
  }

  type getUserVOByIdParams = {
    id: number
  }

  type listAppChatHistoryParams = {
    appId: number
    pageSize?: number
    lastCreateTime?: string
  }

  type LoginUserVO = {
    id?: number
    userAccount?: string
    userName?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    createTime?: string
    updateTime?: string
  }

  type PageAppVO = {
    records?: AppVO[]
    pageNumber?: number
    pageSize?: number
    totalPage?: number
    totalRow?: number
    optimizeCountQuery?: boolean
  }

  type PageChatHistory = {
    records?: ChatHistory[]
    pageNumber?: number
    pageSize?: number
    totalPage?: number
    totalRow?: number
    optimizeCountQuery?: boolean
  }

  type PageUserVO = {
    records?: UserVO[]
    pageNumber?: number
    pageSize?: number
    totalPage?: number
    totalRow?: number
    optimizeCountQuery?: boolean
  }

  type ResponseAppVO = {
    code?: number
    data?: AppVO
    message?: string
  }

  type ResponseBoolean = {
    code?: number
    data?: boolean
    message?: string
  }

  type ResponseLoginUserVO = {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  type ResponseLong = {
    code?: number
    data?: number
    message?: string
  }

  type ResponsePageAppVO = {
    code?: number
    data?: PageAppVO
    message?: string
  }

  type ResponsePageChatHistory = {
    code?: number
    data?: PageChatHistory
    message?: string
  }

  type ResponsePageUserVO = {
    code?: number
    data?: PageUserVO
    message?: string
  }

  type ResponseString = {
    code?: number
    data?: string
    message?: string
  }

  type ResponseUser = {
    code?: number
    data?: User
    message?: string
  }

  type ResponseUserVO = {
    code?: number
    data?: UserVO
    message?: string
  }

  type ServerSentEventString = true

  type serveStaticResourceParams = {
    deployKey: string
  }

  type User = {
    id?: number
    userAccount?: string
    userPassword?: string
    userName?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    editTime?: string
    createTime?: string
    updateTime?: string
    isDelete?: number
  }

  type UserAddRequest = {
    userAccount?: string
    userName?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
  }

  type UserLoginRequest = {
    userAccount?: string
    password?: string
  }

  type UserQueryRequest = {
    pageNum?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    id?: number
    userAccount?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserRegisterRequest = {
    userAccount?: string
    password?: string
    checkPassword?: string
  }

  type UserUpdateRequest = {
    id?: number
    userName?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
  }

  type UserVO = {
    id?: number
    userAccount?: string
    userName?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    createTime?: string
  }
}
