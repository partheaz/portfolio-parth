import { FaInstagram } from "react-icons/fa";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SlSocialTwitter } from "react-icons/sl";
import { CardProps, SocialProps } from "../types/types";

export const navbarItems = [
  {
    id: "01",
    name: "About",
    link: "/#about",
  },
  {
    id: "02",
    name: "Experience",
    link: "/#experience",
  },
  {
    id: "03",
    name: "Work",
    link: "/#work",
  },
  {
    id: "04",
    name: "Contact",
    link: "/#contact",
  },
];

export const technologies = [
  { id: 1, name: "JavaScript (ES6+)" },
  { id: 2, name: "TypeScript" },
  { id: 3, name: "React" },
  { id: 4, name: "Shopify" },
  { id: 5, name: "Node.js" },
  { id: 6, name: "MongoDB" },
  { id: 7, name: "Docker" },
  { id: 8, name: "Shopify App" },
];

export const experiences = [
  {
    company: "Cartmade",
    role: "Shopify Developer",
    duration: " Sept 2024 – Present",
    details: [
      "Deliver high-quality, robust production code for custom Shopify apps and integrations for a diverse array of clients.",
      "Work alongside project stakeholders to research, design, and develop scalable Shopify solutions.",
      "Collaborate with designers, project managers, and other developers to transform concepts into functional Shopify apps",
      "Provide leadership within the Shopify development team through mentorship and sharing knowledge of Shopify APIs, GraphQL, Liquid, and best practices",
    ],
    link: "https://www.cartmade.com",
  },
  {
    company: "MME SOLUTIONS",
    role: "Full Stack Developer",
    duration: "01/2023- 01/2024",
    details: [
      "Collaborated with US-based clients to design and implement full-stack solutions, leveraging ReactJS for the front end and Python for the backend, ensuring robust performance and scalability",
      "Developed and optimized responsive UI/UX features using ReactJS, enhancing user experience across multiple devices",
      "Designed and deployed scalable microservices using Node.js and AWS Lambda, enabling efficient, cloud-based solutions.",
      "Improved database operations using MongoDB and MySQL, focusing on performance optimization and high scalability.",
      "Seamlessly integrated third-party APIs and handled data migration, ensuring smooth and efficient workflows across multiple platforms."
    ],
    link: "https://mmesolutions.com/",
  },
  {
    company: "Dhara Networks",
    role: "Engineer",
    duration: "01/2021 - 01/2023",
    details: [
      "Developed SaaS billing platforms for international clients using Angular and Node.js, delivering highly available, reliable, and scalable solutions.",
      "Designed and built RESTful APIs and microservices with TypeScript, enhancing modularity and enabling efficient code reuse.",
      "Employed Docker for containerized environments, streamlining deployment consistency, development workflows, and cross-team collaboration.",
     "Integrated React-Redux for state management in complex frontend applications, ensuring predictable updates and optimized performance.",
    "Utilized AWS (EC2, S3, Lambda) to architect cloud-native solutions, improving availability and cost efficiency."
    ],
    link:"#",
  },
];

