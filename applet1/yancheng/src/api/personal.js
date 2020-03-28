import request from '@/utils/request'

// 获取 个人详情
export const getMember = (id) => request.get(`/member/${id}`)

// 获取 话题列表
export const getMemberForum = (id,data) => request.get(`/member/forum/${id}`,data)

// 获取 社区列表
export const getMemberComm = (id,data) => request.get(`/member/community/${id}`,data)

// 关注
export const followMemberPost = (id) => request.post(`/followMember/${id}`)

// 查看是否关注
export const followMemberGet = (id) => request.get(`/followMember/${id}`)

// 取消关注
export const followMemberDel = (id) => request.delete(`/followMember/${id}`)
