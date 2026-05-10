import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const steps = [
  ["1", "Upload PDF", "Add your book file"],
  ["2", "AI Processing", "We analyze the content"],
  ["3", "Voice Chat", "Discuss with AI"],
];

const HeroSection = () => {
  return (
    <main className="wrapper mb-10 md:mb-16">
      <section className="mx-auto w-full max-w-[1200px] px-5 xl:px-0">
        <div className="grid min-h-[336px] grid-cols-1 items-center gap-8 rounded-[12px] bg-[#f3e4c7] px-10 py-[54px] md:grid-cols-[minmax(330px,1fr)_minmax(300px,380px)] lg:grid-cols-[360px_378px_260px] lg:gap-[61px] lg:py-[58px]">
          <div className="max-w-[390px]">
            <h1 className="font-serif text-[37px] font-bold leading-[1.1] text-black">
              Your Library
            </h1>
            <p className="mt-5 max-w-[390px] text-[16px] leading-[1.55] text-[#23314a]">
              Convert your books into interactive AI conversations.
              Listen, learn, and discuss your favorite reads.
            </p>
            <Link
              href="/books/new"
              className="mt-8 inline-flex h-16 items-center gap-4 rounded-[10px] bg-white px-[21px] font-serif text-[21px] font-bold text-[#0f1c33] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:bg-[var(--bg-tertiary)]"
            >
              <Plus className="size-5" strokeWidth={2} />
              Add new book
            </Link>
          </div>

          <div className="flex justify-center">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books, an open book, a globe, and a brass reading lamp"
              width={378}
              height={284}
              priority
              className="h-auto w-[378px] object-contain"
            />
          </div>

          <div className="w-full max-w-[260px] justify-self-center rounded-[9px] bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,28,51,0.08)] lg:justify-self-end">
            <div className="space-y-[22px]">
              {steps.map(([number, title, description]) => (
                <div key={number} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#cbd5e1] text-[18px] leading-none text-[#0f1c33]">
                    {number}
                  </span>
                  <span>
                    <span className="block text-[16px] font-bold leading-5 text-[#0f1c33]">
                      {title}
                    </span>
                    <span className="mt-1 block text-[14px] leading-[1.2] text-[#0f1c33]">
                      {description}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

         <div className="library-hero-grid">

         </div>
      </section>
    </main>
  );
};

export default HeroSection;
