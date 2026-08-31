import {
  BedDouble,
  Car,
  ChefHat,
  ConciergeBell,
  Gem,
  Handshake,
  KeyRound,
  Landmark,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Clock,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Contact & socials                                                  */
/* ------------------------------------------------------------------ */

export const WHATSAPP_PRIMARY = "256794930817";
export const WHATSAPP_SECONDARY = "256789253553";
export const WHATSAPP_KENYA = "254142695839";

export const waLink = (message: string, number: string = WHATSAPP_PRIMARY) =>
  `whatsapp://send?phone=${number}&text=${encodeURIComponent(message)}`;

export const PHONES = [
  { label: "+256 794 930 817", tag: "Uganda — Primary", number: WHATSAPP_PRIMARY },
  { label: "+256 789 253 553", tag: "Uganda — Reservations", number: WHATSAPP_SECONDARY },
  { label: "+254 142 695 839", tag: "Kenya — Nairobi Office", number: WHATSAPP_KENYA },
];

export const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com/omugaservices", handle: "@omugaservices" },
  { label: "Instagram", href: "https://instagram.com/omugaservices", handle: "@omugaservices" },
  { label: "X (Twitter)", href: "https://x.com/omugaservices", handle: "@omugaservices" },
  { label: "TikTok", href: "https://tiktok.com/@omugaservices", handle: "@omugaservices" },
];

