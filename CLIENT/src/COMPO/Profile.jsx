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
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-4 sm:p-6 text-gray-100">
            <div className="w-full max-w-md mt-6 p-5 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {user && (
                        <>
                            <div className="w-full sm:w-1/3 flex justify-center">
                                <img src={user.image} className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-violet-500 shadow-lg" />
                            </div>
                            <div className="w-full sm:w-2/3 flex flex-col gap-1 text-center sm:text-left">
                                <h1 className="text-xl sm:text-2xl font-bold capitalize">{user.username}</h1>
                                <h2 className="text-sm sm:text-base text-slate-300 break-all">{user.email}</h2>
                                <div className="flex gap-3 mt-3 justify-center sm:justify-start">
                                    <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-violet-600 hover:bg-violet-500 transition" onClick={() => navigate("/addtask")}>Add Post</button>
                                    <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-red-600 hover:bg-red-500 transition" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="w-full max-w-6xl mt-10 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-5">Your Posts</h2>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {posts.map((post) => (
                        <div key={post._id} className="break-inside-avoid rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-700 shadow-lg relative group cursor-pointer"
                            onClick={() => navigate(`/post/${post._id}`)}>
                            <img src={post.image} className="w-full object-cover" />
                            <div className="p-3">
                                <h3 className="text-sm sm:text-base font-semibold capitalize truncate">{post.title}</h3>
                            </div>


                            {/* ICON ACTIONS */}
                            <div className="absolute inset-0 flex items-end justify-end p-2 gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition">
                                <button onClick={() => handleDelete(post._id)} className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center">
                                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'><path d='M9 3h6l1 2h5v2H3V5h5l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z'/></svg>" className="w-5 h-5" />
                                </button>
                                <button onClick={() => navigate(`/update/${post._id}`)} className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center">
                                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'><path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5c0-.4-.15-.78-.44-1.06l-2.25-2.25a1.5 1.5 0 00-2.12 0l-1.83 1.83 3.75 3.75 1.83-1.83c.29-.28.44-.66.44-1.06z'/></svg>" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >


    )
}

export default Profile