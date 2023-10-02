import { gql } from "@apollo/client";
import { getClient } from "@/../apolloClient";
// Replace these imports with a wildcard block importer to allow page building from CMS.
import Hero from "./components/hero-home";
import Card from "./components/card";
import { ContainerCard, ClickableCard } from "@/generated/sdk";

// Queries inline for simplicity sake. You may want to move these out to external files.
const query = gql`
  query {
    Home {
      items {
        Name
        cards: MainContent {
          ContentLink {
            Expanded {
              ... on ContainerCard {
                Title
                Color
                Image {
                  ContentLink {
                    Expanded {
                      Url
                    }
                  }
                }
                ImageFull
                ImageLocation
                MainContent
                ContentType
                ContentLink {
                  Id
                }
              }
              ... on ClickableCard {
                Title
                Color
                Image {
                  ContentLink {
                    Expanded {
                      Url
                    }
                  }
                }
                ImageFull
                ImageLocation
                MainContent
                ContentType
                ContentLink {
                  Id
                }
                Link {
                  Target
                  Title
                  Text
                  ContentLink {
                    Expanded {
                      RelativePath
                    }
                  }
                }
              }
            }
          }
        }
        pageTitle: H1
        heroContent: Hero
        heroButton: HeroButton {
          ContentLink {
            Expanded {
              ... on Button {
                _deleted
                _modified
                link: Link {
                  href: Href
                  target: Target
                  text: Text
                  title: Title
                }
                buttonText: ButtonText
              }
            }
          }
        }
      }
    }
  }
`;

export default async function Home() {
  const client = getClient();
  const data = (await client.query({ query })).data.Home.items[0];
  const cardItems = data?.cards;

  return (
    <div>
      <Hero pageTitle={data.pageTitle} heroContent={data.heroContent} heroButton={data.heroButton} />
      {cardItems ? (
        <div className="pb-[128px] px-[16px]">
          <section className="container mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-[24px]">
            {cardItems.map((card: ContainerCard | ClickableCard, index: Number) => {
              return <Card key={card?.ContentLink?.Expanded?.ContentLink?.Id} {...card?.ContentLink?.Expanded} className={index == 0 ? "lg:row-span-2" : ""} />;
            })}
          </section>
        </div>
      ) : null}
    </div>
  );
}
