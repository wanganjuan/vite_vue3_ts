<template>
  <div class="app-container">
    <el-card v-loading="listLoading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" icon="CirclePlus" @click="_add">新增用户</el-button>
          <el-button type="danger" icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" icon="RefreshRight" circle @click="getList" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table v-loading="listLoading" :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="用户名" align="center" />
          <el-table-column prop="roles" label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roles === 'admin'" type="primary" effect="plain">admin</el-tag>
              <el-tag v-else type="warning" effect="plain">{{ scope.row.roles }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain">启用</el-tag>
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <!-- <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button> -->
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="listQuery.pageIndex"
        v-model:limit="listQuery.pageSize"
        @pagination="getList"
      />
    </el-card>

    <!-- 新增/修改 -->
    <Form v-if="dialogTag" :is-add="isAdd" :dialog-tag="dialogTag" @close="close" />
  </div>
</template>

<script lang="ts" setup>
import { deleteTableDataApi, getTableDataApi } from "@/api/table"
import useCtx from "@/hooks/useCtx"
import { type GetTableData, type GetTableRequestData } from "@/api/table/types"
// import { ElMessage, ElMessageBox } from "element-plus"
import Form from "./Form.vue"

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

const { $app } = useCtx()
// 定义查询信息
const dataFromPlugin = reactive({
  total: 0,
  tableData: [],
  listLoading: false,
  dialogTag: false,
  isAdd: false,
  listQuery: {
    pageIndex: 1,
    pageSize: 10
  }
})
// 用来给页面赋值使用，toRefs(dataFromPlugin) 这个请勿改变
const { listQuery, total, listLoading, dialogTag, isAdd, tableData } = toRefs(dataFromPlugin)

// 删除
const handleDelete = (row: GetTableData) => {
  $app
    .$confirm(`正在删除用户：${row.username}，确认删除？`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(() => {
      deleteTableDataApi(row.id).then(() => {
        $app.$message.success("删除成功")
        getList()
      })
    })
}

// 查询
const getList = () => {
  listLoading.value = true
  const _filter = getFilter()
  getTableDataApi(_filter)
    .then(({ data }) => {
      dataFromPlugin.total = data.total
      dataFromPlugin.tableData = data.list
    })
    .catch(() => {
      dataFromPlugin.tableData = []
    })
    .finally(() => {
      listLoading.value = false
    })
}
// 查询请求参数
const getFilter = (): GetTableRequestData => {
  const _filter = { ...dataFromPlugin.listQuery }
  return {
    ..._filter,
    currentPage: _filter.pageIndex,
    size: _filter.pageSize
  }
}

// 默认执行一次
onBeforeMount(() => {
  handleFilter()
})

const handleFilter = () => {
  listQuery.value.pageIndex = 1
  getList()
}

const _reset = () => {
  // 重置其他的参数
  handleFilter()
}
const _add = () => {
  isAdd.value = true
  dialogTag.value = true
}
const close = () => {
  dialogTag.value = false
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
