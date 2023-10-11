"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NavigationItem } from "@/generated/sdk";

type MenuItem = {
  ContentLink?: {
    Expanded?: {
      Name?: string;
      NavigationLink?: NavigationItem & {
        ContentLink?: {
          Expanded?: {
            RelativePath?: string;
          };
        };
      };
      Icon?: {
        ContentLink?: {
          Expanded?: {
            ContentLink?: {
              Url?: string;
            };
          };
        };
      };
    };
  };
};

type MenuProps = {
  className?: string;
  items: MenuItem[];
  cmsUrl: string; // Add the cmsUrl property here
};

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { className, items, cmsUrl } = props;
  const matches = useMediaQuery("(min-width: 970px)");
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    setMenuOpen(matches);
  }, [matches]);

  return (
    <nav {...props} className={`p-[1px] min-w-[60px] bg-gradient-to-b from-vulcan-85 to-vulcan-95 overflow-hidden rounded-md ${className}`} role="Main Navigation">
      <div className="bg-vulcan-95 bg-opacity-90 rounded-md px-[5px] py-[11px] text-center">
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          aria-label="Close Menu"
        >
          <h2 className="t-overline">Menu</h2>
        </button>
        <ul className={`w-full ${menuOpen ? "" : "hidden"}`}>
          {items &&
            items.map((menuItem, index) => {
              let name = menuItem?.ContentLink?.Expanded?.Name;
              let linkObj = menuItem?.ContentLink?.Expanded?.NavigationLink?.ContentLink?.Expanded;
              let iconObj = menuItem?.ContentLink?.Expanded?.Icon?.ContentLink?.Expanded?.ContentLink;

              if (linkObj?.RelativePath) {
                return (
                  <li key={`MenuItem-${index}`} className="mt-5">
                    <Link href={linkObj?.RelativePath} className="p-[6px] text-[8px] w-[50px] rounded-[4px] text-ghost-white uppercase tracking-[1px] block hover:bg-vulcan-85 transition-all">
                      <img className="mx-auto mb-[8px]" alt="icon name" src={`${cmsUrl}/${iconObj?.Url}`} />
                      {name}
                    </Link>
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
