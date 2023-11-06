import { gql } from "@apollo/client";
import { notFound } from "next/navigation";
import { getClient } from "../../../apolloClient";

const query = gql`
  query DocPageQuery($relative: String!) {
    DocPage(where: { RelativePath: { eq: $relative } }) {
      items {
        Name
        MainContent
        SEO {
          PageTitle
          PageDescription
          SocialImage {
            ContentLink {
              Expanded {
                Url
              }
            }
          }
        }
      }
    }
  }
`;

export default async function DocsPage({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query({ query, variables: { relative: `/en/${params.slug[1]}` } });
  const docPageData = data.DocPage.items[0];

  if (docPageData === undefined) {
    notFound();
  }

  const regex = new RegExp(`src="/`, "g");
  const pageContent = { __html: docPageData?.MainContent.replace(regex, `src="${process.env.CMS_URL}/`) };

  return (
    <div>
      <h1 className="t-overline text-independence dark:text-optimizely-blue-20-tint mb-6">{docPageData?.Name}</h1>
      <div className="rte" dangerouslySetInnerHTML={pageContent}></div>
    </div>
  );
}
