import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  name: "System",
  path: "/system",
  component: Layout,
  redirect: "/system/user",
  meta: {
    icon: "homeFilled",
    title: $t("menus.systemTitle"),
    rank: 102
  },
  children: [
    {
      name: "UsersPage",
      path: "/system/user",
      meta: {
        title: $t("menus.systemuser")
      },
      component: () => import("@/views/system/user/index.vue")
    },
    {
      name: "RolesPage",
      path: "/system/role",
      meta: {
        title: $t("menus.systemrole")
      },
      component: () => import("@/views/system/role/index.vue")
    },
    {
      name: "DepartmentPage",
      path: "/system/dept",
      meta: {
        title: $t("menus.systemdepartment")
      },
      component: () => import("@/views/system/dept/index.vue")
    }
  ]
} as RouteConfigsTable;
