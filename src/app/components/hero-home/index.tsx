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
    <section className="pt-[60px] relative pb-[300px] xl:pb-[25.5vw] bg-top bg-cover overflow-hidden">
      <div className="z-10 bg-gradient-to-b from-vulcan from-30% to-transparent h-[60%] w-full absolute top-0 left-0"></div>
      <div className="container mx-auto text-center relative z-20">
        <div className="rte-simple">
          <Image className="mx-auto" src="/assets/primany-nav--logo.svg" alt="Optimizely Logo" width="200" height="49" />

          {pageTitle ? <h1 className="t-display-2 mb-[16px] mt-[24px]" dangerouslySetInnerHTML={{ __html: pageTitle }}></h1> : null}
        </div>
        {heroButton ? (
          <div className="mt-[40px]">
            <a className="btn" target={heroButton?.ContentLink?.Expanded?.link?.target} title={heroButton?.ContentLink?.Expanded?.link?.title} href={heroButton?.ContentLink?.Expanded?.link?.href}>
              {heroButton?.ContentLink?.Expanded?.buttonText}
            </a>
          </div>
        ) : null}
      </div>
      <video className="absolute top-0 left-0 w-full h-full object-cover" muted autoPlay loop>
        <source src="/assets/hero-video.mp4" type="video/mp4" />
        <Image src={heroBg.src} width="1400" height="592" alt="" />
      </video>
      <Image alt="" className="absolute mx-auto bottom-0 right-0 left-[50%] translate-x-[-50%] w-[max(2560px,100%)] min-w-[2560px]" src={heroCurve} />
    </section>
  );
};

export default Hero;
