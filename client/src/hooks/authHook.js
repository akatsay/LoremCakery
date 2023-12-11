import {useState, useCallback, useEffect} from "react"

const storageName = "userData"

export const useAuth = () => {

    const [token, setToken] = useState(null)
    const [userName, setUserName] = useState(null);
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, userNameP) => {
        setToken(jwtToken)
        setUserName(userNameP)
        sessionStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userName: userNameP
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserName(null)
        sessionStorage.removeItem(storageName)
    }, [])

    const adminLogin = useCallback((jwtToken) => {
        setToken(jwtToken + "adm")

        sessionStorage.setItem(storageName, JSON.stringify({
            token: jwtToken + "adm",
        }))
    })

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem(storageName))

        if (data && data.token && data.userName) {
            login(data.token, data.userName)
        }

        setReady(true)

    }, [login, userName])

    return {login, adminLogin, logout, token, ready, userName}
}