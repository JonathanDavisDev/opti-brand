import { ClickableCard } from "@/generated/sdk";

const Card = (props: ClickableCard & { children?: React.ReactNode; className?: string }) => {
  const { Color = "", Title = "Card", Image, MainContent, className, children, Link = null, ImageLocation, ImageFull = false } = props;

  const Tag = Link ? "a" : "div";

  return (
    <Tag
      href={Link?.ContentLink?.Expanded?.RelativePath ? Link?.ContentLink?.Expanded?.RelativePath : ""}
      className={`border-${Color} border-[1px] rounded border-opacity-40 flex overflow-hidden ${
        ImageLocation == "top" ? `flex-col ${Image && ImageFull ? "p-[32px]" : ""} gap-[32px]` : `flex-row gap-10 ${Image && ImageFull ? "p-10" : ""}`
      } ${className} ${Tag === "a" ? "gradient-hover" : ""}`}
    >
      {Image?.ContentLink && Image?.ContentLink?.Expanded?.Url ? (
        <img
          alt=""
          className={`${ImageLocation == "top" ? "w-full object-cover" : `${ImageFull ? "self-center" : "max-w-[160px]"}`}`}
          src={`${process.env.CMS_URL}/${Image.ContentLink.Expanded.Url}`}
        />
      ) : null}
      <div className={`${Image && ImageFull ? "" : "p-10"}`}>
        <div className="rte mb-[40px] card-content">
          <h2 className="t-heading-4">{Title}</h2>
          {MainContent ? <div className="text-bright-gray font-light" dangerouslySetInnerHTML={{ __html: MainContent }}></div> : null}
        </div>
      </div>
    </Tag>
  );
};

export default Card;
