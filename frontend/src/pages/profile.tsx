import React, { useState, useEffect } from "react";
import { HomeNav } from "../warehouse/nav";
const Profile: React.FC = () => {
    const status: string = localStorage.getItem('status') ?? 'unauth';

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState<number>(0); // Initializing age as 0
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');

    const getData: any = async () => {
        try {
            const response = await fetch('http://localhost:3001/get/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sauceKey: localStorage.getItem('sauceKey'),
                    contents: ['username', 'age', 'gender', 'email', 'password'],
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setUsername(data.username)
            setPassword(data.password);
            setEmail(data.email);
            setGender(data.gender);
            setAge(data.age);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getData();

        return () => {
        }
    }, [])

    return (<>
        <HomeNav status={status} />
        <div className="px-8 pt-20 flex justify-center">
            <div className="w-full bg-gray-200 px-4 py-2 rounded-xl border max-w-[400px]">
                <div className="flex space-x-2">
                    <label htmlFor="username" className="font-bold text-sm">Username</label>
                    <span id="username" className="text-sm">{username}</span>
                </div>
                <div className="flex space-x-2">
                    <label htmlFor="password" className="font-bold text-sm">Password</label>
                    {showPassword ? (
                        <span id="password" className="text-sm">{password}</span>
                    ) : (
                        <span id="password" className="text-sm">{'*'.repeat(password.length)}</span>
                    )}
                    <button onClick={togglePasswordVisibility} className="text-sm underline focus:outline-none">Toggle</button>
                </div>
                <div className="flex space-x-2">
                    <label htmlFor="age" className="font-bold text-sm">Age</label>
                    <span id="age" className="text-sm">{age}</span>
                </div>

                <div className="flex space-x-2">
                    <label htmlFor="gender" className="font-bold text-sm">gender</label>
                    <span id="gender" className="text-sm">{gender}</span>
                </div>
                <div className="flex space-x-2">
                    <label htmlFor="email" className="font-bold text-sm">E-Mail</label>
                    <span id="email" className="text-sm">{email}</span>
                </div>
            </div>
        </div>
    </>)
}
export default Profile;