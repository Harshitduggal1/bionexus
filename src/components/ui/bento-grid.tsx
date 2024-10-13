import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib";
import { ArrowRightIcon, CalendarIcon, DnaIcon, SearchIcon, BrainIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Integrations } from "./integrations";
import { Label } from "./label";

export const CARDS = [
    {
        Icon: DnaIcon,
        name: "AI-Powered Drug Discovery",
        description: "Accelerate drug research with our cutting-edge AI algorithms.",
        href: "#",
        cta: "Explore Platform",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Card className="group-hover:scale-105 top-10 [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] left-10 absolute border border-r-0 border-border rounded-none rounded-tl-md origin-top transition-all duration-300 ease-out">
                <CardHeader>
                    <CardTitle className="bg-clip-text bg-gradient-to-r from-purple-800 to-pink-800 text-transparent">
                        AI Drug Discovery
                    </CardTitle>
                    <CardDescription className="bg-clip-text bg-gradient-to-r from-blue-800 to-purple-800 text-transparent">
                        Revolutionize pharmaceutical research with AI.
                    </CardDescription>
                </CardHeader>
                <CardContent className="-mt-4">
                    <Label className="bg-clip-text bg-gradient-to-r from-pink-800 to-purple-800 text-transparent">
                        Enter molecular structure
                    </Label>
                    <Input
                        type="text"
                        placeholder="SMILES notation..."
                        className="border-purple-500/50 focus-visible:ring-0 focus-visible:ring-transparent w-full"
                    />
                </CardContent>
            </Card>
        ),
    },
    {
        Icon: SearchIcon,
        name: "Intelligent Healthcare Data Analysis",
        description: "Uncover insights from vast medical datasets with AI-powered analytics.",
        href: "/dashboard",
        cta: "Analyze Now",
        className: "col-span-3 lg:col-span-2",
        background: (
            <Command className="top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] right-10 absolute border-indigo-500/30 p-2 border w-[70%] origin-to transition-all translate-x-0 group-hover:-translate-x-10 duration-300 ease-out">
                <Input placeholder="Search medical records..." className="border-purple-500/30" />
                <div className="mt-1 cursor-pointer">
                    <Link href="/dashboard" className="block hover:bg-indigo-900/20 px-4 py-2 rounded-md">
                        <span className="bg-clip-text bg-gradient-to-r from-blue-800 to-purple-800 text-transparent">
                            Patient Data Analysis
                        </span>
                    </Link>
                    <Link href="/dashboard" className="block hover:bg-purple-900/20 px-4 py-2 rounded-md">
                        <span className="bg-clip-text bg-gradient-to-r from-purple-800 to-pink-800 text-transparent">
                            Clinical Trial Insights
                        </span>
                    </Link>
                    <Link href="/dashboard" className="block hover:bg-green-900/20 px-4 py-2 rounded-md">
                        <span className="bg-clip-text bg-gradient-to-r from-blue-800 to-purple-800 text-transparent">
                            Genomic Sequencing Results
                        </span>
                    </Link>
                    <Link href="/dashboard" className="block hover:bg-red-900/20 px-4 py-2 rounded-md">
                        <span className="bg-clip-text bg-gradient-to-r from-pink-800 to-purple-800 text-transparent">
                            Drug Interaction Predictions
                        </span>
                    </Link>
                    <Link href="/dashboard" className="block hover:bg-yellow-900/20 px-4 py-2 rounded-md">
                        <span className="bg-clip-text bg-gradient-to-r from-purple-800 to-blue-800 text-transparent">
                            Biomarker Discovery
                        </span>
                    </Link>
                    <Link href="/dashboard" className="block hover:bg-cyan-900/20 px-4 py-2 rounded-md">
                        <span className="bg-clip-text bg-gradient-to-r from-blue-800 to-purple-800 text-transparent">
                            Personalized Treatment Plans
                        </span>
                    </Link>
                </div>
            </Command>
        ),
    },
    {
        Icon: BrainIcon,
        name: "AI-Driven Diagnostic Tools",
        description: "Enhance medical diagnoses with our advanced AI algorithms.",
        href: "/dashboard",
        cta: "Try Diagnosis",
        className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
        background: (
            <Integrations className="group-hover:scale-105 top-4 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] right-2 absolute pl-28 md:pl-0 border-none w-[600px] h-[300px] transition-all duration-300 ease-out" />
        ),
    },
    {
        Icon: CalendarIcon,
        name: "Research Timeline",
        description: "Track your drug research progress with our interactive timeline.",
        className: "col-span-3 lg:col-span-1",
        href: "/dashboard",
        cta: "View Timeline",
        background: (
            <Calendar
                mode="single"
                selected={new Date(2023, 6, 15, 0, 0, 0)}
                className="group-hover:scale-105 top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] right-0 absolute border-fuchsia-500/30 border rounded-md origin-top transition-all duration-300 ease-out"
            />
        ),
    },
];

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
}: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: any;
    description: string;
    href: string;
    cta: string;
}) => (
    <div
        key={name}
        className={cn(
            "group relative col-span-3 flex flex-col justify-between border border-indigo-500/30 overflow-hidden rounded-xl",
            "bg-transparent",
            className,
        )}
    >
        <div>{background}</div>
        <div className="z-10 flex flex-col gap-1 p-6 transition-all group-hover:-translate-y-10 duration-300 pointer-events-none">
            <Icon className="group-hover:scale-75 w-12 h-12 text-purple-400 origin-left transition-all duration-300 ease-in-out" />
            <h3 className="bg-clip-text bg-gradient-to-r from-blue-800 to-purple-800 font-semibold text-transparent text-xl">
                {name}
            </h3>
            <p className="bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700 max-w-lg text-transparent">{description}</p>
        </div>

        <div
            className={cn(
                "absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            )}
        >
            <Link href={href} className={buttonVariants({ size: "sm", variant: "ghost", className: "cursor-pointer bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800 text-white" })}>
                {cta}
                <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Link>
        </div>
        <div className="absolute inset-0 transition-all duration-300 pointer-events-none" />
    </div>
);

export { BentoCard, BentoGrid };
