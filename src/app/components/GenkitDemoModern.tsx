"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "ai";
    content: string;
}

export function GenkitDemoModern() {
    const { t, language } = useLanguage();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOnline, setIsOnline] = React.useState(true);
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
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
            <motion.div
                className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="container max-w-5xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-sm font-semibold text-[#0052CC] uppercase tracking-wider px-4 py-2 rounded-full bg-[#0052CC]/10 backdrop-blur-sm inline-block mb-6">
                        Asistente Inteligente
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                        {t.genkit.title}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.genkit.description}</p>
                </motion.div>

                {/* Chat Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col shadow-2xl border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden">
                        {/* Header with Status */}
                        <CardHeader className="border-b bg-gradient-to-r from-[#0052CC]/5 to-blue-500/5 backdrop-blur-sm">
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0052CC] to-blue-600 flex items-center justify-center text-white shadow-lg">
                                            <Bot className="h-6 w-6" />
                                        </div>
                                        {/* Pulse indicator */}
                                        {isOnline && (
                                            <motion.div
                                                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-slate-900">{t.genkit.botName}</div>
                                        <motion.div
                                            className="flex items-center gap-1.5 text-xs text-green-600"
                                            animate={{ opacity: [0.7, 1, 0.7] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Sparkles className="h-3 w-3" />
                                            <span className="font-medium">En línea</span>
                                        </motion.div>
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
                                                transition={{ duration: 0.3 }}
                                                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                                    }`}
                                            >
                                                <div
                                                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.role === "user"
                                                        ? "bg-gradient-to-br from-[#0052CC] to-blue-600 text-white"
                                                        : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700"
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
                                                        ? "bg-gradient-to-br from-[#0052CC] to-blue-600 text-white"
                                                        : "bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 border border-slate-200/50"
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
                                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0">
                                                <Bot className="h-4 w-4 text-slate-700" />
                                            </div>
                                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl px-4 py-3 text-sm border border-slate-200/50 flex gap-1">
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                                >
                                                    ●
                                                </motion.span>
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                >
                                                    ●
                                                </motion.span>
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                >
                                                    ●
                                                </motion.span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>

                        {/* Suggested Prompts Pills */}
                        <div className="px-4 pb-3 border-t border-slate-100 pt-3 bg-slate-50/50">
                            <div className="flex flex-wrap gap-2">
                                {suggestedPrompts.map((prompt, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handlePromptClick(prompt)}
                                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#0052CC]/10 hover:border-[#0052CC]/30 hover:text-[#0052CC] transition-all shadow-sm"
                                    >
                                        {prompt}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <CardFooter className="p-4 border-t bg-white">
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
                                    className="flex-1 border-slate-200 focus:border-[#0052CC] focus:ring-[#0052CC]/20"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-gradient-to-br from-[#0052CC] to-blue-600 hover:from-[#0052CC]/90 hover:to-blue-700 transition-all hover:scale-105 shadow-lg"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
