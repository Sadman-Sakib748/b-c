import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res => {
            console.log(res.user)
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/')
            })
        })

    }
    return (
        <div className='p-6'>
            <div className='divider'></div>
            <div>
                <button onClick={handleGoogleSignIn} className='btn'>
                    <FaGoogle className='mr-4'></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;