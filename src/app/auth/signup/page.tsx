"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Icons } from "@/components";

const SignUpPage = () => {

    const router = useRouter();

    const { isLoaded, signUp, setActive } = useSignUp();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (!name || !email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            await signUp.create({
                emailAddress: email,
                password,
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1] || "",
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setIsVerified(true);
        } catch (error: any) {
            console.log(JSON.stringify(error, null, 2));

            switch (error.errors[0]?.code) {
                case "form_identifier_exists":
                    toast.error("This email is already registered. Please sign in.");
                    break;
                case "form_password_pwned":
                    toast.error("The password is too common. Please choose a stronger password.");
                    break;
                case "form_param_format_invalid":
                    toast.error("Invalid email address. Please enter a valid email address.");
                    break;
                case "form_password_length_too_short":
                    toast.error("Password is too short. Please choose a longer password.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (!code) {
            toast.error("Please enter the verification code");
            return;
        }

        setIsVerifying(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/auth/auth-callback");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                toast.error("Invalid verification code. Please try again.");
            }
        } catch (error) {
            console.error("Error:", JSON.stringify(error, null, 2));
            toast.error("An error occurred. Please try again");
        } finally {
            setIsVerifying(false);
        }
    };

    return isVerified ? (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 min-h-screen">
            <div className="space-y-8 bg-white bg-opacity-10 shadow-2xl backdrop-blur-lg p-8 rounded-3xl w-full max-w-md transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col gap-4 text-center">
                    <Link href="/">
                        <Icons.logo className="mx-auto w-16 h-16 text-white hover:text-pink-300 transition-colors duration-300" />
                    </Link>
                    <h1 className="bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 mt-2 font-extrabold font-heading text-3xl text-transparent">
                        Please check your email
                    </h1>
                    <p className="text-lg text-white text-opacity-80">
                        We&apos;ve sent a verification code to {email}
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="name" className="font-semibold text-white text-xl">
                            Verification Code
                        </Label>
                        <InputOTP
                            maxLength={6}
                            value={code}
                            disabled={isVerifying}
                            onChange={(e) => setCode(e)}
                            className="gap-2"
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="border-2 border-indigo-300 bg-white bg-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 w-12 h-12 font-bold text-2xl text-indigo-800 transition-all duration-300" />
                                <InputOTPSlot index={1} className="border-2 border-indigo-300 bg-white bg-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 w-12 h-12 font-bold text-2xl text-indigo-800 transition-all duration-300" />
                                <InputOTPSlot index={2} className="border-2 border-indigo-300 bg-white bg-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 w-12 h-12 font-bold text-2xl text-indigo-800 transition-all duration-300" />
                                <InputOTPSlot index={3} className="border-2 border-indigo-300 bg-white bg-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 w-12 h-12 font-bold text-2xl text-indigo-800 transition-all duration-300" />
                                <InputOTPSlot index={4} className="border-2 border-indigo-300 bg-white bg-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 w-12 h-12 font-bold text-2xl text-indigo-800 transition-all duration-300" />
                                <InputOTPSlot index={5} className="border-2 border-indigo-300 bg-white bg-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 w-12 h-12 font-bold text-2xl text-indigo-800 transition-all duration-300" />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <Button
                        size="lg"
                        type="submit"
                        disabled={isVerifying}
                        className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-pink-500 hover:to-pink-600 shadow-lg py-3 rounded-xl w-full font-bold text-lg text-white transform hover:scale-105 transition-all duration-300"
                    >
                        {isVerifying ? (
                            <LoaderIcon className="w-6 h-6 text-white animate-spin" />
                        ) : "Verify Code"}
                    </Button>
                </form>
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-center items-center bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-700 p-4 min-h-screen">
            <div className="space-y-8 bg-white bg-opacity-10 shadow-2xl backdrop-blur-xl p-8 rounded-3xl w-full max-w-md transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col gap-4 text-center">
                    <Link href="/">
                        <Icons.logo className="mx-auto w-16 h-16 text-white hover:text-pink-300 transition-colors duration-300" />
                    </Link>
                    <h1 className="bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500 mt-2 font-extrabold font-heading text-4xl text-transparent">
                        Sign Up
                    </h1>
                    <p className="text-lg text-white text-opacity-80">
                        Create an account to start using <span className="bg-clip-text bg-gradient-to-r from-pink-800 to-blue-800 text-transparent"> BIONEXUS</span>       
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="font-semibold text-white text-xl">
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            disabled={isLoading}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 border-white bg-white bg-opacity-20 placeholder-opacity-50 px-4 py-3 focus:border-transparent border-opacity-30 rounded-xl focus:ring-4 focus:ring-pink-400 w-full text-lg text-white transition-all duration-300 placeholder-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-semibold text-white text-xl">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            disabled={isLoading}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-white bg-white bg-opacity-20 placeholder-opacity-50 px-4 py-3 focus:border-transparent border-opacity-30 rounded-xl focus:ring-4 focus:ring-pink-400 w-full text-lg text-white transition-all duration-300 placeholder-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-semibold text-white text-xl">
                            Password
                        </Label>
                        <div className="relative w-full">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                disabled={isLoading}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-2 border-white bg-white bg-opacity-20 placeholder-opacity-50 px-4 py-3 pr-12 focus:border-transparent border-opacity-30 rounded-xl focus:ring-4 focus:ring-pink-400 w-full text-lg text-white transition-all duration-300 placeholder-white"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                disabled={isLoading}
                                className="top-1/2 right-2 absolute hover:bg-white hover:bg-opacity-20 p-1 rounded-full transform transition-all -translate-y-1/2 duration-300"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ?
                                    <EyeOffIcon className="w-5 h-5 text-white" /> :
                                    <EyeIcon className="w-5 h-5 text-white" />
                                }
                            </Button>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-pink-500 hover:from-pink-600 to-blue-500 hover:to-blue-600 shadow-lg py-3 rounded-xl w-full font-bold text-lg text-white transform hover:scale-105 transition-all duration-300"
                    >
                        {isLoading ? (
                            <LoaderIcon className="w-6 h-6 text-white animate-spin" />
                        ) : "Continue"}
                    </Button>
                </form>

                <div className="flex mt-4">
                    <p className="w-full text-center text-lg text-white text-opacity-80">
                        Been here before? <Link href="/auth/signin" className="font-semibold text-pink-300 hover:text-pink-100 underline transition-colors duration-300">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage