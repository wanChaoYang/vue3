const format = {
  /**
   * 数字格式化
   * @param v 原始数字
   * @param format 格式/小数点后保留位数（默认为2）会四舍五入
   * @return {string}
   */
  fmtNumber: function (v, format) {
    if (!format) {
      format = '0.00';
    }
    if (typeof format == 'number') {
      if (format <= 0) {
        format = '0';
      } else {
        format = '0.' + '0'.repeat(format);
      }
    }

    v = v * 1;
    if (!typeof format == 'number') {
      return '';
    }
    var comma = ',',
      dec = '.',
      i18n = false,
      neg = v < 0;
    v = Math.abs(v);
    if (format.substr(format.length - 2) == '/i') {
      format = format.substr(0, format.length - 2);
      i18n = true;
      comma = '.';
      dec = ',';
    }
    var hasComma = format.indexOf(comma) != -1,
      psplit = (i18n ? format.replace(/[^\d\,]/g, '') : format.replace(/[^\d\.]/g, '')).split(dec);
    if (1 < psplit.length) {
      v = v.toFixed(psplit[1].length);
    } else if (2 < psplit.length) {
      throw ('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
    } else {
      v = v.toFixed(0);
    }
    var fnum = v.toString();
    psplit = fnum.split('.');
    if (hasComma) {
      var cnum = psplit[0],
        parr = [],
        j = cnum.length,
        m = Math.floor(j / 3),
        n = cnum.length % 3 || 3,
        i;
      for (i = 0; i < j; i += n) {
        if (i != 0) {
          n = 3;
        }
        parr[parr.length] = cnum.substr(i, n);
        m -= 1;
      }
      fnum = parr.join(comma);
      if (psplit[1]) {
        fnum += dec + psplit[1];
      }
    } else {
      if (psplit[1]) {
        fnum = psplit[0] + dec + psplit[1];
      }
    }
    return (neg ? '-' : '') + format.replace(/[\d,?\.?]+/, fnum);
  },

  /**
   * 数字反格式化
   * 去逗号
   * @param v 格式化数字
   * @return {number}
   */
  unFmtNumber: function (v) {
    if (typeof v === 'number' || !v) {
      return v;
    } else {
      var val = v.replace(/,/g, '') * 1
      if (!(typeof val === 'number')) {
        return v;
      }
      return val;
    }
  },

  /**
   * 帐号格式化、 添加空格分隔符    hidden = true将隐藏部分号码
   * @param  value {string}账户
   * @param hidden {bool}  是否隐藏账户  true为隐藏
   */
  fmtAcctNo: function (value, hidden) {
    if (value == null || value == "") {
      return "";
    }
    value = (value + "").replace(/\s/g, "");
    var tmpStr = "";
    if (hidden) {
      var start = value.length - 4;
      if (start < 4) {
        start = 4;
      }
      tmpStr = tmpStr + value.substring(0, 4) + " **** **** " + value.substring(start, value.length);
    } else {
      while (value.length > 4) {
        tmpStr = tmpStr + value.substring(0, 4);
        tmpStr = tmpStr + " ";
        value = value.substring(4, value.length);
      }
      tmpStr = tmpStr + value;
    }
    return tmpStr;
  },

  /**
   * 小写金额转大写金额（默认到分）
   * @param v 原始数字/金额 必须是数据类型
   * @return {string}
   */
  fmtAmtChinese: function (v) {
    v = Math.abs(format.unFmtNumber(v)); //清除‘,’后再取绝对值保持为正数
    var number = Math.round(v * 100) / 100;
    number = number.toString(10).split('.');
    var a = number[0];
    if (a.length > 12) {
      return '金额超出最大范围[999999999999.99]';
    }
    var e = '零壹贰叁肆伍陆柒捌玖';
    var num1 = '';
    var len = a.length - 1;
    for (var i = 0; i <= len; i++) {
      num1 += e.charAt(parseInt(a.charAt(i))) + [
        ['圆', '万', '亿'][Math.floor((len - i) / 4)], '拾', '佰', '仟'
      ][(len - i) % 4];
    }
    if (number.length == 2 && number[1] != '') {
      var a = number[1];
      for (var i = 0; i < a.length; i++) {
        num1 += e.charAt(parseInt(a.charAt(i))) + ['角', '分'][i];
      }
    }
    num1 = num1.replace(/零佰|零拾|零仟|零角/g, '零');
    num1 = num1.replace(/零{2,}/g, '零');
    num1 = num1.replace(/零(?=圆|万|亿)/g, '');
    num1 = num1.replace(/亿万/, '亿');
    num1 = num1.replace(/^圆零?/, '');
    if (num1 != '' && !/分$/.test(num1)) {
      num1 += '整';
    }
    return num1;
  },
  /**
   * 帐号反格式化
   * 去空格（不支持星号反显）
   * @param acc 格式化数字
   * @return {string}
   */
  unFmtAcctNo: function (acc) {
    return String(acc).trim(true);
  },

  /**
   * 百分比格式化
   * @param v 原始数字
   * @param formatNum 格式/小数点后保留位数（默认为2）
   * @return {string}
   */
  fmtPercent: function (v, formatNum) {
    let num = format.unFmtNumber(v) //清除金额格式
    return format.fmtNumber(num, formatNum) + '%';
  },

  /**
   * 百分比反格式化
   * @param v 百分比
   * 去逗号、去百分号
   * @return {number}
   */
  unFmtPercent: function (v) {
    return format.unFmtNumber(v.replace(/[%]/g, ''));
  },

  /**
   * 去除字符串空格
   * @param value
   * @returns {string}
   */
  removeSpace(value) {
    var rtnVal = String(value);
    return rtnVal.replace(/\s/g, '');
  },

  /**
   * 格式化手机脱敏(格式：188****8888)
   */
  fmtPhoneNo(value) {
    if (value == null || value == '') {
      return '';
    }
    value = format.removeSpace(value);
    var tmpStr = '';
    var start = value.length - 4;
    if (start < 4) {
      start = 4;
    }
    tmpStr = tmpStr + value.substring(0, 3) + '****' + value.substring(start, value.length);
    return tmpStr;
  },

  /**
   * 格式化手机号(格式：188 8888 8888)
   */
  fmtPhoneNum(phoneNum) {
    if (phoneNum.length > 3) {
      phoneNum = phoneNum.replace(/\s*/g, '');
      if (phoneNum.length > 7) {
        phoneNum = phoneNum.replace(/^(...)(....)/g, '$1 $2 ');
      } else if (phoneNum.length > 3) {
        phoneNum = phoneNum.replace(/^(...)/g, '$1 ');
      }
    }
    return phoneNum
  },

  /*
   * 姓名脱敏
   */
  formatName(name) {
    console.log(name)
    if (name.length == 2) {
      return name.replace(/^./, '*');
    } else {
      return name.charAt(0) + name.substring(1, name.length - 1).replace(/./g, '*') + name.charAt(name.length - 1);
    }
  },
};

export default format