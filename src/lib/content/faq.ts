import type { Language } from "@/lib/i18n/dictionary";
import { faqCategoriesEn } from "./faq.en";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  name: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    name: "General",
    items: [
      {
        id: "global-coverage",
        question: "¿Trabajan con empresas de otros países?",
        answer:
          "Sí. Trabajamos de forma remota con clientes de cualquier país, en español o inglés. Acordamos reuniones, sprints y reportes en tu zona horaria, y los planes de soporte 24/7 cubren incidentes a cualquier hora.",
      },
      {
        id: "consultation-cost",
        question: "¿Cuál es el costo de una consulta inicial?",
        answer:
          "La primera consulta técnica es gratuita y sin compromiso. Dura entre 30 y 45 minutos con un arquitecto cloud senior, y después te enviamos un diagnóstico breve con recomendaciones iniciales.",
      },
      {
        id: "certifications",
        question: "¿Qué certificaciones tiene el equipo?",
        answer:
          "Contamos con más de 15 ingenieros certificados en AWS, Azure, Kubernetes (CKA/CKAD), GitLab y Terraform.",
      },
    ],
  },
  {
    id: "migracion",
    name: "Migración",
    items: [
      {
        id: "migration-time",
        question: "¿Cuánto toma una migración a cloud?",
        answer:
          "Una migración estándar toma entre 4 y 8 semanas, incluidas dos de estabilización. Trabajamos en olas pequeñas con entregables semanales; en aplicaciones legacy complejas el plazo puede extenderse, siempre con un roadmap claro desde el inicio.",
      },
      {
        id: "downtime",
        question: "¿Voy a tener cortes de servicio durante la migración?",
        answer:
          "Diseñamos cada ola para minimizar la ventana de corte. En la mayoría de los casos el cambio final se hace fuera de horario y en minutos, con un plan de reversión probado de antemano.",
      },
      {
        id: "which-cloud",
        question: "¿AWS o Azure?",
        answer:
          "Depende de tu stack, tus licencias y tu equipo. En el diagnóstico comparamos costos y capacidades para tus cargas concretas y te recomendamos la opción que mejor encaja.",
      },
    ],
  },
  {
    id: "operacion",
    name: "Operación y soporte",
    items: [
      {
        id: "support-24-7",
        question: "¿Proveen soporte 24/7?",
        answer:
          "Sí. Los planes de soporte 24/7 incluyen monitoreo proactivo, respuesta ante incidentes y escalamiento por severidad, con SLA definidos. Para proyectos estándar ofrecemos soporte en horario laboral con respuesta en menos de 2 horas.",
      },
      {
        id: "internal-team",
        question: "¿Qué pasa si ya tengo un equipo DevOps interno?",
        answer:
          "Trabajamos de tres formas: sumando expertise en áreas puntuales, capacitando a tu equipo para que gane autonomía o aportando ingenieros temporales para escalar un proyecto.",
      },
    ],
  },
  {
    id: "datos-ia",
    name: "Datos e IA",
    items: [
      {
        id: "ai-data-privacy",
        question: "¿Mis datos se usan para entrenar modelos de terceros?",
        answer:
          "No. Implementamos los asistentes con servicios que no usan tus datos para entrenamiento y dentro de tu propia cuenta cloud, con controles de acceso por rol.",
      },
      {
        id: "ai-first-step",
        question: "¿Por dónde empezar con IA generativa?",
        answer:
          "Por un caso de uso acotado y medible, como responder consultas internas sobre documentación. Validamos valor en pocas semanas antes de escalar.",
      },
    ],
  },
];

/** Preguntas en español para el schema FAQPage (el HTML inicial se renderiza en español). */
export const allFaqs = faqCategories.flatMap((category) => category.items);

const faqByLanguage: Record<Language, FaqCategory[]> = { es: faqCategories, en: faqCategoriesEn };

export function getFaqCategories(lang: Language) {
  return faqByLanguage[lang];
}
