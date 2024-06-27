import { type RouteRecordRaw } from "vue-router"

// 动态导入当前目录下所有的 .ts 文件，但排除 index.ts
const modules = import.meta.glob("./!(index).ts")

let configRouters: RouteRecordRaw[] = []

/**
 * Inject routers
 */
const importAll = async () => {
  for (const path in modules) {
    const module: any = await modules[path]()
    if (module.default) {
      configRouters = configRouters.concat(module.default)
    }
  }
}

await importAll()

export default configRouters
