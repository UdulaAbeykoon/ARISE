"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Profile {
    id: string
    email: string
    full_name: string | null
    avatar_url: string | null
    provider: string | null
    created_at: string
    updated_at: string
}

export default function AccountPage() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [authLoading, setAuthLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [authMode, setAuthMode] = useState<"login" | "signup">("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")

    const supabase = createClient()

    const fetchProfile = async (userId: string) => {
        try {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (data) {
                setProfile(data as Profile)
            }
        } catch {
            // profiles table might not exist yet — that's ok
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        if (params.get('error') === 'auth_failed') {
            setError("Authentication failed. Please try again.")
        }

        // Use getSession (local/fast) instead of getUser (network call)
        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                const currentUser = session?.user ?? null
                setUser(currentUser)
                if (currentUser) {
                    // Fetch profile in background, don't block
                    fetchProfile(currentUser.id)
                }
            } catch (err) {
                console.error('Auth init error:', err)
            }
            setLoading(false)
        }

        initAuth()

        // Safety timeout — never stay stuck on loading
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 3000)

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)
            if (currentUser) {
                fetchProfile(currentUser.id)
            } else {
                setProfile(null)
            }
        })

        return () => {
            clearTimeout(timeout)
            subscription.unsubscribe()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGoogleLogin = async () => {
        setAuthLoading(true)
        setError(null)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) {
            setError(error.message)
            setAuthLoading(false)
        }
    }

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthLoading(true)
        setError(null)

        try {
            if (authMode === "signup") {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName || email.split('@')[0],
                        },
                    },
                })
                if (error) {
                    setError(error.message)
                    setAuthLoading(false)
                    return
                }
                if (data.user) {
                    setUser(data.user)
                    // Upsert profile for email signups (don't block on this)
                    supabase.from('profiles').upsert({
                        id: data.user.id,
                        email: data.user.email,
                        full_name: fullName || email.split('@')[0],
                        provider: 'email',
                        updated_at: new Date().toISOString(),
                    }, { onConflict: 'id' }).then(() => fetchProfile(data.user!.id))
                }
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) {
                    setError(error.message)
                    setAuthLoading(false)
                    return
                }
                if (data.user) {
                    setUser(data.user)
                    fetchProfile(data.user.id)
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        }

        setAuthLoading(false)
        setEmail("")
        setPassword("")
        setFullName("")
    }

    const handleSignOut = async () => {
        setAuthLoading(true)
        try {
            await supabase.auth.signOut()
        } catch {
            // ignore
        }
        setUser(null)
        setProfile(null)
        setAuthLoading(false)
    }

    // Loading state
    if (loading) {
        return (
            <div className="relative min-h-screen w-full flex items-center justify-center p-4">
                <div className="absolute inset-0 z-0">
                    <Image src="/accountbg.png" alt="Main Background" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                </div>
                <Link href="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    <span className="text-sm font-medium">Home</span>
                </Link>
                <div className="relative z-10 text-white text-xl font-medium animate-pulse">Loading...</div>
            </div>
        )
    }

    // Signed in — show profile
    if (user) {
        const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url
        const displayName = profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || "User"
        const userEmail = profile?.email || user.email
        const memberSince = profile?.created_at
            ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : null

        return (
            <div className="relative min-h-screen w-full flex items-center justify-center p-4">
                <div className="absolute inset-0 z-0">
                    <Image src="/accountbg.png" alt="Main Background" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                </div>
                <Link href="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    <span className="text-sm font-medium">Home</span>
                </Link>

                <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden p-8 lg:p-12">
                    <div className="text-center">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={displayName}
                                width={96}
                                height={96}
                                className="rounded-full mx-auto mb-6 border-4 border-gray-100 dark:border-gray-800"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-gray-100 dark:border-gray-800 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-3xl font-bold">
                                    {displayName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {displayName}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-2">
                            {userEmail}
                        </p>
                        {memberSince && (
                            <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
                                Member since {memberSince}
                            </p>
                        )}
                        {!memberSince && <div className="mb-8" />}

                        <a
                            href="https://arisewebgl.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-[#1a1a1a] dark:bg-white text-white dark:text-black font-semibold py-3.5 rounded-lg hover:opacity-90 transition-opacity text-center mb-4"
                        >
                            Launch ARISE
                        </a>

                        <button
                            onClick={handleSignOut}
                            disabled={authLoading}
                            className="w-full border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium py-3.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {authLoading ? "Signing out..." : "Sign Out"}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Not signed in — show login
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0">
                <Image src="/accountbg.png" alt="Main Background" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            </div>
            <Link href="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                <span className="text-sm font-medium">Home</span>
            </Link>

            <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:min-h-[700px]">

                {/* Left Side - Image Board */}
                <div className="w-full lg:w-1/2 relative h-64 lg:h-auto">
                    <Image src="/loginimage.png" alt="Login Visual" fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-3">Find Your Future</h2>
                        <p className="text-sm lg:text-base opacity-90 max-w-sm">
                            Master robotics from CAD to simulation in one platform.
                        </p>
                    </div>
                </div>

                {/* Right Side - Sign In */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12 xl:p-16">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {authMode === "login" ? "Welcome Back" : "Create Account"}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {authMode === "login"
                                    ? "Sign in to your account to continue"
                                    : "Sign up to get started with ARISE"}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Email & Password Form */}
                        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
                            {authMode === "signup" && (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            )}
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="submit"
                                disabled={authLoading}
                                className="w-full bg-[#1a1a1a] dark:bg-white text-white dark:text-black font-semibold py-3.5 rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                                {authLoading
                                    ? "Please wait..."
                                    : authMode === "login"
                                        ? "Sign In"
                                        : "Create Account"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                            <span className="text-sm text-gray-400">or</span>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                        </div>

                        {/* Google OAuth */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={authLoading}
                            className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-3.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#111] transition-all duration-200 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            {authLoading ? (
                                <span>Connecting...</span>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span>Continue with Google</span>
                                </>
                            )}
                        </button>

                        {/* Toggle between login and signup */}
                        <p className="mt-6 text-center text-sm text-gray-400">
                            {authMode === "login" ? (
                                <>
                                    Don&apos;t have an account?{" "}
                                    <button
                                        onClick={() => { setAuthMode("signup"); setError(null) }}
                                        className="text-blue-500 hover:text-blue-400 font-medium cursor-pointer"
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => { setAuthMode("login"); setError(null) }}
                                        className="text-blue-500 hover:text-blue-400 font-medium cursor-pointer"
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
