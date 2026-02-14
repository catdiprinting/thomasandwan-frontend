import { log } from "./index";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const WP_BASE_URL = process.env.WP_BASE_URL || "https://wp.thomasandwan.com";
const GRAPHQL_ENDPOINT = `${WP_BASE_URL}/graphql`;

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

async function graphqlQuery<T>(query: string, variables?: Record<string, any>): Promise<T | null> {
  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      log(`[wp-graphql] HTTP error: ${res.status}`, "wp-graphql");
      return null;
    }

    const json: GraphQLResponse<T> = await res.json();

    if (json.errors?.length) {
      log(`[wp-graphql] GraphQL errors: ${JSON.stringify(json.errors)}`, "wp-graphql");
    }

    return json.data ?? null;
  } catch (err: any) {
    log(`[wp-graphql] Fetch failed: ${err.message}`, "wp-graphql");
    return null;
  }
}

export interface HomepageFields {
  heroLabel: string;
  heroHeading: string;
  heroText: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryText: string;
  heroSecondaryLink: string;
  heroBadge1: string;
  heroBadge2: string;
  trustRating: string;
  trustRatingLabel: string;
  trustAvTitle: string;
  trustAvSubtitle: string;
  practiceLabel: string;
  practiceHeading: string;
  practiceSubtext: string;
  practiceCtaHeading: string;
  practiceCtaText: string;
  practiceCtaButton: string;
  aboutLabel: string;
  aboutHeading: string;
  aboutText1: string;
  aboutText2: string;
  aboutQuote: string;
  teamLabel: string;
  teamHeading: string;
  team1Name: string;
  team1Title: string;
  team1Bio: string;
  team2Name: string;
  team2Title: string;
  team2Bio: string;
  resultsLabel: string;
  resultsHeading: string;
  result1Amount: string;
  result1Type: string;
  result1Desc: string;
  result2Amount: string;
  result2Type: string;
  result2Desc: string;
  result3Amount: string;
  result3Type: string;
  result3Desc: string;
  stat1Number: string;
  stat1Label: string;
  stat2Number: string;
  stat2Label: string;
  stat3Number: string;
  stat3Label: string;
  faqLabel: string;
  faqHeading: string;
  faqSubtext: string;
  leadHeading: string;
  leadText: string;
  leadButton: string;
}

export interface AboutFields {
  aboutHeroLabel: string;
  aboutHeroHeading: string;
  aboutHeroText: string;
  aboutMissionHeading: string;
  aboutMissionText1: string;
  aboutMissionText2: string;
  aboutWhyHeading: string;
  aboutThomasBio: string;
  aboutWanBio: string;
  aboutCtaHeading: string;
  aboutCtaText: string;
}

export interface PracticeAreaFields {
  paIntro: string;
  paSidebarHeading: string;
  paSidebarText: string;
  paCtaHeading: string;
  paCtaText: string;
}

const HOMEPAGE_QUERY = `
  query GetHomepage {
    page(id: 2, idType: DATABASE_ID) {
      homepageFields {
        heroLabel
        heroHeading
        heroText
        heroCtaText
        heroCtaLink
        heroSecondaryText
        heroSecondaryLink
        heroBadge1
        heroBadge2
        trustRating
        trustRatingLabel
        trustAvTitle
        trustAvSubtitle
        practiceLabel
        practiceHeading
        practiceSubtext
        practiceCtaHeading
        practiceCtaText
        practiceCtaButton
        aboutLabel
        aboutHeading
        aboutText1
        aboutText2
        aboutQuote
        teamLabel
        teamHeading
        team1Name
        team1Title
        team1Bio
        team2Name
        team2Title
        team2Bio
        resultsLabel
        resultsHeading
        result1Amount
        result1Type
        result1Desc
        result2Amount
        result2Type
        result2Desc
        result3Amount
        result3Type
        result3Desc
        stat1Number
        stat1Label
        stat2Number
        stat2Label
        stat3Number
        stat3Label
        faqLabel
        faqHeading
        faqSubtext
        leadHeading
        leadText
        leadButton
      }
    }
  }
`;

const ABOUT_QUERY = `
  query GetAbout {
    page(id: 6, idType: DATABASE_ID) {
      aboutFields {
        aboutHeroLabel
        aboutHeroHeading
        aboutHeroText
        aboutMissionHeading
        aboutMissionText1
        aboutMissionText2
        aboutWhyHeading
        aboutThomasBio
        aboutWanBio
        aboutCtaHeading
        aboutCtaText
      }
    }
  }
`;

const PRACTICE_AREA_QUERY = `
  query GetPracticeArea($slug: String!) {
    pageBy(uri: $slug) {
      title
      practiceAreaFields {
        paIntro
        paSidebarHeading
        paSidebarText
        paCtaHeading
        paCtaText
      }
    }
  }
`;

interface HomepageData {
  page: { homepageFields: HomepageFields } | null;
}

interface AboutData {
  page: { aboutFields: AboutFields } | null;
}

interface PracticeAreaData {
  pageBy: { title: string; practiceAreaFields: PracticeAreaFields } | null;
}

const cmsCache = new Map<string, { data: any; expiresAt: number }>();
const CMS_TTL = parseInt(process.env.CMS_CACHE_TTL || "300", 10) * 1000;

function getCmsCache<T>(key: string): T | null {
  const entry = cmsCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cmsCache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCmsCache(key: string, data: any): void {
  cmsCache.set(key, { data, expiresAt: Date.now() + CMS_TTL });
}

export function purgeCmsCache(key?: string): void {
  if (key) {
    cmsCache.delete(key);
  } else {
    cmsCache.clear();
  }
  log(`[wp-graphql] CMS cache purged: ${key || "all"}`, "wp-graphql");
}

export async function getHomepageFields(): Promise<HomepageFields | null> {
  const cached = getCmsCache<HomepageFields>("homepage");
  if (cached) {
    log("[wp-graphql] Homepage fields served from cache", "wp-graphql");
    return cached;
  }

  const data = await graphqlQuery<HomepageData>(HOMEPAGE_QUERY);
  const fields = data?.page?.homepageFields ?? null;

  if (fields) {
    setCmsCache("homepage", fields);
    log("[wp-graphql] Homepage fields fetched and cached", "wp-graphql");
  }

  return fields;
}

export async function getAboutFields(): Promise<AboutFields | null> {
  const cached = getCmsCache<AboutFields>("about");
  if (cached) {
    log("[wp-graphql] About fields served from cache", "wp-graphql");
    return cached;
  }

  const data = await graphqlQuery<AboutData>(ABOUT_QUERY);
  const fields = data?.page?.aboutFields ?? null;

  if (fields) {
    setCmsCache("about", fields);
    log("[wp-graphql] About fields fetched and cached", "wp-graphql");
  }

  return fields;
}

export async function getPracticeAreaFields(slug: string): Promise<PracticeAreaFields | null> {
  const cacheKey = `practice:${slug}`;
  const cached = getCmsCache<PracticeAreaFields>(cacheKey);
  if (cached) {
    log(`[wp-graphql] Practice area "${slug}" served from cache`, "wp-graphql");
    return cached;
  }

  const data = await graphqlQuery<PracticeAreaData>(PRACTICE_AREA_QUERY, { slug });
  const fields = data?.pageBy?.practiceAreaFields ?? null;

  if (fields) {
    setCmsCache(cacheKey, fields);
    log(`[wp-graphql] Practice area "${slug}" fetched and cached`, "wp-graphql");
  }

  return fields;
}
