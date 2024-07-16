export default function Explore() {

    return (
        <div className="bg-background flex min-h-screen flex-col items-center justify-center" data-id="1">
            <div className="relative w-full max-w-xl px-4 md:px-6" data-id="2">
                <div className="mb-8 flex items-center justify-center" data-id="3">
                    <div className="bg-primary flex h-20 w-20 items-center justify-center rounded-full" data-id="4">
                        <svg data-id="5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary-foreground h-10 w-10">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </div>
                </div>
                <p className="text-center text-xs text"></p>
                <div className="bg-card rounded-full px-6 py-4 shadow-lg" data-id="6">
                    <div className="flex items-center" data-id="7">
                        <input className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full flex-1 rounded-md border border-none bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Search..." data-id="8" type="search" />
                    </div>
                </div>
            </div>
        </div>
    )

}