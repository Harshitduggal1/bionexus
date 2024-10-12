"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../dashboard/sidebar";
import Icons from "../global/icons";
import { Button } from "../ui/button";
import UserAccount from "../user-account";


interface Props {
    isPro: boolean;
}

const DashboardNavbar = ({ isPro }: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className="top-0 z-50 sticky inset-x-0 bg-background backdrop-blur-md px-2 sm:px-4 border-b border-border w-full h-14">
            <div className="flex justify-between items-center mx-auto w-full h-full">
                <div className="flex items-center gap-x-2">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="sm:hidden hover:translate-y-0"
                            >
                                <MenuIcon className="w-4 h-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <Sidebar show={false} setIsOpen={setIsOpen} />
                        </SheetContent>
                    </Sheet>
                    <div className="flex justify-center items-center py-4">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <Icons.logo className="rounded-lg w-8 h-8" />
                            <span className="bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 font-extrabold text-4xl text-transparent">
                            BioNexus
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {!isPro && (
                        <Button asChild size="sm" variant="secondary">
                            <Link href="/dashboard/account/billing">
                                Upgrade
                            </Link>
                        </Button>
                    )}
                    <UserAccount />
                </div>
            </div>
        </header>
    )
};

export default DashboardNavbar
