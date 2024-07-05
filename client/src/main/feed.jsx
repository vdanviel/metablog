export default function Feed() {
    
    return (
        <div className="container my-4 grid justify-center">
        
            <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">

                <div className="px-4 py-2">
                <div className="flex items-center gap-1 mb-3">
                    <img className="w-[30px] rounded-full object-cover" src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png" alt="profile_pic"/>
                    <p className="text-xs font-bold text-gray-800 dark:text-white">@dev</p>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus</p>
                </div>

                <img className="object-cover w-full h-48 mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" alt="NIKE AIR"/>

                <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                    <small className="text-sm text-white">11/10/2024 - 14:07</small>
                    <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Share</button>
                </div>
            </div>

        </div>
    )

}