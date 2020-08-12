import AppLayout from "../components/layouts/AppLayout";
import Dashboard from "../components/pages/dashboard/index";

export default [
  {
    path: "/admin",
    name: "admin",
    component: AppLayout,
    children: [{ path: "dashboard", name: "dashboard", component: Dashboard }],
  },
];
