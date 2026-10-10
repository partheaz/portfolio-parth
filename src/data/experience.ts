export type Job = {
  company: string;
  role: string;
  years: string;
  /** Omitted where the resume doesn't give one. */
  location?: string;
  /** What I did there — taken from the resume (public/resume-parth.pdf). */
  points: string[];
};

export const experience: Job[] = [
  {
    company: "Nine15",
    role: "Shopify Full Stack Developer",
    years: "Jun 2025 — Present",
    location: "San Diego, US",
    points: [
      "Build and customise Shopify themes and storefronts in Liquid, HTML, CSS and JavaScript for international brands.",
      "Build custom Shopify apps and integrations with Shopify's APIs, webhooks and third-party services to automate store workflows.",
      "Move stores to Shopify — products, customers, orders and content — while keeping search rankings and avoiding downtime.",
      "Connect ERP, inventory, payments, shipping and marketing tools so store operations run without manual work.",
      "Ship conversion features and speed work that improve Core Web Vitals, SEO and the checkout experience.",
    ],
  },
  {
    company: "Northwest Web Developments",
    role: "Full Stack Shopify Developer",
    years: "Apr 2025 — May 2025",
    location: "London, UK",
    points: [
      "Built and customised Shopify storefronts and themes with Liquid, JavaScript and Shopify's APIs for UK clients.",
      "Developed full-stack features and third-party integrations that extended what each store could do.",
    ],
  },
  {
    company: "CartMade",
    role: "Shopify Developer",
    years: "Sep 2024 — Apr 2025",
    location: "Kathmandu, Nepal",
    points: [
      "Integrated third-party APIs such as Dropbox to automate back-office work.",
      "Built custom features on Shopify's APIs, webhooks and app frameworks.",
      "Improved store speed and SEO, working with design and marketing to meet business goals.",
    ],
  },
  {
    company: "MME Solutions",
    role: "Full Stack Developer",
    years: "Jan 2023 — Jan 2024",
    location: "Chicago, US",
    points: [
      "Built full-stack products for US clients with React on the front end and Python on the back end.",
      "Designed and deployed microservices on Node.js and AWS Lambda.",
      "Tuned MongoDB and MySQL for performance, and handled API integrations and data migrations.",
    ],
  },
  {
    company: "Dhara Networks",
    role: "Engineer",
    years: "Jan 2021 — Jan 2023",
    points: [
      "Led development of billing-submission SaaS platforms for international clients in Angular and Node.js.",
      "Designed REST APIs and microservices in TypeScript, deployed with Docker on AWS (EC2, S3, Lambda).",
      "Migrated legacy data to SQL and MongoDB, and sped up queries with indexing and caching.",
    ],
  },
];
