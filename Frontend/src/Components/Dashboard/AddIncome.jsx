import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { toast } from "sonner";
import { HandleMessageUIError, HandleMessageUISuccess } from "../DarkLiteMood/ThemeProvider";
import { X } from "lucide-react";
import CategorySelector from "./CategorySelector";
import { useAddIncomeMutation } from "@/redux/api/incomeApi";

const AddIncome = ({ onClose }) => {
    const [formData, setFormData] = useState({
        amount: "",
        date: "",
        category: "",
        description: "",
        paymentMethod: "Cash",
    });
    const dispatch = useDispatch();
    const [addIncome, { isLoading }] = useAddIncomeMutation();

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        
        try {
            dispatch(setLoading(true));
            const result = await addIncome(formData).unwrap();
            
            if (result.success) {
                toast.success(result.message, HandleMessageUISuccess());
                setFormData({
                    amount: "",
                    date: "",
                    category: "",
                    description: "",
                    paymentMethod: "Cash",
                });
                if (onClose) onClose();
            }
        } catch (error) {
            console.error("Error adding income:", error);
            toast.error(error?.data?.message || "Error adding income", HandleMessageUIError());
        } finally {
            dispatch(setLoading(false));
        }
    };

    const LabelStyle = "block font-semibold text-gray-700 dark:text-gray-300";
    const InputStyle =
        "w-full p-2 border focus:ring focus:ring-[#257c8a] dark:bg-gray-700 dark:text-white rounded-md transition";

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-800 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Add Income
                </h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                <AddComponent
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    LabelStyle={LabelStyle}
                    InputStyle={InputStyle}
                    required={true}
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

                <div>
                    <label className={LabelStyle}>Payment Method:</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className={InputStyle}
                    >
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className={LabelStyle}>Category:</label>
                    <CategorySelector
                        type="Income"
                        value={formData.category}
                        onChange={(value) => setFormData({ ...formData, category: value })}
                    />
                </div>

                <AddComponent
                    label="Description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    LabelStyle={LabelStyle}
                    InputStyle={`${InputStyle} h-20`}
                    required={true}
                />

                <button
                    type="submit"
                    className="w-full bg-[#14B8A6] hover:bg-[#0d9488] text-white font-bold py-3 rounded-lg transition mt-6"
                >
                    {isLoading ? "Adding..." : "Add Income"}
                </button>
            </form>
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
}) => {
    return (
        <div>
            <label className={LabelStyle}>{label}:</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={InputStyle}
                required={required}
            />
        </div>
    );
};

export { AddIncome, AddComponent };









// import React, { useState } from "react";
// import Sidebar from "../Shared/SideBar";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setLoading } from "@/redux/authSlice";
// import axios from "axios";
// import { INCOME_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";

// const AddIncome = () => {



//   return (

//     <div className="dark:bg-gray-700 h-screen flex flex-row ">
//       <div className="">
//         <Sidebar />



//       </div>
//       <div className="h-full w-full dark:bg-gray-700 justify-center content-center">
//         <div className="dark:bg-gray-700  flex flex-row justify-center">
//           <div className="w-full lg:w-1/2 p-4 bg-gray-800  rounded-xl xl:rounded-l-xl xl:rounded-r-none ">
//             <form action="">

//               <div style={{ marginBottom: "10px" }}>
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   name="email"


//                   required
//                   style={{ width: "100%", padding: "8px" }}
//                 />
//               </div>



//             </form>
//           </div>
//           <div className="hidden xl:flex  ">
//             <img
//               src="/images/Income4.png"
//               alt="Income"
//               className="max-w-128 h-full w-full rounded-r-xl"
//             />
//           </div>
//         </div>

//       </div>

//     </div>


//   );
// };


// export { AddIncome };
