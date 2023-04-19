import React, { lazy, Suspense } from 'react'
import { AppLoader } from "../components/loaders/appLoader"

import { UserRoutes } from './userRoutes'

export const useRoutes = isAdmin => {

    const AdminRoutes = lazy(() => import('./adminRoutes'))

    if (isAdmin) {
        return (
            <Suspense fallback={<AppLoader />}>
            <AdminRoutes />
            </Suspense>
        )
    }
    return (
        <UserRoutes />
    )
}