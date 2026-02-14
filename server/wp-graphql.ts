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
      content
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
      content
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
      content
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
  page: { content: string; homepageFields: HomepageFields } | null;
}

interface AboutData {
  page: { content: string; aboutFields: AboutFields } | null;
}

interface PracticeAreaData {
  pageBy: { title: string; content: string; practiceAreaFields: PracticeAreaFields } | null;
}

const cmsCache = new Map<string, { data: any; expiresAt: number }>();
const CMS_TTL = parseInt(process.env.CMS_CACHE_TTL || "60", 10) * 1000;

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

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&amp;/g, "&")
    .replace(/&reg;/g, "\u00AE")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&rarr;/g, "\u2192")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, (m) => String.fromCharCode(parseInt(m.slice(2, -1))))
    .trim();
}

function extractBetween(html: string, startMarker: string, endMarker: string): string {
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) return "";
  const afterStart = startIdx + startMarker.length;
  const endIdx = html.indexOf(endMarker, afterStart);
  if (endIdx === -1) return "";
  return html.substring(afterStart, endIdx);
}

function extractByClass(html: string, className: string, tag?: string): string {
  const pattern = tag
    ? new RegExp(`<${tag}[^>]*class="[^"]*${className}[^"]*"[^>]*>([\\s\\S]*?)</${tag}>`)
    : new RegExp(`<[a-z][a-z0-9]*[^>]*class="[^"]*${className}[^"]*"[^>]*>([\\s\\S]*?)</[a-z][a-z0-9]*>`);
  const m = html.match(pattern);
  return m ? stripHtml(m[1]) : "";
}

function extractSection(html: string, className: string): string {
  const pattern = new RegExp(`<div[^>]*class="[^"]*${className}[^"]*"[^>]*>([\\s\\S]*?)</div>\\s*</div>\\s*</div>`);
  const m = html.match(pattern);
  return m ? m[0] : "";
}

function extractInnerByTag(section: string, tag: string, index: number = 0): string {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  let m;
  let i = 0;
  while ((m = pattern.exec(section)) !== null) {
    if (i === index) return stripHtml(m[1]);
    i++;
  }
  return "";
}

function extractAllByTag(section: string, tag: string): string[] {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  const results: string[] = [];
  let m;
  while ((m = pattern.exec(section)) !== null) {
    results.push(stripHtml(m[1]));
  }
  return results;
}

function extractHref(html: string, index: number = 0): string {
  const pattern = /href="([^"]*)"/g;
  let m;
  let i = 0;
  while ((m = pattern.exec(html)) !== null) {
    if (i === index) return m[1];
    i++;
  }
  return "";
}

function getFullSection(html: string, className: string): string {
  const startIdx = html.indexOf(`class="${className}"`);
  if (startIdx === -1) {
    const altIdx = html.indexOf(`class="${className} `);
    if (altIdx === -1) return "";
  }
  const divStart = html.lastIndexOf("<div", startIdx === -1 ? html.indexOf(`class="${className} `) : startIdx);
  if (divStart === -1) return "";
  let depth = 0;
  let pos = divStart;
  while (pos < html.length) {
    if (html.substring(pos, pos + 4) === "<div") {
      depth++;
      pos += 4;
    } else if (html.substring(pos, pos + 6) === "</div>") {
      depth--;
      if (depth === 0) return html.substring(divStart, pos + 6);
      pos += 6;
    } else {
      pos++;
    }
  }
  return html.substring(divStart);
}

