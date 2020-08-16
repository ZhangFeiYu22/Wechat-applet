import request from '@/utils/request'

// 发布 添加投票
export const voteAdd = (data) => request.post(`/vote`, data)


// 获取 投票列表  需要登录的
export const voteListHasLogin = (data) => request.get(`/vote/getList`, data)
//不需要登录
export const voteListNoLogin = (data) => request.get(`/vote`, data)


// 选择投票项 投票答案
export const voteListSel = (data) => request.post(`/voteAnswer`, data)

// 我的记录   我参加的投票
export const voteRecord = (data) => request.get(`/voteAnswer`, data)

// 投票 详情
export const voteDetailsGet = (id) => request.get(`/vote/${id}`)
