"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, XCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

type FormState = "idle" | "loading" | "success" | "error";

/** Se guarda la clave del error (no el texto) para que cambie con el idioma. */
type ErrorKey = "nameRequired" | "emailRequired" | "emailInvalid";

interface FormData {
    name: string;
    email: string;
    company: string;
    message: string;
}

/**
 * Accessible contact form with real-time validation
 * Implements WCAG 2.1 AA standards with aria attributes and focus management
 */
export function ContactFormInline({ redirectOnSuccess }: { redirectOnSuccess?: string } = {}) {
    const router = useRouter();
    const { u } = useLanguage();
    const f = u.form;
    const [formState, setFormState] = useState<FormState>("idle");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, ErrorKey>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

    // Refs for focus management
    const successMessageRef = useRef<HTMLDivElement>(null);
    const errorMessageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Focus on success/error messages for accessibility
    useEffect(() => {
        if (formState === "success" && successMessageRef.current) {
            successMessageRef.current.focus();
        } else if (formState === "error" && errorMessageRef.current) {
            errorMessageRef.current.focus();
        }
    }, [formState]);

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateField = (field: keyof FormData, value: string): ErrorKey | null => {
        if (field === "name" && !value.trim()) {
            return "nameRequired";
        }
        if (field === "email") {
            if (!value.trim()) {
                return "emailRequired";
            }
            if (!validateEmail(value)) {
                return "emailInvalid";
            }
        }
        return null;
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, ErrorKey>> = {};

        const nameError = validateField("name", formData.name);
        if (nameError) newErrors.name = nameError;

        const emailError = validateField("email", formData.email);
        if (emailError) newErrors.email = emailError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            // Focus on first error field
            const firstErrorField = Object.keys(errors)[0] as keyof FormData;
            const errorElement = formRef.current?.querySelector(`#${firstErrorField}`) as HTMLInputElement;
            errorElement?.focus();
            return;
        }

        setFormState("loading");

        try {
            const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, website: honeypot }),
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            if (redirectOnSuccess) {
                router.push(redirectOnSuccess);
                return;
            }
            setFormState("success");
        } catch (error) {
            setFormState("error");
            console.error("Error al enviar formulario:", error);
        }
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Real-time validation if field was touched
        if (touched[field]) {
            const error = validateField(field, value);
            setErrors((prev) => {
                const newErrors = { ...prev };
                if (error) {
                    newErrors[field] = error;
                } else {
                    delete newErrors[field];
                }
                return newErrors;
            });
        }
    };

    const handleBlur = (field: keyof FormData) => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        // Validate on blur
        const error = validateField(field, formData[field]);
        setErrors((prev) => {
            const newErrors = { ...prev };
            if (error) {
                newErrors[field] = error;
            } else {
                delete newErrors[field];
            }
            return newErrors;
        });
    };

    if (formState === "success") {
        return (
            <div
                ref={successMessageRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="text-center py-10 focus:outline-none"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nb-sky/10 mb-6">
                    <CheckCircle2 className="w-8 h-8 text-nb-sky" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.successTitle}</h3>
                <p className="text-nb-text mb-8">{f.successText(formData.name, formData.email)}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <GradientButton variant="gradient" href="https://wa.me/5491169044913">
                        {f.whatsapp}
                    </GradientButton>
                </div>
            </div>
        );
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5"
            aria-busy={formState === "loading"}
            noValidate
        >
            {/* Honeypot antispam: invisible para personas, los bots suelen completarlo */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                        {f.name} <span className="text-red-400" aria-label={f.required}>*</span>
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder={f.namePlaceholder}
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={errors.name ? "border-red-400" : ""}
                        disabled={formState === "loading"}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                        <div id="name-error" role="alert" className="flex items-start gap-2 text-sm text-red-400">
                            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{f[errors.name]}</span>
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                        {f.email} <span className="text-red-400" aria-label={f.required}>*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder={f.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={errors.email ? "border-red-400" : ""}
                        disabled={formState === "loading"}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <div id="email-error" role="alert" className="flex items-start gap-2 text-sm text-red-400">
                            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{f[errors.email]}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Empresa */}
            <div className="space-y-2">
                <Label htmlFor="company" className="text-white font-medium">
                    {f.company} <span className="text-nb-text text-sm">{f.optional}</span>
                </Label>
                <Input
                    id="company"
                    type="text"
                    placeholder={f.companyPlaceholder}
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    disabled={formState === "loading"}
                />
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
                <Label htmlFor="message" className="text-white font-medium">
                    {f.message} <span className="text-nb-text text-sm">{f.optional}</span>
                </Label>
                <Textarea
                    id="message"
                    placeholder={f.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    disabled={formState === "loading"}
                    rows={4}
                    className="resize-none"
                />
            </div>

            {/* Error state with icon and role="alert" */}
            {formState === "error" && (
                <div
                    ref={errorMessageRef}
                    tabIndex={-1}
                    role="alert"
                    aria-live="assertive"
                    className="p-4 rounded-lg bg-red-400/10 border border-red-400/30 focus:outline-none"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="text-sm font-semibold text-red-400 mb-1">{f.errorTitle}</p>
                            <p className="text-sm text-nb-text">{f.errorText}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit button with loading state */}
            <GradientButton
                variant="gradient"
                type="submit"
                disabled={formState === "loading"}
                className="w-full h-12"
            >
                {formState === "loading" ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>{f.sending}</span>
                        <span className="sr-only">{f.sendingSr}</span>
                    </>
                ) : (
                    f.submit
                )}
            </GradientButton>

            <p className="text-xs text-center text-nb-text">
                {f.privacy} <br />
                <span className="text-nb-sky">✓</span> {f.responseTime}
            </p>
        </form>
    );
}
