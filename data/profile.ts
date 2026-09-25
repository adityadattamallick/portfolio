export type Link = { label: string; href: string };

export type Experience = {
  role: string;
  organisation: string;
  start: string;
  end: string;
  status?: string;
  summary: string;
  points?: string[];
};

export type Work = {
  title: string;
  context: string;
  period: string;
  authorship?: string;
  summary: string;
  points: string[];
  tags: string[];
  link?: Link;
};

export const profile = {
  name: "Aditya Narayan Datta Mallick",
  shortName: "Aditya Datta",
  headline: "Research Assistant · ML/DL · Audio Processing · Full-Stack AI",
  intro:
    "Computer Science and Engineering graduate from North South University. I work on machine learning and deep learning research across computer vision and audio processing, and I build full-stack AI applications that take models from research to working products.",
  email: { user: "adityadatta111", domain: "gmail.com" },
  links: [
    { label: "GitHub", href: "https://github.com/adityadattamallick" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aditya-narayan-datta-mallick/",
    },
  ] satisfies Link[],
};

export const experience: Experience[] = [
  {
    role: "Research Assistant (RA)",
    organisation: "Confidential",
    start: "January 2026",
    end: "Present",
    status: "Ongoing",
    summary:
      "Contributing to an ongoing research project. The organisation and project details are confidential and will be shared once permitted.",
  },
];

export const research: Work[] = [
  {
    title:
      "Assessing the Feasibility of a Multimodal Annotation and Segmentation System to Detect Carious Lesions From Intraoral Photographs",
    context: "CSE499 Capstone · North South University",
    period: "January 2024 – 2025",
    authorship: "First Author · Project Lead",
    summary:
      "Published in the International Journal of Dentistry (Wiley).",
    points: [
      "Led the project as first author under faculty supervision.",
      "Built an annotation tool with a streamlined pipeline on a custom dataset using YOLOv8, SAM and Streamlit.",
      "Supported both manual annotation and MLLM-assisted annotation through the Gemini 2.5 Flash API.",
      "Achieved improved mAP50 results.",
    ],
    tags: ["PyTorch", "YOLOv8", "SAM", "Streamlit", "Gemini API"],
    link: {
      label: "Read the paper",
      href: "https://onlinelibrary.wiley.com/doi/10.1155/ijod/8369997",
    },
  },
  {
    title:
      "The Impact of Label Mismatch in YOLO Training for AFLW2000-3D Face Landmark Estimation",
    context: "CSE498R Directed Research · North South University",
    period: "January 2025 – July 2025",
    authorship: "First Author · Project Lead",
    summary:
      "Investigated the limitations of YOLOv8 for generating face meshes from the AFLW2000-3D dataset.",
    points: [
      "Led the project as first author under faculty supervision.",
      "Worked on face mesh regeneration using YOLOv8 and PyTorch.",
      "Identified limitations in the training setup and worked on addressing them.",
    ],
    tags: ["Python", "PyTorch", "YOLOv8"],
  },
];

export const projects: Work[] = [
  {
    title: "Mental Health Companion App",
    context: "CSE299 · North South University",
    period: "July 2023 – December 2023",
    summary:
      "A full-stack web application with a venting space and an online doctor–patient consultation and appointment system.",
    points: [
      "Built with the MERN stack: MongoDB, Express, React and Node.js.",
      "Included appointment booking between patients and doctors.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "ML / DL",
    items: ["Machine Learning", "Deep Learning", "PyTorch", "Computer Vision", "YOLOv8", "SAM"],
  },
  {
    group: "Audio Processing",
    items: ["Signal Processing", "Audio Feature Extraction", "Audio ML"],
  },
  {
    group: "Full-Stack AI",
    items: ["Streamlit", "LLM APIs (Gemini)", "React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "D3.js"],
  },
  {
    group: "Languages",
    items: ["Python", "C++", "JavaScript", "SQL"],
  },
  {
    group: "Foundations",
    items: ["Engineering Mathematics", "Data Structures & Algorithms", "Computer Networking", "Computer Architecture", "Linux"],
  },
];

export const education = {
  degree: "B.Sc. in Computer Science and Engineering",
  institution: "North South University",
  coursework: [
    "Data Structures & Algorithms",
    "Computer Architecture",
    "Computer Networking",
    "Machine Learning",
    "Web Development",
  ],
};
