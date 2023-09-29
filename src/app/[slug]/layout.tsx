import Image from "next/image";
import Link from "next/link";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-10">
      <div className="text-center">
        <Link className="inline-block mx-auto mb-[64px]" href={"/"}>
          <Image className="md:mx-auto max-w-[126px] md:max-w-[164px]" src="/assets/primany-nav--logo.svg" alt="Optimizely Logo" width="200" height="49" />
        </Link>
      </div>
      <div className="container mx-auto pt-24 pb-40">
        <div className="grid grid-cols-12">
          <div className="rte col-span-12 lg:col-start-3 lg:col-end-11">{children}</div>
        </div>
      </div>
    </div>
  );
}
