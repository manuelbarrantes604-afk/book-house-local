/* ===== Site settings — edit here, nothing else needs to change ===== */
window.SITE_CONFIG = {
  brand: "Barrantes Stays",                 // rename the whole site here
  brand_short: "Barrantes",
  tagline_en: "Two homes in Northwest Arkansas. Book direct.",
  tagline_es: "Dos casas en el noroeste de Arkansas. Reserva directo.",
  host_name: "Manuel",
  // Booking backend (Cloudflare Worker / Vercel / box fallback). Empty = demo mode: the full flow works,
  // but the last step shows "Payment setup pending" and nothing is charged.
  api_base: "",
  max_nights: 27,                            // longer stays: ask the host (Airbnb won't quote 28+ online)
  tax_rate: 0,                               // e.g. 0.115 once Manuel confirms lodging tax; 0 = not collected yet
  cancellation_en: "Free cancellation for 24 hours after booking. After that, the reservation is non-refundable.",
  cancellation_es: "Cancelación gratis durante 24 horas después de reservar. Después, la reserva no es reembolsable.",
  contact_email: "",                         // optional; shown in the footer when set
  homes_order: ["bentonville", "springdale"],
  pois: [
    { id: "cb",  name: "Crystal Bridges Museum", name_es: "Museo Crystal Bridges", lat: 36.38261, lng: -94.20406, kind: "art" },
    { id: "sq",  name: "Bentonville Square", name_es: "Plaza de Bentonville", lat: 36.37265, lng: -94.20845, kind: "town" },
    { id: "wm",  name: "Walmart Home Office", name_es: "Oficinas centrales de Walmart", lat: 36.36413, lng: -94.19113, kind: "work" },
    { id: "ds",  name: "Downtown Springdale (Shiloh Square)", name_es: "Centro de Springdale (Shiloh Square)", lat: 36.18584, lng: -94.13054, kind: "town" },
    { id: "gw",  name: "Razorback Greenway", name_es: "Razorback Greenway", lat: 36.21430, lng: -94.15962, kind: "trail", note: "Trail shown in green on the map" }
  ]
};
