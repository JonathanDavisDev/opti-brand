import "./styles/globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Menu from "./components/menu";
import Image from "next/image";
import { gql } from "@apollo/client";
import { getClient } from "../../apolloClient";
import Link from "next/link";
import { Footer } from "@/generated/sdk";

const defaultFont = localFont({ src: "./assets/fonts/figtree/Figtree-VariableFont_wght.ttf", display: "swap" });
const monoFont = localFont({ src: "./assets/fonts/nbi-pro/nb_international_pro_mono-webfont.woff2", display: "swap" });

export const metadata: Metadata = {
  title: "Optimizely Brand Guidelines",
  description: "Brand Guidelines for Optimizely",
};

const menuQuery = gql`
  query NavigationItems {
    Home {
      items {
        NavigationItems {
          ContentLink {
            Expanded {
              ... on NavigationItem {
                Name
                NavigationLink {
                  ContentLink {
                    Expanded {
                      RelativePath
                      Name
                    }
                  }
                }
                Icon {
                  ContentLink {
                    Expanded {
                      ContentLink {
                        Id
                        WorkId
                        GuidValue
                        ProviderName
                        Url
                      }
                    }
                  }
                }
                RelativePath
                RouteSegment
                Url
              }
            }
          }
        }
      }
    }
  }
`;

const footerQuery = gql`
  query Footer {
    Home {
      items {
        footer: Footer {
          ContentLink {
            Expanded {
              ... on Footer {
                _deleted
                _modified
                Copyright
                links: Links {
                  Text
                  Href
                  Target
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const client = getClient();
  const { data: menuData } = await client.query({ query: menuQuery });

  const menuItems = menuData?.Home?.items[0].NavigationItems;
  const { data: footerData } = await client.query({ query: footerQuery });
  // Gets the copyright text for the footer.
  const footerCopyright = footerData?.Home?.items[0]?.footer?.ContentLink?.Expanded?.Copyright;
  // Link list for the footer.
  const footerItems: Footer["Links"] = footerData?.Home?.items[0]?.footer?.ContentLink?.Expanded?.links;

  return (
    <html lang="en">
      <body className="dark:bg-vulcan dark:text-white bg-ghost-white text-vulcan flex flex-col min-h-screen">
        <header>
          <Menu cmsUrl={`${process.env.CMS_URL}`} items={menuItems} className="absolute left-4 top-10 z-50" />
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="flex-none py-16 px-6 border-top bg-gradient-to-b from-vulcan to-vulcan-95">
          <Link href="/">
            <Image className="md:mx-auto mb-[64px] max-w-[126px] md:max-w-[164px]" src="/assets/primany-nav--logo.svg" alt="Optimizely Logo" width="200" height="49" />
          </Link>
          {footerItems ? (
            <div className="md:flex justify-center items-center gap-10">
              <nav className="md:order-2" role="Footer Navigation">
                <ul className="flex flex-col md:flex-row md:justify-center gap-[8px] lg:gap-10">
                  {footerItems.map((link, index) => {
                    if (link && link.Href) {
                      return (
                        <li key={`FooterLink-${index}`}>
                          <a className="text-[12px] dark:text-mischka" href={link.Href} target={link.Target ?? ""}>
                            {link.Text}
                          </a>
                        </li>
                      );
                    }
                  })}
                </ul>
              </nav>
              <span className="text-[12px] dark:text-mischka order mt-16 md:mt-0 block md:inline-block md:order-1">{footerCopyright}</span>
            </div>
          ) : null}
        </footer>
      </body>
    </html>
  );
}
