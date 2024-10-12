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
import { cn, StepThreeSchema, StepThreeSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface Props {
    nextStep: () => void;
}

const StepThree = ({ nextStep }: Props) => {

    const form = useForm<StepThreeSchemaType>({
        resolver: zodResolver(StepThreeSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-three"],
        mutationFn: async ({ name, adherence, dosage, frequency, purpose }: StepThreeSchemaType) => {
            const payload: StepThreeSchemaType = {
                name,
                adherence,
                dosage,
                frequency,
                purpose,
            };

            const { data } = await axios.post("/api/onboarding/step-three", payload);
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

    const onSubmit = (data: StepThreeSchemaType) => {
        mutate(data);
    };


    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 mx-auto p-8 w-full max-w-6xl min-h-screen animate-gradient-x">
            <div className="space-y-10 bg-white bg-opacity-90 shadow-2xl backdrop-blur-xl p-12 rounded-3xl w-full transform hover:scale-105 transition-all duration-500 ease-in-out">
                <h2 className="bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-10 font-extrabold text-5xl text-center text-transparent animate-text">Medication Information</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col gap-y-10 w-full h-full">
                        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="name" className="block mb-3 font-semibold text-gray-800 text-xl">
                                            Which medicines are you taking?
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            type="text"
                                            disabled={isPending}
                                            placeholder="Paracetamol, Aspirin, etc."
                                            className="border-3 border-purple-300 focus:border-indigo-500 mt-2 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-300 text-lg transition duration-300 placeholder-gray-400"
                                        />
                                        <FormMessage className="mt-2 text-pink-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dosage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="dosage" className="block mb-3 font-semibold text-gray-800 text-xl">
                                            What is the dosage?
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="dosage"
                                            type="text"
                                            disabled={isPending}
                                            placeholder="Ex: 500mg, 1 tablet"
                                            className="border-3 border-purple-300 focus:border-indigo-500 mt-2 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-300 text-lg transition duration-300 placeholder-gray-400"
                                        />
                                        <FormMessage className="mt-2 text-pink-600" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="purpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="purpose" className="block mb-3 font-semibold text-gray-800 text-xl">
                                        What is the purpose of this medication?
                                    </FormLabel>
                                    <Textarea
                                        {...field}
                                        id="purpose"
                                        disabled={isPending}
                                        placeholder="For headache, fever, pain relief"
                                        className="border-3 border-purple-300 focus:border-indigo-500 mt-2 p-4 rounded-2xl focus:ring-4 focus:ring-indigo-300 w-full max-h-40 text-lg transition duration-300 placeholder-gray-400 resize-none"
                                    />
                                    <FormMessage className="mt-2 text-pink-600" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="frequency" className="block mb-3 font-semibold text-gray-800 text-xl">
                                        How often do you take it?
                                    </FormLabel>
                                    <RadioGroup value={field.value} onChange={field.onChange} className="gap-6 grid grid-cols-2 md:grid-cols-4 mt-4">
                                        {["DAILY", "WEEKLY", "MONTHLY", "RARELY"].map((freq) => (
                                            <RadioGroup.Option
                                                key={freq}
                                                value={freq}
                                                id={freq}
                                                className={({ active, checked }) => cn(
                                                    "border-3 border-purple-300 rounded-2xl w-full py-4 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition duration-300 hover:bg-purple-100 transform hover:scale-105",
                                                    (active || checked) && "border-indigo-500 bg-indigo-100 shadow-lg",
                                                )}
                                            >
                                                <RadioGroup.Label as="span" htmlFor={freq} className="font-medium text-lg !capitalize">
                                                    {freq.toLowerCase()}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage className="mt-2 text-pink-600" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="adherence"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="adherence" className="block mb-3 font-semibold text-gray-800 text-xl">
                                        How often do you follow the prescription?
                                    </FormLabel>
                                    <RadioGroup value={field.value} onChange={field.onChange} className="gap-6 grid grid-cols-2 md:grid-cols-5 mt-4">
                                        {["ALWAYS", "OFTEN", "SOMETIMES", "NEVER", "RARELY"].map((adhere) => (
                                            <RadioGroup.Option
                                                key={adhere}
                                                value={adhere}
                                                id={adhere}
                                                className={({ active, checked }) => cn(
                                                    "border-3 border-purple-300 rounded-2xl w-full py-4 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition duration-300 hover:bg-purple-100 transform hover:scale-105",
                                                    (active || checked) && "border-indigo-500 bg-indigo-100 shadow-lg",
                                                )}
                                            >
                                                <RadioGroup.Label as="span" htmlFor={adhere} className="font-medium text-lg !capitalize">
                                                    {adhere.toLowerCase()}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </RadioGroup>
                                    <FormMessage className="mt-2 text-pink-600" />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center mt-12 w-full">
                            <p className="text-gray-600 text-lg italic">
                                You can update these settings in dashboard
                            </p>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 shadow-xl hover:shadow-2xl rounded-full focus:ring-4 focus:ring-purple-500 w-48 h-16 font-bold text-white text-xl transform transition hover:-translate-y-1 duration-500 ease-in-out hover:scale-110 focus:outline-none"
                            >
                                {isPending ? (
                                    <LoaderIcon className="w-8 h-8 animate-spin" />
                                ) : (
                                    <>
                                        Next Step
                                        <ArrowRightIcon className="ml-2 w-6 h-6" />
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

export default StepThree
