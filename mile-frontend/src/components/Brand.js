import Link from 'next/link';

export default function Brand() {
  return (
    <Link href="/" className="inline-flex items-center text-[1.75rem] font-semibold leading-none tracking-[-0.07em] text-ink transition-colors hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive" aria-label="Mile home">
      mile
    </Link>
  );
}
