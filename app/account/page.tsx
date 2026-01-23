"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function AccountPage() {
    // Mode state: 'login' or 'register'
    const [mode, setMode] = useState<'login' | 'register'>('login')

    // Form states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    // UI states
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState<string | null>(null)
    const [resendSuccess, setResendSuccess] = useState<string | null>(null)

    const handleGoogleLogin = async () => {
        setLoading(true)
        setLoginError(null)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) {
            console.error(error)
            if (error.message === "Failed to fetch") {
                setLoginError("Connection unavailable. If on Vercel, ensure Supabase Environment Variables are set.")
            } else {
                setLoginError("Error logging in with Google")
            }
        }
        setLoading(false)
    }

    const handleResendVerification = async () => {
        setLoading(true)
        setResendSuccess(null)
        setLoginError(null)

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email.trim(),
        })

        if (error) {
            if (error.message === "Failed to fetch") {
                setLoginError("Connection failed. Check Supabase configuration.")
            } else {
                setLoginError(error.message)
            }
        } else {
            setResendSuccess("Verification email sent.")
        }
        setLoading(false)
    }

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setLoginError(null)
        setResendSuccess(null)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        })

        if (error) {
            console.error(error)
            // Check for specific "Email not confirmed" error message or status if available
            if (error.message.includes("Email not confirmed") || error.message.toLowerCase().includes("email not confirmed")) {
                setLoginError("Email not confirmed") // Controlled message for UI logic
            } else if (error.message === "Failed to fetch") {
                setLoginError("Connection Error: Unable to reach Supabase. If you are seeing this on Vercel, you likely need to add your NEXT_PUBLIC_SUPABASE_URL and NON_KEY to the Vercel Project Settings.")
            } else {
                setLoginError(error.message)
            }
        } else if (data.session) {
            // Login successful
            window.location.href = "https://arisewebgl.vercel.app/"
        }
        setLoading(false)
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError(null)

        if (password !== confirmPassword) {
            setLoginError("Passwords do not match!")
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                }
            }
        })

        if (error) {
            console.error(error)
            if (error.message === "Failed to fetch") {
                setLoginError("Connection Error: Unable to reach Supabase. Please ensure your project environment variables (NEXT_PUBLIC_SUPABASE_URL) are correctly configured in Vercel.")
            } else {
                setLoginError(error.message)
            }
            setLoading(false)
        } else {
            // Successfully signed up (session or no session). 
            // Treat as logged in/success and redirect immediately.
            window.location.href = "https://arisewebgl.vercel.app/"
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4">
            {/* Full Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/accountbg.png"
                    alt="Main Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Optional dark overlay to help the card pop if the bg is too bright */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            </div>

            {/* Centered Card */}
            <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:min-h-[700px]">

                {/* Left Side - Image Board */}
                <div className="w-full lg:w-1/2 relative h-64 lg:h-auto">
                    <Image
                        src="/loginimage.png"
                        alt="Login Visual"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-3">Find Your Future</h2>
                        <p className="text-sm lg:text-base opacity-90 max-w-sm">
                            Master robotics from CAD to simulation in one platform.
                        </p>
                        <div className="flex gap-2 mt-4">
                            <div className="h-1.5 w-8 bg-white rounded-full"></div>
                            <div className="h-1.5 w-2 bg-white/50 rounded-full"></div>
                            <div className="h-1.5 w-2 bg-white/50 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12 xl:p-16">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {mode === 'login' ? 'Welcome To ARISE' : 'Create Account'}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {mode === 'login' ? 'Sign in your account' : 'Join ARISE for free'}
                            </p>
                        </div>

                        <form onSubmit={mode === 'login' ? handleEmailLogin : handleSignUp} className="space-y-4">

                            {/* Registration Fields */}
                            {mode === 'register' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="John"
                                            required={mode === 'register'}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Doe"
                                            required={mode === 'register'}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="**********"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            {mode === 'register' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="**********"
                                            required={mode === 'register'}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Verification Resend & Error Messages */}
                            {loginError && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                                    {loginError === "Email not confirmed" ? (
                                        <div className="flex flex-col gap-2">
                                            <span>Please verify your email or use Google sign-in.</span>
                                            <button
                                                type="button"
                                                onClick={handleResendVerification}
                                                className="text-blue-600 dark:text-blue-400 hover:underline text-left font-medium"
                                            >
                                                Resend verification email
                                            </button>
                                        </div>
                                    ) : (
                                        loginError
                                    )}
                                </div>
                            )}

                            {resendSuccess && (
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-600 dark:text-green-400">
                                    {resendSuccess}
                                </div>
                            )}

                            {mode === 'login' && (
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-gray-600 dark:text-gray-400">Remember Me</span>
                                    </label>
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                        Forgot Password?
                                    </a>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#1a1a1a] dark:bg-white text-white dark:text-black font-semibold py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? "Loading..." : (mode === 'login' ? "Login" : "Sign Up")}
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                            <span className="text-sm text-gray-500 font-medium">
                                {mode === 'login' ? 'Instant Login' : 'Or sign up with'}
                            </span>
                            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                        </div>

                        <div>
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-800 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Continue with Google</span>
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => {
                                    setMode(mode === 'login' ? 'register' : 'login')
                                    setLoginError(null)
                                }}
                                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                {mode === 'login' ? "Register" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
