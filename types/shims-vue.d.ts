declare module "*.scss" {
  const scss: Record<string, string>
  export default scss
}

declare module "*.vue" {
  import Vue from "vue"
  export default Vue
}
