import type { CaseStudy } from "./cases";

export const casesEn: CaseStudy[] = [
  {
    slug: "fintech-migracion-aws",
    industry: "Fintech",
    title: "A fintech that left the datacenter and scaled smoothly through its peak season",
    summary: "Full migration to AWS with Kubernetes, CI/CD and observability to handle traffic peaks.",
    size: "50-200 employees",
    duration: "8 weeks",
    tags: ["AWS", "Kubernetes", "CI/CD", "Terraform"],
    solutionSlug: "migracion-cloud",
    about:
      "A digital payments platform for merchants operating across several provinces. Its on-premise infrastructure had grown piece by piece, and every commercial peak required hardware purchases months in advance.",
    needs: [
      "Handle traffic peaks of up to three times normal demand",
      "Cut manual deploys that took 4 to 6 hours",
      "Lower the fixed cost of running their own servers",
      "Improve visibility into production incidents",
    ],
    work: [
      { title: "AWS landing zone", description: "Separate accounts per environment, private networks and guardrails defined with Terraform." },
      { title: "Container platform", description: "Services migrated to EKS with autoscaling, backed by RDS and ElastiCache." },
      { title: "Continuous delivery", description: "GitLab pipelines and declarative deployments with ArgoCD." },
      { title: "Observability", description: "Prometheus, Grafana and actionable alerts per service." },
    ],
    results: [
      { label: "Infrastructure costs", value: "-35%" },
      { label: "Deploy time", value: "6h → 15min" },
      { label: "Peak capacity", value: "3x" },
      { label: "Recovery time", value: "<5min" },
    ],
    testimonial: {
      quote: "The migration was flawless. We cut costs and can now scale without ordering hardware months ahead.",
      role: "CTO, payments fintech",
    },
  },
  {
    slug: "saas-b2b-entrega-continua",
    industry: "B2B SaaS",
    title: "A B2B SaaS that went from one deploy a week to fifteen a day",
    summary: "CI/CD pipelines, GitOps and full-stack observability for an overloaded product team.",
    size: "20-50 employees",
    duration: "6 weeks",
    tags: ["DevOps", "GitOps", "Observability"],
    solutionSlug: "automatizacion-devops",
    about:
      "Management software for mid-sized companies with customers across Latin America. The engineering team was small, and every release meant coordinating people, schedules and manual steps.",
    needs: [
      "Remove manual steps from the release process",
      "Catch errors before they reached customers",
      "Free the team from repetitive operational tasks",
      "Get end-to-end visibility when something fails",
    ],
    work: [
      { title: "CI/CD pipelines", description: "Automated build, tests and packaging for every service." },
      { title: "GitOps", description: "Declarative deployments with ArgoCD and promotion between environments via pull request." },
      { title: "Full-stack observability", description: "Logs, metrics and traces correlated with OpenTelemetry." },
      { title: "Training", description: "Hands-on sessions so the team can run and extend the platform." },
    ],
    results: [
      { label: "Deploy frequency", value: "15/day" },
      { label: "Failure rate", value: "-80%" },
      { label: "Recovery time", value: "2h → 10min" },
      { label: "Time for features", value: "+40%" },
    ],
    testimonial: {
      quote: "We went from stressful deploys to frictionless continuous delivery. Today the team focuses on the product.",
      role: "Head of Engineering, B2B SaaS",
    },
  },
  {
    slug: "ecommerce-devsecops-pci",
    industry: "E-commerce",
    title: "An e-commerce company that closed 47 vulnerabilities and achieved PCI-DSS in three months",
    summary: "DevSecOps, cloud-native architecture and perimeter security to meet PCI-DSS Level 1.",
    size: "100-500 employees",
    duration: "12 weeks",
    tags: ["DevSecOps", "Security", "PCI-DSS", "AWS"],
    solutionSlug: "automatizacion-devops",
    about:
      "A retailer with a high-traffic online store. An external audit found critical vulnerabilities and missing controls required by the card networks.",
    needs: [
      "Fix the vulnerabilities found in the audit",
      "Meet PCI-DSS controls by the committed deadline",
      "Keep new vulnerabilities from reaching production",
      "Scale the store during special dates",
    ],
    work: [
      { title: "Security in the pipeline", description: "Code, dependency and image scanning on every change." },
      { title: "Cloud-native architecture", description: "Network segmentation and managed services on AWS." },
      { title: "Perimeter protection", description: "WAF, DDoS protection and centralized secrets management." },
      { title: "PCI support", description: "Evidence, policies and controls ready for the audit." },
    ],
    results: [
      { label: "Critical vulnerabilities", value: "47 → 0" },
      { label: "PCI-DSS certification", value: "3 months" },
      { label: "Availability", value: "99.97%" },
      { label: "Annual savings", value: "-28%" },
    ],
    testimonial: {
      quote: "Building security in from the design let us certify in record time without slowing sales.",
      role: "Technology Manager, retail",
    },
  },
];
