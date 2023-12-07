import {useState, useCallback, useEffect} from "react"

const storageName = "userData"

export const useAuth = () => {

    const [token, setToken] = useState(null)

    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken) => {
        setToken(jwtToken)

        sessionStorage.setItem(storageName, JSON.stringify({
            token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        sessionStorage.removeItem(storageName)
    }, [])

    const adminLogin = useCallback((jwtToken) => {
        setToken(jwtToken + "adm")

        sessionStorage.setItem(storageName, JSON.stringify({
            token: jwtToken + "adm"
        }))
    })

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userName, data.userEmail)
        }

        setReady(true)

    }, [login])

    return {login, logout, token, ready}
}