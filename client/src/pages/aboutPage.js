import React from "react";
import {motion} from "framer-motion"

export const AboutPage = () => {
    return (
        <motion.div
            initial = {{x: "-100%", height: 0}}
            animate = {{x: 0, height: "100%", transition: {duration: 0.5, delay: 0.5}}}
            exit = {{x: "100%", height: 0, transition: {duration: 0.5}}}
        >
            <div className="page-container">
                <div className="about-page-head">
                    <img className="head-pic" src={require("../images/about-head-pic.jpg")} alt="Man making cake" />
                </div>
                <div className="story-block">
                    <h2>Our story:</h2>
                    <hr />
                    <div className="section section-1">
                        <img className="story-pic" src={require("../images/story-1.jpg")} alt="Happy Birthday Cake" />
                        <div className="story-text-block">
                            <h4 className="story-date">February 18 2022</h4>
                            <h3 className="story-title">Our cakery is open!</h3>
                            <p className="story"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Ullamcorper velit sed ullamcorper morbi tincidunt. Ut lectus arcu bibendum at. Nec dui nunc mattis enim ut tellus elementum sagittis. At consectetur lorem donec massa sapien. Facilisis volutpat est velit egestas dui id ornare arcu. Arcu ac tortor dignissim convallis aenean et. Purus in massa tempor nec. Semper auctor neque vitae tempus quam pellentesque. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Leo duis ut diam quam nulla.</p>
                        </div>
                    </div>
                    <hr />
                    <div className="section section-2">
                        <img className="story-pic" src={require("../images/story-2.jpg")} alt="Happy Birthday Cake" />
                        <div className="story-text-block">
                            <h4 className="story-date">February 25 2022</h4>
                            <h3 className="story-title">Our first event</h3>
                            <p className="story">Ornare quam viverra orci sagittis. Porttitor eget dolor morbi non arcu risus. Vestibulum rhoncus est pellentesque elit ullamcorper. Netus et malesuada fames ac. Quam adipiscing vitae proin sagittis nisl. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Purus viverra accumsan in nisl nisi scelerisque. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Non consectetur a erat nam at lectus urna. Sit amet aliquam id diam maecenas ultricies mi. Sed nisi lacus sed viverra tellus in hac habitasse platea. Tempus iaculis urna id volutpat lacus. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Turpis cursus in hac habitasse platea dictumst. Diam volutpat commodo sed egestas egestas.</p>
                        </div>
                    </div>
                    <hr />
                    <div className="section section-3">
                        <img className="story-pic" src={require("../images/story-3.jpg")} alt="Happy Birthday Cake" />
                        <div className="story-text-block">
                            <h4 className="story-date">February 18 2023</h4>
                            <h3 className="story-title">Our cakery now</h3>
                            <p className="story"> Elementum nisi quis eleifend quam adipiscing. Dui faucibus in ornare quam viverra orci. Nullam vehicula ipsum a arcu cursus vitae. Tincidunt augue interdum velit euismod in pellentesque massa placerat. Suspendisse sed nisi lacus sed viverra tellus in. Felis bibendum ut tristique et egestas quis ipsum. Et pharetra pharetra massa massa. Consectetur adipiscing elit ut aliquam purus sit amet. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Parturient montes nascetur ridiculus mus. Commodo elit at imperdiet dui accumsan. Sed sed risus pretium quam vulputate. Massa tempor nec feugiat nisl pretium fusce id. Vel pretium lectus quam id leo in vitae.</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}