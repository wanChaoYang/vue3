let timer
let timeOut
const utils = {
    /**
     *日期倒计时
     * v 终止日期：格式2020-12-12 或者2020/12/12
     * t 终止时间：21:00:00
     */
    showtime(v, t) {
        let endtime
        let nowtime = new Date(); //获取当前时间
        if (v) {
            v.replace(/-/g, '/')
            endtime = new Date(v); //定义结束日期
            if (t) {
                let en = v + ' ' + t
                endtime = new Date(en); //定义结束时间
            }
        } else {
            endtime = nowtime //定义默认结束时间
        }
        //结束时间-开始时间=距离时间
        if (endtime.getTime() >= nowtime.getTime()) {
            let lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
                leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
                lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
                leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
                lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
            return leftd + ":" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
        } else {
            return 0 + ":" + 0 + ":" + 0 + ":" + 0; //返回倒计时的字符串
        }
    },
    /**
     * 防抖
     */

    debounce(fun, delay) {
        delay = delay || 1000
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            fun()
        }, delay)
    },
    /**
     * 节流 
     * */
    throttle(fun, delay) {
        delay = delay || 1000
        if (!timeOut) {
            timeOut = setTimeout(function () {
                fun()
                timeOut = null
            }, delay)
        }
    }

}
export default utils