import React, { useState, useEffect } from 'react';
import RenderExplore from '../components/render/render_explore.jsx';

const Explore = () => {
    const [searchParam, setSearchParam] = useState('');
    const [debouncedSearchParam, setDebouncedSearchParam] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchParam(searchParam);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchParam]);

    const handleInputChange = (e) => {
        setSearchParam(e.target.value);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center">
            <div className="w-full max-w-xl px-4 md:px-6">
                <div className="mb-8 flex items-center justify-center">
                    <div className="bg-primary flex h-20 w-20 items-center justify-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground h-10 w-10">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </div>
                </div>
                <p className="text-center text-sm md:text-lg text-gray-500 font-bold">Search for any publications or accounts by keyword!</p>
                <div className="mt-4 bg-card rounded-full px-6 py-3 shadow-lg w-full">
                    <div className="flex items-center">
                        <input
                            className="flex-1 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Search..."
                            value={searchParam}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <RenderExplore searchParam={debouncedSearchParam} />
        </div>
    );
};

export default Explore;
