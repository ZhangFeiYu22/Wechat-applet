import request from '@/utils/request'

// 发布 添加投票
export const voteAdd = (data) => request.post(`/vote`,data)


// 获取 投票列表
export const voteGet = (data) => request.get(`/vote`,data)
