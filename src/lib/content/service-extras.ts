import type { Language } from "@/lib/i18n/dictionary";

/**
 * Secciones extra de la plantilla de servicio (señales, para quién, proceso).
 * Los servicios sin entrada propia usan los valores por defecto.
 */
export interface ServiceExtras {
  signals: string[];
  audience: { title: string; description: string }[];
  steps: { title: string; description: string }[];
}

type ExtrasSet = {
  defaults: ServiceExtras;
  byId: Record<string, Partial<ServiceExtras>>;
};

const es: ExtrasSet = {
  defaults: {
    steps: [
      { title: "Diagnóstico", description: "Entendemos tu contexto, objetivos y restricciones en una sesión técnica." },
      { title: "Propuesta", description: "Alcance, plan de trabajo y estimación en 3 a 5 días hábiles." },
      { title: "Implementación", description: "Sprints cortos con entregables visibles cada semana." },
      { title: "Traspaso", description: "Documentación, capacitación y acompañamiento posterior." },
    ],
    audience: [
      { title: "Startups y SaaS", description: "Equipos chicos que necesitan velocidad sin sumar headcount." },
      { title: "Empresas en crecimiento", description: "Organizaciones cuya infraestructura ya no acompaña al negocio." },
      { title: "Equipos de TI internos", description: "Áreas que buscan expertise puntual o capacidad extra." },
    ],
    signals: [
      "Los proyectos de infraestructura se postergan por falta de tiempo",
      "Dependés de una sola persona para tareas críticas",
      "Los costos de TI crecen más rápido que el negocio",
      "Los incidentes se repiten sin una causa clara",
      "No hay documentación actualizada de la plataforma",
      "Cada cambio en producción genera incertidumbre",
    ],
  },
  byId: {
    devops: {
      signals: [
        "Los deploys requieren una ventana nocturna y varias personas",
        "Los ambientes de prueba no reflejan producción",
        "Las vulnerabilidades aparecen después de publicar",
        "La infraestructura se modifica a mano desde la consola",
        "Volver a una versión anterior lleva horas",
        "Cada equipo despliega de una forma distinta",
      ],
    },
    cloud: {
      signals: [
        "El hardware propio está llegando al fin de su vida útil",
        "Escalar requiere comprar equipos con meses de anticipación",
        "Nadie probó una restauración completa del backup",
        "No hay redundancia ante una falla del datacenter",
        "Los costos por aplicación son una incógnita",
        "El equipo mantiene servidores en lugar de construir producto",
      ],
    },
    staffing: {
      signals: [
        "Las alertas suenan de madrugada y nadie tiene guardia",
        "Los clientes reportan caídas antes que tu equipo",
        "Los parches se aplican cuando sobra tiempo",
        "El conocimiento depende de una o dos personas",
        "Contratar perfiles cloud lleva meses",
        "El equipo de producto termina resolviendo incidentes",
      ],
    },
    finops: {
      signals: [
        "La factura cloud sube todos los meses sin explicación",
        "Hay recursos encendidos que nadie sabe para qué sirven",
        "No hay presupuestos ni alertas de gasto",
        "No se usan instancias reservadas ni planes de ahorro",
        "Ningún equipo es dueño de sus costos",
        "Los entornos de prueba quedan prendidos los fines de semana",
      ],
    },
    observabilidad: {
      signals: [
        "Te enterás de los problemas por los usuarios",
        "Los logs están dispersos en varios servidores",
        "Hay tantas alertas que se ignoran",
        "Encontrar la causa de un incidente lleva horas",
        "No hay métricas de negocio en tiempo real",
        "Cada equipo usa su propia herramienta de monitoreo",
      ],
    },
    iac: {
      signals: [
        "La infraestructura se crea y modifica a mano desde la consola",
        "Staging y producción no son iguales y nadie sabe por qué",
        "Reconstruir un ambiente llevaría días o semanas",
        "Solo una persona sabe cómo está armada la red",
        "No hay registro de quién cambió qué en AWS",
        "Tenés Terraform, pero el estado vive en una laptop",
      ],
    },
    "contenedores-kubernetes": {
      signals: [
        "Las aplicaciones funcionan en la máquina del desarrollador pero no en el servidor",
        "Escalar significa levantar servidores a mano",
        "Las imágenes pesan gigas y tardan en desplegarse",
        "El cluster de Kubernetes quedó desactualizado y nadie lo quiere tocar",
        "Los servidores están ociosos la mayor parte del día",
        "Cada servicio se despliega de una forma distinta",
      ],
    },
    gitops: {
      signals: [
        "No sabés exactamente qué versión corre en cada ambiente",
        "Alguien aplica cambios en el cluster con kubectl a mano",
        "Volver a la versión anterior es un procedimiento manual",
        "El pipeline de CI tiene credenciales de administrador del cluster",
        "Promover de staging a producción depende de una persona",
        "Los secretos están en texto plano en el repositorio",
      ],
    },
    "well-architected": {
      signals: [
        "Nunca se revisó la cuenta AWS con una mirada externa",
        "Se acerca una auditoría o una due diligence",
        "Hay usuarios IAM con claves de acceso de hace años",
        "Producción y desarrollo comparten la misma cuenta",
        "No sabés si tus bases de datos tienen backup y cifrado",
        "La factura crece y no está claro dónde ahorrar",
      ],
    },
    "backup-dr": {
      signals: [
        "Nadie probó restaurar un backup completo",
        "Los backups están en la misma cuenta que producción",
        "No hay un RPO ni un RTO acordado con el negocio",
        "Un ransomware podría borrar también las copias",
        "El plan de recuperación es un documento desactualizado",
        "Una caída de región dejaría el servicio fuera por días",
      ],
    },
  },
};

