import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiArduino,
  SiC,
  SiCplusplus,
  SiCss3,
  SiDart,
  SiElasticsearch,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiGrafana,
  SiHtml5,
  SiInfluxdb,
  SiJavascript,
  SiKeras,
  SiKibana,
  SiLogstash,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiProteus,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import { caseStudies } from "./case-studies";

// The full toolset, grouped by where it sits in a system. Only tools that
// appear in the résumé or a case study are listed. `uses` holds the names a
// tool goes by in case-study `stack` arrays, so the page can show how many
// builds actually used it.

export type Tool = { name: string; Icon?: IconType; uses?: string[] };
export type ToolGroup = { title: string; blurb: string; tools: Tool[] };

export const stackGroups: ToolGroup[] = [
  {
    title: "Cloud & Platform",
    blurb: "Where the systems run and how their parts talk.",
    tools: [
      { name: "Google Cloud", Icon: SiGooglecloud, uses: ["Google Cloud"] },
      { name: "gRPC", uses: ["gRPC"] },
      { name: "WebSockets", Icon: SiSocketdotio, uses: ["WebSockets"] },
      { name: "Consistent hashing", uses: ["Consistent hashing"] },
      { name: "CI/CD" },
      { name: "FinOps (certified)" },
    ],
  },
  {
    title: "Backend & Data",
    blurb: "APIs, relational and time-series stores, and the dashboards on top.",
    tools: [
      { name: "Node.js", Icon: SiNodedotjs, uses: ["Node.js"] },
      { name: "Express", Icon: SiExpress, uses: ["Express"] },
      { name: "MySQL", Icon: SiMysql, uses: ["MySQL"] },
      { name: "InfluxDB", Icon: SiInfluxdb, uses: ["InfluxDB"] },
      { name: "Firebase", Icon: SiFirebase, uses: ["Firebase"] },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Elasticsearch", Icon: SiElasticsearch, uses: ["Elasticsearch"] },
      { name: "Logstash", Icon: SiLogstash },
      { name: "Kibana", Icon: SiKibana },
      { name: "Grafana", Icon: SiGrafana },
    ],
  },
  {
    title: "Frontend & Mobile",
    blurb: "Dashboards and apps people actually use, on web and phone.",
    tools: [
      { name: "React", Icon: SiReact, uses: ["React"] },
      { name: "Next.js", Icon: SiNextdotjs, uses: ["Next.js"] },
      { name: "React Native", Icon: SiReact, uses: ["React Native"] },
      { name: "Expo", Icon: SiExpo, uses: ["Expo"] },
      { name: "Flutter", Icon: SiFlutter, uses: ["Flutter"] },
      { name: "Recharts", uses: ["Recharts"] },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Android", Icon: SiAndroid },
    ],
  },
  {
    title: "Vision & ML",
    blurb: "Turning camera frames into decisions.",
    tools: [
      { name: "OpenCV", Icon: SiOpencv, uses: ["OpenCV"] },
      { name: "YOLOv8", uses: ["YOLOv8 (Ultralytics)"] },
      { name: "TensorFlow", Icon: SiTensorflow, uses: ["TensorFlow / Keras"] },
      { name: "Keras", Icon: SiKeras, uses: ["TensorFlow / Keras"] },
      { name: "CNNs", uses: ["CNN"] },
      { name: "Image processing", uses: ["Image processing"] },
    ],
  },
  {
    title: "Hardware & Embedded",
    blurb: "Sensors, motors, and the boards in between.",
    tools: [
      { name: "Raspberry Pi", Icon: SiRaspberrypi, uses: ["Raspberry Pi 5"] },
      { name: "RFID", uses: ["RFID"] },
      { name: "GPIO / PWM", uses: ["GPIO / PWM"] },
      { name: "Motor control", uses: ["Motor control"] },
      { name: "Arduino", Icon: SiArduino },
      { name: "Proteus", Icon: SiProteus },
    ],
  },
  {
    title: "Languages & Tools",
    blurb: "What it's all written in, and how it's versioned.",
    tools: [
      { name: "Python", Icon: SiPython, uses: ["Python"] },
      { name: "TypeScript", Icon: SiTypescript, uses: ["TypeScript"] },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Dart", Icon: SiDart, uses: ["Dart"] },
      { name: "C", Icon: SiC },
      { name: "C++", Icon: SiCplusplus },
      { name: "HTML", Icon: SiHtml5 },
      { name: "CSS", Icon: SiCss3 },
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
    ],
  },
];

/** Case studies that list one of the tool's names in their stack. */
export const buildsUsing = (tool: Tool) =>
  tool.uses
    ? caseStudies.filter((c) => c.stack.some((s) => tool.uses!.includes(s)))
    : [];

export const toolCount = stackGroups.reduce((n, g) => n + g.tools.length, 0);
