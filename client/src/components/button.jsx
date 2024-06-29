//#3b82f6
import { useState } from 'react';

export default function Button({ content, type, txtsize, bg_color, hover_bg_color, font_color, onClick  }) {
    
    const [backgroundColor, setBackgroundColor] = useState(bg_color)

    const handleMouseEnter = () => {
      setBackgroundColor(hover_bg_color);
    };
  
    const handleMouseLeave = () => {
      setBackgroundColor(bg_color);
    };
  
    return (
      <button
        type={type}
        style={{ 
          backgroundColor: backgroundColor,
          color: font_color,
          padding: '0.75rem',
          borderRadius: '10px',
          margin: '0.75rem',
          fontWeight: 'bold',
          fontSize: txtsize
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick }
      >
        {content}
      </button>
    );
  }