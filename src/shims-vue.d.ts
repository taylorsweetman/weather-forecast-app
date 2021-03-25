declare module "*.vue" {
  import { defineComponent } from "vue"
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module "*.json" {
  const data: { [key: string]: string }
  export default data
}
