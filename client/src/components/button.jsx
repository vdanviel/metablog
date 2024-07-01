import { useState } from 'react';

export default function Button({ activate, content, type, bg_color, hover_bg_color, font_color, onClick }) {
    const [backgroundColor, setBackgroundColor] = useState(bg_color);

    const handleMouseEnter = () => {
        setBackgroundColor(hover_bg_color);
    };

    const handleMouseLeave = () => {
        setBackgroundColor(bg_color);
    };

    return (
        <button
            disabled={!activate}
            type={type}
            style={{ 
                backgroundColor: backgroundColor,
                color: font_color,
                padding: '0.75rem 1.5rem', // px-6 py-2
                fontSize: '0.875rem', // text-sm
                fontWeight: '500', // font-medium
                letterSpacing: '0.05em', // tracking-wide
                textTransform: 'capitalize', // capitalize
                transition: 'background-color 0.3s, transform 0.3s', // transition-colors duration-300 transform
                borderRadius: '0.5rem', // rounded-lg
                outline: 'none', // focus:outline-none
                margin: '0.75rem' // additional style from original
            }}
            className="hover:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50" // hover and focus styles
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {content}
        </button>
    );
}
