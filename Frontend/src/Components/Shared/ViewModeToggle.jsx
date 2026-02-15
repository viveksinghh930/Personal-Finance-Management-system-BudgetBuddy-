const ViewModeToggle = ({ viewMode, setViewMode }) => {
    return (
        <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
            <button
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === 'monthly'
                        ? 'bg-[#257c8a] text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
            >
                Monthly
            </button>
            <button
                onClick={() => setViewMode('yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === 'yearly'
                        ? 'bg-[#257c8a] text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
            >
                Yearly
            </button>
        </div>
    );
};

export default ViewModeToggle;
