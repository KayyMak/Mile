# Store the JWT in localStorage instead of an httpOnly cookie

The backend issues a Bearer JWT (`app/main.py`'s `create_access_token`/`get_current_user`) and expects it on an `Authorization: Bearer` header, not a cookie. An httpOnly cookie would require backend changes to set and read it, and would trade XSS-immunity for CSRF exposure (cookies auto-attach cross-origin; a Bearer token in `localStorage` does not). We chose `localStorage` + a React Context to match the backend's existing bearer-token contract, keep the auth mechanic transparent for learning purposes, and avoid CSRF entirely — accepting XSS-based token theft as the residual risk, which is acceptable here since the app renders no untrusted user-generated content.

## Consequences

- Every page that reads auth state must be a client component (`localStorage` isn't available during server render), so there's no server-side route protection — only client-side redirects after an `authLoading` check.
- CORS `allow_credentials` is effectively inert for this app (no cookie to protect), but scoping `allow_origins` to the frontend's origin is still the real access control.
- Reversing this later means changing both the backend (issue/read a cookie) and the frontend (auth Context, CORS credentials handling, and re-litigating CSRF protection).
