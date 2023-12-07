import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
    token: null,
    login: noop,
    logout: noop,
    loginAdmin: noop,
    isAdmin: false
})