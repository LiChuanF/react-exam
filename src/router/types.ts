/**
 * 路由配置项接口
 */
export interface RouteConfig {
    path: string;
    component: React.ComponentType;
    title?: string;
    meta?: {
        requireAuth?: boolean;
        keepAlive?: boolean;
        [key: string]: unknown;
    };
    children?: RouteConfig[];
}

/**
 * 路由路径常量
 */
export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    EXAMS: "/exams",
} as const;

/**
 * 路由路径类型
 */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
