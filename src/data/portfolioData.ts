import {
  ProjectItem,
  JournalItem,
  ExplorationItem,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  CertificationItem,
} from '../types/portfolio';

import projectFashionverse from '../assets/images/project_fashionverse_1794051811086.jpg';
import projectNutrilens from '../assets/images/project_nutrilens_1794051812139.jpg';
import projectSurgicalVision from '../assets/images/project_surgical_vision_1794051811047.jpg';
import exploreNeuralNetwork from '../assets/images/explore_neural_network_1794051828185.jpg';
import exploreAutonomousAgent from '../assets/images/explore_autonomous_agent_1794051829723.jpg';
import exploreHumanAi from '../assets/images/explore_human_ai_1794051828824.jpg';

export const PERSONAL_INFO = {
  name: 'Sanjana R',
  initials: 'SR',
  eyebrow: 'AI / ML ENGINEER · GENERATIVE AI',
  roleLinePrefix: 'A curious mind building the future of AI.',
  roles: [
    'AI Enthusiast',
    'ML Developer',
    'Generative AI Explorer',
    'Computer Vision Enthusiast',
  ],
  bio: 'Building intelligent applications at the intersection of Machine Learning, Generative AI, Computer Vision, and Reinforcement Learning. Turning innovative ideas into practical AI-powered solutions.',
  extendedAbout:
    'I am currently pursuing a Master of Computer Applications specializing in Artificial Intelligence and Generative AI at Alliance University, Bengaluru. I am passionate about developing intelligent applications using Machine Learning, Natural Language Processing, Large Language Models, Computer Vision, and Reinforcement Learning.\n\nI enjoy combining technical knowledge with creative problem-solving to build practical AI-powered solutions.',
  email: 'sanjanar962004@gmail.com',
  phone: '+91 7625032027',
  githubUsername: 'saraswati-sanj',
  githubUrl: 'https://github.com/saraswati-sanj',
  linkedinUrl: 'https://www.linkedin.com/in/sanjana-saraswathi/',
  profilePhoto: '/assets/aistudio/Sanjana_Profile_38984dcd.jpeg',
  resumePdf: '/assets/aistudio/sanjana_R_SDE___4__22151dff.pdf',
  technicalProfilePdf: '/assets/aistudio/faceprep_resume_sanjana__a90a47b1.pdf',
  location: 'Bengaluru, Karnataka, India',
  status: 'Open to Opportunities',
  hlsVideoUrl:
    'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8',
  recruiterHighlights: [
    {
      title: 'Reinforcement Learning & PPO',
      detail: 'Architected adaptive policy gradient agents with feedback loops for personalized AI systems.',
    },
    {
      title: 'Computer Vision & Deep Learning',
      detail: 'Benchmarked 93.17% Dice Score and 87.22% IoU on surgical robotics semantic segmentation (EndoVis2017).',
    },
    {
      title: 'RAG & Vector Retrieval',
      detail: 'Built sub-second semantic retrieval pipelines integrating ChromaDB embeddings, FastAPI, and Gemini.',
    },
    {
      title: 'Academic Excellence',
      detail: '9.21 CGPA in BCA, currently pursuing MCA in AI & Generative AI at Alliance University.',
    },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'fashionverse',
    title: 'FashionVerse',
    subtitle: 'Adaptive AI Fashion Stylist',
    category: 'Reinforcement Learning & GenAI',
    tags: ['PPO', 'Generative AI', 'Gemini', '3D Virtual Try-On'],
    description:
      'An adaptive AI fashion stylist that generates personalized outfit recommendations using user preferences, contextual information, and interaction feedback.',
    keyContributions: [
      'Developed a Proximal Policy Optimization (PPO) reinforcement learning agent to adapt recommendations dynamically based on user feedback loops.',
      'Integrated Google Gemini for generative styling insights, fashion nuance reasoning, and natural-language recommendations.',
      'Incorporated 3D virtual try-on visualization enabling realistic draping simulation and multi-angle wardrobe preview.',
    ],
    image: projectFashionverse,
    colSpan: 'md:col-span-7',
    aspectRatio: 'aspect-[16/10]',
    githubUrl: 'https://github.com/saraswati-sanj',
  },
  {
    id: 'nutrilens',
    title: 'NutriLens AI',
    subtitle: 'Intelligent Nutrition Assistant',
    category: 'RAG & Vector Retrieval',
    tags: ['RAG', 'FastAPI', 'ChromaDB', 'Gemini', 'JWT'],
    description:
      'An intelligent nutrition assistant that identifies packaged food products through barcode scanning and generates personalized nutritional insights.',
    keyContributions: [
      'Built a barcode-based packaged food identification workflow linked with real-time product nutrient databases.',
      'Designed a high-performance Retrieval-Augmented Generation (RAG) pipeline using ChromaDB embeddings and Gemini for contextual dietary advice.',
      'Developed secure REST APIs with FastAPI, JWT authentication, and strict Pydantic schema validation.',
    ],
    image: projectNutrilens,
    colSpan: 'md:col-span-5',
    aspectRatio: 'aspect-[16/10]',
    githubUrl: 'https://github.com/saraswati-sanj',
  },
  {
    id: 'surgical-detection',
    title: 'Surgical Instrument Detection',
    subtitle: 'AI-Based Surgical Instrument Detection & Segmentation',
    category: 'Computer Vision & Robotics',
    tags: ['Python', 'PyTorch', 'U-Net', 'YOLO', 'ROS 2'],
    description:
      'A computer vision system for surgical instrument detection and segmentation using deep learning and robotic simulation.',
    keyContributions: [
      'Developed a hybrid U-Net and YOLO-based segmentation and detection pipeline trained on the EndoVis2017 robotic surgery benchmark dataset.',
      'Integrated the real-time vision inference pipeline with ROS 2 and Gazebo physics simulation environment.',
      'Used a simulated UR10e robotic manipulator for closed-loop robotic surgery experimentation and kinematic trajectory control.',
    ],
    metrics: [
      { label: 'Dice Score', value: '93.17%' },
      { label: 'IoU', value: '87.22%' },
      { label: 'Precision', value: '92.43%' },
      { label: 'Recall', value: '93.93%' },
    ],
    image: projectSurgicalVision,
    colSpan: 'md:col-span-12',
    aspectRatio: 'aspect-[21/9]',
    githubUrl: 'https://github.com/saraswati-sanj',
  },
];

