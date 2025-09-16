// 路由相关导出
export { default as AppRouter, router } from "./index";
export * from "./types";
export * from "./hooks";

// React Router 相关导出（便于统一管理）
export {
    Link,
    NavLink,
    Outlet,
    useNavigate,
    useLocation,
    useParams,
    useSearchParams,
} from "react-router";
