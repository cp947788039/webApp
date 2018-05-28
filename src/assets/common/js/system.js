import * as types from './mutation-types'

export function updateCurTime({ dispatch, state }) {
    dispatch(types.SET_CUR_TIME, Date.now() + state.system.timeDeviation)
}

export function setTimeDeviation({ dispatch, state }, timeDeviatio) {
    dispatch(types.SET_TIME_DEVIATION, timeDeviatio)
    updateCurTime({ dispatch, state })
}

let isLoadingBySkinB2c = false
export function getSkinB2C({ dispatch, state }) {
    let skinLocal = localStorage.getItem(types.SET_SKIN_B2C)
    if (skinLocal) {
        skinLocal = JSON.parse(skinLocal)
        if (skinLocal.time > Date.now() ) {
            dispatch(types.SET_SKIN_B2C, skinLocal)
            return Promise.resolve(skinLocal)
        }
    }
    if(isLoadingBySkinB2c) return
    isLoadingBySkinB2c = true
    this.$http.get(`${gConfig.PROJECT_MARKETING}/api/activity/getSkin`, {
        type: -1,
    }).success(({ data }) => {
        isLoadingBySkinB2c = false
        data.time = Date.now()+ 1000 * 3600 * 2  // 皮肤有效时间2小时
        dispatch(types.SET_SKIN_B2C, data)
    })
}
