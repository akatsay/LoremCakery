import React, {useState} from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer} from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import "./styles/css/index.css"

import { AuthContext } from "./context/authContext"
import { useRoutes } from "./routes"

import { Header } from "./components/header"
import { Footer } from "./components/footer"

function App() {

  const [isAdmin, setIsAdmin] = useState(true)
  const routes = useRoutes(isAdmin)

  const logout = () => setIsAdmin(false)

  return (
      <AuthContext.Provider value={{logout, isAdmin}}>
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
