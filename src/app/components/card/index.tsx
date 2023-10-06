"use client";

import { ClickableCard } from "@/generated/sdk";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";

import guide from "./assets/guide.json";
import colors from "./assets/color.json";
import typography from "./assets/type.json";

const Card = (props: ClickableCard & { children?: React.ReactNode; className?: string }) => {
  const { Color = "", Title = "Card", Image, MainContent, className, children, Link = null, ImageLocation, ImageFull = false } = props;
  const Tag = Link ? "a" : "div";
  const [loaded, setLoaded] = useState(false);
  const lottieAsset = useRef(null) as any;
  let cardAsset = Image?.ContentLink && Image?.ContentLink?.Expanded?.Url;

  useEffect(() => {
    switch (Title) {
      case "Colors":
        lottieAsset.current = colors;

        break;

      case "Guide":
        lottieAsset.current = guide;
        break;

      case "Typography":
        lottieAsset.current = typography;
        break;
    }
    setLoaded(true);
  }, [Title]);

  return (
    <Tag
      href={Link?.ContentLink?.Expanded?.RelativePath ? Link?.ContentLink?.Expanded?.RelativePath : ""}
      className={`border-${Color} border-[1px] rounded border-opacity-40 flex overflow-hidden ${
        ImageLocation == "top" ? `flex-col ${Image && ImageFull ? "p-[32px]" : ""} gap-[32px]` : `flex-row gap-10 ${Image && ImageFull ? "p-10" : ""}`
      } ${className} ${Tag === "a" ? "gradient-hover" : ""}`}
    >
      {lottieAsset.current && loaded ? (
        // eslint-disable-next-line
        <Lottie className="max-h-96" key={Title} animationData={lottieAsset.current} autoPlay={true} loop={true} />
      ) : null}
      {Image?.ContentLink && Image?.ContentLink?.Expanded?.Url && !lottieAsset.current ? (
        <img
          alt=""
          className={`${ImageLocation == "top" ? "w-full object-cover" : `${ImageFull ? "self-center" : ""}`}`}
          src={`${process.env.NEXT_PUBLIC_CMS_URL}/${Image.ContentLink.Expanded.Url}`}
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
