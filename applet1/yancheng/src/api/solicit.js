import request from '@/utils/request'

// 发布  我的征寻
export const solicitAdd = (data) => request.post(`/mySolicit`,data)

