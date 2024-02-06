import { ComparisonPage } from "../../../../pages/ComparisonPage";
import { DragCardPage } from "../../../../pages/DragCard";
import { MainPage } from "../../../../pages/MainPage";

import { UserRole } from "@/entities/User";
import { AdminPage } from "@/pages/AdminPage";
import { AuthPage } from "@/pages/AuthPage";
import { CollectWordPage } from "@/pages/CollectWordPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { WordListPage } from "@/pages/WordListPage";
import {
    AppRoutes,
    getRouteAdmin,
    getRouteAuth,
    getRouteCollectWord,
    getRouteComparison, getRouteDragWord,
    getRouteForbidden,
    getRouteMain,
    getRouteWordList
} from "@/shared/const";
import { AppRoutesProps } from "@/shared/types/router";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.AUTH]: {
        path: getRouteAuth(),
        element: <AuthPage />,
    },
    [AppRoutes.ADMIN]: {
        path: getRouteAdmin(),
        element: <AdminPage />,
        authOnly: true,
        roles: [UserRole.ADMIN]
    },
    [AppRoutes.WORD_LIST]: {
        path: getRouteWordList(),
        authOnly: true,
        element: <WordListPage />,
    },
    [AppRoutes.COMPARISON]: {
        path: getRouteComparison(),
        authOnly: true,
        element: <ComparisonPage />,
    },
    [AppRoutes.COLLECT_WORD]: {
        path: getRouteCollectWord(),
        authOnly: true,
        element: <CollectWordPage />,
    },
    [AppRoutes.DRAG_WORD]: {
        path: getRouteDragWord(),
        authOnly: true,
        element: <DragCardPage />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <div>404</div>,
    },
};