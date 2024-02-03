import React, { useEffect, useRef, useState } from "react";


import Nav from "../warehouse/nav";
const Home: React.FC = () => {
    document.title = "Home";
    return (<>
        <Nav />
        <div className="w-screen h-screen text-center px-4 py-10 bg-black">
            <h1 className="text-3xl font-bold pro-1 text-white">Hello, Make something.</h1><br />
            <p className="pro-1 text-3xl font-bold text-white">Here's a quote by Elon Musk:</p>
            <blockquote className="pro-1 pro-1 text-3xl font-bold text-white">"If something is important enough, even if the odds are stacked against you, you should still do it."</blockquote>
        </div>
    </>)
}

export default Home;