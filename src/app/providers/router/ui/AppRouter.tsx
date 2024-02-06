import React, { useCallback, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './RequireAuth';
import { routeConfig } from '../config';

import { AppRoutesProps } from "@/shared/types/router";
import { PageLoader } from '@/widgets';



const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;