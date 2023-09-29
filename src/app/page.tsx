import { gql } from "@apollo/client";
import { getClient } from "../../apolloClient";
// Replace these imports with a wildcard block importer to allow page building from CMS.
import Hero from "./components/hero-home";
import Card from "./components/card";

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
                title: Title
                borderColor: Color
                image: Image {
                  ContentLink {
                    Expanded {
                      src: Url
                    }
                  }
                }
                imageLocation: ImageLocation
                description: MainContent
                ContentType
                ContentLink {
                  id: Id
                }
              }
              ... on ClickableCard {
                title: Title
                borderColor: Color
                image: Image {
                  ContentLink {
                    Expanded {
                      src: Url
                    }
                  }
                }
                imageLocation: ImageLocation
                description: MainContent
                ContentType
                ContentLink {
                  id: Id
                }
                link: Link {
                  Target
                  Title
                  Text
                  url: ContentLink {
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
  const cardItems = data.cards;

  return (
    <div>
      <Hero pageTitle={data.pageTitle} heroContent={data.heroContent} heroButton={data.heroButton} />
      <div className="pb-[128px] px-[16px]">
        <section className="container mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-[24px]">
          {cardItems.map((card, index) => {
            return <Card key={card.ContentLink.Expanded.ContentLink.id} {...card.ContentLink.Expanded} className={index == 0 ? "lg:row-span-2" : ""} />;
          })}
        </section>
      </div>
    </div>
  );
}