//
export const projects = [
  {
    title: "Catalog2Cart‑Shoppable PDF",
    description: `Published on the Shopify App Store, this tool adds clickable hotspots to PDFs, turning them into interactive shopping experiences. It simplifies navigation, boosts engagement, and has been shown to increase sales by 20%.`,
    image: "/projects/pdf.webp",
    tech: ["remix", "node", "shopify", "graphQL", "heroku"],
    links: {
      github: null,
      external:
        "https://apps.shopify.com/pdf-converter?search_id=0ff553ac-5d34-463f-a854-819b32452900&surface_detail=cm&surface_inter_position=1&surface_intra_position=10&surface_type=search",
    },
    reverse: false,
  },
  {
    title: "Iron Displays",
    description: `I have worked on an in-store project where I contributed to the complete development of the store system and assisted in integrating the external Dropbox API for seamless file management. `,
    image: "/projects/irondisplays.png",
    tech: ["Shopify", "Liquid", "node", "express"],
    links: {
      github:
        null,
      external: "https://irondisplays.com/",
    },
    reverse: true,
  },
  {
    title: "Manly ",
    description: `For the Shopify store Manly, I contributed to a full store implementation. I also developed a custom Subscribe and Pay feature to streamline subscriptions and payments, and designed custom product pages with pixel-perfect precision, delivering a cohesive and visually appealing user experience`,
    image: "/projects/manly.png",
    tech: ["shopify","Liquid","Subscribe & Pay"],
    links: {
      github: null,
      external: "https://www.usemanly.com.au/",
    },
    reverse: false,
  },
  {
    title: "MME SOLUTIONS",
    description: `At MME Solutions, I contributed to the development of a scalable SaaS (Software as a Service) application, leveraging AWS cloud infrastructure and Angular for the front-end. I designed and implemented key components of the platform, utilizing AWS services such as EC2, S3, and Lambda to ensure robust performance, secure storage, and serverless functionality. On the client side, I built a responsive and intuitive user interface with Angular, incorporating modern design patterns and state management to deliver a seamless user experience. My work helped create a reliable, cloud-based solution tailored to the company’s needs, optimizing both deployment efficiency and end-user satisfaction.`,
    image: "/projects/mme-solutions.png",
    tech: ["Angular", "API", "Tailwind", "Responsive Design", "SAAS","AWS","NodeJs"],
    links: {
      github: null,
      external: "https://mmesolutions.com/",
    },
    reverse: true,
  },
  {
    title: "Graduation world",
    description: `For the Graduation World store, I led the migration of the entire e-commerce platform from Magento to Shopify, ensuring a seamless transition of all products, data, and functionality. This involved transferring a large catalog of products along with their associated metafields, preserving critical details such as custom attributes and metadata. I meticulously planned and executed the migration process, handling data extraction from Magento, mapping it to Shopify’s structure, and implementing automated scripts to load products and metafields efficiently. The result was a fully functional Shopify store with enhanced performance, improved user experience, and retained data integrity, tailored to meet the specific needs of Graduation World’s graduation-focused product offerings.`,
    image: "/projects/graduation-world.png",
    tech: ["Shopify","Shopify Liquid","Shopify StoreFront Api","Magento","Ecomerce Migration"],
    links: {
      github:
        null,
      external: "https://graduationworld.com/",
    },
    reverse: false,
  },
  {
    title: "Nike Store",
    description: `Nike Store is an e-commerce website designed to showcase and sell Nike's latest shoe collections. Built with React and Tailwind CSS, it provides an intuitive shopping experience with product details, filtering options, and an easy checkout process.`,
    image: "/projects/nike-store.png",
    tech: ["UI UX", "react", "e-commerce", "node", "mongoDB"],
    links: {
      github: "https://github.com/partheaz/nike-store-mockup",
      external: "https://nike-store-steel.vercel.app/",
    },
    reverse: true,
  },
];

export const otherWorthyProject: CardProps[] = [
  {
    title: "Integrate Salesforce with Shopify",
    description: `Integrated Salesforce and Shopify for seamless data synchronization, automating order management and enhancing customer insights.`,
    tech: ["salesforce", "shopify", "CMS"],
    githubLink:
      null,
    externalLink: "https://www.salesforce.com/ap/?ir=1",
  },
  {
    title: "Credit Card Details Change with Sudsy",
    description: `Developed a Shopify app that allows customers to securely update credit card details on-site, streamlining payment processing and improving user experience.`,
    tech: ["shopify", "CMS", "Node"],
    githubLink: null,
    externalLink:
      "https://www.sudsybear.com/?srsltid=AfmBOooVAj8pf_PtEEHSQFF4HjGwt-oHhSGf1Nk1TL32hUX6Fw9HQmGr",
  },
  {
    title: "Defend Chart Implementation",
    description: `Implemented a custom data visualization solution using Apex and Highcharts to display dynamic charts, while creating custom APIs to securely store and manage data.`,
    tech: ["shopify", "node", "apex", "charts"],
    githubLink: null,
    externalLink: "https://defent.com/pages/reporting",
  },
  {
    title: "Shopify App Frame Fusion",
    description: `Built a Shopify app that allows merchants to upload videos and assign products directly to those videos, boosting customer engagement and increasing sales.`,
    tech: ["shopify", "remix", "File System", "API"],
    githubLink: null,
    externalLink: "https://frame-fusion-ce1e3d4c2ecb.herokuapp.com/",
  },
  {
    title: "Shopify Cash on Delivery App",
    description: `Developed a Shopify app that creates draft orders using Shopify APIs, allowing merchants to securely store customer information for cash-on-delivery transactions.`,
    tech: ["shopify", "remix", "liquid", "graphql"],
    githubLink: null,
    externalLink: null,
  },
];
export const socialLinks: SocialProps[] = [
  {
    icon: FiGithub,
    url: "https://github.com/partheaz/",
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/partheazwrld/",
  },
  {
    icon: SlSocialTwitter,
    url: "#",
  },
  {
    icon: FiLinkedin,
    url: "https://www.linkedin.com/in/parth-pandey-852a42192/",
  },
];
