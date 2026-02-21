export interface Route {
  path: string;
  label: string;
  code: string;
}

export const routes: Route[] = [
  { path: "/", label: "Home", code: "—" },
  { path: "/pro", label: "Program", code: "pro" },
  { path: "/au", label: "About", code: "au" },
  { path: "/co", label: "Contact", code: "co" },
];
