// import React, { useState } from "react";
// import Sidebar from "../Shared/SideBar";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setLoading } from "@/redux/authSlice";
// import axios from "axios";
// import { INCOME_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { HandleMessageUIError, HandleMessageUISuccess } from "../DarkLiteMood/ThemeProvider";


// const AddDebt = () => {
//     const [formData, setFormData] = useState({
//         amount: "",
//         date: "",
//         category: "",
//         description: "",
//         paymentMethod: "UPI",
//     });
//     const dispatch = useDispatch();
//     const navigate = useNavigate();


//     const handleChange = async (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form Data Submitted:", formData);

//         try {
//             dispatch(setLoading(true))
//             const inputData = new FormData();
//             inputData.append("amount", formData.amount)
//             inputData.append("date", formData.date)
//             inputData.append("category", formData.category)
//             inputData.append("description", formData.description)
//             inputData.append("paymentMethod", formData.paymentMethod)
//             console.log(inputData);

//             for (let [key, value] of inputData.entries()) {
//                 console.log(key, value);

//             }
//             const response = await axios.post(`${INCOME_API_END_POINT}/addIncome`, inputData, {
//                 headers: { "Content-Type": "application/json" },
//                 withCredentials: true
//             });
//             if (response.data.success) {
//                 toast.success(response.data.message, HandleMessageUISuccess());
//             }

//         } catch (error) {
//             console.log("Network Error", error);
//             toast.error(error?.response?.data?.message, HandleMessageUIError())

//         }

//     };

//     const LabelStyle = "block font-semibold text-gray-700 dark:text-gray-300";
//     const InputStyle =
//         "w-full p-2 border focus:ring focus:ring-[#257c8a] dark:bg-gray-700 dark:text-white rounded-md transition";

//     return (

//         <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-700 px-4">

//             <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl dark:shadow-gray-900 dark:hover:shadow-gray-950 border dark:border-white">
//                 {/* Left side - Form */}
//                 <div className="w-full md:w-1/2 p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
//                         Add Income
//                     </h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <AddComponent
//                             label="Amount"
//                             type="number"
//                             name="amount"
//                             value={formData.amount}
//                             onChange={handleChange}
//                             LabelStyle={LabelStyle}
//                             InputStyle={InputStyle}
//                             required={true}
//                         />

//                         <AddComponent
//                             label="Date"
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleChange}
//                             LabelStyle={LabelStyle}
//                             InputStyle={InputStyle}
//                             required={true}
//                         />

//                         <div>
//                             <label className={LabelStyle}>Payment Method:</label>
//                             <select
//                                 name="paymentMethod"
//                                 value={formData.paymentMethod}
//                                 onChange={handleChange}
//                                 className={InputStyle}
//                             >
//                                 <option value="UPI">UPI</option>
//                                 <option value="Banking">Banking</option>
//                                 <option value="Cash">Cash</option>

//                                 <option value="Other">Other</option>

//                             </select>
//                         </div>

//                         <AddComponent
//                             label="Category"
//                             type="text"
//                             name="category"
//                             value={formData.category}
//                             onChange={handleChange}
//                             LabelStyle={LabelStyle}
//                             InputStyle={InputStyle}
//                             required={true}
//                         />

//                         <AddComponent
//                             label="Description"
//                             type="text"
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             LabelStyle={LabelStyle}
//                             InputStyle={`${InputStyle} h-20`}
//                             required={true}
//                         />

//                         <button
//                             type="submit"
//                             className="w-full bg-[#257c8a] hover:bg-[#1b5d6a] text-white font-bold p-2 rounded-sm transition"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>

//                 {/* Right side - Image */}
//                 <div className="hidden md:flex md:w-1/2 justify-center items-center bg-gray-200 dark:bg-gray-700 border dark:border-white">
//                     <img
//                         src="/images/Debt2.png"
//                         alt="Income"
//                         className="max-w-128 h-full w-full"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// const AddComponent = ({
//     label,
//     type,
//     LabelStyle,
//     name,
//     value,
//     onChange,
//     InputStyle,
//     required,
// }) => {
//     return (
//         <div>
//             <label className={LabelStyle}>{label}:</label>
//             <input
//                 type={type}
//                 name={name}
//                 value={value}
//                 onChange={onChange}
//                 className={InputStyle}
//                 required={required}
//             />
//         </div>
//     );
// };

// export { AddDebt, AddComponent };

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { INCOME_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { HandleMessageUIError, HandleMessageUISuccess } from "../DarkLiteMood/ThemeProvider";

const AddDebt = () => {
    const [formData, setFormData] = useState({
        amount: "",
        date: "",
        category: "",
        description: "",
        paymentMethod: "UPI",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            // Sending as JSON since you used "application/json" header in original code
            const response = await axios.post(`${INCOME_API_END_POINT}/addIncome`, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message, HandleMessageUISuccess());
                setFormData({ amount: "", date: "", category: "", description: "", paymentMethod: "UPI" });
            }
        } catch (error) {
            console.log("Network Error", error);
            toast.error(error?.response?.data?.message || "Something went wrong", HandleMessageUIError());
        } finally {
            dispatch(setLoading(false));
        }
    };

    const LabelStyle = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1";
    const InputStyle =
        "w-full p-2.5 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#257c8a] outline-none dark:bg-gray-700 dark:text-white rounded-md transition duration-200";

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-700 px-4 py-10">
            {/* Card Container */}
            <div className="w-full max-w-xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-2xl border dark:border-gray-700 overflow-hidden">
                
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-2">
                        Add Income
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
                        Enter your transaction details below
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <AddComponent
                                label="Amount"
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                LabelStyle={LabelStyle}
                                InputStyle={InputStyle}
                                required={true}
                                placeholder="0.00"
                            />

                            <AddComponent
                                label="Date"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                LabelStyle={LabelStyle}
                                InputStyle={InputStyle}
                                required={true}
                            />
                        </div>

                        <div>
                            <label className={LabelStyle}>Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className={InputStyle}
                            >
                                <option value="UPI">UPI</option>
                                <option value="Banking">Banking</option>
                                <option value="Cash">Cash</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <AddComponent
                            label="Category"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            LabelStyle={LabelStyle}
                            InputStyle={InputStyle}
                            required={true}
                            placeholder="e.g. Salary, Gift, Bonus"
                        />

                        <div>
                            <label className={LabelStyle}>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={`${InputStyle} h-28 resize-none`}
                                required
                                placeholder="Enter details here..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#257c8a] hover:bg-[#1b5d6a] text-white font-bold py-3 rounded-md transition duration-300 shadow-md active:scale-[0.98]"
                        >
                            Submit Transaction
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const AddComponent = ({
    label,
    type,
    LabelStyle,
    name,
    value,
    onChange,
    InputStyle,
    required,
    placeholder
}) => {
    return (
        <div>
            <label className={LabelStyle}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={InputStyle}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
};

export { AddDebt, AddComponent };