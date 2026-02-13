import React from 'react'
import Sidebar from '../Shared/SideBar'
import { darkThemeColor } from '../DarkLiteMood/ThemeProvider'
import DeshboardNavbar from './DeshboardNavbar'

const Expense = () => {
    return (
        <div className={`${darkThemeColor} flex min-h-screen md:ml-72 bg-gray-50 dark:bg-gray-900`}>
            <Sidebar />
            <div className='flex-1 overflow-x-hidden'>
                <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                    <DeshboardNavbar 
                        title="Expense Management" 
                        subtitle="Here you can manage and track your expenses." 
                    />
                    
                    {/* Example of an expense list or form */}
                    <div className='mt-6'>
                        {/* <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                            Add New Expense
                        </button> */}
                        {/* You can replace this with dynamic content like an expense list */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Expense
