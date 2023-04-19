import React from "react"

export const AppLoader = () => {

    return (
        <>
            <div className="app-loader-container">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <p className="loading">Loading</p>
            </div>
        </>
    )
}