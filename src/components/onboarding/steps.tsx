"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STEPS } from "@/constants";
import { cn } from "@/lib";
import { useEffect, useState } from "react";
import StepFive from "./step-five";
import StepFour from "./step-four";
import StepOne from "./step-one";
import StepThree from "./step-three";
import StepTwo from "./step-two";

const stepComponents: { [key: string]: any } = {
    "step-one": StepOne,
    "step-two": StepTwo,
    "step-three": StepThree,
    "step-four": StepFour,
    "step-five": StepFive,
};

const Steps = () => {

    const initialTab = localStorage.getItem("cura_active_tab") || "step-one";

    const [activeTab, setActiveTab] = useState<string>(initialTab);

    useEffect(() => {
        localStorage.setItem("cura_active_tab", activeTab);
    }, [activeTab]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div className="flex bg-gradient-to-br from-purple-100 dark:from-gray-900 via-pink-100 dark:via-purple-900 to-indigo-100 dark:to-indigo-900 w-full min-h-screen overflow-x-scroll">
            <Tabs
                value={activeTab}
                defaultValue={initialTab}
                onValueChange={setActiveTab}
                className="bg-white/30 dark:bg-black/30 shadow-2xl backdrop-blur-xl pt-8 rounded-3xl w-full select-none"
            >
                <TabsList className="flex justify-evenly items-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 shadow-lg mx-auto p-2 rounded-full max-w-4xl">
                    {STEPS.map((step, index) => (
                        <TabsTrigger
                            key={step.title}
                            value={step.name}
                            onClick={() => setActiveTab(step.name)}
                            className={cn(
                                "w-full py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out",
                                step.name === activeTab
                                    ? "bg-white text-purple-600 shadow-lg transform scale-105"
                                    : "text-white hover:bg-white/20",
                            )}
                        >
                            {step.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="bg-white/50 dark:bg-gray-800/50 shadow-xl backdrop-blur-lg mt-10 p-8 rounded-3xl">
                    {STEPS.map((step) => {
                        const StepComponent = stepComponents[step.name];
                        return (
                            <TabsContent 
                                key={step.title} 
                                value={step.name} 
                                className="pt-10 transform transition-all duration-500 ease-in-out"
                            >
                                {step.name === activeTab && (
                                    <div className="bg-gradient-to-br from-white/80 dark:from-gray-800/80 to-purple-100/80 dark:to-purple-900/80 shadow-2xl backdrop-blur-md p-8 rounded-2xl">
                                        <StepComponent />
                                    </div>
                                )}
                            </TabsContent>
                        );
                    })}
                </div>
            </Tabs>
        </div>
    )
};

export default Steps