const en: ExtrasSet = {
  defaults: {
    steps: [
      { title: "Assessment", description: "We understand your context, goals and constraints in a technical session." },
      { title: "Proposal", description: "Scope, work plan and estimate within 3 to 5 business days." },
      { title: "Implementation", description: "Short sprints with visible deliverables every week." },
      { title: "Handover", description: "Documentation, training and follow-up support." },
    ],
    audience: [
      { title: "Startups and SaaS", description: "Small teams that need speed without adding headcount." },
      { title: "Growing companies", description: "Organizations whose infrastructure no longer keeps up with the business." },
      { title: "Internal IT teams", description: "Departments looking for specific expertise or extra capacity." },
    ],
    signals: [
      "Infrastructure projects keep getting postponed for lack of time",
      "You depend on a single person for critical tasks",
      "IT costs grow faster than the business",
      "Incidents repeat without a clear cause",
      "There is no up-to-date platform documentation",
      "Every production change creates uncertainty",
    ],
  },
  byId: {
    devops: {
      signals: [
        "Deploys require a night window and several people",
        "Test environments don't reflect production",
        "Vulnerabilities show up after release",
        "Infrastructure is changed by hand from the console",
        "Rolling back to a previous version takes hours",
        "Every team deploys in a different way",
      ],
    },
    cloud: {
      signals: [
        "Your own hardware is reaching end of life",
        "Scaling means buying equipment months in advance",
        "Nobody has tested a full backup restore",
        "There is no redundancy if the datacenter fails",
        "Per-application costs are unknown",
        "The team maintains servers instead of building product",
      ],
    },
    staffing: {
      signals: [
        "Alerts go off at night and nobody is on call",
        "Customers report outages before your team does",
        "Patches are applied when there's spare time",
        "Knowledge depends on one or two people",
        "Hiring cloud profiles takes months",
        "The product team ends up firefighting incidents",
      ],
    },
    finops: {
      signals: [
        "The cloud bill goes up every month without explanation",
        "There are running resources nobody can explain",
        "There are no budgets or spending alerts",
        "Reserved instances and savings plans aren't used",
        "No team owns its costs",
        "Test environments stay on over the weekend",
      ],
    },
    observabilidad: {
      signals: [
        "You learn about problems from your users",
        "Logs are scattered across several servers",
        "There are so many alerts they get ignored",
        "Finding the cause of an incident takes hours",
        "There are no real-time business metrics",
        "Every team uses its own monitoring tool",
      ],
    },
    iac: {
      signals: [
        "Infrastructure is created and changed by hand in the console",
        "Staging and production differ and nobody knows why",
        "Rebuilding an environment would take days or weeks",
        "Only one person knows how the network is set up",
        "There is no record of who changed what in AWS",
        "You have Terraform, but the state lives on a laptop",
      ],
    },
    "contenedores-kubernetes": {
      signals: [
        "Apps work on the developer's machine but not on the server",
        "Scaling means spinning up servers by hand",
        "Images weigh gigabytes and take ages to deploy",
        "The Kubernetes cluster is outdated and nobody wants to touch it",
        "Servers sit idle most of the day",
        "Every service is deployed differently",
      ],
    },
    gitops: {
      signals: [
        "You don't know exactly which version runs in each environment",
        "Someone applies changes to the cluster with kubectl by hand",
        "Rolling back is a manual procedure",
        "The CI pipeline holds cluster admin credentials",
        "Promoting from staging to production depends on one person",
        "Secrets sit in plain text in the repository",
      ],
    },
    "well-architected": {
      signals: [
        "Your AWS account has never been reviewed by outside eyes",
        "An audit or due diligence is coming up",
        "There are IAM users with years-old access keys",
        "Production and development share the same account",
        "You're not sure your databases are backed up and encrypted",
        "The bill keeps growing and it's unclear where to save",
      ],
    },
    "backup-dr": {
      signals: [
        "Nobody has tested a full backup restore",
        "Backups live in the same account as production",
        "There is no RPO or RTO agreed with the business",
        "Ransomware could delete the copies too",
        "The recovery plan is an outdated document",
        "A region outage would take the service down for days",
      ],
    },
  },
};

const extrasByLanguage: Record<Language, ExtrasSet> = { es, en };

export function getServiceExtras(id: string, lang: Language = "es"): ServiceExtras {
  const { defaults, byId } = extrasByLanguage[lang];
  const extras = byId[id] ?? {};
  return {
    signals: extras.signals ?? defaults.signals,
    audience: extras.audience ?? defaults.audience,
    steps: extras.steps ?? defaults.steps,
  };
}
