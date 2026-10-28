import type { BlogPost } from "./blog";

/** English versions of CloudBit's own articles. Same slugs as the Spanish ones. */
export const blogPostsEn: BlogPost[] = [
  {
    slug: "checklist-antes-de-migrar-a-la-nube",
    title: "Technical checklist before migrating your first application to the cloud",
    excerpt: "Seven points worth settling before moving a single server, so the migration doesn't turn into moving your problems somewhere else.",
    category: "Cloud",
    date: "2026-09-18",
    readingMinutes: 6,
    sections: [
      {
        heading: "An inventory of dependencies, not just servers",
        paragraphs: [
          "A list of virtual machines isn't enough. What sets the migration order is dependencies: which application calls which database, which batch jobs run at night and which integrations reach out to the internet.",
          "Spending a week mapping those relationships avoids the most common scenario: migrating a service and discovering in production that it depended on a resource left on-premise.",
        ],
      },
      {
        heading: "Decide the destination of each application",
        paragraphs: [
          "Not everything deserves the same treatment. Some workloads move as they are, others are better moved to managed services, and a few aren't worth migrating. Deciding per application brings order to budget and schedule.",
        ],
      },
      {
        heading: "Estimate costs before committing",
        paragraphs: [
          "With the inventory in hand you can project the monthly cloud cost and compare it with today's total cost, including power, licenses and maintenance hours. That comparison is what convinces finance.",
        ],
      },
      {
        heading: "Test the rollback, not just the migration",
        paragraphs: [
          "Every migration wave needs a rehearsed plan to go back. If the rollback was never tested, it doesn't really exist.",
        ],
      },
    ],
    faqs: [
      { question: "How long does the assessment take?", answer: "For a mid-sized company, one to two weeks depending on the number of applications." },
      { question: "Do we have to migrate everything at once?", answer: "No. It's best to migrate in small waves, starting with low-risk workloads." },
    ],
  },
  {
    slug: "metricas-dora-para-equipos-chicos",
    title: "DORA metrics for small teams: how to measure without bureaucracy",
    excerpt: "Deploy frequency, lead time, change failure rate and recovery time: what they mean and how to measure them with what you already have.",
    category: "DevOps",
    date: "2026-08-27",
    readingMinutes: 5,
    sections: [
      {
        heading: "Four numbers that describe how you deliver software",
        paragraphs: [
          "DORA metrics summarize the health of your delivery process: how often you release, how long a change takes to reach production, what share of changes cause incidents and how long it takes to recover.",
          "You don't need a new tool. Your repository and pipeline history are enough for a first snapshot.",
        ],
      },
      {
        heading: "Start with deploy frequency",
        paragraphs: [
          "It's the easiest to measure and the fastest to improve once you automate. If you release once a week today, the first goal can be once a day on a pilot service.",
        ],
      },
      {
        heading: "Use them to talk, not to compare people",
        paragraphs: [
          "The metrics describe the system, not individual performance. Using them to rank teams destroys trust and ends up distorting the data.",
        ],
      },
    ],
  },
  {
    slug: "alertas-que-nadie-mira",
    title: "Alerts nobody reads: how to rebuild trust in your monitoring",
    excerpt: "When everything alerts, nothing does. A simple method to clean up thresholds and keep only actionable notifications.",
    category: "Operación",
    date: "2026-07-30",
    readingMinutes: 4,
    sections: [
      {
        heading: "The symptom: muted channels",
        paragraphs: [
          "If most of the team has muted the alerts channel, monitoring has stopped doing its job. The problem is rarely the tool: it's thresholds designed for the worst case and alerts with no owner.",
        ],
      },
      {
        heading: "Every alert needs an action",
        paragraphs: [
          "Review last month's alerts and ask, one by one, what someone did when they received it. If the answer is nothing, delete it or turn it into a dashboard metric.",
        ],
      },
      {
        heading: "Alert on symptoms, not causes",
        paragraphs: [
          "Users care that the page loads fast and without errors, not about CPU usage. Alerting on latency and error rate reduces noise and catches problems that infrastructure metrics miss.",
        ],
      },
    ],
  },
  {
    slug: "ia-generativa-del-piloto-a-produccion",
    title: "Generative AI: what changes between the pilot and production",
    excerpt: "The demo works in an afternoon; taking it to production requires curated data, permissions, evaluation and cost control.",
    category: "Datos e IA",
    date: "2026-07-02",
    readingMinutes: 7,
    sections: [
      {
        heading: "The pilot tests the idea, not the solution",
        paragraphs: [
          "An assistant that answers well over ten hand-picked documents guarantees nothing about ten thousand real documents, with old versions, duplicates and different permissions.",
        ],
      },
      {
        heading: "Permissions by design",
        paragraphs: [
          "The assistant should only answer with information the user can already see. That means carrying permissions from the source systems into the search index, not adding them at the end.",
        ],
      },
      {
        heading: "Measure answer quality",
        paragraphs: [
          "A set of test questions with expected answers lets you catch regressions every time the model, the prompt or the data changes.",
        ],
      },
      {
        heading: "Control the cost per query",
        paragraphs: [
          "Choosing the model based on question complexity and caching frequent answers can cut the monthly cost significantly without hurting the experience.",
        ],
      },
    ],
    faqs: [
      { question: "Do I need to train my own model?", answer: "In most cases, no. Connecting an existing model to your data with semantic search is enough." },
    ],
  },
  {
    slug: "terraform-primeros-pasos-en-equipo",
    title: "Terraform as a team: five agreements to avoid stepping on each other",
    excerpt: "Remote state, modules, reviews and conventions: the minimum for infrastructure as code to scale with your team.",
    category: "DevOps",
    date: "2026-06-11",
    readingMinutes: 5,
    sections: [
      {
        heading: "Remote state with locking",
        paragraphs: [
          "The state file should never live on a laptop. A remote backend with locking prevents two people from applying changes at the same time.",
        ],
      },
      {
        heading: "Changes only through pull requests",
        paragraphs: [
          "Posting the Terraform plan as a review comment shows exactly what will change before applying it, and keeps a record of who approved what.",
        ],
      },
      {
        heading: "Small, versioned modules",
        paragraphs: [
          "One module per component, with explicit versions, lets you upgrade one environment at a time and roll back if something fails.",
        ],
      },
    ],
  },
  {
    slug: "reducir-factura-cloud-sin-tocar-codigo",
    title: "How to lower your cloud bill without touching a line of code",
    excerpt: "Scheduled shutdowns, right-sizing and usage commitments: three levers that often save 20% to 40%.",
    category: "Cloud",
    date: "2026-05-21",
    readingMinutes: 4,
    sections: [
      {
        heading: "Turn off what isn't used",
        paragraphs: [
          "Development and test environments rarely need to run at night or on weekends. An automatic shutdown schedule is the fastest saving.",
        ],
      },
      {
        heading: "Right-size with data",
        paragraphs: [
          "Instances are often sized for an imagined worst case. Reviewing actual CPU and memory usage over a month shows which ones can be downsized safely.",
        ],
      },
      {
        heading: "Commit to steady usage",
        paragraphs: [
          "For the baseline load that runs all year, savings plans and reserved instances offer significant discounts in exchange for a usage commitment.",
        ],
      },
    ],
  },
];
