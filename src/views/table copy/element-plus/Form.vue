<template>
  <el-dialog v-model="dialogTag" :title="isAdd ? '新增' : '修改'" :before-close="cancel" width="30%">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item prop="hah" label="哈好">
        <el-input placeholder="请输入" v-model="form.hah" style="width: 350px" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { type FormInstance, type FormRules } from "element-plus"
// 定义props
const props = defineProps({
  dialogTag: {
    required: true,
    type: Boolean
  },
  isAdd: {
    type: Boolean,
    default: false
  }
})
const { dialogTag, isAdd } = toRefs(props)

// 声明可以触发的事件
const emit = defineEmits<{
  (event: "close", value: boolean): void
}>()

const cancel = () => {
  emit("close", false)
}
interface CreateOrUpdateTableRequestData {
  hah: string
}
const formRef = ref<FormInstance | null>(null)
const form = reactive<CreateOrUpdateTableRequestData>({
  hah: ""
})
const rules = ref<FormRules>({
  hah: [{ required: true, trigger: "blur", message: "请输入用户名" }]
})
</script>
