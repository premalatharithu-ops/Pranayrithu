# SpideyDelivery.in — COD Production Build

This build is designed for a real Cash-on-Delivery storefront.

## Real order flow
1. Customer adds snacks to cart.
2. Checkout sends only product IDs and quantities to the server.
3. The server re-prices the cart from the trusted catalogue.
4. The server creates a persistent order in Supabase.
5. Customer receives a private order-tracking token.
6. Admin can see the order, update delivery status, and mark cash as received.

## Required Vercel environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Supabase
Run `supabase_schema.sql` in the Supabase SQL editor.

## Important
The app is COD-only. There are no UPI, card, Razorpay, or online-payment endpoints in this build.

For a real launch, the operator should also configure the delivery area, business contact/support details, inventory process, legal/tax requirements, privacy policy, terms, and a proper domain/email.


## Staff portal
Staff can sign in at `/staff`, view real Supabase orders, search customers/orders, update delivery status, and mark COD cash as received.


## Staff login
Default staff password: `SpideyStaff2026!` (Vercel `ADMIN_PASSWORD` overrides this if configured).
