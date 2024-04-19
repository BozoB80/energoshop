import { Building2, Globe, LayoutDashboard, Package, Store } from "lucide-react";

export const sidebarLinks = [
  {
    icon: LayoutDashboard,
    route: "/admin",
    label: "Nadzorna ploča",
  },
  {
    icon: Building2,
    route: "/admin/brendovi",
    label: "Brendovi",
  },
  {
    icon: Globe,
    route: "/admin/kategorije",
    label: "Kategorije",
  },
  {
    icon: Package,
    route: "/admin/artikli",
    label: "Artikli",
  },  
  {
    icon: Store,
    route: "/admin/narudzbe",
    label: "Narudžbe",
  },  
];