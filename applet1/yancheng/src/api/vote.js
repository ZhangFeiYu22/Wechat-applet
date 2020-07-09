import request from '@/utils/request'

// 发布 添加投票
export const voteAdd = (data) => request.post(`/vote`, data)


// 获取 投票列表
export const voteListGet = (data) => request.get(`/vote/getList`, data)


// 选择投票项 投票答案
export const voteListSel = (data) => request.post(`/voteAnswer`, data)
