import Image from "next/image";
import heroCurve from "/public/assets/hero-curve.svg";
import heroBg from "/public/assets/hero-rainbow-bg.jpg";

type HeroButtonProps = {
  ContentLink?: {
    Expanded?: {
      link?: {
        target?: string;
        title?: string;
        href?: string;
      };
      buttonText?: string;
    };
  };
};

type HeroProps = {
  pageTitle?: string;
  heroContent?: string;
  heroButton?: HeroButtonProps | null;
};

const Hero = (props: HeroProps) => {
  const { pageTitle, heroContent, heroButton } = props;

  return (
    <section className="pt-[60px] relative pb-[300px] xl:pb-[19.5vw] bg-top bg-cover overflow-hidden" style={{ backgroundImage: `url(${heroBg.src})` }}>
      <div className="container mx-auto text-center">
        <div className="rte-simple">
          <Image className="mx-auto" src="/assets/primany-nav--logo.svg" alt="Optimizely Logo" width="200" height="49" />
          {pageTitle ? <h1 className="t-display-2 mb-[16px] mt-[24px]" dangerouslySetInnerHTML={{ __html: pageTitle }}></h1> : null}
          {heroContent ? <p className="t-subtitle" dangerouslySetInnerHTML={{ __html: heroContent }}></p> : null}
        </div>
        {heroButton ? (
          <div className="mt-[40px]">
            <a className="btn" target={heroButton?.ContentLink?.Expanded?.link?.target} title={heroButton?.ContentLink?.Expanded?.link?.title} href={heroButton?.ContentLink?.Expanded?.link?.href}>
              {heroButton?.ContentLink?.Expanded?.buttonText}
            </a>
          </div>
        ) : null}
      </div>
      <Image alt="" className="absolute mx-auto bottom-0 right-0 left-[50%] translate-x-[-50%] w-[max(2560px,100%)] min-w-[2560px]" src={heroCurve} />
    </section>
  );
};

export default Hero;
