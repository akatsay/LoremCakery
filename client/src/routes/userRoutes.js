import React from 'react'
import {Routes, Route, Navigate, useLocation} from "react-router-dom"
import { AnimatePresence } from 'framer-motion'

import { HomePage } from '../pages/homePage'
import { AboutPage } from '../pages/aboutPage'
import { ContactPage } from '../pages/contactPage'
import { GalleryPage } from '../pages/galleryPage/galleryPage'
import { ReviewsPage } from '../pages/reviewsPage/reviewsPage'
import { AdminLoginPage } from '../pages/adminLoginPage'
import { UserLoginPage } from "../pages/UserLoginPage";

export const UserRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path ="/home" exact element={<HomePage />} />
                <Route path ="/about" exact element={<AboutPage />} />
                <Route path ="/contact" exact element={<ContactPage />} />
                <Route path ="/gallery" exact element={<GalleryPage />} />
                <Route path ="/reviews" exact element={<ReviewsPage />} />
                <Route path ="/login" exact element={<UserLoginPage />} />
                <Route path ="/adminLogin" exact element={<AdminLoginPage />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Navigate replace to="/" />}  />
            </Routes>
        </AnimatePresence>
    )
}