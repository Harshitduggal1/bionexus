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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col text-center gap-4">
                    <Link href="/">
                        <Icons.logo className="w-16 h-16 mx-auto text-white hover:text-pink-300 transition-colors duration-300" />
                    </Link>
                    <h1 className="text-3xl font-extrabold font-heading mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
                        Please check your email
                    </h1>
                    <p className="text-lg text-white text-opacity-80">
                        We&apos;ve sent a verification code to {email}
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="name" className="text-xl font-semibold text-white">
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
                                <InputOTPSlot index={0} className="w-12 h-12 text-2xl font-bold text-indigo-800 bg-white bg-opacity-50 border-2 border-indigo-300 rounded-xl focus:ring-4 focus:ring-pink-400 transition-all duration-300" />
                                <InputOTPSlot index={1} className="w-12 h-12 text-2xl font-bold text-indigo-800 bg-white bg-opacity-50 border-2 border-indigo-300 rounded-xl focus:ring-4 focus:ring-pink-400 transition-all duration-300" />
                                <InputOTPSlot index={2} className="w-12 h-12 text-2xl font-bold text-indigo-800 bg-white bg-opacity-50 border-2 border-indigo-300 rounded-xl focus:ring-4 focus:ring-pink-400 transition-all duration-300" />
                                <InputOTPSlot index={3} className="w-12 h-12 text-2xl font-bold text-indigo-800 bg-white bg-opacity-50 border-2 border-indigo-300 rounded-xl focus:ring-4 focus:ring-pink-400 transition-all duration-300" />
                                <InputOTPSlot index={4} className="w-12 h-12 text-2xl font-bold text-indigo-800 bg-white bg-opacity-50 border-2 border-indigo-300 rounded-xl focus:ring-4 focus:ring-pink-400 transition-all duration-300" />
                                <InputOTPSlot index={5} className="w-12 h-12 text-2xl font-bold text-indigo-800 bg-white bg-opacity-50 border-2 border-indigo-300 rounded-xl focus:ring-4 focus:ring-pink-400 transition-all duration-300" />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <Button
                        size="lg"
                        type="submit"
                        disabled={isVerifying}
                        className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        {isVerifying ? (
                            <LoaderIcon className="w-6 h-6 animate-spin text-white" />
                        ) : "Verify Code"}
                    </Button>
                </form>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-700 p-4">
            <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col text-center gap-4">
                    <Link href="/">
                        <Icons.logo className="w-16 h-16 mx-auto text-white hover:text-pink-300 transition-colors duration-300" />
                    </Link>
                    <h1 className="text-4xl font-extrabold font-heading mt-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-500">
                        Sign Up
                    </h1>
                    <p className="text-lg text-white text-opacity-80">
                        Create an account to start using cura
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xl font-semibold text-white">
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            disabled={isLoading}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 text-lg bg-white bg-opacity-20 border-2 border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xl font-semibold text-white">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            disabled={isLoading}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 text-lg bg-white bg-opacity-20 border-2 border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xl font-semibold text-white">
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
                                className="w-full px-4 py-3 text-lg bg-white bg-opacity-20 border-2 border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 rounded-xl focus:ring-4 focus:ring-pink-400 focus:border-transparent transition-all duration-300 pr-12"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                disabled={isLoading}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all duration-300"
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
                        className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        {isLoading ? (
                            <LoaderIcon className="w-6 h-6 animate-spin text-white" />
                        ) : "Continue"}
                    </Button>
                </form>

                <div className="flex mt-4">
                    <p className="text-lg text-white text-opacity-80 text-center w-full">
                        Been here before? <Link href="/auth/signin" className="text-pink-300 hover:text-pink-100 font-semibold underline transition-colors duration-300">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage
