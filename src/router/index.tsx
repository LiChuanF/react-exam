import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router";
import { RouterProvider } from "react-router";

// 导入页面组件
import Home from "@/views/home";
import { Login } from "@/views/logIn";
import { ExamList } from "@/views/exams";
import App from "@/App";

// 路由配置
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            {/* 首页 */}
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            
            {/* 登录页 */}
            <Route path="login" element={<Login />} />
            
            {/* 考试列表页 */}
            <Route path="exams" element={<ExamList />} />
            
            {/* 404 页面 - 可以后续添加 */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
    )
);

// 路由提供者组件
export function AppRouter() {
    return <RouterProvider router={router} />;
}

// 导出路由实例（用于编程式导航）
export { router };

export default AppRouter;
