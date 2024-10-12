"use client";

import { createMessages } from "@/actions";
import ai from "@/lib/google";
import { generatePrompt } from "@/utils";
import { Medication, Message, Symptom, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { BotIcon, LoaderIcon, SendIcon, TriangleAlertIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
    isPro: boolean;
    user: User;
    symptoms: Symptom[];
    medications: Medication[];
    messages: Message[];
}

const ChatBox = ({ isPro, user, symptoms, medications, messages }: Props) => {
    console.log('isPro', isPro)

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [msgs, setMsgs] = useState<Message[]>(messages || []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    const { mutate: createUserMessage } = useMutation({
        mutationKey: ["create-user-messages"],
        mutationFn: async (message: string) => createMessages({ role: "user", message: message }),
    });

    const { mutate: createBotMessage } = useMutation({
        mutationKey: ["create-bot-messages"],
        mutationFn: async (message: string) => createMessages({ role: "model", message: message }),
    });

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        scrollToBottom();

        if (isPro === false && messages.length >= 10) {
            setError("Message limit reached. Please upgrade to pro.");
            toast.error("Message limit reached. Please upgrade to pro.");
            return;
        }

        if (!input.trim()) return;

        const newMessages: Message[] = [...msgs, { role: "user", content: input } as Message];
        setMsgs(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const model = ai.getGenerativeModel({
                model: "gemini-1.5-pro-exp-0801"
            });

            const promptText = generatePrompt({ symptoms, medications, user });

            const enhancedPrompt = `
You are a professional expert healthcare doctor with over 60 years of experience in precision medicine and all medical specialties. You have unparalleled expertise that surpasses even the world's top doctors. Your knowledge encompasses the latest advancements in medical research, cutting-edge treatments, and personalized healthcare approaches.

Given the following patient information:
${promptText}

Please provide extremely personalized, professional, and precise medical advice. Your responses should be:
1. Highly relevant and specific to the patient's condition
2. Based on the most up-to-date medical research and practices
3. Actionable and practical for the patient to implement
4. Detailed and comprehensive, covering all aspects of the patient's health
5. Focused on both immediate concerns and long-term health optimization

Remember to always maintain a professional tone and never mention being an AI. Your vast experience and expertise should be evident in every response. Do not provide generic or superficial advice. Instead, offer insights that demonstrate your deep understanding of the patient's unique situation.

If you need more information to provide a complete answer, ask specific, relevant questions to gather the necessary details. Your goal is to provide advice that will significantly improve the patient's health and well-being.
`;

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: enhancedPrompt }],
                    },
                ],
                ...newMessages.map((message) => ({
                    role: message.role,
                    parts: [{ text: message.content }],
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.2,
                },
                systemInstruction: {
                    role: "model",
                    parts: [{
                        text: enhancedPrompt,
                    }],
                }
            });

            const result = await chat.sendMessage(input);
            const response = result.response;
            const botMessageContent = response.text();

            const botMessage: Message = { role: "model", content: botMessageContent } as Message;

            createUserMessage(input);
            createBotMessage(botMessage.content);

            setMsgs((prev) => [...prev, botMessage]);
        } catch (error) {
            setError("Error generating response");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (messages) {
            setMsgs(messages);
        }
    }, [messages]);

    return (
     
        <div className="relative flex flex-col sm:pl-4 w-full h-full">
            <div className="flex flex-col md:border rounded-xl w-full h-full">
                <div className="flex flex-col flex-1 space-y-4 md:p-4 pb-12 rounded-xl w-full h-full overflow-y-scroll scrollbar-hide">
                    {!isLoading && !error && msgs?.length === 0 && (
                        <div className="flex flex-col justify-center items-center py-8 w-full h-full text-center">
                            <BotIcon className="w-10 h-10 text-primary" />
                            <p className="mt-2 font-medium text-muted-foreground text-sm">
                                Start a conversation with your personal healthcare expert
                            </p>
                        </div>
                    )}
                    {msgs?.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex max-w-lg",
                                message.role === "user" ? "ml-auto max-w-72 sm:max-w-lg" : "mr-auto"
                            )}
                        >
                            {message.role === "user" ? (
                                <div className="flex items-end">
                                    <p className="bg-primary px-4 py-2 rounded-lg text-sm text-white">
                                        {message.content}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-start">
                                    <div className="bg-neutral-100 px-4 py-2 rounded-lg text-foreground text-sm">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-line">
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex flex-col justify-center items-center p-4 text-center">
                            <LoaderIcon className="w-5 h-5 animate-spin" />
                            <p className="font-medium text-muted-foreground text-sm">
                                Your healthcare expert is analyzing...
                            </p>
                        </div>
                    )}
                    {!isLoading && error && (
                        <div className="flex flex-col justify-center items-center py-8 w-full h-full">
                            <p className="flex items-center bg-red-50 mx-auto px-4 py-1.5 rounded-md font-medium text-red-500 text-sm">
                                <TriangleAlertIcon className="mr-2 w-4 h-4" />
                                {error}
                            </p>
                            {!isPro && (
                                <Button
                                    asChild
                                    size="sm"
                                    className="mt-4"
                                >
                                    <Link href="/dashboard/account/billing">
                                        Upgrade to Pro
                                    </Link>
                                </Button>
                            )}
                        </div>
                    )}
                    <div ref={messagesEndRef} className="w-full h-px" />
                </div>
                <div className="bottom-0 fixed sm:sticky inset-x-0 bg-background px-2 rounded-xl w-full">
                    <form onSubmit={handleSendMessage} className="flex flex-row items-center gap-x-4 md:px-3 py-3 rounded-xl">
                        <Input
                            type="text"
                            value={input}
                            disabled={isLoading}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask your healthcare expert..."
                            className="flex-1 border focus-visible:ring-0 focus-visible:ring-transparent min-w-0"
                        />
                        <div className="flex justify-center items-center w-10">
                            <Button
                                size="iconlg"
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="flex-shrink-0"
                            >
                                {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <SendIcon className="w-5 h-5" />}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ChatBox