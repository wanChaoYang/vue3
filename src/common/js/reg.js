//身份证校验
const isIdNo = function (idNo) {
    if (!idNo || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/.test(idNo)) {
        return false;
    } else {
        return true;
    }
};

/**
 * 是否是URL
 * @param v
 * @returns {boolean}
 */
const isUrl = function (v) {
    return /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST|127.0.0.1))\/?)/i
        .test(v);
};

export {
    isIdNo,
    isUrl
}