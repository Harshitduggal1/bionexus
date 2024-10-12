import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib";
import { ArrowRightIcon, CalendarIcon, Link2Icon, SearchIcon, WaypointsIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Integrations } from "./integrations";
import { Label } from "./label";

export const CARDS = [
    {
        Icon: Link2Icon,
        name: "Shorten links",
        description: "Create short links that are easy to remember and share.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Card className="group-hover:scale-105 top-10 [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] left-10 absolute border border-r-0 border-border rounded-none rounded-tl-md origin-top transition-all duration-300 ease-out">
                <CardHeader>
                    <CardTitle>
                        Create short links
                    </CardTitle>
                    <CardDescription>
                        Create short links that are easy to remember and share.
                    </CardDescription>
                </CardHeader>
                <CardContent className="-mt-4">
                    <Label>
                        Paste your link
                    </Label>
                    <Input
                        type="text"
                        placeholder="Paste your link here..."
                        className="focus-visible:ring-0 focus-visible:ring-transparent w-full"
                    />
                </CardContent>
            </Card>
        ),
    },
    {
        Icon: SearchIcon,
        name: "Search your links",
        description: "Quickly find the links you need with AI-powered search.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <Command className="top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] right-10 absolute p-2 border border-border w-[70%] origin-to transition-all translate-x-0 group-hover:-translate-x-10 duration-300 ease-out">
                <Input placeholder="Type to search..." />
                <div className="mt-1 cursor-pointer">
                    <div className="hover:bg-muted px-4 py-2 rounded-md">linkify.io/hdf00c</div>
                    <div className="hover:bg-muted px-4 py-2 rounded-md">linkify.io/sdv0n0</div>
                    <div className="hover:bg-muted px-4 py-2 rounded-md">linkify.io/03gndo</div>
                    <div className="hover:bg-muted px-4 py-2 rounded-md">linkify.io/09vmmw</div>
                    <div className="hover:bg-muted px-4 py-2 rounded-md">linkify.io/s09vws</div>
                    <div className="hover:bg-muted px-4 py-2 rounded-md">linkify.io/sd8fv5</div>
                </div>
            </Command>
        ),
    },
    {
        Icon: WaypointsIcon,
        name: "Connect your apps",
        description: "Integrate with your favorite apps and services.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
        background: (
            <Integrations className="group-hover:scale-105 top-4 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] right-2 absolute pl-28 md:pl-0 border-none w-[600px] h-[300px] transition-all duration-300 ease-out" />
        ),
    },
    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Keep track of your links with our calendar view.",
        className: "col-span-3 lg:col-span-1",
        href: "#",
        cta: "Learn more",
        background: (
            <Calendar
                mode="single"
                selected={new Date(2022, 4, 11, 0, 0, 0)}
                className="group-hover:scale-105 top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] right-0 absolute border border-border rounded-md origin-top transition-all duration-300 ease-out"
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
            "group relative col-span-3 flex flex-col justify-between border border-border/60 overflow-hidden rounded-xl",
            "bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            className,
        )}
    >
        <div>{background}</div>
        <div className="z-10 flex flex-col gap-1 p-6 transition-all group-hover:-translate-y-10 duration-300 pointer-events-none">
            <Icon className="group-hover:scale-75 w-12 h-12 text-neutral-700 origin-left transition-all duration-300 ease-in-out" />
            <h3 className="font-semibold text-neutral-300 text-xl">
                {name}
            </h3>
            <p className="max-w-lg text-neutral-400">{description}</p>
        </div>

        <div
            className={cn(
                "absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            )}
        >
            <Link href={href} className={buttonVariants({ size: "sm", variant: "ghost", className: "cursor-pointer" })}>
                {cta}
                <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Link>
        </div>
        <div className="group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10 absolute inset-0 transition-all duration-300 pointer-events-none" />
    </div>
);

export { BentoCard, BentoGrid };