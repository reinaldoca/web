"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, XCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

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
export function ContactFormInline() {
    const [formState, setFormState] = useState<FormState>("idle");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
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

    const validateField = (field: keyof FormData, value: string): string | null => {
        if (field === "name" && !value.trim()) {
            return "El nombre es obligatorio";
        }
        if (field === "email") {
            if (!value.trim()) {
                return "El email es obligatorio";
            }
            if (!validateEmail(value)) {
                return "Email inválido (ejemplo: nombre@empresa.com)";
            }
        }
        return null;
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

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
            // Simular envío (reemplazar con Server Action o API Route real)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // TODO: Implementar envío real
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });

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
                className="max-w-2xl mx-auto text-center py-12 focus:outline-none"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3FB950]/10 mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#3FB950]" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#24292F] mb-4">
                    ✓ DEPLOYMENT_SUCCESSFUL
                </h3>
                <p className="text-[#57606A] mb-8">
                    Gracias {formData.name}. Te contactaremos a {formData.email} en menos de 24 horas hábiles.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <GradientButton
                        variant="gradient"
                        href="https://wa.me/5491169044913"
                    >
                        Escribinos por WhatsApp
                    </GradientButton>
                </div>
            </div>
        );
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-6"
            aria-busy={formState === "loading"}
            noValidate
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#24292F] font-medium">
                        Nombre <span className="text-[#F85149]" aria-label="requerido">*</span>
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={errors.name ? "border-[#F85149]" : ""}
                        disabled={formState === "loading"}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                        <div id="name-error" role="alert" className="flex items-start gap-2 text-sm text-[#F85149]">
                            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{errors.name}</span>
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#24292F] font-medium">
                        Email <span className="text-[#F85149]" aria-label="requerido">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="tu@empresa.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={errors.email ? "border-[#F85149]" : ""}
                        disabled={formState === "loading"}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <div id="email-error" role="alert" className="flex items-start gap-2 text-sm text-[#F85149]">
                            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{errors.email}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Empresa */}
            <div className="space-y-2">
                <Label htmlFor="company" className="text-[#24292F] font-medium">
                    Empresa <span className="text-[#8B949E] text-sm">(opcional)</span>
                </Label>
                <Input
                    id="company"
                    type="text"
                    placeholder="Nombre de tu empresa"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    disabled={formState === "loading"}
                />
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
                <Label htmlFor="message" className="text-[#24292F] font-medium">
                    ¿Qué necesitás? <span className="text-[#8B949E] text-sm">(opcional)</span>
                </Label>
                <Textarea
                    id="message"
                    placeholder="Contanos brevemente qué desafío técnico querés resolver..."
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
                    className="p-4 rounded-lg bg-[#F85149]/10 border border-[#F85149]/30 focus:outline-none"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-[#F85149] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="font-mono text-sm font-semibold text-[#F85149] mb-1">
                                ERROR: DEPLOYMENT_FAILED
                            </p>
                            <p className="text-sm text-[#57606A]">
                                Hubo un error al enviar el formulario. Por favor, intentá nuevamente o contactanos por WhatsApp.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit button with loading state */}
            <GradientButton
                variant="gradient"
                disabled={formState === "loading"}
                className="w-full"
            >
                {formState === "loading" ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Enviando...</span>
                        <span className="sr-only">Procesando su solicitud</span>
                    </>
                ) : (
                    "Solicitar diagnóstico gratuito"
                )}
            </GradientButton>

            <p className="text-sm text-center text-[#8B949E] font-mono">
                Al enviar aceptás nuestra política de privacidad. <br />
                <span className="text-[#3FB950]">✓</span> Respuesta en menos de 24 horas hábiles.
            </p>
        </form>
    );
}
