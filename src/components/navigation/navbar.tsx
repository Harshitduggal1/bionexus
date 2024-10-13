import { User } from "@clerk/nextjs/server";
import Link from "next/link";
import Icons from "../global/icons";
import MaxWidthWrapper from "../global/max-width-wrapper";
import { buttonVariants } from "../ui/button";
import UserAccount from "../user-account";

interface Props {
  user: User | null;
}

const Navbar = ({ user }: Props) => {
  return (
    <header className="top-0 z-50 sticky inset-x-0 bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 backdrop-blur-md border-b border-border/40 w-full h-14 shadow-lg">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity duration-200">
              <Icons.logo className="w-8 h-8 animate-pulse" />
              <span className="bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 font-extrabold text-4xl text-transparent animate-gradient">
                BioNexus
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className={`${buttonVariants({ size: "sm" })} bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg`}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-100">
                    Dashboard
                  </span>
                </Link>
                <UserAccount />
              </>
            ) : (
              <>
                <Link href="/auth/signin" className={`${buttonVariants({ size: "sm", variant: "ghost" })} bg-gradient-to-r from-transparent via-purple-400/10 to-transparent hover:from-purple-400/20 hover:via-pink-400/20 hover:to-indigo-400/20 text-gray-700 hover:text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 border border-gray-300 hover:border-transparent`}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
                    Login
                  </span>
                </Link>
                <Link href="/auth/signup" className={`${buttonVariants({ size: "sm" })} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg`}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-100 to-indigo-100 animate-gradient-x">
                    Start for free
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
