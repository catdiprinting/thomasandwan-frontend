import { useQuery } from "@tanstack/react-query";

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

export function useWordPressPage(slug: string): UseWordPressPageResult {
  const { data, isLoading, error } = useQuery<WPPageData>({
    queryKey: [`/api/pages/${slug}`],
    enabled: !!slug,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  return {
    page: data ?? null,
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : "Failed to load page") : null,
  };
}
