import request from '@/utils/request'

// 获取  社区  动态列表
export const communityFriendsListGet = (data) => request.get(`/communityFriends`,data)

// 社区 动态   点赞
export const communityLikePost = (data) => request.post(`/communityLike`,data)

// 社区 动态  评论
export const communityCommentPost = (data) => request.post(`/communityComment`,data)