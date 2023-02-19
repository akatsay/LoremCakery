import React from "react";

export const Footer = () => {
    return(
        <footer>
            <div className="footer-block">
                <h3>Contact us:</h3>
                <p datatype="address" className="address">229 East 5th Lorem Ipsum avenue, NY, 11111</p>
                <a href="tel:228-148-8888" datatype="phone" className="foot-phone contact-link">228-148-8888</a>
                <a href="mailto:info@loremIpsumCakery.org" datatype="email" className="foot-email contact-link">info@loremIpsumCakery.org</a>
            </div>
            <div className="footer-block">
                <h3>Follow us:</h3>
                <i 
                className="fa fa-solid fa-cake-candles"
                onClick={() => {
                        window.open('https://github.com/akatsay/LoremCakery', '_blank');
                    }}
                >
                </i>
                <i className="fa fa-brands fa-instagram"></i>
                <i className="fa fa-brands fa-facebook"></i>
                <i className="fa fa-telegram" aria-hidden="true"></i>
            </div>
        </footer>
    )
}