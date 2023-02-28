import React from 'react'

import { AdminRoutes } from './adminRoutes'
import { UserRoutes } from './userRoutes'


export const useRoutes = isAdmin => {

    if (isAdmin) {
        return (
            <AdminRoutes />
        )
    }
    return (
        <UserRoutes />
    )
}