require('common/js/jquery.cookie.js')

const isApp = $.cookie('BD-EGO_TERMINAL')

const errorMsg = '请检查是否在APP里运行'

/**
 * 生成随机方法名
 */
const generateRdFnName = (() => {
    let index = 0
    return function () {
        return `cbFunName_${index++}_${Date.now()}`
    }
})()

// App登录
function openLogin() {
    if (!isApp) throw errorMsg
    const appJson = {
        type: 440,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    return new Promise(resolve => {
        const timer = setInterval(() => {
            if ($.cookie('sid')) {
                clearInterval(timer)
                resolve()
            }
        }, 100)
    })
}

// 返回app首页
function goToHome() {
    if (!isApp) throw errorMsg
    const appJson = {
        type: 100,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

// 返回APP个人中心
function goToUserCenter() {
    if (!isApp) throw errorMsg
    const appJson = {
        type: 909,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

// 返回我的订单列表
function goToMyOrders() {
    if (!isApp) throw errorMsg
    const appJson = {
        type: 910,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

/**
 * 使网页全屏（隐藏购物车底部头部，订单头部）
 */
function hideOtherElement() {
    if (isApp) {
        const appJson = {
            type: 901,
        }
        setTimeout(function(){
            window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
        }, 3000)
    }
}
/**
 * 显示购物车头部和底部导航
 */
function showCartOtherElement() {
    if (!isApp) throw errorMsg
    const appJson = {
        type: 902,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}
/**
 * 显示鲜生活订单头部
 * index 0,1,2,3分别为（全部，待处理，待收货，已完成）
 */
function showOrderOtherElement(index) {
    if (isApp){
            const appJson = {
            type: 903,
            obj: {
                index:index
            }
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    }
}

/**
 * 隐藏App header
 */
function hideHeader() {
    if (isApp) {
        const appJson = {
            type: 904,
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    }
}

/**
 * 直接返回到app我的订单
 */
function goToAppOrder() {
    if (isApp) {
        const appJson = {
            type: 910,
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    }
}

// 获得定位信息
function getPoint() {
    if (isApp) {
        return new Promise((resolve, reject) => {
            const cbFunName = generateRdFnName() // 回调函数
            window[cbFunName] = function (data, point) {
                delete window[cbFunName]
                if (data === 'success') {
                    resolve(point)
                    //alert('app测试:'+point)
                } else {
                    reject(data)
                }
            }
            const appJson = {
                type: 900,
                obj: {
                    cbFunName,
                },
            }
            window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
        })
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ lng: '113.942753', lat: '22.524145' })
                // reject({name:'wangwei'})
            }, 3000)
        })
    }
}

//百度地图左边转化成腾讯地图坐标
function BDTransformTenc(lng,lat){
    let x = lng - 0.0065;
    let y = lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * PI);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI);
    let longitude = z * Math.cos(theta);
    let latitude = z * Math.sin(theta);
    return new Coordinate(longitude, latitude);
}

function goPay({ payNo, payType }) {
    if (!isApp) throw errorMsg
    return new Promise((resolve, reject) => {
        const cbFunName = generateRdFnName() // 支付结果回调函数
        window[cbFunName] = function (data) {
            delete window[cbFunName]
            if (data === 'success') {
                resolve(data)
            } else {
                reject(data)
            }
        }
        const appJson = {
            type: 701,
            obj: {
                payNo,
                payType,
                cbFunName,
            },
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    })
}

function androidBackIntercept(fn) {
    if (!isApp || isApp.toUpperCase().indexOf('ANDROID') < 0) {
        // 只支持android
        return
    }
    const cbFunName = generateRdFnName() // 回调函数
    window[cbFunName] = fn
    const appJson = {
        type: 905,
        obj: {
            cbFunName,
        },
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

/**
 * 拦截android物理返回事件，后push的先执行
 * @type {{push, remove}}
 */
const appBackIntercept = function () {
    const interceptFn = []

    function next(i) {
        if (i < 0) {
            return
        }
        interceptFn[i](() => {
            next(i - 1)
        })
    }

    androidBackIntercept(() => {
        next(interceptFn.length - 1)
    })

    /**
     * 添加拦截器
     * @param fn
     * @returns {function(this:null)} 调用删除拦截器
     */
    function push(fn) {
        const index = interceptFn.indexOf(fn)
        if (index > -1) {
            remove(fn)  // 已存在则删除，再添加
        }
        interceptFn.push(fn)
        return remove.bind(null, fn)
    }

    function remove(fn) {
        const index = interceptFn.indexOf(fn)
        if (index > -1) {
            interceptFn.splice(index, 1)
        }
    }

    return {
        push,
        remove,
    }
}()

appBackIntercept.push(() => {
    history.back() // 添加默认拦截，返回
})

/**
 * 打开新的webview
 */
function newWebView(url) {
    const appJson = {
        type: 906,
        obj: {
            url,
        },
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

export default {
    isApp,
    openLogin,
    goToHome,
    goToMyOrders,
    goToUserCenter,
    getPoint,
    goPay,
    hideOtherElement,
    showCartOtherElement,
    showOrderOtherElement,
    hideHeader,
    appBackIntercept,
    newWebView,
    goToAppOrder,
}
