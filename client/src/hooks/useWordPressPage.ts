import { useQuery } from "@tanstack/react-query";

export interface WPPageData {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
}

export function useWordPressPage(slug: string | undefined) {
  return useQuery<WPPageData>({
    queryKey: ["wp-page", slug],
    queryFn: async () => {
      const res = await fetch(`/api/pages/${slug}`);
      if (!res.ok) throw new Error("Page not found");
      return res.json();
    },
    enabled: !!slug,
    staleTime: 60_000,
    retry: 1,
  });
}
