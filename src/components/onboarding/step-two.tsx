"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { cn, StepTwoSchema, StepTwoSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
    nextStep: () => void;
}

const StepTwo = ({ nextStep }: Props) => {

    const form = useForm<StepTwoSchemaType>({
        resolver: zodResolver(StepTwoSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-two"],
        mutationFn: async ({ name, intensity, frequency }: StepTwoSchemaType) => {
            const payload: StepTwoSchemaType = {
                name,
                intensity,
                frequency,
            };

            const { data } = await axios.post("/api/onboarding/step-two", payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Data saved!");
            nextStep();
        },
        onError: (error) => {
            console.log("Error", error);
            toast.error("Something went wrong");
        },
    });

    const onSubmit = (data: StepTwoSchemaType) => {
        mutate(data);
    };


    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 dark:from-gray-900 via-purple-50 dark:via-indigo-900 to-pink-50 dark:to-purple-900 mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full max-w-4xl min-h-screen">
            <div className="space-y-8 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 shadow-2xl backdrop-blur-lg p-10 rounded-3xl w-full max-w-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
                <h2 className="bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8 font-extrabold text-4xl text-center text-transparent animate-gradient">Symptom Information</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col gap-y-8 w-full h-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel className="font-semibold text-gray-700 text-xl dark:text-gray-200">
                                        What symptom are you experiencing?
                                    </FormLabel>
                                    <RadioGroup value={field.value} onChange={field.onChange} className="gap-3 grid grid-cols-2 md:grid-cols-5">
                                        {["HEADACHE", "NAUSEA", "VOMITING", "DIARRHEA", "FATIGUE", "INSOMNIA", "CONSTIPATION", "MUSCLE_PAIN", "JOINT_PAIN", "OTHER"].map((symptom) => (
                                            <RadioGroup.Option
                                                key={symptom}
                                                value={symptom}
                                                id={symptom}
                                                className={({ active, checked }) => cn(
                                                    "border-2 border-purple-200 rounded-xl w-full py-3 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105",
                                                    (active || checked) && "border-purple-500 bg-purple-100 dark:bg-purple-900",
                                                )}
                                            >
                                                <RadioGroup.Label as="span" htmlFor={symptom} className="font-medium text-base text-gray-700 dark:text-gray-200 !capitalize">
                                                    {symptom.replace("_", " ").toLowerCase()}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage className="text-pink-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel className="font-semibold text-gray-700 text-xl dark:text-gray-200">
                                        How often do you experience it?
                                    </FormLabel>
                                    <RadioGroup value={field.value} onChange={field.onChange} className="gap-3 grid grid-cols-2 md:grid-cols-4">
                                        {["DAILY", "WEEKLY", "MONTHLY", "RARELY"].map((freq) => (
                                            <RadioGroup.Option
                                                key={freq}
                                                value={freq}
                                                id={freq}
                                                className={({ active, checked }) => cn(
                                                    "border-2 border-indigo-200 rounded-xl w-full py-4 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105",
                                                    (active || checked) && "border-indigo-500 bg-indigo-100 dark:bg-indigo-900",
                                                )}
                                            >
                                                <RadioGroup.Label as="span" htmlFor={freq} className="font-medium text-base text-gray-700 dark:text-gray-200 !capitalize">
                                                    {freq.toLowerCase()}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage className="text-pink-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="intensity"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel className="font-semibold text-gray-700 text-xl dark:text-gray-200">
                                        How intense is it?
                                    </FormLabel>
                                    <RadioGroup value={field.value?.toString()} onChange={(value) => field.onChange(Number(value))} className="gap-3 grid grid-cols-5 md:grid-cols-10">
                                        {[...Array(10)].map((_, index) => (
                                            <RadioGroup.Option
                                                key={index + 1}
                                                id={`intensity-${index + 1}`}
                                                value={(index + 1).toString()}
                                                className={({ active, checked }) => cn(
                                                    "border-2 border-pink-200 rounded-xl w-full py-3 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105",
                                                    (active || checked) && "border-pink-500 bg-pink-100 dark:bg-pink-900",
                                                )}
                                            >
                                                <RadioGroup.Label htmlFor={`intensity-${index + 1}`} className="font-medium text-gray-700 text-lg dark:text-gray-200 cursor-pointer">
                                                    {index + 1}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage className="text-pink-500" />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center mt-10 w-full">
                            <p className="text-gray-500 text-sm dark:text-gray-400 italic">
                                You can update these settings in dashboard
                            </p>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg hover:shadow-xl rounded-full focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-36 h-12 font-semibold text-white transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none"
                            >
                                {isPending ? (
                                    <LoaderIcon className="mr-2 w-5 h-5 animate-spin" />
                                ) : (
                                    <ArrowRightIcon className="mr-2 w-5 h-5" />
                                )}
                                Next Step
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
};

export default StepTwo
