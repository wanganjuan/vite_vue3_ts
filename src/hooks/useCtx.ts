import { getCurrentInstance } from "vue"
import { useRoute, useRouter } from "vue-router"

const useCtx = () => {
  const app: any = getCurrentInstance()
  const $router = useRouter()
  const $route = useRoute()

  return {
    $app: app?.appContext.config.globalProperties,
    $router,
    $route
  }
}
export default useCtx
