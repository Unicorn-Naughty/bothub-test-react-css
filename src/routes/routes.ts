import LoginPage from "../pages/login-page/login-page";
import MainPage from "../pages/main-page/main-page";

export const routes = [
    {
        path: "/",
        Component: MainPage
    },
    {
        path: "/login",
        Component: LoginPage
    },
]