import AppLayout from "../components/layouts/AppLayout";
import DashboardIndex from "../components/pages/dashboard/index";
import ResourceIndex from "../components/pages/resource/index";
import SubscriptionIndex from "../components/pages/subscription/index";
import UserIndex from "../components/pages/user/index";
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
        path: "users",
        name: "users",
        component: UserIndex,
      },
      {
        path: "settings",
        name: "settings",
        component: SettingIndex,
      },
    ],
  },
];
