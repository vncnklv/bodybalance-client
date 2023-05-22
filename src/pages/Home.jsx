import { useEffect } from 'react';
import image from '../assets/home.png';
import { useUser } from '../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const { isLogged } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) navigate('/dashboard');
    }, [isLogged, navigate]);

    return (
        <div className="max-w-screen-xl m-auto">
            <div className='flex flex-row justify-around'>
                <div className='self-center'>
                    <h1 className='mb-2 text-3xl font-bold text-gray-800'>Balance is not something you find, <br />it is something you create.</h1>
                    <p className='mb-8 text-gray-500'>Want to become the best version of you? <br />Want to find the balance between good and healthy life? </p>
                    <Link to={'/register'} className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold disabled:animate-pulse">START FOR FREE</Link>
                </div>
                <img src={image} alt="home" className="w-1/4" />
            </div>
        </div>
    )
}