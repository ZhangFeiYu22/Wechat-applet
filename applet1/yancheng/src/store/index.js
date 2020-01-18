const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    systemInfo: null,
    menuSettings: {
      height: 0
    },
    topHeight: '',
    imgUrlHttp: 'https://chengmipub.oss-cn-hangzhou.aliyuncs.com/city/game/sieve/images'
  },
  mutations: {
    ['GET_SYSTEMINFO_SUCCESS'](state, systemInfo) {
      state.systemInfo = systemInfo;
    },
    setMenuSettings(state, settings) {
      state.menuSettings = settings
    },
    topHeightFun(state,val){
        state.topHeight = val
    }
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
    isIphoneX: state => {
      return state.systemInfo ? state.systemInfo.model.includes("iPhone X") : false
    }
  }
})
