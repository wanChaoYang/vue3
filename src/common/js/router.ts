import router from '../../router/index'

router.beforeEach((to, from, next) => {
  if (!to.meta.isLogin) {
    next()
  } else {
    //去获取token,token存在说明是登录next(),否则提示登录
  }
})
