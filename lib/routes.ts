export interface Route {
  path:  string;
  // Translation key inside t.nav — e.g. "projects" → t.nav.projects
  label: string;
}

export const navRoutes: Route[] = [
  { path: "/projects", label: "projects" },
  { path: "/meetings", label: "meetings" },
  { path: "/contact",  label: "contact"  },
  { path: "/about",    label: "about"    },
];
