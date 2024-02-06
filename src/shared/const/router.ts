export enum AppRoutes {
    MAIN = 'main',
    COMPARISON = "comparison",
    ADMIN = "admin",
    NOT_FOUND = 'not-found',
    WORD_LIST = 'word-list',
    COLLECT_WORD = 'collect-word',
    AUTH = "auth",
    FORBIDDEN = "forbidden",
    DRAG_WORD = "drag-word"
}

export const getRouteMain = () => '/';
export const getRouteAuth = () => `/${AppRoutes.AUTH}`;
export const getRouteAdmin = () => `/${AppRoutes.ADMIN}`;
export const getRouteWordList = () => `/${AppRoutes.WORD_LIST}`;
export const getRouteComparison = () => `/${AppRoutes.COMPARISON}`;
export const getRouteCollectWord = () => `/${AppRoutes.COLLECT_WORD}`;
export const getRouteDragWord = () => `/${AppRoutes.DRAG_WORD}`;
export const getRouteForbidden = () => `/${AppRoutes.FORBIDDEN}`;
