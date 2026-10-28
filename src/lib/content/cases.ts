import type { Language } from "@/lib/i18n/dictionary";
import { casesEn } from "./cases.en";

export interface CaseStudy {
  slug: string;
  industry: string;
  title: string;
  summary: string;
  size: string;
  duration: string;
  tags: string[];
  solutionSlug: string;
  about: string;
  needs: string[];
  work: { title: string; description: string }[];
  results: { label: string; value: string }[];
  testimonial: { quote: string; role: string };
}

/**
 * Casos propios de CloudBit (anonimizados).
 * Antes de publicar con nombre de cliente, confirmar autorización con cada uno.
 */
export const cases: CaseStudy[] = [
  {
    slug: "fintech-migracion-aws",
    industry: "Fintech",
    title: "Una fintech que dejó el datacenter y escaló sin sobresaltos en su temporada alta",
    summary: "Migración completa a AWS con Kubernetes, CI/CD y observabilidad para soportar picos de tráfico.",
    size: "50-200 empleados",
    duration: "8 semanas",
    tags: ["AWS", "Kubernetes", "CI/CD", "Terraform"],
    solutionSlug: "migracion-cloud",
    about:
      "Plataforma de pagos digitales para comercios con operación en varias provincias. Su infraestructura on-premise había crecido por agregación y cada pico comercial exigía compras de hardware con meses de anticipación.",
    needs: [
      "Soportar picos de tráfico de hasta tres veces la demanda habitual",
      "Reducir deploys manuales que demoraban entre 4 y 6 horas",
      "Bajar el costo fijo de mantener servidores propios",
      "Mejorar la visibilidad ante incidentes en producción",
    ],
    work: [
      { title: "Landing zone en AWS", description: "Cuentas separadas por ambiente, redes privadas y guardrails definidos con Terraform." },
      { title: "Plataforma de contenedores", description: "Servicios migrados a EKS con autoescalado y bases en RDS y ElastiCache." },
      { title: "Entrega continua", description: "Pipelines en GitLab y despliegue declarativo con ArgoCD." },
      { title: "Observabilidad", description: "Prometheus, Grafana y alertas accionables por servicio." },
    ],
    results: [
      { label: "Costos de infraestructura", value: "-35%" },
      { label: "Tiempo de deploy", value: "6h → 15min" },
      { label: "Capacidad en picos", value: "3x" },
      { label: "Tiempo de recuperación", value: "<5min" },
    ],
    testimonial: {
      quote: "La migración fue impecable. Redujimos costos y ahora podemos escalar sin pedir hardware con meses de anticipación.",
      role: "CTO, fintech de pagos",
    },
  },
  {
    slug: "saas-b2b-entrega-continua",
    industry: "SaaS B2B",
    title: "Un SaaS B2B que pasó de un deploy por semana a quince por día",
    summary: "Pipelines CI/CD, GitOps y observabilidad full-stack para un equipo de producto sobrecargado.",
    size: "20-50 empleados",
    duration: "6 semanas",
    tags: ["DevOps", "GitOps", "Observabilidad"],
    solutionSlug: "automatizacion-devops",
    about:
      "Software de gestión para empresas medianas con clientes en Latinoamérica. El equipo técnico era chico y cada publicación implicaba coordinar personas, horarios y pasos manuales.",
    needs: [
      "Eliminar los pasos manuales del proceso de publicación",
      "Detectar errores antes de que llegaran a los clientes",
      "Liberar al equipo de tareas operativas repetitivas",
      "Tener visibilidad de punta a punta ante fallas",
    ],
    work: [
      { title: "Pipelines CI/CD", description: "Build, pruebas y empaquetado automáticos para cada servicio." },
      { title: "GitOps", description: "Despliegues declarativos con ArgoCD y promoción entre ambientes por pull request." },
      { title: "Observabilidad full-stack", description: "Logs, métricas y trazas correlacionados con OpenTelemetry." },
      { title: "Capacitación", description: "Sesiones prácticas para que el equipo opere y extienda la plataforma." },
    ],
    results: [
      { label: "Frecuencia de deploy", value: "15/día" },
      { label: "Tasa de fallas", value: "-80%" },
      { label: "Tiempo de recuperación", value: "2h → 10min" },
      { label: "Tiempo para features", value: "+40%" },
    ],
    testimonial: {
      quote: "Pasamos de deploys estresantes a entregas continuas sin fricción. Hoy el equipo se enfoca en el producto.",
      role: "Head of Engineering, SaaS B2B",
    },
  },
  {
    slug: "ecommerce-devsecops-pci",
    industry: "E-commerce",
    title: "Un e-commerce que cerró 47 vulnerabilidades y certificó PCI-DSS en tres meses",
    summary: "DevSecOps, arquitectura cloud-native y seguridad perimetral para cumplir PCI-DSS Level 1.",
    size: "100-500 empleados",
    duration: "12 semanas",
    tags: ["DevSecOps", "Seguridad", "PCI-DSS", "AWS"],
    solutionSlug: "automatizacion-devops",
    about:
      "Retailer con tienda online de alto tráfico. Una auditoría externa detectó vulnerabilidades críticas y la falta de controles exigidos por las marcas de tarjetas.",
    needs: [
      "Corregir las vulnerabilidades detectadas en la auditoría",
      "Cumplir los controles PCI-DSS en el plazo comprometido",
      "Evitar que nuevas vulnerabilidades llegaran a producción",
      "Escalar la tienda en fechas especiales",
    ],
    work: [
      { title: "Seguridad en el pipeline", description: "Escaneo de código, dependencias e imágenes en cada cambio." },
      { title: "Arquitectura cloud-native", description: "Segmentación de redes y servicios gestionados en AWS." },
      { title: "Protección perimetral", description: "WAF, protección DDoS y gestión centralizada de secretos." },
      { title: "Acompañamiento PCI", description: "Evidencias, políticas y controles listos para la auditoría." },
    ],
    results: [
      { label: "Vulnerabilidades críticas", value: "47 → 0" },
      { label: "Certificación PCI-DSS", value: "3 meses" },
      { label: "Disponibilidad", value: "99.97%" },
      { label: "Ahorro anual", value: "-28%" },
    ],
    testimonial: {
      quote: "El enfoque en seguridad desde el diseño nos permitió certificar en tiempo récord sin frenar las ventas.",
      role: "Gerente de Tecnología, retail",
    },
  },
];

const casesByLanguage: Record<Language, CaseStudy[]> = { es: cases, en: casesEn };

export function getCases(lang: Language) {
  return casesByLanguage[lang];
}

export function getCase(slug: string, lang: Language = "es") {
  return casesByLanguage[lang].find((item) => item.slug === slug);
}
