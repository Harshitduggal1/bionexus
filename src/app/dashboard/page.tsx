import { Recommendations } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import MagicCard from "@/components/ui/magic-card";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { BrainIcon, HeartPulseIcon, NotepadTextIcon, StethoscopeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const DashboardPage = async () => {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
        include: {
            symptoms: true,
            medications: true,
            mentalwellness: true,
        }
    });

    const symptoms = await db.symptom.findMany({
        where: {
            userId: user?.id,
        },
    });

    const medications = await db.medication.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 bg-gradient-to-br from-gray-50 dark:from-gray-900 to-gray-100 dark:to-gray-800 lg:p-10 w-full min-h-screen">
            <div className="flex flex-col gap-8 md:col-span-1 xl:col-span-4 w-full">
                <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl py-8 md:py-10 rounded-3xl w-full transition-all duration-300 hover:scale-105">
                    <div className="relative mx-auto w-28 h-28">
                        <Image
                            src={dbUser?.image!}
                            alt={dbUser?.firstName!}
                            layout="fill"
                            objectFit="cover"
                            className="border-4 border-indigo-500 shadow-lg rounded-full"
                        />
                    </div>
                    <h4 className="bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mt-6 font-bold text-2xl text-transparent">
                        {dbUser?.firstName} {dbUser?.lastName}
                    </h4>
                    <p className="mt-2 text-gray-600 text-lg dark:text-gray-300">
                        Age: <span className="font-semibold">{dbUser?.age}</span>
                    </p>
                    <Link href="/dashboard/account/settings" className={buttonVariants({ size: "lg", className: "mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105" })}>
                        Update Profile
                    </Link>
                </div>
                <div className="flex flex-col items-start bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl px-8 py-10 rounded-3xl w-full transition-all duration-300">
                    <h4 className="bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 font-bold text-2xl text-transparent">
                        Information
                    </h4>
                    <ul className="space-y-6 mt-8 w-full text-base">
                        <li className="items-center grid grid-cols-2 font-medium text-gray-700 text-start dark:text-gray-200">
                            <span className="text-indigo-500">Gender:</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full font-normal text-gray-600 dark:text-gray-300 capitalize">
                                {dbUser?.gender}
                            </span>
                        </li>
                        <li className="items-center grid grid-cols-2 font-medium text-gray-700 text-start dark:text-gray-200">
                            <span className="text-indigo-500">Blood Group:</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full font-normal text-gray-600 dark:text-gray-300">{dbUser?.bloodGroup}</span>
                        </li>
                        <li className="items-center grid grid-cols-2 font-medium text-gray-700 text-start dark:text-gray-200">
                            <span className="text-indigo-500">Symptoms:</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full font-normal text-ellipsis text-gray-600 dark:text-gray-300 capitalize overflow-hidden">
                                {dbUser?.symptoms?.map((symptom) => symptom.name).join(", ").replace(/_/g, " ").toLowerCase()}
                            </span>
                        </li>
                        <li className="items-center grid grid-cols-2 font-medium text-gray-700 text-start dark:text-gray-200">
                            <span className="text-indigo-500">Medications:</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full font-normal text-ellipsis text-gray-600 dark:text-gray-300 capitalize overflow-hidden">
                                {dbUser?.medications?.map((medication) => medication.name).join(", ").replace("none", "None")}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-10 md:col-span-1 xl:col-span-8 w-full">
                <div className="gap-8 grid grid-cols-1 xl:grid-cols-3 w-full">
                    <MagicCard color="rgba(239,68,68,.08)" className="border-2 hover:shadow-2xl border-red-200 rounded-3xl w-full max-w-full transition-all duration-300 overflow-hidden hover:scale-105">
                        <Link href="/dashboard/health-status" className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 w-full group">
                            <div className="space-y-2">
                                <h5 className="bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 font-bold font-heading text-red-500 text-transparent text-xl">
                                    Your Health Status
                                </h5>
                                <p className="text-gray-600 text-sm dark:text-gray-300">
                                    Evaluate your health status
                                </p>
                            </div>
                            <HeartPulseIcon strokeWidth={2} className="group-hover:scale-110 w-12 h-12 text-red-500 transform transition-all duration-300" />
                        </Link>
                    </MagicCard>

                    <MagicCard color="rgba(217,70,239,.1)" className="border-2 border-fuchsia-200 hover:shadow-2xl rounded-3xl w-full max-w-full transition-all duration-300 overflow-hidden hover:scale-105">
                        <Link href="/dashboard/ai" className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 w-full group">
                            <div className="space-y-2">
                                <h5 className="bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500 font-bold font-heading text-fuchsia-500 text-transparent text-xl">
                                    Virtual Assistant
                                </h5>
                                <p className="text-gray-600 text-sm dark:text-gray-300">
                                    Chat with our AI bot
                                </p>
                            </div>
                            <div className="flex">
                                <BrainIcon strokeWidth={2} className="group-hover:scale-110 w-12 h-12 text-fuchsia-500 transform transition-all duration-300" />
                            </div>
                        </Link>
                    </MagicCard>

                    <MagicCard color="rgba(99,102,241,.08)" className="border-2 border-indigo-200 hover:shadow-2xl rounded-3xl w-full max-w-full transition-all duration-300 overflow-hidden hover:scale-105">
                        <Link href="/dashboard/health-tips" className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 w-full group">
                            <div className="space-y-2">
                                <h5 className="bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 font-bold font-heading text-indigo-500 text-transparent text-xl">
                                    Health Tips
                                </h5>
                                <p className="text-gray-600 text-sm dark:text-gray-300">
                                    Get health tips and advice
                                </p>
                            </div>
                            <NotepadTextIcon strokeWidth={2} className="group-hover:scale-110 w-12 h-12 text-indigo-500 transform transition-all duration-300" />
                        </Link>
                    </MagicCard>
                </div>
                <div className="flex flex-col items-start bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl p-8 rounded-3xl w-full transition-all duration-300">
                    <h3 className="bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 font-bold text-3xl text-transparent">
                        Health Recommendations
                    </h3>
                    <div className="mt-4 scrollbar-thumb-indigo-500 pr-4 w-full max-h-[calc(100vh-20rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-200">
                    <Recommendations
                            symptoms={symptoms}
                            medications={medications}
                            user={dbUser!}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage
