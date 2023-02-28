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

function App() {

  const {login, logout, token, ready} = useAuth()
  const isAdmin = !!token
  const routes = useRoutes(isAdmin)

  if (!ready) {
    return (
      <>Loading...</>
    )
  }

  return (
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
  )
}

export default App;
