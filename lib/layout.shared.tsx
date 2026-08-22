import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FaLinkedin } from "react-icons/fa6";
import { SiDiscord, SiGithub, SiX } from "react-icons/si";

function Wordmark() {
  return (
    <span className="inklet-wordmark">
      inklet <span className="inklet-wordmark-sub">docs</span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark />,
      url: "/",
    },
    links: [
      {
        type: "icon",
        label: "X",
        text: "X",
        url: "https://x.com/inkletLLC",
        icon: <SiX />,
        external: true,
        on: "menu",
      },
      {
        type: "icon",
        label: "LinkedIn",
        text: "LinkedIn",
        url: "https://www.linkedin.com/company/inklet",
        icon: <FaLinkedin />,
        external: true,
        on: "menu",
      },
      {
        type: "icon",
        label: "Discord",
        text: "Discord",
        url: "https://discord.gg/pEpJSqMP7V",
        icon: <SiDiscord />,
        external: true,
        on: "menu",
      },
      {
        type: "icon",
        label: "GitHub",
        text: "GitHub",
        url: "https://github.com/inklethq",
        icon: <SiGithub />,
        external: true,
        on: "menu",
      },
    ],
  };
}
