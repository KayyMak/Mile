import Brand from '@/components/Brand';

export default function AuthShell({ eyebrow, title, description, children, footer }) {
  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-2">
      <div className="flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:px-12 lg:py-8">
        <header><Brand /></header>
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-olive">{eyebrow}</p>
          <h1 className="text-5xl font-light tracking-[-0.065em] text-ink sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">{description}</p>
          <div className="mt-10">{children}</div>
          <div className="mt-9 text-sm text-muted">{footer}</div>
        </main>
        <p className="text-xs text-muted">A little clarity for the road ahead.</p>
      </div>
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#dce3d4] p-12 lg:flex lg:flex-col lg:justify-between" aria-hidden="true">
        <div className="absolute -right-64 -top-64 size-[48rem] rounded-full border border-white/50" />
        <div className="absolute -bottom-60 -left-48 size-[42rem] rounded-full border border-white/60" />
        <div className="absolute left-1/2 top-[-15%] h-[130%] w-28 -rotate-[28deg] rounded-full border border-dashed border-white/70" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-ink">Mile / Travel well, remember easily</p>
        <div className="relative max-w-lg">
          <span className="mb-8 block h-px w-14 bg-olive" />
          <p className="text-[clamp(3.5rem,5vw,6rem)] font-light leading-[1.05] tracking-[-0.075em] text-ink">Your miles have<br />a place here.</p>
          <p className="mt-8 text-sm text-muted">A quieter way to keep track of every journey.</p>
        </div>
        <p className="relative text-xs uppercase tracking-[0.2em] text-olive">Made for the moments after the drive</p>
      </aside>
    </div>
  );
}
