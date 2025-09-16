import { useNavigate, useLocation } from "react-router";
import { ROUTES, type RoutePath } from "./types";

/**
 * 路由导航钩子
 * 提供类型安全的路由导航方法
 */
export function useAppNavigate() {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * 导航到指定路径
     * @param path 路由路径
     * @param options 导航选项
     */
    const navigateTo = (
        path: RoutePath | string,
        options?: { replace?: boolean; state?: unknown }
    ) => {
        navigate(path, options);
    };

    /**
     * 返回上一页
     */
    const goBack = () => {
        navigate(-1);
    };

    /**
     * 前进一页
     */
    const goForward = () => {
        navigate(1);
    };

    /**
     * 导航到首页
     */
    const goHome = () => {
        navigateTo(ROUTES.HOME);
    };

    /**
     * 导航到登录页
     */
    const goLogin = () => {
        navigateTo(ROUTES.LOGIN);
    };

    /**
     * 导航到考试列表
     */
    const goExams = () => {
        navigateTo(ROUTES.EXAMS);
    };

    /**
     * 判断当前是否在指定路径
     */
    const isCurrentPath = (path: RoutePath | string): boolean => {
        return location.pathname === path;
    };

    return {
        navigateTo,
        goBack,
        goForward,
        goHome,
        goLogin,
        goExams,
        isCurrentPath,
        currentPath: location.pathname,
        location,
    };
}

/**
 * 路由守卫钩子
 * 可以用于实现权限控制等功能
 */
export function useRouteGuard() {
    const { navigateTo, isCurrentPath } = useAppNavigate();

    /**
     * 检查是否需要登录
     * @param requireAuth 是否需要认证
     * @param redirectTo 重定向路径
     */
    const checkAuth = (
        requireAuth: boolean,
        redirectTo: RoutePath = ROUTES.LOGIN
    ) => {
        if (requireAuth) {
            // 这里可以添加实际的认证逻辑
            const isAuthenticated = false; // 示例：从 store 或 localStorage 获取认证状态

            if (!isAuthenticated && !isCurrentPath(redirectTo)) {
                navigateTo(redirectTo);
                return false;
            }
        }
        return true;
    };

    return {
        checkAuth,
    };
}
