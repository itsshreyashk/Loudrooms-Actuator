import React, { useEffect, useRef, useState } from "react";


import { HomeNav } from "../warehouse/nav";
const Home: React.FC = () => {
    document.title = "Home";
    const status: any = localStorage.getItem('statusLOUDROOMS');
    const sessionID: any = localStorage.getItem("sessionIDLOUDROOMS");
    useEffect(() => {
        console.log(status);
        console.log(sessionID);
        return () => {
        }
    }, [])

    return (<>
        <HomeNav status={status} />
        <div className="w-screen flex justify-center h-screen bg-gray-100 p-20">
            <div className="w-2/3 min-w-[300px] border h-[max-content] px-4 py-2 rounded-xl">
                <div className="px-4 py-2 space-x-4">
                    <label htmlFor="roomcode" className="text-sm">Roomcode</label>
                    <input type="text" name="roomcode" className="px-4 py-2 rounded-xl outline-none border" />
                </div>
                <div className="text-end space-x-1">
                    <button type="button" className="bg-green-500 px-4 py-2 text-sm text-gray-100 rounded-xl font-bold hover:bg-green-300 active:bg-green-800 border">
                        Create New Server
                    </button>
                    <button type="button" className="bg-gray-100 px-4 py-2 text-sm text-gray-500 rounded-xl font-bold hover:bg-green-300 active:bg-green-800 border">
                        Join a Server
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default Home;