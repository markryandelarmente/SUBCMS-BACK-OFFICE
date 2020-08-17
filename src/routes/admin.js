import AppLayout from "../components/layouts/AppLayout";
import DashboardIndex from "../components/pages/dashboard/index";
import ResourceIndex from "../components/pages/resource/index";
import SubscriptionIndex from "../components/pages/subscription/index";

// USER GROUP
import UsersMain from "../components/pages/users/Main";
import UserIndex from "../components/pages/users/user/index";
import user_index from "../components/pages/users/user/child/_index";

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
        path: "resources",
        name: "resources",
        component: ResourceIndex,
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
            children: [{ path: "", name: "user_index", component: user_index }],
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
