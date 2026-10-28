import { Cloud, Workflow, Headset, BrainCircuit, type LucideIcon } from "lucide-react";
import type { Language } from "@/lib/i18n/dictionary";
import { solutionsEn } from "./solutions.en";

export interface Solution {
  slug: string;
  title: string;
  /** Frase corta para menús y cards. */
  tagline: string;
  intro: string;
  icon: LucideIcon;
  /** Síntomas que el visitante marca en el checklist interactivo. */
  signals: string[];
  benefits: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  relatedServiceIds: string[];
  quote: string;
  stages: { name: string; deliverables: string[] }[];
}

/** Versión en español; también la usan las rutas estáticas y el sitemap. */
export const solutions: Solution[] = [
  {
    slug: "migracion-cloud",
    title: "Migración cloud",
    tagline: "Salí del datacenter sin frenar el negocio",
    intro:
      "Planificamos y ejecutamos el traslado de tus aplicaciones y datos a AWS o Azure con ventanas de corte acotadas, rollback probado y costos estimados antes de mover el primer servidor.",
    icon: Cloud,
    signals: [
      "Los servidores físicos están cerca del fin de su vida útil",
      "Escalar para un pico de demanda requiere semanas de compras",
      "El backup existe, pero nadie probó una restauración completa",
      "El equipo dedica más tiempo a mantener hardware que a construir",
      "No sabés cuánto cuesta realmente cada aplicación",
      "Una caída del datacenter dejaría al negocio sin operar",
    ],
    benefits: [
      { title: "Capacidad elástica", description: "Recursos que crecen con la demanda y se apagan cuando no se usan." },
      { title: "Costos visibles", description: "Etiquetado y presupuestos por aplicación desde el primer día." },
      { title: "Continuidad", description: "Réplicas multi-zona y planes de recuperación con pruebas periódicas." },
      { title: "Velocidad", description: "Ambientes nuevos en minutos con infraestructura como código." },
    ],
    steps: [
      { title: "Relevamiento", description: "Inventario de aplicaciones, dependencias y requisitos de disponibilidad." },
      { title: "Estrategia por aplicación", description: "Definimos si cada carga se re-hostea, re-plataformiza o se reescribe." },
      { title: "Landing zone", description: "Cuentas, redes, identidades y guardrails listos con Terraform." },
      { title: "Olas de migración", description: "Movemos en grupos pequeños, con pruebas y plan de reversión en cada ola." },
      { title: "Estabilización", description: "Dos semanas de acompañamiento, ajuste de tamaños y traspaso al equipo." },
    ],
    relatedServiceIds: ["cloud", "migracion", "finops"],
    quote: "Migrar no es copiar servidores: es la oportunidad de dejar atrás la deuda técnica que nadie quería tocar.",
    stages: [
      { name: "Evaluar", deliverables: ["Inventario y mapa de dependencias", "Estimación de costos cloud", "Roadmap por olas"] },
      { name: "Construir", deliverables: ["Landing zone con IaC", "Redes y seguridad base", "Pipelines de despliegue"] },
      { name: "Migrar", deliverables: ["Olas con rollback", "Validación funcional", "Corte y estabilización"] },
    ],
  },
  {
    slug: "automatizacion-devops",
    title: "Automatización y DevOps",
    tagline: "Del deploy manual a la entrega continua",
    intro:
      "Diseñamos pipelines de CI/CD, infraestructura como código y controles de seguridad automáticos para que tu equipo publique varias veces por día con menos fallas.",
    icon: Workflow,
    signals: [
      "Cada deploy necesita una persona específica y una ventana nocturna",
      "Los ambientes de prueba y producción no se parecen",
      "Un rollback implica restaurar backups a mano",
      "Las vulnerabilidades se descubren después de salir a producción",
      "Los cambios de infraestructura se hacen desde la consola",
      "Nadie sabe con certeza qué versión corre en cada ambiente",
    ],
    benefits: [
      { title: "Deploys en minutos", description: "Pipelines repetibles que eliminan los pasos manuales." },
      { title: "Menos incidentes", description: "Pruebas y escaneos automáticos antes de cada publicación." },
      { title: "Ambientes idénticos", description: "Terraform y contenedores para que lo probado sea lo desplegado." },
      { title: "Trazabilidad", description: "Cada cambio queda versionado, revisado y auditado." },
    ],
    steps: [
      { title: "Diagnóstico de entrega", description: "Medimos frecuencia de deploy, lead time y tasa de fallas actuales." },
      { title: "Pipeline base", description: "Build, pruebas y empaquetado automáticos para el primer servicio." },
      { title: "Infraestructura como código", description: "Llevamos redes, clusters y bases de datos a Terraform." },
      { title: "Seguridad en el pipeline", description: "SAST, escaneo de imágenes y gestión de secretos." },
      { title: "Escalado al resto", description: "Plantillas reutilizables para que cada equipo adopte el modelo." },
    ],
    relatedServiceIds: ["devops", "devsecops", "platform-engineering"],
    quote: "Un equipo que publica seguido publica con menos miedo, porque cada cambio es pequeño y reversible.",
    stages: [
      { name: "Medir", deliverables: ["Métricas DORA iniciales", "Mapa del flujo de entrega", "Prioridades de automatización"] },
      { name: "Automatizar", deliverables: ["CI/CD en GitLab o GitHub", "IaC con Terraform", "GitOps con ArgoCD"] },
      { name: "Proteger", deliverables: ["Escaneo de código e imágenes", "Políticas como código", "Gestión de secretos"] },
    ],
  },
  {
    slug: "operacion-24-7",
    title: "Operación 24/7",
    tagline: "Tu plataforma vigilada mientras tu equipo construye",
    intro:
      "Monitoreamos, respondemos incidentes y mantenemos tu infraestructura cloud con SLA definidos, para que tu equipo se concentre en el producto y no en las alertas de madrugada.",
    icon: Headset,
    signals: [
      "Los clientes se enteran de una caída antes que tu equipo",
      "Las alertas son tantas que ya nadie las mira",
      "No hay guardias definidas fuera del horario laboral",
      "Los parches de seguridad se aplican cuando hay tiempo",
      "Cada incidente se resuelve distinto según quién lo atienda",
      "El conocimiento de la plataforma depende de una o dos personas",
    ],
    benefits: [
      { title: "Respuesta con SLA", description: "Tiempos de atención acordados según la severidad del incidente." },
      { title: "Observabilidad real", description: "Métricas, logs y trazas correlacionados en un solo lugar." },
      { title: "Mantenimiento planificado", description: "Parches, upgrades y backups con calendario y reportes." },
      { title: "Mejora continua", description: "Post-mortems sin culpables y acciones para que no se repita." },
    ],
    steps: [
      { title: "Onboarding", description: "Relevamos la plataforma, accesos y procedimientos existentes." },
      { title: "Monitoreo", description: "Configuramos dashboards, alertas accionables y umbrales." },
      { title: "Runbooks", description: "Documentamos la respuesta a cada tipo de incidente." },
      { title: "Guardia activa", description: "Atención 24/7 con escalamiento según severidad." },
      { title: "Reportes mensuales", description: "Disponibilidad, incidentes, costos y recomendaciones." },
    ],
    relatedServiceIds: ["staffing", "observabilidad", "sre"],
    quote: "La mejor guardia es la que casi no suena, porque los problemas se detectan antes de convertirse en incidentes.",
    stages: [
      { name: "Observar", deliverables: ["Dashboards por servicio", "Alertas con umbrales acordados", "Inventario de activos"] },
      { name: "Responder", deliverables: ["Guardia 24/7", "Runbooks por incidente", "Comunicación de estado"] },
      { name: "Mejorar", deliverables: ["Post-mortems", "Backlog de confiabilidad", "Reporte mensual"] },
    ],
  },
  {
    slug: "datos-e-ia",
    title: "Datos e IA",
    tagline: "Datos ordenados para decisiones y modelos útiles",
    intro:
      "Construimos la base de datos e infraestructura para que la analítica y la IA generativa funcionen en producción, con gobierno, seguridad y costos bajo control.",
    icon: BrainCircuit,
    signals: [
      "Cada área tiene su propia versión de los números",
      "Los reportes se arman a mano copiando planillas",
      "Probaron IA generativa, pero no pasó de la demo",
      "No está claro quién puede ver qué datos",
      "Los datos históricos están dispersos en varios sistemas",
      "Los costos de procesamiento crecen sin explicación",
    ],
    benefits: [
      { title: "Una sola fuente de verdad", description: "Datos integrados y modelados para todas las áreas." },
      { title: "IA en producción", description: "Asistentes y automatizaciones con datos propios y controles de acceso." },
      { title: "Gobierno", description: "Catálogo, linaje y permisos por rol desde el diseño." },
      { title: "Costos previsibles", description: "Arquitecturas serverless y almacenamiento por niveles." },
    ],
    steps: [
      { title: "Casos de uso", description: "Priorizamos las preguntas de negocio y los procesos a automatizar." },
      { title: "Plataforma de datos", description: "Ingesta, almacenamiento y modelado en AWS o Azure." },
      { title: "Calidad y gobierno", description: "Validaciones, catálogo y permisos por rol." },
      { title: "Analítica e IA", description: "Dashboards y asistentes conectados a los datos curados." },
      { title: "Operación", description: "Monitoreo de pipelines, costos y desempeño de modelos." },
    ],
    relatedServiceIds: ["automatizacion", "consultoria", "cloud"],
    quote: "Un modelo de IA es tan bueno como los datos que lo alimentan: el trabajo empieza mucho antes del prompt.",
    stages: [
      { name: "Priorizar", deliverables: ["Mapa de casos de uso", "Evaluación de datos disponibles", "Roadmap de valor"] },
      { name: "Construir", deliverables: ["Lakehouse o data warehouse", "Pipelines de ingesta", "Modelo semántico"] },
      { name: "Activar", deliverables: ["Dashboards de negocio", "Asistente con IA generativa", "Monitoreo y costos"] },
    ],
  },
];

const solutionsByLanguage: Record<Language, Solution[]> = { es: solutions, en: solutionsEn };

export function getSolutions(lang: Language) {
  return solutionsByLanguage[lang];
}

export function getSolution(slug: string, lang: Language = "es") {
  return solutionsByLanguage[lang].find((solution) => solution.slug === slug);
}
