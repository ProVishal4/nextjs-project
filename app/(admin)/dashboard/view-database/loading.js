export default function Loading() {
    return (
        // <div className="flex min-h-screen items-center justify-center bg-white px-6">
        //     <div className="w-full max-w-md space-y-4">
        //         <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
        //         <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
        //         <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
        //     </div>
        // </div>
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>

                {/* Text */}
                <p className="text-sm text-gray-500">Loading content...</p>
            </div>
        </div>
    );

}