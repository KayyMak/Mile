import Link from 'next/link';

export default function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-semibold tracking-[-0.06em] text-ink" aria-label="Mile home">
      <span className="flex size-8 items-center justify-center rounded-full bg-ink text-surface" aria-hidden="true">
        <span className="mb-1 text-[24px] font-light leading-none">m</span>
      </span>
      mile<span className="-ml-2 text-olive">.</span>
    </Link>
  );
}
