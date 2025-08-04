import PrimaryButton from "@/Components/PrimaryButton";
import ApplicationLogo from "@/Components/ApplicationLogo";
export default function Authenticated({ children }) {
    return (
        <div className="min-h-screen  w-full bg-blue-200 py-20 ">
            <main className="bg-white max-w-3xl rounded-xl shadow-md m-auto px-5 py-10">
                <nav className="pt-10 pb-4 flex justify-center ">
                    <ApplicationLogo className="w-72" />
                </nav>
                {children}
            </main>
        </div>
    );
}
