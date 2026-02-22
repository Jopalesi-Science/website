export interface Route {
  path:  string;
  // Translation key inside t.nav — e.g. "projects" → t.nav.projects
  label: string;
}

export const navRoutes: Route[] = [
  { path: "/projects", label: "projects" },
  { path: "/people",   label: "people"   },
  { path: "/contact",  label: "contact"  },
  { path: "/meetings", label: "meetings" },
  { path: "/about",    label: "about"    },
];
