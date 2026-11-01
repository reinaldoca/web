import {
  ChartLine,
  Ticket,
  Infinity as InfinityIcon,
  Bot,
  Users,
  Lightbulb,
  Cloud,
  ShieldCheck,
  CircleDollarSign,
  RefreshCcw,
  Layers,
  HeartPulse,
  Network,
  Server,
  SquareTerminal,
  FileCode,
  Container,
  GitPullRequest,
  ClipboardCheck,
  DatabaseBackup,
  LucideIcon,
} from "lucide-react";
import { Language } from "@/lib/i18n/dictionary";

export interface ServiceData {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  features: string[];
  benefits: string[];
  tags: string[];
}

const servicesEs: ServiceData[] = [
  {
    id: "observabilidad",
    title: "Observabilidad",
    shortDescription:
      "Implementamos plataformas de código abierto para la visualización y análisis de datos en tiempo real.",
    fullDescription:
      "Controle cada aspecto crítico de su infraestructura con visibilidad total y en tiempo real. Te brindamos todo lo necesario para recopilar, categorizar y analizar los datos de las aplicaciones y la infraestructura de tu organización. Tené una visión clara de los aspectos críticos y tomá decisiones informadas que te permitan corregir posibles problemas antes de que afecten a los usuarios finales.",
    icon: ChartLine,
    features: [
      "Monitoreo unificado de infraestructura",
      "Análisis de tráfico y rendimiento de red",
      "Gestión de logs centralizados",
      "Mapas de servicios y dependencias",
      "Alertas inteligentes y predictivas",
      "Dashboards personalizados en Grafana",
    ],
    benefits: [
      "Resolución de problemas más rápida (MTTR reducido)",
      "Mayor comprensión del rendimiento del sistema",
      "Reducción de tiempos de inactividad",
      "Optimización de recursos de infraestructura",
      "Toma de decisiones basada en datos reales",
    ],
    tags: ["Grafana", "Zabbix", "Prometheus", "ELK Stack"],
  },
  {
    id: "itsm",
    title: "ITSM",
    shortDescription:
      "Gestionamos servicios y activos de manera autónoma para optimizar la eficiencia operativa.",
    fullDescription:
      "Transformamos la gestión de servicios de TI alineándola con los objetivos del negocio. Implementamos soluciones que automatizan flujos de trabajo, gestionan incidentes, problemas y cambios de manera eficiente, asegurando la calidad y continuidad de los servicios tecnológicos.",
    icon: Ticket,
    features: [
      "Gestión de Incidentes y Requerimientos",
      "Gestión de Activos e Inventario (ITAM)",
      "Portal de Autoservicio para usuarios",
      "Base de Conocimiento integrada",
      "Automatización de flujos de trabajo",
      "Reportes y métricas de SLA",
    ],
    benefits: [
      "Mayor satisfacción del usuario final",
      "Estandarización de procesos de soporte",
      "Visibilidad completa de los activos de TI",
      "Reducción de costos operativos",
      "Mejora continua del servicio",
    ],
    tags: ["InvGate", "Service Management", "ITIL", "Help Desk"],
  },
  {
    id: "devops",
    title: "Automatización y Seguridad Continua",
    shortDescription:
      "Automatizamos CI/CD, IaC y observabilidad full-stack",
    fullDescription:
      "Adoptamos la cultura y prácticas DevOps para unir el desarrollo y las operaciones. Automatizamos la entrega de software para que sea más rápida y confiable, permitiendo a tu empresa innovar a la velocidad que demanda el mercado sin sacrificar la estabilidad.",
    icon: InfinityIcon,
    features: [
      "Implementación de Pipelines CI/CD",
      "Infraestructura como Código (IaC)",
      "Gestión de Contenedores (Docker/Kubernetes)",
      "Automatización de pruebas",
      "Gestión de configuración",
      "Monitoreo continuo del ciclo de vida",
    ],
    benefits: [
      "Lanzamientos de software más frecuentes",
      "Menor tasa de fallos en cambios",
      "Recuperación más rápida ante incidentes",
      "Mejor colaboración entre equipos",
      "Automatización de tareas repetitivas",
    ],
    tags: ["CI/CD", "Jenkins", "GitLab", "Kubernetes", "Terraform"],
  },
  {
    id: "automatizacion",
    title: "Automatización",
    shortDescription:
      "Optimizamos tus procesos mediante soluciones que reducen errores y tiempos operativos.",
    fullDescription:
      "Identificamos y automatizamos procesos manuales y repetitivos utilizando tecnologías avanzadas como RPA (Robotic Process Automation) y scripts personalizados. Liberamos a tu equipo de tareas rutinarias para que puedan enfocarse en actividades de mayor valor estratégico.",
    icon: Bot,
    features: [
      "Automatización de Procesos Robóticos (RPA)",
      "Orquestación de flujos de trabajo",
      "Integración de sistemas heterogéneos",
      "Bots conversacionales y asistentes virtuales",
      "Automatización de tareas administrativas",
      "Procesamiento inteligente de documentos",
    ],
    benefits: [
      "Reducción drástica de errores humanos",
      "Ahorro significativo de tiempo y costos",
      "Operación 24/7 sin interrupciones",
      "Mayor escalabilidad de procesos",
      "Cumplimiento normativo y auditoría facilitada",
    ],
    tags: ["RPA", "Python", "Ansible", "Workflows", "AI"],
  },
  {
    id: "staffing",
    title: "Staffing y Operación Gestionada",
    shortDescription:
      "Proveemos equipos especializados y operación 24/7",
    fullDescription:
      "Proveemos el talento tecnológico que tu proyecto necesita, cuando lo necesita. Ya sea para cubrir picos de demanda, proyectos específicos o roles especializados a largo plazo, contamos con una red de profesionales validados técnicamente y listos para integrarse a tu equipo.",
    icon: Users,
    features: [
      "Perfiles especializados (Devs, QA, DevOps, etc.)",
      "Staff Augmentation (aumento de equipo)",
      "Equipos dedicados (Squads)",
      "Reclutamiento y selección IT",
      "Gestión administrativa del talento",
      "Flexibilidad en modelos de contratación",
    ],
    benefits: [
      "Acceso rápido a talento escaso",
      "Reducción de tiempos de contratación",
      "Flexibilidad para escalar equipos",
      "Reducción de carga administrativa",
      "Continuidad operativa garantizada",
    ],
    tags: ["Outsourcing", "Talent", "Squads", "Recruiting"],
  },
  {
    id: "consultoria",
    title: "Consultoría",
    shortDescription:
      "Asesoramiento personalizado para implementar las mejores tecnologías.",
    fullDescription:
      "Acompañamos a tu organización en la definición de su estrategia tecnológica. Nuestros consultores expertos analizan tu situación actual, identifican oportunidades de mejora y diseñan hojas de ruta claras para la adopción de nuevas tecnologías y la transformación digital.",
    icon: Lightbulb,
    features: [
      "Diagnóstico y evaluación tecnológica",
      "Diseño de arquitectura de soluciones",
      "Planificación de transformación digital",
      "Auditoría de seguridad y cumplimiento",
      "Optimización de costos de TI",
      "Selección de proveedores y tecnologías",
    ],
    benefits: [
      "Visión experta e imparcial",
      "Mitigación de riesgos tecnológicos",
      "Alineación de IT con el negocio",
      "Optimización de inversiones",
      "Adopción acelerada de mejores prácticas",
    ],
    tags: ["Strategy", "Advisory", "Architecture", "Digital Transformation"],
  },
  {
    id: "cloud",
    title: "Migración y Arquitectura Cloud",
    shortDescription:
      "Migramos y diseñamos arquitecturas en AWS, Azure y Kubernetes",
    fullDescription:
      "Transformá tu negocio con servicios en la nube líderes. Diseñamos, migramos y gestionamos arquitecturas en AWS, Azure y nubes híbridas, asegurando escalabilidad, seguridad y eficiencia de costos. Aprovechá la potencia de la nube para innovar sin límites.",
    icon: Cloud,
    features: [
      "Migración a la nube (Lift & Shift, Re-platforming)",
      "Diseño de arquitecturas Cloud Native",
      "Gestión de costos (FinOps)",
      "Seguridad y cumplimiento en la nube",
      "Backup y Disaster Recovery",
      "Gestión de entornos híbridos y Multi-Cloud",
    ],
    benefits: [
      "Escalabilidad elástica según demanda",
      "Reducción de costos de infraestructura (CapEx a OpEx)",
      "Mayor agilidad y time-to-market",
      "Alta disponibilidad y redundancia global",
      "Seguridad de nivel empresarial",
    ],
    tags: ["AWS", "Azure", "Red Hat", "Hybrid Cloud", "Migration"],
  },
  {
    id: "devsecops",
    title: "Cloud Security & DevSecOps",
    shortDescription:
      "Integramos seguridad en cada etapa del desarrollo y protegemos tu infraestructura cloud.",
    fullDescription:
      "La seguridad no es un añadido, es parte fundamental del proceso. Implementamos prácticas de DevSecOps para detectar vulnerabilidades desde el código hasta el despliegue. Diseñamos arquitecturas Zero Trust y aseguramos el cumplimiento normativo de tus entornos en la nube.",
    icon: ShieldCheck,
    features: [
      "Análisis estático y dinámico de código (SAST/DAST)",
      "Gestión de vulnerabilidades",
      "Seguridad de contenedores",
      "Compliance as Code",
      "Gestión de identidades (IAM)",
      "Arquitectura Zero Trust",
    ],
    benefits: [
      "Reducción de riesgos de seguridad",
      "Cumplimiento de normativas (GDPR, PCI-DSS)",
      "Detección temprana de vulnerabilidades",
      "Protección proactiva de activos",
      "Confianza del cliente garantizada",
    ],
    tags: ["DevSecOps", "Security", "Compliance", "Zero Trust", "SonarQube"],
  },
  {
    id: "finops",
    title: "FinOps & Costos",
    shortDescription:
      "Maximizamos el valor de tu inversión en la nube mediante control y optimización financiera.",
    fullDescription:
      "La nube ofrece agilidad, pero los costos pueden dispararse sin control. Implementamos la cultura FinOps para dar visibilidad, asignar responsabilidades y optimizar el gasto en la nube. Analizamos tus facturas, detectamos desperdicios y aplicamos estrategias de ahorro como Reserved Instances y Savings Plans.",
    icon: CircleDollarSign,
    features: [
      "Auditoría de costos cloud",
      "Asignación de etiquetas (Tagging)",
      "Presupuestos y alertas inteligentes",
      "Optimización de recursos ociosos",
      "Gestión de planes de ahorro (RI/Savings Plans)",
      "Reportes de atribución de costos",
    ],
    benefits: [
      "Reducción significativa de la factura cloud",
      "Previsibilidad del gasto mensual",
      "Mayor retorno de inversión (ROI)",
      "Cultura de responsabilidad financiera",
      "Reinversión de ahorros en innovación",
    ],
    tags: ["FinOps", "AWS Cost Explorer", "Azure Cost Management", "Savings"],
  },
  {
    id: "migracion",
    title: "Migración y Modernización",
    shortDescription:
      "Llevamos tus aplicaciones legacy a la nube con estrategias seguras y eficientes.",
    fullDescription:
      "No solo movemos tus servidores, modernizamos tu negocio. Evaluamos tus aplicaciones existentes y definimos la mejor estrategia de migración (Rehost, Replatform, Refactor). Transformamos monolitos en microservicios y aseguramos una transición sin interrupciones operativas.",
    icon: RefreshCcw,
    features: [
      "Evaluación de madurez cloud (Assessment)",
      "Estrategias de migración (6 R's)",
      "Migración de bases de datos",
      "Modernización a contenedores",
      "Descomposición de monolitos",
      "Planificación de cut-over sin downtime",
    ],
    benefits: [
      "Eliminación de deuda técnica",
      "Mayor escalabilidad y resiliencia",
      "Reducción de costos de mantenimiento",
      "Preparación para el futuro tecnológico",
      "Mejor rendimiento de aplicaciones",
    ],
    tags: ["Migration", "Legacy", "Microservices", "Replatforming"],
  },
  {
    id: "platform-engineering",
    title: "Platform Engineering",
    shortDescription:
      "Construimos plataformas internas que potencian la productividad de tus desarrolladores.",
    fullDescription:
      "Reducimos la carga cognitiva de tus equipos de desarrollo creando Internal Developer Platforms (IDPs). Estandarizamos herramientas, flujos de trabajo y entornos para que los desarrolladores puedan autogestionar su infraestructura de manera segura y eficiente, acelerando el time-to-market.",
    icon: Layers,
    features: [
      "Portales de desarrollador (Backstage)",
      "Plantillas de servicios (Golden Paths)",
      "Gestión de entornos efímeros",
      "Automatización de infraestructura self-service",
      "Catálogo de servicios unificado",
      "Estandarización de toolchain",
    ],
    benefits: [
      "Mayor velocidad de desarrollo",
      "Estandarización tecnológica",
      "Mejor experiencia del desarrollador (DX)",
      "Menor dependencia de operaciones",
      "Onboarding más rápido de nuevos devs",
    ],
    tags: ["IDP", "Backstage", "Kubernetes", "Self-service", "DX"],
  },
  {
    id: "sre",
    title: "SRE (Site Reliability Engineering)",
    shortDescription:
      "Garantizamos la confiabilidad y el rendimiento de tus sistemas críticos.",
    fullDescription:
      "Aplicamos ingeniería a las operaciones para crear sistemas ultra-confiables y escalables. Definimos SLIs, SLOs y SLAs, gestionamos el 'Error Budget' y automatizamos la respuesta a incidentes. Transformamos la forma en que tu organización gestiona la producción.",
    icon: HeartPulse,
    features: [
      "Definición de SLI/SLO/SLA",
      "Gestión de incidentes y Post-mortems",
      "Ingeniería del caos (Chaos Engineering)",
      "Automatización de toiles (tareas manuales)",
      "Planificación de capacidad",
      "Observabilidad avanzada",
    ],
    benefits: [
      "Mayor disponibilidad (Uptime garantizado)",
      "Equilibrio entre velocidad y estabilidad",
      "Cultura de aprendizaje sin culpa",
      "Mejor experiencia de usuario final",
      "Reducción de fatiga de alertas",
    ],
    tags: ["SRE", "Reliability", "SLO", "Chaos Engineering", "Datadog"],
  },
  {
    id: "networking",
    title: "Networking & Seguridad Perimetral",
    shortDescription:
      "Administración experta de redes y seguridad con especialización en Cisco ASA.",
    fullDescription:
      "Aseguramos la conectividad y protección de tu infraestructura de red. Ofrecemos servicios gestionados para firewalls Cisco ASA y soluciones de networking, garantizando un rendimiento óptimo, alta disponibilidad y defensa robusta contra amenazas. Desde la configuración inicial hasta el monitoreo 24/7, nos encargamos de mantener tu red segura y eficiente.",
    icon: Network,
    features: [
      "Administración y configuración de Cisco ASA",
      "Implementación de VPNs (Site-to-Site, AnyConnect)",
      "Políticas de firewall y control de acceso",
      "Prevención de intrusiones (IPS/IDS)",
      "Alta disponibilidad y Failover",
      "Monitoreo de tráfico y ancho de banda",
    ],
    benefits: [
      "Seguridad perimetral robusta",
      "Conectividad remota segura y estable",
      "Reducción de tiempos de inactividad",
      "Cumplimiento de normativas de seguridad",
      "Optimización del rendimiento de red",
    ],
    tags: ["Cisco ASA", "Firewall", "VPN", "Network Security", "Routing"],
  },
  {
    id: "virtualizacion",
    title: "Virtualización & Cloud Privada",
    shortDescription:
      "Administración experta de entornos virtuales con VMware y Proxmox.",
    fullDescription:
      "Optimizamos tu infraestructura mediante soluciones de virtualización líderes. Gestionamos entornos VMware y Proxmox para maximizar el uso de recursos, garantizar alta disponibilidad y simplificar la recuperación ante desastres. Diseñamos, implementamos y mantenemos tu nube privada o híbrida con las mejores prácticas del mercado.",
    icon: Server,
    features: [
      "Administración de VMware vSphere y ESXi",
      "Implementación y gestión de Proxmox VE",
      "Clustering y Alta Disponibilidad (HA)",
      "Migración P2V (Físico a Virtual) y V2V",
      "Gestión de almacenamiento (vSAN, Ceph)",
      "Copias de seguridad y recuperación (Veeam, PBS)",
    ],
    benefits: [
      "Consolidación de servidores y reducción de costos",
      "Mayor flexibilidad y escalabilidad",
      "Recuperación rápida ante fallos",
      "Gestión centralizada de recursos",
      "Entornos de prueba y desarrollo aislados",
    ],
    tags: ["VMware", "Proxmox", "Virtualization", "Private Cloud", "vCenter"],
  },
  {
    id: "linux-admin",
    title: "Administración Linux",
    shortDescription:
      "Soporte y gestión integral para servidores Linux (Debian, Ubuntu, Fedora).",
    fullDescription:
      "Garantizamos la estabilidad, seguridad y rendimiento de tus servidores Linux. Nuestro equipo de expertos administra distribuciones como Debian, Ubuntu y Fedora, encargándose desde la configuración inicial y el endurecimiento (hardening) hasta el parcheo y la optimización continua. Mantén tus sistemas críticos operando sin interrupciones.",
    icon: SquareTerminal,
    features: [
      "Instalación y configuración de servidores Linux",
      "Hardening y seguridad del sistema operativo",
      "Gestión de parches y actualizaciones",
      "Automatización con Bash y Ansible",
      "Optimización de rendimiento (Kernel tuning)",
      "Administración de servicios (Web, DB, Mail)",
    ],
    benefits: [
      "Estabilidad y uptime maximizado",
      "Seguridad reforzada contra vulnerabilidades",
      "Rendimiento optimizado de aplicaciones",
      "Reducción de carga operativa",
      "Soporte experto para resolución de incidentes",
    ],
    tags: ["Linux", "Debian", "Ubuntu", "Fedora", "SysAdmin"],
  },
  {
    id: "iac",
    title: "Infraestructura como Código (IaC)",
    shortDescription:
      "Definimos tu infraestructura AWS en código con Terraform, OpenTofu, CloudFormation o CDK: versionada, revisada y reproducible.",
    fullDescription:
      "Dejamos de crear infraestructura a mano desde la consola. Describimos redes, cómputo, bases de datos y permisos en código versionado, con módulos reutilizables, estado remoto seguro y un pipeline que muestra el plan en cada pull request antes de aplicar. Podemos partir de cero o importar lo que ya existe sin recrearlo. El código queda en tu repositorio y tu equipo puede mantenerlo sin depender de nosotros.",
    icon: FileCode,
    features: [
      "Relevamiento de la infraestructura actual y del nivel de automatización",
      "Biblioteca de módulos Terraform/OpenTofu versionados",
      "Estado remoto en S3 con cifrado y bloqueo",
      "Ambientes separados por cuenta AWS (dev, staging, prod)",
      "Pipeline de plan/apply con revisión en cada pull request",
      "Importación de recursos existentes y detección de drift",
    ],
    benefits: [
      "Ambientes idénticos y reproducibles",
      "Cada cambio queda revisado y auditado",
      "Recuperación rápida ante incidentes o desastres",
      "Menos errores por cambios manuales",
      "Sin lock-in: el código es tuyo",
    ],
    tags: ["Terraform", "OpenTofu", "CloudFormation", "AWS CDK"],
  },
  {
    id: "contenedores-kubernetes",
    title: "Contenedores y Kubernetes en AWS",
    shortDescription:
      "Contenerizamos tus aplicaciones y las llevamos a producción en ECS, Fargate o EKS con despliegues automatizados.",
    fullDescription:
      "Llevamos tus aplicaciones a contenedores con imágenes livianas y seguras, y elegimos con vos el orquestador que mejor se ajusta a tu equipo: ECS con Fargate para operar con lo mínimo, o EKS cuando necesitás el ecosistema de Kubernetes. Construimos todo en un ambiente de prueba, lo endurecemos con escalado, observabilidad y políticas de seguridad, y te entregamos la plataforma documentada y lista para operar.",
    icon: Container,
    features: [
      "Dockerfiles multi-stage e imágenes mínimas sin root",
      "Registro privado en Amazon ECR con escaneo de vulnerabilidades",
      "Clusters ECS/Fargate o EKS definidos como código",
      "Autoescalado de pods y nodos (HPA, Karpenter)",
      "Ingress, certificados y balanceo de carga administrados",
      "Secretos desde AWS Secrets Manager y políticas de red",
    ],
    benefits: [
      "Despliegues consistentes en todos los ambientes",
      "Escalado automático según la demanda real",
      "Mejor aprovechamiento de la capacidad contratada",
      "Actualizaciones sin cortes de servicio",
      "Base lista para microservicios y GitOps",
    ],
    tags: ["Docker", "Kubernetes", "Amazon EKS", "Amazon ECS", "Helm"],
  },
  {
    id: "gitops",
    title: "GitOps",
    shortDescription:
      "Git como única fuente de verdad: despliegues declarativos, auditables y con rollback en un clic usando Argo CD o Flux.",
    fullDescription:
      "Implementamos GitOps para que desplegar sea aprobar un pull request. Un agente dentro del cluster sincroniza continuamente lo que está en el repositorio con lo que corre, detecta cambios manuales y los corrige. Las promociones entre ambientes quedan registradas, volver atrás es revertir un commit y el pipeline de CI ya no necesita credenciales de administrador del cluster.",
    icon: GitPullRequest,
    features: [
      "Instalación y configuración de Argo CD o Flux",
      "Estructura de repositorios para aplicaciones y ambientes",
      "Promoción entre ambientes mediante pull requests",
      "Detección y corrección automática de drift",
      "Gestión de secretos con External Secrets o Sealed Secrets",
      "Notificaciones de sincronización y estado de despliegues",
    ],
    benefits: [
      "Historial completo de quién desplegó qué y cuándo",
      "Rollback inmediato revirtiendo un commit",
      "Clusters que se autocorrigen ante cambios manuales",
      "Menos credenciales sensibles en el CI",
      "Despliegues más frecuentes con menos riesgo",
    ],
    tags: ["Argo CD", "Flux", "Kustomize", "Helm"],
  },
  {
    id: "well-architected",
    title: "AWS Well-Architected Review",
    shortDescription:
      "Revisamos tu cuenta AWS contra los seis pilares de buenas prácticas y te entregamos un plan priorizado de mejoras.",
    fullDescription:
      "Una revisión de alcance acotado, con acceso de solo lectura, sobre una o varias cargas de trabajo en AWS. Analizamos seguridad, confiabilidad, excelencia operativa, rendimiento, costos y sostenibilidad, y transformamos los hallazgos en un informe por pilar con riesgos altos y medios, y un plan de acción de 30 a 90 días. Ideal antes de una auditoría, una ronda de inversión o un crecimiento fuerte de tráfico.",
    icon: ClipboardCheck,
    features: [
      "Acceso de solo lectura con rol IAM temporal",
      "Revisión de los seis pilares del framework Well-Architected",
      "Análisis de IAM, redes, backups y configuración de seguridad",
      "Detección de oportunidades de ahorro",
      "Informe ejecutivo y técnico por pilar",
      "Plan de remediación priorizado de 30 a 90 días",
    ],
    benefits: [
      "Visibilidad clara de los riesgos de tu arquitectura",
      "Prioridades concretas en lugar de listas interminables",
      "Preparación para auditorías y due diligence",
      "Ahorros identificados desde la primera revisión",
      "Sin cambios en tu entorno durante la revisión",
    ],
    tags: ["AWS", "Well-Architected", "Security Hub", "Trusted Advisor"],
  },
  {
    id: "backup-dr",
    title: "Backup y Recuperación ante Desastres",
    shortDescription:
      "Definimos RPO y RTO con tu negocio, automatizamos backups entre cuentas y regiones, y probamos que la restauración funcione.",
    fullDescription:
      "Un backup que nunca se restauró es solo una suposición. Definimos con vos cuántos datos podés perder y cuánto tiempo puede estar caído cada sistema, y diseñamos la estrategia adecuada: desde backup y restauración hasta réplicas en otra región. Centralizamos las copias con AWS Backup, las protegemos contra borrado y programamos pruebas de restauración periódicas con resultados documentados.",
    icon: DatabaseBackup,
    features: [
      "Definición de RPO y RTO por aplicación",
      "Políticas centralizadas con AWS Backup",
      "Copias cruzadas entre cuentas y regiones",
      "Bóvedas inmutables protegidas contra borrado",
      "Infraestructura como código para recrear entornos",
      "Pruebas de restauración programadas y runbooks de DR",
    ],
    benefits: [
      "Continuidad del negocio ante fallas o ransomware",
      "Tiempos de recuperación medidos, no estimados",
      "Cumplimiento de requisitos regulatorios y de clientes",
      "Costos de DR acordes a la criticidad de cada sistema",
      "Equipo preparado con procedimientos probados",
    ],
    tags: ["AWS Backup", "Elastic Disaster Recovery", "Amazon S3", "RDS"],
  },
];

