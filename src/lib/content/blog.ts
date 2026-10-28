import type { Language } from "@/lib/i18n/dictionary";
import { blogPostsEn } from "./blog.en";

export type BlogCategory = "Cloud" | "DevOps" | "Operación" | "Datos e IA";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO
  readingMinutes: number;
  sections: { heading: string; paragraphs: string[] }[];
  faqs?: { question: string; answer: string }[];
}

export const blogCategories: BlogCategory[] = ["Cloud", "DevOps", "Operación", "Datos e IA"];

/** La categoría es una clave fija; esta tabla da el texto visible en cada idioma. */
const categoryLabels: Record<Language, Record<BlogCategory, string>> = {
  es: { Cloud: "Cloud", DevOps: "DevOps", "Operación": "Operación", "Datos e IA": "Datos e IA" },
  en: { Cloud: "Cloud", DevOps: "DevOps", "Operación": "Operations", "Datos e IA": "Data and AI" },
};

export function categoryLabel(category: BlogCategory, lang: Language) {
  return categoryLabels[lang][category];
}

/** Artículos propios de CloudBit. Revisar y ajustar el tono antes de publicar. */
export const blogPosts: BlogPost[] = [
  {
    slug: "checklist-antes-de-migrar-a-la-nube",
    title: "Checklist técnico antes de migrar tu primera aplicación a la nube",
    excerpt: "Siete puntos que conviene resolver antes de mover un solo servidor, para que la migración no se convierta en una mudanza de problemas.",
    category: "Cloud",
    date: "2026-09-18",
    readingMinutes: 6,
    sections: [
      {
        heading: "Inventario con dependencias, no solo con servidores",
        paragraphs: [
          "Una lista de máquinas virtuales no alcanza. Lo que define el orden de migración son las dependencias: qué aplicación llama a qué base de datos, qué procesos batch corren de noche y qué integraciones salen a internet.",
          "Dedicar una semana a mapear esas relaciones evita el escenario más común: migrar un servicio y descubrir en producción que dependía de un recurso que quedó on-premise.",
        ],
      },
      {
        heading: "Definí el destino de cada aplicación",
        paragraphs: [
          "No todo merece el mismo tratamiento. Algunas cargas se mueven tal cual, otras conviene llevarlas a servicios gestionados y unas pocas no vale la pena migrarlas. Decidirlo por aplicación ordena el presupuesto y el calendario.",
        ],
      },
      {
        heading: "Estimá costos antes de comprometerte",
        paragraphs: [
          "Con el inventario en mano se puede proyectar el costo mensual en la nube y compararlo con el costo total actual, incluidos energía, licencias y horas de mantenimiento. Esa comparación es la que convence a finanzas.",
        ],
      },
      {
        heading: "Probá la reversión, no solo la migración",
        paragraphs: [
          "Cada ola de migración necesita un plan para volver atrás que se haya ensayado. Si el rollback nunca se probó, en realidad no existe.",
        ],
      },
    ],
    faqs: [
      { question: "¿Cuánto tiempo lleva el relevamiento?", answer: "Para una empresa mediana, entre una y dos semanas según la cantidad de aplicaciones." },
      { question: "¿Hay que migrar todo de una vez?", answer: "No. Lo recomendable es migrar por olas pequeñas, empezando por cargas de bajo riesgo." },
    ],
  },
  {
    slug: "metricas-dora-para-equipos-chicos",
    title: "Métricas DORA para equipos chicos: cómo medir sin burocracia",
    excerpt: "Frecuencia de deploy, lead time, tasa de fallas y tiempo de recuperación: qué significan y cómo medirlas con lo que ya tenés.",
    category: "DevOps",
    date: "2026-08-27",
    readingMinutes: 5,
    sections: [
      {
        heading: "Cuatro números que cuentan cómo entregás software",
        paragraphs: [
          "Las métricas DORA resumen la salud del proceso de entrega: cada cuánto publicás, cuánto tarda un cambio en llegar a producción, qué porcentaje de cambios genera incidentes y cuánto tardás en recuperarte.",
          "No hace falta una herramienta nueva. El historial del repositorio y del pipeline alcanza para tener una primera foto.",
        ],
      },
      {
        heading: "Empezá por la frecuencia de deploy",
        paragraphs: [
          "Es la más fácil de medir y la que más rápido mejora cuando se automatiza. Si hoy publicás una vez por semana, el objetivo inicial puede ser una vez por día en un servicio piloto.",
        ],
      },
      {
        heading: "Usalas para conversar, no para comparar personas",
        paragraphs: [
          "Las métricas describen el sistema, no el desempeño individual. Usarlas para rankear equipos destruye la confianza y termina distorsionando los datos.",
        ],
      },
    ],
  },
  {
    slug: "alertas-que-nadie-mira",
    title: "Alertas que nadie mira: cómo recuperar la confianza en tu monitoreo",
    excerpt: "Cuando todo alerta, nada alerta. Un método simple para depurar umbrales y quedarte solo con avisos accionables.",
    category: "Operación",
    date: "2026-07-30",
    readingMinutes: 4,
    sections: [
      {
        heading: "El síntoma: canales silenciados",
        paragraphs: [
          "Si el canal de alertas está silenciado por la mayoría del equipo, el monitoreo dejó de cumplir su función. El problema rara vez es la herramienta: son umbrales pensados para el peor caso y alertas sin dueño.",
        ],
      },
      {
        heading: "Cada alerta necesita una acción",
        paragraphs: [
          "Revisá las alertas del último mes y preguntá, una por una, qué hizo alguien al recibirla. Si la respuesta es nada, se elimina o se convierte en un dato de dashboard.",
        ],
      },
      {
        heading: "Alertá por síntomas, no por causas",
        paragraphs: [
          "Al usuario le importa que la página cargue rápido y sin errores, no el uso de CPU. Alertar sobre latencia y tasa de errores reduce el ruido y captura problemas que las métricas de infraestructura no ven.",
        ],
      },
    ],
  },
  {
    slug: "ia-generativa-del-piloto-a-produccion",
    title: "IA generativa: qué cambia entre el piloto y producción",
    excerpt: "La demo funciona en una tarde; llevarla a producción requiere datos curados, permisos, evaluación y control de costos.",
    category: "Datos e IA",
    date: "2026-07-02",
    readingMinutes: 7,
    sections: [
      {
        heading: "El piloto prueba la idea, no la solución",
        paragraphs: [
          "Un asistente que responde bien sobre diez documentos elegidos no garantiza nada sobre diez mil documentos reales, con versiones viejas, duplicados y permisos distintos.",
        ],
      },
      {
        heading: "Permisos desde el diseño",
        paragraphs: [
          "El asistente solo debería responder con información que el usuario ya puede ver. Eso implica propagar los permisos de los sistemas de origen al índice de búsqueda, no agregarlos al final.",
        ],
      },
      {
        heading: "Medí la calidad de las respuestas",
        paragraphs: [
          "Un conjunto de preguntas de prueba con respuestas esperadas permite detectar regresiones cada vez que cambia el modelo, el prompt o los datos.",
        ],
      },
      {
        heading: "Controlá el costo por consulta",
        paragraphs: [
          "Elegir el modelo según la complejidad de la pregunta y cachear respuestas frecuentes puede reducir el costo mensual de forma significativa sin afectar la experiencia.",
        ],
      },
    ],
    faqs: [
      { question: "¿Necesito entrenar un modelo propio?", answer: "En la mayoría de los casos no. Conectar un modelo existente a tus datos con búsqueda semántica alcanza." },
    ],
  },
  {
    slug: "terraform-primeros-pasos-en-equipo",
    title: "Terraform en equipo: cinco acuerdos para no pisarse",
    excerpt: "Estado remoto, módulos, revisiones y convenciones: lo mínimo para que la infraestructura como código escale con el equipo.",
    category: "DevOps",
    date: "2026-06-11",
    readingMinutes: 5,
    sections: [
      {
        heading: "Estado remoto con bloqueo",
        paragraphs: [
          "El archivo de estado nunca debería vivir en una laptop. Un backend remoto con bloqueo evita que dos personas apliquen cambios al mismo tiempo.",
        ],
      },
      {
        heading: "Cambios solo por pull request",
        paragraphs: [
          "El plan de Terraform publicado como comentario en la revisión permite ver exactamente qué va a cambiar antes de aplicarlo, y deja historial de quién aprobó qué.",
        ],
      },
      {
        heading: "Módulos chicos y versionados",
        paragraphs: [
          "Un módulo por componente, con versiones explícitas, permite actualizar de a un ambiente por vez y volver atrás si algo falla.",
        ],
      },
    ],
  },
  {
    slug: "reducir-factura-cloud-sin-tocar-codigo",
    title: "Cómo bajar la factura cloud sin tocar una línea de código",
    excerpt: "Apagado programado, ajuste de tamaños y compromisos de uso: tres palancas que suelen ahorrar entre 20% y 40%.",
    category: "Cloud",
    date: "2026-05-21",
    readingMinutes: 4,
    sections: [
      {
        heading: "Apagá lo que no se usa",
        paragraphs: [
          "Los ambientes de desarrollo y prueba rara vez necesitan estar encendidos de noche o los fines de semana. Un horario de apagado automático es el ahorro más rápido.",
        ],
      },
      {
        heading: "Ajustá tamaños con datos",
        paragraphs: [
          "Las instancias suelen dimensionarse para el peor caso imaginado. Revisar el uso real de CPU y memoria durante un mes muestra cuáles pueden bajar de tamaño sin riesgo.",
        ],
      },
      {
        heading: "Comprometé el uso estable",
        paragraphs: [
          "Para la carga base que corre todo el año, los planes de ahorro y las instancias reservadas ofrecen descuentos importantes a cambio de un compromiso de uso.",
        ],
      },
    ],
  },
];

const postsByLanguage: Record<Language, BlogPost[]> = { es: blogPosts, en: blogPostsEn };

export function getPosts(lang: Language) {
  return postsByLanguage[lang];
}

export function getPost(slug: string, lang: Language = "es") {
  return postsByLanguage[lang].find((post) => post.slug === slug);
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
