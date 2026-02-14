import { useQuery } from "@tanstack/react-query";

async function fetchCmsData<T>(endpoint: string): Promise<T | null> {
  const res = await fetch(endpoint);
  if (!res.ok) return null;
  const json = await res.json();
  return json.fields ?? null;
}

export function useHomepageData() {
  return useQuery({
    queryKey: ["cms", "homepage"],
    queryFn: () => fetchCmsData<Record<string, string>>("/api/cms/homepage"),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useAboutData() {
  return useQuery({
    queryKey: ["cms", "about"],
    queryFn: () => fetchCmsData<Record<string, string>>("/api/cms/about"),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function usePracticeAreaData(slug: string) {
  return useQuery({
    queryKey: ["cms", "practice-area", slug],
    queryFn: () => fetchCmsData<Record<string, string>>(`/api/cms/practice-area/${slug}`),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
  });
}

export function cms(data: Record<string, string> | null | undefined, key: string, fallback: string): string {
  return data?.[key] || fallback;
}
