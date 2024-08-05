// 严格控制新增修改的定义
export interface CreateOrUpdateTableRequestData {
  id?: string
  username: string
  password?: string
}

// 查询请求的参数，注意保持统一
export interface GetTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：用户名 */
  username?: string
  /** 查询参数：手机号 */
  phone?: string
}

// 这个表格渲染的值，这个保留代码
export interface GetTableData {
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
}

// 这个是查询接口返回的值, 查询经常添加字段，只是展示
export type GetTableResponseData = ApiResponseData<{
  // list: GetTableData[]
  list: any
  total: number
}>
