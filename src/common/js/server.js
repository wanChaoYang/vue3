import axios from "axios"
import Store from "../../store/index"
import {
  Toast
} from 'vant'

const http = {}
var instance = axios.create({
  timeout: 1000
})
//添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (Store.state.userToken) {
      config.headers.AuthoriZation = Store.state.uesrToken
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
//添加响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          Toast.fail('请求出错啦')
          break;
        case 401:
          Toast.fail('授权失败，请重新登录')
          setTimeout(() => {
            window.location.reload()
          }, 1000)
          break;
        case 403:
          Toast.fail('决绝访问')
          break;
        case 404:
          Toast.fail('请求错误，未找到该路径')
          break;
        case 500:
          Toast.fail('服务器端出错')
          break;
        default:
          break;
      }
    } else {
      console.log(err.message)
      return Promise.reject(err.response)
    }
  }
)

http.get = function (url, options) {
  return new Promise((resolve, reject) => {
    instance.get(url, options).then(response => {
      if (response.code == '0') {
        resolve(response.data)
      } else {
        reject(response.message)
      }
    }).catch(e => {
      console.log(e)
    })
  })
}

http.post = function (url, data, options) {
  return new Promise((resolve, reject) => {
    instance.post(url, data, options).then(response => {
      if (response.code == '0') {
        resolve(response.data)
      } else {
        reject(response.message)
      }
    }).catch(e => {
      console.log(e)
    })
  })
}
export default http
