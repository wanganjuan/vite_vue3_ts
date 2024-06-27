// 查询请求的参数, 这个用不上感觉
export interface CreateOrUpdateTableRequestData {
  id?: string
  username: string
  password?: string
}

// 查询请求的参数
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

// 这个表格渲染的值
export interface GetTableData {
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
}

// 这个是查询接口返回的值
export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>
