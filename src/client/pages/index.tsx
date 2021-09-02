import { LoginPage } from "./login.page";
import { DashboardPage } from "./dashboard.page";

export default [
    {
        route: "/login",
        component: LoginPage
    },
    {
        route: "/",
        component: DashboardPage
    },
];