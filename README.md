# Book House Local: Northwest Arkansas

Direct-booking site for two homes in Northwest Arkansas: one in Bentonville and one in Springdale. Each home has its own listing page.
Static site; prices and availability refresh automatically from the homes' Airbnb listings.

* Prices: the same nightly prices and fees as Airbnb, plus Arkansas lodging taxes on nights, extra-guest fee and cleaning
  (Bentonville 13.50%, Springdale 13.75%; rates in `data/rates.json` → `taxes`).
* Cancellation: Firm. Full refund at least 30 days before check-in, 50% at 7–30 days, none within 7 days, and a full refund within 48 h of booking if check-in is at least 14 days away.
* Brand, taglines, locations and policy settings: `config.js`.
