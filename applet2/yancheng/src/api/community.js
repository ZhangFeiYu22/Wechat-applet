import request from '@/utils/request'

// 社区  动态列表   没有登录的数据（不可以点赞）
export const communityFriendsListGet = (data) => request.get(`/communityFriends`,data)

// 社区  动态列表    登录的数据（可以点赞）
export const communityFriendsListGetLogin = (data) => request.get(`/communityFriends/getList`,data)

//  动态  删除
export const communityFriendsListDel = (id) => request.delete(`/communityFriends/${id}`)

// 社区 动态   点赞
export const communityLike = (id) => request.post(`/communityLike/${id}`)

// 社区 动态   取消点赞
export const communityLikeNo = (id) => request.delete(`/communityLike/${id}`)

// 社区 动态  评论
export const communityCommentPost = (data) => request.post(`/communityComment`,data)
// 社区 动态  删除评论
export const communityCommentDel = (id) => request.delete(`/communityComment/${id}`)


// 每次登陆获取
export const dayEveryHandle = () => request.get(`/member/lolog`)
