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
        <header className="top-0 z-50 sticky inset-x-0 bg-background/50 backdrop-blur-md border-b border-border/40 w-full h-14">
            <MaxWidthWrapper>
                <div className="flex justify-between items-center w-full h-full">
                    <div className="flex">
                        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                            <Icons.logo className="w-8 h-8" />
                            <span className="bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 font-extrabold text-4xl text-transparent">
                            BioNexus
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
                                    Dashboard
                                </Link>
                                <UserAccount />
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Login
                                </Link>
                                <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
                                    Start for free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    )
};

export default Navbar
