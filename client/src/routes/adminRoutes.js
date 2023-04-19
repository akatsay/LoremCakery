import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom"

import { HomePage } from '../pages/homePage'
import { AboutPage } from '../pages/aboutPage'
import { ContactPage } from '../pages/contactPage'
import { GalleryPage } from '../pages/galleryPage/galleryPage'
import { ReviewsPage } from '../pages/reviewsPage/reviewsPage'
import { AdminPanelPage } from '../pages/adminPanelPage'
import { AdminLoginPage } from '../pages/adminLoginPage'

const AdminRoutes = () => {

    return (
        <Routes>
            <Route path ="/adminLogin" exact element={<AdminLoginPage />} />
            <Route path ="/adminPanel" exact element={<AdminPanelPage />} />
            <Route path ="/home" exact element={<HomePage />} />
            <Route path ="/about" exact element={<AboutPage />} />
            <Route path ="/contact" exact element={<ContactPage />} />
            <Route path ="/gallery" exact element={<GalleryPage />} />
            <Route path ="/reviews" exact element={<ReviewsPage />} />
            <Route path="/" element={<Navigate to="/adminPanel" />} />
            <Route path="*" element={<Navigate replace to="/" />}  />
        </Routes>
    )
}

export default AdminRoutes