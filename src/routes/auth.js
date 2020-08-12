import AuthLayout from "../components/layouts/AuthLayout";
import Login from "../components/pages/auth/Login";

export default [
  {
    path: "/auth",
    name: "auth",
    component: AuthLayout,
    children: [{ path: "login", name: "login", component: Login }],
  },
];
