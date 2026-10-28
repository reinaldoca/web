import { Cloud, Workflow, Headset, BrainCircuit } from "lucide-react";
import type { Solution } from "./solutions";

export const solutionsEn: Solution[] = [
  {
    slug: "migracion-cloud",
    title: "Cloud migration",
    tagline: "Leave the datacenter without slowing the business",
    intro:
      "We plan and execute the move of your applications and data to AWS or Azure with short cutover windows, tested rollback and costs estimated before the first server moves.",
    icon: Cloud,
    signals: [
      "Your physical servers are reaching end of life",
      "Scaling for a demand peak takes weeks of purchasing",
      "Backups exist, but nobody has tested a full restore",
      "The team spends more time maintaining hardware than building",
      "You don't know what each application really costs",
      "A datacenter outage would stop the business",
    ],
    benefits: [
      { title: "Elastic capacity", description: "Resources that grow with demand and shut down when unused." },
      { title: "Visible costs", description: "Tagging and budgets per application from day one." },
      { title: "Continuity", description: "Multi-zone replicas and recovery plans with periodic tests." },
      { title: "Speed", description: "New environments in minutes with infrastructure as code." },
    ],
    steps: [
      { title: "Assessment", description: "Inventory of applications, dependencies and availability requirements." },
      { title: "Per-application strategy", description: "We decide whether each workload is rehosted, replatformed or rewritten." },
      { title: "Landing zone", description: "Accounts, networks, identities and guardrails ready with Terraform." },
      { title: "Migration waves", description: "We move in small groups, with tests and a rollback plan in every wave." },
      { title: "Stabilization", description: "Two weeks of support, right-sizing and handover to your team." },
    ],
    relatedServiceIds: ["cloud", "migracion", "finops"],
    quote: "Migrating isn't copying servers: it's the chance to leave behind the technical debt nobody wanted to touch.",
    stages: [
      { name: "Assess", deliverables: ["Inventory and dependency map", "Cloud cost estimate", "Wave-based roadmap"] },
      { name: "Build", deliverables: ["Landing zone with IaC", "Baseline networking and security", "Deployment pipelines"] },
      { name: "Migrate", deliverables: ["Waves with rollback", "Functional validation", "Cutover and stabilization"] },
    ],
  },
  {
    slug: "automatizacion-devops",
    title: "Automation and DevOps",
    tagline: "From manual deploys to continuous delivery",
    intro:
      "We design CI/CD pipelines, infrastructure as code and automated security controls so your team can ship several times a day with fewer failures.",
    icon: Workflow,
    signals: [
      "Every deploy needs a specific person and a night window",
      "Test and production environments don't match",
      "A rollback means restoring backups by hand",
      "Vulnerabilities are found after going to production",
      "Infrastructure changes are made from the console",
      "Nobody knows for sure which version runs in each environment",
    ],
    benefits: [
      { title: "Deploys in minutes", description: "Repeatable pipelines that remove manual steps." },
      { title: "Fewer incidents", description: "Automated tests and scans before every release." },
      { title: "Identical environments", description: "Terraform and containers so what you test is what you deploy." },
      { title: "Traceability", description: "Every change is versioned, reviewed and audited." },
    ],
    steps: [
      { title: "Delivery assessment", description: "We measure current deploy frequency, lead time and failure rate." },
      { title: "Baseline pipeline", description: "Automated build, tests and packaging for the first service." },
      { title: "Infrastructure as code", description: "We bring networks, clusters and databases into Terraform." },
      { title: "Security in the pipeline", description: "SAST, image scanning and secrets management." },
      { title: "Rollout to the rest", description: "Reusable templates so every team can adopt the model." },
    ],
    relatedServiceIds: ["devops", "devsecops", "platform-engineering"],
    quote: "A team that ships often ships with less fear, because every change is small and reversible.",
    stages: [
      { name: "Measure", deliverables: ["Baseline DORA metrics", "Delivery flow map", "Automation priorities"] },
      { name: "Automate", deliverables: ["CI/CD on GitLab or GitHub", "IaC with Terraform", "GitOps with ArgoCD"] },
      { name: "Protect", deliverables: ["Code and image scanning", "Policy as code", "Secrets management"] },
    ],
  },
  {
    slug: "operacion-24-7",
    title: "24/7 operations",
    tagline: "Your platform watched while your team builds",
    intro:
      "We monitor, respond to incidents and maintain your cloud infrastructure with defined SLAs, so your team can focus on the product instead of late-night alerts.",
    icon: Headset,
    signals: [
      "Customers notice an outage before your team does",
      "There are so many alerts that nobody looks at them",
      "There is no on-call rotation outside business hours",
      "Security patches are applied when there's time",
      "Each incident is handled differently depending on who takes it",
      "Platform knowledge depends on one or two people",
    ],
    benefits: [
      { title: "SLA-backed response", description: "Agreed response times based on incident severity." },
      { title: "Real observability", description: "Metrics, logs and traces correlated in one place." },
      { title: "Planned maintenance", description: "Patches, upgrades and backups on a schedule, with reports." },
      { title: "Continuous improvement", description: "Blameless post-mortems and actions so it doesn't happen again." },
    ],
    steps: [
      { title: "Onboarding", description: "We review the platform, access and existing procedures." },
      { title: "Monitoring", description: "We set up dashboards, actionable alerts and thresholds." },
      { title: "Runbooks", description: "We document the response to each type of incident." },
      { title: "Active on-call", description: "24/7 coverage with escalation by severity." },
      { title: "Monthly reports", description: "Availability, incidents, costs and recommendations." },
    ],
    relatedServiceIds: ["staffing", "observabilidad", "sre"],
    quote: "The best on-call is the one that barely rings, because problems are caught before they become incidents.",
    stages: [
      { name: "Observe", deliverables: ["Per-service dashboards", "Alerts with agreed thresholds", "Asset inventory"] },
      { name: "Respond", deliverables: ["24/7 on-call", "Incident runbooks", "Status communication"] },
      { name: "Improve", deliverables: ["Post-mortems", "Reliability backlog", "Monthly report"] },
    ],
  },
  {
    slug: "datos-e-ia",
    title: "Data and AI",
    tagline: "Organized data for decisions and useful models",
    intro:
      "We build the data foundation and infrastructure so analytics and generative AI work in production, with governance, security and costs under control.",
    icon: BrainCircuit,
    signals: [
      "Each department has its own version of the numbers",
      "Reports are built by hand by copying spreadsheets",
      "You tried generative AI, but it never got past the demo",
      "It's unclear who can see which data",
      "Historical data is scattered across several systems",
      "Processing costs grow without explanation",
    ],
    benefits: [
      { title: "A single source of truth", description: "Integrated, modeled data for every department." },
      { title: "AI in production", description: "Assistants and automations on your own data with access controls." },
      { title: "Governance", description: "Catalog, lineage and role-based permissions by design." },
      { title: "Predictable costs", description: "Serverless architectures and tiered storage." },
    ],
    steps: [
      { title: "Use cases", description: "We prioritize the business questions and processes to automate." },
      { title: "Data platform", description: "Ingestion, storage and modeling on AWS or Azure." },
      { title: "Quality and governance", description: "Validations, catalog and role-based permissions." },
      { title: "Analytics and AI", description: "Dashboards and assistants connected to curated data." },
      { title: "Operations", description: "Monitoring of pipelines, costs and model performance." },
    ],
    relatedServiceIds: ["automatizacion", "consultoria", "cloud"],
    quote: "An AI model is only as good as the data that feeds it: the work starts long before the prompt.",
    stages: [
      { name: "Prioritize", deliverables: ["Use-case map", "Assessment of available data", "Value roadmap"] },
      { name: "Build", deliverables: ["Lakehouse or data warehouse", "Ingestion pipelines", "Semantic model"] },
      { name: "Activate", deliverables: ["Business dashboards", "Generative AI assistant", "Monitoring and costs"] },
    ],
  },
];