function parseHomepageContent(html: string): Partial<HomepageFields> {
  if (!html) return {};

  const fields: Partial<HomepageFields> = {};

  const heroSection = getFullSection(html, "hp-hero");
  if (heroSection) {
    fields.heroLabel = extractByClass(heroSection, "hp-hero-label", "div");
    const h1Match = heroSection.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (h1Match) fields.heroHeading = stripHtml(h1Match[1]);
    fields.heroText = extractByClass(heroSection, "hp-hero-text", "p");
    const heroButtons = getFullSection(heroSection, "hp-hero-buttons");
    if (heroButtons) {
      const hrefs = heroButtons.match(/href="([^"]*)"/g) || [];
      const linkTexts = extractAllByTag(heroButtons, "a");
      if (linkTexts[0]) fields.heroCtaText = linkTexts[0];
      if (hrefs[0]) fields.heroCtaLink = hrefs[0].replace('href="', '').replace('"', '');
      if (linkTexts[1]) fields.heroSecondaryText = linkTexts[1];
      if (hrefs[1]) fields.heroSecondaryLink = hrefs[1].replace('href="', '').replace('"', '');
    }
    const badgeSection = getFullSection(heroSection, "hp-hero-badges");
    if (badgeSection) {
      const badges = extractAllByTag(badgeSection, "span").filter(b => b.length > 1);
      if (badges[0]) fields.heroBadge1 = badges[0];
      if (badges[1]) fields.heroBadge2 = badges[1];
    }
  }

  const trustSection = getFullSection(html, "hp-trust");
  if (trustSection) {
    const ratingStrong = trustSection.match(/<strong>([^<]*)<\/strong>/);
    if (ratingStrong) fields.trustRating = ratingStrong[1].trim();
    fields.trustRatingLabel = extractByClass(trustSection, "rating-label", "div");
    fields.trustAvTitle = extractByClass(trustSection, "av-title", "div");
    fields.trustAvSubtitle = extractByClass(trustSection, "av-sub", "div");
  }

  const practiceHeader = html.match(/<div class="hp-section"[^>]*>[\s\S]*?<div class="hp-section-header">([\s\S]*?)<\/div>/);
  if (practiceHeader) {
    const headerContent = practiceHeader[1];
    fields.practiceLabel = extractByClass(headerContent, "hp-section-label", "span");
    const h2 = headerContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (h2) fields.practiceHeading = stripHtml(h2[1]);
    const pTag = headerContent.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (pTag) fields.practiceSubtext = stripHtml(pTag[1]);
  }
  const practiceCta = getFullSection(html, "hp-practice-cta");
  if (practiceCta) {
    const h3 = practiceCta.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
    if (h3) fields.practiceCtaHeading = stripHtml(h3[1]);
    const p = practiceCta.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (p) fields.practiceCtaText = stripHtml(p[1]);
    const a = practiceCta.match(/<a[^>]*>([\s\S]*?)<\/a>/);
    if (a) fields.practiceCtaButton = stripHtml(a[1]);
  }

  const aboutSection = getFullSection(html, "hp-about");
  if (aboutSection) {
    const aboutContent = getFullSection(aboutSection, "hp-about-content");
    if (aboutContent) {
      fields.aboutLabel = extractByClass(aboutContent, "hp-section-label", "span");
      const h2 = aboutContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
      if (h2) fields.aboutHeading = stripHtml(h2[1]);
      const aboutTexts = aboutContent.match(/<p class="hp-about-text">([\s\S]*?)<\/p>/g);
      if (aboutTexts && aboutTexts[0]) fields.aboutText1 = stripHtml(aboutTexts[0]);
      if (aboutTexts && aboutTexts[1]) fields.aboutText2 = stripHtml(aboutTexts[1]);
    }
    const quoteSection = getFullSection(aboutSection, "hp-about-quote");
    if (quoteSection) {
      const qp = quoteSection.match(/<p>([\s\S]*?)<\/p>/);
      if (qp) fields.aboutQuote = stripHtml(qp[1]);
    }
  }

  const teamSection = getFullSection(html, "hp-team");
  if (teamSection) {
    const headerInTeam = teamSection.match(/<div class="hp-section-header">([\s\S]*?)<\/div>/);
    if (headerInTeam) {
      fields.teamLabel = extractByClass(headerInTeam[1], "hp-section-label", "span");
      const h2 = headerInTeam[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
      if (h2) fields.teamHeading = stripHtml(h2[1]);
    }
    const teamCards = teamSection.match(/<div class="hp-team-card">([\s\S]*?)<\/div>\s*<\/div>/g);
    if (teamCards) {
      for (let i = 0; i < teamCards.length && i < 2; i++) {
        const card = teamCards[i];
        const h3 = card.match(/<h3>([\s\S]*?)<\/h3>/);
        const titleSpan = card.match(/<span>([\s\S]*?)<\/span>/);
        const bio = card.match(/<p class="team-bio">([\s\S]*?)<\/p>/);
        const prefix = i === 0 ? "team1" : "team2";
        if (h3) (fields as any)[`${prefix}Name`] = stripHtml(h3[1]);
        if (titleSpan) (fields as any)[`${prefix}Title`] = stripHtml(titleSpan[1]);
        if (bio) (fields as any)[`${prefix}Bio`] = stripHtml(bio[1]);
      }
    }
  }

  const resultsSection = getFullSection(html, "hp-results");
  if (resultsSection) {
    const resHeader = resultsSection.match(/<div class="hp-section-header">([\s\S]*?)<\/div>/);
    if (resHeader) {
      fields.resultsLabel = extractByClass(resHeader[1], "hp-section-label", "span");
      const h2 = resHeader[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
      if (h2) fields.resultsHeading = stripHtml(h2[1]);
    }
    const resultCards = resultsSection.match(/<div class="hp-result-card">([\s\S]*?)<\/div>/g);
    if (resultCards) {
      for (let i = 0; i < resultCards.length && i < 3; i++) {
        const card = resultCards[i];
        const amount = card.match(/class="hp-result-amount">([\s\S]*?)<\/div>/);
        const rtype = card.match(/class="result-type">([\s\S]*?)<\/div>/);
        const desc = card.match(/class="result-desc">([\s\S]*?)<\/p>/);
        const n = i + 1;
        if (amount) (fields as any)[`result${n}Amount`] = stripHtml(amount[1]);
        if (rtype) (fields as any)[`result${n}Type`] = stripHtml(rtype[1]);
        if (desc) (fields as any)[`result${n}Desc`] = stripHtml(desc[1]);
      }
    }
  }

  const statsSection = getFullSection(html, "hp-stats");
  if (statsSection) {
    const statDivs = statsSection.match(/<div class="hp-stat">([\s\S]*?)<\/div>\s*<\/div>/g);
    if (statDivs) {
      for (let i = 0; i < statDivs.length && i < 3; i++) {
        const stat = statDivs[i];
        const num = stat.match(/class="hp-stat-number">([\s\S]*?)<\/div>/);
        const label = stat.match(/class="stat-label">([\s\S]*?)<\/div>/);
        const n = i + 1;
        if (num) (fields as any)[`stat${n}Number`] = stripHtml(num[1]);
        if (label) (fields as any)[`stat${n}Label`] = stripHtml(label[1]);
      }
    }
  }

  const faqSection = getFullSection(html, "hp-faq");
  if (faqSection) {
    const sidebar = getFullSection(faqSection, "hp-faq-sidebar");
    if (sidebar) {
      fields.faqLabel = extractByClass(sidebar, "hp-section-label", "span");
      const h2 = sidebar.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
      if (h2) fields.faqHeading = stripHtml(h2[1]);
      const pStyle = sidebar.match(/<p style="[^"]*">([\s\S]*?)<\/p>/);
      if (pStyle) fields.faqSubtext = stripHtml(pStyle[1]);
    }
  }

  const leadSection = getFullSection(html, "hp-lead");
  if (leadSection) {
    const h3 = leadSection.match(/<h3>([\s\S]*?)<\/h3>/);
    if (h3) fields.leadHeading = stripHtml(h3[1]);
    const p = leadSection.match(/<p>([\s\S]*?)<\/p>/);
    if (p) fields.leadText = stripHtml(p[1]);
    const a = leadSection.match(/<a[^>]*>([\s\S]*?)<\/a>/);
    if (a) fields.leadButton = stripHtml(a[1]);
  }

  return fields;
}

function parseAboutContent(html: string): Partial<AboutFields> {
  if (!html) return {};
  const fields: Partial<AboutFields> = {};

  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1) fields.aboutHeroHeading = stripHtml(h1[1]);

  const paragraphs = html.match(/<p>([\s\S]*?)<\/p>/g);
  if (paragraphs && paragraphs[0]) fields.aboutHeroText = stripHtml(paragraphs[0]);

  const h2s = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/g);
  if (h2s && h2s[0]) fields.aboutMissionHeading = stripHtml(h2s[0]);

  return fields;
}

