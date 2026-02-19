import React, { useEffect, useState } from "react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { setLoading, setUser } from "@/redux/authSlice";
import { GOOGLE_CLIENT_ID } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { darkThemeColor, HandleMessageUIError, HandleMessageUISuccess } from "../DarkLiteMood/ThemeProvider";
import { useLoginMutation } from "@/redux/api/userApi";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState({ email: "", password: "" });

    const { loading, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login] = useLoginMutation();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.email || !input.password) {
            toast.error("Please fill in all fields.", HandleMessageUIError());
            return;
        }
        try {
            dispatch(setLoading(true));
            const result = await login(input).unwrap();
            if (result.success) {
                dispatch(setUser(result.user));
                toast.success(result.message, HandleMessageUISuccess());
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error?.data?.message || "Login failed", HandleMessageUIError());
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            dispatch(setLoading(true));
            const result = await login({ googleToken: response.credential }).unwrap();
            if (result.success) {
                dispatch(setUser(result.user));
                toast.success(result.message, HandleMessageUISuccess());
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error?.data?.message || "Google login failed", HandleMessageUIError());
        } finally {
            dispatch(setLoading(false));
        }
    };
    const handleGoogleError = (error) => {
        console.log("Google Login Error", error);
        toast.error("Google login failed", HandleMessageUIError());
    };
    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user, navigate]);

    return (
        <>
            <div className={`${darkThemeColor} flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 sm:px-6`}>
                <Card className={`${darkThemeColor} w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl dark:shadow-gray-900 dark:hover:shadow-gray-950 bg-white`}>
                    
                    <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                        <div className="mb-6">
                            <NavLink to={`/`}>
                                <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#257c8a] text-white font-medium shadow-md hover:bg-[#2a8e9e] hover:shadow-lg transition duration-300 ease-in-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#257c8a] focus:ring-offset-2 text-sm">
                                    <FaArrowLeft /> Go Back
                                </button>
                            </NavLink>
                        </div>

                        <h1 className={`${darkThemeColor} text-2xl md:text-3xl font-bold text-gray-800`}>
                            Log in to your Account
                        </h1>
                        <p className={`${darkThemeColor} text-sm md:text-base text-gray-600 mt-2`}>
                            Welcome back! Choose a login method
                        </p>

                        {/* Google Button Centered */}
                        <div className="flex justify-center mt-8 w-full">
                            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
                            </GoogleOAuthProvider>
                        </div>

                        {/* Line Design Added Here */}
                        <div className="relative flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-sm font-bold uppercase">or email</span>
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                        </div>

                        <form className="space-y-4" onSubmit={submitHandler}>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="Enter your email"
                                className="w-full border-gray-300 text-sm md:text-base h-11"
                            />

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your password"
                                    className="w-full border-gray-300 text-sm md:text-base h-11"
                                />
                                <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-xs sm:text-sm md:text-base dark:text-gray-300 text-gray-600 cursor-pointer">
                                    <Checkbox id="remember" />
                                    Remember me
                                </label>
                                <a href="#" className="text-xs sm:text-sm text-[#2a99aa] hover:underline">
                                    Forgot Password?
                                </a>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full bg-[#257c8a] text-white hover:bg-[#2a8e9e] text-sm md:text-base h-11">
                                {loading ? <div className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Please wait...</div> : "Login"}
                            </Button>
                        </form>

                        <p className="text-center text-sm dark:text-gray-300 text-gray-600 mt-6">
                            Don’t have an account? <Link to="/register" className="text-[#2a99aa] font-bold hover:underline">Register</Link>
                        </p>
                    </div>

                    <div className="hidden md:flex w-1/2 bg-[#257c8a] p-10 flex-col justify-center items-center text-white">
                        <div className="w-40 h-40 lg:w-48 lg:h-48 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <img src="/images/BudgetBuddyLogo.jpg" alt="Logo" className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold mt-8 text-center">Connect with BudgetBuddy</h2>
                        <p className="text-sm lg:text-base text-center mt-4 opacity-90 max-w-xs">Access your account securely and manage your budget effectively.</p>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Login;