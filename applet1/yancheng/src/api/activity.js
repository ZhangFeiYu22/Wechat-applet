import request from '@/utils/request'

// 活动 列表
export const activitysGet = (data) => request.get(`/activitys`,data)

// 活动 详情
export const activityDetailsGet = (id) => request.get(`/activitys/${id}`)

// 活动 添加发布 
export const activitysPost = (data) => request.post(`/activitys`,data)


// 活动 关注
export const activitysFollow = (id) => request.post(`/followActivity/${id}`)

// 活动 是否关注  判断
export const isLikeActivity = (id) => request.get(`/followActivity/check/${id}`)


// 活动 取消关注
export const activitysFollowNo = (id) => request.delete(`/followActivity/${id}`)
