export const brand = {
  name: "Unica",
  line: "Meet fewer, more meaningfully",
};

export const routes = {
  home: "/",
  login: "/login",
  apply: "/apply",
  approach: "/approach",
  membership: "/membership",
  about: "/about",
  stories: "/stories",
  consultation: "/consultation",
  help: "/help",
  forgot: "/forgot",
  privacy: "/privacy",
  terms: "/terms",
  safety: "/safety",
  concierge: "mailto:concierge@unica.house",
};

export const appRoutes = {
  home: "/home",
  discover: "/discover",
  requests: "/requests",
  introductions: "/introductions",
  moment: (id: string) => `/moment/${id}`,
  concierge: "/concierge",
  profile: "/profile",
  membership: "/account/membership",
  privacy: "/account/privacy",
  settings: "/account/settings",
  desk: "/desk",
  admin: "/admin",
};

export const navPrimary = [
  { href: routes.approach, label: "Approach" },
  { href: routes.membership, label: "Membership" },
  { href: routes.stories, label: "Stories" },
  { href: routes.safety, label: "Safety" },
];

export const navFooter = [
  { href: routes.approach, label: "Approach" },
  { href: routes.membership, label: "Membership" },
  { href: routes.about, label: "About" },
  { href: routes.consultation, label: "Consultation" },
  { href: routes.help, label: "Help" },
  { href: routes.privacy, label: "Privacy" },
  { href: routes.terms, label: "Terms" },
  { href: routes.safety, label: "Safety" },
];
