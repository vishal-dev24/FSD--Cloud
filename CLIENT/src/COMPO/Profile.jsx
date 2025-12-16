import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:3000/profile', { withCredentials: true })
            setUser(res.data)
            setPosts(res.data.posts)
        } catch {
            setUser(null)
            navigate('/login')
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleDelete = async (postId) => {
        await axios.delete(`http://localhost:3000/delete/${postId}`, { withCredentials: true });
        setPosts(posts.filter(post => post._id !== postId))
    };

    const handleLogout = async () => {
        await axios.get('http://localhost:3000/logout', { withCredentials: true })
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] p-4 sm:p-6 text-gray-100">
            <div className="w-full max-w-md mt-6 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {user && (
                        <>
                            <div className="w-full sm:w-1/3 flex justify-center">
                                <img src={user.image} className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-violet-600/60 shadow-[0_0_25px_rgba(139,92,246,0.6)]" />
                            </div>
                            <div className="w-full sm:w-2/3 flex flex-col gap-1  text-center sm:text-left">
                                <h1 className="text-xl sm:text-2xl font-bold capitalize tracking-wide">{user.username}</h1>
                                <h2 className="text-sm sm:text-base text-slate-400 capitalize  break-all">{user.email}</h2>
                                <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                                    <button onClick={() => navigate("/addtask")} className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-sm font-semibold text-slate-300 hover:text-white transition">Add Post</button>
                                    <button onClick={handleLogout} className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/5 hover:bg-red-500/15 text-sm font-semibold text-red-400 hover:text-red-300 transition">Logout</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="w-full max-w-6xl mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.7)] overflow-hidden isolate">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 tracking-wide">Your Posts</h2>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2 px-1">
                    {posts.map((post) => (
                        <div key={post._id} className="break-inside-avoid rounded-2xl overflow-hidden bg-slate-900/90 border border-white/10 shadow-md relative group transition-transform duration-300 hover:-translate-y-1 hover:ring-1 hover:ring-white/20">

                            <img src={post.image} onClick={() => navigate(`/post/${post._id}`)} className="w-full max-h-[420px] object-cover cursor-pointer transition-transform duration-300 group-hover:scale-[1.03]" />
                            <div className="p-3 bg-gradient-to-t from-black/60 to-transparent">
                                <h3 className="text-sm font-semibold capitalize truncate">{post.title}</h3>
                            </div>
                            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(post._id) }} className="w-9 h-9 rounded-full bg-black/40 hover:bg-red-500/20 border border-white/10 flex items-center justify-center backdrop-blur-md transition">
                                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='white' opacity='0.8' viewBox='0 0 24 24'><path d='M9 3h6l1 2h5v2H3V5h5l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z'/></svg>" className="w-4 h-4" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); navigate(`/update/${post._id}`) }} className="w-9 h-9 rounded-full bg-black/40 hover:bg-white/20 border border-white/10 flex items-center justify-center backdrop-blur-md transition">
                                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='white' opacity='0.8' viewBox='0 0 24 24'><path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5c0-.4-.15-.78-.44-1.06l-2.25-2.25a1.5 1.5 0 00-2.12 0l-1.83 1.83 3.75 3.75 1.83-1.83c.29-.28.44-.66.44-1.06z'/></svg>" className="w-4 h-4" />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Profile