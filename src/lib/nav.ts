export interface NavItem {
  label: string;
  href: string;
  /** Marks sections that only have a placeholder page so far. */
  comingSoon?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Ressourcen", href: "/ressourcen" },
  { label: "Glossar", href: "/glossar" },
  { label: "Coachings & Kurse", href: "/coaching", comingSoon: true },
];
