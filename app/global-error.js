'use client';

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className="bg-gray-100 dark:bg-gray-900 absolute top-[50%] transform translate-[-50%,-50%] left-[50%] w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Application Error</h1>
                <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => reset()}>Reload</button>
            </body>
        </html>
    );
}