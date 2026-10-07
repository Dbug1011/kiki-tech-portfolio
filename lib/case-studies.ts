// Every case study follows the same structure:
//   Problem → Solution → Architecture → Stack → Results → Repos/Demos
//
// Results are written from what each build actually does. Where you have
// real numbers (latency, accuracy, users, hours saved), add them to
// `metrics`: they render as stat tiles at the top of the case study.
// Leave `metrics` out rather than guessing.

export type Category = "cloud" | "automation" | "hardware" | "apps";

export const categories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "cloud", label: "Cloud & Backend" },
  { key: "automation", label: "Automation & Vision" },
  { key: "hardware", label: "Hardware & IoT" },
  { key: "apps", label: "Apps" },
];

/** One box in the architecture flow. */
export type ArchNode = { label: string; detail?: string };

/**
 * The architecture diagram is an ordered list of stages, read left → right
 * (top → bottom on phones). A stage with several nodes renders them stacked,
 * for parallel pieces like "MySQL + InfluxDB".
 */
export type ArchStage = { title: string; nodes: ArchNode[] };

export type CaseLink = {
  label: string;
  href: string;
  kind: "repo" | "demo" | "doc";
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  year: string;
  role: string;
  status: "Production" | "Prototype" | "Academic" | "Competition";
  cover?: string;
  featured?: boolean;
  problem: string;
  solution: string[];
  architecture: ArchStage[];
  architectureNote?: string;
  stack: string[];
  results: string[];
  metrics?: { value: string; label: string }[];
  links: CaseLink[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "project-jennah",
    title: "Project Jennah",
    tagline:
      "A workload deployment platform with a resilient data plane for enterprise deployments.",
    category: "cloud",
    year: "2026",
    role: "Platform engineer",
    status: "Prototype",
    featured: true,
    problem:
      "Enterprise teams ship many workloads to many targets. A naive dispatcher either pins everything to one node (a single point of failure) or reshuffles every job whenever capacity changes, which drops warm state and adds latency at exactly the wrong time.",
    solution: [
      "An opinionated deployment platform: teams describe a workload once and the platform decides where and how it runs.",
      "A data plane separated from the control plane, so routing and execution keep working even while configuration changes.",
      "Requests are routed with a consistent-hash ring keyed on the workload, so the same deployment lands on the same executor and adding or removing a node only remaps a small slice of keys.",
      "Services talk over gRPC for typed contracts and low-overhead calls between the router and executors.",
    ],
    architecture: [
      { title: "Entry", nodes: [{ label: "Client / CLI", detail: "Deployment request" }] },
      { title: "Control plane", nodes: [{ label: "gRPC API", detail: "Validates + schedules" }] },
      {
        title: "Data plane",
        nodes: [{ label: "Hash-ring router", detail: "Consistent hashing on workload key" }],
      },
      {
        title: "Execution",
        nodes: [
          { label: "Executor A" },
          { label: "Executor B" },
          { label: "Executor N" },
        ],
      },
      { title: "Targets", nodes: [{ label: "GCP workloads", detail: "Enterprise deployments" }] },
    ],
    stack: ["Google Cloud", "gRPC", "Consistent hashing", "Distributed systems"],
    results: [
      "Deterministic placement: a given workload always routes to the same executor, so caches and state stay warm.",
      "Graceful scaling: changing the executor pool remaps only the affected keys instead of the whole fleet.",
      "Clear control/data plane split, so a misbehaving config push doesn't take down in-flight deployments.",
    ],
    links: [],
  },
  {
    slug: "testxtech",
    title: "TestXTech",
    tagline:
      "An automated test checker that digitizes and grades paper exams, handwriting included.",
    category: "automation",
    year: "2025",
    role: "Full-stack + computer vision",
    status: "Academic",
    featured: true,
    problem:
      "Teachers still grade paper exams by hand. It's slow, it's tiring, and fatigue creeps into the scores. Existing scanners only read bubble sheets, which leaves out identification and enumeration items, where students write their answers.",
    solution: [
      "A teacher photographs or scans the answer sheets and uploads them in a web app.",
      "A Python + OpenCV pipeline straightens the page, finds the answer regions, and extracts both shaded marks and handwritten responses.",
      "A grading engine compares answers against the key per item type, and scores go straight back to the dashboard.",
    ],
    architecture: [
      { title: "Capture", nodes: [{ label: "Scan / photo", detail: "Paper answer sheet" }] },
      { title: "Web app", nodes: [{ label: "Next.js", detail: "Upload + answer keys" }] },
      {
        title: "Vision pipeline",
        nodes: [
          { label: "Preprocess", detail: "Deskew, threshold" },
          { label: "Region detection", detail: "Locate answer fields" },
          { label: "Extraction", detail: "Marks + handwriting" },
        ],
      },
      { title: "Grading", nodes: [{ label: "Scoring engine", detail: "Per item type" }] },
      { title: "Output", nodes: [{ label: "Results dashboard" }] },
    ],
    stack: ["Next.js", "Python", "OpenCV", "Image processing"],
    results: [
      "Grades four item types: multiple choice, identification, enumeration, and true/false.",
      "Turns a stack of paper into digital scores without re-encoding answers by hand.",
      "The same pipeline works on scans and phone photos.",
    ],
    links: [],
  },
  {
    slug: "student-tracker",
    title: "Student Tracker",
    tagline: "Real-time RFID attendance with a live entry/exit dashboard.",
    category: "hardware",
    year: "2025",
    role: "Full-stack + hardware integration",
    status: "Prototype",
    featured: true,
    problem:
      "Paper and manual attendance logs give a school no live view of who's on campus. They're slow to compile and easy to fake, and they say nothing about when a student actually left.",
    solution: [
      "Students tap RFID cards at the gate, and every tap is written as a timestamped event.",
      "An Express API combines the event stream with the student roster and exposes realtime, summary, and stats endpoints.",
      "A React dashboard shows who's in, who's out, and daily summaries as they happen.",
    ],
    architecture: [
      { title: "Edge", nodes: [{ label: "RFID reader", detail: "Card tap at gate" }] },
      {
        title: "Storage",
        nodes: [
          { label: "InfluxDB", detail: "Tap events (time series)" },
          { label: "MySQL", detail: "Student roster" },
        ],
      },
      {
        title: "API",
        nodes: [{ label: "Node.js / Express", detail: "/attendance, /realtime, /summary" }],
      },
      { title: "Live channel", nodes: [{ label: "WebSockets", detail: "Push updates" }] },
      { title: "UI", nodes: [{ label: "React dashboard", detail: "Live in / out view" }] },
    ],
    architectureNote:
      "Events and roster are stored separately: a time-series store for high-frequency taps, a relational store for who the students are.",
    stack: ["React", "Node.js", "Express", "WebSockets", "InfluxDB", "MySQL", "RFID"],
    results: [
      "Replaces manual logs with automatic entry and exit records.",
      "Live dashboard view instead of end-of-day compilation.",
      "Realtime, complete, summary, and stats views served from one API.",
    ],
    links: [{ label: "Repository", href: "https://github.com/Dbug1011/school_tracker", kind: "repo" }],
  },
  {
    slug: "ai-solar-tracker",
    title: "AI Solar Tracking System",
    tagline: "Computer vision steers a pan/tilt solar panel to follow the sun.",
    category: "hardware",
    year: "2025",
    role: "Embedded + ML",
    status: "Prototype",
    featured: true,
    problem:
      "A fixed solar panel only faces the sun for part of the day. Light-sensor trackers are cheap but get fooled by clouds, reflections, and uneven sensors.",
    solution: [
      "A Raspberry Pi 5 camera feeds frames to a YOLOv8 model trained to detect the sun.",
      "The tracker measures how far the sun sits from the frame's center and converts that error into pan and tilt angle corrections.",
      "Servo motion is smoothed: the step size adapts when the target jumps, and angles are clamped to 0–180°, so the panel moves steadily instead of jittering.",
    ],
    architecture: [
      { title: "Sense", nodes: [{ label: "Pi camera", detail: "Live frames" }] },
      { title: "Detect", nodes: [{ label: "YOLOv8", detail: "Sun detection on RPi 5" }] },
      { title: "Control", nodes: [{ label: "Error → angle", detail: "Offset from frame center" }] },
      { title: "Smooth", nodes: [{ label: "Adaptive smoothing", detail: "Clamp 0–180°" }] },
      {
        title: "Actuate",
        nodes: [
          { label: "Pan servo", detail: "GPIO PWM 50 Hz" },
          { label: "Tilt servo", detail: "GPIO PWM 50 Hz" },
        ],
      },
    ],
    stack: ["Raspberry Pi 5", "Python", "YOLOv8 (Ultralytics)", "OpenCV", "GPIO / PWM", "Motor control"],
    results: [
      "Closed-loop tracking on two axes from one camera, with no light-sensor array.",
      "Smoothed control loop: the panel converges on the sun without oscillating.",
      "Model training notebook included, so the detector can be retrained for new conditions.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Dbug1011/AI-Solar-Tracking-System-with-DC-Motors",
        kind: "repo",
      },
    ],
  },
  {
    slug: "energy-visualizer",
    title: "Energy Visualizer",
    tagline: "Time-series dashboards for per-room electricity consumption.",
    category: "cloud",
    year: "2025",
    role: "Backend + data visualization",
    status: "Prototype",
    problem:
      "Electricity readings were sitting in raw tables. Nobody could easily answer which room uses the most power, or when.",
    solution: [
      "A Node.js backend maps meters to rooms and pulls readings from the time-series store.",
      "API endpoints serve room lists and date-ranged consumption data.",
      "A React front end with date pickers and charts makes the trends easy to read.",
    ],
    architecture: [
      { title: "Source", nodes: [{ label: "Meter readings" }] },
      {
        title: "Storage",
        nodes: [
          { label: "InfluxDB", detail: "Consumption time series" },
          { label: "MySQL", detail: "Meter → room mapping" },
        ],
      },
      { title: "API", nodes: [{ label: "Node.js / Express", detail: "/api/rooms, /api/data" }] },
      { title: "UI", nodes: [{ label: "React + Recharts", detail: "Date-ranged dashboards" }] },
    ],
    stack: ["InfluxDB", "Node.js", "Express", "MySQL", "React", "Recharts", "Elasticsearch"],
    results: [
      "Per-room consumption for any date range, on demand.",
      "Health and debug endpoints that make meter-to-room mapping issues visible.",
    ],
    links: [
      {
        label: "Repository (InfluxDB)",
        href: "https://github.com/Dbug1011/Energy_Visualizer_influxdb",
        kind: "repo",
      },
      { label: "Repository (v1)", href: "https://github.com/Dbug1011/energy-visualizer", kind: "repo" },
    ],
  },
  {
    slug: "fruit-detection",
    title: "Fruit Detection",
    tagline: "Real-time fruit and vegetable detection with a CNN and OpenCV.",
    category: "automation",
    year: "2024",
    role: "ML engineer",
    status: "Academic",
    problem:
      "Sorting and counting produce by eye is slow and inconsistent. A camera-based classifier is the first step toward automating it.",
    solution: [
      "Trained a convolutional neural network on a Kaggle fruit and vegetable dataset.",
      "OpenCV captures live video, and each frame is classified in real time with the label drawn on screen.",
    ],
    architecture: [
      { title: "Data", nodes: [{ label: "Kaggle dataset", detail: "Labelled produce images" }] },
      { title: "Train", nodes: [{ label: "CNN", detail: "Image classifier" }] },
      { title: "Capture", nodes: [{ label: "OpenCV", detail: "Live webcam frames" }] },
      { title: "Output", nodes: [{ label: "Labelled overlay" }] },
    ],
    stack: ["Python", "OpenCV", "CNN", "TensorFlow / Keras"],
    results: ["Live, on-screen classification from a standard webcam."],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Dbug1011/Fruit-Detection-Using-OpenCV",
        kind: "repo",
      },
    ],
  },
  {
    slug: "human-da",
    title: "Human DA",
    tagline: "A disaster-preparedness app that still works offline.",
    category: "apps",
    year: "2025",
    role: "Mobile developer",
    status: "Competition",
    problem:
      "During a disaster, connectivity is the first thing to go. Survival information, emergency contacts, and relief coordination are scattered across many channels.",
    solution: [
      "A cross-platform React Native (Expo) app that puts preparedness and relief in one place.",
      "Offline survival guides and emergency contacts stay available without a signal.",
      "Firebase-backed donation tracking and volunteer coordination for when the network returns.",
    ],
    architecture: [
      { title: "Client", nodes: [{ label: "Expo / React Native", detail: "iOS + Android" }] },
      {
        title: "On device",
        nodes: [
          { label: "Offline guides" },
          { label: "Emergency contacts" },
          { label: "Location", detail: "expo-location" },
        ],
      },
      { title: "Cloud", nodes: [{ label: "Firebase", detail: "Donations + volunteers" }] },
    ],
    stack: ["React Native", "Expo", "Firebase", "TypeScript"],
    results: [
      "Core survival content works with no network.",
      "One app for donations, contacts, guides, and volunteers.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Dbug1011/Human-DA-Disaster-Awareness-App-",
        kind: "repo",
      },
    ],
  },
  {
    slug: "atteventify",
    title: "Atteventify",
    tagline: "QR-code attendance for fast event check-ins.",
    category: "apps",
    year: "2024",
    role: "Mobile developer",
    status: "Academic",
    cover: "/photos/AtteventifyCover.png",
    problem:
      "Event check-in by paper list creates queues at the door and leaves organizers retyping names afterward.",
    solution: [
      "Each attendee gets a QR code, and organizers scan it with a Flutter app at the door.",
      "Check-ins are recorded as they happen, so the attendance list is ready the moment the event starts.",
    ],
    architecture: [
      { title: "Attendee", nodes: [{ label: "QR code" }] },
      { title: "Scanner", nodes: [{ label: "Flutter app", detail: "Camera scan" }] },
      { title: "Records", nodes: [{ label: "Attendance store", detail: "Timestamped check-ins" }] },
      { title: "Organizer", nodes: [{ label: "Live attendee list" }] },
    ],
    stack: ["Flutter", "Dart", "QR scanning"],
    results: ["Check-in becomes a scan instead of a search through a list."],
    links: [],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
