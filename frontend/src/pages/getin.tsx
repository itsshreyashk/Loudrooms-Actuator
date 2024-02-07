import React, { useState, useEffect, useRef } from "react";

const GetIn: React.FC = () => {
    const [getState, setgetState] = useState("login");


    // Refs
    const usernameRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const passwordRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const ageRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const genderRef: React.RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
    const phoneRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const emailRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);


    interface FetchOptions {
        method: string,
        headers: any,
        body: any
    }
    async function Log(username: string, password: string) {
        /*Function to Log IN. (/user/login)*/
        const URL = "http://localhost:3001/user/login";
        const fetchOptions: FetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        };
        try {
            const Mreq = await fetch(URL, fetchOptions);
            if (Mreq.status === 200) {
                return { success: true, data: await Mreq.json() }; //This is an object returned
            } else {
                return { success: false, data: await Mreq.json() };
            }

        } catch (err: any) {
            console.log(`Fetch Request failed : ${err.message}`);
        }
    }

    async function SUP(username: string, password: string, age: number, gender: string, phone: string, email: string) {
        /*Function to Sign UP.*/
        const URL = "http://localhost:3001/user/signup";
        const fetchOptions: FetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password, age: age, gender: gender, phone: phone, email: email }),
        };
        try {
            const Mreq = await fetch(URL, fetchOptions);

            if (Mreq.status === 200) {
                return { success: true, data: await Mreq.json() }; //This is an object returned
            } else {
                return { success: false, data: await Mreq.json() };
            }
        } catch (err: any) {
            // console.log(`Fetch Request failed : ${err.message}`);
            return { success: false };
        }

    }


    const HandleAuthentication: React.MouseEventHandler<HTMLButtonElement> = async () => {
        if (getState === "signup") {
            const username: string = usernameRef.current?.value || "";
            const password: string = passwordRef.current?.value || "";
            const age: number = parseInt(ageRef.current?.value || "0", 10);
            const gender: string = genderRef.current?.value || "";
            const phone: string = phoneRef.current?.value || "";
            const email: string = emailRef.current?.value || "";

            try {
                const REQUEST: any = await SUP(username, password, age, gender, phone, email);
                console.log(REQUEST);

                if (REQUEST.success) {
                    // Request was successful
                    const mainData: any = REQUEST.data;
                    localStorage.setItem('sauceKey', mainData.sauceKey);
                    localStorage.setItem('status', 'auth');
                } else {
                    //only condition of request failed is username already exists.
                    alert("Username exists.");
                }
            } catch (err: any) {
            }
        } else {
            //handle login here.
            const username: string = usernameRef.current?.value || "";
            const password: string = passwordRef.current?.value || "";

            try {
                const REQUEST: any = await Log(username, password);

                if (REQUEST.success) {
                    // Request was successful
                    const mainData: any = REQUEST.data;
                    localStorage.setItem('sauceKey', mainData.sauceKey);
                } else {
                    //only condition of request failed is username already exists.
                    alert("Username exists.");
                }

            } catch (err: any) {
                console.log("Log IN failed.");

            }
        }
    }

    return (
        <>
            <div className="w-full flex p-1 items-center justify-center">
                <div className="bg-gray-200 p-1 rounded-xl">
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-xl text-sm ${getState === "login" ? "bg-white" : "bg-[transparent]"}`}
                        onClick={() => { setgetState("login") }}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`ml-2 px-4 py-2 rounded-xl text-sm ${getState === "signup" ? "bg-white" : "bg-[transparent]"}`}
                        onClick={() => { setgetState("signup") }}
                    >
                        Signup
                    </button>
                </div>
            </div>
            <div className="w-screen py-10 flex justify-center px-4">
                <div className="w-[300px] min-w-[300px] bg-gray-100 border rounded-xl px-4 py-2">

                    {
                        getState === "login" && (<>
                            <label htmlFor="username" className="text-sm text-gray-600">Username</label>
                            <input type="text" name="username" className="px-4 py-2 border outline-none rounded-xl w-full" ref={usernameRef} />
                            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                            <input type="text" name="password" className="px-4 py-2 border outline-none rounded-xl w-full" ref={passwordRef} />
                        </>)
                    }
                    {
                        getState === "signup" && (<>
                            <div>
                                <label htmlFor="username" className="text-sm text-gray-600">Username</label>
                                <input type="text" name="username" className="px-4 py-2 border outline-none rounded-xl w-full" ref={usernameRef} />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                                <input type="text" name="password" className="px-4 py-2 border outline-none rounded-xl w-full" ref={passwordRef} />
                            </div>
                            <div>
                                <label htmlFor="age" className="text-sm text-gray-600">Age</label>
                                <input type="number" name="age" className="px-4 py-2 border outline-none rounded-xl w-full" ref={ageRef} />
                            </div>
                            <div>
                                <label htmlFor="gender" className="text-sm text-gray-600">Gender</label>
                                <select name="gender" className="px-4 py-2 border outline-none rounded-xl w-full text-sm" ref={genderRef}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-sm text-gray-600">Phone Number</label>
                                <input type="tel" name="phone" className="px-4 py-2 border outline-none rounded-xl w-full" ref={phoneRef} />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm text-gray-600">Email</label>
                                <input type="email" name="email" className="px-4 py-2 border outline-none rounded-xl w-full" ref={emailRef} />
                            </div>

                        </>)
                    }
                    <div className="w-full p-4 justify-end flex">
                        <button className="px-4 py-2 border active:opacity-70 border-gray-800 text-sm text-gray-500 rounded-xl"
                            onClick={HandleAuthentication}
                        >Done</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetIn;