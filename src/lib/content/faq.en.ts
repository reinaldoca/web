import type { FaqCategory } from "./faq";

export const faqCategoriesEn: FaqCategory[] = [
  {
    id: "general",
    name: "General",
    items: [
      {
        id: "global-coverage",
        question: "Do you work with companies in other countries?",
        answer:
          "Yes. We work remotely with clients in any country, in English or Spanish. We schedule meetings, sprints and reports in your time zone, and our 24/7 support plans cover incidents at any hour.",
      },
      {
        id: "consultation-cost",
        question: "How much does an initial consultation cost?",
        answer:
          "The first technical consultation is free and with no commitment. It lasts 30 to 45 minutes with a senior cloud architect, and afterwards we send you a short assessment with initial recommendations.",
      },
      {
        id: "certifications",
        question: "What certifications does the team hold?",
        answer: "We have more than 15 engineers certified in AWS, Azure, Kubernetes (CKA/CKAD), GitLab and Terraform.",
      },
    ],
  },
  {
    id: "migracion",
    name: "Migration",
    items: [
      {
        id: "migration-time",
        question: "How long does a cloud migration take?",
        answer:
          "A standard migration takes 4 to 8 weeks, including two weeks of stabilization. We work in small waves with weekly deliverables; for complex legacy applications it can take longer, always with a clear roadmap from the start.",
      },
      {
        id: "downtime",
        question: "Will I have downtime during the migration?",
        answer:
          "We design every wave to minimize the cutover window. In most cases the final switch happens outside business hours and takes minutes, with a rollback plan tested in advance.",
      },
      {
        id: "which-cloud",
        question: "AWS or Azure?",
        answer:
          "It depends on your stack, your licenses and your team. During the assessment we compare costs and capabilities for your actual workloads and recommend the best fit.",
      },
    ],
  },
  {
    id: "operacion",
    name: "Operations and support",
    items: [
      {
        id: "support-24-7",
        question: "Do you provide 24/7 support?",
        answer:
          "Yes. Our 24/7 plans include proactive monitoring, incident response and severity-based escalation with defined SLAs. For standard projects we offer support during business hours with response in under 2 hours.",
      },
      {
        id: "internal-team",
        question: "What if I already have an internal DevOps team?",
        answer:
          "We work in three ways: adding expertise in specific areas, training your team so it becomes autonomous, or providing temporary engineers to scale a project.",
      },
    ],
  },
  {
    id: "datos-ia",
    name: "Data and AI",
    items: [
      {
        id: "ai-data-privacy",
        question: "Is my data used to train third-party models?",
        answer:
          "No. We build assistants with services that don't use your data for training, inside your own cloud account and with role-based access controls.",
      },
      {
        id: "ai-first-step",
        question: "Where should I start with generative AI?",
        answer:
          "With a narrow, measurable use case, such as answering internal questions about documentation. We validate value in a few weeks before scaling.",
      },
    ],
  },
];
