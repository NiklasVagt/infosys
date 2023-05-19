export interface CategoryItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export interface CategoryItemList {
  title: string;
  items: CategoryItem[];
}
