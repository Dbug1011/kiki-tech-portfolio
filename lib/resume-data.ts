// Single source for the in-page resume dossier. Merges the March 2025 PDF
// resume with the newer role/project/certificate details shown on the site.
//
// Deliberately NOT included (they were in the PDF): home address, birth date,
// phone number, and the references' personal phone/email. A public web page
// is indexed and scraped far more than a PDF is; add them back only if you
// really want them public.

export type ResumeSection =
  | "overview"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "credentials"
  | "involvement"
  | "learning"
  | "achievements";

export const resumeSections: { key: ResumeSection; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "credentials", label: "Credentials" },
  { key: "involvement", label: "Involvement" },
  { key: "learning", label: "Seminars" },
  { key: "achievements", label: "Achievements" },
];

export const profile = {
  name: "Karis Ruth Jumawan",
  role: "GTM Customer Engineer · Alphaus Inc.",
  location: "Tokyo, Japan · from Bohol, Philippines",
  email: "blessedkarisj.22@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/karis-ruth-jumawan/" },
    { label: "GitHub", href: "https://github.com/Dbug1011" },
  ],
  summary:
    "Computer Engineering graduate (Bohol Island State University, 2026) who sits between product, engineering, and customers. Background spans embedded systems, computer vision, full-stack apps, and cloud infrastructure.",
};

export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  place?: string;
  points?: string[];
};

