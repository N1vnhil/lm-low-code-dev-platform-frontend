// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 POST /app/add */
export async function addApp(body: API.AppAddRequest, options?: { [key: string]: any }) {
  return request<API.ResponseLong>('/app/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /app/admin/delete */
export async function adminDeleteApp(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBoolean>('/app/admin/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /app/admin/get/${param0} */
export async function adminGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ResponseAppVO>(`/app/admin/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /app/admin/list */
export async function adminListAppVoByPage(
  body: API.AppQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageAppVO>('/app/admin/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /app/admin/update */
export async function adminUpdate(
  body: API.AppAdminUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBoolean>('/app/admin/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /app/chat */
export async function chatToCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatToCodeParams,
  options?: { [key: string]: any }
) {
  return request<API.ServerSentEventString[]>('/app/chat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /app/deploy */
export async function deployApp(body: API.AppDeployRequest, options?: { [key: string]: any }) {
  return request<API.ResponseString>('/app/deploy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /app/good/list */
export async function listGoodAppVoByPage(
  body: API.AppQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageAppVO>('/app/good/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /app/my/list */
export async function listMyAppVoByPage(
  body: API.AppQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageAppVO>('/app/my/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /app/user/delete */
export async function userDeleteApp(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBoolean>('/app/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /app/user/get/${param0} */
export async function getInfo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfo1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ResponseAppVO>(`/app/user/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /app/user/update */
export async function userUpdate(body: API.AppUpdateRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBoolean>('/app/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
