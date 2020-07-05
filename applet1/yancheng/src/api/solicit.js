import request from '@/utils/request'

// 发布  我的征寻
export const solicitAdd = (data) => request.post(`/solicit`,data)

// 征寻  列表
export const solicitListGet = (data) => request.get(`/solicit`,data)


// 征寻  详情
export const solicitDetailsGet = (id) => request.get(`/solicit/${id}`)
