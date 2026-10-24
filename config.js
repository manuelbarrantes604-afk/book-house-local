/* ===== Site settings — edit here, nothing else needs to change ===== */
window.SITE_CONFIG = {
  brand: "Book House Local",                 // rename the whole site here (logo, titles, footer, emails)
  brand_mark: "B",                           // letter in the round logo
  tagline_en: "Northwest Arkansas",
  tagline_es: "Noroeste de Arkansas",
  host_name: "Manuel",
  // Booking backend (Cloudflare Worker / box fallback). Empty = demo mode: the full flow works,
  // but the last step shows "Payment setup pending" and nothing is charged.
  api_base: "",
  max_nights: 27,                            // longer stays: ask the host (Airbnb won't quote 28+ online)
  // Arkansas lodging taxes come from data/rates.json → taxes (source: tools/taxes.json). Nothing to set here.
  // Firm cancellation policy. The refund math lives in backend/quote.js (refundFor); keep the numbers in sync.
  cancellation: { full_days: 30, half_days: 7, half_pct: 50, grace_hours: 48, grace_min_days: 14, checkin_hour: 16 },
  contact_email: "",                         // optional; shown in the footer when set
  homes_order: ["bentonville", "springdale"],
  // Location filter on the homepage. Each home's "city" (data/homes.json) decides where it shows up.
  locations: [
    { id: "bentonville", name: "Bentonville" },
    { id: "springdale",  name: "Springdale" }
  ],
  pois: [
    { id: "cb",  name: "Crystal Bridges Museum", name_es: "Museo Crystal Bridges", lat: 36.38261, lng: -94.20406, kind: "art" },
    { id: "sq",  name: "Bentonville Square", name_es: "Plaza de Bentonville", lat: 36.37265, lng: -94.20845, kind: "town" },
    { id: "wm",  name: "Walmart Home Office", name_es: "Oficinas centrales de Walmart", lat: 36.36413, lng: -94.19113, kind: "work" },
    { id: "ds",  name: "Downtown Springdale (Shiloh Square)", name_es: "Centro de Springdale (Shiloh Square)", lat: 36.18584, lng: -94.13054, kind: "town" },
    { id: "gw",  name: "Razorback Greenway", name_es: "Razorback Greenway", lat: 36.21430, lng: -94.15962, kind: "trail", note: "Trail shown in green on the map" }
  ]
};
