import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
interface NavProps {
    roomcode: string;
}

const HomeNav: React.FC<{ status: string }> = ({ status }) => {
    console.log(status);

    return (
        <nav className="flex w-screen backdrop-blur-xl fixed justify-between items-center px-4 py-2 border-b">
            <div className="font-bold text-gray-800">
                <span className="text-xl">Loudrooms</span>
            </div>

            <div className="flex items-center space-x-4">
                {!status && (
                    <>
                        <Link to={"/getin"}>
                            <button className="text-gray-800 active:opacity-70 text-sm">
                                Login
                            </button>
                        </Link>
                        <Link to={"/getin"}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm active:bg-blue-600">
                                Sign Up
                            </button>
                        </Link>

                    </>
                )}
                {status === 'auth' && (
                    <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm active:bg-red-600">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

const Nav: React.FC<NavProps> = ({ roomcode }) => {
    const [dialogState, setdialogState] = useState(false);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'U') {
                // Your logic for Ctrl + Shift + P combination
                setdialogState(true);
            }
        };

        // Attach the event listener to the window
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array ensures the effect runs only once during component mount

    return (<>
        <div className="w-full px-4 py-2 bg-[transparent] backdrop-blur-xl z-9 border-b fixed top-0">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    <span className="material-symbols-outlined cursor-pointer active:opacity-70" onClick={() => setdialogState(true)}>
                        more_horiz
                    </span >
                    <h1 className="text-gray-600 text-2xl cursor-pointer font-bold ml-2" id="Loudrooms">
                        Loudrooms
                    </h1>
                </div >
                <h2 className="text-blue-700 cursor-pointer font-bold">#{roomcode}</h2>
            </div >
        </div >
        <UserDialog userArray={[{ userHandle: "lolll" }]} dialogState={dialogState} setDialogState={setdialogState} />
    </>)
}

interface userDialog {
    userArray: any[];
    dialogState: boolean;
    setDialogState: any;
}

const UserDialog: React.FC<userDialog> = ({ userArray, dialogState, setDialogState }) => {
    return (
        <dialog
            open={dialogState}
            className="min-w-[300px] max-w-[600px] max-h-[80vh] mt-8 bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200 appear-1"
        >
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
                <div className="text-sm font-semibold">All Users</div>
                <div>
                    <span
                        className="material-symbols-outlined cursor-pointer p-2"
                        onClick={() => setDialogState(false)}
                    >
                        close
                    </span>
                </div>
            </div>
            {
                userArray && userArray.map((element, index) => (
                    <div key={index} className="flex items-center justify-between border-b cursor-pointer hover:bg-gray-100 transition-all">
                        <span className="px-4 py-2 text-blue-800 text-sm">@{element.userHandle}</span>
                        <div className="flex gap-2">
                            <span className={`material-symbols-outlined p-2 text-gray-500 active:opacity-70`}>
                                partner_reports
                            </span>
                            <span className={`material-symbols-outlined p-2 text-gray-500 active:opacity-70`}>
                                chat
                            </span>
                            <span className={`material-symbols-outlined p-2 text-gray-500 active:opacity-70`}>
                                alternate_email
                            </span>
                        </div>
                    </div>
                ))
            }
        </dialog>
    );
}

const Redr: React.FC = () => {
    useEffect(() => {
        location.href = "/getin"
        return () => {
        }
    }, [])
    return (<></>)
}

export { Nav, HomeNav, Redr };