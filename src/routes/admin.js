import AppLayout from "../components/layouts/AppLayout";
import DashboardIndex from "../components/pages/dashboard/index";
import SubscriptionIndex from "../components/pages/subscription/index";

// ===================================
// DASHBOARD GROUP
// ===================================

// ===================================
// RESOURCES GROUP
// ===================================
import ContentsMain from "../components/pages/contents/Main";
// CONTENTS
import ContentIndex from "../components/pages/contents/content/index";
import content_index from "../components/pages/contents/content/child/_index";
import content_create from "../components/pages/contents/content/child/_create";
// RESOURCES
import ResourceIndex from "../components/pages/contents/resource/index";
import resource_index from "../components/pages/contents/resource/child/_index";
import resource_create from "../components/pages/contents/resource/child/_create";
// CATEGORIES
import CategoryIndex from "../components/pages/contents/category/index";
import category_index from "../components/pages/contents/category/child/_index";
// TAGS
import TagIndex from "../components/pages/contents/tag/index";
import tag_index from "../components/pages/contents/tag/child/_index";

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
        path: "content-management",
        name: "content-management",
        component: ContentsMain,
        redirect: { name: "content" },
        children: [
          {
            path: "content",
            name: "content",
            component: ContentIndex,
            redirect: { name: "content_index" },
            children: [
              {
                path: "",
                name: "content_index",
                component: content_index,
              },
              {
                path: "create",
                name: "content_create",
                component: content_create,
              },
            ],
          },
          {
            path: "resources",
            name: "resources",
            component: ResourceIndex,
            redirect: { name: "resource_index" },
            children: [
              { path: "", name: "resource_index", component: resource_index },
              {
                path: "create",
                name: "resource_create",
                component: resource_create,
              },
            ],
          },
          {
            path: "categories",
            name: "categories",
            component: CategoryIndex,
            redirect: { name: "category_index" },
            children: [
              { path: "", name: "category_index", component: category_index },
            ],
          },
          {
            path: "tags",
            name: "tags",
            component: TagIndex,
            redirect: { name: "tag_index" },
            children: [{ path: "", name: "tag_index", component: tag_index }],
          },
        ],
      },
      {
        path: "subscriptions",
        name: "subscriptions",
        component: SubscriptionIndex,
      },
      {
        path: "user-management",
        name: "user-management",
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