export const experience: TimelineItem[] = [
  {
    title: "GTM Customer Engineer",
    org: "Alphaus Inc.",
    period: "Jul 2026 – Present",
    place: "Tokyo, Japan",
    points: [
      "Technical point of contact between product/engineering and customers, translating platform capabilities into practical solutions.",
      "Supports go-to-market through product demos, technical onboarding, and pre-sales guidance.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "Alphaus Inc.",
    period: "Feb 2026 – Mar 2026",
    place: "Tokyo, Japan",
    points: [
      "Supported CI/CD pipeline development and containerized deployments for a cloud cost-optimization platform.",
      "Contributed to cloud infrastructure and DevOps initiatives with cross-functional teams.",
    ],
  },
  {
    title: "Web Developer Intern",
    org: "GeckoTech Solutions",
    period: "Jun 2025 – Jul 2025",
    place: "Cebu City, Philippines",
    points: [
      "Built responsive web apps, turning UI/UX designs into production interfaces.",
      "Worked on full-stack features, version control workflows, and client deployments.",
    ],
  },
  {
    title: "Private English Tutor",
    org: "Independent",
    period: "Apr 2022 – May 2022",
    points: ["Taught basic English to Korean learners while on vacation."],
  },
  {
    title: "Virtual Assistant",
    org: "JVL Insurance Company",
    period: "2020 – 2022",
    place: "California, USA",
    points: [
      "Managed electronic and paper filing systems, keeping documents and records accurate and current.",
    ],
  },
];

export const projects: { name: string; tags: string[]; blurb: string }[] = [
  {
    name: "Project Jennah",
    tags: ["GCP", "gRPC", "Consistent Hashing"],
    blurb:
      "Opinionated workload deployment platform with a resilient data plane that routes and executes enterprise deployments with minimal latency.",
  },
  {
    name: "TestXTech",
    tags: ["Next.js", "Python", "OpenCV"],
    blurb:
      "Image-processing system that digitizes and auto-grades paper exams: multiple choice, identification, enumeration, true/false.",
  },
  {
    name: "Student Tracker",
    tags: ["React", "Node.js", "WebSockets", "RFID"],
    blurb: "Real-time RFID attendance with a live entry/exit dashboard.",
  },
  {
    name: "AI Solar Tracking System",
    tags: ["Raspberry Pi 5", "YOLOv8", "Motor Control"],
    blurb:
      "Computer vision drives servo motors so a solar panel follows the sun.",
  },
  {
    name: "Energy Visualizer",
    tags: ["InfluxDB"],
    blurb: "Time-series dashboards for electricity consumption data.",
  },
  {
    name: "Atteventify",
    tags: ["Flutter"],
    blurb: "QR-code attendance app that streamlines event check-ins.",
  },
  {
    name: "Fruit Detection Using OpenCV",
    tags: ["Python", "OpenCV", "CNN"],
    blurb:
      "Real-time fruit and vegetable detection using a CNN trained on a Kaggle dataset.",
  },
  {
    name: "Human DA — Disaster Awareness",
    tags: ["React Native"],
    blurb:
      "Disaster-preparedness app: donation tracking, emergency contacts, offline survival guides, volunteer coordination.",
  },
];

// 1–5, as rated on the PDF resume.
export const softSkills: { name: string; level: number }[] = [
  { name: "Public Speaking", level: 5 },
  { name: "People Management & Communication", level: 5 },
  { name: "Leadership", level: 5 },
  { name: "Virtual Assistance", level: 5 },
  { name: "C / C++", level: 4 },
  { name: "Microsoft Office", level: 4 },
];

export const interests = [
  "Gym",
  "Music",
  "Reading",
  "Content Creation",
  "Sports",
  "Singing & Dancing",
];

export const education: TimelineItem[] = [
  {
    title: "BS Computer Engineering",
    org: "Bohol Island State University",
    period: "2022 – 2026",
    points: ["Graduated June 2026."],
  },
  {
    title: "Senior High School — ABM",
    org: "Dr. Cecilio Putong National High School",
    period: "2020 – 2022",
  },
  {
    title: "Junior High School",
    org: "Lourdes High School",
    period: "2015 – 2020",
    place: "Cortes, Bohol",
    points: ["Graduated Valedictorian."],
  },
  {
    title: "Elementary",
    org: "Lourdes Elementary School",
    period: "2009 – 2015",
    points: ["Graduated Salutatorian."],
  },
];

export const credentials: { name: string; issuer: string }[] = [
  { name: "FinOps Certified Practitioner (2026)", issuer: "The Linux Foundation" },
  { name: "Google Data Analytics", issuer: "Google" },
  { name: "DICT-ICT013: Intermediate Software Engineering", issuer: "DICT" },
  { name: "Attract and Engage Customers with Digital Marketing", issuer: "Coursera" },
  { name: "Foundations of Digital Marketing and E-commerce", issuer: "Coursera" },
  { name: "Foundations: Data, Data, Everywhere", issuer: "Coursera" },
  { name: "Advanced Commands in Linux", issuer: "Coursera" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp" },
];

export const involvement: TimelineItem[] = [
  {
    title: "Public Information Officer",
    org: "ICpEP.SE — BISU Main Campus Chapter",
    period: "Institute of Computer Engineers of the Philippines",
    place: "Tagbilaran, Bohol",
  },
  {
    title: "Public Information Officer",
    org: "DOST Scholars' Association — Bohol",
    period: "Also active in the Region 7 association",
  },
  {
    title: "Member",
    org: "Google Developer Student Clubs",
    period: "Community for students into Google developer tech",
    place: "Tagbilaran, Bohol",
  },
];

export const seminars: { group: string; items: string[] }[] = [
  {
    group: "Technology & Development",
    items: [
      "Introduction to Cloud Computing",
      "Data Privacy Act Seminar",
      "Effortless Full-Stack: Next.js, Strapi & GraphQL",
      "AI Pilipinas",
      "Careers in AI",
      "DOST: Introduction to Technopreneurship",
    ],
  },
  {
    group: "Startup & Mobile",
    items: [
      "Startup Weekend Bohol 2024",
      "SWB '24: Mobile Apps with Flutter & Firebase",
      "SWB '24: Rapid Prototyping with Figma",
      "SWB '24: Basic Steps to Business Model Success",
      "Flutter GDSC",
      "Flutter Jam: Darting Your Way to Success",
    ],
  },
  {
    group: "Google & Developer Events",
    items: ["GDG DevFest Cebu 2024", "Google I/O Extended Cebu 2024"],
  },
  {
    group: "Design & Multimedia",
    items: [
      "Scienceholic Speaker",
      "3D Animation Using Blender",
      "3D Animation Using Adobe After Effects",
    ],
  },
  {
    group: "Leadership & Advocacy",
    items: [
      "2022 BSP Seminar",
      "2023 DOST Scholars Leadership Bootcamp (Regional)",
      "PAGMULAT: Responsible Student Journalism",
      "Sprout Up Bohol",
    ],
  },
];

export const achievements: { place: string; event: string; tier: "gold" | "silver" | "bronze" | "honor" }[] = [
  { place: "Champion", event: "TechnoWeek Techno Quiz Bowl (2024)", tier: "gold" },
  { place: "1st Runner-Up", event: "ICpEP.SE Region 7 Quiz Bowl (2024)", tier: "silver" },
  { place: "1st Runner-Up", event: "DICT AI.DEAS for Impact Competition (2025)", tier: "silver" },
  { place: "1st Runner-Up", event: "STTP Technopreneurship Demo Day, Regional (2025)", tier: "silver" },
  { place: "Participant", event: "SQUEEEZE 2025 (National)", tier: "honor" },
  { place: "Valedictorian", event: "Lourdes High School (JHS)", tier: "gold" },
  { place: "Salutatorian", event: "Lourdes Elementary School", tier: "silver" },
  { place: "1st Place", event: "Oratorical Contest (District)", tier: "gold" },
  { place: "1st Place", event: "Math Quiz, Science & Math (District)", tier: "gold" },
  { place: "MTAP Quizzer", event: "Congressional Level", tier: "honor" },
  { place: "1st Place", event: "GSP Essay Writing, Senior (District & Area-3)", tier: "gold" },
  { place: "2nd Place", event: "GSP Essay Writing, Senior (Provincial)", tier: "silver" },
  { place: "1st Place", event: "GSP Essay Writing, Junior (District & Area-3)", tier: "gold" },
  { place: "3rd Place", event: "GSP Essay Writing, Junior (Provincial)", tier: "bronze" },
  { place: "1st Place", event: "GSP Tula (District & Area-3)", tier: "gold" },
  { place: "2nd Place", event: "GSP Tula (Provincial)", tier: "silver" },
  { place: "Participant", event: "DSPC Photojournalism", tier: "honor" },
];
