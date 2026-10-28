"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

export function WhatsAppButton() {
    const { u } = useLanguage();
    return (
        <motion.a
            href="https://wa.me/5491169044913"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-50 inline-flex items-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 sm:bottom-6 sm:right-6"
            id="whatsapp-button"
            aria-label={u.whatsapp.aria}
            whileHover={{ scale: 1.05, y: -4, rotate: -6 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            {/* 44px en celular (área táctil mínima recomendada por Apple) y 48px en escritorio */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.35)] sm:h-12 sm:w-12">
                <WhatsAppIcon className="h-[22px] w-[22px] sm:h-6 sm:w-6" />
            </div>
        </motion.a>
    );
}
