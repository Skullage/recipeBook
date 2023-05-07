import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "register"
declare module "C:/Users/Skullage/Desktop/ReactApp/recipeBook/frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}