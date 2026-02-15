import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { GOOGLE_CLIENT_ID } from "@/utils/constant";
import { toast } from "sonner";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { darkThemeColor, HandleMessageUIError, HandleMessageUISuccess } from "../DarkLiteMood/ThemeProvider";
import { useRegisterMutation } from "@/redux/api/userApi";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validate = () => {
    const newErrors = {};
    if (!input.name) newErrors.name = "Name is required";
    if (!input.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!input.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!input.password) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      dispatch(setLoading(true));
      const result = await register({ fullName: input.name, email: input.email, phoneNumber: input.phoneNumber, password: input.password }).unwrap();
      if (result.success) {
        toast.success(result.message, HandleMessageUISuccess());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed", HandleMessageUIError());
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    const { name, email, sub } = decoded;
    try {
      dispatch(setLoading(true));
      const result = await register({ fullName: name, email, googleSub: sub, isGoogleUser: true }).unwrap();
      if (result.success) {
        toast.success(result.message, HandleMessageUISuccess());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Google registration failed", HandleMessageUIError());
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleError = () => toast.error("Google login failed", HandleMessageUIError());

  useEffect(() => {
    if (user) navigate("/register");
  }, [user, navigate]);

  return (
    <div className={`${darkThemeColor} flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 sm:px-6`}>
      <Card className={`${darkThemeColor} w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl dark:shadow-gray-900 dark:hover:shadow-gray-950 bg-white`}>
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <NavLink to={`/`}>
              <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#257c8a] text-white font-medium shadow-md hover:bg-[#2a8e9e] hover:shadow-lg transition duration-300 ease-in-out active:scale-95 text-sm">
                <FaArrowLeft /> Go Back
              </button>
            </NavLink>
          </div>

          <h1 className={`${darkThemeColor} text-2xl md:text-3xl font-bold text-gray-800`}>Create Your Account</h1>
          <p className={`${darkThemeColor} text-sm md:text-base text-gray-600 mt-2`}>Join us and enjoy all the benefits!</p>

          {/* Google Button Centered */}
          <div className="mt-6 flex justify-center w-full">
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            </GoogleOAuthProvider>
          </div>

          {/* Line Design Added Here */}
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm font-bold uppercase">or register with email</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          <form onSubmit={submitHandler} className="space-y-3 sm:space-y-4">
            <Input type="text" value={input.name} name="name" onChange={changeEventHandler} placeholder="Full Name" className="w-full border-gray-300 h-11" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Email" className="w-full border-gray-300 h-11" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            
            <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="Phone Number" className="w-full border-gray-300 h-11" />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} value={input.password} name="password" onChange={changeEventHandler} placeholder="Password" className="w-full border-gray-300 h-11" />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

            <Button type="submit" disabled={loading} className="w-full bg-[#257c8a] text-white hover:bg-[#2a8e9e] h-11">
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </form>

          <span className="flex justify-center text-sm dark:text-gray-300 text-gray-600 mt-4 gap-2">
            Already have an account? <Link to="/login" className="text-[#2a99aa] font-bold hover:underline">Log in</Link>
          </span>
        </div>

        <div className="hidden md:flex w-1/2 bg-[#257c8a] p-10 flex-col justify-center items-center text-white text-center">
          <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img src="/images/BudgetBuddyLogo.jpg" alt="Logo" className="w-32 h-32 rounded-full object-cover" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold mt-8">Explore New Opportunities</h2>
          <p className="text-sm lg:text-base mt-4 opacity-90 max-w-xs leading-relaxed">Join BudgetBuddy and begin your path to smarter financial management.</p>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;