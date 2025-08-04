import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-blue-200">

            <div className="w-full sm:max-w-md mt-6 px-10 py-16 bg-white shadow-md overflow-hidden rounded-xl">
                <div className='w-full'>
                    <ApplicationLogo className="w-60 fill-current text-gray-500 mx-auto" />
                </div>
                {children}
            </div>
        </div>
    );
}
