"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn, premiumSpring } from "@/components/ui/fade-in";

interface Message {
    role: "user" | "ai";
    content: string;
}

export function GenkitDemoModern() {
    const { t, u, language } = useLanguage();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [waitingForEmail, setWaitingForEmail] = React.useState(false);

    // Prompts sugeridos interactivos
    const suggestedPrompts = language === "es"
        ? [
            "¿Cómo optimizar costos cloud?",
            "¿Qué es DevOps?",
            "Servicios de networking",
            "Consultoría tecnológica",
        ]
        : [
            "How to optimize cloud costs?",
            "What is DevOps?",
            "Networking services",
            "Technology consulting",
        ];

    // Initialize chat with welcome message
    React.useEffect(() => {
        setMessages([{ role: "ai", content: t.genkit.initialMessage }]);
        setWaitingForEmail(false);
    }, [language, t.genkit.initialMessage]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            let response = t.genkit.responses.default;
            let shouldAskEmail = false;

            if (waitingForEmail) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(userMessage)) {
                    response = t.genkit.responses.emailReceived;
                    setWaitingForEmail(false);
                } else {
                    response = t.genkit.responses.invalidEmail;
                }
            } else {
                const lowerMsg = userMessage.toLowerCase();
                const hasKeyword = (keywords: string[]) => keywords.some((k) => lowerMsg.includes(k));

                if (language === "es") {
                    if (hasKeyword(["servicios"])) {
                        response = t.genkit.responses.services;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["cloud", "nube", "aws", "azure"])) {
                        response = t.genkit.responses.cloud;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["precio", "costo", "cotizacion", "presupuesto"])) {
                        response = t.genkit.responses.pricing;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["networking", "redes", "cisco", "asa", "vpn", "firewall"])) {
                        response = t.genkit.responses.networking;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["linux", "ubuntu", "debian", "fedora", "servidor"])) {
                        response = t.genkit.responses.linux;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["virtualizacion", "vmware", "proxmox", "virtual"])) {
                        response = t.genkit.responses.virtualization;
                        shouldAskEmail = true;
                    }
                } else {
                    if (hasKeyword(["services"])) {
                        response = t.genkit.responses.services;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["cloud", "aws", "azure"])) {
                        response = t.genkit.responses.cloud;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["price", "cost", "quote", "budget"])) {
                        response = t.genkit.responses.pricing;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["networking", "network", "cisco", "asa", "vpn", "firewall"])) {
                        response = t.genkit.responses.networking;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["linux", "ubuntu", "debian", "fedora", "server"])) {
                        response = t.genkit.responses.linux;
                        shouldAskEmail = true;
                    } else if (hasKeyword(["virtualization", "vmware", "proxmox", "virtual"])) {
                        response = t.genkit.responses.virtualization;
                        shouldAskEmail = true;
                    }
                }

                if (shouldAskEmail) {
                    setWaitingForEmail(true);
                    response += " " + t.genkit.responses.askEmail;
                }
            }

            setMessages((prev) => [...prev, { role: "ai", content: response }]);
            setIsLoading(false);
        }, 1000);
    };

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
    };

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div aria-hidden="true" className="nb-glow absolute inset-0" />

            <div className="container max-w-5xl relative z-10">
                <FadeIn>
                    <SectionHeader
                        label={u.genkit.label}
                        title={t.genkit.title}
                        description={t.genkit.description}
                    />
                </FadeIn>

                {/* Chat Card */}
                <FadeIn delay={0.1}>
                    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col gap-0 py-0 rounded-3xl border-nb-line bg-nb-dark/80 backdrop-blur-md shadow-[0_30px_80px_rgba(9,93,189,0.18)] overflow-hidden">
                        {/* Header with Status */}
                        <CardHeader className="border-b border-nb-line bg-nb-blue/15 py-4">
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-nb-sky to-nb-blue flex items-center justify-center text-white shadow-lg">
                                            <Bot className="h-6 w-6" />
                                        </div>
                                        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-nb-dark bg-emerald-400" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-white">{t.genkit.botName}</div>
                                        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                                            <Sparkles className="h-3 w-3" />
                                            <span className="font-medium">{u.genkit.online}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>

                        {/* Messages Area */}
                        <CardContent className="flex-1 p-0 overflow-hidden">
                            <ScrollArea className="h-full p-6">
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {messages.map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={premiumSpring}
                                                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                                    }`}
                                            >
                                                <div
                                                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.role === "user"
                                                        ? "bg-gradient-to-br from-nb-sky to-nb-blue text-white"
                                                        : "border border-nb-line bg-white/5 text-nb-sky"
                                                        }`}
                                                >
                                                    {msg.role === "user" ? (
                                                        <User className="h-4 w-4" />
                                                    ) : (
                                                        <Bot className="h-4 w-4" />
                                                    )}
                                                </div>
                                                <motion.div
                                                    className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                                        ? "bg-gradient-to-br from-nb-sky to-nb-blue text-white"
                                                        : "bg-white/5 text-white/90 border border-nb-line"
                                                        }`}
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    {msg.content}
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Loading Animation */}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-3"
                                        >
                                            <div className="h-9 w-9 rounded-full border border-nb-line bg-white/5 flex items-center justify-center shrink-0">
                                                <Bot className="h-4 w-4 text-nb-sky" />
                                            </div>
                                            <div className="rounded-2xl border border-nb-line bg-white/5 px-4 py-3 text-sm text-nb-text">
                                                {u.genkit.typing}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>

                        {/* Suggested Prompts Pills */}
                        <div className="px-4 pb-3 border-t border-nb-line pt-3">
                            <div className="flex flex-wrap gap-2">
                                {suggestedPrompts.map((prompt, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handlePromptClick(prompt)}
                                        className="px-3 py-1.5 text-xs font-medium rounded-full border border-nb-line text-nb-text hover:border-nb-sky/40 hover:bg-nb-sky/10 hover:text-white transition-colors"
                                    >
                                        {prompt}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <CardFooter className="p-4 border-t border-nb-line">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex w-full gap-2"
                            >
                                <Input
                                    placeholder={t.genkit.placeholder}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                    className="flex-1 rounded-full border-nb-line bg-white/5 px-4"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-gradient-to-br from-nb-sky to-nb-blue rounded-full text-white transition-shadow hover:shadow-[0_8px_24px_rgba(66,162,254,0.35)]"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </FadeIn>
            </div>
        </section>
    );
}
