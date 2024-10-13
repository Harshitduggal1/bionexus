import dynamic from 'next/dynamic';
import { Suspense, lazy } from 'react';
import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { BentoCard, BentoGrid, CARDS } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import MagicCard from "@/components/ui/magic-card";
import { COMPANIES, PROCESS } from "@/_utils";
import { REVIEWS } from "@/_utils/constants/misc";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRightIcon, CreditCardIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SparklesText from "@/components/ui/sparkles-text";
import dashboard from "@/public/dashboard.png";
import { Testimonial } from '@/components/Testimonial';
import { SparklesCore } from '@/components/ui/sparkles';
import { LogoTicker } from '@/components/Logos';
import LampDemo from "@/components/ui/lamp";

// Dynamically import heavy components
const Pricing = dynamic(() => import("@/components/pricingcards"), { ssr: false });
const Stats = dynamic(() => import("@/components/stats"), { ssr: false });
const CardHoverEffect = dynamic(() => import("@/components/Cards"), { ssr: false });
const GridTabs = dynamic(() => import("@/components/girdtabs"), { ssr: false });

const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Offerings = dynamic(() => import("@/components/offerings"), { ssr: false });
const FAQS = dynamic(() => import("@/components/Faqs"), { ssr: false });

const Homepage = async () => {
    const user = await currentUser();

    return (
        <div>
          
            {/* Hero Section */}
            <MaxWidthWrapper className="relative z-10">
           
                <div className="flex flex-col justify-center items-center py-20 md:py-32 w-full text-center">
                    <AnimationContainer className="flex flex-col justify-center items-center w-full text-center">
                        <button className="relative grid shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] hover:shadow-[0_1000px_0_0_hsl(0_0%_30%)_inset] px-6 py-2 rounded-full transition-colors duration-300 overflow-hidden group">
                            <span className="absolute before:absolute inset-0 before:content-[''] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] rounded-full w-[100%] before:w-[200%] h-[100%] before:[translate:-50%_-15%] animate-flip overflow-hidden mask-gradient spark [mask:linear-gradient(white,_transparent_50%)] before:aspect-square before:rotate-[-90deg] before:animate-rotate before:[inset:0_auto_auto_50%]" />
                            <span className="group-hover:from-blue-800 group-hover:to-purple-800 absolute inset-[1px] bg-gradient-to-r from-blue-900 to-purple-900 backdrop-blur-sm rounded-full transition-colors duration-300" />
                            <span className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-lg"></span>
                            <span className="z-10 flex justify-center items-center gap-1 py-1 font-medium text-blue-100 text-sm">
                                🧬 Revolutionizing Healthcare Research
                                <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1 duration-300 ease-in-out size-3" />
                            </span>
                        </button>
                        <SparklesCore
          background="transparent"
          minSize={0.9}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#0c38eb"
        />
                        <h1 className="py-8 w-full font-bold font-heading text-5xl text-balance text-center text-foreground sm:text-6xl md:text-7xl lg:text-8xl !leading-[1.1] tracking-tight">
                            AI-Powered <span className="inline-block bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent">Healthcare</span> 
                        </h1>
                        <SparklesText text="Research Platform" className="mb-8 font-bold text-4xl md:text-5xl lg:text-6xl" />
                        <p className="mx-auto mb-12 max-w-3xl text-balance text-lg text-muted-foreground md:text-xl tracking-normal">
                            BioNexus: Revolutionizing healthcare research with AI-driven insights for drug discovery, patient analysis, and clinical trials.
                            <br className="md:block hidden" />
                            <span className="md:block hidden">Unlock the power of data to transform patient care and accelerate medical breakthroughs.</span>
                        </p>
                        <div className="z-50 flex sm:flex-row flex-col justify-center items-center gap-6 whitespace-nowrap">
                            <Button asChild className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-8 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300">
                                <Link href={user ? "/dashboard" : "/auth/sign-in"} className="flex items-center">
                                    Begin your research journey
                                    <ArrowRightIcon className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="border-2 bg-transparent hover:bg-blue-500 px-8 py-4 border-blue-500 rounded-full font-semibold text-blue-500 text-lg hover:text-white transition-all duration-300">
                                <Link href="/about">Explore our platform</Link>
                            </Button>
                        </div>
                    </AnimationContainer>

                    <AnimationContainer delay={0.2} className="relative bg-transparent px-2 md:py-32 pt-20 pb-20 w-full overflow-hidden">
                        <BorderBeam
                            size={250}
                            duration={12}
                            delay={9}
                        />
                        <LogoTicker/>
                        <Image
                            src={dashboard}
                            alt="AI Healthcare Dashboard"
                            width={1200}
                            height={1200}
                            quality={100}
                            className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 shadow-lg rounded-md lg:rounded-xl ring-1 ring-white/20 hover:scale-105 transition-transform duration-300"
                        />
                        <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent h-1/2"></div>
                    </AnimationContainer>
                </div>
            </MaxWidthWrapper>

            <Suspense fallback={<div>Loading...</div>}>
                <Stats />
                <GridTabs />
            </Suspense>

            {/* Companies Section */}
            <MaxWidthWrapper>
                <AnimationContainer delay={0.4}>
                    <div className="relative py-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-30 blur-3xl"></div>
                        <div className="relative z-10 mx-auto px-4 md:px-8">
                            <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-12 font-heading font-medium text-center text-sm text-transparent uppercase tracking-wider">
                                Trusted by leading healthcare institutions
                            </h2>
                            <div className="mt-8">
                                <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-8 md:gap-x-16">
                                    {COMPANIES.map((company) => (
                                        <li key={company.name} className="transition-all duration-300 hover:scale-110">
                                            <Image
                                                src={company.logo}
                                                alt={company.name}
                                                width={100}
                                                height={100}
                                                quality={100}
                                                className="drop-shadow-lg w-32 h-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>

            <Suspense fallback={<div>Loading...</div>}>
                <CardHoverEffect />
            </Suspense>

            {/* Features Section */}
            <MaxWidthWrapper className="relative pt-20 pb-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/80 via-purple-500/60 to-blue-500/60 opacity-30 blur-3xl"></div>
                <AnimationContainer delay={0.1}>
                    <div className="relative z-10 flex flex-col justify-center items-center lg:items-center py-8 w-full">
                        <MagicBadge title="Features" />
                        <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-6 mb-8 font-bold font-heading text-4xl text-center text-transparent md:text-6xl lg:text-center !leading-[1.1] tracking-tight">
                            Advanced AI-Driven Healthcare Solutions
                        </h2>
                        <p className="mt-4 mb-16 max-w-2xl text-2xl text-center text-gray-500 lg:text-center dark:text-gray-300">
                            Our platform offers cutting-edge tools for drug discovery, patient data analysis, and clinical trial optimization.
                        </p>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2}>
                    <BentoGrid className="relative z-10 py-8">
                        {CARDS.map((feature, idx) => (
                            <BentoCard key={idx} {...feature} className="bg-transparent shadow-xl backdrop-blur-lg ring-1 ring-blue-300 hover:ring-2 hover:ring-blue-700 transition-all duration-300 hover:scale-105" />
                        ))}
                    </BentoGrid>
                </AnimationContainer>
            </MaxWidthWrapper>
    
            <Suspense fallback={<div>Loading...</div>}>
                <Testimonial />
            </Suspense>

            {/* Process Section */}
            <MaxWidthWrapper className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-transparent opacity-30 blur-3xl"></div>
                <AnimationContainer delay={0.1}>
                    <div className="relative z-10 flex flex-col justify-center items-center lg:items-center mx-auto py-8 w-full max-w-2xl">
                        <MagicBadge title="Our Process" />
                        <h2 className="bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 mt-6 mb-8 font-bold font-heading text-4xl text-center text-transparent md:text-6xl lg:text-center !leading-[1.1] tracking-tight">
                            Revolutionizing healthcare research in 3 steps
                        </h2>
                        <p className="mt-4 mb-16 max-w-lg text-2xl text-center text-gray-400 lg:text-center dark:text-gray-300">
                            Our streamlined process accelerates drug discovery and enhances patient outcomes through advanced AI technologies.
                        </p>
                    </div>
                </AnimationContainer>

                <div className="relative z-10 gap-8 md:gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 w-full">
                    {PROCESS.map((process, id) => (
                        <AnimationContainer delay={0.2 * id} key={id}>
                            <MagicCard className="bg-gradient-to-br from-white/60 via-purple-200/30 to-blue-200/40 shadow-2xl hover:shadow-3xl backdrop-blur-xl md:py-10 rounded-3xl ring-2 ring-blue-600/50 hover:ring-blue-600 h-full duration-500 group hover:scale-105 transition-all overflow-hidden">
                                <div className="relative flex flex-col justify-between items-start p-8 w-full h-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative z-10">
                                        <div className="group-hover:rotate-6 bg-gradient-to-br from-blue-400 to-purple-600 shadow-lg mb-8 rounded-2xl w-20 h-20 transform transition-all duration-300 rotate-3">
                                            <process.icon strokeWidth={1.5} className="group-hover:-rotate-6 p-4 w-full h-full text-white transform transition-all duration-300 -rotate-3" />
                                        </div>
                                        <div className="relative flex flex-col items-start">
                                            <span className="group-hover:scale-110 -top-6 right-0 absolute flex justify-center items-center border-4 bg-white dark:bg-gray-800 shadow-xl border-blue-500 rounded-full w-16 h-16 font-bold text-3xl text-blue-600 dark:text-blue-400 transform transition-all duration-300">
                                                {id + 1}
                                            </span>
                                            <h3 className="group-hover:text-4xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-6 mb-4 font-extrabold text-3xl text-transparent transition-all duration-300">
                                                {process.title}
                                            </h3>
                                            <p className="group-hover:text-xl mt-2 text-gray-700 text-lg dark:text-gray-300 leading-relaxed transition-all duration-300">
                                                {process.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="relative bg-gradient-to-r from-blue-500 hover:from-purple-600 to-purple-600 hover:to-blue-500 shadow-lg hover:shadow-xl mt-8 px-6 py-3 rounded-full font-bold text-white transform hover:scale-105 transition-all duration-300 overflow-hidden group" asChild>
                                        <Link href="/dashboard" className="flex items-center">
                                            Learn More
                                            <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
                                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300"></span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                                        </Link>
                                    </Button>
                                </div>
                                <div className="group-hover:scale-x-100 bottom-0 left-0 absolute bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full h-1 transform transition-transform duration-500 scale-x-0"></div>
                            </MagicCard>
                        </AnimationContainer>
                    ))}
                </div>
            </MaxWidthWrapper>

            <Suspense fallback={<div>Loading...</div>}>
                <Services />
            </Suspense>

            {/* Pricing Section */}
            <MaxWidthWrapper className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-transparent opacity-30 blur-3xl"></div>
                <AnimationContainer delay={0.1}>
                    <div className="relative z-10 flex flex-col justify-center items-center lg:items-center mx-auto py-8 w-full max-w-2xl">
                        <MagicBadge title="Flexible Pricing" />
                        <h2 className="bg-clip-text bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 mt-6 mb-8 font-bold font-heading text-4xl text-center text-transparent md:text-6xl lg:text-center !leading-[1.1] tracking-tight">
                            Choose a plan tailored to your research needs
                        </h2>
                        <p className="mt-4 mb-16 max-w-lg text-2xl text-center text-gray-400 lg:text-center dark:text-gray-300">
                            Start leveraging our AI-powered healthcare research platform today with plans designed for every scale of operation.
                        </p>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2}>
                    <Pricing />
                    <FAQS/>
                </AnimationContainer>
          
                <AnimationContainer delay={0.3}>
                    <div className="relative z-10 flex flex-wrap justify-center lg:justify-evenly items-start md:items-center gap-6 mx-auto mt-12 w-full max-w-5xl">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 shadow-lg p-3 rounded-full">
                            <CreditCardIcon className="w-5 h-5 text-purple-500" />
                            <span className="bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium text-3xl text-transparent">
                                No credit card required
                            </span>
                        </div>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>

            {/* Reviews Section */}
            <MaxWidthWrapper className="relative py-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-30 blur-3xl"></div>
                <AnimationContainer delay={0.1}>
                    <div className="relative z-10 flex flex-col justify-center items-center lg:items-center mx-auto py-8 w-full max-w-xl">
                        <MagicBadge title="Our Customers" />
                        <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-6 font-bold font-heading text-4xl text-center text-transparent md:text-6xl lg:text-center !leading-[1.1] tracking-tight">
                            What our users are saying
                        </h2>
                        <p className="mt-4 max-w-lg text-3xl text-center text-gray-400 lg:text-center">
                            Here&apos;s what some of our users have to say about <span className="bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-600 text-transparent">bionexus</span>
                        </p>
                    </div>
                </AnimationContainer>
                <div className="relative z-10 place-items-start gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
                    <div className="flex flex-col items-start gap-6 h-min">
                        {REVIEWS.slice(0, 3).map((review, index) => (
                            <AnimationContainer delay={0.2 * index} key={index}>
                                <MagicCard key={index} className="bg-gradient-to-br from-blue-700/30 to-blue-900/30 shadow-xl hover:shadow-2xl backdrop-blur-lg md:p-0 ring-1 ring-violet-500 hover:scale-105 transition-all duration-300">
                                    <Card className="flex flex-col bg-transparent border-none w-full h-min">
                                        <CardHeader className="space-y-0">
                                            <CardTitle className="bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-lg text-transparent">
                                                {review.name}
                                            </CardTitle>
                                            <CardDescription className="text-gray-500">
                                                {review.username}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pb-4">
                                            <p className="text-gray-600">
                                                {review.review}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="space-x-1 mt-auto w-full">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <StarIcon key={i} className="drop-shadow-md fill-yellow-500 w-4 h-4 text-yellow-500" />
                                            ))}
                                        </CardFooter>
                                    </Card>
                                </MagicCard>
                            </AnimationContainer>
                        ))}
                    </div>
                    <div className="flex flex-col items-start gap-6 h-min">
                        {REVIEWS.slice(3, 6).map((review, index) => (
                            <AnimationContainer delay={0.2 * index} key={index}>
                                <MagicCard key={index} className="bg-gradient-to-br from-white/5 to-white/10 shadow-xl hover:shadow-2xl backdrop-blur-lg md:p-0 ring-1 ring-white/20 hover:scale-105 transition-all duration-300">
                                    <Card className="flex flex-col bg-transparent border-none w-full h-min">
                                        <CardHeader className="space-y-0">
                                            <CardTitle className="bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-lg text-transparent">
                                                {review.name}
                                            </CardTitle>
                                            <CardDescription className="text-gray-500">
                                                {review.username}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pb-4">
                                            <p className="text-gray-600">
                                                {review.review}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="space-x-1 mt-auto w-full">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <StarIcon key={i} className="fill-yellow-500 w-4 h-4 text-yellow-500" />
                                            ))}
                                        </CardFooter>
                                    </Card>
                                </MagicCard>
                            </AnimationContainer>
                        ))}
                    </div>
                    <div className="flex flex-col items-start gap-6 h-min">
                        {REVIEWS.slice(6, 9).map((review, index) => (
                            <AnimationContainer delay={0.2 * index} key={index}>
                                 <MagicCard key={index} className="bg-gradient-to-br from-white/5 to-white/10 shadow-xl hover:shadow-2xl backdrop-blur-lg md:p-0 ring-1 ring-white/20 hover:scale-105 transition-all duration-300">
                                    <Card className="flex flex-col bg-transparent border-none w-full h-min">
                                        <CardHeader className="space-y-0">
                                            <CardTitle className="bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-pink-600 font-bold text-lg text-transparent">
                                                {review.name}
                                            </CardTitle>
                                            <CardDescription className="text-gray-500">
                                                {review.username}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pb-4">
                                            <p className="text-gray-600">
                                                {review.review}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="space-x-1 mt-auto w-full">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <StarIcon key={i} className="fill-yellow-500 w-4 h-4 text-yellow-500" />
                                            ))}
                                        </CardFooter>
                                    </Card>
                                </MagicCard>
                          
                            </AnimationContainer>
                        
                        ))}
                    </div>
                </div>
            </MaxWidthWrapper>
            <Offerings/>

                <AnimationContainer delay={0.1}>
                <LampDemo/>
                    <Link href="/dashboard">
                                <Button className="flex justify-center relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 focus:ring-opacity-50 shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:shadow-[0_0_25px_rgba(255,0,255,0.8)] backdrop-blur-sm backdrop-filter mt-6 px-10 py-5 rounded-full focus:ring-4 focus:ring-pink-500 font-bold text-white transform transition-all duration-300 overflow-hidden hover:scale-110 hover:rotate-2 focus:outline-none group">
                                    <span className="relative z-10 flex justify-center items-center">
                                        <span className="mr-3 font-extrabold text-xl tracking-wider">Start your research journey</span>
                                        <ArrowRightIcon className="w-8 h-8 animate-pulse" />
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-75 blur-md rounded-full"></span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-75 blur-lg rounded-full transition-opacity duration-300"></span>
                                    <span className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-50 blur rounded-full transition-opacity duration-300"></span>
                                    <span className="absolute inset-0 border-2 border-white border-opacity-50 rounded-full"></span>
                                    <span className="absolute inset-0 border-2 border-white border-opacity-20 rounded-full animate-ping"></span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    <span className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] absolute inset-0 from-purple-900 via-purple-900 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
                                    <span className="absolute inset-0 border-4 border-purple-500 opacity-0 group-hover:opacity-100 rounded-full transition-opacity animate-pulse duration-300"></span>
                                    <span className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-300 group-hover:duration-200"></span>
                                    <span className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="bg-white rounded-full w-2 h-2 animate-ping"></span>
                                    </span>
                                </Button>
                            </Link>
                </AnimationContainer>
        </div>
    )
};

export default Homepage
