import notreDameBg from './assets/images/notre_dame_3d_game_1784298606663.jpg';
import epidemiologicalBg from './assets/images/epidemiological_modeling_1784298619237.jpg';
import educationalBg from './assets/images/educational_data_warehouse_1784298632617.jpg';
import agriculturalBg from './assets/images/agricultural_decision_support_1784298644828.jpg';

export interface Publication {
  title: string;
  authors: string;
  status: string;
  year: string;
  summary: string;
  link: string;
}

export interface Project {
  title: string;
  organization: string;
  problem: string;
  objective: string;
  solution: string;
  tags: string[];
  backgroundImage: string;
}

export interface Note {
  title: string;
  date: string;
  readTime: string;
}

export const publications: Publication[] = [
  {
    title: "DC-AFL: Drift-Corrected Asynchronous Federated Learning for Infrastructure-Constrained Healthcare Networks",
    authors: "Betsy Muriithi, Alvin Mugwe, George O. Ouma",
    status: "Under Review",
    year: "2026",
    summary: "I designed a framework that combines a Version Memory Buffer, Hessian-approximated drift correction, and two-parameter polynomial damping to address the infrastructure exclusion problem in federated learning across sub-Saharan Africa. This work has been submitted to Deep Learning Indaba 2026.",
    link: ""
  },
  {
    title: "Fusion in a Vacuum: Why Multimodal Machine Learning Needs Constraint-Aware Evaluation",
    authors: "George O. Ouma",
    status: "Published",
    year: "2026",
    summary: "This paper highlights the methodological gap between multimodal fusion research and deployment engineering. I proposed constraint-aware evaluation (measuring accuracy as a function of deployment constraints) to bridge this divide.",
    link: "https://doi.org/10.5281/zenodo.21331051"
  },
  {
    title: "Neuro-Symbolic AI for Verifiable and Ethical Reasoning in Critical Societal Applications: A Literature Review",
    authors: "George O. Ouma",
    status: "Published",
    year: "2026",
    summary: "I explored the fusion of neural-network learning architectures and symbolic logic frameworks. This paper addresses verifiable correctness and compliance with ethical guidelines in high-stakes public systems.",
    link: "https://doi.org/10.5281/zenodo.21324933"
  },
  {
    title: "Leveraging Large Language Models to Preserve Indigenous Games: A Case Study of a Chatbot for the Kenyan Game Bano",
    authors: "George O. Ouma",
    status: "Published",
    year: "2026",
    summary: "I examined the application of Large Language Models (LLMs) to indigenous cultural preservation using the Bano traditional board game of Kenya. I developed and evaluated Simba, an LLM-based chatbot designed to preserve knowledge of Bano gameplay mechanics and cultural context.",
    link: "https://doi.org/10.5281/zenodo.21337996"
  }
];

export const industryProjects: Project[] = [
  {
    title: "3D Campus Sculpture Verification Game",
    organization: "University of Notre Dame",
    problem: "Students lacked an immersive, hands-on medium to engage with historical campus architecture, and physical landmark verification is traditionally hard to automate.",
    objective: "Create an educational scavenger hunt game where students locate historical sculptures and statues around the Notre Dame campus.",
    solution: "Developed a 3D structural model and camera verification workflow. Students locate physical statues, take photos with their phone cameras, and a custom spatial verification pipeline validates the perspective, lighting, and geometric structure of the captured statue for instant in-game verification.",
    tags: ["3D Computer Vision", "Spatial Verification", "Gamified Learning"],
    backgroundImage: notreDameBg
  },
  {
    title: "Epidemiological Modeling",
    organization: "University of Notre Dame",
    problem: "Public health teams needed robust tools to forecast mosquito outbreaks and analyze spatial epidemiological data to support interventions.",
    objective: "Create predictive models and interactive representations of public health data for interdisciplinary research teams.",
    solution: "Developed mosquito outbreak prediction models utilizing weather time-series data and machine learning techniques, alongside interactive epidemiological visualizations using Folium maps.",
    tags: ["Time-Series", "Machine Learning", "Public Health"],
    backgroundImage: epidemiologicalBg
  },
  {
    title: "National Educational Data Warehouse & Dashboard",
    organization: "South Sudan School System Ministry",
    problem: "The absence of unified scholastic metrics made it extremely difficult for administrators to monitor regional enrollment rates, resource allocations, and school conditions.",
    objective: "Consolidate heterogeneous school data streams into a single, high-reliability analytical warehouse.",
    solution: "Assisted in the architectural design of the national data warehouse system. Built and implemented synchronized telemetry pipelines that display real-time educational analytics across both responsive mobile devices and an administrative dashboard.",
    tags: ["Data Engineering", "Analytical Dashboard", "Mobile Synced Pipeline"],
    backgroundImage: educationalBg
  },
  {
    title: "Agricultural Decision Support System",
    organization: "Mozilla Foundation & TechSavanna",
    problem: "Smallholder farmers in Kenya struggle with local climate resilience due to a lack of highly localized, accessible, and timely agricultural guidance.",
    objective: "Design and implement a natural language processing system that decodes complex meteorological and agronomic data into conversational insights.",
    solution: "Led the development of an AI-driven localized decision support engine utilizing SMS and web interfaces. This work was funded by a Mozilla Foundation grant and recognized for its social impact.",
    tags: ["Natural Language Processing", "Climatology", "Socio-Technical Systems"],
    backgroundImage: agriculturalBg
  }
];

export const notes: Note[] = [
  {
    title: "Why Trust Matters in Multi-Agent Systems",
    date: "Dec 2024",
    readTime: "4 min read"
  },
  {
    title: "Thoughts on Reinforcement Learning under Partial Observability",
    date: "Nov 2024",
    readTime: "6 min read"
  },
  {
    title: "The Emergence of Cooperation in Simple Networks",
    date: "Oct 2024",
    readTime: "5 min read"
  }
];
