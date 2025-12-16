import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!post) return <div className="min-h-screen flex justify-center items-center text-gray-300">Loading...</div>

    return (

        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-4 text-gray-100">
            <button onClick={() => navigate(-1)} className='self-start px-3 py-1 rounded-lg border border-slate-500 hover:border-violet-500 text-sm sm:text-base font-semibold text-slate-300 hover:text-violet-400 transition'>← Back</button>

            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <img src={post.image} className="w-full h-auto object-cover rounded-t-2xl" />
                <div className="p-3 flex flex-col gap-1">
                    <h1 className="text-xl sm:text-2xl font-bold">{post.title}</h1>
                    <p className="text-xs sm:text-sm text-slate-400">Posted by: {post.user?.username || "Unknown"}</p>
                </div>
            </div>
        </div>
    )
}

export default SinglePost;
