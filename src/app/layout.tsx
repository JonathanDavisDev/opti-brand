import "./styles/globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Menu from "./components/menu";
import Image from "next/image";
import { gql } from "@apollo/client";
import { getClient } from "../../apolloClient";

const defaultFont = localFont({ src: "./assets/fonts/figtree/Figtree-VariableFont_wght.ttf", display: "swap" });
const monoFont = localFont({ src: "./assets/fonts/nbi-pro/nb_international_pro_mono-webfont.woff2", display: "swap" });

export const metadata: Metadata = {
  title: "Optimizely Brand Guidelines",
  description: "Brand Guidelines for Optimizely",
};

const query = gql`
  query GetMenuPages {
    DocPage(where: { Status: { eq: "Published" } }) {
      items {
        Name
        IsCommonDraft
        RelativePath
      }
    }
  }
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const client = getClient();
  const { data } = await client.query({ query });
  const menuItems = data.DocPage.items;

  return (
    <html lang="en">
      <body className="dark:bg-vulcan dark:text-white bg-ghost-white text-vulcan flex flex-col min-h-screen">
        <header>
          <Menu items={menuItems} className="absolute left-4 top-10 z-50" />
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="flex-none py-16 px-6 border-top bg-gradient-to-b from-vulcan to-vulcan-95">
          <Image className="md:mx-auto mb-[64px] max-w-[126px] md:max-w-[164px]" src="/assets/primany-nav--logo.svg" alt="Optimizely Logo" width="200" height="49" />
          <div className="md:flex justify-center items-center gap-10">
            <nav className="md:order-2" role="Footer Navigation">
              <ul className="flex flex-col md:flex-row md:justify-center gap-[8px] lg:gap-10">
                <li>
                  <a className="text-[12px] dark:text-mischka" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-[12px] dark:text-mischka" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-[12px] dark:text-mischka" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-[12px] dark:text-mischka" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-[12px] dark:text-mischka" href="#">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
            <span className="text-[12px] dark:text-mischka order mt-16 md:mt-0 block md:inline-block md:order-1">© 2023 Optimizely, Inc. All Rights Reserved.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
