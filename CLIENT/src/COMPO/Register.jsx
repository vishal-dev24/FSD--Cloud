import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', image: null });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        await axios.post('http://localhost:3000/register', data, { withCredentials: true });
        setFormData({ username: '', email: '', password: '', image: null });
        navigate('/login');
    }

    return (
        <div className='min-h-screen flex justify-center items-start bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-gray-100 pt-16 px-4'>
            <div className='w-full max-w-md mt-16 p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20'>
                <h1 className='text-2xl sm:text-3xl font-bold mb-2 text-center tracking-wide'>Create Account</h1>
                <p className='text-sm text-slate-300 text-center mb-5'>Join and start saving your ideas</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input className='px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-400 font-medium bg-slate-800/80 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none border border-slate-600 rounded-xl w-full transition' onChange={handleChange} value={formData.username} type='text' name='username' placeholder='Username' required />
                    <input className='px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-400 font-medium bg-slate-800/80 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none border border-slate-600 rounded-xl w-full transition' onChange={handleChange} value={formData.email} type='email' name='email' placeholder='Email address' required />
                    <input className='px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-400 font-medium bg-slate-800/80 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none border border-slate-600 rounded-xl w-full transition' onChange={handleChange} value={formData.password} type='password' name='password' placeholder='Password' required />
                    <input className='text-sm font-medium text-slate-200 bg-slate-800/80 rounded-xl border border-slate-600 w-full file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-500 transition' onChange={handleChange} type='file' name='image' accept='image/*' required />
                    <button className='mt-2 py-2.5 text-base sm:text-lg font-semibold rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition w-full'>Register</button>
                    <p onClick={() => navigate('/login')} className='text-center text-sm sm:text-base text-slate-300 cursor-pointer hover:text-violet-400 mt-3'>Already have an account? Login</p>
                </form>
            </div>
        </div>


    );
};
export default Register;