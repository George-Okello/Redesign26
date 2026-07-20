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
  hookQuestion: string;
  behindThePaper: string;
  unanswered: string;
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
    summary: "A framework for improving asynchronous federated learning in resource-constrained healthcare environments.",
    hookQuestion: "What happens to federated learning when the power grid fails?",
    behindThePaper: "I still remember the nights spent simulating loadshedding patterns based on actual data from rural Kenyan health posts. It felt crucial to ensure that the AI model wasn't just working in an ideal lab environment, but was actually robust enough to serve the clinics facing the most difficult conditions.",
    unanswered: "What happens when intermittent connectivity is weaponized? If we can correct gradient drift for delayed nodes, we open the door to adversarial delay. The next frontier is Byzantine-robust asynchronous aggregation that doesn't just penalize slow nodes, but actively authenticates their temporal drift.",
    link: ""
  },
  {
    title: "Computational Modelling of Social Hierarchies & Trust Dynamics Using Multiagent Reinforcement Learning",
    authors: "George O. Ouma",
    status: "Master's Thesis",
    year: "2026",
    summary: "A multi-agent reinforcement learning framework that models the endogenous formation of hierarchy and trust through repeated interactions, validated against empirical networks like Bitcoin OTC and Stack Overflow.",
    hookQuestion: "How do social hierarchies and trust naturally emerge in AI populations?",
    behindThePaper: "In my recent work with multi-agent reinforcement learning, I wanted to see if artificial agents would naturally form social hierarchies. Surprisingly, when agents were given persistent status and bounded network visibility, clear hierarchical structures emerged purely from their interactions. It seems that inequality and trust dynamics aren't just human traits, they might be universal mathematical properties of complex learning systems.",
    unanswered: "How can these emergent hierarchical dynamics be controlled or aligned with human values in large-scale AI deployments without hindering coordination efficiency?",
    link: ""
  },
  {
    title: "Fusion in a Vacuum: Why Multimodal Machine Learning Needs Constraint-Aware Evaluation",
    authors: "George O. Ouma",
    status: "Published",
    year: "2026",
    summary: "A methodological framework proposing constraint-aware evaluation to bridge the gap between multimodal fusion research and real-world deployment.",
    hookQuestion: "How can we trust a multimodal AI when sensors inevitably fail in the real world?",
    behindThePaper: "This paper came from a genuine frustration of seeing state-of-the-art models fail the moment they left the clean benchmark. I wanted to shift the conversation from just 'higher accuracy' to 'accuracy under real conditions', and reporting curves rather than a single point was the simplest way to prove why.",
    unanswered: "How do we dynamically synthesize missing modalities on the edge? If a clinical dataset is missing an MRI, generative completion can guess it, but how do we measure the epistemic uncertainty of that hallucinated modality before a clinician trusts it?",
    link: "https://doi.org/10.5281/zenodo.21331051"
  },
  {
    title: "Neuro-Symbolic AI for Verifiable and Ethical Reasoning in Critical Societal Applications: A Literature Review",
    authors: "George O. Ouma",
    status: "Published",
    year: "2026",
    summary: "A review of neuro-symbolic AI for high-stakes domains, advocating for fairness and verification to be built in by design.",
    hookQuestion: "Can we mathematically guarantee that an AI will make fair decisions before it's deployed?",
    behindThePaper: "Reviewing this literature was a stark reminder of the gap between theoretical AI safety and the messiness of real-world deployment. I wanted to outline a future where safety isn't an afterthought, but an integral part of the architecture itself.",
    unanswered: "Can we formally verify a neuro-symbolic system dynamically during inference? SMT solvers are computationally heavy. The unresolved challenge is creating differentiable logic layers that can backpropagate fairness constraints in real-time without freezing the system.",
    link: "https://doi.org/10.5281/zenodo.21324933"
  },
  {
    title: "Leveraging Large Language Models to Preserve Indigenous Games: A Case Study of a Chatbot for the Kenyan Game Bano",
    authors: "George O. Ouma",
    status: "Published",
    year: "2026",
    summary: "An application of LLMs to indigenous cultural preservation, developing a chatbot to preserve knowledge of the Kenyan game Bano.",
    hookQuestion: "How do we preserve the unspoken rules of indigenous culture in the age of large language models?",
    behindThePaper: "Bano is more than just a game; it's a piece of living history. Seeing Simba, the chatbot I designed, interact with people and preserve those mechanics was incredibly moving. It was a perfect intersection of technical engineering and deep, human cultural heritage.",
    unanswered: "How do we prevent LLMs from homogenizing indigenous knowledge? The current system preserves rules, but cultural nuances, dialects, and unspoken social cues get flattened into standardized text. We have yet to build an AI that can preserve the 'silences' in traditional knowledge transmission.",
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

export interface AwardItem {
  title: string;
  year: string;
  organization: string;
  website?: string;
  description: string;
  extendedContext: string;
  impactMetrics: { label: string; value: string }[];
  scientificFocus: string;
  technologies: string[];
}

export const awards: AwardItem[] = [
  {
    title: "Innovate Africa Challenge Winner",
    year: "2024–2025",
    organization: "Smart Africa Initiative for AI Innovation",
    website: "https://smartafrica.org/innovate-africa-challenge",
    description: "Recognized for an innovative agricultural system integrating IoT edge telemetry, localized LLM advisory applications, and an incentive tokenomics structure for smallholder farmers.",
    extendedContext: "This honor recognized an integrated smart-agriculture system designed to empower smallholder farmers. By merging solar-powered IoT soil-and-microclimate telemetry with an offline-resilient, LLM-powered voice and text app, farmers receive precise, real-time agronomic guidance tailored to their local environment. Crucially, the platform includes a behavioral-incentive token system that rewards farmers for adopting regenerative farming techniques, conserving water, and sharing critical local sensor data.",
    impactMetrics: [
      { label: "Focus Domain", value: "Smart Agriculture & IoT" },
      { label: "Geographical Scope", value: "East African Farming Cooperatives" },
      { label: "Key Innovation", value: "LLM Advisory + Token Incentives" }
    ],
    scientificFocus: "Calibrating resource-constrained multi-modal model advice based on real-time soil telemetry and testing game-theoretic token rewards to maximize regenerative farming compliance.",
    technologies: ["IoT Telemetry", "Localized LLMs", "Token Incentive Mechanics", "Edge Computing"]
  },
  {
    title: "Mozilla Foundation Research Grant",
    year: "2023",
    organization: "Mozilla Foundation",
    website: "https://foundation.mozilla.org",
    description: "Awarded competitive research funding to design and deploy AI-driven, localized socio-technical systems for climate-resilient agriculture.",
    extendedContext: "Focused on smallholder farmers in Kenya, this grant funded the research and implementation of an NLP-driven decision support system. The engine decodes complex meteorological patterns and real-time agronomic data, serving actionable localized crop advice directly over simple SMS and web interfaces, mitigating the digital divide and enabling direct agency.",
    impactMetrics: [
      { label: "Focus Domain", value: "Socio-Technical NLP Systems" },
      { label: "Geographical Scope", value: "Kenyan Smallholder Farms" },
      { label: "Key Innovation", value: "Localized Low-Resource NLP" }
    ],
    scientificFocus: "Translating complex meteorological models into low-resource conversational languages without losing safety bounds.",
    technologies: ["NLP/LLMs", "Meteorological Time-Series", "SMS-Gateway Architecture"]
  }
];

