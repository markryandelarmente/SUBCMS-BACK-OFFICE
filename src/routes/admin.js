import AppLayout from "../components/layouts/AppLayout";
import DashboardIndex from "../components/pages/dashboard/index";
import SubscriptionIndex from "../components/pages/subscription/index";

// ===================================
// DASHBOARD GROUP
// ===================================

// ===================================
// RESOURCES GROUP
// ===================================
import ResourcesMain from "../components/pages/contents/Main";
// CONTENTS
import ContentIndex from "../components/pages/contents/content/index";
import content_index from "../components/pages/contents/content/child/_index";

// ===================================
// SUBSCRIPTION GROUP
// ===================================

// ===================================
// USER GROUP
// ===================================
import UsersMain from "../components/pages/users/Main";
// USERS
import UserIndex from "../components/pages/users/user/index";
import user_index from "../components/pages/users/user/child/_index";
import user_form from "../components/pages/users/user/child/_form";
// TICKETS
import TicketIndex from "../components/pages/users/ticket/index";
import ticket_index from "../components/pages/users/ticket/child/_index";
// ROLE AND PERMISSION
import RolePermissionIndex from "../components/pages/users/role_permission/index";

// ===================================
// SETTING GROUP
// ===================================
import SettingIndex from "../components/pages/setting/index";

export default [
  {
    path: "/admin",
    name: "admin",
    component: AppLayout,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: DashboardIndex,
      },
      {
        path: "",
        name: "contents",
        component: ResourcesMain,
        redirect: { name: "contents" },
        children: [
          {
            path: "contents",
            name: "contents",
            component: ContentIndex,
            redirect: { name: "content_index" },
            children: [
              { path: "", name: "content_index", component: content_index },
            ],
          },
        ],
      },
      {
        path: "subscriptions",
        name: "subscriptions",
        component: SubscriptionIndex,
      },
      {
        path: "",
        name: "users",
        component: UsersMain,
        redirect: { name: "users" },
        children: [
          {
            path: "users",
            name: "users",
            component: UserIndex,
            redirect: { name: "user_index" },
            children: [
              { path: "", name: "user_index", component: user_index },
              { path: "create", name: "user_create", component: user_form },
              { path: "edit/:id", name: "user_edit", component: user_form },
            ],
          },
          {
            path: "tickets",
            name: "tickets",
            component: TicketIndex,
            redirect: { name: "ticket_index" },
            children: [
              { path: "", name: "ticket_index", component: ticket_index },
            ],
          },
          {
            path: "roles/permissions",
            name: "roles_permissions",
            component: RolePermissionIndex,
          },
        ],
      },
      {
        path: "settings",
        name: "settings",
        component: SettingIndex,
      },
    ],
  },
];
