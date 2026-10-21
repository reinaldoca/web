"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
    textToCopy: string;
    className?: string;
    label?: string;
}

/**
 * Botón para copiar texto con feedback visual
 * Inspirado en web de recursos educativos
 */
export function CopyButton({ textToCopy, className, label = "Copiar" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Error al copiar:", err);
        }
    };

    return (
        <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative inline-flex items-center gap-2 px-4 py-2",
                "rounded-lg font-medium text-sm",
                "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]",
                "text-white",
                "hover:shadow-lg hover:shadow-purple-500/30",
                "transition-all duration-300",
                "overflow-hidden",
                className
            )}
        >
            {/* Background pulse en copia exitosa */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-green-400 rounded-lg"
                    />
                )}
            </AnimatePresence>

            {/* Contenido */}
            <span className="relative z-10">{label}</span>

            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="relative z-10"
                    >
                        <Check className="w-4 h-4" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="relative z-10"
                    >
                        <Copy className="w-4 h-4" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
