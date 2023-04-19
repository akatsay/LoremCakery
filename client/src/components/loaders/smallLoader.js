import React from "react"

export const SmallLoader = () => {

    return (
        <>
            <div className="small-loader-container">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <p className="loading">Loading</p>
            </div>
        </>
    )
}