import request from '@/utils/request'

// 活动 列表
export const activitysGet = (data) => request.get(`/activitys`,data)

// 活动 详情
export const activityDetailsGet = (id) => request.get(`/activitys/${id}`)

// 活动 添加发布 
export const activitysPost = (data) => request.post(`/activitys`,data)

// 活动 关注
export const activitysFollow = (data) => request.post(`/followActivity`,data)

// 活动 关注
export const activitysFollowNo = (data) => request.delete(`/followActivity`,data)
