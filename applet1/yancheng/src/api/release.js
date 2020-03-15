import request from '@/utils/request'

// 获取OSS
export const getOssParamsGet = (data) => request.get(`/app-user/getOssParams`,data)

// 发布   社区   动态列表
export const communityFriendsPost = (data) => request.post(`/communityFriends`,data)

// 发布   论坛   动态列表
export const forumContentPost = (data) => request.post(`/forumContent`,data)