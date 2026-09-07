'use client';

import { useState, useEffect } from 'react';
import { getTrips } from '@/lib/api';
import { useRouter } from 'next/navigation';

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
            } catch(err) {
                if (err.status === 401) {
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

    return (
        <div>
            {loading && <p>Loading trips...</p>}
            {!error && !loading && (
                trips.length === 0
                    ? <p>No trips yet</p>
                    : (
                        <ul>
                            {trips.map(trip => (
                                <li key={trip.id}>{trip.start_odometer} → {trip.end_odometer}: {trip.purpose}</li>
                            ))}
                        </ul>
                    )
            )}
            {error && <p>{error}</p>}
        </div>
    );
}