function mergeFields<T extends Record<string, any>>(parsed: Partial<T>, acf: T | null): T {
  if (!acf && Object.keys(parsed).length === 0) return null as any;

  const result: Record<string, any> = {};

  const allKeys = new Set([
    ...Object.keys(parsed),
    ...(acf ? Object.keys(acf) : []),
  ]);

  for (const key of allKeys) {
    const parsedVal = (parsed as any)[key];
    const acfVal = acf ? (acf as any)[key] : undefined;

    if (parsedVal && parsedVal.length > 0) {
      result[key] = parsedVal;
    } else if (acfVal && acfVal.length > 0) {
      result[key] = acfVal;
    } else {
      result[key] = parsedVal || acfVal || "";
    }
  }

  return result as T;
}

export async function getHomepageFields(): Promise<HomepageFields | null> {
  const cached = getCmsCache<HomepageFields>("homepage");
  if (cached) {
    log("[wp-graphql] Homepage fields served from cache", "wp-graphql");
    return cached;
  }

  const data = await graphqlQuery<HomepageData>(HOMEPAGE_QUERY);
  const acfFields = data?.page?.homepageFields ?? null;
  const content = data?.page?.content ?? "";

  const parsedFields = parseHomepageContent(content);
  const merged = mergeFields<HomepageFields>(parsedFields, acfFields);

  if (merged) {
    setCmsCache("homepage", merged);
    log("[wp-graphql] Homepage fields fetched (content+ACF merged) and cached", "wp-graphql");
  }

  return merged;
}

export async function getAboutFields(): Promise<AboutFields | null> {
  const cached = getCmsCache<AboutFields>("about");
  if (cached) {
    log("[wp-graphql] About fields served from cache", "wp-graphql");
    return cached;
  }

  const data = await graphqlQuery<AboutData>(ABOUT_QUERY);
  const acfFields = data?.page?.aboutFields ?? null;
  const content = data?.page?.content ?? "";

  const parsedFields = parseAboutContent(content);
  const merged = mergeFields<AboutFields>(parsedFields, acfFields);

  if (merged) {
    setCmsCache("about", merged);
    log("[wp-graphql] About fields fetched (content+ACF merged) and cached", "wp-graphql");
  }

  return merged;
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
