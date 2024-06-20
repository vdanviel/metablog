function Mark({ size, fontsize, bgcolorhex }) {
    return (
        <div style={{background: bgcolorhex, width: size}} className={`flex rounded-[32px] items-center justify-center`}>
            <svg 
                width="20%"
                className="text-blue-500 bg transparent" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <p style={{'font-size': fontsize}}>metaBlog</p>
        </div>
    );
}

export {Mark};
