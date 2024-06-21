//#3b82f6

export default function Button({content, type, bg_color, font_color}) {
    
    return(
        <button type={type} style={{background: bg_color, color: font_color}} className="p-3 rounded-[10px] m-3 hover:bg-[#ffffff] font-bold">
            {content}
        </button>
    );

}