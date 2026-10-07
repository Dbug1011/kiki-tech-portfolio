import React from "react";
import {
  SiInstagram,
  SiFacebook,
  SiTwitter,
  SiLinkedin,
  SiTiktok,
  SiYoutube,
  SiDiscord,
  SiGithub,
} from "react-icons/si";

const socialLinks = [
  {
    href: "https://www.instagram.com/kiii__ki11/",
    label: "Instagram",
    Icon: SiInstagram,
  },
  {
    href: "https://www.facebook.com/kikii1011/",
    label: "Facebook",
    Icon: SiFacebook,
  },
  { href: "https://x.com/kikiii__ki11", label: "X (Twitter)", Icon: SiTwitter },
  {
    href: "https://www.tiktok.com/@kikiimnida",
    label: "TikTok",
    Icon: SiTiktok,
  },
  {
    href: "https://www.youtube.com/channel/UCW801YOi_oZCHsWBRCv7Kpg",
    label: "YouTube",
    Icon: SiYoutube,
  },
  {
    href: "https://www.linkedin.com/in/karis-ruth-jumawan/",
    label: "LinkedIn",
    Icon: SiLinkedin,
  },
  { href: "https://github.com/Dbug1011", label: "GitHub", Icon: SiGithub },
  {
    href: "https://discordapp.com/users/dbug1011",
    label: "Discord",
    Icon: SiDiscord,
  },
];

const SocialIcons = () => {
  return (
    <div className="flex gap-4 text-white text-xl mx-auto w-full">
      {socialLinks.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="hover:scale-150 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
