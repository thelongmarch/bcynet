
const Func = {
  // Date类型转换成String > yyyy-MM-dd
  dateToString: function (dateVal) {
    if (!dateVal) {
      return ''
    }
    // 备注： 入参一定要Date格式的，如果不是，请装换成Date格式
    dateVal = new Date(dateVal)
    let year = dateVal.getFullYear()
    let mm = parseInt(dateVal.getMonth() + 1, 10)
    let month = mm < 10 ? '0' + mm : mm
    let dd = dateVal.getDate()
    let day = dd < 10 ? '0' + dd : dd

    return year + '-' + month + '-' + day
  },
  // Date类型转换成String > yyyyMMdd
  dateToString2: function (dateVal) {
    if (!dateVal) {
      return ''
    }
    // 备注： 入参一定要Date格式的，如果不是，请装换成Date格式
    dateVal = new Date(dateVal)
    let year = dateVal.getFullYear()
    let mm = parseInt(dateVal.getMonth() + 1, 10)
    let month = mm < 10 ? '0' + mm : mm
    let dd = dateVal.getDate()
    let day = dd < 10 ? '0' + dd : dd

    return year + '' + month + '' + day
  },
  // Date类型转换成String > yyyyMM
  dateToString3: function (dateVal) {
    if (!dateVal) {
      return ''
    }
    // 备注： 入参一定要Date格式的，如果不是，请装换成Date格式
    dateVal = new Date(dateVal)
    let year = dateVal.getFullYear()
    let mm = parseInt(dateVal.getMonth() + 1, 10)
    let month = mm < 10 ? '0' + mm : mm
    return year + '' + month
  },
  // 时间戳(时间戳为13位)转换成String > yyyy-MM-dd
  timestampToTime (timestamp) {
    let date = new Date(timestamp)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return Y + M + D
  },
  // 时间戳(时间戳为13位)转换成String > yyyy-MM-dd hh:mm:ss
  formatDateTime (inputTime) {
    let date = new Date(inputTime)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },
  // 时间戳(时间戳为13位)转换成String > yyyy/MM/dd hh:mm:ss
  formatDateTimeSpe (inputTime) {
    let date = new Date(inputTime)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    let time = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    return time.replace(/-/g, '/')
  },
  // 拼接对象为url
  encodeSearchParams (obj) {
    const params = []
    Object.keys(obj).forEach((key) => {
      let value = obj[key]
      if (typeof value === 'undefined') {
        value = ''
      }
      params.push([key, encodeURIComponent(value)].join('='))
    })
    return params.join('&')
  },
  // 获取url参数方法(无#号)
  getUrlArgs: function () {
    const query = location.search.substring(1)
    const pairs = query.split('&')
    let args = {}
    let pos
    let idx
    let argname
    let val

    for (let i = 0; i < pairs.length; i++) {
      pos = pairs[i]
      idx = pos.indexOf('=')
      if (idx === -1) continue
      argname = pos.substring(0, idx)
      val = decodeURIComponent(pos.substring(idx + 1))
      args[argname] = val
    }
    return args
  },
  // 获取url参数方法(有#号)
  getNewUrlArgs: function () {
    const query = location.hash.substr(location.hash.indexOf('?') + 1)
    const pairs = query.split('&')
    let args = {}
    let pos
    let idx
    let argname
    let val

    for (let i = 0; i < pairs.length; i++) {
      pos = pairs[i]
      idx = pos.indexOf('=')
      if (idx === -1) continue
      argname = pos.substring(0, idx)
      val = decodeURIComponent(pos.substring(idx + 1))
      args[argname] = val
    }
    return args
  },
  isArrFun(param){
    return Object.prototype.toString.call(param) === '[object Array]';
  }

}
export default Func
