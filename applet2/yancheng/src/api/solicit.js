import request from '@/utils/request'

// 发布  我的征寻
export const solicitAdd = (data) => request.post(`/solicit`,data)

// 征寻  列表
export const solicitListGet = (data) => request.get(`/solicit`,data)


// 征寻  详情
export const solicitDetailsGet = (id) => request.get(`/solicit/${id}`)


// 征寻  参加征寻   =>征寻订单   1-报名
export const solicitJoin = (data) => request.post(`/mySolicit`,data)

// 征寻  参加征寻   =>征寻订单  2-参加
export const solicitSureJoin = (data) => request.post(`/mySolicit/reply`,data)

// 我的记录   我参加的征寻
export const solicitRecord = (data) => request.get(`/mySolicit`,data)