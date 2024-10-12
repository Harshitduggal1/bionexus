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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn, StepOneSchema, StepOneSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
    nextStep: () => void;
}

const StepOne = ({ nextStep }: Props) => {

    const form = useForm<StepOneSchemaType>({
        resolver: zodResolver(StepOneSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-one"],
        mutationFn: async ({ age, bloodGroup, gender, height, weight }: StepOneSchemaType) => {
            const payload: StepOneSchemaType = {
                age,
                bloodGroup,
                gender,
                height,
                weight,
            };

            const { data } = await axios.post("/api/onboarding/step-one", payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Data saved!");
            nextStep();
        },
        onError: (error) => {
            console.log(error);
            toast.error("Something went wrong");
        },
    });

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 mx-auto p-8 w-full max-w-6xl h-full min-h-screen animate-gradient-x">
            <div className="space-y-10 bg-white bg-opacity-90 shadow-2xl backdrop-blur-xl p-12 rounded-3xl w-full max-w-3xl transform hover:scale-105 transition-all duration-500 ease-in-out">
                <h2 className="bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-extrabold text-5xl text-center text-transparent animate-text">
                    Personal Information
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((e) => mutate(e))} className="relative flex flex-col gap-y-10 w-full h-full">
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-2xl text-gray-800 text-transparent">
                                        Specify your gender
                                    </FormLabel>
                                    <RadioGroup value={field.value} onChange={field.onChange} className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-4">
                                        {["male", "female", "other"].map((symptom) => (
                                            <RadioGroup.Option
                                                key={symptom}
                                                value={symptom}
                                                id={symptom}
                                                className={({ active, checked }) => cn(
                                                    "border-3 border-purple-400 rounded-2xl w-full py-4 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition transform duration-300 ease-in-out hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl",
                                                    (active || checked) && "border-indigo-600 bg-gradient-to-r from-purple-200 to-indigo-200",
                                                )}
                                            >
                                                <RadioGroup.Label as="span" htmlFor={symptom} className="bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-bold text-transparent text-xl !capitalize">
                                                    {symptom.replace("_", " ").toLowerCase()}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage className="mt-2 font-semibold text-red-500" />
                                </FormItem>
                            )}
                        />
                        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 w-full">
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-semibold text-2xl text-gray-800 text-transparent">
                                            Weight (kg)
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="62"
                                            type="number"
                                            className="border-3 border-purple-400 focus:border-indigo-600 mt-3 p-4 rounded-xl focus:ring-4 focus:ring-indigo-300 font-medium text-lg transition duration-300 placeholder-gray-400"
                                        />
                                        <FormMessage className="mt-2 font-semibold text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold text-2xl text-gray-800 text-transparent">
                                            Height (cm)
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="170"
                                            type="number"
                                            className="border-3 border-purple-400 focus:border-indigo-600 mt-3 p-4 rounded-xl focus:ring-4 focus:ring-indigo-300 font-medium text-lg transition duration-300 placeholder-gray-400"
                                        />
                                        <FormMessage className="mt-2 font-semibold text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 w-full">
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-2xl text-gray-800 text-transparent">
                                            What is your age?
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="25"
                                            disabled={isPending}
                                            className="border-3 border-purple-400 focus:border-indigo-600 mt-3 p-4 rounded-xl focus:ring-4 focus:ring-indigo-300 font-medium text-lg transition duration-300 placeholder-gray-400"
                                        />
                                        <FormMessage className="mt-2 font-semibold text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bloodGroup"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-2xl text-gray-800 text-transparent">
                                            Your blood group
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="border-3 border-purple-400 focus:border-indigo-600 mt-3 p-4 rounded-xl focus:ring-4 focus:ring-indigo-300 font-medium text-lg transition duration-300">
                                                <SelectValue placeholder="Select blood group" />
                                            </SelectTrigger>
                                            <SelectContent className="border-3 border-purple-400 bg-white shadow-2xl rounded-xl">
                                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bloodGroup) => (
                                                    <SelectItem key={bloodGroup} value={bloodGroup} className="hover:bg-gradient-to-r from-purple-100 to-indigo-100 p-3 font-medium text-lg">
                                                        {bloodGroup}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="mt-2 font-semibold text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-between items-center gap-8 mt-12 w-full">
                            <p className="font-medium text-base text-gray-600 italic">
                                You can update these settings in dashboard
                            </p>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="flex justify-center items-center gap-x-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl hover:shadow-3xl rounded-full w-48 h-16 font-extrabold text-white text-xl transform transition duration-500 hover:scale-110 active:scale-95"
                            >
                                {isPending ? (
                                    <LoaderIcon className="w-8 h-8 animate-spin" />
                                ) : (
                                    <>
                                        Next Step
                                        <ArrowRightIcon className="w-7 h-7" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
};

export default StepOne
