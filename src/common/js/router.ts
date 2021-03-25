import router from '../../router/index'
import store from '../../store/index'
router.beforeEach((to, from, next) => {
  if (!to.meta.isLogin) {
    if (store.state.userToken) {
      if (to.path != "/Login") {
        next()
      }
    } else {
      next()
    }
  } else {
    //去获取token,token存在说明是登录next(),否则提示登录
    if (store.state.userToken) {
      next()
    } else {
      next({
        path: "/login"
      })
    }
  }
})