export const JOURNALS: JournalItem[] = [
  {
    id: 'rag-deep-dive',
    title: 'Understanding Retrieval-Augmented Generation',
    topic: 'RAG · LLMs · Vector Databases',
    readTime: '5 min read',
    date: 'March 2026',
    summary:
      'A deep dive into grounding LLMs with dense vector retrieval, hybrid sparse-dense searching, and reranking pipelines using ChromaDB and embedding models.',
    takeaways: [
      'Chunking strategies directly dictate semantic boundary preservation in dense retrieval.',
      'Hierarchical indexing and reciprocal rank fusion reduce hallucination by up to 60%.',
      'Context compression and citation anchoring make agentic workflows verifiable in production.',
    ],
  },
  {
    id: 'reinforcement-learning-systems',
    title: 'Reinforcement Learning in Adaptive AI Systems',
    topic: 'PPO · Feedback Loops · Intelligent Agents',
    readTime: '7 min read',
    date: 'February 2026',
    summary:
      'Exploring how policy optimization (PPO) allows recommendation models to balance exploration vs exploitation when learning from continuous user feedback loops.',
    takeaways: [
      'Reward clipping in PPO prevents catastrophic policy drift during live user interactions.',
      'State representations must encapsulate both short-term attention and long-term affinity.',
      'Off-policy evaluation pipelines ensure deployment safety before updating agent parameters.',
    ],
  },
  {
    id: 'computer-vision-yolo-unet',
    title: 'Exploring Computer Vision with YOLO and U-Net',
    topic: 'Deep Learning · Segmentation · Object Detection',
    readTime: '6 min read',
    date: 'January 2026',
    summary:
      'Comparing pixel-level semantic segmentation with bounding box localization for high-stakes medical and robotic environments like laparoscopic surgery.',
    takeaways: [
      'Skip connections in U-Net retain fine geometric spatial cues lost in deep pooling layers.',
      'Anchor-free YOLO variants dramatically improve inference speeds on embedded edge GPUs.',
      'Synthetic data augmentation and domain randomization bridge the simulation-to-reality gap in robotics.',
    ],
  },
  {
    id: 'fastapi-ai-backends',
    title: 'Building Practical AI Applications with FastAPI',
    topic: 'Backend Development · AI Integration · APIs',
    readTime: '4 min read',
    date: 'December 2025',
    summary:
      'Architectural patterns for serving asynchronous machine learning models, managing GPU worker threads, and streaming tokens reliably with FastAPI and Pydantic.',
    takeaways: [
      'Async event loops prevent blocking HTTP connections while worker pools process heavy tensor batches.',
      'Pydantic v2 validation ensures strict input sanitization and automatic OpenAPI schema generation.',
      'Token streaming via Server-Sent Events (SSE) enhances perceived latency for conversational interfaces.',
    ],
  },
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: 'exp-1',
    title: 'Generative AI & LLMs',
    category: 'Foundational Models',
    description:
      'Investigating emergent reasoning, multi-turn reasoning traces, and synthetic prompt architectures.',
    image: exploreNeuralNetwork,
    aspect: 'aspect-square',
    rotation: -2,
  },
  {
    id: 'exp-2',
    title: 'Neural Network Architectures',
    category: 'Deep Learning',
    description:
      'Visualizing high-dimensional tensor weights, self-attention maps, and deep residual activations.',
    image: projectFashionverse,
    aspect: 'aspect-square',
    rotation: 2.5,
  },
  {
    id: 'exp-3',
    title: 'Computer Vision Experiments',
    category: 'Spatial Perception',
    description:
      'Real-time edge detection, instance masking, and robotic spatial awareness in dynamic environments.',
    image: projectSurgicalVision,
    aspect: 'aspect-square',
    rotation: -1.5,
  },
  {
    id: 'exp-4',
    title: 'Intelligent AI Agents',
    category: 'Autonomous Systems',
    description:
      'Designing tool-use chains, stateful memory buffers, and multi-agent coordination protocols.',
    image: exploreAutonomousAgent,
    aspect: 'aspect-square',
    rotation: 3,
  },
  {
    id: 'exp-5',
    title: 'Reinforcement Learning',
    category: 'Optimal Control',
    description:
      'Simulating reward landscapes, exploration strategies, and policy gradients in continuous action spaces.',
    image: projectNutrilens,
    aspect: 'aspect-square',
    rotation: -2.8,
  },
  {
    id: 'exp-6',
    title: 'Future of Human-AI Interaction',
    category: 'Cognitive Interfaces',
    description:
      'Exploring tactile visual interfaces where human intent fluidly directs intelligent agent behavior.',
    image: exploreHumanAi,
    aspect: 'aspect-square',
    rotation: 1.8,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'Java', 'C++', 'SQL', 'JavaScript'],
  },
  {
    title: 'Machine Learning & Deep Learning',
    skills: [
      'Scikit-Learn',
      'TensorFlow',
      'PyTorch',
      'CNNs',
      'Transformers',
      'NLTK',
      'Ensemble Learning',
    ],
  },
  {
    title: 'Generative AI',
    skills: ['LLMs', 'GPT', 'BERT', 'Prompt Engineering', 'LLM APIs', 'RAG'],
  },
  {
    title: 'Computer Vision',
    skills: ['YOLOv5', 'OpenCV', 'Object Detection', 'Real-Time Detection'],
  },
  {
    title: 'Tools & Frameworks',
    skills: [
      'Git',
      'Flask',
      'FastAPI',
      'Streamlit',
      'Hugging Face',
      'ChromaDB',
      'Vercel',
      'Figma',
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    title: 'Winner — Inter-College Hackathon',
    description:
      'Awarded first place for architecting an autonomous AI solution under rapid hackathon constraints.',
  },
  {
    title: 'Winner — Multiple Inter-College Coding Competitions',
    description:
      'Consistently recognized for algorithmic problem-solving and rapid data structures implementation.',
  },
  {
    title: 'Certified in PHP and MySQL — IIT Bombay Spoken Tutorial',
    description:
      'National certification in relational database engineering and backend server logic.',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'genai-for-everyone',
    title: 'Generative AI for Everyone',
    issuer: 'DeepLearning.AI / Educba',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/MU5K3VX5KQEG',
    verificationId: 'MU5K3VX5KQEG',
    skills: ['Generative AI', 'Large Language Models', 'Prompt Engineering', 'AI Ethics'],
    platform: 'Coursera',
  },
  {
    id: 'reinforcement-learning',
    title: 'Fundamentals of Reinforcement Learning',
    issuer: 'University of Alberta',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/6P0QIJ9LBHFW',
    verificationId: '6P0QIJ9LBHFW',
    skills: ['Reinforcement Learning', 'Markov Decision Processes', 'Dynamic Programming', 'Policy Iteration'],
    platform: 'Coursera',
  },
  {
    id: 'ml-python-stats',
    title: 'Machine Learning with Python & Statistics',
    issuer: 'Educba',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/certificate/WS2KH2K4YE1Q',
    verificationId: 'WS2KH2K4YE1Q',
    skills: ['Supervised Learning', 'Statistical Analysis', 'Scikit-Learn', 'Feature Engineering'],
    platform: 'Coursera',
  },
  {
    id: 'data-analysis-python',
    title: 'Data Analysis Using Python',
    issuer: 'University of Pennsylvania',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/certificate/40K4HYIMVFRF',
    verificationId: '40K4HYIMVFRF',
    skills: ['Data Wrangling', 'Pandas & NumPy', 'Exploratory Data Analysis', 'Visualization'],
    platform: 'Coursera',
  },
  {
    id: 'java-programming-ibm',
    title: 'Java Programming',
    issuer: 'IBM',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/certificate/DCEL4Q3DWNU0',
    verificationId: 'DCEL4Q3DWNU0',
    skills: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'Java Standard Edition'],
    platform: 'Coursera',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'UI-UX Developer Intern',
    company: 'RankBook Learning and Software Solutions',
    location: 'Mysore, Karnataka',
    period: 'June 2024 – August 2024',
    contributions: [
      'Designed and developed user-friendly web interfaces with a focus on usability, responsive design, and intuitive interaction flow.',
      'Collaborated closely with cross-functional development teams to improve application workflows, design systems, and overall user experience.',
    ],
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    specialization: 'Artificial Intelligence & Generative AI',
    institution: 'Alliance University, Bengaluru',
    period: '2025 – 2027',
    highlights: [
      'Curriculum focused on Advanced Machine Learning, Natural Language Processing, and LLM architectures.',
      'Conducting research in autonomous vision systems and reinforcement learning.',
    ],
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Seshadripuram Degree College, University of Mysore',
    period: '2022 – 2025',
    score: 'CGPA: 9.21',
    highlights: [
      'Graduated with distinction with top academic standing across computer science fundamentals.',
      'Led student tech clubs and competitive programming groups.',
    ],
  },
];
