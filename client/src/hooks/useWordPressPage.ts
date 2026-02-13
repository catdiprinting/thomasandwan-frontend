import { useEffect, useState } from "react";

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
  const [page, setPage] = useState<WPPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function fetchPage() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/pages/${slug}`);
        if (!response.ok) {
          throw new Error("Page not found");
        }
        const data = await response.json();
        if (!cancelled) {
          setPage({
            id: data.id,
            slug: data.slug,
            title: data.title?.rendered || data.title || "",
            content: data.content?.rendered || data.content || "",
            excerpt: data.excerpt?.rendered || data.excerpt || "",
            modified: data.modified || "",
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load page");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPage();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { page, loading, error };
}
