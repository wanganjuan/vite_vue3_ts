export default {
  path: "/table",
  component: () => import("@/layouts/index.vue"),
  redirect: "/table/element-plus",
  name: "Table",
  meta: {
    title: "表格",
    elIcon: "Grid"
  },
  children: [
    {
      path: "element-plus",
      component: () => import("@/views/table/element-plus/index.vue"),
      name: "ElementPlus",
      meta: {
        title: "Element Plus",
        keepAlive: true
      }
    }
  ]
}
