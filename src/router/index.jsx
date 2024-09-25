import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import { AuthRoute } from "../components/AuthRoute";
import Article from "../pages/article";
import Home from "../pages/home";
import Publish from "../pages/publish";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout></Layout></AuthRoute>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'article',
                element: <Article></Article>
            },
            {
                path: 'publish',
                element: <Publish></Publish>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },

])

export default router