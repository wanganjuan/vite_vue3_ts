//时间转换
export function format(value: number, type = "yyyy-MM-dd hh:mm:ss") {
  if (!value) {
    return ""
  }
  const D = new Date(value)
  const y = D.getFullYear()
  const M = D.getMonth() + 1 < 10 ? `0${D.getMonth() + 1}` : D.getMonth() + 1
  const d = D.getDate() < 10 ? `0${D.getDate()}` : D.getDate()
  const h = D.getHours() < 10 ? `0${D.getHours()}` : D.getHours()
  const m = D.getMinutes() < 10 ? `0${D.getMinutes()}` : D.getMinutes()
  const s = D.getSeconds() < 10 ? `0${D.getSeconds()}` : D.getSeconds()
  if (type == "yyyy-MM-dd") {
    return `${y}-${M}-${d}`
  } else if (type == "yyyy-MM-dd hh:mm") {
    return `${y}-${M}-${d} ${h}:${m}`
  } else if (type == "yyyy-MM-dd hh:mm:ss") {
    return `${y}-${M}-${d} ${h}:${m}:${s}`
  } else if (type == "yyyyMMddhhmmss") {
    return `${y}${M}${d}${h}${m}${s}`
  } else if (type == "yyyy/MM/dd") {
    return `${y}/${M}/${d}`
  } else if (type == "yyyyMMdd") {
    return `${y}${M}${d}`
  }
}

// 对返回的数据格式进行统一的处理
const timeParaList = ["oprTime", "reviewTime", "createTime", "lastModTime", "beginTime", "endTime"]
export function formatData(list: any) {
  for (const temp of list) {
    for (const key of timeParaList) {
      if (temp[key]) {
        temp[key] = temp[key].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5:$6")
      }
    }
  }
  return list
}

// 对请求过滤的 选项 值 设置undefined
export function formatFilterQuery(_filter: any) {
  if (_filter) {
    for (const key in _filter) {
      if (!_filter[key] && _filter[key] !== 0) {
        _filter[key] = undefined
      }
    }
  }
  return _filter
}
export const nameRule = [
  { required: true, message: "请输入名称", trigger: "blur" },
  { max: 50, message: "最大支持50个字符", trigger: "change" },
  {
    validator: function (rule: any, value: any, callback: any) {
      if (value && /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(value) == false) {
        callback(new Error("格式错误，请输入中文、英文、数字、横线（-）和下划线（_）"))
      } else {
        callback()
      }
    },
    trigger: "change"
  }
]
export const passwordRule = [
  { required: true, message: "请输入", trigger: "blur" },
  {
    validator: function (rule: any, value: any, callback: any) {
      if (value && /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(value) == false) {
        callback(new Error("长度不小于8，三种及其以上大小写字母/数字/特殊字符组成"))
      } else {
        callback()
      }
    },
    trigger: "change"
  }
]
export const listRule = [
  { required: true, message: "请选择", trigger: "blur" },
  {
    validator: function (rule: any, value: any, callback: any) {
      if (!value || value.length === 0) {
        callback(new Error("请选择"))
      } else {
        callback()
      }
    },
    trigger: "change"
  }
]

export function exportFileTool(res: any) {
  const blob = new Blob([res.data])
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = res.fileName
  a.click()
  URL.revokeObjectURL(url)
}

export const dataRangerPickOption = {
  disabledDate(time: any) {
    if (time.getTime() > Date.now()) {
      return true
    }
    return false
  },
  shortcuts: [
    {
      text: "最近一周",
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      }
    },
    {
      text: "最近一个月",
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      }
    },
    {
      text: "最近三个月",
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
      }
    }
  ]
}

export const dataPickOption = {
  disabledDate(time: any) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: "今天",
      onClick(picker: any) {
        picker.$emit("pick", new Date())
      }
    },
    {
      text: "昨天",
      onClick(picker: any) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        picker.$emit("pick", date)
      }
    },
    {
      text: "一周前",
      onClick(picker: any) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit("pick", date)
      }
    }
  ]
}
