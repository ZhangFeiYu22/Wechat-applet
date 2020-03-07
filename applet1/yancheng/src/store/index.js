const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    systemInfo: null,
    imgUrlHttp: 'https://chengmipub.oss-cn-hangzhou.aliyuncs.com/city/game/sieve/images'
  },
  mutations: {
    ['GET_SYSTEMINFO_SUCCESS'](state, systemInfo) {
      state.systemInfo = systemInfo;
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
  },
  getters: {
  }
})
