import React, { useState, useEffect } from "react";
import { HomeNav } from "../warehouse/nav";
import { useParams } from "react-router-dom";
const PubProfile: React.FC = () => {
    const status: any = localStorage.getItem('status');
    const { username } = useParams<{ username: string }>();

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");

    async function getData(username: string) {
        const URL: string = "http://localhost:3001/get/user";
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const RealData: any = await response.json();
            setName(RealData.username);
            setAge(RealData.age);
            setGender(RealData.gender);
            return true;
        } catch (error) {
            console.error('Error fetching data:', error);
            return false;
        }
    }
    
    useEffect(() => {
        if (username) {
            getData(username);
        }
        return () => {
        }
    }, [username])

    return (<>
        <HomeNav status={status} />
        <div className="w-full flex justify-center pt-20">
            <div className="max-w-[500px] mx-2 w-full bg-gray-300 rounded-xl px-4 py-2">
                <div className="flex space-x-1">
                    <label htmlFor="username" className="font-bold text-sm">Username</label>
                    <span id="username" className="text-sm">{name}</span>
                </div>
                <div className="flex space-x-1">
                    <label htmlFor="age" className="font-bold text-sm">Age</label>
                    <span id="age" className="text-sm">{age}</span>
                </div>
                <div className="flex space-x-1">
                    <label htmlFor="gender" className="font-bold text-sm">Gender</label>
                    <span id="gender" className="text-sm">{gender}</span>
                </div>
            </div>
        </div>
    </>)
}
export default PubProfile;