export type Project = {
  number: string;
  title: string;
  kicker: string;
  description: string;
  technologies: string[];
  github: string;
  problem: string;
  solution: string;
  implementation: string;
  results: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "AI Chatbot",
    kicker: "LangChain × Hugging Face",
    description:
      "An AI-powered chatbot using LangChain and Hugging Face models for interactive response generation.",
    technologies: ["LangChain", "Hugging Face", "Python", "API Integration"],
    github: "https://github.com/Sushanty6767/simple_Chatabot",
    problem: "Create a practical conversational interface powered by generative AI models.",
    solution:
      "Connected prompt-based interactions to Hugging Face models through a LangChain application flow.",
    implementation:
      "Built in Python with LangChain orchestration, Hugging Face APIs, and a structured prompt workflow.",
    results:
      "A working generative AI application that produces interactive responses through an accessible chatbot interface.",
  },
  {
    number: "02",
    title: "Travel & Tourism Management",
    kicker: "Java desktop application",
    description:
      "A Java Swing application for travel package and hotel booking management with reliable MySQL CRUD operations.",
    technologies: ["Java", "Java Swing", "MySQL", "JDBC", "OOP"],
    github: "https://github.com/Sushanty6767/Travel-and-Tourism-Management",
    problem: "Organize travel packages, hotel details, and bookings in one manageable system.",
    solution:
      "Translated booking requirements into a desktop interface for managing travel-related information.",
    implementation:
      "Applied object-oriented design in Java Swing and connected MySQL through JDBC for CRUD operations.",
    results:
      "A functional management application with persistent booking and package data workflows.",
  },
  {
    number: "03",
    title: "Boston House Price Prediction",
    kicker: "Machine learning study",
    description:
      "A house-price prediction workflow built through data exploration, preprocessing, and Linear Regression.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    github: "https://github.com/Sushanty6767/Bostan_house",
    problem: "Explore the relationship between housing features and price on the Boston Housing dataset.",
    solution:
      "Prepared features and target variables, then trained a Linear Regression model for prediction.",
    implementation:
      "Used Pandas and NumPy for preparation, Scikit-learn for modeling, and Matplotlib for residual visualization.",
    results:
      "Evaluated the model with R², MSE, RMSE, and MAE, plus coefficient and residual analysis.",
  },
];

export const skillGroups = [
  { label: "Programming", skills: ["Python", "Java"] },
  { label: "Core CS", skills: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Collections"] },
  { label: "Data & Machine Learning", skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Machine Learning", "Soft Computing"] },
  { label: "AI / Generative AI", skills: ["LangChain", "Hugging Face", "Prompt Engineering", "API Integration"] },
  { label: "Tools", skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"] },
];

export const certifications = [
  ["Python Programming", "GeeksforGeeks", "2025"],
  ["Build AI Agents and Automate Workflows with n8n", "LinkedIn Learning", "2025"],
  ["Java for Beginners", "GUVI", "2025"],
  ["Object-Oriented Programming", "GUVI", "2025"],
  ["Computational Thinking", "GUVI", "2025"],
] as const;

export const navItems = ["Home", "About", "Skills", "Projects", "Certifications", "Contact"];

/** Google Form URL for portfolio contact inquiries. Change this to update the form destination. */
export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScnc-EuKk3F0m35MOfXpCrBljhhTCP8Mt-4sdAEBIt17qaIaQ/viewform?usp=header";