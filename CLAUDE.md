# Bharat Darshanam Travels: website

Website of Bharat Darshanam Travels (bharatdarshanamtravels.com). Tagline: "Journeys to India's Soul". Owner: Gajendra Singh, founder (people usually call him Yuvraj; use "Gajendra Singh" on the website and in legal pages). Team: Rupesh (Marketing), Rupesh P (Sales), Ayush.

## Business context

- Main focus now: Rajasthan trips, shown by a local (founder is from Sikar, a trained tourist guide). Mountain trips (Uttarakhand, Himachal, Ladakh, J&K) are being added, led by a BMC-certified team.
- Audience: 18–40, from metro, tier-1 and tier-2 cities. Mostly on mobile.
- Trip types: fixed-departure group trips and private custom trips.
- Price guide: Rajasthan 7–8 days ₹20,000–22,000 per person; Jaipur weekend (Delhi to Delhi) ₹6,000. Never invent prices, dates or inclusions; leave a clear TODO instead.
- Not GST registered yet: show no GST on prices.

## Brand

- Look: minimal, clean, white, energetic, with one strong accent colour (to be fixed in the Design System).
- Tone: friendly, humble, honest. English on the website.
- All site text is in English: no Hindi or Hinglish, except the proper nouns and greetings allowed in the Company Brief's LANGUAGE RULE.
- No Hindi anywhere on the website or in mockups: no Hindi text, taglines, metadata or Devanagari fonts.
- Chosen design (26 Nov 2026): mockup option C "Peacock". Teal #0F7470 (dark #08393A) as the accent, warm #F2A23A for highlights, background #FBF8F3, font Anek Latin, corner radius 16px.
- Follow the Bharat Darshanam Design System for colours, fonts and components once it exists.
- Use real trip photos for destinations and trips. AI images only for backgrounds or illustrations, never as "real" trip moments.

## Priorities

1. Fast and clean on mobile.
2. Every trip page: price-from, day-wise itinerary, inclusions/exclusions, a WhatsApp enquiry button and an enquiry form that goes to info@.
3. Reviews section with real reviews only.
4. Booking flow: trip page → booking form (name, phone, email, trip, departure date, pax) → payment gateway (30% advance or full payment) → every paid booking saved with its details and emailed to bookings@.
   - Agreed payment options (decided 26 Nov 2026):
     - Full payment online via Razorpay (credit/debit card, UPI, netbanking). Booking confirmed at once.
     - Or 30% advance online via Razorpay (confirmed at once), balance via direct UPI to the business account before departure. The customer submits the UTR/transaction ID and a screenshot on the website; the team verifies it in the bank app before marking the balance paid. Never confirm from a screenshot alone.
     - For a customer who wants to pay the balance by card, the team can send a Razorpay payment link.
   - No customer login at first: booking ID + phone. Team needs an admin view (bookings, balance pending/paid, seats left).
   - Show "X seats left" per departure date.
   - Planned stack: Cloudflare Pages (free plan allows business use; Vercel's free plan does not), Supabase, Razorpay, Resend. Keys only in environment variables.
5. Pages the payment gateway needs: Privacy Policy, Terms, Cancellation & Refund Policy, Contact.
6. Basic SEO: titles, descriptions, Open Graph images, sitemap.

## Cancellation policy (use on the Cancellation & Refund page)

- 30+ days before departure: refund of the amount paid minus 10% of the trip cost
- 15–29 days: 50% of the trip cost refunded
- 7–14 days: 25% refunded
- Under 7 days or no-show: no refund
- Free option: transfer the booking to a friend or move to a later departure (subject to availability)
- Trips changed or cut short by weather, landslides, roadblocks or government orders: no refund for unused services; any vendor refund is passed on

## How to work

- Work from the change list I give. Don't redesign pages I didn't ask about.
- Before a big change, show a short plan in bullets and wait for my yes. If something is unclear or you disagree, ask.
- Small, focused commits. Explain each change in one line.
- Versions: every push that changes the live website gets the next version number (v1, v2, v3...). Add an annotated git tag on the pushed commit, push the tag, and add a row to VERSIONS.md (number, date, what changed in easy words, commit). Changes to CLAUDE.md or VERSIONS.md alone do not get a number. When asked to go back to a version, restore that tag's files in a new commit (never delete history or force-push), show the preview, and give it the next number.
- Never commit secrets (API keys, payment gateway keys). Use environment variables.
- Suggest a better library, tool or repo if one would clearly do the job better.
- Keep sessions focused to save usage: one change list per session.
- Reply in bullet points; Hinglish is fine.
