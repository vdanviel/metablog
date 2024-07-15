export default function UserNotFound() {

    return (
        <div class="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">User Not Found</h1>
            <p class="text-gray-600 mb-8">The user you are looking for does not exist.</p>
            <a href="/" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Go Back to Home</a>
        </div>
    )

}