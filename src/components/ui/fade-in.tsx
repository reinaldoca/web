"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Transition, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** Resorte "material premium" del proyecto (ver CLAUDE.md). */
export const premiumSpring: Transition = { type: "spring", stiffness: 120, damping: 20 };

interface FadeInProps extends HTMLMotionProps<"div"> {
    delay?: number;
    /** Desplazamiento vertical inicial en px. */
    offset?: number;
}

/**
 * Entrada al hacer scroll: opacidad 0 → 1 y desplazamiento hacia arriba.
 * Equivalente al `.fade-in` + ScrollTrigger de la referencia, pero con whileInView.
 */
export function FadeIn({ delay = 0, offset = 30, className, children, ...props }: FadeInProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: offset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ ...premiumSpring, delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: premiumSpring },
};

interface StaggerProps extends HTMLMotionProps<"div"> {
    /** Animar al montar (hero) en lugar de al entrar en el viewport. */
    onMount?: boolean;
}

/** Contenedor que revela a sus <StaggerItem> en secuencia. */
export function Stagger({ onMount = false, className, children, ...props }: StaggerProps) {
    const reduceMotion = useReducedMotion();
    const trigger = onMount
        ? { animate: "visible" as const }
        : { whileInView: "visible" as const, viewport: { once: true, margin: "0px 0px -15% 0px" } };

    return (
        <motion.div
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            {...trigger}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ className, children, ...props }: HTMLMotionProps<"div">) {
    return (
        <motion.div variants={staggerItem} className={cn(className)} {...props}>
            {children}
        </motion.div>
    );
}
