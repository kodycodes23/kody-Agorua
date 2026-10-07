export const site = {
  name: "Agorua Chikaodi",
  role: "Software & AI Automation Engineer",
  email: "agorua.kody@gmail.com",
  year: 2026,
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export const socials = [
  { href: "https://www.linkedin.com/in/chikaodi-agorua-74478b20a/", label: "LinkedIn" },
  { href: "https://github.com/kodycodes23", label: "GitHub" },
  { href: "/projects/Chikaodinaka_Resume_WS.pdf", label: "Curriculum Vitae" },
];

export const about = {
  quote:
    "The best automation is the one nobody notices, because the work just gets done.",
  paragraphs: [
    "I'm a software and AI automation engineer. I build enterprise web applications, connect the tools a business already uses, and add AI where judgment is needed, so processes that used to take hours run in minutes without anyone babysitting them.",
    "I've done this at enterprise scale, building software and automation at a Big 4 professional services firm. My work sits between the business and engineering: understanding how work actually flows today, finding where it slows down or breaks, and replacing it with reliable applications, workflows and agents that are easy to hand over.",
  ],
};

export type Project = {
  title: string;
  /** used for the filter chips above the grid; chips only appear once there are 2+ types */
  type: "Automation" | "AI agent" | "Web app";
  description: string;
  tools: string[];
  /** Legacy single destination for existing projects. */
  url?: string;
  /** Separate destinations for projects with a live site, demo, and source repository. */
  links?: {
    website?: string;
    demo?: string;
    github?: string;
  };
  /** screenshot in /public/projects; without one the card shows a generated workflow preview */
  image?: string;
  /** preview glow color */
  accent: string;
  /** optional details, shown when filled in */
  year?: string;
  area?: string;
  result?: string;
};

// the first project is shown as the large featured card
export const work: Project[] = [
  {
    title: "RelayPay Voice Support",
    type: "AI agent",
    description:
      "A voice-based support agent that answers from approved knowledge, looks up customer and payment records, and escalates sensitive cases for human review.",
    tools: ["Vapi", "Claude Agent SDK", "MCP", "Supabase", "Next.js"],
    links: {
      website: "http://web-tan-five-65.vercel.app",
      demo: "https://yorecord.com/view?uid=23848650-55b1-46b1-b77b-bb0cf2604ae4",
      github: "https://github.com/kodycodes23/koya-support-agent",
    },
    image: "/projects/relaypay-voice-support-v2.webp",
    accent: "#18A999",
  },
  {
    title: "Koya Proposal Generator",
    type: "AI agent",
    description:
      "Generates client proposals with Claude, supports salesperson review and internal approval, then prepares delivery and logs each proposal centrally.",
    tools: ["Claude API", "Next.js", "Proposal generation", "Approval workflow"],
    links: {
      website: "https://koya-proposal-generator.vercel.app/",
      demo: "https://yorecord.com/view?uid=da565625-f384-4c15-84ca-b1c67c69b554",
      github: "https://github.com/kodycodes23/Koya-Proposal-Generator",
    },
    image: "/projects/koya-proposal-generator-v2.webp",
    accent: "#D08A42",
  },
  {
    title: "Koya Content Agent",
    type: "AI agent",
    description:
      "Researches a content idea, drafts and evaluates an article, then adapts the selected version for LinkedIn, X, and email review.",
    tools: ["AI research", "Next.js", "n8n", "Claude", "LinkedIn · X · Email"],
    links: {
      website: "https://contentgenerator-mocha.vercel.app/",
      demo: "https://yorecord.com/view?uid=abbaab2b-a05f-40b2-9db1-162b3daab4ed",
      github: "https://github.com/kodycodes23/content_generator",
    },
    image: "/projects/koya-content.webp",
    accent: "#D45D79",
  },
  {
    title: "Radar Lead Agent",
    type: "AI agent",
    description:
      "Researches companies against a lead objective, saves qualified prospects to Supabase, and prepares outreach drafts for human review.",
    tools: ["AI research", "Apify", "Next.js", "Claude", "Supabase", "Lead qualification"],
    links: {
      website: "https://radar-lead-generator.onrender.com/",
      demo: "https://yorecord.com/view?uid=437fa97f-b895-4ec4-b283-b9e9f69e7ef5",
      github: "https://github.com/kodycodes23/Radar-Lead-Generator",
    },
    image: "/projects/radar-lead-generator-wide.webp",
    accent: "#4B91A8",
  },
  {
    title: "Quantum Health Frontend",
    type: "Web app",
    description:
      "An AI-powered telemedicine assistant that delivers personalized, doctor-verified health insights using wearable data — seamlessly integrated with hospitals and insurers.",
    tools: ["React", "Vite", "TypeScript", "HTML/CSS"],
    url: "https://quantm-frontend.vercel.app/",
    image: "/projects/QuantumProject.webp",
    accent: "#7C9CF5",
  },
  {
    title: "GECU Banking Dummy App",
    type: "Web app",
    description:
      "GECU is a fictional, educational banking system built to simulate real-world financial operations such as deposits, transfers, loans, and investments.",
    tools: ["HTML/CSS", "TypeScript", "React", "Django"],
    url: "https://grandelitecreditunion.com/#",
    image: "/projects/GECUBanking.webp",
    accent: "#12A36B",
  },
  {
    title: "GECU Logistics",
    type: "Web app",
    description:
      "GECU Logistics is a real-time parcel tracking tool that gives users accurate updates from dispatch to delivery. Try the demo with tracking number ABD112233445566 to see how it works.",
    tools: ["HTML/CSS", "TypeScript", "React", "Java (Spring Boot)"],
    url: "https://packagetracker-u8n9.onrender.com/",
    image: "/projects/GECULogistics.webp",
    accent: "#2563EB",
  },
  {
    title: "Movie-Box",
    type: "Web app",
    description:
      "MovieBox is a real-time movie discovery app built with Angular, using the TMDB API to showcase trending and newly released films with a sleek, responsive UI.",
    tools: ["Angular", "TypeScript", "API", "HTML/CSS"],
    url: "https://movie-box-liart.vercel.app/home",
    image: "/projects/moviebox.webp",
    accent: "#E11D48",
  },
  {
    title: "Blockchain Based Voting System",
    type: "Web app",
    description:
      "Blockchain Based Voting System is a decentralized voting system that allows users to vote on a set of candidates. It is built using Hyperledger Besu and React.",
    tools: ["Solidity", "Hyperledger Besu", "React", "HTML/CSS"],
    url: "https://blockchain-based-voting-system-rouge.vercel.app/",
    image: "/projects/BlockChainProject.webp",
    accent: "#C026D3",
  },
  {
    title: "Lead Qualification & Triage System",
    type: "Web app",
    description:
      "A rule-based lead qualification tool that cleans uploaded CSV data, deduplicates records, and automatically scores and classifies leads into Contact Now, Nurture, or Disqualify tiers.",
    tools: ["JavaScript", "FastAPI", "React", "HTML/CSS"],
    url: "https://koya-frontend-zewr.vercel.app/",
    image: "/projects/lead.webp",
    accent: "#6366F1",
  },
  {
    title: "Brimble: Local Containerized Deployment Orchestrator",
    type: "Web app",
    description:
      "A Docker-powered local deployment orchestrator using Express, React, and Caddy to clone Git repositories, build applications, and dynamically manage reverse-proxy routing via localhost domains.",
    tools: ["JavaScript", "Docker", "React", "HTML/CSS"],
    url: "https://github.com/kodycodes23/shipyard.git",
    image: "/projects/brimble.webp",
    accent: "#2F9E8F",
  },
];

export const steps = [
  {
    title: "Map",
    text: "We walk through the process as it runs today and pick the steps that cost the most time or cause the most errors.",
  },
  {
    title: "Build",
    text: "I build the workflow in small, testable pieces, with clear logging and a human checkpoint wherever a mistake would be costly.",
  },
  {
    title: "Measure",
    text: "After launch we track hours saved and error rates, then tune the automation until it runs quietly on its own.",
  },
];

/** Alternating [tools, muted suffix] pairs for the "Tools I build with" sentence. */
export const stack: [string, string][] = [
  ["n8n, Power Automate and UiPath", "for workflows."],
  ["OpenAI, Claude and LangChain", "for AI steps and agents."],
  ["Python and JavaScript", "for everything custom."],
  [
    "Airtable, Notion, Slack and Google Workspace",
    "for the places work already lives.",
  ],
];
