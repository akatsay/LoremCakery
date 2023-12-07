import React, {useState, useEffect, useContext} from "react";
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast, Slide } from "react-toastify"
import { useHttp } from "../hooks/httpHook"

export const UserLoginPage = () => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        login: "",
        password: ""
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("api/user", "post", {...form})
            auth.login(data.token)
            navigate("/gallery")
            toast.success(data.message, {
                style: {backgroundColor: "#555", color: "white"},
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });

        } catch (e) {}
    }

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                style: {backgroundColor: "#555", color: "white"},
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
        clearError()
    }, [error, clearError])

    return (
        <>
            <motion.div
                initial = {{x: "-100%", height: 0}}
                animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
                exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
            >
                <div className="page-container">
                    <form className="admin-login-form">
                        <label className="input-label" htmlFor="login">Login</label>
                        <input
                            className="input"
                            id="login"
                            name="login"
                            type="text"
                            value={form.login}
                            onChange={changeHandler}
                            required
                        />
                        <label className="input-label" htmlFor="password">Password</label>
                        <input
                            className="input"
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={changeHandler}
                            autoComplete="false"
                            required
                        />
                        <button
                            disabled={loading ? true : false}
                            className="action-btn"
                            onClick={loginHandler}
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </motion.div>
        </>
    )
}