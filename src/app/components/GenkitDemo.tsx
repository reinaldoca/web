"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface Message {
    role: "user" | "ai";
    content: string;
}

export function GenkitDemo() {
    const { t, language } = useLanguage();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [waitingForEmail, setWaitingForEmail] = React.useState(false);

    // Initialize chat with welcome message when language changes
    React.useEffect(() => {
        setMessages([
            { role: "ai", content: t.genkit.initialMessage },
        ]);
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

                // Helper to check keywords
                const hasKeyword = (keywords: string[]) => keywords.some(k => lowerMsg.includes(k));

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
                    // We'll send the response first, then the email question in the same bubble for simplicity
                    // or we could trigger another message. Let's append for now.
                    response += " " + t.genkit.responses.askEmail;
                }
            }

            setMessages((prev) => [...prev, { role: "ai", content: response }]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <section className="py-16 bg-muted/30">
            <div className="container max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">{t.genkit.title}</h2>
                    <p className="text-muted-foreground">
                        {t.genkit.description}
                    </p>
                </div>

                <Card className="w-full max-w-md mx-auto h-[500px] flex flex-col shadow-xl">
                    <CardHeader className="border-b bg-primary/5">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Bot className="h-5 w-5 text-primary" />
                            {t.genkit.botName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4">
                            <div className="space-y-4">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                            }`}
                                    >
                                        <div
                                            className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                                }`}
                                        >
                                            {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                        </div>
                                        <div
                                            className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${msg.role === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                            <Bot className="h-4 w-4" />
                                        </div>
                                        <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                                            {t.genkit.loading}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t">
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
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
}
