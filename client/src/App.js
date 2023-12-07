import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer} from "react-toastify"
import { useAuth } from './hooks/authHook'

import "react-toastify/dist/ReactToastify.css"
import "./styles/css/index.css"

import { AuthContext } from "./context/authContext"
import { useRoutes } from "./routes/routes"

import { Header } from "./components/UI/header"
import { Footer } from "./components/UI/footer"
import { AppLoader } from "./components/loaders/appLoader"
import {CartProvider} from "./context/CartProvider";

function App() {

  const {login, logout, token, ready} = useAuth()
  const isAdmin = token?.slice(-3) === "adm"
  const routes = useRoutes(isAdmin)

  if (!ready) {
    return (
      <AppLoader />
    )
  }

  return (
      <CartProvider>
        <AuthContext.Provider value={{token, login, logout, isAdmin}}>
          <Router>
            <div className="container">
              <Header />
              {routes}
              <Footer />
              <ToastContainer
                limit={3}
                newestOnTop={false}
                rtl={false}
              />
            </div>
          </Router>
        </AuthContext.Provider>
      </CartProvider>
  )
}

export default App;
