const Card = (props) => {
  const { borderColor = "", title = "Card", image = { src: null, alt: "", fullWidth: false }, description, links, className, children, link = null, imageLocation } = props;

  const Tag = link ? "a" : "div";

  return (
    <Tag
      href={link?.url?.Expanded.RelativePath}
      className={`border-${borderColor} border-[1px] rounded border-opacity-40 flex overflow-hidden ${
        imageLocation == "top" ? `flex-col ${image && image.fullWidth ? "" : "p-[32px]"} gap-[32px]` : `flex-row gap-10 ${image && image.fullWidth ? "" : "p-10"}`
      } ${className} ${Tag === "a" ? "gradient-hover" : ""}`}
    >
      {image.ContentLink && image.ContentLink.Expanded.src ? (
        <img
          alt=""
          className={`${imageLocation == "top" ? "w-full object-cover" : `${image.fullWidth ? "max-w-[160px]" : "self-center"}`}`}
          src={`${process.env.CMS_URL}/${image.ContentLink.Expanded.src}`}
        />
      ) : null}
      <div className={`${image && image.fullWidth ? "p-10 pl-0" : ""}`}>
        <div className="rte mb-[40px]">
          <h2 className="t-heading-4">{title}</h2>
          <div className="text-bright-gray font-light" dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    </Tag>
  );
};

export default Card;
