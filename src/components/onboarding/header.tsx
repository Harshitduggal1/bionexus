import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Header = () => {
    return (
        <header className="z-50 bg-transparent dark:from-gray-900 dark:to-purple-900 shadow-lg px-6 py-8 rounded-b-3xl w-full">
            <Link href="/" className={buttonVariants({ 
                size: "sm", 
                variant: "outline", 
                className: "absolute top-6 left-6 bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-gray-100 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl rounded-full border-2 border-purple-300 dark:border-purple-600 px-6 py-3 flex items-center space-x-2 group"
            })}>
                <ArrowLeftIcon className="group-hover:text-purple-600 dark:group-hover:text-purple-300 w-5 h-5 text-purple-500 dark:text-purple-400 transition-colors duration-300" />
                <span className="group-hover:from-indigo-500 group-hover:to-purple-500 bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-bold text-transparent transition-all duration-300">Home</span>
            </Link>
            <div className="flex flex-col items-center w-full">
                <h2 className="bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 font-extrabold text-4xl text-transparent md:text-5xl animate-gradient-x">
                    Complete your profile
                </h2>
                <p className="mt-4 font-medium text-gray-700 text-lg md:text-xl dark:text-gray-300 tracking-wide">
                    Please provide the following information
                </p>
            </div>
        </header>
    )
};

export default Header
