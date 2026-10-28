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
            className="inline-flex items-center fixed bottom-8 right-8 z-50 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
            id="whatsapp-button"
            aria-label={u.whatsapp.aria}
            whileHover={{ scale: 1.05, y: -4, rotate: -6 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            <div className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.35)]">
                <WhatsAppIcon className="h-[30px] w-[30px]" />
            </div>
        </motion.a>
    );
}