const servicesEn: ServiceData[] = [
  {
    id: "observabilidad",
    title: "Observability",
    shortDescription:
      "We implement open-source platforms for real-time data visualization and analysis.",
    fullDescription:
      "Control every critical aspect of your infrastructure with total visibility in real-time. We provide everything you need to collect, categorize, and analyze data from your organization's applications and infrastructure. Get a clear view of critical aspects and make informed decisions that allow you to fix potential issues before they affect end-users.",
    icon: ChartLine,
    features: [
      "Unified infrastructure monitoring",
      "Network traffic and performance analysis",
      "Centralized log management",
      "Service and dependency mapping",
      "Intelligent and predictive alerts",
      "Custom Grafana dashboards",
    ],
    benefits: [
      "Faster problem resolution (Reduced MTTR)",
      "Greater understanding of system performance",
      "Reduced downtime",
      "Infrastructure resource optimization",
      "Data-driven decision making",
    ],
    tags: ["Grafana", "Zabbix", "Prometheus", "ELK Stack"],
  },
  {
    id: "itsm",
    title: "ITSM",
    shortDescription:
      "We manage services and assets autonomously to optimize operational efficiency.",
    fullDescription:
      "We transform IT service management by aligning it with business goals. We implement solutions that automate workflows, manage incidents, problems, and changes efficiently, ensuring the quality and continuity of technological services.",
    icon: Ticket,
    features: [
      "Incident and Request Management",
      "Asset and Inventory Management (ITAM)",
      "Self-Service Portal for users",
      "Integrated Knowledge Base",
      "Workflow automation",
      "SLA reports and metrics",
    ],
    benefits: [
      "Higher end-user satisfaction",
      "Standardization of support processes",
      "Complete visibility of IT assets",
      "Reduced operational costs",
      "Continuous service improvement",
    ],
    tags: ["InvGate", "Service Management", "ITIL", "Help Desk"],
  },
  {
    id: "devops",
    title: "DevOps",
    shortDescription:
      "We accelerate the software development lifecycle through CI/CD practices.",
    fullDescription:
      "We adopt DevOps culture and practices to unite development and operations. We automate software delivery to be faster and more reliable, allowing your company to innovate at the speed the market demands without sacrificing stability.",
    icon: InfinityIcon,
    features: [
      "CI/CD Pipeline Implementation",
      "Infrastructure as Code (IaC)",
      "Container Management (Docker/Kubernetes)",
      "Test automation",
      "Configuration management",
      "Continuous lifecycle monitoring",
    ],
    benefits: [
      "More frequent software releases",
      "Lower change failure rate",
      "Faster incident recovery",
      "Better collaboration between teams",
      "Automation of repetitive tasks",
    ],
    tags: ["CI/CD", "Jenkins", "GitLab", "Kubernetes", "Terraform"],
  },
  {
    id: "automatizacion",
    title: "Automation",
    shortDescription:
      "We optimize your processes through solutions that reduce errors and operational times.",
    fullDescription:
      "We identify and automate manual and repetitive processes using advanced technologies like RPA (Robotic Process Automation) and custom scripts. We free your team from routine tasks so they can focus on higher-value strategic activities.",
    icon: Bot,
    features: [
      "Robotic Process Automation (RPA)",
      "Workflow orchestration",
      "Heterogeneous system integration",
      "Conversational bots and virtual assistants",
      "Administrative task automation",
      "Intelligent document processing",
    ],
    benefits: [
      "Drastic reduction of human errors",
      "Significant time and cost savings",
      "24/7 operation without interruptions",
      "Greater process scalability",
      "Facilitated compliance and auditing",
    ],
    tags: ["RPA", "Python", "Ansible", "Workflows", "AI"],
  },
  {
    id: "staffing",
    title: "IT Staffing",
    shortDescription:
      "We provide professional services and highly qualified technical teams.",
    fullDescription:
      "We provide the technological talent your project needs, when it needs it. Whether to cover demand peaks, specific projects, or specialized long-term roles, we have a network of technically validated professionals ready to integrate into your team.",
    icon: Users,
    features: [
      "Specialized profiles (Devs, QA, DevOps, etc.)",
      "Staff Augmentation",
      "Dedicated Teams (Squads)",
      "IT Recruitment and Selection",
      "Talent administrative management",
      "Flexible contracting models",
    ],
    benefits: [
      "Quick access to scarce talent",
      "Reduced hiring times",
      "Flexibility to scale teams",
      "Reduced administrative burden",
      "Guaranteed operational continuity",
    ],
    tags: ["Outsourcing", "Talent", "Squads", "Recruiting"],
  },
  {
    id: "consultoria",
    title: "Consulting",
    shortDescription:
      "Personalized advice to implement the best technologies.",
    fullDescription:
      "We accompany your organization in defining its technology strategy. Our expert consultants analyze your current situation, identify improvement opportunities, and design clear roadmaps for new technology adoption and digital transformation.",
    icon: Lightbulb,
    features: [
      "Technological diagnosis and assessment",
      "Solution architecture design",
      "Digital transformation planning",
      "Security and compliance audit",
      "IT cost optimization",
      "Vendor and technology selection",
    ],
    benefits: [
      "Expert and impartial vision",
      "Technological risk mitigation",
      "IT alignment with business",
      "Investment optimization",
      "Accelerated adoption of best practices",
    ],
    tags: ["Strategy", "Advisory", "Architecture", "Digital Transformation"],
  },
  {
    id: "cloud",
    title: "Cloud",
    shortDescription:
      "We design and implement scalable and secure cloud architectures.",
    fullDescription:
      "Transform your business with leading cloud services. We design, migrate, and manage architectures on AWS, Azure, and hybrid clouds, ensuring scalability, security, and cost efficiency. Leverage the power of the cloud to innovate without limits.",
    icon: Cloud,
    features: [
      "Cloud Migration (Lift & Shift, Re-platforming)",
      "Cloud Native Architecture Design",
      "Cost Management (FinOps)",
      "Cloud Security and Compliance",
      "Backup and Disaster Recovery",
      "Hybrid and Multi-Cloud Environment Management",
    ],
    benefits: [
      "Elastic scalability on demand",
      "Infrastructure cost reduction (CapEx to OpEx)",
      "Greater agility and time-to-market",
      "High availability and global redundancy",
      "Enterprise-grade security",
    ],
    tags: ["AWS", "Azure", "Red Hat", "Hybrid Cloud", "Migration"],
  },
  {
    id: "devsecops",
    title: "Cloud Security & DevSecOps",
    shortDescription:
      "We integrate security at every stage of development and protect your cloud infrastructure.",
    fullDescription:
      "Security is not an add-on, it is a fundamental part of the process. We implement DevSecOps practices to detect vulnerabilities from code to deployment. We design Zero Trust architectures and ensure regulatory compliance of your cloud environments.",
    icon: ShieldCheck,
    features: [
      "Static and Dynamic Code Analysis (SAST/DAST)",
      "Vulnerability Management",
      "Container Security",
      "Compliance as Code",
      "Identity Management (IAM)",
      "Zero Trust Architecture",
    ],
    benefits: [
      "Reduced security risks",
      "Regulatory compliance (GDPR, PCI-DSS)",
      "Early vulnerability detection",
      "Proactive asset protection",
      "Guaranteed customer trust",
    ],
    tags: ["DevSecOps", "Security", "Compliance", "Zero Trust", "SonarQube"],
  },
  {
    id: "finops",
    title: "FinOps & Cost Optimization",
    shortDescription:
      "We maximize the value of your cloud investment through financial control and optimization.",
    fullDescription:
      "The cloud offers agility, but costs can spiral out of control. We implement FinOps culture to provide visibility, assign accountability, and optimize cloud spending. We analyze your bills, detect waste, and apply savings strategies like Reserved Instances and Savings Plans.",
    icon: CircleDollarSign,
    features: [
      "Cloud cost audit",
      "Tagging allocation",
      "Budgets and intelligent alerts",
      "Idle resource optimization",
      "Savings plan management (RI/Savings Plans)",
      "Cost attribution reporting",
    ],
    benefits: [
      "Significant reduction in cloud bill",
      "Predictability of monthly spending",
      "Higher Return on Investment (ROI)",
      "Culture of financial responsibility",
      "Reinvestment of savings into innovation",
    ],
    tags: ["FinOps", "AWS Cost Explorer", "Azure Cost Management", "Savings"],
  },
  {
    id: "migracion",
    title: "Migration & Modernization",
    shortDescription:
      "We take your legacy applications to the cloud with secure and efficient strategies.",
    fullDescription:
      "We don't just move your servers, we modernize your business. We evaluate your existing applications and define the best migration strategy (Rehost, Replatform, Refactor). We transform monoliths into microservices and ensure a transition without operational interruptions.",
    icon: RefreshCcw,
    features: [
      "Cloud maturity assessment",
      "Migration strategies (6 R's)",
      "Database migration",
      "Modernization to containers",
      "Monolith decomposition",
      "Cut-over planning without downtime",
    ],
    benefits: [
      "Elimination of technical debt",
      "Greater scalability and resilience",
      "Reduced maintenance costs",
      "Preparation for the technological future",
      "Better application performance",
    ],
    tags: ["Migration", "Legacy", "Microservices", "Replatforming"],
  },
  {
    id: "platform-engineering",
    title: "Platform Engineering",
    shortDescription:
      "We build internal platforms that boost your developers' productivity.",
    fullDescription:
      "We reduce the cognitive load on your development teams by creating Internal Developer Platforms (IDPs). We standardize tools, workflows, and environments so developers can self-manage their infrastructure securely and efficiently, accelerating time-to-market.",
    icon: Layers,
    features: [
      "Developer Portals (Backstage)",
      "Service Templates (Golden Paths)",
      "Ephemeral environment management",
      "Self-service infrastructure automation",
      "Unified service catalog",
      "Toolchain standardization",
    ],
    benefits: [
      "Faster development speed",
      "Technological standardization",
      "Better Developer Experience (DX)",
      "Less dependence on operations",
      "Faster onboarding of new devs",
    ],
    tags: ["IDP", "Backstage", "Kubernetes", "Self-service", "DX"],
  },
  {
    id: "sre",
    title: "SRE (Site Reliability Engineering)",
    shortDescription:
      "We guarantee the reliability and performance of your critical systems.",
    fullDescription:
      "We apply engineering to operations to create ultra-reliable and scalable systems. We define SLIs, SLOs, and SLAs, manage the 'Error Budget', and automate incident response. We transform the way your organization manages production.",
    icon: HeartPulse,
    features: [
      "SLI/SLO/SLA Definition",
      "Incident Management and Post-mortems",
      "Chaos Engineering",
      "Toil automation (manual tasks)",
      "Capacity planning",
      "Advanced observability",
    ],
    benefits: [
      "Higher availability (Guaranteed Uptime)",
      "Balance between speed and stability",
      "Blameless learning culture",
      "Better end-user experience",
      "Reduction of alert fatigue",
    ],
    tags: ["SRE", "Reliability", "SLO", "Chaos Engineering", "Datadog"],
  },
  {
    id: "networking",
    title: "Networking & Perimeter Security",
    shortDescription:
      "Expert network administration and security with specialization in Cisco ASA.",
    fullDescription:
      "We ensure the connectivity and protection of your network infrastructure. We offer managed services for Cisco ASA firewalls and networking solutions, guaranteeing optimal performance, high availability, and robust defense against threats. From initial configuration to 24/7 monitoring, we take care of keeping your network secure and efficient.",
    icon: Network,
    features: [
      "Cisco ASA administration and configuration",
      "VPN implementation (Site-to-Site, AnyConnect)",
      "Firewall policies and access control",
      "Intrusion prevention (IPS/IDS)",
      "High Availability and Failover",
      "Traffic and bandwidth monitoring",
    ],
    benefits: [
      "Robust perimeter security",
      "Secure and stable remote connectivity",
      "Reduced downtime",
      "Security compliance",
      "Network performance optimization",
    ],
    tags: ["Cisco ASA", "Firewall", "VPN", "Network Security", "Routing"],
  },
  {
    id: "virtualizacion",
    title: "Virtualization & Private Cloud",
    shortDescription:
      "Expert management of virtual environments with VMware and Proxmox.",
    fullDescription:
      "We optimize your infrastructure through leading virtualization solutions. We manage VMware and Proxmox environments to maximize resource usage, ensure high availability, and simplify disaster recovery. We design, implement, and maintain your private or hybrid cloud with market best practices.",
    icon: Server,
    features: [
      "VMware vSphere and ESXi Administration",
      "Proxmox VE Implementation and Management",
      "Clustering and High Availability (HA)",
      "P2V (Physical to Virtual) and V2V Migration",
      "Storage Management (vSAN, Ceph)",
      "Backup and Recovery (Veeam, PBS)",
    ],
    benefits: [
      "Server consolidation and cost reduction",
      "Greater flexibility and scalability",
      "Rapid failure recovery",
      "Centralized resource management",
      "Isolated test and development environments",
    ],
    tags: ["VMware", "Proxmox", "Virtualization", "Private Cloud", "vCenter"],
  },
  {
    id: "linux-admin",
    title: "Linux Administration",
    shortDescription:
      "Comprehensive support and management for Linux servers (Debian, Ubuntu, Fedora).",
    fullDescription:
      "We guarantee the stability, security, and performance of your Linux servers. Our team of experts administers distributions like Debian, Ubuntu, and Fedora, handling everything from initial configuration and hardening to patching and continuous optimization. Keep your critical systems operating without interruptions.",
    icon: SquareTerminal,
    features: [
      "Linux Server Installation and Configuration",
      "OS Hardening and Security",
      "Patch and Update Management",
      "Automation with Bash and Ansible",
      "Performance Optimization (Kernel tuning)",
      "Service Administration (Web, DB, Mail)",
    ],
    benefits: [
      "Maximized stability and uptime",
      "Reinforced security against vulnerabilities",
      "Optimized application performance",
      "Reduced operational load",
      "Expert support for incident resolution",
    ],
    tags: ["Linux", "Debian", "Ubuntu", "Fedora", "SysAdmin"],
  },
  {
    id: "iac",
    title: "Infrastructure as Code (IaC)",
    shortDescription:
      "We define your AWS infrastructure as code with Terraform, OpenTofu, CloudFormation or CDK: versioned, reviewed and reproducible.",
    fullDescription:
      "No more building infrastructure by hand in the console. We describe networks, compute, databases and permissions in versioned code, with reusable modules, secure remote state and a pipeline that shows the plan on every pull request before applying. We can start from scratch or import what already exists without recreating it. The code lives in your repository and your team can maintain it without depending on us.",
    icon: FileCode,
    features: [
      "Assessment of current infrastructure and automation maturity",
      "Library of versioned Terraform/OpenTofu modules",
      "Remote state in S3 with encryption and locking",
      "Environments split by AWS account (dev, staging, prod)",
      "Plan/apply pipeline with review on every pull request",
      "Import of existing resources and drift detection",
    ],
    benefits: [
      "Identical, reproducible environments",
      "Every change reviewed and audited",
      "Fast recovery from incidents or disasters",
      "Fewer errors from manual changes",
      "No lock-in: the code is yours",
    ],
    tags: ["Terraform", "OpenTofu", "CloudFormation", "AWS CDK"],
  },
  {
    id: "contenedores-kubernetes",
    title: "Containers and Kubernetes on AWS",
    shortDescription:
      "We containerize your applications and run them in production on ECS, Fargate or EKS with automated deployments.",
    fullDescription:
      "We move your applications to lightweight, secure container images and choose with you the orchestrator that best fits your team: ECS on Fargate to run with minimal operations, or EKS when you need the Kubernetes ecosystem. We build everything in a test environment, harden it with autoscaling, observability and security policies, and hand over a documented platform ready to operate.",
    icon: Container,
    features: [
      "Multi-stage Dockerfiles and minimal non-root images",
      "Private Amazon ECR registry with vulnerability scanning",
      "ECS/Fargate or EKS clusters defined as code",
      "Pod and node autoscaling (HPA, Karpenter)",
      "Managed ingress, certificates and load balancing",
      "Secrets from AWS Secrets Manager and network policies",
    ],
    benefits: [
      "Consistent deployments across every environment",
      "Automatic scaling based on real demand",
      "Better use of the capacity you pay for",
      "Updates without service interruptions",
      "A foundation ready for microservices and GitOps",
    ],
    tags: ["Docker", "Kubernetes", "Amazon EKS", "Amazon ECS", "Helm"],
  },
  {
    id: "gitops",
    title: "GitOps",
    shortDescription:
      "Git as the single source of truth: declarative, auditable deployments with one-click rollback using Argo CD or Flux.",
    fullDescription:
      "We implement GitOps so that deploying means approving a pull request. An agent inside the cluster continuously syncs what is in the repository with what is running, detects manual changes and corrects them. Promotions between environments are recorded, rolling back is reverting a commit, and the CI pipeline no longer needs cluster admin credentials.",
    icon: GitPullRequest,
    features: [
      "Argo CD or Flux installation and configuration",
      "Repository structure for applications and environments",
      "Promotion between environments through pull requests",
      "Automatic drift detection and correction",
      "Secrets management with External Secrets or Sealed Secrets",
      "Sync notifications and deployment status",
    ],
    benefits: [
      "Full history of who deployed what and when",
      "Instant rollback by reverting a commit",
      "Self-healing clusters when manual changes happen",
      "Fewer sensitive credentials in CI",
      "More frequent deployments with less risk",
    ],
    tags: ["Argo CD", "Flux", "Kustomize", "Helm"],
  },
  {
    id: "well-architected",
    title: "AWS Well-Architected Review",
    shortDescription:
      "We review your AWS account against the six best-practice pillars and deliver a prioritized improvement plan.",
    fullDescription:
      "A fixed-scope review, with read-only access, of one or more workloads on AWS. We analyze security, reliability, operational excellence, performance, cost and sustainability, and turn the findings into a report by pillar with high and medium risks plus a 30- to 90-day action plan. Ideal before an audit, a funding round or a sharp increase in traffic.",
    icon: ClipboardCheck,
    features: [
      "Read-only access through a temporary IAM role",
      "Review of the six Well-Architected pillars",
      "Analysis of IAM, networking, backups and security settings",
      "Identification of cost-saving opportunities",
      "Executive and technical report by pillar",
      "Prioritized 30- to 90-day remediation plan",
    ],
    benefits: [
      "Clear visibility of your architecture's risks",
      "Concrete priorities instead of endless lists",
      "Readiness for audits and due diligence",
      "Savings identified from the first review",
      "No changes to your environment during the review",
    ],
    tags: ["AWS", "Well-Architected", "Security Hub", "Trusted Advisor"],
  },
  {
    id: "backup-dr",
    title: "Backup and Disaster Recovery",
    shortDescription:
      "We define RPO and RTO with your business, automate cross-account and cross-region backups, and prove that restores work.",
    fullDescription:
      "A backup that has never been restored is just an assumption. We define with you how much data you can lose and how long each system can be down, and design the right strategy: from backup and restore to replicas in another region. We centralize copies with AWS Backup, protect them against deletion and schedule periodic restore tests with documented results.",
    icon: DatabaseBackup,
    features: [
      "RPO and RTO defined per application",
      "Centralized policies with AWS Backup",
      "Cross-account and cross-region copies",
      "Immutable vaults protected against deletion",
      "Infrastructure as code to rebuild environments",
      "Scheduled restore tests and DR runbooks",
    ],
    benefits: [
      "Business continuity through outages or ransomware",
      "Recovery times measured, not estimated",
      "Compliance with regulatory and customer requirements",
      "DR costs matched to each system's criticality",
      "A team prepared with tested procedures",
    ],
    tags: ["AWS Backup", "Elastic Disaster Recovery", "Amazon S3", "RDS"],
  },
];

export const servicesData = servicesEs; // Default export for backward compatibility if needed

// Featured services: 3 pilares principales
const featuredServiceIds = [
  "cloud", // Pilar 1: Cloud & Plataforma
  "devops", // Pilar 2: DevOps & DevSecOps
  "staffing", // Pilar 3: Operación & Soporte IT
];

export function getServices(lang: Language): ServiceData[] {
  return lang === "en" ? servicesEn : servicesEs;
}

export function getFeaturedServices(lang: Language): ServiceData[] {
  const allServices = getServices(lang);
  return featuredServiceIds
    .map((id) => allServices.find((s) => s.id === id))
    .filter((s): s is ServiceData => s !== undefined);
}

export function getServiceById(id: string, lang: Language): ServiceData | undefined {
  const services = getServices(lang);
  return services.find((s) => s.id === id);
}
