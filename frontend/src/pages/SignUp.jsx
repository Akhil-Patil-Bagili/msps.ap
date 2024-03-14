import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BottomWarning } from '../components/BottomWarning';
import { LongButton } from '../components/LongButton';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';
import { LandingBar } from '../components/LandingBar';

export const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', {
                first_name: firstName ,
                last_name: lastName,
                username,
                password
            });
            localStorage.setItem('token', response.data.access_token);
            navigate('/home');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return <div>
        <LandingBar />
        <div className="bg-slate-200 h-screen flex justify-center" onKeyDown={handleKeyPress}>
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign up" />
                    <SubHeading label="Enter your information to create an account" />
                    <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label="First Name" />
                    <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label="Last Name" />
                    <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="johndoe@gmail.com" label="Email" />
                    <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="john@12345" label="Password" />
                    <div className="pt-4">
                        <LongButton onClick={handleSubmit} label="Sign up" />
                    </div>
                    <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
                </div>
            </div>
        </div>
    </div>
};
