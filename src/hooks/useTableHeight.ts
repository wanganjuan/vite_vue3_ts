import { debounce } from "lodash-es"
import { ElTable } from "element-plus"
export default () => {
  const maxTableHeightMixin = ref("100px")
  const tableMixinRef = ref<InstanceType<typeof ElTable>>()
  const calcTableHeightMixinFuncContent = () => {
    let buffer = 50 + 45 + 20 * 2 + 20 * 2 + 80
    const _filerbox = document.querySelector(".filter-box")
    const _batchBox = document.querySelector(".batch-box")
    if (_batchBox) {
      buffer = buffer + parseInt(_batchBox.getBoundingClientRect().height + "")
    }
    if (_filerbox) {
      const filterheight = _filerbox.getBoundingClientRect().height + ""
      buffer = buffer + parseInt(filterheight)
    }
    const vHeight = window.innerHeight
    setTimeout(() => {
      maxTableHeightMixin.value = `${vHeight - buffer}px`
      tableMixinRef?.value?.doLayout()
    }, 20)
  }
  const debounceFuncMixin = debounce(() => {
    calcTableHeightMixinFuncContent()
  }, 150)

  /** 在组件挂载后根据窗口大小判断设备类型并调整布局 */
  onMounted(() => {
    calcTableHeightMixinFuncContent()
    window.addEventListener("resize", debounceFuncMixin)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", debounceFuncMixin)
  })
  return { tableMixinRef, maxTableHeightMixin }
}
