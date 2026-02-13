import { useQuery } from "@tanstack/react-query";

interface WPRendered {
  rendered: string;
}

interface WPPageRaw {
  id: number;
  slug: string;
  title: WPRendered | string;
  content: WPRendered | string;
  excerpt: WPRendered | string;
  modified: string;
}

interface WPPageData {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  modified: string;
}

interface UseWordPressPageResult {
  page: WPPageData | null;
  loading: boolean;
  error: string | null;
}

function extractRendered(val: WPRendered | string | undefined): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && "rendered" in val) return val.rendered;
  return "";
}

export function useWordPressPage(slug: string): UseWordPressPageResult {
  const { data, isLoading, error } = useQuery<WPPageRaw>({
    queryKey: [`/api/pages/${slug}`],
    enabled: !!slug,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  const page: WPPageData | null = data
    ? {
        id: data.id,
        slug: data.slug,
        title: extractRendered(data.title),
        content: extractRendered(data.content),
        excerpt: extractRendered(data.excerpt),
        modified: data.modified,
      }
    : null;

  return {
    page,
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : "Failed to load page") : null,
  };
}
