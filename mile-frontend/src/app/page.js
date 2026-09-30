import Link from 'next/link';
import Brand from '@/components/Brand';

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Brand />
        <Link href="/login" className="text-sm font-medium text-ink underline decoration-line underline-offset-8 transition-colors hover:text-olive">
          Log in
        </Link>
      </header>

      <main className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20 lg:px-12 lg:pb-24 lg:pt-24">
        <div className="max-w-2xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-olive">The simpler way to keep moving</p>
          <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-light leading-[0.98] tracking-[-0.075em] text-ink">
            Every trip,<br /><span className="text-olive">in its place.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
            Record your mileage in moments. Find the details whenever you need them.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href="/register" className="inline-flex min-h-13 items-center justify-center rounded-full bg-ink px-7 text-sm font-medium text-surface transition-colors hover:bg-olive focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive">
              Get started <span className="ml-5" aria-hidden="true">↗</span>
            </Link>
            <Link href="/login" className="text-sm font-medium text-ink underline decoration-line underline-offset-8 hover:text-olive">
              I have an account
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#dce3d4] p-5 sm:min-h-[520px] sm:p-10 lg:min-h-[600px]" aria-hidden="true">
          <div className="absolute -right-24 -top-24 size-80 rounded-full border border-white/55 sm:size-[30rem]" />
          <div className="absolute -bottom-44 -left-28 size-[26rem] rounded-full border border-white/60 sm:size-[38rem]" />
          <div className="absolute left-[46%] top-[-10%] h-[130%] w-24 -rotate-[29deg] rounded-full border border-dashed border-white/80 sm:w-32" />
          <div className="relative z-10 flex h-full min-h-[380px] flex-col justify-between rounded-[1.5rem] border border-white/55 bg-white/55 p-7 shadow-[0_20px_70px_rgba(32,40,32,0.08)] backdrop-blur-sm sm:min-h-[440px] sm:p-9 lg:min-h-[520px]">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              <span>Your journey</span><span>Mile</span>
            </div>
            <div>
              <span className="mb-5 block h-px w-12 bg-olive" />
              <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight tracking-[-0.065em] text-ink">A little less<br />to remember.</p>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">A clear record for the miles that matter.</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-ink"><span className="size-2 rounded-full bg-olive" /> Ready when you are</div>
          </div>
        </div>
      </main>
    </div>
  );
}
