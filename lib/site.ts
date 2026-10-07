// Site-wide constants. The cross-link to the creative portfolio comes from
// an env var so each deployment can point at the other one's real domain
// (see .env.example). Locally the two apps run on :3000 and :3001.

export const site = {
  name: "Karis Ruth Jumawan",
  handle: "kiki",
  role: "Computer Engineer · GTM Customer Engineer at Alphaus",
  location: "Tokyo, Japan",
  email: "blessedkarisj.22@gmail.com",
  github: "https://github.com/Dbug1011",
  linkedin: "https://www.linkedin.com/in/karis-ruth-jumawan/",
  creativeUrl: process.env.NEXT_PUBLIC_CREATIVE_URL ?? "http://localhost:3001",
};

export const nav = [
  { href: "/#work", label: "Case studies" },
  { href: "/#stack", label: "Stack" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];
