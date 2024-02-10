import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const HomeNav: React.FC<{ status: string }> = ({ status }) => {
    console.log(status);

    const [username, setUsername] = useState("");
    const removeSession: any = async (sessionKey: string) => {
        const URL: string = "http://localhost:3001/remove/sessions";
        const fetchOptions: any = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionKey: sessionKey }),
        };
        try {
            const request: any = await fetch(URL, fetchOptions);
            if (request.status === 200) {
                localStorage.setItem('sauceKey', '');
                location.href = '/getin';
            } else {
                console.log("FAIL");
            }
        } catch (err: any) {
            console.log("FAIL");
            alert("FAIL");
        }
    }
    const getData: any = async () => {
        try {
            const response = await fetch('http://localhost:3001/get/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sauceKey: localStorage.getItem('sauceKey'),
                    contents: ['username'],
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsername(data.username);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getData();
        return () => {
        }
    }, [])


    return (
        <nav className="flex w-screen backdrop-blur-xl fixed justify-between items-center px-4 py-2 border-b">
            <div className="font-bold text-gray-800">
                <Link to={'/home'}>
                    <span className="text-xl">Loudrooms</span>
                </Link>

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
                    <>
                        <Link to={'/profile'}>
                            <button
                                type="button"
                                className="px-4 py-2 border text-sm bg-gradient-to-b from-white to-gray-300 hover:from-gray-300 hover:to-gray-500 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-opacity-50"
                            >
                                {username}
                            </button>
                        </Link>

                        <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-full text-sm active:bg-red-600"
                            onClick={() => {
                                removeSession(localStorage.getItem('sauceKey'));
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};


//This is the navigation bar for all rooms that exist.
const Nav: React.FC = () => {
    const { roomKey } = useParams();
    return (<>
        <div className="w-full px-4 py-2 fixed border-b bg-black flex">
            <div className="w-full text-start px-4 pt-2">
                <button className=" active:opacity-70 cursor-pointer">
                    <span className="material-symbols-outlined text-white">
                        menu_open
                    </span>
                </button>
            </div>
            <div className="w-full text-center px-4 pt-2">
                <span className="font-bold text-white active:opacity-70 cursor-pointer">myRoomname</span>
            </div>
            <div className="w-full text-end">
                <button type="button" className="px-4 py-2 font-bold active:opacity-70 text-sm bg-red-600 text-white rounded-full">Exit</button>
            </div>
        </div>
    </>)
}

interface userDialog {
    userArray: any[];
    dialogState: boolean;
    setDialogState: any;
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