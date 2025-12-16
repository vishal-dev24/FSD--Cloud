import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ title: '', image: null, })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/getPost/${id}`)
            .then(({ data }) => setFormData({ title: data.title, image: data.image || null }))
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title)
        data.append('image', formData.image)
        await axios.put(`http://localhost:3000/update/${id}`, data, { withCredentials: true })
        setFormData({ title: '', image: null, })
        navigate('/profile')
    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] p-4 sm:p-6 text-gray-100">
            <div className="w-full max-w-md mt-16 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10">
                <button onClick={() => navigate("/profile")} className='flex items-center gap-2 text-slate-300 hover:text-violet-400 transition mb-5'>
                    <span className='text-sm font-semibold px-3 py-1 rounded-lg border border-slate-500 hover:border-violet-500'>← Back</span>
                </button>
                <h1 className='text-2xl sm:text-3xl text-center font-bold mb-1'>Update Post</h1>
                <p className='text-sm text-slate-300 text-center mb-6'>Modify title or replace image</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input className='px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-400 font-medium bg-slate-800/80 focus:ring-2 focus:ring-violet-500 focus:outline-none border border-slate-600 rounded-xl w-full transition' onChange={handleChange} value={formData.title} type='text' name='title' placeholder='Post title' required />
                    <input className='text-sm font-medium text-slate-200 bg-slate-800/80 rounded-xl border border-slate-600 w-full file:mr-3 file:px-4 file:py-2.5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-500 transition' onChange={handleChange} type='file' name='image' />
                    <button className='mt-2 py-2.5 text-base sm:text-lg font-semibold rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition w-full' type='submit'>Update</button>
                </form>
            </div>
        </div>

    )
}

export default Update
