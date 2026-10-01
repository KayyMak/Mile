import { useState } from 'react';

const inputClass = 'mt-2 block h-14 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-olive focus:ring-2 focus:ring-olive/15';

function SaveTrip({ onSubmitTrip }) {
  const [startOdometer, setStartOdometer] = useState('');
  const [endOdometer, setEndOdometer] = useState('');
  const [purpose, setPurpose] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const start = Number(startOdometer);
  const end = Number(endOdometer);
  const distance = startOdometer !== '' && endOdometer !== '' && Number.isInteger(start) && Number.isInteger(end) && end >= start ? end - start : null;

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (startOdometer === '' || endOdometer === '') {
      setError('Enter both odometer readings.');
      return;
    }
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < 0) {
      setError('Use whole, nonnegative numbers for both readings.');
      return;
    }
    if (end < start) {
      setError('The end reading must be at least the start reading.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitTrip({ start_odometer: start, end_odometer: end, purpose: purpose.trim() });
      setStartOdometer('');
      setEndOdometer('');
      setPurpose('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-[0_12px_40px_rgba(32,40,32,0.035)] sm:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-olive">New trip</p>
          <h2 className="text-3xl font-light tracking-[-0.055em] text-ink">Where did you go?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">A quick note for your records.</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper text-xl font-light text-olive" aria-hidden="true">↗</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="start-odometer" className="text-sm font-medium text-ink">Start odometer</label>
          <div className="relative">
            <input id="start-odometer" type="number" inputMode="numeric" min="0" step="1" value={startOdometer} onChange={(event) => setStartOdometer(event.target.value)} className={`${inputClass} pr-11`} placeholder="0" />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">mi</span>
          </div>
        </div>
        <div>
          <label htmlFor="end-odometer" className="text-sm font-medium text-ink">End odometer</label>
          <div className="relative">
            <input id="end-odometer" type="number" inputMode="numeric" min="0" step="1" value={endOdometer} onChange={(event) => setEndOdometer(event.target.value)} className={`${inputClass} pr-11`} placeholder="0" />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">mi</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="purpose" className="text-sm font-medium text-ink">Purpose <span className="font-normal text-muted">(optional)</span></label>
        <input id="purpose" type="text" value={purpose} onChange={(event) => setPurpose(event.target.value)} className={inputClass} placeholder="A meeting, an errand, a visit…" />
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-line pt-6 text-sm">
        <span className="text-muted">Trip distance</span>
        <span className="font-mono text-base font-medium tabular-nums text-ink">{distance === null ? '—' : distance.toLocaleString()} <span className="font-sans text-xs font-normal text-muted">mi</span></span>
      </div>

      {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <button type="submit" disabled={submitting} className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-ink px-6 text-sm font-medium text-surface transition-colors hover:bg-olive focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive disabled:cursor-wait disabled:opacity-60">
        {submitting ? 'Saving trip…' : 'Save trip'} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export { SaveTrip };
