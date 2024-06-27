import { App } from "vue"
import Pagination from "./Pagination/index.vue"

export default {
  install(app: App) {
    app.component("Pagination", Pagination)
  }
}
