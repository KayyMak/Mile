'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTrip, getTrips } from '@/lib/api';
import { SaveTrip } from '@/components/TripForm';
import Brand from '@/components/Brand';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadTrips() {
      try {
        const data = await getTrips();
        setTrips(data);
      } catch (err) {
        if (err.status === 401 || err.status === 403) {
          router.push('/login');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadTrips();
  }, [router]);

  async function onSubmitTrip(trip) {
    const newTrip = await createTrip(trip);
    setTrips((previousTrips) => [...previousTrips, newTrip]);
  }

  function handleLogout() {
    localStorage.removeItem('accessToken');
    router.push('/login');
  }

  const totalDistance = trips.reduce((sum, trip) => sum + trip.end_odometer - trip.start_odometer, 0);
  const recentTrips = [...trips].sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line/80 bg-surface/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Brand />
          <button type="button" onClick={handleLogout} className="rounded-full border border-line px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-olive hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive">
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
        <div className="mb-9 sm:mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-olive">Your mileage journal</p>
          <h1 className="text-5xl font-light tracking-[-0.07em] text-ink sm:text-6xl lg:text-7xl">Your trips,<br className="sm:hidden" /> all together.</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">Add a trip now. The details will be here when you need them.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12">
          <section aria-label="Log a trip"><SaveTrip onSubmitTrip={onSubmitTrip} /></section>

          <div className="space-y-8">
            <section aria-label="Mileage summary" className="overflow-hidden rounded-[1.75rem] bg-[#dce3d4] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">All-time distance</p>
                <span className="size-2 rounded-full bg-olive" aria-hidden="true" />
              </div>
              <p className="mt-8 font-mono text-5xl font-light tracking-[-0.08em] tabular-nums text-ink sm:text-6xl">
                {loading || error ? '—' : totalDistance.toLocaleString()}<span className="ml-2 font-sans text-base font-normal tracking-normal text-muted">mi</span>
              </p>
              <p className="mt-5 text-sm text-muted">{loading ? 'Loading your mileage…' : error ? 'Mileage unavailable right now' : `Across ${trips.length} ${trips.length === 1 ? 'trip' : 'trips'} recorded`}</p>
            </section>

            <section aria-labelledby="history-title" className="rounded-[1.75rem] border border-line bg-surface p-5 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-olive">Your record</p>
                  <h2 id="history-title" className="text-3xl font-light tracking-[-0.055em] text-ink">Trip history</h2>
                </div>
                {!loading && !error && <span className="text-xs text-muted">{trips.length} total</span>}
              </div>

              {loading && <p role="status" className="py-10 text-sm text-muted">Loading trips…</p>}
              {error && <p role="alert" className="py-10 text-sm text-red-800">Couldn’t load trips: {error}</p>}
              {!loading && !error && trips.length === 0 && (
                <div className="py-12 text-center">
                  <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-paper text-2xl text-olive" aria-hidden="true">↗</span>
                  <p className="text-lg font-medium text-ink">A fresh start.</p>
                  <p className="mt-2 text-sm text-muted">Your first trip will appear here after you save it.</p>
                </div>
              )}
              {!loading && !error && trips.length > 0 && (
                <ul className="divide-y divide-line">
                  {recentTrips.map((trip) => (
                    <li key={trip.id} className="flex items-center justify-between gap-4 py-5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{trip.purpose || 'Untitled trip'}</p>
                        <p className="mt-1 text-xs text-muted">{trip.start_odometer.toLocaleString()} → {trip.end_odometer.toLocaleString()} mi</p>
                      </div>
                      <p className="shrink-0 font-mono text-lg tracking-[-0.05em] tabular-nums text-ink">+{(trip.end_odometer - trip.start_odometer).toLocaleString()} <span className="font-sans text-xs font-normal tracking-normal text-muted">mi</span></p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
