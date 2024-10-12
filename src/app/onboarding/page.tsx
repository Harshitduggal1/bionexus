"use client";

import { StepFive, StepFour, StepOne, StepThree, StepTwo } from "@/components";
import { STEPS } from "@/constants";
import { cn } from "@/lib";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useRouter, useSearchParams, } from "next/navigation";
import { useEffect, useState } from "react";

const stepComponents: { [key: string]: any } = {
    "step-one": StepOne,
    "step-two": StepTwo,
    "step-three": StepThree,
    "step-four": StepFour,
    "step-five": StepFive,
};

const OnboardingPage = () => {

    const router = useRouter();

    const params = useSearchParams();

    const initialStep = Number(params.get("step")) || 1;

    const [activeStep, setActiveStep] = useState<number>(initialStep);

    useEffect(() => {
        router.push(`/onboarding?step=${activeStep}`);
    }, [activeStep, router]);

    const Component = stepComponents[STEPS[activeStep - 1].name];

    const MotionCheckIcon = motion(CheckIcon);

    return (
        <div className="flex flex-col items-center mx-auto px-4 lg:px-10 w-full max-w-6xl h-full">
            {/* steps */}
            <div className="relative flex justify-between md:justify-evenly items-center gap-x-4 mx-auto mb-4 md:px-4 w-full md:max-w-4xl">
                {STEPS.map((step) => (
                    <div
                        key={step.id}
                        className={cn(
                            "flex flex-col items-center justify-center md:w-16 relative bg-background z-10",
                            activeStep === step.id ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <div
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-full text-sm",
                                activeStep === step.id ? "bg-primary text-white" : "bg-zinc-100",
                                activeStep > step.id ? "bg-primary text-white" : ""
                            )}
                        >
                            {activeStep > step.id ? (
                                <MotionCheckIcon
                                    className="w-5 h-5"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    whileInView={{ scale: 1.1 }}
                                    transition={{ duration: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                                />
                            ) : (
                                step.id
                            )}
                        </div>
                    </div>
                ))}
                <div className="top-5 absolute inset-x-0 mx-auto bg-border w-[85%] md:w-[75%] h-0.5 ranslate-x-1/2"></div>
            </div>

            {/* content */}
            <div className="flex flex-col bg-background mx-auto px-1 py-8 w-full max-w-4xl h-full">
                <Component nextStep={() => setActiveStep((prev) => prev + 1)} />
            </div>
        </div>
    );
};

export default OnboardingPage
