import React, { useEffect, useRef, useState } from "react";

import { Nav } from "../warehouse/nav";
const Room: React.FC = () => {
    return (<>
        <Nav />
        <div className="flex justify-center">
            <div className="h-[88vh] w-full pt-14 px-2 max-w-[1200px]">

                {/* this whole part */}
                <div className="p-1 other">
                    <span className="font-bold text-sm">Sender</span>
                    <div role="message" className="w-full px-4 py-2 max-w-[max-content] bg-gray-200 max-w-[90%] rounded-full">
                        <span className="text-sm">Hi! this is sample message sent by others.</span>
                    </div>
                </div>

            </div>
        </div>

        <div className="h-[12vh] w-full">
            <div className="w-full flex justify-center">
                <div className="flex justify-center max-w-[700px] w-full px-2">
                    <input type="text" className="px-4 py-2 w-full rounded-l-full border-t border-l border-b outline-none text-sm" placeholder="Type something..." />
                    <button type="button" className="px-4 py-2 rounded-r-full text-sm border-r border-t border-b font-bold active:opacity-70">Shout</button>
                </div>
            </div>
        </div>
    </>)
}
export default Room;