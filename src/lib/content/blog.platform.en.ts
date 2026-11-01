import type { BlogPost } from "./blog";

/** AWS platform articles: IaC, containers, GitOps, DevSecOps, costs, DR and Well-Architected (English). Same slugs as Spanish. */
export const platformPostsEn: BlogPost[] = [
  {
    slug: "terraform-en-aws-estructura-iac",
    title: "Terraform on AWS: how to structure your infrastructure as code from day one",
    excerpt: "Remote state, modules, environments and reviews: the minimum structure for Terraform to scale with your team instead of becoming another fragile system.",
    category: "DevOps",
    date: "2026-10-28",
    readingMinutes: 8,
    sections: [
      {
        heading: "Why infrastructure as code",
        paragraphs: [
          "When infrastructure is created from the console, every environment ends up slightly different and nobody can rebuild it with confidence. With infrastructure as code (IaC), networks, databases and clusters are described in versioned files: they are reviewed like any other change, reproduced identically in every environment and can be rebuilt after an incident.",
          "Terraform is the most widely used tool for this on AWS because it uses a declarative language (HCL), has a very complete AWS provider and also manages third-party services such as DNS, monitoring or repositories.",
        ],
      },
      {
        heading: "Remote state and locking from the first commit",
        paragraphs: [
          "Terraform keeps track of the resources it created in a state file. That file should never live on a laptop: on AWS the usual setup is an S3 bucket with versioning and encryption, plus a locking mechanism so two people can't apply changes at the same time. Recent Terraform versions can lock state directly in S3, without a separate DynamoDB table.",
          "Split state by environment and by component. A single giant state makes every plan take minutes and lets an error in one area block all the others.",
        ],
      },
      {
        heading: "Small, versioned modules with a clear purpose",
        paragraphs: [
          "One module per component (network, cluster, database, bucket with policies) with well-defined inputs and outputs. Modules are versioned with tags and each environment pins the version it uses, so you can upgrade staging first and production afterwards.",
          "Avoid “all-in-one” modules with dozens of optional variables: they are hard to understand and any change affects every consumer.",
        ],
      },
      {
        heading: "Environments: folders before workspaces",
        paragraphs: [
          "For most teams, one folder per environment (dev, staging, prod) calling the same modules with different values works better than workspaces. It is explicit, allows separate AWS accounts per environment and makes it obvious what is about to change.",
          "Splitting environments into separate accounts with AWS Organizations adds a real barrier: a mistake in dev cannot touch production even if someone runs a command in the wrong directory.",
        ],
      },
      {
        heading: "Plan on the pull request, apply from the pipeline",
        paragraphs: [
          "Every infrastructure change goes through a pull request: the pipeline runs formatting, validation, a security scan (tfsec, Checkov or similar) and posts the plan as a comment. Reviewers see exactly what will be created, changed or destroyed.",
          "The pipeline runs the apply with a dedicated AWS role and temporary credentials via OIDC, never with a user's access keys. That leaves a trail of who approved each change and nobody needs administrator permissions on their machine.",
        ],
      },
    ],
    faqs: [
      { question: "Can I bring existing infrastructure into Terraform?", answer: "Yes. With import blocks or terraform import you add existing resources to the state without recreating them. Do it component by component and check that the plan shows no changes before moving on." },
      { question: "Terraform or OpenTofu?", answer: "OpenTofu is an open-source fork compatible with most Terraform configurations. The choice depends on the license you prefer and the integrations you use; the structure recommended in this article works for both." },
    ],
  },
  {
    slug: "terraform-vs-cloudformation-vs-cdk",
    title: "Terraform, CloudFormation or CDK: which one to choose for your AWS infrastructure",
    excerpt: "All three describe infrastructure as code, but they differ in language, scope and workflow. A practical guide to decide.",
    category: "Cloud",
    date: "2026-10-21",
    readingMinutes: 7,
    sections: [
      {
        heading: "Three approaches to the same problem",
        paragraphs: [
          "CloudFormation is AWS's native service: you write YAML or JSON templates and AWS manages state and execution. Terraform is a multi-provider tool with its own language (HCL) and a state file managed by the team. AWS CDK lets you define infrastructure in TypeScript, Python or other languages and generates CloudFormation templates under the hood.",
        ],
      },
      {
        heading: "When CloudFormation makes sense",
        paragraphs: [
          "If all your infrastructure is on AWS and you want the provider itself to manage state, rollbacks and integration with services like Service Catalog or StackSets for many accounts, CloudFormation is a solid choice at no extra cost.",
          "Its main drawbacks are verbose templates and AWS-only scope: external DNS, monitoring or your code repository stay outside.",
        ],
      },
      {
        heading: "When Terraform makes sense",
        paragraphs: [
          "When the platform combines AWS with other services (Cloudflare, Datadog, GitHub, another cloud) or the team already knows HCL, Terraform lets you manage everything with one tool and one review workflow.",
          "In exchange, the team owns the state file: where it lives, how it is locked and who has access.",
        ],
      },
      {
        heading: "When CDK makes sense",
        paragraphs: [
          "CDK shines when developers want to define infrastructure in the same language as the application, with reusable abstractions, typing and unit tests. It is very productive for serverless and container applications on AWS.",
          "Keep in mind the end result is CloudFormation: CloudFormation limits and deployment times still apply.",
        ],
      },
      {
        heading: "Our recommendation",
        paragraphs: [
          "For most companies using several tools besides AWS, Terraform is the most flexible starting point. For development teams that live on AWS and prefer to code, CDK. For organizations with many accounts and strong central governance, CloudFormation with StackSets.",
          "What matters is not the tool but the process: every infrastructure change versioned, reviewed and applied from a pipeline.",
        ],
      },
    ],
  },
  {
    slug: "docker-en-produccion-buenas-practicas",
    title: "Docker in production: best practices for secure, lightweight images",
    excerpt: "Multi-stage builds, unprivileged users, vulnerability scanning and immutable tags: what separates a lab container from a production-ready one.",
    category: "DevOps",
    date: "2026-10-14",
    readingMinutes: 6,
    sections: [
      {
        heading: "Multi-stage builds for small images",
        paragraphs: [
          "Separating the build stage from the final image leaves out compilers, development dependencies and temporary files. A smaller image downloads faster, starts sooner and has a smaller attack surface.",
          "As a base, prefer minimal, maintained images (slim, distroless or Alpine when the application tolerates it) and pin the exact version instead of using latest.",
        ],
      },
      {
        heading: "Never as root",
        paragraphs: [
          "By default, a container runs as root. Define an unprivileged user in the Dockerfile and, in the orchestrator, a read-only file system with no extra capabilities. If someone exploits the application, the damage stays contained.",
        ],
      },
      {
        heading: "Secrets outside the image",
        paragraphs: [
          "Passwords and keys don't belong in the Dockerfile or in build variables: they get baked into the image layers. On AWS they are injected at runtime from Secrets Manager or Parameter Store, with permissions scoped to the service that needs them.",
        ],
      },
      {
        heading: "Scanning and immutable tags",
        paragraphs: [
          "Scan every image in the pipeline (Trivy, Grype or Amazon ECR scanning) and block deployment on critical vulnerabilities. In ECR, enable immutable tags and use the commit hash as the tag: you know exactly what code runs in each environment and can roll back with confidence.",
        ],
      },
      {
        heading: "Observable containers",
        paragraphs: [
          "Write logs to standard output in a structured format, expose a health endpoint and honor the shutdown signal to finish in-flight connections. The orchestrator does the rest: it collects logs, restarts unhealthy containers and replaces instances without downtime.",
        ],
      },
    ],
  },
  {
    slug: "contenedores-en-aws-ecs-eks-fargate",
    title: "Containers on AWS: ECS, EKS or Fargate?",
    excerpt: "Three ways to run containers on AWS with different levels of control and operational complexity. How to choose based on your team and workload.",
    category: "Cloud",
    date: "2026-10-07",
    readingMinutes: 7,
    sections: [
      {
        heading: "Orchestrator and capacity: two separate decisions",
        paragraphs: [
          "On AWS it helps to split two questions: which orchestrator to use (ECS, AWS's native one, or EKS, managed Kubernetes) and where containers run (EC2 instances you manage, or Fargate, where AWS manages the servers). Fargate works with both orchestrators.",
        ],
      },
      {
        heading: "ECS: simple and deeply integrated",
        paragraphs: [
          "ECS has fewer moving parts, integrates natively with load balancers, IAM, CloudWatch and Secrets Manager, and doesn't charge for the control plane. For small and mid-sized teams running web apps and APIs, it is usually the fastest path to production.",
        ],
      },
      {
        heading: "EKS: the Kubernetes ecosystem",
        paragraphs: [
          "EKS makes sense when you need portability across clouds or on-premise environments, Kubernetes ecosystem tools (Helm, Argo CD, operators) or teams that already know Kubernetes. In exchange it requires more knowledge: version upgrades, add-ons, network policies and a steeper learning curve.",
          "Tools like Karpenter for node autoscaling and EKS Auto Mode significantly reduce the operational work.",
        ],
      },
      {
        heading: "Fargate: no servers to manage",
        paragraphs: [
          "With Fargate there are no instances to patch and no capacity to plan: you pay for the CPU and memory of each task. It is ideal for variable workloads and teams without dedicated operations staff. For large, steady workloads, EC2 with reserved or Spot instances can be cheaper.",
        ],
      },
      {
        heading: "How we decide with our clients",
        paragraphs: [
          "Without a strong Kubernetes requirement, we start with ECS on Fargate: it demands the least operations. If the team already works with Kubernetes or needs its ecosystem, EKS with managed nodes and Karpenter. Either way, everything is defined as infrastructure as code and deployed from a pipeline.",
        ],
      },
    ],
    faqs: [
      { question: "Can I start on ECS and move to EKS later?", answer: "Yes. If the applications are properly containerized and the infrastructure is in code, the migration is mostly about deployment definitions; container images don't change." },
    ],
  },
  {
    slug: "gitops-con-argo-cd",
    title: "GitOps with Argo CD: declarative, auditable deployments on Kubernetes",
    excerpt: "With GitOps, the repository is the single source of truth and the cluster syncs itself. What it solves, how to implement it and which mistakes to avoid.",
    category: "DevOps",
    date: "2026-09-30",
    readingMinutes: 6,
    sections: [
      {
        heading: "What GitOps is",
        paragraphs: [
          "In GitOps, the desired state of applications and cluster configuration lives in a Git repository. An agent inside the cluster, such as Argo CD or Flux, continuously compares that state with what is running and applies the differences. Deploying means merging a pull request.",
        ],
      },
      {
        heading: "What problems it solves",
        paragraphs: [
          "Every change is recorded with author, review and date. Rolling back is reverting a commit. Manual changes in the cluster are detected as drift and corrected automatically. And the CI pipeline no longer needs cluster admin credentials: it only publishes images and updates the repository.",
        ],
      },
      {
        heading: "Application repo and deployment repo",
        paragraphs: [
          "A common practice is to separate application code from deployment manifests. The pipeline builds the image, tags it with the commit hash and opens a change in the deployment repository with the new version. Promoting from staging to production is another pull request, with its own approval.",
        ],
      },
      {
        heading: "Secrets in GitOps",
        paragraphs: [
          "Secrets are never stored in plain text in Git. Common options on AWS are External Secrets Operator, which reads from Secrets Manager, or Sealed Secrets, which stores encrypted versions only the cluster can decrypt.",
        ],
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "Mixing manual deployments with GitOps makes the agent revert changes and causes confusion. Enabling automatic sync with resource pruning without understanding its scope can delete things you didn't expect. Start with one application, manual sync and drift alerts; automate once the team is comfortable.",
        ],
      },
    ],
  },
  {
    slug: "devsecops-en-aws-seguridad-en-el-pipeline",
    title: "DevSecOps on AWS: how to build security into your CI/CD pipeline",
    excerpt: "Scanning code, dependencies, images and infrastructure on every change, plus controls in the AWS account. Security that keeps pace with delivery instead of slowing it down.",
    category: "Seguridad",
    date: "2026-09-24",
    readingMinutes: 8,
    sections: [
      {
        heading: "Security from the first commit",
        paragraphs: [
          "DevSecOps means moving security controls as early as possible: fixing a vulnerability in the pull request is far cheaper than after an audit or, worse, an incident. The goal isn't more paperwork but automated checks that run on every change.",
        ],
      },
      {
        heading: "What to scan on every pull request",
        paragraphs: [
          "Your own code with static analysis (SAST), dependencies with software composition analysis (SCA) to catch libraries with known vulnerabilities, leaked secrets in the code, and infrastructure as code to catch public buckets, open ports or disabled encryption before they exist.",
          "The key is defining thresholds: critical findings block the merge; medium ones create a task with a due date.",
        ],
      },
      {
        heading: "Images and artifacts",
        paragraphs: [
          "Every container image is scanned before being pushed to ECR and rechecked periodically, because new vulnerabilities appear in old images. Signing images and generating a software bill of materials (SBOM) makes it easy to know what's affected when a major vulnerability is published.",
        ],
      },
      {
        heading: "Pipelines without long-lived credentials",
        paragraphs: [
          "Pipelines authenticate to AWS with OIDC and least-privilege IAM roles using temporary credentials. That way there are no access keys stored in the CI system that could leak.",
        ],
      },
      {
        heading: "Controls in the AWS account",
        paragraphs: [
          "The pipeline protects what gets deployed; the account needs its own controls: CloudTrail in every region, GuardDuty for threat detection, Security Hub to centralize findings, AWS Config to catch insecure configurations, and organization policies that prevent, for example, disabling audit logs.",
        ],
      },
    ],
    faqs: [
      { question: "Does DevSecOps slow down deployments?", answer: "Done right, no. Scans run in parallel and take minutes. What changes is that problems are caught earlier, when they're cheaper to fix." },
    ],
  },
  {
    slug: "fugas-de-costo-en-aws",
    title: "The most common AWS cost leaks (and how to fix them)",
    excerpt: "NAT Gateways, forgotten snapshots, unused disks and environments running overnight: where AWS budget disappears without anyone noticing.",
    category: "Cloud",
    date: "2026-09-17",
    readingMinutes: 6,
    sections: [
      {
        heading: "Data transfer and NAT Gateways",
        paragraphs: [
          "NAT Gateways charge per hour and per gigabyte processed. When private instances pull container images or talk to S3 and DynamoDB through the NAT, the bill grows quickly. VPC gateway endpoints for S3 and DynamoDB (no hourly charge) and a nearby private image registry usually fix it.",
        ],
      },
      {
        heading: "Storage nobody deletes",
        paragraphs: [
          "Detached EBS volumes, snapshots of instances that no longer exist, old AMIs and buckets without lifecycle rules pile up month after month. An S3 lifecycle policy and a periodic review of unused snapshots and volumes recover money with no risk.",
        ],
      },
      {
        heading: "Environments running after hours",
        paragraphs: [
          "Development and test environments are rarely used at night or on weekends. Shutting them down automatically on a schedule can cut their cost by more than half.",
        ],
      },
      {
        heading: "Oversized instances",
        paragraphs: [
          "AWS Compute Optimizer analyzes actual CPU and memory usage and recommends smaller sizes or more efficient families such as Graviton. Combined with Savings Plans for the steady baseline, savings are usually significant.",
        ],
      },
      {
        heading: "Logs without retention",
        paragraphs: [
          "CloudWatch log groups keep everything forever by default. Setting retention per environment (for example, 14 days in development and 90 in production) and exporting to S3 what must be kept longer prevents a silent leak.",
        ],
      },
    ],
  },
  {
    slug: "backup-y-dr-en-aws-rpo-rto",
    title: "Backup and disaster recovery on AWS: how to define RPO and RTO (and test them)",
    excerpt: "Having backups isn't enough: you need to know how much data you can lose, how long you can take to recover, and to have tested the restore before you need it.",
    category: "Operación",
    date: "2026-09-03",
    readingMinutes: 7,
    sections: [
      {
        heading: "RPO and RTO in business terms",
        paragraphs: [
          "RPO (recovery point objective) is how much data you can afford to lose: an hour, a day. RTO (recovery time objective) is how long the service can be down before the impact becomes unacceptable. They are defined with the business, per application, and they drive the strategy and the cost.",
        ],
      },
      {
        heading: "Four strategies, from lowest to highest cost",
        paragraphs: [
          "Backup and restore: the cheapest, with an RTO of hours. Pilot light: data is replicated and minimal infrastructure is ready to scale. Warm standby: a scaled-down version runs in another region. Active-active: several regions serve traffic at once, with near-zero RTO and the highest cost.",
        ],
      },
      {
        heading: "AWS Backup as the central point",
        paragraphs: [
          "AWS Backup centralizes copies of RDS, DynamoDB, EBS, EFS and S3 with tag-based policies. Copies to another account and region protect against human error or compromised access, and vault lock prevents anyone from deleting them early.",
        ],
      },
      {
        heading: "Infrastructure as code to recover fast",
        paragraphs: [
          "If the infrastructure is in Terraform or CloudFormation, recreating it in another region means running the code with different parameters. Without IaC, recovery depends on documentation that is usually outdated and on people's memory.",
        ],
      },
      {
        heading: "Test the restore",
        paragraphs: [
          "A backup that has never been restored is an assumption. Schedule periodic tests, measure the real time against the agreed RTO and document the steps. AWS Backup restore testing can automate part of this check.",
        ],
      },
    ],
    faqs: [
      { question: "How often should we test restores?", answer: "At least once a quarter for critical systems, and after every major architecture change." },
    ],
  },
  {
    slug: "aws-well-architected-equipos-chicos",
    title: "AWS Well-Architected for small teams: where to start",
    excerpt: "The six pillars of AWS's best-practice framework translated into concrete actions for a startup or a team with little time for infrastructure.",
    category: "Cloud",
    date: "2026-09-10",
    readingMinutes: 7,
    sections: [
      {
        heading: "What the Well-Architected framework is",
        paragraphs: [
          "It's the set of best practices AWS proposes for designing and operating workloads in the cloud, organized into six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability. It isn't a certification: it's a guide to spot risks and prioritize improvements.",
        ],
      },
      {
        heading: "Security and reliability first",
        paragraphs: [
          "For a small team, the highest-impact actions are usually: MFA and role-based access instead of users with keys, separate accounts for production, automatic backups with tested restores, and deployment across more than one availability zone for critical components.",
        ],
      },
      {
        heading: "Operational excellence without an operations team",
        paragraphs: [
          "Infrastructure as code, deployments from a pipeline and alerts that reach someone who can act. That prevents most incidents caused by manual changes and reduces dependence on a single person.",
        ],
      },
      {
        heading: "Cost and performance driven by data",
        paragraphs: [
          "Tag resources by application and environment, set budgets with alerts and review underused resources every month. Graviton, Savings Plans and automatic shutdown of non-production environments usually deliver significant savings without touching the application.",
        ],
      },
      {
        heading: "How to run your first review",
        paragraphs: [
          "The Well-Architected Tool in the AWS console guides the review question by question and produces a list of high and medium risks. We recommend picking one workload, completing the review in one or two sessions and turning the high risks into a 90-day plan.",
        ],
      },
    ],
  },
];
