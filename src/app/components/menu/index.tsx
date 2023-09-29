"use client";

import { useState } from "react";
import Link from "next/link";

type MenuItem = {
  RelativePath: string;
  Name: string;
};

type MenuProps = {
  className?: string;
  items: MenuItem[];
};

const Menu: React.FC<MenuProps> = (props) => {
  const { className, items } = props;
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <nav {...props} className={`p-[1px] bg-gradient-to-b from-vulcan-85 to-vulcan-95 overflow-hidden rounded-md ${className}`} role="Main Navigation">
      <div className="bg-vulcan-95 bg-opacity-90 rounded-md px-[5px] py-[11px] text-center">
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          aria-label="Close Menu"
        >
          <h2 className="t-overline">Menu</h2>
        </button>
        <ul className="w-full" style={{ display: menuOpen ? "" : "none" }}>
          {items &&
            items.map((menuItem, index) => {
              return (
                <li key={`MenuItem-${index}`} className="mt-5">
                  <Link href={menuItem.RelativePath} className="p-[6px] text-[8px] w-[50px] rounded-[4px] text-ghost-white uppercase tracking-[1px] block hover:bg-vulcan-85 transition-all">
                    <img className="mx-auto mb-[8px]" alt="icon name" src="https://placekitten.com/24/24" />
                    {menuItem.Name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
