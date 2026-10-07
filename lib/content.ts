export const site = {
  name: "Agorua Chikaodi",
  role: "Software & AI Automation Engineer",
  email: "you@example.com",
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
  { href: "https://github.com/kodycodes23/", label: "GitHub" },
  { href: "https://chikaodinakacv.tiiny.site", label: "Curriculum Vitae" },
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
  /** live website or repo; GitHub links get a "View on GitHub" button. Leave empty for "Link coming soon" */
  url: string;
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
    title: "Quantum Health Frontend",
    type: "Web app",
    description:
      "An AI-powered telemedicine assistant that delivers personalized, doctor-verified health insights using wearable data — seamlessly integrated with hospitals and insurers.",
    tools: ["React", "Vite", "TypeScript", "HTML/CSS"],
    url: "https://quantm-frontend.vercel.app/",
    image: "/projects/QuantumProject.png",
    accent: "#7C9CF5",
  },
  {
    title: "GECU Banking Dummy App",
    type: "Web app",
    description:
      "GECU is a fictional, educational banking system built to simulate real-world financial operations such as deposits, transfers, loans, and investments.",
    tools: ["HTML/CSS", "TypeScript", "React", "Django"],
    url: "https://grandelitecreditunion.com/#",
    image: "/projects/GECUBanking.png",
    accent: "#12A36B",
  },
  {
    title: "GECU Logistics",
    type: "Web app",
    description:
      "GECU Logistics is a real-time parcel tracking tool that gives users accurate updates from dispatch to delivery. Try the demo with tracking number ABD112233445566 to see how it works.",
    tools: ["HTML/CSS", "TypeScript", "React", "Java (Spring Boot)"],
    url: "https://packagetracker-u8n9.onrender.com/",
    image: "/projects/GECULogistics.png",
    accent: "#2563EB",
  },
  {
    title: "Movie-Box",
    type: "Web app",
    description:
      "MovieBox is a real-time movie discovery app built with Angular, using the TMDB API to showcase trending and newly released films with a sleek, responsive UI.",
    tools: ["Angular", "TypeScript", "API", "HTML/CSS"],
    url: "https://movie-box-liart.vercel.app/home",
    image: "/projects/moviebox.png",
    accent: "#E11D48",
  },
  {
    title: "Blockchain Based Voting System",
    type: "Web app",
    description:
      "Blockchain Based Voting System is a decentralized voting system that allows users to vote on a set of candidates. It is built using Hyperledger Besu and React.",
    tools: ["Solidity", "Hyperledger Besu", "React", "HTML/CSS"],
    url: "https://blockchain-based-voting-system-rouge.vercel.app/",
    image: "/projects/BlockChainProject.png",
    accent: "#C026D3",
  },
  {
    title: "Lead Qualification & Triage System",
    type: "Web app",
    description:
      "A rule-based lead qualification tool that cleans uploaded CSV data, deduplicates records, and automatically scores and classifies leads into Contact Now, Nurture, or Disqualify tiers.",
    tools: ["JavaScript", "FastAPI", "React", "HTML/CSS"],
    url: "https://koya-frontend-zewr.vercel.app/",
    image: "/projects/lead.png",
    accent: "#6366F1",
  },
  {
    title: "Brimble: Local Containerized Deployment Orchestrator",
    type: "Web app",
    description:
      "A Docker-powered local deployment orchestrator using Express, React, and Caddy to clone Git repositories, build applications, and dynamically manage reverse-proxy routing via localhost domains.",
    tools: ["JavaScript", "Docker", "React", "HTML/CSS"],
    url: "https://github.com/kodycodes23/shipyard.git",
    image: "/projects/brimble.png",
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
  ["n8n, Make and Zapier", "for workflows."],
  ["OpenAI, Claude and LangChain", "for AI steps and agents."],
  ["Python and JavaScript", "for everything custom."],
  [
    "HubSpot, Airtable, Notion, Slack and Google Workspace",
    "for the places work already lives.",
  ],
];
