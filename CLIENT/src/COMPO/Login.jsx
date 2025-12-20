import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '', })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('https://fsd-cloud.onrender.com/login', formData, { withCredentials: true });
        if (res.status === 200) {
            setFormData({ email: '', password: '' });
            navigate('/profile');  // only on success
        } else {
            alert("Login failed");
        }
    }


    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] p-4 sm:p-6 text-gray-100">
            <div className="w-full max-w-md mt-16 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10">
                <h1 className='text-2xl sm:text-3xl font-bold text-center tracking-wide'>Welcome Back</h1>
                <p className='text-sm text-slate-300 text-center mb-5'>Login to continue</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input className='px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-400 font-medium bg-slate-800/80 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none border border-slate-600 rounded-xl w-full transition' onChange={handleChange} value={formData.email} type='email' name='email' placeholder='Email address' required />
                    <input className='px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-400 font-medium bg-slate-800/80 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none border border-slate-600 rounded-xl w-full transition' onChange={handleChange} value={formData.password} type='password' name='password' placeholder='Password' required />
                    <button className='mt-2 py-2.5 text-base sm:text-lg font-semibold rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition w-full'>Login</button>
                    <p onClick={() => navigate('/')} className='text-center text-sm sm:text-base text-slate-300 cursor-pointer hover:text-violet-400 mt-3'>New here? Create an account</p>
                </form>
            </div>
        </div>

    )
}

export default Login