export const NAV_LINKS = [
  { label: "Stays", href: "#stays" },
  { label: "Services", href: "#services" },
  { label: "Tours", href: "#tours" },
  { label: "Concierge", href: "#concierge" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const HERO = {
  image: "/images/residence-ivory.jpg",
  video: "/videos/hero-bg.mp4",
  eyebrow: "Hotels · Concierge · Property",
  titleLines: ["Luxury,", "Curated for", "East Africa"],
  subtitle:
    "Handpicked hotels and Airbnb stays, a concierge that answers at any hour, and a property desk that opens doors to verified villas, land and homes.",
  primaryCta: { label: "Explore Stays", href: "#stays" },
  secondaryCta: {
    label: "WhatsApp Concierge",
    href: waLink("Hello OMuga Services — I'd like to speak to your concierge."),
  },
};

export const MARQUEE_ITEMS = [
  "Safari Lodges",
  "Luxury Villas",
  "Private Chefs",
  "Airport Pickups",
  "Chauffeur Service",
  "Lakeside Cottages",
  "Trip Planning",
  "Verified Homes",
  "Land & Plots",
  "Boutique Hotels",
];

/* ------------------------------------------------------------------ */
/*  About / stats                                                      */
/* ------------------------------------------------------------------ */

export const STATS = [
  { value: 850, suffix: "+", label: "Curated Stays" },
  { value: 10, suffix: "k+", label: "Guests Hosted" },
  { value: 2, suffix: "k+", label: "Destinations" },
  { value: 24, suffix: "/7", label: "Concierge Line" },
];

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

export type Service = {
  icon: LucideIcon;
  index: string;
  title: string;
  description: string;
  items: string[];
  cta: string;
  message: string;
};

export const SERVICES: Service[] = [
  {
    icon: BedDouble,
    index: "01",
    title: "Hotel & Airbnb Booking",
    description:
      "From safari lodges at the edge of the savannah to lakeside cottages and city residences — every stay is inspected, verified and reserved on your behalf.",
    items: ["Safari Lodges", "Luxury Cottages", "City Apartments", "Boutique Hotels"],
    cta: "Reserve a stay",
    message: "Hello OMuga — I'd like to book a hotel / Airbnb stay.",
  },
  {
    icon: ConciergeBell,
    index: "02",
    title: "Lifestyle & Concierge",
    description:
      "A single message arranges everything: a chauffeur at arrivals, a private chef at your villa, an itinerary built around you. Consider it done.",
    items: ["Airport Pickups", "Private Chefs", "Chauffeur Service", "Trip Planning"],
    cta: "Request concierge",
    message: "Hello OMuga — I need your lifestyle & concierge team.",
  },
  {
    icon: Gem,
    index: "03",
    title: "Luxury Property Brokerage",
    description:
      "We match sellers with serious buyers and guide buyers to authenticated homes — luxury villas, prime land and properties worth your signature.",
    items: ["Luxury Villas", "Land & Plots", "Verified Listings", "Buyer Matching"],
    cta: "Speak to the desk",
    message: "Hello OMuga — I'd like to discuss buying or selling property.",
  },
];

/* ------------------------------------------------------------------ */
/*  Properties                                                         */
/* ------------------------------------------------------------------ */

export type Property = {
  name: string;
  location: string;
  image: string;
  price: string;
  specs: string[];
  tag: string;
};

export const PROPERTIES: Property[] = [
  {
    name: "Penthouse Residences",
    location: "All Over East Africa",
    image: "/images/residence-ivory.jpg",
    price: "$50",
    specs: ["1–4 Bedrooms", "Skyline Balcony", "Private Chef on Call"],
    tag: "Guest Favourite",
  },
  {
    name: "Corporate Suites",
    location: "All Over East Africa",
    image: "/images/residence-onyx.jpg",
    price: "$50",
    specs: ["1–4 Bedrooms", "Work Lounge", "Chauffeur Available"],
    tag: "Business Class",
  },
  {
    name: "International Listings",
    location: "All Over East Africa",
    image: "/images/residence-amber.jpg",
    price: "$50",
    specs: ["1–4 Bedrooms", "Sunset Terrace", "Airport Pickups"],
    tag: "New Listing",
  },
];

/* ------------------------------------------------------------------ */
/*  Video tours                                                        */
/* ------------------------------------------------------------------ */

export const TOURS = [
  {
    title: "Polished Apartments for You",
    caption: "A walk through light-filled living spaces above the city.",
    video: "/videos/tour-amber.mp4",
    poster: "/images/tour-amber-poster.jpg",
    duration: "0:30",
  },
  {
    title: "Luxury at Your Stay",
    caption: "Sixty seconds inside one of our most requested stays.",
    video: "/videos/tour-ivory.mp4",
    poster: "/images/tour-ivory-poster.jpg",
    duration: "0:07",
  },
];

/* ------------------------------------------------------------------ */
/*  Concierge                                                          */
/* ------------------------------------------------------------------ */

export const CONCIERGE = [
  {
    icon: Plane,
    title: "Airport Pickups & Drop-offs",
    text: "Your driver waits at arrivals with a name board and a cool towel. Flight delayed? We track it.",
  },
  {
    icon: ChefHat,
    title: "Private Chefs",
    text: "Multi-course dining in your villa or cottage — local flavours or any cuisine you crave.",
  },
  {
    icon: Car,
    title: "Chauffeur & Car Hire",
    text: "Immaculate vehicles, discreet professional drivers, by the hour, day or full itinerary.",
  },
  {
    icon: Route,
    title: "Bespoke Trip Planning",
    text: "Gorilla treks, savannah safaris, lake weekends — planned end-to-end around your dates.",
  },
];

/* ------------------------------------------------------------------ */
/*  Why OMuga                                                          */
/* ------------------------------------------------------------------ */

export const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Verified & Authenticated",
    text: "Every stay and every title deed is physically inspected before it carries the OMuga name.",
  },
  {
    icon: Clock,
    title: "24/7 Concierge Line",
    text: "Three numbers, one standard: someone always answers — on WhatsApp, any hour.",
  },
  {
    icon: MapPin,
    title: "Deep Local Roots",
    text: "Offices and partners across Uganda and Kenya. We know the streets, the lodges and the sellers.",
  },
  {
    icon: Handshake,
    title: "Discreet Brokerage",
    text: "Sellers meet vetted buyers. Buyers see authenticated homes. No noise, no pressure.",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  {
    quote:
      "Landed at Entebbe at midnight — the chauffeur was already waiting, and the residence was exactly as photographed. Flawless.",
    name: "Sarah Mitchell",
    origin: "London, UK",
  },
  {
    quote:
      "OMuga found us a safari lodge cottage for our anniversary and had a private chef prepare dinner on the deck. Unforgettable.",
    name: "David & Faith K.",
    origin: "Nairobi, Kenya",
  },
  {
    quote:
      "As a first-time land buyer I was nervous about authenticity. Their team verified every document. I bought with total confidence.",
    name: "Amina Rahman",
    origin: "Dubai, UAE",
  },
  {
    quote:
      "They listed my villa and brought a serious buyer within weeks. Professional, discreet, and always a message away.",
    name: "James Okello",
    origin: "Kampala, Uganda",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: "How do I book a stay with OMuga?",
    a: "Send us a WhatsApp message with your dates, destination and budget. We reply with a shortlist of verified stays, you choose, and we reserve it for you — no apps, no forms.",
  },
  {
    q: "Are the properties and listings verified?",
    a: "Yes. Every stay is physically inspected by our team, and every property for sale is document-authenticated before it is listed with us. We stake our name on it.",
  },
  {
    q: "Can OMuga help me sell my property?",
    a: "Absolutely. We discreetly market luxury villas, land and homes to our network of vetted buyers and manage the process from valuation to handover.",
  },
  {
    q: "Do you operate outside Kampala?",
    a: "We serve all of Uganda and Kenya — Entebbe, Jinja, Mbarara, the safari circuit, Nairobi, Mombasa and beyond. If it's exceptional, we can get you there.",
  },
  {
    q: "What does the concierge actually cover?",
    a: "Airport pickups, private chefs, chauffeurs, restaurant bookings, trip planning and the occasional impossible request. One WhatsApp message is all it takes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Misc                                                               */
/* ------------------------------------------------------------------ */

export const CONTACT_PROMPTS = {
  icon: Sparkles,
  generic:
    "Hello OMuga Services — I'd like to make an enquiry.",
  property: (name: string) =>
    `Hello OMuga — I'm interested in "${name}". Please share availability and rates.`,
};

export const FOOTER_SERVICES = [
  "Safari Lodges & Cottages",
  "Hotel & Airbnb Booking",
  "Airport Pickups",
  "Private Chefs",
  "Chauffeur Service",
  "Luxury Villas & Land",
];

export { Landmark, KeyRound };
