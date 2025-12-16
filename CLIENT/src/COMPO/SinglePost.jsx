import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const SinglePost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err))
    }, [id])

    const handleDownload = async () => {
        const res = await fetch(post.image)
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${post.title || "image"}.jpg`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    }


    if (!post) return <div className="min-h-screen flex justify-center items-center bg-[#020617] text-slate-400">Loading...</div>

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4  bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] overflow-hidden">
            <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg border border-white/20 hover:border-white/40 text-sm font-semibold text-slate-300 hover:text-white transition bg-black/40 backdrop-blur-md">← Back</button>
            <div className="relative w-full max-w-6xl mt-4 h-[85vh] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] flex flex-col">
                <div className="flex-1 flex items-center justify-center px-6">
                    <div className="relative max-h-full max-w-full">
                        <img src={post.image} className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-25" />
                        <img src={post.image} className="relative max-h-[65vh] max-w-full object-contain rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] ring-1 ring-white/10" />
                    </div>
                </div>
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/40 backdrop-blur-lg">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold tracking-wide capitalize text-white">{post.title}</h1>
                        <p className="text-sm text-slate-400 mt-1 capitalize">Posted by: {post.user?.username || "Unknown"}</p>
                    </div>
                    <button onClick={handleDownload} className="px-3 py-2 text-sm font-medium rounded-xl border border-white/10 hover:border-white/30 text-sm font-medium text-slate-200 hover:text-white transition backdrop-blur-md">Download</button>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
