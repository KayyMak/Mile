# Mile

Mile is a mileage tracker: users record trips (start/end odometer readings + purpose) tied to their account.

## Language

**User**:
A registered person, identified by email, who owns zero or more Trips. `app/db_models.py` names the table `Users`; `app/main.py`'s register endpoint inconsistently names its parameter `account` — `User` is the canonical term, prefer it in new code.
_Avoid_: Account, Customer, Client

**Trip**:
A single mileage-tracked journey, recorded as a start odometer reading, an end odometer reading, and a purpose. `end_odometer` must be greater than or equal to `start_odometer` — a trip cannot represent negative distance. This invariant is enforced client-side (`TripForm`) but not by the backend schema.
_Avoid_: Entry, Log, Ride

**Purpose**:
A free-text description of why a trip was taken (e.g. "client meeting"). Not constrained to a fixed category (Business/Medical/Charitable/Personal) — categorization for tax-deduction purposes is a deliberately deferred future enhancement, not yet enforced by backend or frontend.
_Avoid_: Category, Reason

**Access Token**:
The JWT issued at login (45-minute expiry), proving a user's identity. Stored client-side in `localStorage` (not a cookie, see [ADR-0001](./docs/adr/0001-jwt-in-localstorage-not-cookie.md)) and attached manually as an `Authorization: Bearer` header on every trip request.
_Avoid_: Cookie, Session
