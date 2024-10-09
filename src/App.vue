<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

/** 作者小心思 */
ElNotification({
  title: "紧急公告",
  type: "success",
  dangerouslyUseHTMLString: true,
  message:
    "你有待处理的任务。<a style='color: teal' target='_blank' href='https://github.com/un-pany/v3-admin-vite'>点击进行处理！</a>",
  duration: 0,
  position: "bottom-right"
})
</script>

<template>
  <el-config-provider :locale="zhCn" :size="'default'">
    <router-view />
  </el-config-provider>
</template>
