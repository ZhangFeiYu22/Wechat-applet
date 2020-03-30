const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex)

import {getOssParamsGet } from "@/api/release";

export default new Vuex.Store({
  state: {
    systemInfo: null,
    authId: '',
    ossData: null,
    imgUrlHttp: 'https://chengmipub.oss-cn-hangzhou.aliyuncs.com/city/game/sieve/images',
    token: '', //token
    globalOpenId: '', // 用户唯一凭证openid
    globalSessionKey: '', //sessionKey
  },
  mutations: {
    ['GET_SYSTEMINFO_SUCCESS'](state, systemInfo) {
      state.systemInfo = systemInfo;
    },
    ['GET_OSS_DATA'](state, ossData) {
      state.ossData = ossData;
    },
    changeToken: (state, value) => {
      const obj = state
      obj.token = value
    },
    changeAuthId: (state, value) => {
      const obj = state
      obj.authId = value
    },
    changeOpenId: (state, value) => {
      const obj = state
      obj.globalOpenId = value
    },
    changeSessionKey: (state, value) => {
      const obj = state
      obj.globalSessionKey = value
    },
  },
  actions: {
    getSystemInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        // console.log(state)
        if (state.systemInfo) {
          resolve(state.systemInfo)
        } else {
          wx.getSystemInfo({
            success(res) {
              commit('GET_SYSTEMINFO_SUCCESS', res)
              resolve(res)
            },
            fail(err) {
              reject(err)
            }
          });
        }

      })
    },
    getOssData({
      commit,
      state
    }, obj) {
      return new Promise((resolve, reject) => {
        // if (state.ossData) {
        //   resolve(state.ossData)
        // } else {
          getOssParamsGet(obj).then(res => {
            commit('GET_OSS_DATA', res.result)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        // }
      })
    }
  },
  getters: {}
})
